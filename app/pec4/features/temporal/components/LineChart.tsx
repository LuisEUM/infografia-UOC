"use client";

import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import {
  CountryData,
  DataVariable,
  getTimeSeriesData,
} from "@/app/pec4/data/dataUtils";
import { CONTINENT_COLORS } from "@/app/pec4/theme/colorUtils";

// Tailwind-inspired colors for the line chart
const LINE_COLORS = [
  "#10b981", // emerald-500 (green)
  "#3b82f6", // blue-500 (blue)
  "#8b5cf6", // violet-500 (purple)
  "#ef4444", // red-500 (red)
  "#f59e0b", // amber-500 (yellow/orange)
];

interface LineChartProps {
  data: CountryData[];
  variable: DataVariable;
  countries: string[];
  yearRange: [number, number];
  onYearRangeChange: (range: [number, number]) => void;
  selectedYear?: number;
  showContinentAverages?: boolean;
}

const variableLabels: Record<DataVariable, string> = {
  co2: "Emisiones de CO₂ (millones de toneladas)",
  co2_per_capita: "CO₂ per cápita (toneladas)",
  share_global_co2: "Cuota de CO₂ global (%)",
  co2_per_gdp: "CO₂ por PIB",
  population: "Población",
  gdp: "PIB",
};

// Formato de números para España (punto como separador de miles, coma para decimales)
const formatNumber = (value: number) => {
  return value.toLocaleString("es-ES", {
    maximumFractionDigits: 2,
  });
};

// Type for tooltip props
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

// Personalización del tooltip
const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-white p-3 border border-gray-200 shadow-md rounded-md'>
        <p className='font-semibold mb-1'>{`Año: ${label}`}</p>
        {payload.map((entry, index: number) => (
          <p
            key={`item-${index}`}
            style={{ color: entry.color }}
            className='text-sm'
          >
            {`${entry.name}: ${formatNumber(entry.value)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const LineChart = ({
  data,
  variable,
  countries,
  yearRange,
  selectedYear,
  showContinentAverages = false,
}: LineChartProps) => {
  // Get all available continents
  const continents = useMemo(() => {
    const continentSet = new Set<string>();
    data.forEach((item) => {
      if (item.continent) {
        continentSet.add(item.continent);
      }
    });
    return Array.from(continentSet);
  }, [data]);

  // Calculate continent averages
  const continentAverages = useMemo(() => {
    if (!showContinentAverages) return {};

    const result: Record<string, Record<number, number>> = {};

    // Initialize continent records
    continents.forEach((continent) => {
      result[continent] = {};
    });

    // Calculate averages by year and continent
    for (let year = yearRange[0]; year <= yearRange[1]; year++) {
      continents.forEach((continent) => {
        const continentData = data.filter(
          (d) =>
            d.year === year &&
            d.continent === continent &&
            d[variable] !== undefined &&
            d[variable] !== null
        );

        if (continentData.length > 0) {
          const total = continentData.reduce(
            (sum, d) => sum + (d[variable] as number),
            0
          );
          result[continent][year] = total / continentData.length;
        }
      });
    }

    return result;
  }, [data, continents, variable, yearRange, showContinentAverages]);

  // Format time series data for the chart
  const timeSeriesData = useMemo(() => {
    if (!data.length) return [];

    // Years within the selected range
    const years = Array.from(
      { length: yearRange[1] - yearRange[0] + 1 },
      (_, i) => yearRange[0] + i
    );

    // Get country data
    let countryData: {
      country: string;
      data: { year: number; value: number }[];
    }[] = [];

    if (countries.length > 0) {
      countryData = getTimeSeriesData(
        data,
        countries,
        variable,
        yearRange[0],
        yearRange[1]
      );
    }

    // Define type for year data
    type YearDataType = {
      year: number;
      [key: string]: number | null | undefined;
    };

    // Build the time series data with countries and continent averages
    return years.map((year) => {
      const yearData: YearDataType = { year };

      // Add country data
      countryData.forEach((country) => {
        const dataPoint = country.data.find((d) => d.year === year);
        yearData[country.country] = dataPoint?.value ?? null;
      });

      // Add continent averages if enabled
      if (showContinentAverages) {
        continents.forEach((continent) => {
          if (continentAverages[continent]?.[year] !== undefined) {
            yearData[`Promedio ${continent}`] =
              continentAverages[continent][year];
          }
        });
      }

      return yearData;
    });
  }, [
    data,
    countries,
    continents,
    continentAverages,
    variable,
    yearRange,
    showContinentAverages,
  ]);

  // Get colors for countries and continents
  const lineColors = useMemo(() => {
    const colors: Record<string, string> = {};

    // Country colors - use Tailwind-inspired colors
    countries.forEach((iso, index) => {
      const countryData = data.find((d) => d.iso_code === iso);
      if (countryData) {
        // Use mod to cycle through colors if we have more countries than colors
        const colorIndex = index % LINE_COLORS.length;
        colors[countryData.country] = LINE_COLORS[colorIndex];
      } else {
        colors[iso] = "#999999";
      }
    });

    // Continent average colors (darker variants)
    if (showContinentAverages) {
      continents.forEach((continent) => {
        colors[`Promedio ${continent}`] =
          CONTINENT_COLORS[continent as keyof typeof CONTINENT_COLORS]?.top ||
          "#666666";
      });
    }

    return colors;
  }, [data, countries, continents, showContinentAverages]);

  // Group legend items by continent for better organization
  const legendItemsByContinent = useMemo(() => {
    const groups: Record<string, { name: string; color: string }[]> = {};

    // Group countries by continent
    countries.forEach((iso) => {
      const countryData = data.find((d) => d.iso_code === iso);
      if (countryData) {
        const continent = countryData.continent || "Otro";
        if (!groups[continent]) {
          groups[continent] = [];
        }
        groups[continent].push({
          name: countryData.country,
          color: lineColors[countryData.country] || "#999999",
        });
      }
    });

    return groups;
  }, [countries, data, lineColors]);

  // If no data to display
  if (timeSeriesData.length === 0) {
    return (
      <div className='w-full h-[400px] mt-8 flex items-center justify-center bg-gray-50 rounded-lg'>
        <p className='text-gray-500'>
          No hay datos para mostrar. Seleccione países o variables diferentes.
        </p>
      </div>
    );
  }

  return (
    <div className='w-full mt-8'>
      <h3 className='text-lg font-medium mb-2'>
        {variableLabels[variable]} (evolución temporal)
      </h3>

      <div className='h-[400px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <RechartsLineChart
            data={timeSeriesData}
            margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray='3 3' opacity={0.2} />
            <XAxis
              dataKey='year'
              label={{
                value: "Año",
                position: "insideBottomRight",
                offset: -10,
              }}
            />
            <YAxis
              label={{
                value: variableLabels[variable],
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle" },
              }}
            />
            <Tooltip
              content={<CustomTooltip />}
              labelFormatter={(value) => `Año: ${value}`}
            />

            {/* Country lines */}
            {Object.keys(lineColors).map((name) => (
              <Line
                key={name}
                type='monotone'
                dataKey={name}
                name={name.startsWith("Promedio ") ? name : name}
                stroke={lineColors[name]}
                dot={name.startsWith("Promedio ") ? { r: 0 } : { r: 1 }}
                activeDot={
                  name.startsWith("Promedio ")
                    ? { r: 4 }
                    : { r: 5, strokeWidth: 1 }
                }
                strokeWidth={name.startsWith("Promedio ") ? 2 : 1.5}
                strokeDasharray={
                  name.startsWith("Promedio ") ? "5 5" : undefined
                }
                connectNulls
              />
            ))}

            {selectedYear && (
              <ReferenceLine
                x={selectedYear}
                stroke='#666'
                strokeDasharray='3 3'
                label={{
                  value: "Año Seleccionado",
                  position: "top",
                  fill: "#666",
                }}
              />
            )}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>

      {/* Custom legend area below the chart */}
      <div className='mt-4 border rounded-md p-3 max-h-[200px] overflow-y-auto'>
        <h4 className='text-sm font-semibold mb-2'>Leyenda de países</h4>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2'>
          {Object.entries(legendItemsByContinent).map(([continent, items]) => (
            <div key={continent} className='space-y-1'>
              <h5 className='text-xs font-semibold text-gray-700'>
                {continent}
              </h5>
              {items.map((item) => (
                <div key={item.name} className='flex items-center text-xs'>
                  <span
                    className='inline-block w-3 h-3 mr-1 rounded-sm'
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span className='truncate' title={item.name}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LineChart;

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
  Legend,
  Brush,
  ReferenceLine,
} from "recharts";
import {
  CountryData,
  DataVariable,
  getTimeSeriesData,
} from "@/app/data/dataUtils";
import { CONTINENT_COLORS, getContinentColor } from "@/app/theme/colorUtils";

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
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
        <p className="font-semibold mb-1">{`Año: ${label}`}</p>
        {payload.map((entry, index: number) => (
          <p
            key={`item-${index}`}
            style={{ color: entry.color }}
            className="text-sm"
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
  onYearRangeChange,
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

    // Country colors
    countries.forEach((iso) => {
      const countryData = data.find((d) => d.iso_code === iso);
      if (countryData) {
        colors[countryData.country] = getContinentColor(countryData.continent);
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

  // Handle brush change
  const handleBrushChange = (brushRange: {
    startIndex?: number;
    endIndex?: number;
  }) => {
    if (
      brushRange &&
      typeof brushRange.startIndex === "number" &&
      typeof brushRange.endIndex === "number" &&
      timeSeriesData[brushRange.startIndex] &&
      timeSeriesData[brushRange.endIndex]
    ) {
      const newStartYear = timeSeriesData[brushRange.startIndex].year;
      const newEndYear = timeSeriesData[brushRange.endIndex].year;
      onYearRangeChange([newStartYear, newEndYear]);
    }
  };

  // If no data to display
  if (timeSeriesData.length === 0) {
    return (
      <div className="w-full h-[400px] mt-8 flex items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">
          No hay datos para mostrar. Seleccione países o variables diferentes.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] mt-8">
      <h3 className="text-lg font-medium mb-2">
        {variableLabels[variable]} (evolución temporal)
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={timeSeriesData}
          margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis
            dataKey="year"
            label={{ value: "Año", position: "insideBottomRight", offset: -10 }}
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
          <Legend verticalAlign="top" height={36} />

          {/* Country lines */}
          {Object.keys(lineColors).map((name) => (
            <Line
              key={name}
              type="monotone"
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
              strokeDasharray={name.startsWith("Promedio ") ? "5 5" : undefined}
              connectNulls
            />
          ))}

          {selectedYear && (
            <ReferenceLine
              x={selectedYear}
              stroke="#666"
              strokeDasharray="3 3"
              label={{
                value: "Año Seleccionado",
                position: "top",
                fill: "#666",
              }}
            />
          )}

          <Brush
            dataKey="year"
            height={30}
            stroke="#8884d8"
            onChange={handleBrushChange}
            startIndex={Math.max(
              0,
              timeSeriesData.findIndex((d) => d.year === yearRange[0])
            )}
            endIndex={Math.min(
              timeSeriesData.length - 1,
              timeSeriesData.findIndex((d) => d.year === yearRange[1])
            )}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;

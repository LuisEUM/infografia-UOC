"use client";

import { useState, useMemo, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Sector,
  Brush,
} from "recharts";
import { BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
// Añadir la importación de leroyMerlinColors
import {
  groupPieData,
  groupColors,
  leroyMerlinColors,
} from "@/app/pec3/utils/data-grouping";
import ChartLegend from "./chart-legend";

interface MarketSharePieChartProps {
  data: any[];
  isLoading: boolean;
  isError: boolean;
  selectedYear?: string;
  onYearChange?: (year: string) => void;
  isGrouped?: boolean;
}

interface BrushRange {
  startIndex?: number;
  endIndex?: number;
}

export default function MarketSharePieChart({
  data,
  isLoading,
  isError,
  selectedYear,
  onYearChange,
  isGrouped = false,
}: MarketSharePieChartProps) {
  // Estado local para el año seleccionado si no se proporciona desde fuera
  const [localSelectedYear, setLocalSelectedYear] = useState<string>("2022");
  const [startYear, setStartYear] = useState<string>("2015");

  // Estado para controlar qué series están visibles
  const [visibleSeries, setVisibleSeries] = useState<Record<string, boolean>>(
    {}
  );

  // Usar el año proporcionado o el local
  const year = selectedYear || localSelectedYear;

  // Manejar el cambio de año
  const handleYearChange = (newYear: string) => {
    if (onYearChange) {
      onYearChange(newYear);
    } else {
      setLocalSelectedYear(newYear);
    }
  };

  // Reemplazar la definición de colores con:
  // Colores para cada tipo de vaso - Usando la paleta de Leroy Merlin
  const colors: Record<string, string> = {
    Polivalente: leroyMerlinColors.verdePrincipal, // Verde Principal - PANTONE 368 C
    Recreo: leroyMerlinColors.naranja, // Naranja - PANTONE 137 C
    Chapoteo: leroyMerlinColors.azul, // Azul - PANTONE 313 C
    Hidromasaje: leroyMerlinColors.verdeAzulado, // Verde Azulado - PANTONE 323 C
    Enseñanza: leroyMerlinColors.rojo, // Rojo - PANTONE 485 C
    Natación: leroyMerlinColors.marron, // Marrón - PANTONE 437 C
    Terapéutico: leroyMerlinColors.rosa, // Rosa - PANTONE 241 C
    "Foso de salto": leroyMerlinColors.azulOscuro, // Azul Oscuro - PANTONE 539 C
    // Colores para grupos
    "Deporte & enseño": groupColors["Deporte & enseño"],
    "Ocio & recreo": groupColors["Ocio & recreo"],
    "Terapia & relax": groupColors["Terapia & relax"],
    Mixta: groupColors["Mixta"],
  };

  // Orden específico de los tipos de vasos
  const seriesOrder = isGrouped
    ? ["Ocio & recreo", "Mixta", "Terapia & relax", "Deporte & enseño"]
    : [
        "Polivalente",
        "Recreo",
        "Chapoteo",
        "Hidromasaje",
        "Enseñanza",
        "Natación",
        "Terapéutico",
        "Foso de salto",
      ];

  // Estado para el sector activo (hover)
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  // Preparar los datos para el gráfico de tarta
  const pieData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Calcular el total para el año seleccionado
    const total = data.reduce((sum, item) => sum + item[year], 0);

    // Crear los datos para el gráfico de tarta
    const pieItems = data.map((item) => {
      const value = item[year];
      const percentage = ((value / total) * 100).toFixed(1);

      return {
        name: item.tipo,
        value,
        percentage: Number.parseFloat(percentage),
      };
    });

    // Ordenar según el orden específico
    const sortedPieData = pieItems.sort((a, b) => {
      const indexA = seriesOrder.indexOf(a.name);
      const indexB = seriesOrder.indexOf(b.name);
      return indexA - indexB;
    });

    // Si está agrupado, agrupar los datos
    return isGrouped ? groupPieData(sortedPieData) : sortedPieData;
  }, [data, year, seriesOrder, isGrouped]);

  // Obtener las claves de las series (tipos de vasos) en el orden específico
  const seriesKeys = useMemo(() => {
    if (!pieData || pieData.length === 0) return [];

    // Obtener los nombres únicos de los datos del pie
    const availableTypes = new Set(pieData.map((item) => item.name));
    return seriesOrder.filter((type) => availableTypes.has(type));
  }, [pieData, seriesOrder]);

  // Inicializar el estado de visibilidad si es necesario
  useMemo(() => {
    if (seriesKeys.length > 0 && Object.keys(visibleSeries).length === 0) {
      const initialVisibility: Record<string, boolean> = {};
      seriesKeys.forEach((key) => {
        initialVisibility[key] = true;
      });
      setVisibleSeries(initialVisibility);
    }
  }, [seriesKeys, visibleSeries]);

  // Manejar el toggle de una serie
  const toggleSeries = (serie: string) => {
    setVisibleSeries((prev) => ({
      ...prev,
      [serie]: !prev[serie],
    }));
  };

  // Reiniciar visibilidad cuando cambia el modo agrupado/individual
  useEffect(() => {
    // Solo reiniciar cuando cambie el modo agrupado y tengamos series disponibles
    if (seriesKeys.length > 0) {
      const initialVisibility: Record<string, boolean> = {};
      seriesKeys.forEach((key) => {
        initialVisibility[key] = true;
      });
      setVisibleSeries(initialVisibility);
    }
  }, [isGrouped]); // Solo depende de isGrouped, no de seriesKeys

  // Años disponibles para el selector
  const years = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => (2015 + i).toString());
  }, []);

  // Renderizar el sector activo
  const renderActiveShape = (props: any) => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      name,
      value,
      percentage,
    } = props;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 12}
          outerRadius={outerRadius + 16}
          fill={fill}
        />
      </g>
    );
  };

  // Filtrar los datos según las series visibles
  const filteredPieData = useMemo(() => {
    return pieData.filter((item) => visibleSeries[item.name]);
  }, [pieData, visibleSeries]);

  // Formatear los datos para el gráfico de barras
  const formattedData = useMemo(() => {
    if (!data || data.length === 0) return [];

    return years.map((year) => {
      const total = data.reduce((sum, item) => sum + item[year], 0);
      return { year, total };
    });
  }, [data, years]);

  // Manejar el cambio en el brush
  const handleBrushChange = (brushRange: BrushRange | null) => {
    if (
      brushRange &&
      brushRange.startIndex !== undefined &&
      brushRange.endIndex !== undefined
    ) {
      setStartYear(formattedData[brushRange.startIndex].year);
      if (brushRange.startIndex !== undefined) {
        const selectedYear = formattedData[brushRange.startIndex].year;
        handleYearChange(selectedYear);
      }
    }
  };

  if (isLoading) {
    return <Skeleton className='w-full h-[400px]' />;
  }

  if (isError || !data) {
    return (
      <Alert variant='destructive'>
        <AlertCircle className='w-4 h-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          No se pudieron cargar los datos para la visualización.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap gap-2'>
        {seriesKeys.map((key) => (
          <Toggle
            key={key}
            pressed={visibleSeries[key]}
            onPressedChange={() => toggleSeries(key)}
            variant='outline'
            className='data-[state=on]:bg-zinc-100 data-[state=on]:dark:bg-zinc-800 data-[state=on]:text-foreground'
          >
            <div className='flex items-center gap-2'>
              <div
                className='w-3 h-3 rounded-full'
                style={{ backgroundColor: colors[key] || "#888888" }}
              ></div>
              <span>{key}</span>
            </div>
          </Toggle>
        ))}
      </div>

      <div className='w-full h-[400px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={filteredPieData}
              cx='50%'
              cy='50%'
              innerRadius={80}
              outerRadius={120}
              paddingAngle={2}
              dataKey='value'
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(undefined)}
              label={({ name, percentage }) => `${percentage}%`}
              labelLine={true}
            >
              {filteredPieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[entry.name] || "#888888"}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, props) => {
                return [`${value} (${props.payload.percentage}%)`, name];
              }}
            />
            <Legend
              layout='vertical'
              verticalAlign='middle'
              align='right'
              formatter={(value: string, entry, index) => {
                // Encontrar el índice correcto en filteredPieData
                const itemIndex = filteredPieData.findIndex(
                  (item) => item.name === value
                );
                if (itemIndex === -1) return null;
                const item = filteredPieData[itemIndex];
                return (
                  <span style={{ color: colors[value] }}>
                    {value}: {item.percentage}%
                  </span>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className='w-full h-[80px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={formattedData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='year' />
            <YAxis hide />
            <Brush
              dataKey='year'
              height={30}
              stroke={leroyMerlinColors.verdePrincipal}
              fill='#fff'
              onChange={handleBrushChange}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <ChartLegend startYear={startYear} endYear={year} />
    </div>
  );
}

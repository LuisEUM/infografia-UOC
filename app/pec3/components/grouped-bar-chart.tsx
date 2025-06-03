"use client";

import { useState, useMemo, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
// Añadir la importación de leroyMerlinColors
import {
  transformYearlyData,
  groupColors,
  leroyMerlinColors,
} from "@/app/pec3/utils/data-grouping";
import ChartLegend from "./chart-legend";

interface GroupedBarChartProps {
  data: any[];
  isLoading: boolean;
  isError: boolean;
  isGrouped?: boolean;
}

interface BrushRange {
  startIndex?: number;
  endIndex?: number;
}

export default function GroupedBarChart({
  data,
  isLoading,
  isError,
  isGrouped = false,
}: GroupedBarChartProps) {
  // Estado para controlar qué series están visibles
  const [visibleSeries, setVisibleSeries] = useState<Record<string, boolean>>(
    {}
  );
  // Estado para los años seleccionados
  const [startYear, setStartYear] = useState<string>("2015");
  const [endYear, setEndYear] = useState<string>("2022");
  const [selectedYears, setSelectedYears] = useState<string[]>([]);

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

  // Transformar los datos según el modo (agrupado o individual)
  const processedData = useMemo(() => {
    return transformYearlyData(data, isGrouped);
  }, [data, isGrouped]);

  // Obtener las claves de las series (tipos de vasos) en el orden específico
  const seriesKeys = useMemo(() => {
    if (!processedData || processedData.length === 0) return [];

    // Filtrar seriesOrder para incluir solo los tipos que existen en los datos
    const availableTypes = new Set(processedData.map((item) => item.tipo));
    return seriesOrder.filter((type) => availableTypes.has(type));
  }, [processedData, seriesOrder]);

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

  // Manejar el toggle de una serie
  const toggleSeries = (serie: string) => {
    setVisibleSeries((prev) => ({
      ...prev,
      [serie]: !prev[serie],
    }));
  };

  // Años disponibles para el selector
  const years = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => (2015 + i).toString());
  }, []);

  // Datos para el gráfico de años
  const yearData = useMemo(() => {
    return years.map((year, index) => ({
      index,
      year,
      label: year,
    }));
  }, [years]);

  // Actualizar los años seleccionados cuando cambia el rango
  useEffect(() => {
    if (startYear && endYear) {
      const startIndex = years.indexOf(startYear);
      const endIndex = years.indexOf(endYear);

      if (startIndex !== -1 && endIndex !== -1) {
        // Seleccionar todos los años en el rango
        const yearsInRange = years.slice(
          Math.min(startIndex, endIndex),
          Math.max(startIndex, endIndex) + 1
        );
        setSelectedYears(yearsInRange);
      }
    }
  }, [startYear, endYear, years]);

  // Preparar los datos para el gráfico de barras agrupadas
  const groupedBarData = useMemo(() => {
    if (
      !processedData ||
      processedData.length === 0 ||
      selectedYears.length === 0
    )
      return [];

    // Filtrar solo los tipos visibles
    const visibleTypes = seriesKeys.filter((key) => visibleSeries[key]);

    // Crear un objeto para cada año con los valores para los tipos visibles
    return selectedYears.map((year) => {
      const yearData: Record<string, any> = { year };

      visibleTypes.forEach((tipo) => {
        const item = processedData.find((d) => d.tipo === tipo);
        if (item) {
          yearData[tipo] = item[year];
        }
      });

      return yearData;
    });
  }, [processedData, seriesKeys, visibleSeries, selectedYears]);

  // Manejar el cambio en el brush
  const handleBrushChange = (brushRange: BrushRange | null) => {
    if (
      brushRange &&
      brushRange.startIndex !== undefined &&
      brushRange.endIndex !== undefined
    ) {
      // Asegurarse de que startIndex sea menor que endIndex
      const start = Math.min(brushRange.startIndex, brushRange.endIndex);
      const end = Math.max(brushRange.startIndex, brushRange.endIndex);

      // Actualizar los años de inicio y fin
      setStartYear(yearData[start].year);
      setEndYear(yearData[end].year);
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

  // Filtrar las series visibles para el gráfico
  const visibleSeriesKeys = seriesKeys.filter((key) => visibleSeries[key]);

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
          <BarChart
            data={groupedBarData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='year' />
            <YAxis />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  // Ordenar el payload de mayor a menor valor
                  const sortedPayload = [...payload].sort(
                    (a, b) => (b.value as number) - (a.value as number)
                  );

                  return (
                    <div className='p-3 bg-background border rounded shadow-sm'>
                      <p className='font-medium'>{`Año: ${label}`}</p>
                      <div className='mt-2 space-y-1'>
                        {sortedPayload.map((entry, index) => (
                          <div
                            key={`item-${index}`}
                            className='flex items-center gap-2 my-1'
                          >
                            <div
                              className='w-3 h-3 rounded-full'
                              style={{ backgroundColor: entry.color }}
                            />
                            <span style={{ color: entry.color }}>
                              {entry.name}
                            </span>
                            <span className='font-medium'>: {entry.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            {visibleSeriesKeys.map((tipo) => (
              <Bar
                key={tipo}
                dataKey={tipo}
                name={tipo}
                fill={colors[tipo] || "#888888"}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className='w-full h-[80px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={yearData}
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
              startIndex={years.indexOf(startYear)}
              endIndex={years.indexOf(endYear)}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <ChartLegend startYear={startYear} endYear={endYear} />
    </div>
  );
}

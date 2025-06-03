"use client";

import { useState, useMemo, useEffect } from "react";
import {
  AreaChart,
  Area,
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
import {
  transformYearlyData,
  groupColors,
} from "@/app/pec3/utils/data-grouping";
import ChartLegend from "./chart-legend";
import { leroyMerlinColors } from "@/app/pec3/constants";

interface StackedAreaChartProps {
  data: any[];
  isLoading: boolean;
  isError: boolean;
  isGrouped?: boolean;
}

interface BrushRange {
  startIndex?: number;
  endIndex?: number;
}

export default function StackedAreaChart({
  data,
  isLoading,
  isError,
  isGrouped = false,
}: StackedAreaChartProps) {
  // Estado para controlar qué series están visibles
  const [visibleSeries, setVisibleSeries] = useState<Record<string, boolean>>(
    {}
  );
  // Estado para los años seleccionados
  const [selectedStartYear, setSelectedStartYear] = useState<string>("2015");
  const [selectedEndYear, setSelectedEndYear] = useState<string>("2022");

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

  // Orden específico de los tipos de vasos - Orden solicitado
  // Para el gráfico de área apilada, necesitamos invertir el orden para que se apilen correctamente
  const seriesOrder = isGrouped
    ? ["Deporte & enseño", "Terapia & relax", "Mixta", "Ocio & recreo"]
    : [
        "Foso de salto",
        "Terapéutico",
        "Natación",
        "Enseñanza",
        "Hidromasaje",
        "Chapoteo",
        "Recreo",
        "Polivalente",
      ];

  // Orden para la visualización en la UI (botones, leyendas, etc.)
  const displayOrder = isGrouped
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

  // Transformar los datos para el gráfico de área apilada
  const formattedData = useMemo(() => {
    if (!processedData || processedData.length === 0) return [];

    // Crear un objeto para cada año con todos los tipos de vasos
    const yearData: Record<string, any> = {};
    const years = Array.from({ length: 8 }, (_, i) => (2015 + i).toString());

    // Inicializar el objeto para cada año
    years.forEach((year) => {
      yearData[year] = { year, total: 0 };
    });

    // Llenar los datos para cada tipo de vaso por año
    processedData.forEach((item) => {
      const tipoVaso = item.tipo;
      years.forEach((year) => {
        yearData[year][tipoVaso] = item[year];
        yearData[year].total += item[year];
      });
    });

    // Convertir a array para Recharts
    return Object.values(yearData);
  }, [processedData]);

  // Obtener las claves de las series (tipos de vasos) en el orden específico
  const seriesKeys = useMemo(() => {
    if (!processedData || processedData.length === 0) return [];

    // Filtrar seriesOrder para incluir solo los tipos que existen en los datos
    const availableTypes = new Set(processedData.map((item) => item.tipo));
    return seriesOrder.filter((type) => availableTypes.has(type));
  }, [processedData, seriesOrder]);

  // Obtener las claves para mostrar en la UI en el orden correcto
  const displayKeys = useMemo(() => {
    if (!processedData || processedData.length === 0) return [];

    // Filtrar displayOrder para incluir solo los tipos que existen en los datos
    const availableTypes = new Set(processedData.map((item) => item.tipo));
    return displayOrder.filter((type) => availableTypes.has(type));
  }, [processedData, displayOrder]);

  // Inicializar el estado de visibilidad si es necesario
  useMemo(() => {
    if (displayKeys.length > 0 && Object.keys(visibleSeries).length === 0) {
      const initialVisibility: Record<string, boolean> = {};
      displayKeys.forEach((key) => {
        initialVisibility[key] = true;
      });
      setVisibleSeries(initialVisibility);
    }
  }, [displayKeys, visibleSeries]);

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
    if (displayKeys.length > 0) {
      const initialVisibility: Record<string, boolean> = {};
      displayKeys.forEach((key) => {
        initialVisibility[key] = true;
      });
      setVisibleSeries(initialVisibility);
    }
  }, [isGrouped]); // Solo depende de isGrouped, no de seriesKeys

  // Manejar el cambio en el brush
  const handleBrushChange = (brushRange: BrushRange | null) => {
    if (
      brushRange &&
      brushRange.startIndex !== undefined &&
      brushRange.endIndex !== undefined
    ) {
      const years = Array.from({ length: 8 }, (_, i) => (2015 + i).toString());
      setSelectedStartYear(years[brushRange.startIndex]);
      setSelectedEndYear(years[brushRange.endIndex]);
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
        {displayKeys.map((key) => (
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
          <AreaChart
            data={formattedData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='year' />
            <YAxis />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  // Filtrar y ordenar el payload según el orden de visualización
                  const filteredPayload = payload.filter(
                    (entry) => entry.dataKey !== "total"
                  );

                  // Ordenar según displayOrder para mostrar en el tooltip
                  const sortedPayload = [...filteredPayload].sort((a, b) => {
                    const indexA = displayOrder.indexOf(a.dataKey as string);
                    const indexB = displayOrder.indexOf(b.dataKey as string);
                    return indexA - indexB;
                  });

                  // Calcular el total sumando todos los valores visibles
                  const total = sortedPayload.reduce(
                    (sum, entry) => sum + (entry.value as number),
                    0
                  );

                  return (
                    <div className='tooltip-leroy-merlin p-3 border rounded shadow-sm'>
                      <p className='font-medium text-primary'>{`Año: ${label}`}</p>
                      <p className='font-medium mt-1'>{`Total: ${total}`}</p>
                      <div className='mt-2'>
                        {sortedPayload.map((entry, index) => {
                          const value = entry.value as number;

                          return (
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
                              <span className='font-medium'>: {value}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            {seriesKeys.map((key) => (
              <Area
                key={key}
                type='monotone'
                dataKey={key}
                stackId='1'
                stroke={colors[key] || "#888888"}
                fill={colors[key] || "#888888"}
                hide={!visibleSeries[key]}
              />
            ))}
            <Brush
              dataKey='year'
              height={30}
              stroke={leroyMerlinColors.verdePrincipal}
              fill='#fff'
              onChange={handleBrushChange}
              className='brush-leroy-merlin'
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <ChartLegend startYear={selectedStartYear} endYear={selectedEndYear} />
    </div>
  );
}

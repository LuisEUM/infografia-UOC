"use client";

import { useState, useMemo, useEffect } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  ReferenceLine,
  Brush,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
// Añadir la importación de leroyMerlinColors
import {
  groupGrowthData,
  groupColors,
  leroyMerlinColors,
} from "@/app/pec3/utils/data-grouping";
import ChartLegend from "./chart-legend";

interface DivergentBarChartProps {
  data: any[];
  isLoading: boolean;
  isError: boolean;
  isGrouped?: boolean;
}

interface BrushRange {
  startIndex?: number;
  endIndex?: number;
}

export default function DivergentBarChart({
  data,
  isLoading,
  isError,
  isGrouped = false,
}: DivergentBarChartProps) {
  // Estado para controlar qué series están visibles
  const [visibleSeries, setVisibleSeries] = useState<Record<string, boolean>>(
    {}
  );

  // Estado para los años de comparación
  const [startYear, setStartYear] = useState<string>("2015");
  const [endYear, setEndYear] = useState<string>("2022");

  // Orden específico de los tipos de vasos
  const seriesOrder = isGrouped
    ? ["Deporte & enseño", "Ocio & recreo", "Terapia & relax"]
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

  // Obtener las claves de las series (tipos de vasos) en el orden específico
  const seriesKeys = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Filtrar seriesOrder para incluir solo los tipos que existen en los datos
    const availableTypes = new Set(data.map((item) => item.tipo));
    return seriesOrder.filter((type) => availableTypes.has(type));
  }, [data, seriesOrder]);

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

  // Calcular el crecimiento para cada tipo de vaso entre los años seleccionados
  const growthData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Mostrar el crecimiento entre los años seleccionados
    const totalGrowth = data
      .filter((item) => visibleSeries[item.tipo])
      .map((item) => {
        const valorInicio = item[startYear];
        const valorFin = item[endYear];
        const growth = valorFin - valorInicio;
        const percentGrowth = ((valorFin - valorInicio) / valorInicio) * 100;

        return {
          tipo: item.tipo,
          delta: growth,
          percentDelta: Math.round(percentGrowth * 10) / 10,
          valorInicio,
          valorFin,
        };
      })
      .sort((a, b) => b.delta - a.delta); // Ordenar por delta de mayor a menor

    // Si está agrupado, agrupar los datos
    return isGrouped ? groupGrowthData(totalGrowth) : totalGrowth;
  }, [data, seriesOrder, visibleSeries, isGrouped, startYear, endYear]);

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

  // Colores para las barras basados en el valor
  const getBarColor = (delta: number) => {
    return delta >= 0
      ? leroyMerlinColors.verdePrincipal
      : leroyMerlinColors.rojo; // verde para positivo, rojo para negativo
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
            className='data-[state=on]:bg-zinc-200 data-[state=on]:dark:bg-zinc-700 data-[state=on]:text-foreground'
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
            data={growthData}
            margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
            layout='vertical'
          >
            <CartesianGrid
              strokeDasharray='3 3'
              horizontal={true}
              vertical={false}
            />
            <XAxis type='number' />
            <YAxis
              type='category'
              dataKey='tipo'
              width={120}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const entry = payload[0];
                  const tipo = label;
                  const delta = entry.value as number;
                  const percentDelta = growthData.find(
                    (item) => item.tipo === tipo
                  )?.percentDelta;
                  const valorInicio = growthData.find(
                    (item) => item.tipo === tipo
                  )?.valorInicio;
                  const valorFin = growthData.find(
                    (item) => item.tipo === tipo
                  )?.valorFin;

                  return (
                    <div className='p-3 bg-background border rounded shadow-sm'>
                      <p className='font-medium'>{tipo}</p>
                      <div className='mt-2 space-y-1'>
                        <p>
                          Valor {startYear}: {valorInicio}
                        </p>
                        <p>
                          Valor {endYear}: {valorFin}
                        </p>
                        <p>
                          Cambio:{" "}
                          {typeof delta === "number" && delta > 0 ? "+" : ""}
                          {delta} unidades
                        </p>
                        <p>
                          Porcentaje:{" "}
                          {typeof percentDelta === "number" && percentDelta > 0
                            ? "+"
                            : ""}
                          {percentDelta}%
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine x={0} stroke='#666' />
            <Bar
              dataKey='delta'
              name='Cambio absoluto'
              fill='#888888' // Color base que será sobrescrito
            >
              {growthData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.delta)} />
              ))}
              <LabelList
                dataKey='delta'
                position='right'
                formatter={(value: number) => `${value > 0 ? "+" : ""}${value}`}
              />
            </Bar>
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
              stroke='#8884d8'
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

"use client";

import { useState, useMemo, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
// Añadir la importación de leroyMerlinColors
import {
  transformYearlyData,
  groupColors,
  leroyMerlinColors,
} from "@/app/pec3/utils/data-grouping";

interface LineTrendChartProps {
  data: any[];
  isLoading: boolean;
  isError: boolean;
  isGrouped?: boolean;
}

export default function LineTrendChart({
  data,
  isLoading,
  isError,
  isGrouped = false,
}: LineTrendChartProps) {
  // Estado para controlar qué series están visibles
  const [visibleSeries, setVisibleSeries] = useState<Record<string, boolean>>(
    {}
  );

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

  // Transformar los datos para el gráfico de líneas
  const formattedData = useMemo(() => {
    if (!processedData || processedData.length === 0) return [];

    // Crear un objeto para cada año con todos los tipos de vasos
    const yearData: Record<string, any> = {};
    const years = Array.from({ length: 8 }, (_, i) => (2015 + i).toString());

    // Inicializar el objeto para cada año
    years.forEach((year) => {
      yearData[year] = { year };
    });

    // Llenar los datos para cada tipo de vaso por año
    processedData.forEach((item) => {
      const tipoVaso = item.tipo;
      years.forEach((year) => {
        yearData[year][tipoVaso] = item[year];
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

  if (isLoading) {
    return (
      <div className='w-full space-y-4'>
        <Skeleton className='w-full h-[400px]' />
      </div>
    );
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
          <LineChart
            data={formattedData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='year' />
            <YAxis />
            <Tooltip
              formatter={(value, name) => [value, name]}
              labelFormatter={(label) => `Año: ${label}`}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  // Ordenar el payload de mayor a menor valor
                  const sortedPayload = [...payload].sort(
                    (a, b) => (b.value as number) - (a.value as number)
                  );

                  return (
                    <div className='p-3 bg-background border rounded shadow-sm'>
                      <p className='font-medium'>{`Año: ${label}`}</p>
                      <div className='mt-2'>
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
            <Legend
              onClick={(e) => e.dataKey && toggleSeries(e.dataKey as string)}
              formatter={(value: string) => (
                <span style={{ color: colors[value] }}>{value}</span>
              )}
            />
            {seriesKeys.map((key) => (
              <Line
                key={key}
                type='monotone'
                dataKey={key}
                stroke={colors[key] || "#888888"}
                activeDot={{ r: 8 }}
                dot={false}
                hide={!visibleSeries[key]}
                strokeWidth={isGrouped ? 2 : 1.5}
              />
            ))}
            <Brush
              dataKey='year'
              height={30}
              stroke={leroyMerlinColors.verdePrincipal}
              fill='#fff'
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className='flex flex-wrap gap-2'>
        <Badge variant='outline' className='text-xs'>
          Haz clic en la leyenda para mostrar/ocultar series
        </Badge>
        <Badge variant='outline' className='text-xs'>
          Usa el brush inferior para hacer zoom en un período específico
        </Badge>
      </div>
    </div>
  );
}

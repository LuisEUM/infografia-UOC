"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface VisualizationProps {
  data: any[]
  isLoading: boolean
  isError: boolean
}

export default function Visualization({ data, isLoading, isError }: VisualizationProps) {
  const [chartType, setChartType] = useState<string>("bar")
  const [yearFilter, setYearFilter] = useState<string>("all")

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-[400px]" />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="p-4 text-center">
        <p className="text-destructive">No se pudieron cargar los datos para la visualización.</p>
      </div>
    )
  }

  // Preparar los datos para la visualización
  const prepareChartData = () => {
    if (yearFilter === "all") {
      // Para todos los años, mostramos la evolución por tipo de vaso
      return data
    } else {
      // Para un año específico, filtramos solo ese año
      const year = Number.parseInt(yearFilter, 10)
      return data.map((item) => ({
        tipo: item.tipo,
        [year]: item[year],
      }))
    }
  }

  const chartData = prepareChartData()
  const years = Array.from({ length: 8 }, (_, i) => (2015 + i).toString())

  // Colores para cada tipo de vaso
  const colors = [
    "#2563eb", // blue-600
    "#16a34a", // green-600
    "#ea580c", // orange-600
    "#dc2626", // red-600
    "#9333ea", // purple-600
    "#0891b2", // cyan-600
    "#4f46e5", // indigo-600
    "#db2777", // pink-600
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <CardTitle>Evolución de Vasos por Tipo y Año</CardTitle>
            <CardDescription>Visualización de datos de diferentes tipos de vasos entre 2015 y 2022</CardDescription>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo de gráfico" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bar">Gráfico de Barras</SelectItem>
                <SelectItem value="line">Gráfico de Líneas</SelectItem>
              </SelectContent>
            </Select>

            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por año" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los años</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[500px]">
          {chartType === "bar" ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tipo" angle={-45} textAnchor="end" height={70} />
                <YAxis />
                <Tooltip />
                <Legend />
                {yearFilter === "all" ? (
                  years.map((year, index) => (
                    <Bar key={year} dataKey={year} fill={colors[index % colors.length]} name={`Año ${year}`} />
                  ))
                ) : (
                  <Bar dataKey={yearFilter} fill={colors[0]} name={`Año ${yearFilter}`} />
                )}
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tipo" angle={-45} textAnchor="end" height={70} />
                <YAxis />
                <Tooltip />
                <Legend />
                {yearFilter === "all" ? (
                  years.map((year, index) => (
                    <Line
                      key={year}
                      type="monotone"
                      dataKey={year}
                      stroke={colors[index % colors.length]}
                      name={`Año ${year}`}
                    />
                  ))
                ) : (
                  <Line type="monotone" dataKey={yearFilter} stroke={colors[0]} name={`Año ${yearFilter}`} />
                )}
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

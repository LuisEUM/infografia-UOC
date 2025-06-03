"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import DataLoader from "@/app/pec3/components/data-loader"
import GrowthBarChart from "@/app/pec3/components/growth-bar-chart"
import StackedAreaChart from "@/app/pec3/components/stacked-area-chart"
import MarketSharePieChart from "@/app/pec3/components/market-share-pie-chart"
import GroupedBarChart from "@/app/pec3/components/grouped-bar-chart"
import { useState } from "react"
import GroupToggle from "@/app/pec3/components/group-toggle"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function HomePage() {
  // Estado para sincronizar el año seleccionado entre gráficos
  const [selectedYear, setSelectedYear] = useState<string>("2022")
  // Estado para controlar si los datos se muestran agrupados o individuales
  const [isGrouped, setIsGrouped] = useState<boolean>(false)

  return (
    <div className="space-y-8">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Visualización interactiva</AlertTitle>
        <AlertDescription>
          Utiliza el toggle "Individual/Agrupado" para alternar entre ver los datos por tipo de vaso individual o
          agrupados por categoría. Cada visualización ofrece diferentes perspectivas de los mismos datos cuantitativos y
          discretos.
        </AlertDescription>
      </Alert>

      <GroupToggle isGrouped={isGrouped} onToggleGrouping={setIsGrouped} />

      <DataLoader url="/api/data">
        {(data, isLoading, isError) => (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Tendencias de Vasos por Tipo (2015-2022)</CardTitle>
                <CardDescription>
                  Gráfico de área apilada que muestra la evolución y composición del mercado a lo largo del tiempo.
                  Ideal para visualizar tanto el crecimiento total como la contribución relativa de cada tipo de vaso
                  año a año. Usa el brush inferior para seleccionar un rango de años específico.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <StackedAreaChart data={data} isLoading={isLoading} isError={isError} isGrouped={isGrouped} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comparativa de Vasos por Años Seleccionados</CardTitle>
                <CardDescription>
                  Gráfico de barras agrupadas que permite comparar directamente los valores de diferentes tipos de vasos
                  en años específicos. Ideal para hacer comparaciones en el mismo eje y detectar patrones de cambio
                  entre períodos seleccionados. Usa el brush inferior para seleccionar los años a comparar.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <GroupedBarChart data={data} isLoading={isLoading} isError={isError} isGrouped={isGrouped} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cuota de Mercado por Tipo</CardTitle>
                <CardDescription>
                  Gráfico circular que muestra la distribución porcentual de cada tipo de vaso en el período
                  seleccionado. Perfecto para entender la proporción que representa cada tipo en el total del mercado y
                  su relevancia relativa. Usa el brush inferior para seleccionar el período a analizar.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <MarketSharePieChart
                  data={data}
                  isLoading={isLoading}
                  isError={isError}
                  selectedYear={selectedYear}
                  onYearChange={setSelectedYear}
                  isGrouped={isGrouped}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cambio por Tipo de Vaso</CardTitle>
                <CardDescription>
                  Gráfico de barras divergentes que enfatiza las desviaciones positivas y negativas dentro del conjunto
                  de datos. Ideal para destacar el crecimiento o decrecimiento de cada tipo de vaso entre períodos
                  seleccionados. Usa el brush inferior para seleccionar el rango de años a comparar.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <GrowthBarChart data={data} isLoading={isLoading} isError={isError} isGrouped={isGrouped} />
              </CardContent>
            </Card>
          </div>
        )}
      </DataLoader>
    </div>
  )
}

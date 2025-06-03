"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import DataLoader from "@/app/pec3/components/data-loader"
import StackedAreaChart from "@/app/pec3/components/stacked-area-chart"
import { useState } from "react"
import GroupToggle from "@/app/pec3/components/group-toggle"
import Image from "next/image"

export default function FinalPage() {
  // Estado para controlar si los datos se muestran agrupados o individuales
  const [isGrouped, setIsGrouped] = useState<boolean>(false)

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Presentación Final</h1>
          <p className="text-muted-foreground">Visualización mejorada para Leroy Merlin</p>
        </div>
        <div className="flex-shrink-0">
          <Image
            src="/images/leroy-merlin-logo.png"
            alt="Leroy Merlin"
            width={180}
            height={100}
            className="object-contain"
          />
        </div>
      </div>

      <Card className="border-primary/20">
        <CardHeader className="bg-primary/5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl text-primary">Tendencias de Vasos por Tipo (2015-2022)</CardTitle>
              <CardDescription>
                Evolución y composición del mercado de vasos de piscina a lo largo del tiempo
              </CardDescription>
            </div>
            <div className="flex items-center">
              <GroupToggle isGrouped={isGrouped} onToggleGrouping={setIsGrouped} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <DataLoader url="/api/data">
            {(data, isLoading, isError) => (
              <div className="space-y-4">
                <div className="p-4 bg-primary/5 rounded-md border border-primary/20">
                  <h3 className="font-medium text-primary mb-2">Análisis de Tendencias</h3>
                  <p className="text-sm">
                    Este gráfico muestra la evolución de los diferentes tipos de vasos de piscina entre 2015 y 2022,
                    permitiendo visualizar tanto el crecimiento total como la contribución relativa de cada tipo año a
                    año. Los datos muestran un crecimiento sostenido en la mayoría de categorías, con los vasos
                    Polivalentes y de Recreo liderando el mercado.
                  </p>
                </div>
                <StackedAreaChart data={data} isLoading={isLoading} isError={isError} isGrouped={isGrouped} />
              </div>
            )}
          </DataLoader>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground border-t pt-4">
          Fuente: Manual de Marca Leroy Merlin - https://cdn.bndlyr.com/nr1dxae7lw/_assets/elementos_graficos.pdf
        </CardFooter>
      </Card>

      <Card className="border-primary/20">
        <CardHeader className="bg-primary/5">
          <CardTitle className="text-primary">Conclusiones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-md border-primary/20 bg-primary/5">
              <h3 className="font-medium text-primary mb-2">Crecimiento del Mercado</h3>
              <p className="text-sm">
                El mercado total de vasos de piscina ha experimentado un crecimiento constante desde 2015, con un
                incremento acumulado del 33% hasta 2022. Este crecimiento refleja la expansión del sector de
                construcción y renovación de piscinas en España.
              </p>
            </div>
            <div className="p-4 border rounded-md border-primary/20 bg-primary/5">
              <h3 className="font-medium text-primary mb-2">Distribución por Categorías</h3>
              <p className="text-sm">
                Los vasos Polivalentes y de Recreo representan más del 60% del mercado total, mostrando la preferencia
                de los consumidores por soluciones versátiles y orientadas al ocio familiar.
              </p>
            </div>
            <div className="p-4 border rounded-md border-primary/20 bg-primary/5">
              <h3 className="font-medium text-primary mb-2">Tendencias Emergentes</h3>
              <p className="text-sm">
                Los vasos de Hidromasaje muestran un crecimiento porcentual superior a la media, indicando un interés
                creciente en soluciones de bienestar y relajación.
              </p>
            </div>
            <div className="p-4 border rounded-md border-primary/20 bg-primary/5">
              <h3 className="font-medium text-primary mb-2">Oportunidades de Negocio</h3>
              <p className="text-sm">
                Para Leroy Merlin, estos datos sugieren oportunidades en la expansión de la oferta de productos
                relacionados con vasos Polivalentes y de Hidromasaje, así como en servicios de instalación y
                mantenimiento.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

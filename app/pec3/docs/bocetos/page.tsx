"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function BocetosPage() {
  const [currentSketch, setCurrentSketch] = useState(0)

  const sketches = [
    {
      id: 1,
      title: "Gráfico de Barras Agrupadas",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZL5lzmybNvR1vz9Wj1hvzwdb6zrPOH.png",
      description:
        "Inspirado en el material universitario de la UOC. Este tipo de gráfico es ideal para comparar directamente valores de diferentes categorías a lo largo de varios períodos de tiempo.",
    },
    {
      id: 2,
      title: "Gráfico de Barras Divergentes",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-bgvlCTdDywSvBDKY0GVFAqxUVOHikb.png",
      description:
        "Tomado del material didáctico de la UOC. Este tipo de gráfico es perfecto para enfatizar desviaciones positivas y negativas, mostrando claramente crecimientos y decrecimientos.",
    },
    {
      id: 3,
      title: "Gráfico Circular",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lUK4A331NZI3OxMNW0NXADRIAH3M1V.png",
      description:
        "Basado en los ejemplos del material de la UOC. El gráfico circular es óptimo para visualizar proporciones y distribuciones porcentuales en un momento específico.",
    },
    {
      id: 4,
      title: "Gráfico de Áreas Apiladas",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ak94CngHjwo3Tj9v076m2NBtsziWwr.png",
      description:
        "Inspirado en el material de la UOC. Este tipo de gráfico es excelente para mostrar tendencias temporales y la composición de un total a lo largo del tiempo.",
    },
    {
      id: 6,
      title: "Visualización Completa - Modo Individual",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screencapture-kzmj8t7qj9uz0x1grkgi-lite-vusercontent-net-2025-04-21-08_00_56-4vhrJa9nMngHMLiLkTghMPsLWhilBb.png",
      description:
        "Prueba de estilo de presentación con datos individuales para cada uno de los 8 tipos de vasos. Esta vista detallada permite analizar comportamientos específicos de cada tipo de vaso y detectar patrones únicos, ideal para un análisis más profundo y técnico de los datos.",
    },
    {
      id: 7,
      title: "Boceto Final Seleccionado - Gráfico de Área Apilada",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LiDoBz7mjCuy7qyzEpntCpnaVfOzCw.png",
      description:
        "Este es el boceto final seleccionado por su similitud con la gráfica inicial y porque determina que la información principal a transmitir es averiguar las tendencias año tras año. El gráfico de área apilada permite visualizar tanto el crecimiento total como la contribución relativa de cada tipo de vaso a lo largo del tiempo.",
    },
  ]

  const nextSketch = () => {
    setCurrentSketch((prev) => (prev + 1) % sketches.length)
  }

  const prevSketch = () => {
    setCurrentSketch((prev) => (prev - 1 + sketches.length) % sketches.length)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Propuestas de Rediseño</CardTitle>
          <CardDescription>
            Estos bocetos muestran las diferentes propuestas para mejorar la visualización original, inspirados en el
            material didáctico de la UOC (https://materials.campus.uoc.edu/cdocent/PID_00279602/) y aplicando los
            principios de diseño de información y las buenas prácticas en visualización de datos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">{sketches[currentSketch].title}</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={prevSketch} aria-label="Boceto anterior">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextSketch} aria-label="Siguiente boceto">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="overflow-hidden border rounded-md">
              <img
                src={sketches[currentSketch].image || "/placeholder.svg"}
                alt={sketches[currentSketch].title}
                className="object-contain w-full max-h-[500px]"
              />
            </div>

            <div className="mt-4">
              <p className="text-muted-foreground">{sketches[currentSketch].description}</p>
            </div>

            <div className="flex justify-center mt-6">
              {sketches.map((_, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className={`w-8 h-8 p-0 mx-1 rounded-full ${
                    index === currentSketch ? "bg-primary text-primary-foreground" : ""
                  }`}
                  onClick={() => setCurrentSketch(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Justificación del Rediseño</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
          <p>
            El rediseño propuesto aborda los problemas identificados en la visualización original mediante un enfoque
            integral que considera tanto la representación visual como la interactividad y la experiencia del usuario.
            Nos hemos inspirado en los ejemplos de visualización del material didáctico de la UOC para implementar
            soluciones efectivas y probadas.
          </p>

          <h3>Proceso de Datos</h3>
          <p>Para crear estas visualizaciones, hemos seguido un proceso estructurado de transformación de datos:</p>
          <ol>
            <li>
              <strong>Recopilación de datos brutos</strong> desde el archivo CSV original.
            </li>
            <li>
              <strong>Transformación a formato JSON</strong> para facilitar el procesamiento con Recharts.
            </li>
            <li>
              <strong>Ordenamiento y estructuración</strong> de los datos según las necesidades de cada visualización.
            </li>
            <li>
              <strong>Post-procesamiento</strong> para calcular valores derivados como totales acumulativos para la
              gráfica de cuotas de mercado y crecimiento total.
            </li>
          </ol>

          <h3>Tipos de Gráficos Utilizados</h3>
          <p>
            Basándonos en los ejemplos del material didáctico de la UOC, hemos implementado cuatro tipos diferentes de
            gráficos, cada uno con un propósito específico:
          </p>
          <ul>
            <li>
              <strong>Gráfico de Barras Agrupadas:</strong> Ideal para hacer comparaciones directas en el mismo eje.
              Permite comparar los valores de diferentes tipos de vasos para años específicos.
            </li>
            <li>
              <strong>Gráfico de Barras Divergentes:</strong> Nos ayuda a enfatizar las desviaciones negativas y
              positivas dentro del conjunto de datos, destacando el crecimiento o decrecimiento de cada tipo de vaso.
            </li>
            <li>
              <strong>Gráfica Circular (de Tarta):</strong> Ideal para visualizar datos en proporciones, mostrando la
              distribución porcentual de cada tipo de vaso en el período seleccionado.
            </li>
            <li>
              <strong>Gráfico de Áreas Apiladas:</strong> Perfecto para visualizar tendencias, permitiendo comparar de
              forma rápida y fácil la evolución y composición del mercado a lo largo del tiempo.
            </li>
          </ul>

          <h3>Modos de Visualización: Individual vs. Agrupado</h3>
          <p>
            Hemos implementado dos modos de visualización complementarios que ofrecen diferentes perspectivas de los
            mismos datos:
          </p>
          <ul>
            <li>
              <strong>Modo Individual:</strong> Muestra datos detallados para cada uno de los 8 tipos de vasos por
              separado, permitiendo un análisis granular de comportamientos específicos y la detección de patrones
              únicos. Este modo es ideal para análisis técnicos profundos y para usuarios que necesitan examinar cada
              tipo de vaso en detalle.
            </li>
            <li>
              <strong>Modo Agrupado:</strong> Presenta los datos organizados en cuatro categorías principales (Deporte &
              enseño, Ocio & recreo, Terapia & relax, y Mixta), simplificando la visualización y facilitando la
              identificación de tendencias generales a nivel de categoría. Este modo es perfecto para presentaciones
              ejecutivas y para comunicar hallazgos clave a audiencias no técnicas.
            </li>
          </ul>
          <p>
            La capacidad de alternar entre estos dos modos proporciona una flexibilidad excepcional, permitiendo a los
            usuarios adaptar la visualización según sus necesidades específicas de análisis y comunicación.
          </p>

          <h3>Selección Final</h3>
          <p>
            Después de evaluar todas las opciones, hemos seleccionado el <strong>Gráfico de Áreas Apiladas</strong> como
            la mejor opción para nuestro rediseño final por las siguientes razones:
          </p>
          <ul>
            <li>
              <strong>Similitud con la gráfica original:</strong> Mantiene la esencia de mostrar todos los tipos de
              vasos simultáneamente, facilitando la transición para usuarios familiarizados con la visualización
              original.
            </li>
            <li>
              <strong>Enfoque en tendencias temporales:</strong> Permite visualizar claramente las tendencias año tras
              año, que es la información principal que queremos transmitir.
            </li>
            <li>
              <strong>Visualización de composición:</strong> Muestra tanto el crecimiento total como la contribución
              relativa de cada tipo de vaso en cada año.
            </li>
            <li>
              <strong>Interactividad mejorada:</strong> La implementación incluye funcionalidades para mostrar/ocultar
              tipos específicos y seleccionar rangos de años, mejorando significativamente la experiencia del usuario.
            </li>
          </ul>

          <h3>Principios de Diseño Aplicados</h3>
          <ul>
            <li>
              <strong>Datos cuantitativos y discretos:</strong> Los datos de tipos de vasos son cuantitativos y
              discretos, lo que permite su representación mediante diferentes tipos de gráficos complementarios.
            </li>
            <li>
              <strong>Partes dentro de un todo:</strong> Cada tipo de vaso representa una parte del total, lo que
              justifica el uso de gráficos de área apilada y gráficos de pastel para mostrar proporciones.
            </li>
            <li>
              <strong>Múltiples perspectivas:</strong> No existe una solución única para representar un mismo conjunto
              de datos, por ello se han implementado varios gráficos que ayudan a aclarar diferentes tipos de
              conclusiones.
            </li>
          </ul>

          <h3>Consistencia Visual</h3>
          <p>Se ha mantenido una consistencia visual a lo largo de todas las visualizaciones mediante:</p>
          <ul>
            <li>
              <strong>Paleta de colores coherente:</strong> Cada tipo de vaso mantiene el mismo color en todos los
              gráficos, facilitando su identificación y seguimiento a través de las diferentes visualizaciones.
            </li>
            <li>
              <strong>Agrupación por categorías:</strong> Los colores de las categorías agrupadas (Deporte & enseño,
              Ocio & recreo, Terapia & relax, Mixta) siguen un esquema lógico donde cada categoría tiene un color
              distintivo.
            </li>
            <li>
              <strong>Interactividad consistente:</strong> Todos los gráficos comparten patrones de interacción
              similares, como tooltips al pasar el cursor, toggles para mostrar/ocultar series y brushes para
              seleccionar rangos de tiempo.
            </li>
          </ul>

          <h3>Conclusión</h3>
          <p>
            Nunca existe una solución única para representar un mismo conjunto de datos, es por ello que hemos explorado
            la idea de implementar varios gráficos complementarios que ayuden a aclarar diferentes tipos de
            conclusiones:
          </p>
          <ul>
            <li>
              <strong>El gráfico de barras agrupadas</strong> permite comparaciones directas entre tipos de vasos para
              años específicos, facilitando el análisis de patrones de cambio entre períodos seleccionados.
            </li>
            <li>
              <strong>El gráfico de barras divergentes</strong> enfatiza el crecimiento o decrecimiento, permitiendo
              identificar rápidamente qué tipos han experimentado los cambios más significativos.
            </li>
            <li>
              <strong>El gráfico circular</strong> ofrece una visión clara de la distribución proporcional, ideal para
              entender la relevancia relativa de cada tipo en el mercado total.
            </li>
            <li>
              <strong>El gráfico de áreas apiladas</strong> muestra la evolución temporal y la composición, permitiendo
              analizar tanto el crecimiento total como las contribuciones individuales a lo largo del tiempo.
            </li>
          </ul>

          <p>
            La interactividad implementada en todas las visualizaciones permite al usuario explorar los datos desde
            múltiples perspectivas, filtrar la información según sus necesidades específicas y extraer conclusiones
            personalizadas. Esta capacidad de manipulación directa empodera al usuario para descubrir patrones y
            relaciones que podrían no ser evidentes en una visualización estática, transformando la experiencia de
            análisis de datos en un proceso dinámico y personalizado.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

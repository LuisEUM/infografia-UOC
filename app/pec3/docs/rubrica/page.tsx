import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function RubricaPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Rúbrica de Evaluación</h1>
        <Link href="/">
          <Button variant="outline" size="sm">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Volver a Visualización
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Criterios de Evaluación</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Rúbrica de evaluación PEC3</h1>

          <h2>Criterios de evaluación</h2>
          <p>Estos resultados de aprendizaje se evaluarán mediante los siguientes criterios de evaluación:</p>

          <div className="mb-6">
            <h3 className="text-lg font-bold">10%</h3>
            <ul>
              <li>
                El discurso está bien estructurado y demuestra fluidez oral, respetando los tiempos del enunciado.
              </li>
              <li>Se usan correctamente los elementos visuales y el video resulta claro y ameno.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold">30%</h3>
            <ul>
              <li>
                Se identifica un mínimo de 5 elementos erróneos o necesidades de mejora, ya de sea gráfica, de
                contenido, o de ambos.
              </li>
              <li>Se muestran estos elementos erróneos.</li>
              <li>
                Se justifica el porqué o porqués del error en los elementos indicados, ya sea por selección y uso de
                datos, representación gráfica, lectura de los conjuntos u otros aspectos y factores motivadores.
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold">40%</h3>
            <ul>
              <li>
                Se realiza un boceto de rediseño que soluciona los problemas descritos en el apartado anterior y se
                justifica la solución.
              </li>
              <li>
                Se realiza el boceto con un uso correcto de todos los elementos de la visualización: tipografía y color,
                etiquetado, título, ejes, escalas.
              </li>
              <li>Se adapta el boceto a la imagen de marca y al contexto y los datos existentes.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold">20%</h3>
            <ul>
              <li>
                En la implementación del rediseño con una herramienta de visualización de datos se utilizan los datos
                reales proporcionados.
              </li>
              <li>Se captura la funcionalidad descrita en el boceto.</li>
              <li>Se adapta a la imagen de marca y al contexto.</li>
            </ul>
          </div>

          <h2>Calificaciones posibles</h2>
          <ul>
            <li>
              <strong>A</strong>: Cumple todos los criterios de evaluación.
            </li>
            <li>
              <strong>B</strong>: Cumple todos los criterios de evaluación de forma parcial.
            </li>
            <li>
              <strong>C+</strong>: Cumple gran parte de los criterios de evaluación.
            </li>
            <li>
              <strong>C-</strong>: No cumple gran parte de los criterios de evaluación.
            </li>
            <li>
              <strong>D</strong>: No cumple los criterios de evaluación.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

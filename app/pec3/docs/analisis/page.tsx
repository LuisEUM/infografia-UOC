import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function AnalisisPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Análisis de Errores y Necesidades</h1>
        <Link href="/">
          <Button variant="outline" size="sm">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Volver a Visualización
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Visualización Original</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden border rounded-md mb-6">
            <img
              src="/assets/visualizacion_original.png"
              alt="Visualización original"
              className="object-cover w-full"
            />
          </div>
          <p className="text-muted-foreground mb-4">
            La visualización original "Al agua, patos!" presenta varios problemas que dificultan la comprensión de los
            datos y no sigue las buenas prácticas de visualización.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Errores Identificados</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
          <h3>1. Uso de gráfico 3D innecesario</h3>
          <p>
            El gráfico utiliza una representación tridimensional que distorsiona la percepción de los valores. La
            perspectiva 3D hace que sea difícil comparar con precisión los valores entre diferentes categorías y años.
          </p>

          <h3>2. Sobrecarga visual</h3>
          <p>
            La visualización contiene demasiados elementos visuales que compiten por la atención del usuario. Los
            colores brillantes, las líneas de cuadrícula en 3D y la perspectiva crean un ruido visual que dificulta la
            interpretación de los datos.
          </p>

          <h3>3. Título poco informativo</h3>
          <p>
            El título "Al agua, patos!" es llamativo pero no proporciona información sobre el contenido real de la
            visualización. Un buen título debería indicar qué datos se están mostrando y posiblemente destacar algún
            hallazgo clave.
          </p>

          <h3>4. Etiquetas de eje difíciles de leer</h3>
          <p>
            Las etiquetas en el eje X (tipos de vaso) están en ángulo y son difíciles de leer debido a la perspectiva
            3D. Además, no hay suficiente contraste entre las etiquetas y el fondo.
          </p>

          <h3>5. Uso ineficiente del espacio</h3>
          <p>
            Gran parte del espacio visual se dedica a elementos decorativos (como el fondo rojo y el efecto 3D) en lugar
            de a la presentación de datos. Esto reduce la relación datos-tinta y dificulta la extracción de información.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Necesidades de Mejora</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
          <ol>
            <li>
              <strong>Simplificar la representación</strong>: Eliminar el 3D y utilizar un gráfico 2D que permita una
              comparación más precisa de los valores.
            </li>
            <li>
              <strong>Mejorar la legibilidad</strong>: Utilizar etiquetas claras y bien posicionadas, con suficiente
              contraste para facilitar la lectura.
            </li>
            <li>
              <strong>Título y contexto informativos</strong>: Proporcionar un título descriptivo que indique el
              contenido de la visualización y posiblemente añadir un subtítulo o descripción para dar contexto.
            </li>
            <li>
              <strong>Uso eficiente del color</strong>: Utilizar una paleta de colores coherente y significativa, que
              ayude a distinguir las categorías sin crear sobrecarga visual.
            </li>
            <li>
              <strong>Interactividad</strong>: Añadir elementos interactivos que permitan al usuario explorar los datos
              de diferentes maneras (filtrar por año, tipo de vaso, etc.).
            </li>
            <li>
              <strong>Accesibilidad</strong>: Asegurar que la visualización sea accesible para personas con
              discapacidades visuales, utilizando suficiente contraste y elementos alternativos cuando sea necesario.
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}

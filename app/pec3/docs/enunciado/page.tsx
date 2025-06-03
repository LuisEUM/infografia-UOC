import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function EnunciadoPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Enunciado PEC3</h1>
        <Link href="/">
          <Button variant="outline" size="sm">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Volver a Visualización
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Objetivo y Competencias</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
          <h1>PEC3: Selección y rediseño de una mala práctica</h1>

          <h2>Objetivo</h2>
          <p>
            El principal objetivo de esta actividad es analizar una visualización de datos poco correcta, justificar las
            razones y motivos de que sea una mala práctica de visualización e implementar una versión mejorada adaptada
            para un cliente concreto.
          </p>

          <h2>Competencias</h2>
          <p>Para lograr el objetivo trabajaremos las siguientes competencias:</p>
          <ul>
            <li>
              <strong>CG6</strong>: Comprender el contexto cultural actual y los movimientos sociales relacionados con
              la cultura digital para imprimir una ética de cultura libre y abierta en la práctica del diseño.
            </li>
            <li>
              <strong>CE7</strong>: Elaborar mensajes teniendo en cuenta el público al que van dirigidos y las
              particularidades del encargo, aplicando un pensamiento estratégico y teniendo en cuenta las teorías de la
              comunicación.
            </li>
            <li>
              <strong>CT2</strong>: Comunicarse en una lengua extranjera (inglés).
            </li>
          </ul>

          <h2>Resultados de aprendizaje</h2>
          <p>Con el desarrollo de las competencias se esperan los siguientes resultados de aprendizaje:</p>
          <ul>
            <li>Analizar y clasificar visualizaciones de datos, detectando buenas y malas prácticas.</li>
            <li>
              Justificar la idoneidad de una visualización a partir de sus rasgos principales y teniendo en cuenta su
              ámbito y sector de aplicación.
            </li>
            <li>Defender las tomas de decisión propias de forma fundamentada.</li>
          </ul>

          <h2>Entrega</h2>
          <p>
            La entrega consistirá en un análisis detallado de una visualización con problemas, identificando al menos 5
            elementos erróneos o necesidades de mejora, y proponiendo un rediseño que solucione estos problemas. El
            rediseño debe adaptarse a la imagen de marca y al contexto existente.
          </p>
          <p>
            Además, se deberá implementar el rediseño utilizando una herramienta de visualización de datos y presentar
            todo el proceso en un vídeo de no más de 4 minutos.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

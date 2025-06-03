"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function SketchPreview() {
  const [currentSketch, setCurrentSketch] = useState(0)

  const sketches = [
    {
      id: 1,
      title: "Boceto de Rediseño General",
      image: "/sketches/04_Boceto_Redesign.png",
      description:
        "Este boceto muestra el rediseño general de la visualización, mejorando la legibilidad y eliminando elementos innecesarios.",
    },
    {
      id: 2,
      title: "Boceto de Detalle",
      image: "/placeholder.svg?height=400&width=600",
      description: "Este boceto muestra en detalle cómo se representarán los datos específicos y las interacciones.",
    },
  ]

  const nextSketch = () => {
    setCurrentSketch((prev) => (prev + 1) % sketches.length)
  }

  const prevSketch = () => {
    setCurrentSketch((prev) => (prev - 1 + sketches.length) % sketches.length)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bocetos de Rediseño</CardTitle>
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
        </div>
      </CardContent>
    </Card>
  )
}

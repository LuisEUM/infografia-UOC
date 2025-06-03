"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function VideoPlayer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Presentación en Vídeo</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="video" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="video">Vídeo</TabsTrigger>
            <TabsTrigger value="script">Guión</TabsTrigger>
          </TabsList>

          <TabsContent value="video" className="mt-4">
            <div className="overflow-hidden border rounded-md aspect-video">
              <div className="flex items-center justify-center w-full h-full bg-muted">
                <p className="text-muted-foreground">El vídeo de presentación se mostrará aquí</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="script" className="mt-4">
            <div className="p-4 border rounded-md">
              <h3 className="mb-4 text-lg font-medium">Guión del Vídeo</h3>
              <div className="space-y-4">
                <p>
                  <strong>Introducción (0:00 - 0:30):</strong> Presentación del proyecto y contexto.
                </p>
                <p>
                  <strong>Análisis de Errores (0:30 - 1:30):</strong> Identificación y explicación de los problemas en
                  la visualización original.
                </p>
                <p>
                  <strong>Proceso de Rediseño (1:30 - 2:30):</strong> Explicación de las decisiones tomadas para mejorar
                  la visualización.
                </p>
                <p>
                  <strong>Demostración (2:30 - 3:30):</strong> Presentación de la nueva visualización y sus
                  características.
                </p>
                <p>
                  <strong>Conclusión (3:30 - 4:00):</strong> Resumen de las mejoras y aprendizajes.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

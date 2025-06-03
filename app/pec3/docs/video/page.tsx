import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function VideoPage() {
  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader className="bg-primary/5">
          <CardTitle className="text-primary">Vídeo y Guión</CardTitle>
          <CardDescription>Presentación del análisis y rediseño de la visualización "Al agua, patos!"</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="video" className="w-full tabs-leroy-merlin">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="video">Vídeo</TabsTrigger>
              <TabsTrigger value="script">Guión</TabsTrigger>
            </TabsList>

            <TabsContent value="video" className="mt-4">
              <div className="overflow-hidden border rounded-md aspect-video border-primary/20">
                <div className="flex items-center justify-center w-full h-full bg-muted">
                  <p className="text-muted-foreground">El vídeo de presentación se mostrará aquí</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="script" className="mt-4">
              <div className="p-4 border rounded-md border-primary/20 bg-primary/5">
                <h3 className="mb-4 text-lg font-medium text-primary">Guión del Vídeo</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-bold text-primary">Introducción (0:00 - 0:30):</p>
                    <p>
                      Hola, en este vídeo presentaré mi análisis y rediseño de la visualización "Al agua, patos!", que
                      muestra la evolución de diferentes tipos de vasos de piscina entre 2015 y 2022. Estamos trabajando
                      con datos cuantitativos y discretos que representan cantidades específicas de diferentes tipos de
                      vasos a lo largo del tiempo. La visualización original presenta varios problemas que dificultan la
                      comprensión de los datos, y mi objetivo ha sido mejorarla aplicando buenas prácticas de
                      visualización y añadiendo interactividad para enriquecer el análisis.
                    </p>
                  </div>

                  <div>
                    <p className="font-bold text-primary">Análisis de Errores (0:30 - 1:15):</p>
                    <p>La visualización original presenta cinco problemas principales:</p>
                    <ol className="ml-6 list-decimal">
                      <li>
                        Uso de gráfico 3D innecesario que distorsiona la percepción de los valores y dificulta las
                        comparaciones precisas
                      </li>
                      <li>
                        Sobrecarga visual con demasiados elementos compitiendo por atención, reduciendo la relación
                        datos-tinta
                      </li>
                      <li>Título poco informativo que no describe el contenido ni proporciona contexto</li>
                      <li>Etiquetas de eje difíciles de leer debido a la perspectiva y el bajo contraste</li>
                      <li>Uso ineficiente del espacio con elementos decorativos en lugar de elementos informativos</li>
                    </ol>
                    <p>
                      Estos problemas hacen que sea difícil extraer información útil y pueden llevar a interpretaciones
                      erróneas de los datos.
                    </p>
                  </div>

                  <div>
                    <p className="font-bold text-primary">Proceso de Datos y Enfoque del Rediseño (1:15 - 2:00):</p>
                    <p>Para solucionar estos problemas, he seguido un proceso estructurado:</p>
                    <ol className="ml-6 list-decimal">
                      <li>Recopilación de los datos brutos del archivo CSV original</li>
                      <li>Transformación a formato JSON para facilitar el procesamiento con Recharts</li>
                      <li>Ordenamiento y estructuración de los datos según las necesidades de cada visualización</li>
                      <li>
                        Post-procesamiento para calcular valores derivados como totales acumulativos y tasas de
                        crecimiento
                      </li>
                    </ol>
                    <p>He aplicado un enfoque basado en estos principios:</p>
                    <ul className="ml-6 list-disc">
                      <li>
                        No existe una solución única para representar un conjunto de datos, por lo que he creado
                        múltiples visualizaciones complementarias
                      </li>
                      <li>Los datos son cuantitativos y discretos, representando partes dentro de un todo</li>
                      <li>
                        Cada tipo de gráfico tiene fortalezas específicas para comunicar diferentes aspectos de los
                        datos
                      </li>
                      <li>
                        La interactividad enriquece el análisis permitiendo explorar los datos desde diferentes
                        perspectivas
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-bold text-primary">Tipos de Gráficos Implementados (2:00 - 2:45):</p>
                    <p>He implementado cuatro tipos diferentes de gráficos, cada uno con un propósito específico:</p>
                    <ul className="ml-6 list-disc">
                      <li>
                        <strong>Gráfico de Barras Agrupadas:</strong> Ideal para hacer comparaciones directas en el
                        mismo eje. Permite comparar los valores de diferentes tipos de vasos para años específicos.
                      </li>
                      <li>
                        <strong>Gráfico de Barras Divergentes:</strong> Enfatiza las desviaciones negativas y positivas,
                        destacando el crecimiento o decrecimiento de cada tipo de vaso entre períodos seleccionados.
                      </li>
                      <li>
                        <strong>Gráfica Circular:</strong> Perfecta para visualizar datos en proporciones, mostrando la
                        distribución porcentual de cada tipo de vaso en el período seleccionado.
                      </li>
                      <li>
                        <strong>Gráfico de Áreas Apiladas:</strong> Ideal para visualizar tendencias, permitiendo
                        comparar la evolución y composición del mercado a lo largo del tiempo.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-bold text-primary">Demostración y Características (2:45 - 3:15):</p>
                    <p>Ahora mostraré las características clave del rediseño:</p>
                    <ul className="ml-6 list-disc">
                      <li>
                        <strong>Consistencia visual:</strong> Cada tipo de vaso mantiene el mismo color en todos los
                        gráficos para facilitar su seguimiento
                      </li>
                      <li>
                        <strong>Toggle de agrupación:</strong> Permite alternar entre ver los datos agrupados por
                        categoría (para tendencias generales) o individuales (para análisis detallado)
                      </li>
                      <li>
                        <strong>Interactividad:</strong> Todos los gráficos incluyen tooltips informativos, toggles para
                        mostrar/ocultar series, y brushes para seleccionar rangos de tiempo
                      </li>
                      <li>
                        <strong>Selección de períodos:</strong> Cada gráfico permite seleccionar rangos de años
                        específicos para análisis personalizados
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-bold text-primary">Valor de la Interactividad (3:15 - 3:40):</p>
                    <p>La interactividad implementada en todas las visualizaciones ofrece importantes ventajas:</p>
                    <ul className="ml-6 list-disc">
                      <li>Permite al usuario explorar los datos desde múltiples perspectivas</li>
                      <li>Facilita el filtrado de información según necesidades específicas</li>
                      <li>Posibilita la extracción de conclusiones personalizadas</li>
                      <li>
                        Empodera al usuario para descubrir patrones y relaciones que podrían no ser evidentes en una
                        visualización estática
                      </li>
                    </ul>
                    <p>
                      Esta capacidad de manipulación directa transforma la experiencia de análisis de datos en un
                      proceso dinámico y personalizado.
                    </p>
                  </div>

                  <div>
                    <p className="font-bold text-primary">Conclusión (3:40 - 4:00):</p>
                    <p>
                      Nunca existe una solución única para representar un mismo conjunto de datos. Cada tipo de gráfico
                      implementado ofrece ventajas específicas:
                    </p>
                    <ul className="ml-6 list-disc">
                      <li>
                        El gráfico de barras agrupadas facilita comparaciones directas entre tipos para años específicos
                      </li>
                      <li>El gráfico de barras divergentes enfatiza el crecimiento o decrecimiento</li>
                      <li>El gráfico circular ofrece una visión clara de la distribución proporcional</li>
                      <li>El gráfico de áreas apiladas muestra la evolución temporal y la composición</li>
                    </ul>
                    <p>
                      Estas mejoras transforman una visualización confusa en una herramienta analítica potente que
                      permite extraer conclusiones significativas a diferentes niveles de análisis, adaptándose a las
                      necesidades específicas de cada usuario.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

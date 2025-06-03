"use client"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { SplitSquareVertical, Layers } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { leroyMerlinColors, groupColors } from "@/app/pec3/utils/data-grouping"

interface GroupToggleProps {
  isGrouped: boolean
  onToggleGrouping: (grouped: boolean) => void
}

export default function GroupToggle({ isGrouped, onToggleGrouping }: GroupToggleProps) {
  return (
    <Card className="mb-8 border-primary/20">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="text-sm font-medium text-primary">Modo de visualización:</div>
            <ToggleGroup
              type="single"
              value={isGrouped ? "grouped" : "individual"}
              onValueChange={(value) => {
                if (value) {
                  // Prevent deselection
                  onToggleGrouping(value === "grouped")
                }
              }}
              className="group-toggle"
            >
              <ToggleGroupItem
                value="individual"
                aria-label="Ver tipos individuales"
                className="data-[state=active]:bg-zinc-100 data-[state=active]:dark:bg-zinc-800 data-[state=active]:text-foreground"
              >
                <SplitSquareVertical className="h-4 w-4 mr-2" />
                <span>Individual</span>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="grouped"
                aria-label="Ver tipos agrupados"
                className="data-[state=active]:bg-zinc-100 data-[state=active]:dark:bg-zinc-800 data-[state=active]:text-foreground"
              >
                <Layers className="h-4 w-4 mr-2" />
                <span>Agrupado</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="p-4 border rounded-md bg-primary/5 border-primary/20">
            {isGrouped ? (
              <div className="space-y-2">
                <h3 className="font-medium text-primary">Datos agrupados por categoría</h3>
                <p className="text-sm text-muted-foreground">
                  Visualizando datos agrupados en cuatro categorías principales:
                </p>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li>
                    <span className="font-medium" style={{ color: groupColors["Ocio & recreo"] }}>
                      Ocio & recreo:
                    </span>{" "}
                    Chapoteo, Recreo
                  </li>
                  <li>
                    <span className="font-medium" style={{ color: groupColors["Mixta"] }}>
                      Mixta:
                    </span>{" "}
                    Polivalente
                  </li>
                  <li>
                    <span className="font-medium" style={{ color: groupColors["Terapia & relax"] }}>
                      Terapia & relax:
                    </span>{" "}
                    Hidromasaje, Terapéutico
                  </li>
                  <li>
                    <span className="font-medium" style={{ color: groupColors["Deporte & enseño"] }}>
                      Deporte & enseño:
                    </span>{" "}
                    Natación, Enseñanza, Foso de salto
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  Esta vista simplificada permite identificar tendencias generales y patrones a nivel de categoría.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <h3 className="font-medium text-primary">Datos individuales por tipo de vaso</h3>
                <p className="text-sm text-muted-foreground">
                  Visualizando datos detallados para cada uno de los 8 tipos de vasos:
                </p>
                <ul className="text-sm list-disc pl-5 space-y-1 grid grid-cols-1 md:grid-cols-2">
                  <li>
                    <span style={{ color: leroyMerlinColors.verdePrincipal }}>Polivalente</span>
                  </li>
                  <li>
                    <span style={{ color: leroyMerlinColors.naranja }}>Recreo</span>
                  </li>
                  <li>
                    <span style={{ color: leroyMerlinColors.azul }}>Chapoteo</span>
                  </li>
                  <li>
                    <span style={{ color: leroyMerlinColors.verdeAzulado }}>Hidromasaje</span>
                  </li>
                  <li>
                    <span style={{ color: leroyMerlinColors.rojo }}>Enseñanza</span>
                  </li>
                  <li>
                    <span style={{ color: leroyMerlinColors.marron }}>Natación</span>
                  </li>
                  <li>
                    <span style={{ color: leroyMerlinColors.rosa }}>Terapéutico</span>
                  </li>
                  <li>
                    <span style={{ color: leroyMerlinColors.azulOscuro }}>Foso de salto</span>
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  Esta vista detallada permite analizar comportamientos específicos de cada tipo de vaso y detectar
                  patrones únicos.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

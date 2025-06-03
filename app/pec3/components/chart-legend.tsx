import { Badge } from "@/components/ui/badge"

interface ChartLegendProps {
  startYear?: string
  endYear?: string
}

export default function ChartLegend({ startYear = "2015", endYear = "2022" }: ChartLegendProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <Badge variant="outline" className="text-xs">
        Haz clic en los botones superiores para mostrar/ocultar tipos
      </Badge>
      <Badge variant="outline" className="text-xs">
        Usa el brush inferior para seleccionar el rango de años a comparar
      </Badge>
      <Badge variant="outline" className="text-xs">
        Comparando datos entre {startYear} y {endYear}
      </Badge>
    </div>
  )
}

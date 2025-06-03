import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Image from "next/image"
import { leroyMerlinColors, groupColors } from "@/app/pec3/utils/data-grouping"

export default function ThemePage() {
  // Colores principales de Leroy Merlin
  const primaryColors = [
    {
      name: "Verde Principal",
      pantone: "368 C",
      cmyk: "C65 M0 Y100 K0",
      rgb: "R120 G190 B32",
      hex: leroyMerlinColors.verdePrincipal,
      ral: "6018",
      description: "Color principal de la marca, usado para elementos destacados y primarios.",
    },
    {
      name: "Verde Secundario",
      pantone: "381 C",
      cmyk: "C25 M0 Y100 K0",
      rgb: "R206 G220 B0",
      hex: leroyMerlinColors.verdeSecundario,
      ral: "100 80 80",
      description: "Color complementario al verde principal, usado para la categoría Mixta.",
    },
    {
      name: "Azul",
      pantone: "313 C",
      cmyk: "C100 M0 Y10 K0",
      rgb: "R0 G146 B188",
      hex: leroyMerlinColors.azul,
      ral: "5015",
      description: "Usado para la categoría Deporte & enseño y para el tipo Chapoteo.",
    },
    {
      name: "Rojo",
      pantone: "485 C",
      cmyk: "C0 M95 Y100 K0",
      rgb: "R218 G41 B28",
      hex: leroyMerlinColors.rojo,
      ral: "3020",
      description: "Usado para la categoría Terapia & relax y para el tipo Enseñanza.",
    },
    {
      name: "Blanco",
      pantone: "Blanco",
      cmyk: "C0 M0 Y0 K0",
      rgb: "R255 G255 B255",
      hex: "#FFFFFF",
      ral: "9001",
      description: "Usado para fondos y texto sobre colores oscuros.",
    },
  ]

  // Colores secundarios de Leroy Merlin que estamos usando
  const secondaryColors = [
    {
      name: "Naranja",
      pantone: "137 C",
      hex: leroyMerlinColors.naranja,
      ral: "1028",
      description: "Usado para el tipo Recreo.",
    },
    {
      name: "Rosa",
      pantone: "241 C",
      hex: leroyMerlinColors.rosa,
      ral: "4010",
      description: "Usado para el tipo Terapéutico.",
    },
    {
      name: "Marrón",
      pantone: "437 C",
      hex: leroyMerlinColors.marron,
      ral: "320 40 05",
      description: "Usado para el tipo Natación.",
    },
    {
      name: "Verde Azulado",
      pantone: "323 C",
      hex: leroyMerlinColors.verdeAzulado,
      ral: "5021",
      description: "Usado para el tipo Hidromasaje.",
    },
    {
      name: "Azul Oscuro",
      pantone: "539 C",
      hex: leroyMerlinColors.azulOscuro,
      ral: "5011",
      description: "Usado para el tipo Foso de salto.",
    },
    {
      name: "Negro",
      pantone: "Black C",
      cmyk: "C50 M0 Y0 K100",
      rgb: "R0 G0 B0",
      hex: "#000000",
      ral: "9005",
      description: "Usado para texto principal y elementos de contraste.",
    },
    {
      name: "Gris",
      pantone: "Cool Gray 11 C",
      hex: leroyMerlinColors.gris,
      ral: "7015",
      description: "Usado para textos secundarios y elementos de interfaz.",
    },
  ]

  // Categorías con sus colores asignados
  const categories = [
    {
      name: "Deporte & enseño",
      color: groupColors["Deporte & enseño"],
      types: ["Natación", "Enseñanza", "Foso de salto"],
    },
    {
      name: "Ocio & recreo",
      color: groupColors["Ocio & recreo"],
      types: ["Chapoteo", "Recreo"],
    },
    {
      name: "Terapia & relax",
      color: groupColors["Terapia & relax"],
      types: ["Hidromasaje", "Terapéutico"],
    },
    {
      name: "Mixta",
      color: groupColors["Mixta"],
      types: ["Polivalente"],
    },
  ]

  // Tipografías de Leroy Merlin
  const typography = [
    { name: "Leroy Merlin Sans Bold", style: "font-bold" },
    { name: "Leroy Merlin Sans Bold Italic", style: "font-bold italic" },
    { name: "Leroy Merlin Sans Regular", style: "font-normal" },
    { name: "Leroy Merlin Sans Italic", style: "italic" },
    { name: "Leroy Merlin Sans Light", style: "font-light" },
    { name: "Leroy Merlin Sans Light Italic", style: "font-light italic" },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Tema Leroy Merlin</h1>
          <p className="text-muted-foreground">Guía de estilo y elementos de marca</p>
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

      <Card>
        <CardHeader>
          <CardTitle>Colores Principales</CardTitle>
          <CardDescription>
            Paleta de colores corporativos principales de Leroy Merlin aplicados en el proyecto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {primaryColors.map((color) => (
              <div key={color.hex} className="border rounded-md overflow-hidden">
                <div className="h-24" style={{ backgroundColor: color.hex }}></div>
                <div className="p-4 space-y-2">
                  <h3 className="font-medium">{color.name}</h3>
                  <div className="text-sm space-y-1">
                    <p>PANTONE {color.pantone}</p>
                    {color.cmyk && <p>{color.cmyk}</p>}
                    {color.rgb && <p>{color.rgb}</p>}
                    <p>HEX {color.hex}</p>
                    <p>RAL {color.ral}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{color.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Colores Secundarios</CardTitle>
          <CardDescription>Paleta de colores complementarios aplicados en las visualizaciones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {secondaryColors.map((color) => (
              <div key={color.hex} className="border rounded-md overflow-hidden">
                <div className="h-16" style={{ backgroundColor: color.hex }}></div>
                <div className="p-3 space-y-1">
                  <h3 className="font-medium text-sm">{color.name}</h3>
                  <div className="text-xs">
                    <p>PANTONE {color.pantone}</p>
                    <p>HEX {color.hex}</p>
                    <p>RAL {color.ral}</p>
                    <p className="mt-1 text-muted-foreground">{color.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Categorías y Asignación de Colores</CardTitle>
          <CardDescription>Colores asignados a cada categoría en la visualización agrupada</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category) => (
              <div key={category.name} className="border rounded-md p-4">
                <h3 className="font-medium mb-2" style={{ color: category.color }}>
                  {category.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }}></div>
                  <span className="text-sm">{category.color}</span>
                </div>
                <p className="text-sm mb-2">Incluye los tipos:</p>
                <ul className="text-sm list-disc pl-5">
                  {category.types.map((type) => (
                    <li key={type}>{type}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tipografía</CardTitle>
          <CardDescription>Familia tipográfica Leroy Merlin Sans en sus diferentes estilos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {typography.map((font) => (
              <div key={font.name} className="border rounded-md p-4">
                <p className="text-sm text-muted-foreground mb-2">{font.name}</p>
                <p className={`text-2xl ${font.style}`}>Leroy Merlin Sans</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Aplicación en el Proyecto</CardTitle>
          <CardDescription>Cómo se han aplicado los elementos de marca en este proyecto</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            En este proyecto se han aplicado los colores corporativos de Leroy Merlin, utilizando el verde principal
            (PANTONE 368 C, HEX #78BE20) como color primario para destacar elementos importantes y mantener la identidad
            de marca.
          </p>
          <p>
            Los colores secundarios se han utilizado para los diferentes tipos de vasos en las visualizaciones,
            manteniendo una coherencia visual con la paleta corporativa. Cada tipo de vaso tiene asignado un color
            específico que se mantiene consistente en todas las visualizaciones.
          </p>
          <p>
            Para la visualización agrupada, se han seleccionado cuatro colores representativos de la paleta de Leroy
            Merlin para identificar cada categoría: verde principal para "Ocio & recreo", azul para "Deporte & enseño",
            rojo para "Terapia & relax" y verde secundario para "Mixta".
          </p>
          <p>
            Aunque no se ha podido implementar la tipografía Leroy Merlin Sans por ser una fuente propietaria, se ha
            utilizado una tipografía sans-serif moderna que mantiene el espíritu de la marca.
          </p>
          <p className="text-xs text-muted-foreground mt-8">
            Fuente: Manual de Marca Leroy Merlin - https://cdn.bndlyr.com/nr1dxae7lw/_assets/elementos_graficos.pdf
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

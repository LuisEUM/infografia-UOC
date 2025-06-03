// Utility functions for grouping data

// Define the groups
export const groups = {
  "Deporte & enseño": ["Natación", "Enseñanza", "Foso de salto"],
  "Ocio & recreo": ["Chapoteo", "Recreo"],
  "Terapia & relax": ["Hidromasaje", "Terapéutico"],
  Mixta: ["Polivalente"],
}

// Orden específico de los grupos para mantener consistencia en todas las visualizaciones
export const groupOrder = ["Ocio & recreo", "Mixta", "Terapia & relax", "Deporte & enseño"]

// Colores oficiales de Leroy Merlin
export const leroyMerlinColors = {
  // Colores principales
  verdePrincipal: "#78BE20", // PANTONE 368 C
  verdeSecundario: "#CEDC00", // PANTONE 381 C
  azul: "#0092BC", // PANTONE 313 C
  rojo: "#DA291C", // PANTONE 485 C
  naranja: "#FFA300", // PANTONE 137 C
  rosa: "#CE0F69", // PANTONE 241 C
  marron: "#7B6469", // PANTONE 437 C
  verdeAzulado: "#005F61", // PANTONE 323 C
  azulOscuro: "#00263A", // PANTONE 539 C
  amarillo: "#FDD757", // PANTONE 121 C
  turquesa: "#B9DCD2", // PANTONE 566 C
  azulClaro: "#99D6EA", // PANTONE 2975 C
  gris: "#515151", // PANTONE COOL GRAY 11 C
  beige: "#C5B9AC", // PANTONE 7528 C
  verdeClaro: "#D4EB8E", // PANTONE 372 C
}

// Colors for each group - Using Leroy Merlin color palette
export const groupColors = {
  "Deporte & enseño": leroyMerlinColors.azul,
  "Ocio & recreo": leroyMerlinColors.verdePrincipal,
  "Terapia & relax": leroyMerlinColors.rojo,
  Mixta: leroyMerlinColors.verdeSecundario,
}

// Function to get the group for a specific type
export function getGroupForType(type: string): string {
  for (const [groupName, types] of Object.entries(groups)) {
    if (types.includes(type)) {
      return groupName
    }
  }
  return "Otros"
}

// Function to group data for line/area charts (year-based data)
export function groupYearlyData(data: any[]) {
  if (!data || data.length === 0) return []

  // Get all years from the first item
  const years = Object.keys(data[0]).filter((key) => !isNaN(Number(key)))

  // Create a new array with grouped data
  const groupedData = []

  // For each group, sum the values for each year
  for (const [groupName, types] of Object.entries(groups)) {
    const groupItem: any = { tipo: groupName }

    // For each year, sum the values of all types in this group
    years.forEach((year) => {
      groupItem[year] = data.filter((item) => types.includes(item.tipo)).reduce((sum, item) => sum + item[year], 0)
    })

    groupedData.push(groupItem)
  }

  return groupedData
}

// Function to group data for bar charts (growth data)
export function groupGrowthData(growthData: any[]) {
  if (!growthData || growthData.length === 0) return []

  const groupedGrowth = []

  // For each group, calculate the total growth
  for (const [groupName, types] of Object.entries(groups)) {
    const groupTypes = growthData.filter((item) => types.includes(item.tipo))

    if (groupTypes.length === 0) continue

    const totalGrowth = groupTypes.reduce((sum, item) => sum + item.delta, 0)
    const totalValue2015 = groupTypes.reduce((sum, item) => sum + item.valorInicio, 0)
    const totalValue2022 = groupTypes.reduce((sum, item) => sum + item.valorFin, 0)
    const percentGrowth = ((totalValue2022 - totalValue2015) / totalValue2015) * 100

    groupedGrowth.push({
      tipo: groupName,
      delta: totalGrowth,
      percentDelta: Math.round(percentGrowth * 10) / 10,
      valorInicio: totalValue2015,
      valorFin: totalValue2022,
    })
  }

  return groupedGrowth
}

// Function to group data for pie charts (market share)
export function groupPieData(pieData: any[]) {
  if (!pieData || pieData.length === 0) return []

  const groupedPie = []

  // For each group, calculate the total value and percentage
  for (const [groupName, types] of Object.entries(groups)) {
    const groupTypes = pieData.filter((item) => types.includes(item.name))

    if (groupTypes.length === 0) continue

    const totalValue = groupTypes.reduce((sum, item) => sum + item.value, 0)
    const totalPercentage = groupTypes.reduce((sum, item) => sum + item.percentage, 0)

    groupedPie.push({
      name: groupName,
      value: totalValue,
      percentage: Math.round(totalPercentage * 10) / 10,
    })
  }

  return groupedPie
}

// Function to transform yearly data for charts
export function transformYearlyData(data: any[], isGrouped: boolean) {
  return isGrouped ? groupYearlyData(data) : data
}

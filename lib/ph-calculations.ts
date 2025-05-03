import { type Solution, type MixedSolution, WATER_DISSOCIATION_CONSTANT } from "./types"

// Calculate pH from H+ concentration
export function calculatePH(hydrogenIonConcentration: number): number {
  return -Math.log10(hydrogenIonConcentration)
}

// Calculate H+ concentration from pH
export function calculateHydrogenIonConcentration(pH: number): number {
  return Math.pow(10, -pH)
}

// Calculate OH- concentration from H+ concentration
export function calculateHydroxideIonConcentration(hydrogenIonConcentration: number): number {
  return WATER_DISSOCIATION_CONSTANT / hydrogenIonConcentration
}

// Calculate pH after mixing solutions
export function calculateMixedPH(solutions: { solution: Solution; volume: number }[]): number {
  if (solutions.length === 0) return 7
  if (solutions.length === 1) return solutions[0].solution.pH

  // Calculate total volume
  const totalVolume = solutions.reduce((sum, { volume }) => sum + volume, 0)

  // Calculate weighted H+ concentration
  let totalHydrogenIonConcentration = 0

  for (const { solution, volume } of solutions) {
    const hydrogenIonConcentration = calculateHydrogenIonConcentration(solution.pH)
    const volumeFraction = volume / totalVolume
    totalHydrogenIonConcentration += hydrogenIonConcentration * volumeFraction
  }

  // Convert back to pH
  return calculatePH(totalHydrogenIonConcentration)
}

// Create a mixed solution object
export function createMixedSolution(components: { solution: Solution; volume: number }[]): MixedSolution {
  const totalVolume = components.reduce((sum, { volume }) => sum + volume, 0)
  const mixedPH = calculateMixedPH(components)

  // Blend colors based on volume proportions
  const blendedColor = blendColors(components, totalVolume)

  // Determine the type based on pH
  let type: Solution["type"] = "neutral"
  if (mixedPH < 7) type = "acid"
  else if (mixedPH > 7) type = "base"

  // Create a name based on components
  const name =
    components.length > 1
      ? `Mixed Solution (${components.map((c) => c.solution.name).join(" + ")})`
      : components[0].solution.name

  // Create a formula based on components
  const formula =
    components.length > 1 ? components.map((c) => c.solution.formula).join(" + ") : components[0].solution.formula

  return {
    id: "mixed",
    name,
    formula,
    type,
    color: blendedColor,
    pH: mixedPH,
    concentration: 0, // This would require more complex calculations
    description: `A mixture of ${components.map((c) => c.solution.name).join(" and ")}`,
    components,
    totalVolume,
  }
}

// Helper function to blend colors based on volume proportions
function blendColors(components: { solution: Solution; volume: number }[], totalVolume: number): string {
  if (components.length === 0) return "rgba(210, 240, 255, 0.9)" // Default water color
  if (components.length === 1) return components[0].solution.color

  // Extract RGBA values from each component
  const colorValues = components.map(({ solution, volume }) => {
    const rgba = solution.color.match(/rgba?$$(\d+),\s*(\d+),\s*(\d+)(?:,\s*([.\d]+))?$$/)
    if (!rgba) return { r: 200, g: 200, b: 200, a: 0.8, weight: volume / totalVolume }

    return {
      r: Number.parseInt(rgba[1], 10),
      g: Number.parseInt(rgba[2], 10),
      b: Number.parseInt(rgba[3], 10),
      a: rgba[4] ? Number.parseFloat(rgba[4]) : 1,
      weight: volume / totalVolume,
    }
  })

  // Calculate weighted average of each color component
  const r = Math.round(colorValues.reduce((sum, { r, weight }) => sum + r * weight, 0))
  const g = Math.round(colorValues.reduce((sum, { g, weight }) => sum + g * weight, 0))
  const b = Math.round(colorValues.reduce((sum, { b, weight }) => sum + b * weight, 0))
  const a = colorValues.reduce((sum, { a, weight }) => sum + a * weight, 0)

  return `rgba(${r}, ${g}, ${b}, ${a})`
}

// Get indicator color based on pH
export function getIndicatorColor(indicatorId: string, pH: number): string | null {
  const indicator = PH_INDICATORS.find((i) => i.id === indicatorId)
  if (!indicator) return null

  for (const range of indicator.ranges) {
    if (pH >= range.pH[0] && pH <= range.pH[1]) {
      return range.color
    }
  }

  return null
}

// Define the PH_INDICATORS variable
const PH_INDICATORS = [
  {
    id: "universal",
    name: "Universal Indicator",
    ranges: [
      { pH: [0, 3], color: "#FF2800" }, // Red
      { pH: [3, 5], color: "#FF9000" }, // Orange
      { pH: [5, 7], color: "#FFFF00" }, // Yellow
      { pH: [7, 9], color: "#00C000" }, // Green
      { pH: [9, 11], color: "#0000FF" }, // Blue
      { pH: [11, 14], color: "#8A2BE2" }, // Violet
    ],
  },
  {
    id: "litmus",
    name: "Litmus",
    ranges: [
      { pH: [0, 4.5], color: "#FF0000" }, // Red
      { pH: [4.5, 8.3], color: "#800080" }, // Purple
      { pH: [8.3, 14], color: "#0000FF" }, // Blue
    ],
  },
]

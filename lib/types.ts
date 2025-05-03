export type SolutionType = "acid" | "base" | "neutral" | "salt" | "buffer"

export interface Solution {
  id: string
  name: string
  formula: string
  type: SolutionType
  color: string
  pH: number
  concentration: number // mol/L
  description: string
  isSolvent?: boolean
}

export interface MixedSolution extends Solution {
  components: {
    solution: Solution
    volume: number // mL
  }[]
  totalVolume: number // mL
}

export interface BeakerState {
  solution: Solution | MixedSolution | null
  volume: number // mL
  maxVolume: number // mL
  temperature: number // Celsius
}

// Simplified water dissociation constant
export const WATER_DISSOCIATION_CONSTANT = 1e-14 // Kw at 25°C

export const SOLUTIONS: Solution[] = [
  {
    id: "water",
    name: "Water",
    formula: "H₂O",
    type: "neutral",
    color: "rgba(210, 240, 255, 0.9)",
    pH: 7.0,
    concentration: 0,
    description: "Pure water is neutral with a pH of 7.0 at 25°C. It serves as the universal solvent in chemistry.",
    isSolvent: true,
  },
  {
    id: "hcl",
    name: "Hydrochloric Acid",
    formula: "HCl",
    type: "acid",
    color: "rgba(255, 220, 220, 0.9)",
    pH: 1.0,
    concentration: 0.1,
    description: "A strong acid found in gastric acid. It completely dissociates in water to H⁺ and Cl⁻ ions.",
  },
  {
    id: "naoh",
    name: "Sodium Hydroxide",
    formula: "NaOH",
    type: "base",
    color: "rgba(220, 220, 255, 0.9)",
    pH: 13.0,
    concentration: 0.1,
    description:
      "A strong base used in many cleaning products. It completely dissociates in water to Na⁺ and OH⁻ ions.",
  },
  {
    id: "ch3cooh",
    name: "Acetic Acid",
    formula: "CH₃COOH",
    type: "acid",
    color: "rgba(255, 240, 220, 0.9)",
    pH: 2.9,
    concentration: 0.1,
    description: "A weak acid found in vinegar. It partially dissociates in water to H⁺ and CH₃COO⁻ ions.",
  },
  {
    id: "nh3",
    name: "Ammonia",
    formula: "NH₃",
    type: "base",
    color: "rgba(230, 255, 230, 0.9)",
    pH: 11.1,
    concentration: 0.1,
    description: "A weak base with a distinctive odor. It partially accepts H⁺ ions in water to form NH₄⁺.",
  },
  {
    id: "h2so4",
    name: "Sulfuric Acid",
    formula: "H₂SO₄",
    type: "acid",
    color: "rgba(255, 200, 200, 0.9)",
    pH: 0.5,
    concentration: 0.1,
    description: "A strong diprotic acid used in batteries. It dissociates in two steps to H⁺ and SO₄²⁻ ions.",
  },
]

export const SOLVENTS = SOLUTIONS.filter((s) => s.isSolvent)
export const SOLUTES = SOLUTIONS.filter((s) => !s.isSolvent)

// pH indicators with their color ranges
export interface PHIndicator {
  id: string
  name: string
  ranges: {
    pH: [number, number]
    color: string
  }[]
  description: string
}

export const PH_INDICATORS: PHIndicator[] = [
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
    description: "A mixture of indicators that shows a gradual color change over the entire pH range.",
  },
  {
    id: "litmus",
    name: "Litmus",
    ranges: [
      { pH: [0, 4.5], color: "#FF0000" }, // Red
      { pH: [4.5, 8.3], color: "#800080" }, // Purple
      { pH: [8.3, 14], color: "#0000FF" }, // Blue
    ],
    description:
      "A water-soluble mixture of dyes extracted from lichens that turns red in acidic solutions and blue in basic solutions.",
  },
]

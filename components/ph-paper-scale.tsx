"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PHPaperScaleProps {
  currentPH: number
  showMarker: boolean
}

export default function PHPaperScale({ currentPH, showMarker }: PHPaperScaleProps) {
  // pH values to display on the scale
  const pHValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

  // pH paper colors - representing universal indicator colors
  const pHColors = [
    "#FF0000", // 0 - Deep Red
    "#FF1A00", // 1 - Red
    "#FF3300", // 2 - Red-Orange
    "#FF6600", // 3 - Orange
    "#FF9900", // 4 - Orange-Yellow
    "#FFCC00", // 5 - Yellow
    "#FFFF00", // 6 - Yellow-Green
    "#99CC00", // 7 - Green
    "#33CC33", // 8 - Green-Blue
    "#00CCFF", // 9 - Light Blue
    "#0099FF", // 10 - Blue
    "#0066FF", // 11 - Blue-Indigo
    "#3300FF", // 12 - Indigo
    "#6600FF", // 13 - Indigo-Violet
    "#9900FF", // 14 - Violet
  ]

  // Common substances and their approximate pH values
  const substances = [
    { name: "Battery Acid", pH: 0.5, icon: "🔋" },
    { name: "Stomach Acid", pH: 1.5, icon: "🧪" },
    { name: "Lemon Juice", pH: 2.5, icon: "🍋" },
    { name: "Vinegar", pH: 3, icon: "🧪" },
    { name: "Tomato", pH: 4.5, icon: "🍅" },
    { name: "Coffee", pH: 5, icon: "☕" },
    { name: "Milk", pH: 6.5, icon: "🥛" },
    { name: "Pure Water", pH: 7, icon: "💧" },
    { name: "Baking Soda", pH: 8.5, icon: "🧪" },
    { name: "Soap", pH: 10, icon: "🧼" },
    { name: "Ammonia", pH: 11, icon: "🧪" },
    { name: "Bleach", pH: 12.5, icon: "🧴" },
    { name: "Drain Cleaner", pH: 14, icon: "🧪" },
  ]

  // Get color for current pH
  const getCurrentPHColor = () => {
    if (currentPH < 0) return pHColors[0]
    if (currentPH > 14) return pHColors[14]

    // For values between whole numbers, interpolate between colors
    const lowerIndex = Math.floor(currentPH)
    const upperIndex = Math.ceil(currentPH)

    if (lowerIndex === upperIndex) return pHColors[lowerIndex]

    const ratio = currentPH - lowerIndex
    return interpolateColor(pHColors[lowerIndex], pHColors[upperIndex], ratio)
  }

  // Helper function to interpolate between two colors
  const interpolateColor = (color1: string, color2: string, ratio: number) => {
    // Convert hex to RGB
    const r1 = Number.parseInt(color1.substring(1, 3), 16)
    const g1 = Number.parseInt(color1.substring(3, 5), 16)
    const b1 = Number.parseInt(color1.substring(5, 7), 16)

    const r2 = Number.parseInt(color2.substring(1, 3), 16)
    const g2 = Number.parseInt(color2.substring(3, 5), 16)
    const b2 = Number.parseInt(color2.substring(5, 7), 16)

    // Interpolate
    const r = Math.round(r1 * (1 - ratio) + r2 * ratio)
    const g = Math.round(g1 * (1 - ratio) + g2 * ratio)
    const b = Math.round(b1 * (1 - ratio) + b2 * ratio)

    // Convert back to hex
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-center">pH Scale</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          {/* pH Paper Strip */}
          <div className="relative w-24 h-[500px] mb-6 rounded-lg overflow-hidden shadow-lg">
            {/* pH Color Gradient */}
            <div className="absolute inset-0">
              {pHValues.map((pH, index) => (
                <div
                  key={pH}
                  className="absolute w-full"
                  style={{
                    top: `${(index / 14) * 100}%`,
                    height: `${(1 / 14) * 100}%`,
                    backgroundColor: pHColors[index],
                  }}
                />
              ))}
            </div>

            {/* pH Value Labels */}
            <div className="absolute inset-0 flex flex-col justify-between py-2">
              {pHValues.map((pH) => (
                <div key={pH} className="flex items-center justify-between px-2">
                  <div className="text-xs font-bold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">{pH}</div>
                </div>
              ))}
            </div>

            {/* pH Marker */}
            {showMarker && (
              <motion.div
                className="absolute left-0 right-0 h-6 pointer-events-none"
                style={{
                  top: `calc(${(currentPH / 14) * 100}% - 12px)`,
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-full h-full">
                  <div className="absolute left-0 w-full h-1 bg-white"></div>
                  <div
                    className="absolute right-0 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center"
                    style={{ backgroundColor: getCurrentPHColor() }}
                  >
                    <span className="text-xs font-bold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                      {currentPH.toFixed(1)}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* pH Categories */}
          <div className="w-full space-y-2 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#FF3300" }}></div>
              <span className="text-sm font-medium">Strong Acid (0-3)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#FFCC00" }}></div>
              <span className="text-sm font-medium">Weak Acid (4-6)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#99CC00" }}></div>
              <span className="text-sm font-medium">Neutral (7)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#00CCFF" }}></div>
              <span className="text-sm font-medium">Weak Base (8-10)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#6600FF" }}></div>
              <span className="text-sm font-medium">Strong Base (11-14)</span>
            </div>
          </div>

          {/* Common Substances */}
          <div className="w-full mt-6">
            <h4 className="text-sm font-semibold mb-2">Common Substances</h4>
            <div className="space-y-1 max-h-[200px] overflow-y-auto pr-2">
              {substances.map((substance) => (
                <div
                  key={substance.name}
                  className="flex items-center gap-2 text-xs p-1 rounded hover:bg-gray-100"
                  style={{
                    borderLeft: `3px solid ${pHColors[Math.round(substance.pH)]}`,
                  }}
                >
                  <span>{substance.icon}</span>
                  <span>{substance.name}</span>
                  <span className="ml-auto font-mono">pH {substance.pH}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface PHMeterProps {
  currentPH: number | null
  probeInSolution: boolean
}

export default function PHMeter({ currentPH, probeInSolution }: PHMeterProps) {
  const [displayPH, setDisplayPH] = useState<number | null>(null)
  const [isCalibrating, setIsCalibrating] = useState(false)

  // Update display pH with animation
  useEffect(() => {
    if (currentPH === null) {
      setDisplayPH(null)
      return
    }

    // Animate the pH value change
    const startPH = displayPH || currentPH
    const diff = currentPH - startPH
    const steps = 10
    let step = 0

    const interval = setInterval(() => {
      step++
      const progress = step / steps
      const newPH = startPH + diff * progress
      setDisplayPH(Number(newPH.toFixed(2)))

      if (step >= steps) {
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [currentPH, displayPH])

  // Simulate calibration
  const calibrate = () => {
    setIsCalibrating(true)
    setTimeout(() => {
      setIsCalibrating(false)
    }, 2000)
  }

  // Get pH color for display
  const getPHColor = () => {
    if (displayPH === null) return "text-gray-400"
    if (displayPH < 3) return "text-red-500"
    if (displayPH < 6) return "text-orange-500"
    if (displayPH < 7.5) return "text-green-500"
    if (displayPH < 10) return "text-blue-400"
    return "text-purple-500"
  }

  return (
    <div className="bg-gray-100 rounded-lg p-4 shadow-md w-48">
      <div className="text-center mb-2">
        <span className="text-sm font-medium">pH METER</span>
      </div>
      <div className="bg-black rounded p-4 flex items-center justify-between">
        <span className="text-gray-400 text-sm">pH:</span>
        <motion.div
          key={displayPH?.toFixed(2) || "none"}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`font-mono text-3xl font-bold ${getPHColor()}`}
        >
          {isCalibrating ? (
            <span className="text-yellow-400">CAL</span>
          ) : displayPH !== null ? (
            displayPH.toFixed(2)
          ) : (
            <span className="text-gray-600">—</span>
          )}
        </motion.div>
      </div>

      {/* Status Indicators */}
      <div className="flex justify-between mt-4 text-xs">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${probeInSolution ? "bg-green-500" : "bg-gray-500"}`}></div>
          <span className="text-gray-600">PROBE</span>
        </div>
        <button
          onClick={calibrate}
          disabled={isCalibrating}
          className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isCalibrating ? "CALIBRATING..." : "CALIBRATE"}
        </button>
      </div>
    </div>
  )
}

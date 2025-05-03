"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Solution, MixedSolution } from "@/lib/types"

interface BeakerProps {
  solution: Solution | MixedSolution | null
  volume: number
  maxVolume: number
  isSolventValveOpen: boolean
  isSoluteValveOpen: boolean
  isDraining: boolean
  probeInSolution: boolean
  onToggleSolventValve: () => void
  onToggleSoluteValve: () => void
  onToggleDrainValve: () => void
  onToggleProbe: () => void
  solventColor: string
  soluteColor: string
  solventName: string
  soluteName: string
}

export default function Beaker({
  solution,
  volume,
  maxVolume,
  isSolventValveOpen,
  isSoluteValveOpen,
  isDraining,
  probeInSolution,
  onToggleSolventValve,
  onToggleSoluteValve,
  onToggleDrainValve,
  onToggleProbe,
  solventColor,
  soluteColor,
  solventName,
  soluteName,
}: BeakerProps) {
  const [bubbles, setBubbles] = useState<{ id: number; x: number; size: number; delay: number }[]>([])
  const [isMounted, setIsMounted] = useState(false)
  const animationRef = useRef<NodeJS.Timeout | null>(null)

  // Client-side only effect
  useEffect(() => {
    setIsMounted(true)
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current)
      }
    }
  }, [])

  // Generate bubbles when pouring - only on client side
  useEffect(() => {
    if (!isMounted) return

    let pourInterval: NodeJS.Timeout | null = null

    if ((isSolventValveOpen || isSoluteValveOpen) && volume > 0) {
      pourInterval = setInterval(() => {
        const newBubble = {
          id: Date.now(),
          x: Math.random() * 80 + 10, // Random position (10-90%)
          size: Math.random() * 6 + 4, // Random size (4-10px)
          delay: Math.random() * 0.5, // Random delay (0-0.5s)
        }
        setBubbles((prev) => [...prev, newBubble])

        // Remove bubble after animation
        animationRef.current = setTimeout(() => {
          setBubbles((prev) => prev.filter((b) => b.id !== newBubble.id))
        }, 2000)
      }, 100)
    }

    return () => {
      if (pourInterval) clearInterval(pourInterval)
    }
  }, [isSolventValveOpen, isSoluteValveOpen, volume, isMounted])

  // Calculate volume percentage
  const volumePercentage = (volume / maxVolume) * 100

  if (!isMounted) {
    // Server-side or initial render - return a static placeholder
    return (
      <div className="relative w-full max-w-md mx-auto">
        <div className="flex justify-between items-start mb-4">
          {/* Simple static valves */}
          <div className="flex flex-col items-center">
            <div className="text-sm font-medium mb-1">{solventName}</div>
            <div className="relative">
              <div className="w-16 h-8 bg-gray-300 rounded-t-lg"></div>
              <div className="absolute top-8 left-4 w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-gray-600"></div>
              </div>
              <div className="w-4 h-16 bg-gray-300 mx-auto"></div>
            </div>
            <div className="text-xs mt-1">Solvent</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-sm font-medium mb-1">{soluteName}</div>
            <div className="relative">
              <div className="w-16 h-8 bg-gray-300 rounded-t-lg"></div>
              <div className="absolute top-8 left-4 w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-gray-600"></div>
              </div>
              <div className="w-4 h-16 bg-gray-300 mx-auto"></div>
            </div>
            <div className="text-xs mt-1">Solute</div>
          </div>
        </div>

        {/* Static Beaker */}
        <div className="relative h-[400px] w-full">
          <div className="absolute inset-x-12 bottom-0 h-[320px] border-2 border-gray-300 bg-white/80 rounded-b-lg">
            <div className="absolute -top-2 left-0 right-0 h-2 bg-gray-300 rounded-t-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  // Client-side render with full interactivity
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="flex justify-between items-start mb-4">
        {/* Solvent Valve */}
        <div className="flex flex-col items-center">
          <div className="text-sm font-medium mb-1">{solventName}</div>
          <div className="relative">
            <div className="w-16 h-8 bg-gray-300 rounded-t-lg"></div>
            <button
              onClick={onToggleSolventValve}
              className={`absolute top-8 left-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                isSolventValveOpen ? "bg-blue-500" : "bg-gray-400"
              } hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300`}
              aria-label={isSolventValveOpen ? "Close solvent valve" : "Open solvent valve"}
            >
              <div className={`w-4 h-4 rounded-full ${isSolventValveOpen ? "bg-white" : "bg-gray-600"}`}></div>
            </button>
            <div className="w-4 h-16 bg-gray-300 mx-auto"></div>

            {/* Pouring liquid */}
            {isSolventValveOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 80 }}
                className="absolute top-24 left-6 w-4"
                style={{ backgroundColor: solventColor }}
              ></motion.div>
            )}
          </div>
          <div className="text-xs mt-1">Solvent</div>
        </div>

        {/* Solute Valve */}
        <div className="flex flex-col items-center">
          <div className="text-sm font-medium mb-1">{soluteName}</div>
          <div className="relative">
            <div className="w-16 h-8 bg-gray-300 rounded-t-lg"></div>
            <button
              onClick={onToggleSoluteValve}
              className={`absolute top-8 left-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                isSoluteValveOpen ? "bg-red-500" : "bg-gray-400"
              } hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300`}
              aria-label={isSoluteValveOpen ? "Close solute valve" : "Open solute valve"}
            >
              <div className={`w-4 h-4 rounded-full ${isSoluteValveOpen ? "bg-white" : "bg-gray-600"}`}></div>
            </button>
            <div className="w-4 h-16 bg-gray-300 mx-auto"></div>

            {/* Pouring liquid */}
            {isSoluteValveOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 80 }}
                className="absolute top-24 left-6 w-4"
                style={{ backgroundColor: soluteColor }}
              ></motion.div>
            )}
          </div>
          <div className="text-xs mt-1">Solute</div>
        </div>
      </div>

      {/* Beaker Container */}
      <div className="relative h-[400px] w-full">
        {/* Beaker Glass */}
        <div
          className="absolute inset-x-12 bottom-0 h-[320px] border-2 border-gray-300 bg-white/80 rounded-b-lg"
          style={{ borderTopWidth: 0 }}
        >
          {/* Beaker Top Edge */}
          <div className="absolute -top-2 left-0 right-0 h-2 bg-gray-300 rounded-t-lg"></div>

          {/* Measurement Lines */}
          <div className="absolute inset-y-0 right-3 w-8 flex flex-col justify-between py-3 pointer-events-none">
            <div className="flex items-center">
              <div className="w-3 h-px bg-gray-500"></div>
              <div className="text-xs ml-1">1 L</div>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-px bg-gray-500"></div>
              <div className="text-xs ml-1">¾ L</div>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-px bg-gray-500"></div>
              <div className="text-xs ml-1">½ L</div>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-px bg-gray-500"></div>
              <div className="text-xs ml-1">¼ L</div>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-px bg-gray-500"></div>
              <div className="text-xs ml-1">0 L</div>
            </div>
          </div>

          {/* Liquid in beaker - with safe client-side animations */}
          <AnimatePresence>
            {solution && volume > 0 && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${volumePercentage}%` }}
                exit={{ height: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="absolute bottom-0 left-0 right-0"
                style={{
                  backgroundColor: solution.color,
                  borderTopLeftRadius: "2px",
                  borderTopRightRadius: "2px",
                  boxShadow: "inset 0 10px 20px rgba(255,255,255,0.3)",
                  overflow: "hidden",
                }}
              >
                {/* Bubbles */}
                {bubbles.map((bubble) => (
                  <motion.div
                    key={bubble.id}
                    className="absolute rounded-full bg-white/40"
                    style={{
                      left: `${bubble.x}%`,
                      width: `${bubble.size}px`,
                      height: `${bubble.size}px`,
                      bottom: "0%",
                    }}
                    initial={{ bottom: "0%", opacity: 0.7 }}
                    animate={{ bottom: "100%", opacity: 0 }}
                    transition={{
                      duration: 2,
                      delay: bubble.delay,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Volume indicator */}
          <div className="absolute bottom-2 left-2 text-xs font-bold bg-white/80 px-1 rounded">
            {(volume / 1000).toFixed(2)} L
          </div>
        </div>

        {/* Drain Valve */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
          <button
            onClick={onToggleDrainValve}
            className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              isDraining ? "bg-amber-500" : "bg-gray-400"
            } hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-300`}
            aria-label={isDraining ? "Close drain valve" : "Open drain valve"}
          >
            <div className={`w-6 h-6 rounded-full ${isDraining ? "bg-white" : "bg-gray-600"}`}></div>

            {/* Draining liquid */}
            {isDraining && solution && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 60 }}
                className="absolute top-12 left-1/2 -translate-x-1/2 w-4"
                style={{
                  backgroundColor: solution.color,
                }}
              ></motion.div>
            )}
          </button>
          <div className="text-xs mt-1 text-center">Drain</div>
        </div>

        {/* pH Probe */}
        <div className="absolute right-0 top-0">
          <button
            onClick={onToggleProbe}
            className="flex flex-col items-center focus:outline-none"
            aria-label={probeInSolution ? "Remove pH probe" : "Insert pH probe"}
          >
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mb-1">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            </div>
            <div className="text-xs">pH Probe</div>
          </button>

          {/* Probe in solution */}
          {probeInSolution && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 200, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="absolute top-10 left-3 w-2 bg-gray-300"
              style={{
                transformOrigin: "top",
              }}
            >
              <div className="absolute bottom-0 w-4 h-8 bg-gray-400 rounded-b-lg -left-1"></div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

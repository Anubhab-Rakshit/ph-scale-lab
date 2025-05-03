"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import type { Solution, MixedSolution } from "@/lib/types"
import { SOLVENTS, SOLUTES } from "@/lib/types"
import Beaker from "./beaker"
import PHMeter from "./ph-meter"
import SolutionControls from "./solution-controls"
import PHPaperScale from "./ph-paper-scale"
import DebugPanel from "./debug-panel"

export default function PHLab() {
  const [isClient, setIsClient] = useState(false)

  // Initialize all state on client side only
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Beaker state
  const [beakerContents, setBeakerContents] = useState<{
    solution: Solution | MixedSolution | null
    volume: number
    maxVolume: number
  }>({
    solution: null,
    volume: 0,
    maxVolume: 1000, // 1L in mL
  })

  // Selected solutions
  const [selectedSolvent, setSelectedSolvent] = useState<Solution>(SOLVENTS[0])
  const [selectedSolute, setSelectedSolute] = useState<Solution>(SOLUTES[0])

  // Volumes
  const [solventVolume, setSolventVolume] = useState(500) // mL
  const [soluteVolume, setSoluteVolume] = useState(100) // mL

  // Valve states
  const [isSolventValveOpen, setIsSolventValveOpen] = useState(false)
  const [isSoluteValveOpen, setIsSoluteValveOpen] = useState(false)
  const [isDraining, setIsDraining] = useState(false)

  // pH measurement
  const [probeInSolution, setProbeInSolution] = useState(false)
  const [measuredPH, setMeasuredPH] = useState<number | null>(null)

  // Interval refs to clean up on unmount
  const solventIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const soluteIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const drainIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Update measured pH when probe is in solution
  useEffect(() => {
    if (!isClient) return

    if (probeInSolution && beakerContents.solution) {
      setMeasuredPH(beakerContents.solution.pH)
    } else {
      setMeasuredPH(null)
    }
  }, [probeInSolution, beakerContents.solution, isClient])

  // Handle solvent valve pouring
  useEffect(() => {
    if (!isClient) return

    if (isSolventValveOpen) {
      solventIntervalRef.current = setInterval(() => {
        setBeakerContents((prev) => {
          // Check if beaker would overflow
          if (prev.volume + 10 > prev.maxVolume) {
            setIsSolventValveOpen(false)
            return prev
          }

          // If beaker is empty, just add the solvent
          if (prev.volume === 0 || prev.solution === null) {
            return {
              ...prev,
              solution: selectedSolvent,
              volume: prev.volume + 10,
            }
          }

          // If beaker already has solution, mix them
          const existingSolution = prev.solution
          const newVolume = prev.volume + 10
          const existingWeight = prev.volume / newVolume
          const newWeight = 10 / newVolume

          const newPH = existingSolution.pH * existingWeight + selectedSolvent.pH * newWeight

          // Create a mixed solution
          const mixedSolution: MixedSolution = {
            id: "mixed",
            name: `Mixed Solution`,
            formula: `Mixed`,
            type: newPH < 7 ? "acid" : newPH > 7 ? "base" : "neutral",
            color: blendColors(existingSolution.color, selectedSolvent.color, existingWeight),
            pH: newPH,
            concentration: 0,
            description: "A mixed solution",
            components: [
              { solution: existingSolution, volume: prev.volume },
              { solution: selectedSolvent, volume: 10 },
            ],
            totalVolume: newVolume,
          }

          return {
            ...prev,
            solution: mixedSolution,
            volume: newVolume,
          }
        })
      }, 100)
    }

    return () => {
      if (solventIntervalRef.current) {
        clearInterval(solventIntervalRef.current)
        solventIntervalRef.current = null
      }
    }
  }, [isSolventValveOpen, selectedSolvent, isClient])

  // Handle solute valve pouring
  useEffect(() => {
    if (!isClient) return

    if (isSoluteValveOpen) {
      soluteIntervalRef.current = setInterval(() => {
        setBeakerContents((prev) => {
          // Check if beaker would overflow
          if (prev.volume + 5 > prev.maxVolume) {
            setIsSoluteValveOpen(false)
            return prev
          }

          // If beaker is empty, just add the solute
          if (prev.volume === 0 || prev.solution === null) {
            return {
              ...prev,
              solution: selectedSolute,
              volume: prev.volume + 5,
            }
          }

          // If beaker already has solution, mix them
          const existingSolution = prev.solution
          const newVolume = prev.volume + 5
          const existingWeight = prev.volume / newVolume
          const newWeight = 5 / newVolume

          const newPH = existingSolution.pH * existingWeight + selectedSolute.pH * newWeight

          // Create a mixed solution
          const mixedSolution: MixedSolution = {
            id: "mixed",
            name: `Mixed Solution`,
            formula: `Mixed`,
            type: newPH < 7 ? "acid" : newPH > 7 ? "base" : "neutral",
            color: blendColors(existingSolution.color, selectedSolute.color, existingWeight),
            pH: newPH,
            concentration: 0,
            description: "A mixed solution",
            components: [
              { solution: existingSolution, volume: prev.volume },
              { solution: selectedSolute, volume: 5 },
            ],
            totalVolume: newVolume,
          }

          return {
            ...prev,
            solution: mixedSolution,
            volume: newVolume,
          }
        })
      }, 100)
    }

    return () => {
      if (soluteIntervalRef.current) {
        clearInterval(soluteIntervalRef.current)
        soluteIntervalRef.current = null
      }
    }
  }, [isSoluteValveOpen, selectedSolute, isClient])

  // Handle drain valve
  useEffect(() => {
    if (!isClient) return

    if (isDraining) {
      drainIntervalRef.current = setInterval(() => {
        setBeakerContents((prev) => {
          if (prev.volume <= 0) {
            setIsDraining(false)
            return {
              ...prev,
              solution: null,
              volume: 0,
            }
          }

          return {
            ...prev,
            volume: Math.max(0, prev.volume - 20),
          }
        })
      }, 100)
    }

    return () => {
      if (drainIntervalRef.current) {
        clearInterval(drainIntervalRef.current)
        drainIntervalRef.current = null
      }
    }
  }, [isDraining, isClient])

  // Clean up all intervals on unmount
  useEffect(() => {
    return () => {
      if (solventIntervalRef.current) clearInterval(solventIntervalRef.current)
      if (soluteIntervalRef.current) clearInterval(soluteIntervalRef.current)
      if (drainIntervalRef.current) clearInterval(drainIntervalRef.current)
    }
  }, [])

  // Toggle solvent valve
  const toggleSolventValve = () => {
    setIsSolventValveOpen((prev) => !prev)
  }

  // Toggle solute valve
  const toggleSoluteValve = () => {
    setIsSoluteValveOpen((prev) => !prev)
  }

  // Toggle drain valve
  const toggleDrainValve = () => {
    setIsDraining((prev) => !prev)
  }

  // Reset experiment
  const resetExperiment = () => {
    setIsSolventValveOpen(false)
    setIsSoluteValveOpen(false)
    setIsDraining(false)
    setBeakerContents({
      solution: null,
      volume: 0,
      maxVolume: 1000,
    })
    setProbeInSolution(false)
    setMeasuredPH(null)
  }

  // Toggle probe
  const toggleProbe = () => {
    if (beakerContents.volume > 0) {
      setProbeInSolution(!probeInSolution)
    } else {
      setProbeInSolution(false)
    }
  }

  // Helper function to blend colors
  const blendColors = (color1: string, color2: string, ratio: number) => {
    // Extract RGBA values
    const rgba1 = color1.match(/rgba?$$(\d+),\s*(\d+),\s*(\d+)(?:,\s*([.\d]+))?$$/)
    const rgba2 = color2.match(/rgba?$$(\d+),\s*(\d+),\s*(\d+)(?:,\s*([.\d]+))?$$/)

    if (!rgba1 || !rgba2) return "rgba(200, 200, 200, 0.8)"

    const r1 = Number.parseInt(rgba1[1])
    const g1 = Number.parseInt(rgba1[2])
    const b1 = Number.parseInt(rgba1[3])
    const a1 = rgba1[4] ? Number.parseFloat(rgba1[4]) : 1

    const r2 = Number.parseInt(rgba2[1])
    const g2 = Number.parseInt(rgba2[2])
    const b2 = Number.parseInt(rgba2[3])
    const a2 = rgba2[4] ? Number.parseFloat(rgba2[4]) : 1

    const r = Math.round(r1 * ratio + r2 * (1 - ratio))
    const g = Math.round(g1 * ratio + g2 * (1 - ratio))
    const b = Math.round(b1 * ratio + b2 * (1 - ratio))
    const a = a1 * ratio + a2 * (1 - ratio)

    return `rgba(${r}, ${g}, ${b}, ${a})`
  }

  // Return simple placeholder for SSR
  if (!isClient) {
    return (
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <div className="h-[500px] bg-gray-200 animate-pulse rounded-lg"></div>
          </div>
          <div className="lg:col-span-6">
            <Card className="p-8 flex flex-col items-center justify-center h-[500px]">
              <div className="text-center text-gray-500">Loading pH Lab...</div>
            </Card>
          </div>
          <div className="lg:col-span-3">
            <div className="h-[500px] bg-gray-200 animate-pulse rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - pH Paper Scale */}
        <div className="lg:col-span-3">
          <PHPaperScale currentPH={measuredPH || 7} showMarker={probeInSolution && beakerContents.volume > 0} />
        </div>

        {/* Middle Column - Beaker */}
        <div className="lg:col-span-6">
          <Card className="p-8 flex flex-col items-center justify-center h-full">
            <div className="flex justify-between w-full mb-4">
              <PHMeter currentPH={measuredPH} probeInSolution={probeInSolution} />
              <div className="flex flex-col items-center">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  onClick={resetExperiment}
                >
                  Reset
                </button>
              </div>
            </div>

            <Beaker
              solution={beakerContents.solution}
              volume={beakerContents.volume}
              maxVolume={beakerContents.maxVolume}
              isSolventValveOpen={isSolventValveOpen}
              isSoluteValveOpen={isSoluteValveOpen}
              isDraining={isDraining}
              probeInSolution={probeInSolution}
              onToggleSolventValve={toggleSolventValve}
              onToggleSoluteValve={toggleSoluteValve}
              onToggleDrainValve={toggleDrainValve}
              onToggleProbe={toggleProbe}
              solventColor={selectedSolvent.color}
              soluteColor={selectedSolute.color}
              solventName={selectedSolvent.name}
              soluteName={selectedSolute.name}
            />
          </Card>
        </div>

        {/* Right Column - Controls */}
        <div className="lg:col-span-3 space-y-6">
          <SolutionControls
            selectedSolvent={selectedSolvent}
            selectedSolute={selectedSolute}
            solventVolume={solventVolume}
            soluteVolume={soluteVolume}
            onSolventChange={setSelectedSolvent}
            onSoluteChange={setSelectedSolute}
            onSolventVolumeChange={setSolventVolume}
            onSoluteVolumeChange={setSoluteVolume}
            isSolventValveOpen={isSolventValveOpen}
            isSoluteValveOpen={isSoluteValveOpen}
            onToggleSolventValve={toggleSolventValve}
            onToggleSoluteValve={toggleSoluteValve}
          />
        </div>
      </div>
      {/* Debug Panel */}
      <DebugPanel
        isSolventValveOpen={isSolventValveOpen}
        isSoluteValveOpen={isSoluteValveOpen}
        isDraining={isDraining}
        probeInSolution={probeInSolution}
        volume={beakerContents.volume}
        currentPH={measuredPH}
        onToggleSolventValve={toggleSolventValve}
        onToggleSoluteValve={toggleSoluteValve}
        onToggleDrainValve={toggleDrainValve}
        onToggleProbe={toggleProbe}
      />
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DebugPanelProps {
  isSolventValveOpen: boolean
  isSoluteValveOpen: boolean
  isDraining: boolean
  probeInSolution: boolean
  volume: number
  currentPH: number | null
  onToggleSolventValve: () => void
  onToggleSoluteValve: () => void
  onToggleDrainValve: () => void
  onToggleProbe: () => void
}

export default function DebugPanel({
  isSolventValveOpen,
  isSoluteValveOpen,
  isDraining,
  probeInSolution,
  volume,
  currentPH,
  onToggleSolventValve,
  onToggleSoluteValve,
  onToggleDrainValve,
  onToggleProbe,
}: DebugPanelProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button onClick={() => setIsOpen(!isOpen)} className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg">
        {isOpen ? "Hide Debug" : "Show Debug"}
      </button>

      {isOpen && (
        <Card className="mt-2 w-80">
          <CardHeader>
            <CardTitle>Debug Panel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Solvent Valve:</div>
              <div className="font-mono">{isSolventValveOpen ? "OPEN" : "CLOSED"}</div>

              <div>Solute Valve:</div>
              <div className="font-mono">{isSoluteValveOpen ? "OPEN" : "CLOSED"}</div>

              <div>Drain:</div>
              <div className="font-mono">{isDraining ? "OPEN" : "CLOSED"}</div>

              <div>Probe:</div>
              <div className="font-mono">{probeInSolution ? "IN SOLUTION" : "OUT"}</div>

              <div>Volume:</div>
              <div className="font-mono">{volume} mL</div>

              <div>Current pH:</div>
              <div className="font-mono">{currentPH !== null ? currentPH.toFixed(2) : "N/A"}</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={onToggleSolventValve}
                className={`px-2 py-1 text-xs rounded ${
                  isSolventValveOpen ? "bg-red-500 text-white" : "bg-blue-500 text-white"
                }`}
              >
                {isSolventValveOpen ? "Close Solvent" : "Open Solvent"}
              </button>

              <button
                onClick={onToggleSoluteValve}
                className={`px-2 py-1 text-xs rounded ${
                  isSoluteValveOpen ? "bg-red-500 text-white" : "bg-blue-500 text-white"
                }`}
              >
                {isSoluteValveOpen ? "Close Solute" : "Open Solute"}
              </button>

              <button
                onClick={onToggleDrainValve}
                className={`px-2 py-1 text-xs rounded ${
                  isDraining ? "bg-red-500 text-white" : "bg-blue-500 text-white"
                }`}
              >
                {isDraining ? "Close Drain" : "Open Drain"}
              </button>

              <button
                onClick={onToggleProbe}
                className={`px-2 py-1 text-xs rounded ${
                  probeInSolution ? "bg-red-500 text-white" : "bg-blue-500 text-white"
                }`}
              >
                {probeInSolution ? "Remove Probe" : "Insert Probe"}
              </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

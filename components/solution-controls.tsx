"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type Solution, SOLVENTS, SOLUTES } from "@/lib/types"

interface SolutionControlsProps {
  selectedSolvent: Solution
  selectedSolute: Solution
  solventVolume: number
  soluteVolume: number
  onSolventChange: (solution: Solution) => void
  onSoluteChange: (solution: Solution) => void
  onSolventVolumeChange: (volume: number) => void
  onSoluteVolumeChange: (volume: number) => void
  isSolventValveOpen: boolean
  isSoluteValveOpen: boolean
  onToggleSolventValve: () => void
  onToggleSoluteValve: () => void
}

export default function SolutionControls({
  selectedSolvent,
  selectedSolute,
  solventVolume,
  soluteVolume,
  onSolventChange,
  onSoluteChange,
  onSolventVolumeChange,
  onSoluteVolumeChange,
  isSolventValveOpen,
  isSoluteValveOpen,
  onToggleSolventValve,
  onToggleSoluteValve,
}: SolutionControlsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Solutions</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="solvent">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="solvent">Solvent</TabsTrigger>
            <TabsTrigger value="solute">Solute</TabsTrigger>
          </TabsList>

          <TabsContent value="solvent" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Solvent</label>
              <select
                value={selectedSolvent.id}
                onChange={(e) => {
                  const solvent = SOLVENTS.find((s) => s.id === e.target.value)
                  if (solvent) onSolventChange(solvent)
                }}
                className="w-full p-3 border rounded-md"
              >
                {SOLVENTS.map((solvent) => (
                  <option key={solvent.id} value={solvent.id}>
                    {solvent.name} ({solvent.formula})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Volume</label>
                <span className="text-sm">{solventVolume} mL</span>
              </div>
              <Slider
                value={[solventVolume]}
                min={50}
                max={1000}
                step={50}
                onValueChange={(value) => onSolventVolumeChange(value[0])}
              />
            </div>

            <Button
              onClick={onToggleSolventValve}
              className={`w-full text-white ${
                isSolventValveOpen ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
              }`}
              size="lg"
            >
              {isSolventValveOpen ? "Close Valve" : "Open Valve"}
            </Button>

            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: selectedSolvent.color }}></div>
                <div>
                  <div className="text-sm font-medium">{selectedSolvent.name}</div>
                  <div className="text-xs text-gray-500">pH: {selectedSolvent.pH.toFixed(1)}</div>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-600">{selectedSolvent.description}</div>
            </div>
          </TabsContent>

          <TabsContent value="solute" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Solute</label>
              <select
                value={selectedSolute.id}
                onChange={(e) => {
                  const solute = SOLUTES.find((s) => s.id === e.target.value)
                  if (solute) onSoluteChange(solute)
                }}
                className="w-full p-3 border rounded-md"
              >
                <optgroup label="Acids">
                  {SOLUTES.filter((s) => s.type === "acid").map((solute) => (
                    <option key={solute.id} value={solute.id}>
                      {solute.name} ({solute.formula})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Bases">
                  {SOLUTES.filter((s) => s.type === "base").map((solute) => (
                    <option key={solute.id} value={solute.id}>
                      {solute.name} ({solute.formula})
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Volume</label>
                <span className="text-sm">{soluteVolume} mL</span>
              </div>
              <Slider
                value={[soluteVolume]}
                min={10}
                max={500}
                step={10}
                onValueChange={(value) => onSoluteVolumeChange(value[0])}
              />
            </div>

            <Button
              onClick={onToggleSoluteValve}
              className={`w-full text-white ${
                isSoluteValveOpen ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
              }`}
              size="lg"
            >
              {isSoluteValveOpen ? "Close Valve" : "Open Valve"}
            </Button>

            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: selectedSolute.color }}></div>
                <div>
                  <div className="text-sm font-medium">{selectedSolute.name}</div>
                  <div className="text-xs text-gray-500">pH: {selectedSolute.pH.toFixed(1)}</div>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-600">{selectedSolute.description}</div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { type Solution, SOLVENTS, SOLUTES } from "@/lib/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface SolutionSelectorProps {
  onSelectSolution: (solution: Solution, volume: number) => void
  disabled?: boolean
}

export default function SolutionSelector({ onSelectSolution, disabled = false }: SolutionSelectorProps) {
  const [selectedSolvent, setSelectedSolvent] = useState<Solution>(SOLVENTS[0])
  const [selectedSolute, setSelectedSolute] = useState<Solution>(SOLUTES[0])
  const [solventVolume, setSolventVolume] = useState(400) // mL
  const [soluteVolume, setSoluteVolume] = useState(100) // mL

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Tabs defaultValue="solvent">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="solvent" className="flex-1">
            Solvent
          </TabsTrigger>
          <TabsTrigger value="solute" className="flex-1">
            Solute
          </TabsTrigger>
          <TabsTrigger value="mix" className="flex-1">
            Mix
          </TabsTrigger>
        </TabsList>

        {/* Solvent Tab */}
        <TabsContent value="solvent" className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Select Solvent</label>
            <select
              value={selectedSolvent.id}
              onChange={(e) => {
                const solvent = SOLVENTS.find((s) => s.id === e.target.value)
                if (solvent) setSelectedSolvent(solvent)
              }}
              className="w-full p-2 border rounded-md"
              disabled={disabled}
            >
              {SOLVENTS.map((solvent) => (
                <option key={solvent.id} value={solvent.id}>
                  {solvent.name} ({solvent.formula})
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Volume</label>
              <span className="text-sm">{solventVolume} mL</span>
            </div>
            <Slider
              value={[solventVolume]}
              min={50}
              max={1000}
              step={50}
              onValueChange={(value) => setSolventVolume(value[0])}
              disabled={disabled}
            />
          </div>

          <Button
            onClick={() => onSelectSolution(selectedSolvent, solventVolume)}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white"
            disabled={disabled}
          >
            Add {selectedSolvent.name}
          </Button>

          <div className="bg-gray-50 p-3 rounded-md mt-2">
            <h4 className="text-sm font-medium mb-1">Solution Info</h4>
            <p className="text-xs text-gray-600">{selectedSolvent.description}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium">Formula:</span>
                <span className="text-xs">{selectedSolvent.formula}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium">pH:</span>
                <span className="text-xs">{selectedSolvent.pH.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Solute Tab */}
        <TabsContent value="solute" className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Select Solute</label>
            <select
              value={selectedSolute.id}
              onChange={(e) => {
                const solute = SOLUTES.find((s) => s.id === e.target.value)
                if (solute) setSelectedSolute(solute)
              }}
              className="w-full p-2 border rounded-md"
              disabled={disabled}
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

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Volume</label>
              <span className="text-sm">{soluteVolume} mL</span>
            </div>
            <Slider
              value={[soluteVolume]}
              min={10}
              max={500}
              step={10}
              onValueChange={(value) => setSoluteVolume(value[0])}
              disabled={disabled}
            />
          </div>

          <Button
            onClick={() => onSelectSolution(selectedSolute, soluteVolume)}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white"
            disabled={disabled}
          >
            Add {selectedSolute.name}
          </Button>

          <div className="bg-gray-50 p-3 rounded-md mt-2">
            <h4 className="text-sm font-medium mb-1">Solution Info</h4>
            <p className="text-xs text-gray-600">{selectedSolute.description}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium">Formula:</span>
                <span className="text-xs">{selectedSolute.formula}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium">pH:</span>
                <span className="text-xs">{selectedSolute.pH.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium">Conc:</span>
                <span className="text-xs">{selectedSolute.concentration} mol/L</span>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Mix Tab */}
        <TabsContent value="mix" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Solvent</label>
              <select
                value={selectedSolvent.id}
                onChange={(e) => {
                  const solvent = SOLVENTS.find((s) => s.id === e.target.value)
                  if (solvent) setSelectedSolvent(solvent)
                }}
                className="w-full p-2 border rounded-md"
                disabled={disabled}
              >
                {SOLVENTS.map((solvent) => (
                  <option key={solvent.id} value={solvent.id}>
                    {solvent.name}
                  </option>
                ))}
              </select>
              <div className="flex items-center justify-between text-xs">
                <span>Volume:</span>
                <span>{solventVolume} mL</span>
              </div>
              <Slider
                value={[solventVolume]}
                min={100}
                max={900}
                step={50}
                onValueChange={(value) => setSolventVolume(value[0])}
                disabled={disabled}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Solute</label>
              <select
                value={selectedSolute.id}
                onChange={(e) => {
                  const solute = SOLUTES.find((s) => s.id === e.target.value)
                  if (solute) setSelectedSolute(solute)
                }}
                className="w-full p-2 border rounded-md"
                disabled={disabled}
              >
                {SOLUTES.map((solute) => (
                  <option key={solute.id} value={solute.id}>
                    {solute.name}
                  </option>
                ))}
              </select>
              <div className="flex items-center justify-between text-xs">
                <span>Volume:</span>
                <span>{soluteVolume} mL</span>
              </div>
              <Slider
                value={[soluteVolume]}
                min={10}
                max={300}
                step={10}
                onValueChange={(value) => setSoluteVolume(value[0])}
                disabled={disabled}
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 py-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs"
              style={{ backgroundColor: selectedSolvent.color }}
            >
              {solventVolume}
            </div>
            <div className="text-lg">+</div>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs"
              style={{ backgroundColor: selectedSolute.color }}
            >
              {soluteVolume}
            </div>
          </div>

          <Button
            onClick={() => {
              onSelectSolution(selectedSolvent, solventVolume)
              setTimeout(() => {
                onSelectSolution(selectedSolute, soluteVolume)
              }, 500)
            }}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white"
            disabled={disabled}
          >
            Mix Solutions
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}

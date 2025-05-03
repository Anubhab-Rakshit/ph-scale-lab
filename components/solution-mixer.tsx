"use client"

import { useState } from "react"
import { type Solution, SOLUTIONS } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

interface SolutionMixerProps {
  onMix: (solution: Solution) => void
}

export default function SolutionMixer({ onMix }: SolutionMixerProps) {
  const [solution1, setSolution1] = useState<Solution>(SOLUTIONS[0])
  const [solution2, setSolution2] = useState<Solution>(SOLUTIONS[1])
  const [ratio, setRatio] = useState(50) // 50% of each solution

  const handleMix = () => {
    // Simple pH calculation - this is a simplified model
    // In reality, mixing acids and bases is more complex
    const newPH = solution1.pH * (ratio / 100) + solution2.pH * (1 - ratio / 100)

    // Mix the colors
    const color1 = solution1.color
    const color2 = solution2.color

    // Create a new mixed solution
    const mixedSolution: Solution = {
      name: `${solution1.name} + ${solution2.name}`,
      pH: newPH,
      color: blendColors(color1, color2, ratio / 100),
    }

    onMix(mixedSolution)
  }

  // Helper function to blend RGBA colors
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

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Solution Mixer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Solution 1</label>
          <Select
            value={solution1.name}
            onValueChange={(value) => {
              const solution = SOLUTIONS.find((s) => s.name === value)
              if (solution) setSolution1(solution)
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select solution 1" />
            </SelectTrigger>
            <SelectContent>
              {SOLUTIONS.map((solution) => (
                <SelectItem key={solution.name} value={solution.name}>
                  {solution.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Solution 2</label>
          <Select
            value={solution2.name}
            onValueChange={(value) => {
              const solution = SOLUTIONS.find((s) => s.name === value)
              if (solution) setSolution2(solution)
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select solution 2" />
            </SelectTrigger>
            <SelectContent>
              {SOLUTIONS.map((solution) => (
                <SelectItem key={solution.name} value={solution.name}>
                  {solution.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Mixing Ratio</label>
            <span className="text-sm">
              {ratio}% : {100 - ratio}%
            </span>
          </div>
          <Slider value={[ratio]} min={0} max={100} step={1} onValueChange={(value) => setRatio(value[0])} />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{solution1.name}</span>
            <span>{solution2.name}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: solution1.color }}></div>
            <div className="text-xl">+</div>
            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: solution2.color }}></div>
            <div className="text-xl">=</div>
            <div
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: blendColors(solution1.color, solution2.color, ratio / 100) }}
            ></div>
          </div>
          <Button onClick={handleMix}>Mix Solutions</Button>
        </div>
      </CardContent>
    </Card>
  )
}

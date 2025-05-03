'use client'

import dynamic from "next/dynamic"
import PHGlossary from "@/components/ph-glossary"

// Import lab component with no SSR
const PHLab = dynamic(() => import("@/components/ph-lab"), {
  ssr: false,
  loading: () => <div className="min-h-[600px] flex items-center justify-center">Loading pH Lab...</div>,
})

// Import education panel with no SSR
const PHEducationPanel = dynamic(() => import("@/components/ph-education-panel"), {
  ssr: false,
  loading: () => <div className="min-h-[300px] flex items-center justify-center">Loading content...</div>,
})

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600">
            pH Scale: Interactive Chemistry Lab
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Explore the pH scale, mix solutions, and visualize acid-base chemistry with this interactive simulation
          </p>
        </header>

        {/* Main Lab Component - Loaded client-side only */}
        <PHLab />

        {/* Educational Content */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Learn About pH</h2>
            <PHEducationPanel />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Chemistry Glossary</h2>
            <PHGlossary />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500 py-4">
          <p>Created for educational purposes.</p>
        </footer>
      </div>
    </main>
  )
}

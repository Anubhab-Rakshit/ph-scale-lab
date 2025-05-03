"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"

interface GlossaryTerm {
  term: string
  definition: string
  category: "basic" | "advanced" | "calculation"
}

export default function PHGlossary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const glossaryTerms: GlossaryTerm[] = [
    {
      term: "pH",
      definition:
        "A logarithmic scale used to specify the acidity or basicity of an aqueous solution. It is the negative logarithm of the hydrogen ion concentration.",
      category: "basic",
    },
    {
      term: "Acid",
      definition:
        "A substance that donates hydrogen ions (H⁺) in water or accepts electrons in a chemical reaction. Acids have a pH less than 7.",
      category: "basic",
    },
    {
      term: "Base",
      definition:
        "A substance that accepts hydrogen ions (H⁺) or donates hydroxide ions (OH⁻) in water. Bases have a pH greater than 7.",
      category: "basic",
    },
    {
      term: "Neutral",
      definition: "A solution with a pH of 7, where the concentration of H⁺ ions equals the concentration of OH⁻ ions.",
      category: "basic",
    },
    {
      term: "Buffer",
      definition:
        "A solution that resists changes in pH when small amounts of acid or base are added. It typically consists of a weak acid and its conjugate base.",
      category: "advanced",
    },
    {
      term: "Titration",
      definition:
        "A technique where a solution of known concentration is used to determine the concentration of an unknown solution through a neutralization reaction.",
      category: "advanced",
    },
    {
      term: "Indicator",
      definition:
        "A substance that changes color at a specific pH range, used to visually determine the pH of a solution or the endpoint of a titration.",
      category: "basic",
    },
    {
      term: "pKa",
      definition:
        "The negative logarithm of the acid dissociation constant (Ka). It indicates the strength of an acid - the lower the pKa, the stronger the acid.",
      category: "advanced",
    },
    {
      term: "Hydronium Ion",
      definition: "The H₃O⁺ ion formed when a hydrogen ion (H⁺) combines with a water molecule (H₂O).",
      category: "basic",
    },
    {
      term: "Dissociation",
      definition:
        "The process where a compound separates into ions in solution. For example, HCl dissociates into H⁺ and Cl⁻ in water.",
      category: "basic",
    },
    {
      term: "Neutralization",
      definition:
        "A chemical reaction between an acid and a base that produces water and a salt. The pH of the resulting solution approaches 7.",
      category: "basic",
    },
    {
      term: "Molarity",
      definition: "The concentration of a solution expressed as moles of solute per liter of solution (mol/L).",
      category: "calculation",
    },
    {
      term: "Henderson-Hasselbalch Equation",
      definition:
        "An equation used to calculate the pH of a buffer solution: pH = pKa + log([A⁻]/[HA]), where [A⁻] is the concentration of the conjugate base and [HA] is the concentration of the weak acid.",
      category: "calculation",
    },
    {
      term: "Equivalence Point",
      definition:
        "The point in a titration where the amount of added titrant is chemically equivalent to the amount of analyte in the sample.",
      category: "advanced",
    },
    {
      term: "Strong Acid",
      definition:
        "An acid that completely dissociates in water, donating all its hydrogen ions. Examples include HCl, HNO₃, and H₂SO₄.",
      category: "basic",
    },
    {
      term: "Weak Acid",
      definition:
        "An acid that partially dissociates in water, donating only some of its hydrogen ions. Examples include acetic acid and carbonic acid.",
      category: "basic",
    },
    {
      term: "Strong Base",
      definition:
        "A base that completely dissociates in water, accepting all available hydrogen ions. Examples include NaOH and KOH.",
      category: "basic",
    },
    {
      term: "Weak Base",
      definition:
        "A base that partially dissociates in water, accepting only some hydrogen ions. Examples include ammonia and bicarbonate.",
      category: "basic",
    },
    {
      term: "Amphoteric",
      definition:
        "A substance that can act as both an acid and a base, depending on the conditions. Water is an example of an amphoteric substance.",
      category: "advanced",
    },
    {
      term: "pH Meter",
      definition:
        "An electronic device that measures the pH of a solution using a glass electrode sensitive to hydrogen ion concentration.",
      category: "basic",
    },
  ]

  // Filter terms based on search and category
  const filteredTerms = glossaryTerms.filter((term) => {
    const matchesSearch =
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === null || term.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Chemistry Glossary</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Search and Filter */}
        <div className="mb-4 space-y-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search terms..."
              className="w-full pl-8 pr-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 text-xs rounded-full ${
                selectedCategory === null ? "bg-indigo-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </button>
            <button
              className={`px-3 py-1 text-xs rounded-full ${
                selectedCategory === "basic" ? "bg-indigo-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setSelectedCategory("basic")}
            >
              Basic
            </button>
            <button
              className={`px-3 py-1 text-xs rounded-full ${
                selectedCategory === "advanced" ? "bg-indigo-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setSelectedCategory("advanced")}
            >
              Advanced
            </button>
            <button
              className={`px-3 py-1 text-xs rounded-full ${
                selectedCategory === "calculation" ? "bg-indigo-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setSelectedCategory("calculation")}
            >
              Calculations
            </button>
          </div>
        </div>

        {/* Glossary List */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {filteredTerms.length > 0 ? (
            filteredTerms.map((item) => (
              <div key={item.term} className="border-b pb-2">
                <h4 className="font-semibold text-indigo-700">{item.term}</h4>
                <p className="text-sm text-gray-700">{item.definition}</p>
                <div className="mt-1">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      item.category === "basic"
                        ? "bg-green-100 text-green-800"
                        : item.category === "advanced"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">No matching terms found</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

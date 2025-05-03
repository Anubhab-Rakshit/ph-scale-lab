"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export default function PHEducation() {
  const [activeTab, setActiveTab] = useState("basics")

  return (
    <Card className="w-full shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardContent className="p-4">
        <Tabs defaultValue="basics" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="basics" className="text-xs">
              Basics
            </TabsTrigger>
            <TabsTrigger value="chemistry" className="text-xs">
              Chemistry
            </TabsTrigger>
            <TabsTrigger value="applications" className="text-xs">
              Applications
            </TabsTrigger>
            <TabsTrigger value="calculations" className="text-xs">
              Calculations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basics" className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-indigo-800 mb-2">What is pH?</h3>
              <p className="text-sm text-gray-700">
                pH is a measure of how acidic or basic a solution is. The pH scale ranges from 0 to 14, with 7 being
                neutral. Values below 7 indicate acidity, while values above 7 indicate alkalinity (basicity).
              </p>

              <div className="mt-4">
                <h4 className="text-md font-semibold text-indigo-700 mb-1">The pH Scale:</h4>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li>
                    <span className="font-medium text-red-500">Acidic (0-7):</span> Higher concentration of hydrogen
                    ions (H⁺)
                  </li>
                  <li>
                    <span className="font-medium text-green-500">Neutral (7):</span> Equal concentration of H⁺ and OH⁻
                    ions
                  </li>
                  <li>
                    <span className="font-medium text-blue-500">Basic (7-14):</span> Higher concentration of hydroxide
                    ions (OH⁻)
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <h4 className="text-md font-semibold text-indigo-700 mb-1">The Logarithmic Scale:</h4>
                <p className="text-sm text-gray-700">
                  The pH scale is logarithmic, which means each whole pH value below 7 is ten times more acidic than the
                  next higher value. For example, pH 4 is ten times more acidic than pH 5 and 100 times more acidic than
                  pH 6.
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  Similarly, each whole pH value above 7 is ten times more alkaline than the next lower whole value.
                </p>
              </div>
            </div>

            <div className="bg-indigo-50 p-3 rounded-md">
              <h4 className="text-sm font-semibold text-indigo-700 mb-1">Did You Know?</h4>
              <p className="text-xs text-gray-700">
                The term "pH" stands for "potential of hydrogen" or "power of hydrogen." It was first introduced by
                Danish biochemist Søren Peter Lauritz Sørensen in 1909.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="chemistry" className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-indigo-800 mb-2">The Chemistry of pH</h3>
              <p className="text-sm text-gray-700">
                pH is defined as the negative logarithm (base 10) of the hydrogen ion concentration [H⁺] in moles per
                liter:
              </p>

              <div className="bg-gray-50 p-3 rounded-md my-3 text-center">
                <span className="text-lg font-mono">pH = -log₁₀[H⁺]</span>
              </div>

              <h4 className="text-md font-semibold text-indigo-700 mt-4 mb-1">Acids and Bases:</h4>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li>
                  <span className="font-medium">Acids:</span> Substances that donate hydrogen ions (H⁺) in solution
                </li>
                <li>
                  <span className="font-medium">Bases:</span> Substances that accept hydrogen ions or donate hydroxide
                  ions (OH⁻)
                </li>
              </ul>

              <h4 className="text-md font-semibold text-indigo-700 mt-4 mb-1">Water Dissociation:</h4>
              <p className="text-sm text-gray-700">
                In pure water, a small number of water molecules dissociate into hydrogen and hydroxide ions:
              </p>
              <div className="bg-gray-50 p-3 rounded-md my-2 text-center">
                <span className="font-mono">H₂O ⇌ H⁺ + OH⁻</span>
              </div>
              <p className="text-sm text-gray-700">
                At 25°C, the ion product of water (Kw) is 1.0 × 10⁻¹⁴, which means:
              </p>
              <div className="bg-gray-50 p-3 rounded-md my-2 text-center">
                <span className="font-mono">[H⁺] × [OH⁻] = 1.0 × 10⁻¹⁴</span>
              </div>
              <p className="text-sm text-gray-700">In pure water, [H⁺] = [OH⁻] = 1.0 × 10⁻⁷ mol/L, giving a pH of 7.</p>
            </div>

            <div className="bg-indigo-50 p-3 rounded-md">
              <h4 className="text-sm font-semibold text-indigo-700 mb-1">Strong vs. Weak Acids and Bases</h4>
              <p className="text-xs text-gray-700">
                <span className="font-medium">Strong acids/bases</span> completely dissociate in water (e.g., HCl,
                NaOH).
                <br />
                <span className="font-medium">Weak acids/bases</span> only partially dissociate (e.g., acetic acid,
                ammonia).
              </p>
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-indigo-800 mb-2">Real-World Applications</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="text-sm font-semibold text-indigo-700 mb-1">Biology & Medicine</h4>
                  <ul className="list-disc pl-5 text-xs text-gray-700 space-y-1">
                    <li>Blood pH (7.35-7.45) is tightly regulated</li>
                    <li>Digestive system uses different pH levels</li>
                    <li>Enzyme activity depends on optimal pH</li>
                    <li>pH affects drug absorption and efficacy</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="text-sm font-semibold text-indigo-700 mb-1">Agriculture</h4>
                  <ul className="list-disc pl-5 text-xs text-gray-700 space-y-1">
                    <li>Soil pH affects nutrient availability</li>
                    <li>Different plants thrive in different pH ranges</li>
                    <li>Fertilizers can alter soil pH</li>
                    <li>Hydroponics requires precise pH control</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="text-sm font-semibold text-indigo-700 mb-1">Industry</h4>
                  <ul className="list-disc pl-5 text-xs text-gray-700 space-y-1">
                    <li>Food production and preservation</li>
                    <li>Water treatment and purification</li>
                    <li>Chemical manufacturing processes</li>
                    <li>Paper and textile production</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="text-sm font-semibold text-indigo-700 mb-1">Environment</h4>
                  <ul className="list-disc pl-5 text-xs text-gray-700 space-y-1">
                    <li>Ocean acidification due to CO₂ absorption</li>
                    <li>Acid rain effects on ecosystems</li>
                    <li>Water quality monitoring</li>
                    <li>Aquatic life requires specific pH ranges</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-md font-semibold text-indigo-700 mb-1">pH Indicators:</h4>
                <p className="text-sm text-gray-700">
                  pH indicators are substances that change color at specific pH values. They are used in laboratories,
                  swimming pools, aquariums, and many other applications to quickly assess pH levels without precise
                  measurements.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calculations" className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-indigo-800 mb-2">pH Calculations</h3>

              <div className="space-y-3">
                <div>
                  <h4 className="text-md font-semibold text-indigo-700 mb-1">Basic pH Calculation:</h4>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-gray-700 mb-1">If [H⁺] = 1.0 × 10⁻³ mol/L, then:</p>
                    <p className="font-mono text-sm">pH = -log₁₀(1.0 × 10⁻³) = 3.0</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-semibold text-indigo-700 mb-1">Finding [H⁺] from pH:</h4>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-gray-700 mb-1">If pH = 8.5, then:</p>
                    <p className="font-mono text-sm">[H⁺] = 10⁻⁸·⁵ = 3.16 × 10⁻⁹ mol/L</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-semibold text-indigo-700 mb-1">Finding [OH⁻] from pH:</h4>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-gray-700 mb-1">Using Kw = [H⁺] × [OH⁻] = 1.0 × 10⁻¹⁴</p>
                    <p className="text-sm text-gray-700 mb-1">If pH = 4.0, then [H⁺] = 1.0 × 10⁻⁴ mol/L</p>
                    <p className="font-mono text-sm">[OH⁻] = 1.0 × 10⁻¹⁴ ÷ (1.0 × 10⁻⁴) = 1.0 × 10⁻¹⁰ mol/L</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-semibold text-indigo-700 mb-1">Henderson-Hasselbalch Equation:</h4>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-gray-700 mb-1">For buffer solutions:</p>
                    <p className="font-mono text-sm">pH = pKa + log₁₀([A⁻] ÷ [HA])</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Where [A⁻] is the conjugate base concentration and [HA] is the weak acid concentration
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-semibold text-indigo-700 mb-1">Mixing Solutions:</h4>
                  <p className="text-sm text-gray-700">When mixing acids and bases, the resulting pH depends on:</p>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    <li>The strength of the acids/bases</li>
                    <li>Their concentrations</li>
                    <li>The volumes being mixed</li>
                    <li>Whether neutralization occurs</li>
                  </ul>
                  <p className="text-sm text-gray-700 mt-1">
                    For strong acids and bases, you can calculate the number of moles of H⁺ and OH⁻, determine which is
                    in excess, and then calculate the final pH.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Animated pH Molecule */}
        <div className="flex justify-center mt-4">
          {activeTab === "basics" && (
            <motion.div
              className="relative w-24 h-24"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <motion.div
                className="absolute top-0 left-1/2 w-6 h-6 -ml-3 bg-red-500 rounded-full flex items-center justify-center text-white font-bold"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                H⁺
              </motion.div>
              <motion.div
                className="absolute bottom-0 left-1/2 w-6 h-6 -ml-3 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                OH⁻
              </motion.div>
              <div className="absolute top-1/2 left-1/2 w-10 h-10 -ml-5 -mt-5 bg-cyan-200 rounded-full flex items-center justify-center text-cyan-800 font-bold">
                H₂O
              </div>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

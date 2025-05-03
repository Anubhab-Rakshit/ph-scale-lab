"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PHInfo() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>About pH Scale</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>The pH scale measures how acidic or basic a substance is. It ranges from 0 to 14:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-bold text-red-500">Acidic substances</span> have a pH less than 7
          </li>
          <li>
            <span className="font-bold text-purple-500">Neutral substances</span> have a pH of 7
          </li>
          <li>
            <span className="font-bold text-blue-500">Basic substances</span> have a pH greater than 7
          </li>
        </ul>
        <p>
          The pH scale is logarithmic, which means each whole pH value below 7 is ten times more acidic than the next
          higher value. For example, pH 4 is ten times more acidic than pH 5 and 100 times more acidic than pH 6.
        </p>
        <p>
          The same holds true for pH values above 7, each of which is ten times more alkaline than the next lower whole
          value. For example, pH 10 is ten times more alkaline than pH 9.
        </p>
      </CardContent>
    </Card>
  )
}

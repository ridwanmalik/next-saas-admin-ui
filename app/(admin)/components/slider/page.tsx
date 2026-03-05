"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import ShowCard from "../_components/show-card"

const SliderPage = () => {
  const [single, setSingle] = useState([50])
  const [range, setRange] = useState([20, 80])
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Slider</h2>
        <p className="text-muted-foreground">An input where the user selects a value from within a given range.</p>
      </div>
      <div className="space-y-4">
        <ShowCard title="Single Value">
          <div className="space-y-3 max-w-sm">
            <Slider value={single} onValueChange={setSingle} max={100} step={1} />
            <p className="text-xs text-muted-foreground tabular-nums">Value: {single[0]}</p>
          </div>
        </ShowCard>
        <ShowCard title="Range (Multi-thumb)">
          <div className="space-y-3 max-w-sm">
            <Slider value={range} onValueChange={setRange} max={100} step={1} />
            <p className="text-xs text-muted-foreground tabular-nums">Range: {range[0]} – {range[1]}</p>
          </div>
        </ShowCard>
        <ShowCard title="Disabled">
          <Slider defaultValue={[40]} max={100} disabled className="max-w-sm" />
        </ShowCard>
      </div>
    </div>
  )
}

export default SliderPage

"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import ShowCard from "../_components/show-card"

const SliderPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Slider</h2>
      <p className="text-muted-foreground">An input where the user selects a value from within a given range.</p>
    </div>
    <div className="space-y-4">
      <ShowCard>
        <Slider
          defaultValue={[75]}
          max={100}
          step={1}
          className="mx-auto w-full max-w-xs"
        />
      </ShowCard>

      <ShowCard title="Range">
        <Slider
          defaultValue={[25, 50]}
          max={100}
          step={5}
          className="mx-auto w-full max-w-xs"
        />
      </ShowCard>

      <ShowCard title="Multiple Thumbs">
        <Slider
          defaultValue={[10, 20, 70]}
          max={100}
          step={10}
          className="mx-auto w-full max-w-xs"
        />
      </ShowCard>

      <ShowCard title="Vertical">
        <div className="mx-auto flex w-full max-w-xs items-center justify-center gap-6">
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            orientation="vertical"
            className="h-40"
          />
          <Slider
            defaultValue={[25]}
            max={100}
            step={1}
            orientation="vertical"
            className="h-40"
          />
        </div>
      </ShowCard>

      <ShowCard title="Controlled">
        <SliderControlled />
      </ShowCard>

      <ShowCard title="Disabled">
        <Slider
          defaultValue={[50]}
          max={100}
          step={1}
          disabled
          className="mx-auto w-full max-w-xs"
        />
      </ShowCard>
    </div>
  </div>
)

const SliderControlled = () => {
  const [value, setValue] = React.useState([0.3, 0.7])
  return (
    <div className="mx-auto grid w-full max-w-xs gap-3">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor="slider-demo-temperature">Temperature</Label>
        <span className="text-sm text-muted-foreground">
          {value.join(", ")}
        </span>
      </div>
      <Slider
        id="slider-demo-temperature"
        value={value}
        onValueChange={setValue}
        min={0}
        max={1}
        step={0.1}
      />
    </div>
  )
}

export default SliderPage

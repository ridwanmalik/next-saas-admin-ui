"use client"

import * as React from "react"
import { Field, FieldLabel } from "@/components/ui/field"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import ShowCard from "../_components/show-card"

const ProgressPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Progress</h2>
      <p className="text-muted-foreground">Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.</p>
    </div>
    <div className="space-y-4">
      <ShowCard>
        <ProgressDemo />
      </ShowCard>

      <ShowCard title="Label">
        <Field className="w-full max-w-sm">
          <FieldLabel htmlFor="progress-upload">
            <span>Upload progress</span>
            <span className="ml-auto">66%</span>
          </FieldLabel>
          <Progress value={66} id="progress-upload" />
        </Field>
      </ShowCard>

      <ShowCard title="Controlled">
        <ProgressControlled />
      </ShowCard>
    </div>
  </div>
)

const ProgressDemo = () => {
  const [progress, setProgress] = React.useState(13)
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])
  return <Progress value={progress} className="w-[60%]" />
}

const ProgressControlled = () => {
  const [value, setValue] = React.useState([50])
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Progress value={value[0]} />
      <Slider
        value={value}
        onValueChange={setValue}
        min={0}
        max={100}
        step={1}
      />
    </div>
  )
}

export default ProgressPage

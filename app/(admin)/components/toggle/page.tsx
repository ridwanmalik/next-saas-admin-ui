"use client"

import { Bold, Italic, Underline } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import ShowCard from "../_components/show-card"

const TogglePage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Toggle</h2>
      <p className="text-muted-foreground">A two-state button that can be either on or off.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="Variants">
        <div className="flex flex-wrap gap-3">
          <Toggle aria-label="Bold"><Bold />Default</Toggle>
          <Toggle variant="outline" aria-label="Italic"><Italic />Outline</Toggle>
        </div>
      </ShowCard>
      <ShowCard title="Sizes">
        <div className="flex flex-wrap items-center gap-3">
          <Toggle size="sm" aria-label="sm"><Bold /></Toggle>
          <Toggle aria-label="default"><Bold /></Toggle>
          <Toggle size="lg" aria-label="lg"><Bold /></Toggle>
        </div>
      </ShowCard>
      <ShowCard title="With Text">
        <div className="flex flex-wrap gap-3">
          <Toggle aria-label="Bold"><Bold />Bold</Toggle>
          <Toggle aria-label="Italic"><Italic />Italic</Toggle>
          <Toggle defaultPressed aria-label="Underline"><Underline />Underline</Toggle>
        </div>
      </ShowCard>
      <ShowCard title="States">
        <div className="flex flex-wrap gap-3">
          <Toggle aria-label="off">Off</Toggle>
          <Toggle defaultPressed aria-label="on">On</Toggle>
          <Toggle disabled aria-label="disabled">Disabled</Toggle>
        </div>
      </ShowCard>
    </div>
  </div>
)

export default TogglePage

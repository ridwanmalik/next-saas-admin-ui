"use client"

import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import ShowCard from "../_components/show-card"

const ToggleGroupPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Toggle Group</h2>
      <p className="text-muted-foreground">A set of two-state buttons that can be toggled on or off.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="Single" description="Only one item active at a time.">
        <ToggleGroup type="single" defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Left"><AlignLeft /></ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Center"><AlignCenter /></ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Right"><AlignRight /></ToggleGroupItem>
        </ToggleGroup>
      </ShowCard>
      <ShowCard title="Multiple" description="Multiple items can be active simultaneously.">
        <ToggleGroup type="multiple" defaultValue={["bold", "italic"]}>
          <ToggleGroupItem value="bold" aria-label="Bold"><Bold /></ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic"><Italic /></ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline"><Underline /></ToggleGroupItem>
        </ToggleGroup>
      </ShowCard>
      <ShowCard title="Outline Variant">
        <ToggleGroup type="single" variant="outline" defaultValue="left">
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
      </ShowCard>
      <ShowCard title="Sizes">
        <div className="space-y-3">
          {(["sm", "default", "lg"] as const).map((size) => (
            <div key={size} className="flex items-center gap-4">
              <span className="w-14 text-xs text-muted-foreground">{size}</span>
              <ToggleGroup type="single" size={size} defaultValue="b">
                <ToggleGroupItem value="b"><Bold /></ToggleGroupItem>
                <ToggleGroupItem value="i"><Italic /></ToggleGroupItem>
                <ToggleGroupItem value="u"><Underline /></ToggleGroupItem>
              </ToggleGroup>
            </div>
          ))}
        </div>
      </ShowCard>
    </div>
  </div>
)

export default ToggleGroupPage

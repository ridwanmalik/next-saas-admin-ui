"use client"

import * as React from "react"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Bold, BoldIcon, Italic, ItalicIcon, Underline, UnderlineIcon } from "lucide-react"
import ShowCard from "../_components/show-card"

const ToggleGroupPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Toggle Group</h2>
      <p className="text-muted-foreground">A set of two-state buttons that can be toggled on or off.</p>
    </div>
    <div className="space-y-4">
      <ShowCard>
        <ToggleGroup variant="outline" type="multiple">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic />
          </ToggleGroupItem>
          <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
            <Underline />
          </ToggleGroupItem>
        </ToggleGroup>
      </ShowCard>

      <ShowCard title="Outline">
        <ToggleGroup variant="outline" type="single" defaultValue="all">
          <ToggleGroupItem value="all" aria-label="Toggle all">
            All
          </ToggleGroupItem>
          <ToggleGroupItem value="missed" aria-label="Toggle missed">
            Missed
          </ToggleGroupItem>
        </ToggleGroup>
      </ShowCard>

      <ShowCard title="Size">
        <div className="flex flex-col gap-4">
          <ToggleGroup type="single" size="sm" defaultValue="top" variant="outline">
            <ToggleGroupItem value="top" aria-label="Toggle top">Top</ToggleGroupItem>
            <ToggleGroupItem value="bottom" aria-label="Toggle bottom">Bottom</ToggleGroupItem>
            <ToggleGroupItem value="left" aria-label="Toggle left">Left</ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Toggle right">Right</ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup type="single" defaultValue="top" variant="outline">
            <ToggleGroupItem value="top" aria-label="Toggle top">Top</ToggleGroupItem>
            <ToggleGroupItem value="bottom" aria-label="Toggle bottom">Bottom</ToggleGroupItem>
            <ToggleGroupItem value="left" aria-label="Toggle left">Left</ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Toggle right">Right</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </ShowCard>

      <ShowCard title="Spacing">
        <ToggleGroup
          type="single"
          size="sm"
          defaultValue="top"
          variant="outline"
          spacing={2}
        >
          <ToggleGroupItem value="top" aria-label="Toggle top">Top</ToggleGroupItem>
          <ToggleGroupItem value="bottom" aria-label="Toggle bottom">Bottom</ToggleGroupItem>
          <ToggleGroupItem value="left" aria-label="Toggle left">Left</ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Toggle right">Right</ToggleGroupItem>
        </ToggleGroup>
      </ShowCard>

      <ShowCard title="Vertical">
        <ToggleGroup
          type="multiple"
          orientation="vertical"
          spacing={1}
          defaultValue={["bold", "italic"]}
        >
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <BoldIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <ItalicIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <UnderlineIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      </ShowCard>

      <ShowCard title="Disabled">
        <ToggleGroup disabled type="multiple">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic />
          </ToggleGroupItem>
          <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
            <Underline />
          </ToggleGroupItem>
        </ToggleGroup>
      </ShowCard>

      <ShowCard title="Custom">
        <ToggleGroupFontWeight />
      </ShowCard>
    </div>
  </div>
)

const ToggleGroupFontWeight = () => {
  const [fontWeight, setFontWeight] = React.useState("normal")
  return (
    <Field>
      <FieldLabel>Font Weight</FieldLabel>
      <ToggleGroup
        type="single"
        value={fontWeight}
        onValueChange={(value) => setFontWeight(value)}
        variant="outline"
        spacing={2}
        size="lg"
      >
        <ToggleGroupItem
          value="light"
          aria-label="Light"
          className="flex size-16 flex-col items-center justify-center rounded-xl"
        >
          <span className="text-2xl leading-none font-light">Aa</span>
          <span className="text-xs text-muted-foreground">Light</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="normal"
          aria-label="Normal"
          className="flex size-16 flex-col items-center justify-center rounded-xl"
        >
          <span className="text-2xl leading-none font-normal">Aa</span>
          <span className="text-xs text-muted-foreground">Normal</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="medium"
          aria-label="Medium"
          className="flex size-16 flex-col items-center justify-center rounded-xl"
        >
          <span className="text-2xl leading-none font-medium">Aa</span>
          <span className="text-xs text-muted-foreground">Medium</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="bold"
          aria-label="Bold"
          className="flex size-16 flex-col items-center justify-center rounded-xl"
        >
          <span className="text-2xl leading-none font-bold">Aa</span>
          <span className="text-xs text-muted-foreground">Bold</span>
        </ToggleGroupItem>
      </ToggleGroup>
      <FieldDescription>
        Use{" "}
        <code className="rounded-md bg-muted px-1 py-0.5 font-mono">
          font-{fontWeight}
        </code>{" "}
        to set the font weight.
      </FieldDescription>
    </Field>
  )
}

export default ToggleGroupPage

"use client"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import ShowCard from "../_components/show-card"

const ScrollAreaPage = () => {
  const tags = Array.from({ length: 20 }, (_, i) => `Tag ${i + 1}`)
  const cols = ["React", "Vue", "Angular", "Svelte", "Solid", "Qwik", "Astro", "Remix"]
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Scroll Area</h2>
        <p className="text-muted-foreground">Augments native scroll functionality for custom, cross-browser styling.</p>
      </div>
      <div className="space-y-4">
        <ShowCard title="Vertical">
          <ScrollArea className="h-56 w-48 rounded-md border">
            <div className="p-4">
              <p className="text-sm font-medium mb-2">Tags</p>
              {tags.map((tag) => (
                <div key={tag} className="text-sm py-1 border-b last:border-b-0">{tag}</div>
              ))}
            </div>
          </ScrollArea>
        </ShowCard>
        <ShowCard title="Horizontal" description="Add ScrollBar orientation='horizontal' inside.">
          <ScrollArea className="w-80 rounded-md border whitespace-nowrap">
            <div className="flex gap-3 p-4">
              {cols.map((c) => (
                <div key={c} className="shrink-0 rounded-md border bg-muted px-4 py-2 text-sm">{c}</div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </ShowCard>
      </div>
    </div>
  )
}

export default ScrollAreaPage

"use client"

import { Toggle } from "@/components/ui/toggle"
import { BoldIcon, BookmarkIcon, ItalicIcon } from "lucide-react"
import ShowCard from "../_components/show-card"

const TogglePage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Toggle</h2>
      <p className="text-muted-foreground">A two-state button that can be either on or off.</p>
    </div>
    <div className="space-y-4">
      <ShowCard>
        <Toggle aria-label="Toggle bookmark" size="sm" variant="outline">
          <BookmarkIcon className="group-data-[state=on]/toggle:fill-foreground" />
          Bookmark
        </Toggle>
      </ShowCard>

      <ShowCard title="Outline">
        <div className="flex flex-wrap items-center gap-2">
          <Toggle variant="outline" aria-label="Toggle italic">
            <ItalicIcon />
            Italic
          </Toggle>
          <Toggle variant="outline" aria-label="Toggle bold">
            <BoldIcon />
            Bold
          </Toggle>
        </div>
      </ShowCard>

      <ShowCard title="With Text">
        <Toggle aria-label="Toggle italic">
          <ItalicIcon />
          Italic
        </Toggle>
      </ShowCard>

      <ShowCard title="Size">
        <div className="flex flex-wrap items-center gap-2">
          <Toggle variant="outline" aria-label="Toggle small" size="sm">
            Small
          </Toggle>
          <Toggle variant="outline" aria-label="Toggle default" size="default">
            Default
          </Toggle>
          <Toggle variant="outline" aria-label="Toggle large" size="lg">
            Large
          </Toggle>
        </div>
      </ShowCard>

      <ShowCard title="Disabled">
        <div className="flex flex-wrap items-center gap-2">
          <Toggle aria-label="Toggle disabled" disabled>
            Disabled
          </Toggle>
          <Toggle variant="outline" aria-label="Toggle disabled outline" disabled>
            Disabled
          </Toggle>
        </div>
      </ShowCard>
    </div>
  </div>
)

export default TogglePage

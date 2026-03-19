"use client"

import * as React from "react"
import {
  Save, Printer, Share2, Heart, Copy, Edit2,
} from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { FabButton, type FabButtonItem } from "@/components/ui/fab-button"

type Direction = "up" | "down" | "left" | "right"

const ACTIONS: FabButtonItem[] = [
  { icon: <Save    className="h-4 w-4" />, label: "Save"  },
  { icon: <Printer className="h-4 w-4" />, label: "Print" },
  { icon: <Share2  className="h-4 w-4" />, label: "Share" },
  { icon: <Heart   className="h-4 w-4" />, label: "Like"  },
]

const ACTIONS_EXTENDED: FabButtonItem[] = [
  { icon: <Copy    className="h-4 w-4" />, label: "Copy"  },
  { icon: <Save    className="h-4 w-4" />, label: "Save"  },
  { icon: <Printer className="h-4 w-4" />, label: "Print" },
  { icon: <Share2  className="h-4 w-4" />, label: "Share" },
  { icon: <Heart   className="h-4 w-4" />, label: "Like"  },
]

const DIRECTIONS: Direction[] = ["up", "right", "down", "left"]

// ─── Demo 1: Basic ────────────────────────────────────────────────────────────
const BasicDemo = () => {
  const [hidden,    setHidden]    = React.useState(false)
  const [direction, setDirection] = React.useState<Direction>("up")

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <Switch id="hidden-toggle" checked={hidden} onCheckedChange={setHidden} />
          <Label htmlFor="hidden-toggle">Hidden</Label>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Direction</span>
          <div className="flex gap-2">
            {DIRECTIONS.map(d => (
              <button
                key={d}
                onClick={() => setDirection(d)}
                className={`rounded-md border px-3 py-1 text-xs capitalize transition-colors ${
                  direction === d
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground hover:bg-accent"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="flex h-52 items-center justify-center rounded-xl border bg-muted/30">
        <FabButton actions={ACTIONS} direction={direction} hidden={hidden} />
      </div>
    </div>
  )
}

// ─── Demo 2: Custom Close Icon ────────────────────────────────────────────────
const CustomIconDemo = () => (
  <div className="flex h-52 items-center justify-center rounded-xl border bg-muted/30">
    <FabButton
      actions={ACTIONS_EXTENDED}
      direction="up"
      openIcon={<Edit2 className="h-5 w-5" />}
    />
  </div>
)

// ─── Demo 3: Persistent Labels ────────────────────────────────────────────────
const PersistentLabelsDemo = () => (
  <div className="flex h-64 items-center justify-center rounded-xl border bg-muted/30">
    <FabButton
      actions={ACTIONS_EXTENDED}
      direction="up"
      persistentLabels
    />
  </div>
)

// ─── Page ─────────────────────────────────────────────────────────────────────
const FabButtonPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-10">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">FAB Button</h2>
      <p className="text-muted-foreground">
        A Floating Action Button that expands to reveal a set of related actions.
      </p>
    </div>

    {/* Basic */}
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold">Basic</h3>
        <p className="text-muted-foreground text-sm">
          Toggle visibility and change the expansion direction with the controls below.
        </p>
      </div>
      <Separator />
      <BasicDemo />
    </div>

    {/* Custom Close Icon */}
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold">Custom Open Icon</h3>
        <p className="text-muted-foreground text-sm">
          Pass <code className="bg-muted rounded px-1 py-0.5 text-xs">openIcon</code> to replace the default{" "}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">Plus</code> icon with any custom icon.
          The close icon remains the default{" "}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">X</code>.
        </p>
      </div>
      <Separator />
      <CustomIconDemo />
    </div>

    {/* Persistent Labels */}
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold">Persistent Labels</h3>
        <p className="text-muted-foreground text-sm">
          Pass <code className="bg-muted rounded px-1 py-0.5 text-xs">persistentLabels</code> to render
          a label badge next to each action instead of a hover tooltip.
        </p>
      </div>
      <Separator />
      <PersistentLabelsDemo />
    </div>
  </div>
)

export default FabButtonPage

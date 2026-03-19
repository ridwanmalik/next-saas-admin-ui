"use client"

import * as React from "react"
import { Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export interface FabButtonItem {
  icon: React.ReactNode
  label: string
  onClick?: () => void
}

export interface FabButtonProps {
  actions: FabButtonItem[]
  direction?: "up" | "down" | "left" | "right"
  hidden?: boolean
  /** Icon shown when FAB is closed (defaults to Plus) */
  openIcon?: React.ReactNode
  /** Icon shown when FAB is open (defaults to X) */
  closeIcon?: React.ReactNode
  /** Show persistent label badges beside each action button */
  persistentLabels?: boolean
  className?: string
}

export const FabButton = ({
  actions,
  direction = "up",
  hidden = false,
  openIcon,
  closeIcon,
  persistentLabels = false,
  className,
}: FabButtonProps) => {
  const [open, setOpen] = React.useState(false)

  if (hidden) return null

  const isVertical = direction === "up" || direction === "down"
  const isReverse  = direction === "down" || direction === "right"

  const tooltipSide =
    direction === "right" ? "top" :
    direction === "left"  ? "top" : "left"

  const items = actions.map(({ icon, label, onClick }, i) => {
    const delay = `${i * 40}ms`

    const btn = (
      <button
        key={label}
        onClick={() => { onClick?.(); setOpen(false) }}
        style={{ transitionDelay: open ? delay : "0ms" }}
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-card border shadow-md",
          "text-foreground transition-all duration-200 hover:bg-accent hover:scale-110 focus:outline-none",
          open ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none",
        )}
        aria-label={label}
      >
        {icon}
      </button>
    )

    if (persistentLabels) {
      return (
        <div
          key={label}
          style={{ transitionDelay: open ? delay : "0ms" }}
          className={cn(
            "relative flex items-center transition-all duration-200",
            open ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          {btn}
          {/* Label floats left — absolutely positioned so it never affects icon column width */}
          <span className="absolute right-full mr-2 text-xs font-medium bg-card border shadow-sm px-2 py-1 rounded-md whitespace-nowrap">
            {label}
          </span>
        </div>
      )
    }

    return (
      <Tooltip key={label}>
        <TooltipTrigger asChild>{btn}</TooltipTrigger>
        <TooltipContent side={tooltipSide}>{label}</TooltipContent>
      </Tooltip>
    )
  })

  const ordered = isReverse ? [...items].reverse() : items

  return (
    <div className={cn("relative inline-flex", className)}>
      {/* Actions */}
      <div
        className={cn(
          "absolute flex",
          isVertical ? "flex-col items-center gap-2" : "flex-row items-center gap-2",
          direction === "up"    && "bottom-full mb-3 left-1/2 -translate-x-1/2",
          direction === "down"  && "top-full mt-3 left-1/2 -translate-x-1/2",
          direction === "left"  && "right-full mr-3 top-1/2 -translate-y-1/2",
          direction === "right" && "left-full ml-3 top-1/2 -translate-y-1/2",
        )}
      >
        {ordered}
      </div>

      {/* FAB trigger */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Toggle floating action button"
        aria-expanded={open}
        className={cn(
          "relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg",
          "transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        )}
      >
        <span className={cn("absolute transition-all duration-200", open ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100")}>
          {openIcon ?? <Plus className="h-6 w-6" />}
        </span>
        <span className={cn("absolute transition-all duration-200", open ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50")}>
          {closeIcon ?? <X className="h-6 w-6" />}
        </span>
      </button>
    </div>
  )
}

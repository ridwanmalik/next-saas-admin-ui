"use client"

import { Search } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import ShowCard from "../_components/show-card"

const TooltipPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Tooltip</h2>
      <p className="text-muted-foreground">A popup that displays information related to an element on hover or focus.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="Default">
        <div className="flex flex-wrap gap-3">
          <Tooltip>
            <TooltipTrigger asChild><Button variant="outline">Hover me</Button></TooltipTrigger>
            <TooltipContent>This is a tooltip</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild><Button size="icon" variant="outline"><Search /></Button></TooltipTrigger>
            <TooltipContent>Search</TooltipContent>
          </Tooltip>
        </div>
      </ShowCard>
      <ShowCard title="Positions">
        <div className="flex flex-wrap gap-3">
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <Tooltip key={side}>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="capitalize">{side}</Button>
              </TooltipTrigger>
              <TooltipContent side={side}>Tooltip on {side}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </ShowCard>
    </div>
  </div>
)

export default TooltipPage

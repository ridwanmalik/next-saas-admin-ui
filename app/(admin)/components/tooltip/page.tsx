"use client"

import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { SaveIcon } from "lucide-react"
import ShowCard from "../_components/show-card"

const TooltipPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Tooltip</h2>
      <p className="text-muted-foreground">A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.</p>
    </div>
    <div className="space-y-4">
      <ShowCard>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </ShowCard>

      <ShowCard title="Side">
        <div className="flex flex-wrap gap-2">
          {(["left", "top", "bottom", "right"] as const).map((side) => (
            <Tooltip key={side}>
              <TooltipTrigger asChild>
                <Button variant="outline" className="w-fit capitalize">
                  {side}
                </Button>
              </TooltipTrigger>
              <TooltipContent side={side}>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </ShowCard>

      <ShowCard title="With Keyboard Shortcut">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon-sm">
              <SaveIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="pr-1.5">
            <div className="flex items-center gap-2">
              Save Changes <Kbd>S</Kbd>
            </div>
          </TooltipContent>
        </Tooltip>
      </ShowCard>

      <ShowCard title="Disabled Button">
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="inline-block w-fit">
              <Button variant="outline" disabled>
                Disabled
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>This feature is currently unavailable</p>
          </TooltipContent>
        </Tooltip>
      </ShowCard>
    </div>
  </div>
)

export default TooltipPage

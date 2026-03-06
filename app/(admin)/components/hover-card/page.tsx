"use client"

import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import ShowCard from "../_components/show-card"

const HOVER_CARD_SIDES = ["left", "top", "bottom", "right"] as const

const HoverCardPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Hover Card</h2>
      <p className="text-muted-foreground">
        For sighted users to preview content available behind a link.
      </p>
    </div>
    <div className="space-y-4">
      <ShowCard>
        <HoverCard openDelay={10} closeDelay={100}>
          <HoverCardTrigger asChild>
            <Button variant="link">Hover Here</Button>
          </HoverCardTrigger>
          <HoverCardContent className="flex w-64 flex-col gap-0.5">
            <div className="font-semibold">@nextjs</div>
            <div>The React Framework – created and maintained by @vercel.</div>
            <div className="mt-1 text-xs text-muted-foreground">
              Joined December 2021
            </div>
          </HoverCardContent>
        </HoverCard>
      </ShowCard>

      <ShowCard title="Basic">
        <HoverCard openDelay={10} closeDelay={100}>
          <HoverCardTrigger asChild>
            <Button variant="link">Hover Here</Button>
          </HoverCardTrigger>
          <HoverCardContent className="flex w-64 flex-col gap-0.5">
            <div className="font-semibold">@nextjs</div>
            <div>The React Framework – created and maintained by @vercel.</div>
            <div className="mt-1 text-xs text-muted-foreground">
              Joined December 2021
            </div>
          </HoverCardContent>
        </HoverCard>
      </ShowCard>

      <ShowCard title="Sides">
        <div className="flex flex-wrap justify-center gap-2">
          {HOVER_CARD_SIDES.map((side) => (
            <HoverCard key={side} openDelay={100} closeDelay={100}>
              <HoverCardTrigger asChild>
                <Button variant="outline" className="capitalize">
                  {side}
                </Button>
              </HoverCardTrigger>
              <HoverCardContent side={side}>
                <div className="flex flex-col gap-1">
                  <h4 className="font-medium">Hover Card</h4>
                  <p>This hover card appears on the {side} side of the trigger.</p>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </ShowCard>
    </div>
  </div>
)

export default HoverCardPage

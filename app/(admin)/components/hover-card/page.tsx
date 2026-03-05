"use client"

import { CalendarIcon } from "lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import ShowCard from "../_components/show-card"

const HoverCardPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Hover Card</h2>
      <p className="text-muted-foreground">For sighted users to preview content available behind a link.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="Default">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">@shadcn</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-72">
            <div className="flex gap-3">
              <Avatar><AvatarFallback>SC</AvatarFallback></Avatar>
              <div>
                <p className="text-sm font-semibold">@shadcn</p>
                <p className="text-xs text-muted-foreground mt-0.5">Building accessible component systems for the web.</p>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <CalendarIcon className="size-3" />Joined December 2021
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </ShowCard>
      <ShowCard title="Positions" description="side prop: top, right, bottom, left.">
        <div className="flex flex-wrap gap-3">
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <HoverCard key={side} openDelay={100} closeDelay={100}>
              <HoverCardTrigger asChild>
                <Button variant="outline" size="sm" className="capitalize">{side}</Button>
              </HoverCardTrigger>
              <HoverCardContent side={side} className="w-40 text-sm">
                Appears on the <strong>{side}</strong>.
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </ShowCard>
    </div>
  </div>
)

export default HoverCardPage

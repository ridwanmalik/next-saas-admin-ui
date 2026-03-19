"use client"

import { useState } from "react"
import { Clock, MapPin, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import type { CalendarEvent } from "./calendar-utils"
import { CAT_DOT, formatTime } from "./calendar-utils"

export const EventPopover = ({
  event,
  trigger,
}: {
  event: CalendarEvent
  trigger: React.ReactNode
}) => {
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent side="right" align="start" className="w-72 p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className={cn("h-2.5 w-2.5 rounded-full shrink-0 mt-0.5", CAT_DOT[event.category])} />
            <span className="text-sm font-semibold leading-snug">{event.title}</span>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            className="shrink-0 -mt-1 text-muted-foreground"
            onClick={() => setOpen(false)}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="space-y-1.5 text-xs text-muted-foreground">
          {event.allDay ? (
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              All day
            </div>
          ) : event.startTime ? (
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              {formatTime(event.startTime)}{event.endTime ? ` – ${formatTime(event.endTime)}` : ""}
            </div>
          ) : null}
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              {event.location}
            </div>
          )}
          {event.description && (
            <p className="pt-1 leading-relaxed">{event.description}</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

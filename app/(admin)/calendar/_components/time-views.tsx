"use client"

import { useRef, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import {
  CAT_BLOCK, CAT_PILL, DAY_FULL, DAY_SHORT,
  HOUR_HEIGHT, HOURS, MONTH_NAMES, START_HOUR, TOTAL_HEIGHT,
  eventsForDate, formatTime, layoutTimedEvents, pad2,
} from "./calendar-utils"
import { EventPopover } from "./event-popover"

// ─── Time grid (shared by week + day) ─────────────────────────────────────────

export const TimeGrid = ({
  days,
}: {
  days: { label: string; dateStr: string; isToday: boolean }[]
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = (9 - START_HOUR) * HOUR_HEIGHT - 20
    }
  }, [])

  const hasAllDay = days.some(d => eventsForDate(d.dateStr).some(e => e.allDay))

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      {hasAllDay && (
        <div className="flex border-b shrink-0">
          <div className="w-14 shrink-0 border-r py-1 flex items-center justify-end pr-2">
            <span className="text-[10px] text-muted-foreground">all-day</span>
          </div>
          {days.map(day => {
            const allDayEvents = eventsForDate(day.dateStr).filter(e => e.allDay)
            return (
              <div key={day.dateStr} className="flex-1 border-r last:border-0 py-1 px-1 space-y-0.5 min-w-0">
                {allDayEvents.map(e => (
                  <EventPopover key={e.id} event={e} trigger={
                    <Button variant="ghost" className={cn(
                      "w-full h-auto text-left rounded px-1.5 py-0.5 text-[11px] font-medium truncate justify-start hover:opacity-75",
                      CAT_PILL[e.category],
                    )}>
                      {e.title}
                    </Button>
                  } />
                ))}
              </div>
            )
          })}
        </div>
      )}

      <div ref={scrollRef} className="flex overflow-y-auto flex-1">
        <div className="w-14 shrink-0 border-r select-none" style={{ height: TOTAL_HEIGHT, minHeight: TOTAL_HEIGHT }}>
          {HOURS.map(h => (
            <div key={h} className="border-b flex items-start justify-end pr-2" style={{ height: HOUR_HEIGHT }}>
              <span className="text-[10px] text-muted-foreground -mt-2.5">
                {h === 12 ? "12pm" : h < 12 ? `${h}am` : `${h - 12}pm`}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-1 min-w-0" style={{ height: TOTAL_HEIGHT, minHeight: TOTAL_HEIGHT }}>
          {days.map(day => {
            const layoutEvents = layoutTimedEvents(eventsForDate(day.dateStr))
            return (
              <div key={day.dateStr} className="flex-1 border-r last:border-0 relative">
                {HOURS.map(h => (
                  <div
                    key={h}
                    className="absolute w-full border-b border-border/60"
                    style={{ top: (h - START_HOUR) * HOUR_HEIGHT, height: HOUR_HEIGHT }}
                  />
                ))}

                {layoutEvents.map(ev => {
                  const startMins = timeToMins(ev.startTime!)
                  const endMins   = ev.endTime ? timeToMins(ev.endTime) : startMins + 30
                  const top       = (startMins / 60 - START_HOUR) * HOUR_HEIGHT
                  const height    = Math.max(((endMins - startMins) / 60) * HOUR_HEIGHT, 24)

                  return (
                    <EventPopover key={ev.id} event={ev} trigger={
                      <Button
                        variant="ghost"
                        className={cn(
                          "absolute rounded px-1.5 py-0.5 h-auto text-left overflow-hidden justify-start items-start hover:opacity-80 z-10",
                          CAT_BLOCK[ev.category],
                        )}
                        style={{
                          top:    `${top}px`,
                          height: `${height}px`,
                          left:   `calc(${(ev.col / ev.totalCols) * 100}% + 2px)`,
                          width:  `calc(${(1 / ev.totalCols) * 100}% - 4px)`,
                        }}
                      >
                        <div className="min-w-0">
                          <p className="text-[11px] font-medium leading-tight truncate">{ev.title}</p>
                          {height >= 36 && (
                            <p className="text-[10px] opacity-70 leading-tight mt-0.5">{formatTime(ev.startTime!)}</p>
                          )}
                        </div>
                      </Button>
                    } />
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Helper (local) ───────────────────────────────────────────────────────────

const timeToMins = (t: string) => {
  const [h, m] = t.split(":").map(Number)
  return h * 60 + m
}

// ─── Week view ────────────────────────────────────────────────────────────────

export const WeekView = ({
  weekStart,
  today,
}: {
  weekStart: Date
  today: string
}) => {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d       = new Date(weekStart)
    d.setDate(d.getDate() + i)
    const dateStr = `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
    return { label: `${DAY_SHORT[i]} ${d.getDate()}`, dateStr, isToday: dateStr === today }
  })

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex border-b shrink-0">
        <div className="w-14 shrink-0 border-r" />
        {days.map(day => (
          <div key={day.dateStr} className="flex-1 py-2 border-r last:border-0 flex flex-col items-center gap-0.5">
            <span className={cn(
              "text-[11px] font-medium",
              day.isToday ? "text-primary" : "text-muted-foreground",
            )}>
              {day.label.split(" ")[0]}
            </span>
            <span className={cn(
              "h-7 w-7 flex items-center justify-center rounded-full text-sm font-semibold",
              day.isToday
                ? "bg-primary text-primary-foreground"
                : "text-foreground",
            )}>
              {day.label.split(" ")[1]}
            </span>
          </div>
        ))}
      </div>
      <TimeGrid days={days} />
    </div>
  )
}

// ─── Day view ─────────────────────────────────────────────────────────────────

export const DayView = ({
  date,
  today,
}: {
  date: Date
  today: string
}) => {
  const dateStr = `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`
  const isToday = dateStr === today
  const label   = `${DAY_FULL[(date.getDay() + 6) % 7]}, ${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex border-b shrink-0">
        <div className="w-14 shrink-0 border-r" />
        <div className="flex-1 py-3 flex items-center justify-center">
          <span className={cn("text-sm font-medium", isToday ? "text-primary" : "text-foreground")}>
            {label}
          </span>
        </div>
      </div>
      <TimeGrid days={[{ label, dateStr, isToday }]} />
    </div>
  )
}

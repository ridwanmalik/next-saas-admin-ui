"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { MonthView } from "./_components/month-view"
import { DayView, WeekView } from "./_components/time-views"
import { type CalendarView, MONTH_NAMES, DAY_FULL, getWeekStart, pad2 } from "./_components/calendar-utils"

// ─── Page ─────────────────────────────────────────────────────────────────────

const CalendarPage = () => {
  const today = useMemo(() => {
    const d = new Date()
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
  }, [])

  const [view,    setView]    = useState<CalendarView>("month")
  const [current, setCurrent] = useState(new Date(2026, 2, 13))

  const year      = current.getFullYear()
  const month     = current.getMonth()
  const weekStart = getWeekStart(current)

  const title = useMemo(() => {
    if (view === "month") {
      return `${MONTH_NAMES[month]} ${year}`
    }
    if (view === "week") {
      const ws       = getWeekStart(current)
      const we       = new Date(ws)
      we.setDate(we.getDate() + 6)
      const sameYear = ws.getFullYear() === we.getFullYear()
      if (ws.getMonth() === we.getMonth()) {
        return `${MONTH_NAMES[ws.getMonth()]} ${ws.getDate()} – ${we.getDate()}, ${ws.getFullYear()}`
      }
      return sameYear
        ? `${MONTH_NAMES[ws.getMonth()].slice(0, 3)} ${ws.getDate()} – ${MONTH_NAMES[we.getMonth()].slice(0, 3)} ${we.getDate()}, ${ws.getFullYear()}`
        : `${MONTH_NAMES[ws.getMonth()].slice(0, 3)} ${ws.getDate()}, ${ws.getFullYear()} – ${MONTH_NAMES[we.getMonth()].slice(0, 3)} ${we.getDate()}, ${we.getFullYear()}`
    }
    const dayName = DAY_FULL[(current.getDay() + 6) % 7]
    return `${dayName}, ${MONTH_NAMES[month]} ${current.getDate()}, ${year}`
  }, [view, current, month, year])

  const navigate = (dir: 1 | -1) => {
    const d = new Date(current)
    if (view === "month")     d.setMonth(d.getMonth() + dir)
    else if (view === "week") d.setDate(d.getDate() + dir * 7)
    else                      d.setDate(d.getDate() + dir)
    setCurrent(d)
  }

  const goToday = () => setCurrent(new Date())

  return (
    <div className="flex flex-col h-[calc(100svh-4rem-1px)] -m-4 md:-m-6">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 md:px-6 py-3 border-b bg-background shrink-0 flex-wrap gap-y-2">
        <Button size="sm" variant="outline" onClick={goToday} className="h-8 text-xs">
          Today
        </Button>

        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => navigate(1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <h2 className="text-sm font-semibold flex-1 min-w-32">{title}</h2>

        {/* View toggle */}
        <div className="flex items-center rounded-md border overflow-hidden text-xs shrink-0">
          {(["month", "week", "day"] as CalendarView[]).map(v => (
            <Button
              key={v}
              variant="ghost"
              size="sm"
              onClick={() => setView(v)}
              className={cn(
                "px-3 py-1.5 h-auto capitalize rounded-none border-r last:border-0",
                v === view
                  ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                  : "text-muted-foreground",
              )}
            >
              {v}
            </Button>
          ))}
        </div>

        <Button size="sm" className="h-8 gap-1.5 text-xs shrink-0">
          <Plus className="h-3.5 w-3.5" />
          New event
        </Button>
      </div>

      {/* Calendar body */}
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden bg-background">
        {view === "month" && <MonthView year={year} month={month} today={today} />}
        {view === "week"  && <WeekView  weekStart={weekStart} today={today} />}
        {view === "day"   && <DayView   date={current} today={today} />}
      </div>
    </div>
  )
}

export default CalendarPage

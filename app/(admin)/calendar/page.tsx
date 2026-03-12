"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type EventCategory = "work" | "personal" | "social" | "finance" | "deadline"
type CalendarView  = "month" | "week" | "day"

type CalendarEvent = {
  id: string
  title: string
  date: string
  startTime?: string
  endTime?: string
  allDay?: boolean
  category: EventCategory
  location?: string
  description?: string
}

type LayoutEvent = CalendarEvent & { col: number; totalCols: number }

// ─── Color maps ───────────────────────────────────────────────────────────────

const CAT_PILL: Record<EventCategory, string> = {
  work:     "bg-blue-500/15 text-blue-700 dark:text-blue-300",
  personal: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
  social:   "bg-orange-500/15 text-orange-700 dark:text-orange-300",
  finance:  "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  deadline: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
}

const CAT_BLOCK: Record<EventCategory, string> = {
  work:     "bg-blue-500/20 border-l-[3px] border-blue-500 text-blue-700 dark:text-blue-300",
  personal: "bg-violet-500/20 border-l-[3px] border-violet-500 text-violet-700 dark:text-violet-300",
  social:   "bg-orange-500/20 border-l-[3px] border-orange-500 text-orange-700 dark:text-orange-300",
  finance:  "bg-emerald-500/20 border-l-[3px] border-emerald-500 text-emerald-700 dark:text-emerald-300",
  deadline: "bg-rose-500/20 border-l-[3px] border-rose-500 text-rose-700 dark:text-rose-300",
}

const CAT_DOT: Record<EventCategory, string> = {
  work:     "bg-blue-500",
  personal: "bg-violet-500",
  social:   "bg-orange-500",
  finance:  "bg-emerald-500",
  deadline: "bg-rose-500",
}

// ─── Events data ──────────────────────────────────────────────────────────────

const EVENTS: CalendarEvent[] = [
  { id: "e1",  title: "Sprint Planning",        date: "2026-03-02", startTime: "09:00", endTime: "10:00",  category: "work",     location: "Conference Room A" },
  { id: "e2",  title: "Design Review",           date: "2026-03-05", startTime: "14:00", endTime: "15:30",  category: "work",     location: "Zoom" },
  { id: "e3",  title: "Team Lunch",              date: "2026-03-06", startTime: "12:30", endTime: "14:00",  category: "social",   location: "The Noodle Bar" },
  { id: "e4",  title: "Morning Standup",         date: "2026-03-09", startTime: "09:30", endTime: "09:45",  category: "work" },
  { id: "e5",  title: "Dentist",                 date: "2026-03-09", startTime: "15:00", endTime: "16:00",  category: "personal", location: "City Dental" },
  { id: "e6",  title: "Morning Standup",         date: "2026-03-10", startTime: "09:30", endTime: "09:45",  category: "work" },
  { id: "e7",  title: "Q1 OKR Review",           date: "2026-03-10", startTime: "10:00", endTime: "11:30",  category: "work",     location: "Board Room", description: "Quarterly OKR review with leadership. Come prepared with progress updates." },
  { id: "e8",  title: "Morning Standup",         date: "2026-03-11", startTime: "09:30", endTime: "09:45",  category: "work" },
  { id: "e9",  title: "1:1 with Manager",        date: "2026-03-11", startTime: "11:00", endTime: "11:30",  category: "work" },
  { id: "e10", title: "Morning Standup",         date: "2026-03-12", startTime: "09:30", endTime: "09:45",  category: "work" },
  { id: "e11", title: "Morning Standup",         date: "2026-03-13", startTime: "09:30", endTime: "09:45",  category: "work" },
  { id: "e12", title: "Product Demo",            date: "2026-03-13", startTime: "11:00", endTime: "12:00",  category: "work",     location: "Zoom", description: "Demoing the new dashboard to stakeholders. Deck is in Notion." },
  { id: "e13", title: "1:1 with Manager",        date: "2026-03-13", startTime: "14:00", endTime: "14:30",  category: "work" },
  { id: "e14", title: "Team Offsite",            date: "2026-03-16", allDay: true,                          category: "social",   location: "Retreat Centre, County Clare" },
  { id: "e15", title: "Team Offsite",            date: "2026-03-17", allDay: true,                          category: "social",   location: "Retreat Centre, County Clare" },
  { id: "e16", title: "Sprint Review",           date: "2026-03-17", startTime: "15:00", endTime: "16:00",  category: "work" },
  { id: "e17", title: "Client Call — Acme",      date: "2026-03-18", startTime: "14:00", endTime: "15:00",  category: "work",     location: "Teams" },
  { id: "e18", title: "Sarah's Birthday 🎂",     date: "2026-03-19", allDay: true,                          category: "social" },
  { id: "e19", title: "Q1 Close Deadline",       date: "2026-03-20", allDay: true,                          category: "deadline" },
  { id: "e20", title: "Engineering All-hands",   date: "2026-03-23", startTime: "16:00", endTime: "17:30",  category: "work",     location: "Main Hall" },
  { id: "e21", title: "Design Sprint — Day 1",   date: "2026-03-24", allDay: true,                          category: "work" },
  { id: "e22", title: "Design Sprint — Day 2",   date: "2026-03-25", allDay: true,                          category: "work" },
  { id: "e23", title: "1:1 with Manager",        date: "2026-03-25", startTime: "11:00", endTime: "11:30",  category: "work" },
  { id: "e24", title: "Invoice Due",             date: "2026-03-27", allDay: true,                          category: "finance" },
  { id: "e25", title: "Conference Talk",         date: "2026-03-27", startTime: "13:00", endTime: "14:30",  category: "work",     location: "Dublin Tech Summit" },
  { id: "e26", title: "Monthly Budget Review",   date: "2026-03-31", startTime: "15:00", endTime: "16:30",  category: "finance",  location: "Finance Team Room" },
]

// ─── Constants ────────────────────────────────────────────────────────────────

const HOUR_HEIGHT  = 56
const START_HOUR   = 7
const END_HOUR     = 21
const HOURS        = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i)
const TOTAL_HEIGHT = HOURS.length * HOUR_HEIGHT

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]
const DAY_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const DAY_FULL  = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const pad2 = (n: number) => String(n).padStart(2, "0")

const toDateStr = (y: number, m: number, d: number) => {
  const date = new Date(y, m, d)
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`
}

const timeToMins = (t: string) => {
  const [h, m] = t.split(":").map(Number)
  return h * 60 + m
}

const formatTime = (t: string) => {
  const [h, m] = t.split(":").map(Number)
  const suffix = h < 12 ? "am" : "pm"
  const hour   = h % 12 || 12
  return m === 0 ? `${hour}${suffix}` : `${hour}:${pad2(m)}${suffix}`
}

const getWeekStart = (date: Date) => {
  const d   = new Date(date)
  const day = d.getDay()
  d.setDate(d.getDate() + (day === 0 ? -6 : 1 - day))
  d.setHours(0, 0, 0, 0)
  return d
}

const eventsForDate = (dateStr: string) => EVENTS.filter(e => e.date === dateStr)

const layoutTimedEvents = (events: CalendarEvent[]): LayoutEvent[] => {
  const timed  = events.filter(e => !e.allDay && e.startTime)
  const sorted = [...timed].sort((a, b) => timeToMins(a.startTime!) - timeToMins(b.startTime!))

  const columns: CalendarEvent[][] = []
  const result: LayoutEvent[]      = []

  for (const event of sorted) {
    const start = timeToMins(event.startTime!)

    let col = columns.length
    for (let c = 0; c < columns.length; c++) {
      const last    = columns[c][columns[c].length - 1]
      const lastEnd = last.endTime ? timeToMins(last.endTime) : timeToMins(last.startTime!) + 30
      if (start >= lastEnd) { col = c; break }
    }

    if (!columns[col]) columns[col] = []
    columns[col].push(event)
    result.push({ ...event, col, totalCols: 1 })
  }

  // Compute totalCols per event (max overlapping column + 1)
  for (const ev of result) {
    const start = timeToMins(ev.startTime!)
    const end   = ev.endTime ? timeToMins(ev.endTime) : start + 30
    let maxCol  = ev.col
    for (const other of result) {
      const oStart = timeToMins(other.startTime!)
      const oEnd   = other.endTime ? timeToMins(other.endTime) : oStart + 30
      if (oStart < end && oEnd > start) maxCol = Math.max(maxCol, other.col)
    }
    ev.totalCols = maxCol + 1
  }

  return result
}

// ─── Event popover ────────────────────────────────────────────────────────────

const EventPopover = ({
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

// ─── Month view ───────────────────────────────────────────────────────────────

const MonthView = ({
  year,
  month,
  today,
}: {
  year: number
  month: number
  today: string
}) => {
  const firstDay    = new Date(year, month, 1).getDay()
  const offset      = (firstDay - 1 + 7) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: { dateStr: string; isCurrentMonth: boolean; dayNum: number }[] = []

  // Leading days from previous month
  for (let i = 0; i < offset; i++) {
    const d = new Date(year, month, -(offset - 1 - i))
    cells.push({ dateStr: toDateStr(d.getFullYear(), d.getMonth(), d.getDate()), isCurrentMonth: false, dayNum: d.getDate() })
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ dateStr: toDateStr(year, month, d), isCurrentMonth: true, dayNum: d })
  }

  // Trailing days to fill 6 rows (42 cells)
  const trailing = 42 - cells.length
  for (let d = 1; d <= trailing; d++) {
    const dt = new Date(year, month + 1, d)
    cells.push({ dateStr: toDateStr(dt.getFullYear(), dt.getMonth(), dt.getDate()), isCurrentMonth: false, dayNum: d })
  }

  const weeks = Array.from({ length: 6 }, (_, i) => cells.slice(i * 7, i * 7 + 7))

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Day headers */}
      <div className="grid grid-cols-7 border-b shrink-0">
        {DAY_SHORT.map(d => (
          <div key={d} className="py-2 text-center text-xs font-medium text-muted-foreground border-r last:border-0">
            {d}
          </div>
        ))}
      </div>

      {/* Week rows */}
      <div className="flex flex-col flex-1 min-h-0">
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 flex-1 border-b last:border-0" style={{ minHeight: 90 }}>
            {week.map(cell => {
              const isToday   = cell.dateStr === today
              const dayEvents = eventsForDate(cell.dateStr)
              const allDays   = dayEvents.filter(e => e.allDay)
              const timed     = dayEvents.filter(e => !e.allDay)
              const visible   = [...allDays, ...timed].slice(0, 3)
              const overflow  = dayEvents.length - visible.length

              return (
                <div
                  key={cell.dateStr}
                  className={cn(
                    "border-r last:border-0 p-1.5 flex flex-col gap-0.5 overflow-hidden",
                    !cell.isCurrentMonth && "bg-muted/30",
                  )}
                >
                  <div className="flex items-center justify-center mb-0.5 shrink-0">
                    <span className={cn(
                      "h-6 w-6 flex items-center justify-center rounded-full text-xs font-medium",
                      isToday  && "bg-primary text-primary-foreground font-semibold",
                      !isToday && cell.isCurrentMonth  && "text-foreground",
                      !isToday && !cell.isCurrentMonth && "text-muted-foreground/40",
                    )}>
                      {cell.dayNum}
                    </span>
                  </div>

                  {visible.map(event => (
                    <EventPopover key={event.id} event={event} trigger={
                      <button className={cn(
                        "w-full text-left rounded px-1.5 py-0.5 text-[11px] leading-tight font-medium truncate transition-opacity hover:opacity-75",
                        CAT_PILL[event.category],
                      )}>
                        {!event.allDay && event.startTime && (
                          <span className="opacity-60 mr-1 text-[10px]">{formatTime(event.startTime)}</span>
                        )}
                        {event.title}
                      </button>
                    } />
                  ))}

                  {overflow > 0 && (
                    <span className="text-[11px] text-muted-foreground pl-1 shrink-0">
                      +{overflow} more
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Time grid (week + day) ───────────────────────────────────────────────────

const TimeGrid = ({
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
      {/* All-day row */}
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
                    <button className={cn(
                      "w-full text-left rounded px-1.5 py-0.5 text-[11px] font-medium truncate transition-opacity hover:opacity-75",
                      CAT_PILL[e.category],
                    )}>
                      {e.title}
                    </button>
                  } />
                ))}
              </div>
            )
          })}
        </div>
      )}

      {/* Scrollable grid */}
      <div ref={scrollRef} className="flex overflow-y-auto flex-1">
        {/* Time labels */}
        <div className="w-14 shrink-0 border-r select-none" style={{ height: TOTAL_HEIGHT, minHeight: TOTAL_HEIGHT }}>
          {HOURS.map(h => (
            <div key={h} className="border-b flex items-start justify-end pr-2" style={{ height: HOUR_HEIGHT }}>
              <span className="text-[10px] text-muted-foreground -mt-2.5">
                {h === 12 ? "12pm" : h < 12 ? `${h}am` : `${h - 12}pm`}
              </span>
            </div>
          ))}
        </div>

        {/* Day columns */}
        <div className="flex flex-1 min-w-0" style={{ height: TOTAL_HEIGHT, minHeight: TOTAL_HEIGHT }}>
          {days.map(day => {
            const layoutEvents = layoutTimedEvents(eventsForDate(day.dateStr))
            return (
              <div
                key={day.dateStr}
                className="flex-1 border-r last:border-0 relative"
              >
                {/* Hour lines */}
                {HOURS.map(h => (
                  <div
                    key={h}
                    className="absolute w-full border-b border-border/60"
                    style={{ top: (h - START_HOUR) * HOUR_HEIGHT, height: HOUR_HEIGHT }}
                  />
                ))}

                {/* Events */}
                {layoutEvents.map(ev => {
                  const startMins = timeToMins(ev.startTime!)
                  const endMins   = ev.endTime ? timeToMins(ev.endTime) : startMins + 30
                  const top       = (startMins / 60 - START_HOUR) * HOUR_HEIGHT
                  const height    = Math.max(((endMins - startMins) / 60) * HOUR_HEIGHT, 24)

                  return (
                    <EventPopover key={ev.id} event={ev} trigger={
                      <button
                        className={cn(
                          "absolute rounded px-1.5 py-0.5 text-left overflow-hidden transition-opacity hover:opacity-80 z-10",
                          CAT_BLOCK[ev.category],
                        )}
                        style={{
                          top:    `${top}px`,
                          height: `${height}px`,
                          left:   `calc(${(ev.col / ev.totalCols) * 100}% + 2px)`,
                          width:  `calc(${(1 / ev.totalCols) * 100}% - 4px)`,
                        }}
                      >
                        <p className="text-[11px] font-medium leading-tight truncate">{ev.title}</p>
                        {height >= 36 && (
                          <p className="text-[10px] opacity-70 leading-tight mt-0.5">{formatTime(ev.startTime!)}</p>
                        )}
                      </button>
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

// ─── Week view ────────────────────────────────────────────────────────────────

const WeekView = ({
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
      {/* Column headers */}
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

const DayView = ({
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
      {/* Header */}
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

  const goToday = () => setCurrent(new Date(2026, 2, 13))

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
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                "px-3 py-1.5 capitalize transition-colors border-r last:border-0",
                v === view
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground",
              )}
            >
              {v}
            </button>
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

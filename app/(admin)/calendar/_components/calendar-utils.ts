// ─── Types ────────────────────────────────────────────────────────────────────

export type EventCategory = "work" | "personal" | "social" | "finance" | "deadline"
export type CalendarView  = "month" | "week" | "day"

export type CalendarEvent = {
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

export type LayoutEvent = CalendarEvent & { col: number; totalCols: number }

// ─── Color maps ───────────────────────────────────────────────────────────────

export const CAT_PILL: Record<EventCategory, string> = {
  work:     "bg-blue-500/15 text-blue-700 dark:text-blue-300",
  personal: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
  social:   "bg-orange-500/15 text-orange-700 dark:text-orange-300",
  finance:  "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  deadline: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
}

export const CAT_BLOCK: Record<EventCategory, string> = {
  work:     "bg-blue-500/20 border-l-[3px] border-blue-500 text-blue-700 dark:text-blue-300",
  personal: "bg-violet-500/20 border-l-[3px] border-violet-500 text-violet-700 dark:text-violet-300",
  social:   "bg-orange-500/20 border-l-[3px] border-orange-500 text-orange-700 dark:text-orange-300",
  finance:  "bg-emerald-500/20 border-l-[3px] border-emerald-500 text-emerald-700 dark:text-emerald-300",
  deadline: "bg-rose-500/20 border-l-[3px] border-rose-500 text-rose-700 dark:text-rose-300",
}

export const CAT_DOT: Record<EventCategory, string> = {
  work:     "bg-blue-500",
  personal: "bg-violet-500",
  social:   "bg-orange-500",
  finance:  "bg-emerald-500",
  deadline: "bg-rose-500",
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const HOUR_HEIGHT  = 56
export const START_HOUR   = 7
export const END_HOUR     = 21
export const HOURS        = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i)
export const TOTAL_HEIGHT = HOURS.length * HOUR_HEIGHT

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]
export const DAY_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
export const DAY_FULL  = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

// ─── Events data ──────────────────────────────────────────────────────────────

export const EVENTS: CalendarEvent[] = [
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const pad2 = (n: number) => String(n).padStart(2, "0")

export const toDateStr = (y: number, m: number, d: number) => {
  const date = new Date(y, m, d)
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`
}

export const timeToMins = (t: string) => {
  const [h, m] = t.split(":").map(Number)
  return h * 60 + m
}

export const formatTime = (t: string) => {
  const [h, m] = t.split(":").map(Number)
  const suffix = h < 12 ? "am" : "pm"
  const hour   = h % 12 || 12
  return m === 0 ? `${hour}${suffix}` : `${hour}:${pad2(m)}${suffix}`
}

export const getWeekStart = (date: Date) => {
  const d   = new Date(date)
  const day = d.getDay()
  d.setDate(d.getDate() + (day === 0 ? -6 : 1 - day))
  d.setHours(0, 0, 0, 0)
  return d
}

export const eventsForDate = (dateStr: string) => EVENTS.filter(e => e.date === dateStr)

export const layoutTimedEvents = (events: CalendarEvent[]): LayoutEvent[] => {
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

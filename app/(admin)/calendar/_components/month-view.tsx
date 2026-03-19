import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { CAT_PILL, DAY_SHORT, eventsForDate, formatTime, toDateStr } from "./calendar-utils"
import { EventPopover } from "./event-popover"

export const MonthView = ({
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

  for (let i = 0; i < offset; i++) {
    const d = new Date(year, month, -(offset - 1 - i))
    cells.push({ dateStr: toDateStr(d.getFullYear(), d.getMonth(), d.getDate()), isCurrentMonth: false, dayNum: d.getDate() })
  }

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ dateStr: toDateStr(year, month, d), isCurrentMonth: true, dayNum: d })
  }

  const trailing = 42 - cells.length
  for (let d = 1; d <= trailing; d++) {
    const dt = new Date(year, month + 1, d)
    cells.push({ dateStr: toDateStr(dt.getFullYear(), dt.getMonth(), dt.getDate()), isCurrentMonth: false, dayNum: d })
  }

  const weeks = Array.from({ length: 6 }, (_, i) => cells.slice(i * 7, i * 7 + 7))

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="grid grid-cols-7 border-b shrink-0">
        {DAY_SHORT.map(d => (
          <div key={d} className="py-2 text-center text-xs font-medium text-muted-foreground border-r last:border-0">
            {d}
          </div>
        ))}
      </div>

      <div className="flex flex-col flex-1 min-h-0">
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 flex-1 border-b last:border-0 min-h-22.5">
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
                      <Button variant="ghost" className={cn(
                        "w-full h-auto text-left rounded px-1.5 py-0.5 text-[11px] leading-tight font-medium truncate justify-start hover:opacity-75",
                        CAT_PILL[event.category],
                      )}>
                        {!event.allDay && event.startTime && (
                          <span className="opacity-60 mr-1 text-[10px]">{formatTime(event.startTime)}</span>
                        )}
                        {event.title}
                      </Button>
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

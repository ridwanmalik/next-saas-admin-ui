import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export type TimelineStatus = "success" | "warning" | "error" | "info" | "default"

export interface TimelineItem {
  id: string
  icon?: LucideIcon
  title: string
  description?: string
  timestamp: string
  status?: TimelineStatus
}

interface ActivityTimelineProps {
  items: TimelineItem[]
  className?: string
}

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<TimelineStatus, { dot: string; icon: string }> = {
  success: { dot: "bg-emerald-500",                   icon: "text-emerald-500" },
  warning: { dot: "bg-amber-500",                     icon: "text-amber-500"   },
  error:   { dot: "bg-destructive",                   icon: "text-destructive" },
  info:    { dot: "bg-blue-500",                      icon: "text-blue-500"    },
  default: { dot: "bg-muted-foreground/40",           icon: "text-muted-foreground" },
}

// ─── Component ────────────────────────────────────────────────────────────────

export const ActivityTimeline = ({ items, className }: ActivityTimelineProps) => (
  <div className={cn("relative", className)}>
    {items.map((item, index) => {
      const status = item.status ?? "default"
      const styles = STATUS_STYLES[status]
      const isLast = index === items.length - 1

      return (
        <div key={item.id} className="relative flex gap-4 pb-6 last:pb-0">
          {/* Vertical line */}
          {!isLast && (
            <div className="absolute left-[13px] top-7 bottom-0 w-px bg-border" />
          )}

          {/* Icon / dot */}
          <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-background">
            {item.icon ? (
              <item.icon className={cn("h-3.5 w-3.5", styles.icon)} />
            ) : (
              <span className={cn("h-2 w-2 rounded-full", styles.dot)} />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 pt-0.5">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium leading-tight">{item.title}</p>
              <time className="text-[11px] text-muted-foreground shrink-0 mt-0.5">{item.timestamp}</time>
            </div>
            {item.description && (
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
            )}
          </div>
        </div>
      )
    })}
  </div>
)

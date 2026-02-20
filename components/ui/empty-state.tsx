import { type LucideIcon, Inbox } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface EmptyStateAction {
  label: string
  onClick?: () => void
  href?: string
  icon?: LucideIcon
  variant?: "default" | "outline" | "ghost" | "secondary"
}

export interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  actions?: EmptyStateAction[]
  /**
   * sm  — compact, for use inside cards or table cells
   * md  — standard (default), inside page sections
   * lg  — full-page empty state
   */
  size?: "sm" | "md" | "lg"
  className?: string
}

// ─── Size tokens ──────────────────────────────────────────────────────────────

const SIZE = {
  sm: {
    wrap:     "py-8 gap-3",
    ring:     "h-11 w-11 rounded-xl",
    icon:     "h-5 w-5",
    title:    "text-sm font-semibold",
    desc:     "text-xs max-w-xs",
    btnSize:  "sm" as const,
  },
  md: {
    wrap:     "py-14 gap-4",
    ring:     "h-14 w-14 rounded-2xl",
    icon:     "h-7 w-7",
    title:    "text-base font-semibold",
    desc:     "text-sm max-w-sm",
    btnSize:  "default" as const,
  },
  lg: {
    wrap:     "py-24 gap-5",
    ring:     "h-20 w-20 rounded-3xl",
    icon:     "h-10 w-10",
    title:    "text-xl font-semibold",
    desc:     "text-sm max-w-md",
    btnSize:  "default" as const,
  },
}

// ─── Component ────────────────────────────────────────────────────────────────

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actions,
  size = "md",
  className,
}: EmptyStateProps) {
  const s = SIZE[size]

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        s.wrap,
        className,
      )}
    >
      {/* Icon container */}
      <div
        className={cn(
          "flex items-center justify-center bg-muted ring-1 ring-border/60 shrink-0",
          s.ring,
        )}
      >
        <Icon
          className={cn("text-muted-foreground", s.icon)}
          strokeWidth={1.5}
        />
      </div>

      {/* Copy */}
      <div className="space-y-1.5">
        <h3 className={cn("tracking-tight text-foreground", s.title)}>
          {title}
        </h3>
        {description && (
          <p className={cn("text-muted-foreground leading-relaxed mx-auto", s.desc)}>
            {description}
          </p>
        )}
      </div>

      {/* Actions */}
      {actions && actions.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {actions.map((action, i) => {
            const ActionIcon = action.icon
            const btn = (
              <Button
                key={i}
                size={s.btnSize}
                variant={action.variant ?? (i === 0 ? "default" : "outline")}
                onClick={action.onClick}
                asChild={!!action.href}
              >
                {action.href ? (
                  <a href={action.href}>
                    {ActionIcon && <ActionIcon className="h-4 w-4" />}
                    {action.label}
                  </a>
                ) : (
                  <>
                    {ActionIcon && <ActionIcon className="h-4 w-4" />}
                    {action.label}
                  </>
                )}
              </Button>
            )
            return btn
          })}
        </div>
      )}
    </div>
  )
}

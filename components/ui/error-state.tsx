import { type LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ErrorStateAction {
  label: string
  icon?: LucideIcon
  onClick?: () => void
  href?: string
  variant?: "default" | "outline" | "ghost"
}

export interface ErrorStateProps {
  /** HTTP code or short label — rendered large and muted (e.g. 404, 500, "403") */
  code?: string | number
  title: string
  description?: string
  actions?: ErrorStateAction[]
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ErrorState({
  code,
  title,
  description,
  actions,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center text-center px-6 overflow-hidden",
        "min-h-[60vh]",
        className,
      )}
    >
      {/* Subtle dot-grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Code — large watermark */}
      {code != null && (
        <p
          className={cn(
            "select-none font-bold tabular-nums leading-none mb-4",
            "text-[96px] sm:text-[128px]",
            "text-foreground/[0.06] dark:text-foreground/[0.08]",
          )}
        >
          {code}
        </p>
      )}

      {/* Copy */}
      <div className="space-y-2 -mt-2">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Actions */}
      {actions && actions.length > 0 && (
        <div className="flex items-center gap-3 mt-8 flex-wrap justify-center">
          {actions.map((action, i) => {
            const ActionIcon = action.icon
            return (
              <Button
                key={i}
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
          })}
        </div>
      )}
    </div>
  )
}

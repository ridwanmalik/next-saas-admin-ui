import type { LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Sparkline } from "@/components/ui/sparkline"
import { cn } from "@/lib/utils"

export interface StatCardProps {
  label: string
  value: string
  change: string
  positive: boolean
  period?: string
  sparkline?: number[]
  icon?: LucideIcon
  iconBg?: string
  iconColor?: string
}

export const StatCard = ({
  label,
  value,
  change,
  positive,
  period,
  sparkline,
  icon: Icon,
  iconBg,
  iconColor,
}: StatCardProps) => (
  <Card>
    <CardContent>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground leading-none">{label}</p>
        {Icon && iconBg && iconColor && (
          <div className={cn("flex items-center justify-center rounded-lg p-2 shrink-0", iconBg)}>
            <Icon className={cn("h-3.5 w-3.5", iconColor)} />
          </div>
        )}
      </div>
      <p className="text-2xl font-bold tracking-tight mt-3">{value}</p>
      <div className="flex items-end justify-between mt-2 gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={cn("text-xs font-semibold", positive ? "text-emerald-500" : "text-red-500")}>
            {change}
          </span>
          {period && <span className="text-xs text-muted-foreground">{period}</span>}
        </div>
        {sparkline && <Sparkline data={sparkline} positive={positive} />}
      </div>
    </CardContent>
  </Card>
)

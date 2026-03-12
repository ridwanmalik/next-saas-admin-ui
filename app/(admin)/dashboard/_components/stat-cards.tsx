import type { LucideIcon } from "lucide-react"
import { Activity, DollarSign, UserMinus, Users } from "lucide-react"

import { StatCard } from "@/components/ui/stat-card"

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatItem {
  label: string
  value: string
  change: string
  positive: boolean
  period: string
  icon: LucideIcon
  iconBg: string
  iconColor: string
  sparkline: number[]
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS: StatItem[] = [
  {
    label: "Total Revenue",
    value: "$48,295",
    change: "+12.5%",
    positive: true,
    period: "vs last month",
    icon: DollarSign,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
    sparkline: [32400, 35800, 29600, 38100, 41300, 39800, 44700, 47200, 45100, 51400, 48295],
  },
  {
    label: "Active Users",
    value: "12,340",
    change: "+8.2%",
    positive: true,
    period: "vs last month",
    icon: Users,
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-500",
    sparkline: [9200, 9800, 9400, 10100, 10600, 10900, 11200, 11500, 11800, 12000, 12340],
  },
  {
    label: "Churn Rate",
    value: "2.4%",
    change: "-0.8%",
    positive: true,
    period: "vs last month",
    icon: UserMinus,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
    sparkline: [4.2, 3.9, 4.1, 3.7, 3.5, 3.8, 3.4, 3.2, 3.1, 2.7, 2.4],
  },
  {
    label: "Avg. Revenue / User",
    value: "$3.91",
    change: "+4.3%",
    positive: true,
    period: "vs last month",
    icon: Activity,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
    sparkline: [3.12, 3.25, 3.18, 3.35, 3.42, 3.38, 3.55, 3.62, 3.70, 3.78, 3.91],
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export const StatCards = () => (
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {STATS.map(stat => (
      <StatCard
        key={stat.label}
        label={stat.label}
        value={stat.value}
        change={stat.change}
        positive={stat.positive}
        period={stat.period}
        sparkline={stat.sparkline}
        icon={stat.icon}
        iconBg={stat.iconBg}
        iconColor={stat.iconColor}
      />
    ))}
  </div>
)

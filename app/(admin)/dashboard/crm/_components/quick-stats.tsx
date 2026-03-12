import { BarChart3, TrendingUp, UserPlus, Video } from "lucide-react"

import { cn } from "@/lib/utils"

// ─── Data ─────────────────────────────────────────────────────────────────────

const STAT_CARDS = [
  { value: "$203k", label: "Total Income", icon: BarChart3, bg: "bg-blue-600", iconBg: "bg-blue-500" },
  { value: "$120k", label: "Meeting Attends", icon: Video, bg: "bg-rose-500", iconBg: "bg-rose-400" },
  { value: "$234k", label: "Sales Improve", icon: TrendingUp, bg: "bg-amber-500", iconBg: "bg-amber-400" },
  { value: "$248k", label: "New Users", icon: UserPlus, bg: "bg-violet-600", iconBg: "bg-violet-500" },
]

// ─── Component ────────────────────────────────────────────────────────────────

export const QuickStats = () => (
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {STAT_CARDS.map((card) => (
      <div key={card.label} className={cn("rounded-xl p-5 flex items-center gap-4 text-white", card.bg)}>
        <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl", card.iconBg)}>
          <card.icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="text-xl font-bold">{card.value}</p>
          <p className="text-sm text-white/80">{card.label}</p>
        </div>
      </div>
    ))}
  </div>
)

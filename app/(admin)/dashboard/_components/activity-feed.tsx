import type { LucideIcon } from "lucide-react"
import {
  ArrowUpRight,
  CreditCard,
  LogOut,
  MessageSquare,
  UserPlus,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

interface ActivityItem {
  icon: LucideIcon
  iconBg: string
  iconColor: string
  title: string
  description: string
  time: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ACTIVITY: ActivityItem[] = [
  { icon: UserPlus, iconBg: "bg-emerald-500/10", iconColor: "text-emerald-500", title: "New signup", description: "Elena Kim joined on Free plan", time: "3m ago" },
  { icon: ArrowUpRight, iconBg: "bg-blue-500/10", iconColor: "text-blue-500", title: "Plan upgraded", description: "Marcus Rivera → Pro", time: "18m ago" },
  { icon: CreditCard, iconBg: "bg-violet-500/10", iconColor: "text-violet-500", title: "Payment received", description: "$299.00 from Acme Corp", time: "42m ago" },
  { icon: MessageSquare, iconBg: "bg-amber-500/10", iconColor: "text-amber-500", title: "Support ticket", description: "Ticket #407 opened by Priya N.", time: "1h ago" },
  { icon: LogOut, iconBg: "bg-red-500/10", iconColor: "text-red-500", title: "Cancellation", description: "Liam Barrett cancelled Pro", time: "3h ago" },
  { icon: UserPlus, iconBg: "bg-emerald-500/10", iconColor: "text-emerald-500", title: "New signup", description: "David Park joined on Pro plan", time: "5h ago" },
]

// ─── Component ────────────────────────────────────────────────────────────────

export const ActivityFeed = () => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Activity</CardTitle>
      <CardDescription>Live platform events</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-1">
        {ACTIVITY.map((item, i) => (
          <div key={i}>
            <div className="flex items-start gap-3 py-2.5">
              <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full mt-0.5", item.iconBg)}>
                <item.icon className={cn("h-3.5 w-3.5", item.iconColor)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-none">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-snug truncate">
                  {item.description}
                </p>
              </div>
              <span className="text-[11px] text-muted-foreground whitespace-nowrap mt-0.5 shrink-0">
                {item.time}
              </span>
            </div>
            {i < ACTIVITY.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

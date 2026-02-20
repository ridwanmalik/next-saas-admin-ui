import type { LucideIcon } from "lucide-react"
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Download,
  LogOut,
  MessageSquare,
  UserMinus,
  UserPlus,
  Users,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { StatCard } from "@/components/ui/stat-card"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type Trend = "up" | "down"
type TxStatus = "paid" | "pending" | "failed"
type Plan = "Free" | "Pro" | "Enterprise"

interface StatItem {
  label: string
  value: string
  change: string
  trend: Trend
  positive: boolean
  period: string
  icon: LucideIcon
  iconBg: string
  iconColor: string
  sparkline: number[]
}

interface Transaction {
  id: string
  customer: string
  email: string
  plan: Plan
  amount: string
  date: string
  status: TxStatus
  initials: string
}

interface ActivityItem {
  icon: LucideIcon
  iconBg: string
  iconColor: string
  title: string
  description: string
  time: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

// 52 weeks of weekly revenue (Jan 1 – Dec 28, 2025)
const WEEKLY_REVENUE = [
  7400, 8100, 7200, 7900, 8600, 7800, 8400, 9100,  // Jan – Feb
  8300, 9000, 9600, 8800, 9400, 10100, 9700, 10400, // Mar – Apr
  11000, 10300, 10900, 11500, 10700, 11300, 11900, 11100, // May – Jun
  11700, 12300, 11600, 12200, 12800, 12100, 12700, 13200, // Jul – Aug
  12500, 13100, 13700, 12900, 13500, 14100, 13400, 14000, // Sep – Oct
  14600, 13800, 14400, 14900, 14200, 15000, 14500, 15200, // Nov – Dec
  14800, 15500, 14900, 15800,                              // late Dec
]

const MONTH_TICKS = [
  { label: "Jan", week: 0 },  { label: "Feb", week: 4 },  { label: "Mar", week: 9 },
  { label: "Apr", week: 13 }, { label: "May", week: 17 }, { label: "Jun", week: 22 },
  { label: "Jul", week: 26 }, { label: "Aug", week: 30 }, { label: "Sep", week: 35 },
  { label: "Oct", week: 39 }, { label: "Nov", week: 43 }, { label: "Dec", week: 48 },
]

const STATS: StatItem[] = [
  {
    label: "Total Revenue",
    value: "$48,295",
    change: "+12.5%",
    trend: "up",
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
    trend: "up",
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
    trend: "down",
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
    trend: "up",
    positive: true,
    period: "vs last month",
    icon: Activity,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
    sparkline: [3.12, 3.25, 3.18, 3.35, 3.42, 3.38, 3.55, 3.62, 3.70, 3.78, 3.91],
  },
]

const PLAN_BREAKDOWN = [
  { name: "Free" as Plan, count: 8240, pct: 66.8, dot: "bg-muted-foreground/50" },
  { name: "Pro" as Plan, count: 3200, pct: 25.9, dot: "bg-primary" },
  { name: "Enterprise" as Plan, count: 900, pct: 7.3, dot: "bg-amber-500" },
]

const TRANSACTIONS: Transaction[] = [
  { id: "TXN-4821", customer: "Alice Johnson", email: "alice@acme.com", plan: "Enterprise", amount: "$299.00", date: "Dec 18, 2025", status: "paid", initials: "AJ" },
  { id: "TXN-4820", customer: "Marcus Rivera", email: "marcus@startup.io", plan: "Pro", amount: "$29.00", date: "Dec 17, 2025", status: "paid", initials: "MR" },
  { id: "TXN-4819", customer: "Priya Nair", email: "priya@techcorp.com", plan: "Pro", amount: "$29.00", date: "Dec 17, 2025", status: "pending", initials: "PN" },
  { id: "TXN-4818", customer: "James Okonkwo", email: "james@bigco.com", plan: "Enterprise", amount: "$299.00", date: "Dec 16, 2025", status: "paid", initials: "JO" },
  { id: "TXN-4817", customer: "Sofia Chen", email: "sofia@designlab.co", plan: "Free", amount: "$0.00", date: "Dec 15, 2025", status: "paid", initials: "SC" },
  { id: "TXN-4816", customer: "Liam Barrett", email: "liam@agencyx.com", plan: "Pro", amount: "$29.00", date: "Dec 14, 2025", status: "failed", initials: "LB" },
  { id: "TXN-4815", customer: "Amara Diallo", email: "amara@ngocorp.org", plan: "Pro", amount: "$29.00", date: "Dec 13, 2025", status: "paid", initials: "AD" },
]

const ACTIVITY: ActivityItem[] = [
  { icon: UserPlus, iconBg: "bg-emerald-500/10", iconColor: "text-emerald-500", title: "New signup", description: "Elena Kim joined on Free plan", time: "3m ago" },
  { icon: ArrowUpRight, iconBg: "bg-blue-500/10", iconColor: "text-blue-500", title: "Plan upgraded", description: "Marcus Rivera → Pro", time: "18m ago" },
  { icon: CreditCard, iconBg: "bg-violet-500/10", iconColor: "text-violet-500", title: "Payment received", description: "$299.00 from Acme Corp", time: "42m ago" },
  { icon: MessageSquare, iconBg: "bg-amber-500/10", iconColor: "text-amber-500", title: "Support ticket", description: "Ticket #407 opened by Priya N.", time: "1h ago" },
  { icon: LogOut, iconBg: "bg-red-500/10", iconColor: "text-red-500", title: "Cancellation", description: "Liam Barrett cancelled Pro", time: "3h ago" },
  { icon: UserPlus, iconBg: "bg-emerald-500/10", iconColor: "text-emerald-500", title: "New signup", description: "David Park joined on Pro plan", time: "5h ago" },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

const RevenueChart = () => {
  const data = WEEKLY_REVENUE
  const n = data.length
  // SVG canvas dimensions
  const W = 560, H = 168
  const pL = 40, pR = 8, pT = 8, pB = 26
  const cW = W - pL - pR
  const cH = H - pT - pB
  // Y scale: floor a bit below min so the line isn't clipped at the bottom
  const minDisplay = 6000
  const maxDisplay = 16500
  const range = maxDisplay - minDisplay
  const xPos = (i: number) => pL + (i / (n - 1)) * cW
  const yPos = (v: number) => pT + cH - ((v - minDisplay) / range) * cH
  // Build points strings
  const linePts = data.map((v, i) => `${xPos(i)},${yPos(v)}`).join(" ")
  const areaPts = `${xPos(0)},${pT + cH} ${linePts} ${xPos(n - 1)},${pT + cH}`
  const gridLines = [8000, 10000, 12000, 14000, 16000]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden>
      <defs>
        <linearGradient id="rev-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Horizontal grid lines + y-axis labels */}
      {gridLines.map((v) => {
        const y = yPos(v)
        return (
          <g key={v}>
            <line
              x1={pL} y1={y} x2={W - pR} y2={y}
              strokeWidth={0.5} strokeDasharray="3 3"
              style={{ stroke: "var(--border)" }}
            />
            <text x={pL - 5} y={y + 3.5} textAnchor="end" fontSize={9} style={{ fill: "var(--muted-foreground)" }}>
              ${v / 1000}k
            </text>
          </g>
        )
      })}

      {/* Area fill */}
      <polygon points={areaPts} fill="url(#rev-fill)" />

      {/* Line */}
      <polyline
        points={linePts}
        fill="none"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ stroke: "var(--primary)" }}
      />

      {/* Last point dot */}
      <circle
        cx={xPos(n - 1)} cy={yPos(data[n - 1])}
        r={3}
        style={{ fill: "var(--primary)" }}
      />

      {/* Month tick labels */}
      {MONTH_TICKS.map(({ label, week }) => (
        <text
          key={label}
          x={xPos(Math.min(week, n - 1))}
          y={H - 7}
          textAnchor="middle"
          fontSize={9}
          style={{ fill: "var(--muted-foreground)" }}
        >
          {label}
        </text>
      ))}
    </svg>
  )
}

const statusConfig: Record<TxStatus, { label: string; variant: "default" | "secondary" | "destructive" }> = {
  paid: { label: "Paid", variant: "default" },
  pending: { label: "Pending", variant: "secondary" },
  failed: { label: "Failed", variant: "destructive" },
}

const planConfig: Record<Plan, { variant: "default" | "outline" | "secondary" }> = {
  Enterprise: { variant: "default" },
  Pro: { variant: "outline" },
  Free: { variant: "secondary" },
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <div className="space-y-6">

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            December 2025 · All systems operational
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-3.5 w-3.5" />
          Export Report
        </Button>
      </div>

      {/* ── Stat cards ────────────────────────────────────────────────────── */}
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

      {/* ── Revenue chart + Plan breakdown ────────────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-3">

        <Card className="lg:col-span-2">
          <CardHeader className="pb-0">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <CardTitle>Revenue Over Time</CardTitle>
                <CardDescription>Weekly revenue · Jan – Dec 2025 (52 weeks)</CardDescription>
              </div>
              <div className="text-right">
                <p className="text-base font-bold tabular-nums">$476,095</p>
                <p className="text-xs text-muted-foreground">Year to date</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <RevenueChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plan Breakdown</CardTitle>
            <CardDescription>12,340 total users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Stacked bar */}
            <div className="flex h-2 w-full overflow-hidden rounded-full gap-px">
              <div className="bg-muted-foreground/40 rounded-l-full" style={{ width: "66.8%" }} />
              <div className="bg-primary" style={{ width: "25.9%" }} />
              <div className="bg-amber-500 rounded-r-full" style={{ width: "7.3%" }} />
            </div>

            {/* Rows */}
            <div className="space-y-3">
              {PLAN_BREAKDOWN.map((p) => (
                <div key={p.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={cn("h-2 w-2 rounded-full shrink-0", p.dot)} />
                    <span className="text-sm">{p.name}</span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-semibold tabular-nums">{p.count.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground">{p.pct}%</span>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            {/* MRR summary */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">MRR · Pro</span>
                <span className="font-medium tabular-nums">$92,800</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">MRR · Enterprise</span>
                <span className="font-medium tabular-nums">$269,100</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center font-semibold">
                <span>Total MRR</span>
                <span className="tabular-nums">$361,900</span>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* ── Transactions + Activity feed ──────────────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-3">

        {/* Transactions table */}
        <Card className="lg:col-span-2 overflow-hidden">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Last 7 billing events</CardDescription>
              </div>
              <Badge variant="outline" className="text-xs shrink-0">
                {TRANSACTIONS.filter(t => t.status === "pending").length} pending
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-t border-b bg-muted/40">
                    <th className="px-6 py-3 text-left text-[11px] font-medium tracking-wider uppercase text-muted-foreground">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-medium tracking-wider uppercase text-muted-foreground">
                      Plan
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-medium tracking-wider uppercase text-muted-foreground">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-medium tracking-wider uppercase text-muted-foreground hidden md:table-cell">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-medium tracking-wider uppercase text-muted-foreground">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {TRANSACTIONS.map((tx) => {
                    const { label, variant } = statusConfig[tx.status]
                    return (
                      <tr key={tx.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-3 min-w-0">
                            <Avatar className="h-7 w-7 shrink-0">
                              <AvatarFallback className="text-[10px] font-semibold">
                                {tx.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <p className="font-medium leading-none truncate">{tx.customer}</p>
                              <p className="text-xs text-muted-foreground mt-0.5 truncate">{tx.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <Badge variant={planConfig[tx.plan].variant} className="text-xs">
                            {tx.plan}
                          </Badge>
                        </td>
                        <td className="px-4 py-3.5 font-semibold tabular-nums">{tx.amount}</td>
                        <td className="px-4 py-3.5 text-muted-foreground hidden md:table-cell">
                          {tx.date}
                        </td>
                        <td className="px-4 py-3.5">
                          <Badge variant={variant} className="text-xs">{label}</Badge>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Activity feed */}
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

      </div>
    </div>
  )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type Plan = "Free" | "Pro" | "Enterprise"

// ─── Data ─────────────────────────────────────────────────────────────────────

const PLAN_BREAKDOWN: { name: Plan; count: number; pct: number; dot: string; bar: string }[] = [
  { name: "Free", count: 8240, pct: 66.8, dot: "bg-muted-foreground/50", bar: "bg-muted-foreground/40" },
  { name: "Pro", count: 3200, pct: 25.9, dot: "bg-primary", bar: "bg-primary" },
  { name: "Enterprise", count: 900, pct: 7.3, dot: "bg-amber-500", bar: "bg-amber-500" },
]

// ─── Component ────────────────────────────────────────────────────────────────

export const PlanBreakdown = () => (
  <Card>
    <CardHeader>
      <CardTitle>Plan Breakdown</CardTitle>
      <CardDescription>12,340 total users</CardDescription>
    </CardHeader>
    <CardContent className="space-y-5">
      {/* Stacked bar */}
      <div className="flex h-2 w-full overflow-hidden rounded-full gap-px">
        {PLAN_BREAKDOWN.map((p, i) => (
          <div
            key={p.name}
            className={cn(p.bar, i === 0 && "rounded-l-full", i === PLAN_BREAKDOWN.length - 1 && "rounded-r-full")}
            style={{ width: `${p.pct}%` }}
          />
        ))}
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
)

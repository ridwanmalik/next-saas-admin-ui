import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ActivityFeed } from "./_components/activity-feed"
import { PlanBreakdown } from "./_components/plan-breakdown"
import { RecentTransactions } from "./_components/recent-transactions"
import { RevenueChart } from "./_components/revenue-chart"
import { StatCards } from "./_components/stat-cards"

const DashboardPage = () => (
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
    <StatCards />

    {/* ── Revenue chart + Plan breakdown ────────────────────────────────── */}
    <div className="grid gap-4 lg:grid-cols-3">
      <RevenueChart />
      <PlanBreakdown />
    </div>

    {/* ── Transactions + Activity feed ──────────────────────────────────── */}
    <div className="grid gap-4 lg:grid-cols-3">
      <RecentTransactions />
      <ActivityFeed />
    </div>

  </div>
)

export default DashboardPage

import { DailyStats } from "./_components/daily-stats"
import { LatestCustomers } from "./_components/latest-customers"
import { MarketShare } from "./_components/market-share"
import { RevenueOrders } from "./_components/revenue-orders"
import { TotalRevenue } from "./_components/total-revenue"

const AnalyticsPage = () => (
  <div className="space-y-5">

    {/* ── Header ────────────────────────────────────────────────────────── */}
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
      <p className="text-sm text-muted-foreground mt-0.5">December 2025 · Department wise monthly sales report</p>
    </div>

    {/* ── 2-column layout ───────────────────────────────────────────────── */}
    <div className="grid gap-5 lg:grid-cols-[3fr_2fr]">

      {/* ── Left ──────────────────────────────────────────────────────── */}
      <div className="space-y-5">
        <MarketShare />
        <RevenueOrders />
        <LatestCustomers />
      </div>

      {/* ── Right ─────────────────────────────────────────────────────── */}
      <div className="space-y-5">
        <TotalRevenue />
        <DailyStats />
      </div>

    </div>

  </div>
)

export default AnalyticsPage

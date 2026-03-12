import { LeadSource } from "./_components/lead-source"
import { LeadSummary } from "./_components/lead-summary"
import { QuickStats } from "./_components/quick-stats"
import { SalesPerformance } from "./_components/sales-performance"

const CRMDashboardPage = () => (
  <div className="space-y-5">

    {/* ── Header ────────────────────────────────────────────────────────── */}
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">CRM Dashboard</h2>
        <p className="text-sm text-muted-foreground mt-0.5">December 2025 · 143 active deals in pipeline</p>
      </div>
    </div>

    {/* ── Lead Summary ──────────────────────────────────────────────────── */}
    <LeadSummary />

    {/* ── 4 colored stat cards ──────────────────────────────────────────── */}
    <QuickStats />

    {/* ── Lead Source + Upcoming + Sales Performance ────────────────────── */}
    <div className="grid gap-5 lg:grid-cols-[1fr_2fr]">
      <LeadSource />
      <SalesPerformance />
    </div>

  </div>
)

export default CRMDashboardPage

import { TrendingUp, Users } from "lucide-react"

// ─── Component ────────────────────────────────────────────────────────────────

export const RevenueOrders = () => (
  <div className="grid gap-4 sm:grid-cols-2">
    <div className="rounded-xl bg-violet-600 text-white p-5 flex items-center justify-between gap-4">
      <div>
        <p className="text-sm text-white/80">Revenue</p>
        <p className="text-3xl font-bold mt-1">$42,562</p>
        <p className="text-xs text-white/60 mt-1">$50,032 Last Month</p>
      </div>
      <TrendingUp className="h-14 w-14 opacity-20 shrink-0" />
    </div>
    <div className="rounded-xl bg-blue-500 text-white p-5 flex items-center justify-between gap-4">
      <div>
        <p className="text-sm text-white/80">Orders Received</p>
        <p className="text-3xl font-bold mt-1">486</p>
        <p className="text-xs text-white/60 mt-1">20% Increase</p>
      </div>
      <Users className="h-14 w-14 opacity-20 shrink-0" />
    </div>
  </div>
)

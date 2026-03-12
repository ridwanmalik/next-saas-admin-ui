import { Eye, MousePointerClick, Users, Zap } from "lucide-react"

// ─── Component ────────────────────────────────────────────────────────────────

export const DailyStats = () => (
  <>
    {/* Daily user */}
    <div className="rounded-xl bg-violet-600 text-white p-5 flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
        <Users className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold tabular-nums">1,658</p>
        <p className="text-sm text-white/80">Daily user</p>
      </div>
    </div>

    {/* Daily page view */}
    <div className="rounded-xl bg-blue-500 text-white p-5 flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
        <Eye className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold tabular-nums">1K</p>
        <p className="text-sm text-white/80">Daily page view</p>
      </div>
    </div>

    {/* Bounce Rate */}
    <div className="rounded-xl bg-rose-500 text-white p-5 flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
        <MousePointerClick className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold tabular-nums">38.4%</p>
        <p className="text-sm text-white/80">Bounce Rate</p>
      </div>
    </div>

    {/* Avg. Session */}
    <div className="rounded-xl bg-emerald-600 text-white p-5 flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
        <Zap className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold tabular-nums">3m 42s</p>
        <p className="text-sm text-white/80">Avg. Session</p>
      </div>
    </div>
  </>
)

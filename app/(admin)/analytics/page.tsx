"use client"

import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  Eye,
  MousePointerClick,
  RefreshCw,
  Share2,
  TrendingDown,
  TrendingUp,
  Users,
  Wifi,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// ─── Data ─────────────────────────────────────────────────────────────────────

const MARKET_SERIES = {
  facebook: [60, 140,  80, 200, 120, 260, 100, 180, 240, 160, 200, 280],
  twitter:  [30,  60,  40, 100,  80, 140,  60, 120, 100,  80, 140, 100],
  youtube:  [80, 100,  60, 160, 100, 200,  80, 160, 180, 120, 160, 220],
}

const CHANNELS = [
  { key: "facebook" as const, label: "Facebook", change: "+45.36%", positive: true,  color: "hsl(217 91% 60%)" },
  { key: "twitter"  as const, label: "Twitter",  change: "-50.69%", positive: false, color: "hsl(328 86% 60%)" },
  { key: "youtube"  as const, label: "YouTube",  change: "+16.85%", positive: true,  color: "hsl(271 91% 65%)" },
]

const CUSTOMERS = [
  { flag: "🇩🇪", country: "Germany",       name: "Angelina Jolly",  pct: 56.23 },
  { flag: "🇺🇸", country: "USA",            name: "John Deo",        pct: 25.23 },
  { flag: "🇦🇺", country: "Australia",      name: "Jenifer Vintage", pct: 12.45 },
  { flag: "🇬🇧", country: "United Kingdom", name: "Lori Moore",      pct: 8.65  },
  { flag: "🇧🇷", country: "Brazil",         name: "Allianz Dacron",  pct: 3.56  },
  { flag: "🇯🇵", country: "Japan",          name: "Kiyoshi Tanaka",  pct: 2.84  },
  { flag: "🇨🇦", country: "Canada",         name: "Sophie Tremblay", pct: 1.92  },
]

const MINI_STATS = [
  { icon: Share2,     value: "1,000", label: "SHARES",  color: "text-blue-500",    bg: "bg-blue-500/10"    },
  { icon: Wifi,       value: "600",   label: "NETWORK", color: "text-violet-500",  bg: "bg-violet-500/10"  },
  { icon: RefreshCw,  value: "3,550", label: "RETURNS", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { icon: CreditCard, value: "100%",  label: "ORDER",   color: "text-amber-500",   bg: "bg-amber-500/10"   },
]

const REVENUE_LIST = [
  { name: "Bitcoin",  change: "+$145.85", positive: true  },
  { name: "Ethereum", change: "-$6.368",  positive: false },
  { name: "Ripple",   change: "+$458.63", positive: true  },
  { name: "Neo",      change: "-$5.631",  positive: false },
  { name: "Litecoin", change: "+$92.40",  positive: true  },
  { name: "Cardano",  change: "-$3.210",  positive: false },
  { name: "Solana",   change: "+$218.75", positive: true  },
]

// ─── Multi-line Area Chart ────────────────────────────────────────────────────

const MarketChart = () => {
  const n = 12
  const W = 560, H = 160
  const pL = 8, pR = 8, pT = 12, pB = 8
  const cW = W - pL - pR
  const cH = H - pT - pB
  const maxVal = 300

  const xPos = (i: number) => pL + (i / (n - 1)) * cW
  const yPos = (v: number) => pT + cH - (v / maxVal) * cH

  const smoothPath = (pts: [number, number][]) => {
    let d = `M ${pts[0][0]},${pts[0][1]}`
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(i - 1, 0)]
      const p1 = pts[i]
      const p2 = pts[i + 1]
      const p3 = pts[Math.min(i + 2, pts.length - 1)]
      const cp1x = p1[0] + (p2[0] - p0[0]) / 6
      const cp1y = p1[1] + (p2[1] - p0[1]) / 6
      const cp2x = p2[0] - (p3[0] - p1[0]) / 6
      const cp2y = p2[1] - (p3[1] - p1[1]) / 6
      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}`
    }
    return d
  }

  const series = (Object.keys(MARKET_SERIES) as Array<keyof typeof MARKET_SERIES>).map((key, idx) => {
    const data = MARKET_SERIES[key]
    const pts: [number, number][] = data.map((v, i) => [xPos(i), yPos(v)])
    const linePath = smoothPath(pts)
    const bottom = pT + cH
    const areaPath = `M ${pts[0][0]},${bottom} L ${pts[0][0]},${pts[0][1]} ${linePath.replace(/^M [^C]*/, "")} L ${pts[n - 1][0]},${bottom} Z`
    return { key, linePath, areaPath, color: CHANNELS[idx].color }
  })

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden>
      <defs>
        {series.map((s, i) => (
          <linearGradient key={s.key} id={`area-${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={s.color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={s.color} stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>
      {series.map((s, i) => (
        <g key={s.key}>
          <path d={s.areaPath} fill={`url(#area-${i})`} />
          <path d={s.linePath} fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" stroke={s.color} />
        </g>
      ))}
    </svg>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  return (
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

          {/* Market Share */}
          <Card>
            <CardHeader className="gap-0">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <CardTitle>Market Share</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Department wise monthly sales report</p>
                </div>
                <div className="flex items-center gap-1.5 text-rose-500">
                  <TrendingDown className="h-4 w-4" />
                  <span className="text-xl font-bold tabular-nums">27,695.65</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-3 pb-3 space-y-4">
              <div className="flex flex-wrap gap-2">
                {CHANNELS.map((ch) => (
                  <div key={ch.key} className="flex items-center gap-2 rounded-lg border px-3 py-1.5">
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ background: ch.color }} />
                    <span className="text-xs text-muted-foreground">{ch.label}</span>
                    <span className={cn("text-xs font-semibold tabular-nums", ch.positive ? "text-emerald-500" : "text-rose-500")}>
                      {ch.change}
                    </span>
                  </div>
                ))}
              </div>
              <MarketChart />
            </CardContent>
          </Card>

          {/* Revenue + Orders Received */}
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

          {/* Latest Customers */}
          <Card className="overflow-hidden">
            <CardHeader className="gap-0">
              <CardTitle>Latest Customers</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      {["#", "Country", "Name", "Average"].map((col) => (
                        <th key={col} className="px-5 py-3 text-left text-[11px] font-medium tracking-wider uppercase text-muted-foreground">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {CUSTOMERS.map((c, i) => (
                      <tr key={c.name} className="hover:bg-muted/30 transition-colors">
                        <td className="px-5 py-3 text-muted-foreground text-xs">{i + 1}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-base leading-none">{c.flag}</span>
                            <span className="text-sm">{c.country}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 font-medium">{c.name}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                              <div className="h-full rounded-full bg-primary" style={{ width: `${(c.pct / 60) * 100}%` }} />
                            </div>
                            <span className="text-xs tabular-nums text-muted-foreground">{c.pct}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t p-3">
                <Button variant="ghost" className="w-full text-sm text-primary hover:text-primary" size="sm">
                  View All Latest Customers →
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* ── Right ─────────────────────────────────────────────────────── */}
        <div className="space-y-5">

          {/* 4 mini stat cards 2×2 */}
          <div className="grid grid-cols-2 gap-3">
            {MINI_STATS.map((s) => (
              <Card key={s.label}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", s.bg)}>
                    <s.icon className={cn("h-5 w-5", s.color)} />
                  </div>
                  <div>
                    <p className="text-base font-bold tabular-nums">{s.value}</p>
                    <p className="text-[10px] font-semibold tracking-wider text-muted-foreground">{s.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Total Revenue list */}
          <Card>
            <CardHeader className="gap-0">
              <CardTitle>Total Revenue</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="px-3 pb-3 divide-y divide-border">
              {REVENUE_LIST.map((item) => (
                <div key={item.name} className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full shrink-0",
                      item.positive ? "bg-emerald-500/10" : "bg-rose-500/10"
                    )}>
                      {item.positive
                        ? <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />
                        : <ArrowDownRight className="h-3.5 w-3.5 text-rose-500" />
                      }
                    </div>
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <span className={cn("text-sm font-semibold tabular-nums", item.positive ? "text-emerald-500" : "text-rose-500")}>
                    {item.change}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

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

        </div>
      </div>
    </div>
  )
}

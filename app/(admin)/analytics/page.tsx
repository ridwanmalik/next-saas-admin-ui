import { Download, Monitor, Smartphone, Tablet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// ─── Data ─────────────────────────────────────────────────────────────────────

// 30 daily sessions by channel (Nov 21 – Dec 20, 2025)
const ORGANIC = [3200, 3500, 3100, 3800, 4100, 3700, 3400, 4200, 4500, 4000, 3800, 4600, 4900, 4400, 4200, 5000, 5300, 4800, 4600, 5400, 5700, 5200, 5000, 5800, 6100, 5600, 5400, 6200, 6500, 6000]
const DIRECT  = [1800, 1900, 1700, 2000, 2100, 1900, 1800, 2200, 2300, 2100, 2000, 2400, 2500, 2300, 2200, 2600, 2700, 2500, 2400, 2800, 2900, 2700, 2600, 3000, 3100, 2900, 2800, 3200, 3300, 3100]
const SOCIAL  = [800,  900,  750,  1000, 1100, 950,  880,  1200, 1250, 1100, 1050, 1300, 1400, 1200, 1150, 1500, 1600, 1400, 1350, 1600, 1750, 1550, 1500, 1800, 1900, 1700, 1650, 1950, 2100, 1900]

const SERIES: { data: number[]; color: string; gradId: string; label: string; twColor: string }[] = [
  { data: ORGANIC, color: "var(--primary)", gradId: "grad-organic", label: "Organic", twColor: "bg-primary" },
  { data: DIRECT,  color: "#8b5cf6",        gradId: "grad-direct",  label: "Direct",  twColor: "bg-violet-500" },
  { data: SOCIAL,  color: "#f59e0b",        gradId: "grad-social",  label: "Social",  twColor: "bg-amber-500" },
]

const DATE_TICKS = [
  { i: 0,  label: "Nov 21" }, { i: 5,  label: "Nov 26" },
  { i: 10, label: "Dec 1"  }, { i: 15, label: "Dec 6"  },
  { i: 20, label: "Dec 11" }, { i: 25, label: "Dec 16" },
  { i: 29, label: "Dec 20" },
]

const TREND_CARDS = [
  {
    label: "Page Views",
    value: "1.24M",
    change: "+18.3%",
    positive: true,
    period: "vs prev. 30d",
    sparkline: [32000, 38000, 34000, 42000, 48000, 44000, 52000, 58000, 54000, 62000, 68000],
  },
  {
    label: "Unique Visitors",
    value: "284K",
    change: "+12.1%",
    positive: true,
    period: "vs prev. 30d",
    sparkline: [8200, 9400, 8800, 10200, 11500, 10800, 12400, 13800, 12900, 14600, 15800],
  },
  {
    label: "Avg. Session",
    value: "4m 12s",
    change: "+6.4%",
    positive: true,
    period: "vs prev. 30d",
    sparkline: [210, 225, 215, 235, 248, 238, 252, 261, 248, 258, 252],
  },
  {
    label: "Bounce Rate",
    value: "38.2%",
    change: "-4.1%",
    positive: true,  // lower = better
    period: "vs prev. 30d",
    sparkline: [44.2, 43.8, 44.1, 42.5, 41.8, 42.3, 40.9, 40.1, 39.8, 38.9, 38.2],
  },
]

const SOURCES = [
  { name: "Organic Search", pct: 48.2, sessions: "136,920", color: "bg-primary" },
  { name: "Direct",         pct: 24.6, sessions: "69,930",  color: "bg-violet-500" },
  { name: "Referral",       pct: 12.8, sessions: "36,380",  color: "bg-emerald-500" },
  { name: "Social",         pct: 9.1,  sessions: "25,870",  color: "bg-amber-500" },
  { name: "Email",          pct: 5.3,  sessions: "15,070",  color: "bg-red-500" },
]

const TOP_PAGES = [
  { path: "/",                      title: "Homepage",          views: "42,840", unique: "28,100", bounce: 32.1, avgTime: "3m 24s", change: "+8.4%",  up: true  },
  { path: "/pricing",               title: "Pricing",           views: "18,420", unique: "14,200", bounce: 41.5, avgTime: "2m 48s", change: "+14.2%", up: true  },
  { path: "/features",              title: "Features",          views: "16,100", unique: "12,800", bounce: 38.2, avgTime: "4m 12s", change: "+6.1%",  up: true  },
  { path: "/blog/saas-growth-guide", title: "SaaS Growth Guide", views: "12,300", unique: "10,200", bounce: 28.7, avgTime: "6m 35s", change: "+22.8%", up: true  },
  { path: "/docs",                  title: "Documentation",     views: "9,840",  unique: "8,100",  bounce: 22.4, avgTime: "8m 20s", change: "+4.3%",  up: true  },
  { path: "/signup",                title: "Sign Up",           views: "8,200",  unique: "7,600",  bounce: 18.1, avgTime: "1m 42s", change: "+18.6%", up: true  },
  { path: "/integrations",          title: "Integrations",      views: "6,750",  unique: "5,400",  bounce: 44.8, avgTime: "2m 15s", change: "-2.1%",  up: false },
  { path: "/changelog",             title: "Changelog",         views: "4,120",  unique: "3,800",  bounce: 35.6, avgTime: "3m 08s", change: "+7.9%",  up: true  },
]

const DEVICES = [
  { name: "Desktop", pct: 58.4, icon: Monitor },
  { name: "Mobile",  pct: 34.2, icon: Smartphone },
  { name: "Tablet",  pct: 7.4,  icon: Tablet },
]

const GEO = [
  { country: "United States",  flag: "🇺🇸", pct: 42.1, sessions: "119,700" },
  { country: "United Kingdom", flag: "🇬🇧", pct: 11.3, sessions: "32,100"  },
  { country: "Germany",        flag: "🇩🇪", pct: 8.7,  sessions: "24,730"  },
  { country: "Canada",         flag: "🇨🇦", pct: 7.2,  sessions: "20,470"  },
  { country: "France",         flag: "🇫🇷", pct: 5.8,  sessions: "16,480"  },
  { country: "Australia",      flag: "🇦🇺", pct: 4.9,  sessions: "13,930"  },
  { country: "Other",          flag: "🌍",  pct: 20.0, sessions: "56,840"  },
]

const DATE_RANGES = ["Today", "7D", "30D", "90D", "1Y"]
const ACTIVE_RANGE = "30D"

// ─── Helpers ──────────────────────────────────────────────────────────────────

const bounceColor = (pct: number) => {
  if (pct < 30) return "text-emerald-500"
  if (pct < 45) return "text-amber-500"
  return "text-red-500"
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const Sparkline = ({ data, positive }: { data: number[]; positive: boolean }) => {
  const W = 72, H = 28
  if (data.length < 2) return null
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * W},${H - 2 - ((v - min) / range) * (H - 4)}`)
    .join(" ")
  return (
    <svg width={W} height={H} className="overflow-visible shrink-0" aria-hidden>
      <polyline
        points={pts}
        fill="none"
        stroke={positive ? "#10b981" : "#ef4444"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const TrafficChart = () => {
  const n = ORGANIC.length
  const W = 560, H = 200
  const pL = 44, pR = 8, pT = 12, pB = 28
  const cW = W - pL - pR
  const cH = H - pT - pB
  const maxDisplay = 7200
  const xPos = (i: number) => pL + (i / (n - 1)) * cW
  const yPos = (v: number) => pT + cH - (v / maxDisplay) * cH
  const linePts = (data: number[]) => data.map((v, i) => `${xPos(i)},${yPos(v)}`).join(" ")
  const areaPts = (data: number[]) => `${xPos(0)},${pT + cH} ${linePts(data)} ${xPos(n - 1)},${pT + cH}`
  const gridVals = [2000, 4000, 6000]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden>
      <defs>
        {SERIES.map(s => (
          <linearGradient key={s.gradId} id={s.gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={s.color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={s.color} stopOpacity="0"    />
          </linearGradient>
        ))}
      </defs>

      {/* Horizontal gridlines + Y labels */}
      {gridVals.map(v => (
        <g key={v}>
          <line
            x1={pL} y1={yPos(v)} x2={W - pR} y2={yPos(v)}
            strokeWidth={0.5} strokeDasharray="3 3"
            style={{ stroke: "var(--border)" }}
          />
          <text x={pL - 5} y={yPos(v) + 3.5} textAnchor="end" fontSize={9} style={{ fill: "var(--muted-foreground)" }}>
            {v / 1000}k
          </text>
        </g>
      ))}

      {/* Area fills — rendered before lines so lines sit on top */}
      {SERIES.map(s => (
        <polygon key={`fill-${s.gradId}`} points={areaPts(s.data)} fill={`url(#${s.gradId})`} />
      ))}

      {/* Lines */}
      {SERIES.map(s => (
        <polyline
          key={`line-${s.gradId}`}
          points={linePts(s.data)}
          fill="none"
          stroke={s.color}
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}

      {/* End-point dots */}
      {SERIES.map(s => (
        <circle
          key={`dot-${s.gradId}`}
          cx={xPos(n - 1)}
          cy={yPos(s.data[n - 1])}
          r={3}
          fill={s.color}
        />
      ))}

      {/* X-axis date labels */}
      {DATE_TICKS.map(({ i, label }) => (
        <text key={i} x={xPos(i)} y={H - 7} textAnchor="middle" fontSize={8.5} style={{ fill: "var(--muted-foreground)" }}>
          {label}
        </text>
      ))}
    </svg>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">

      {/* ── Header + Filters ──────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Nov 21 – Dec 20, 2025 · 30 days
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Segmented date range control */}
          <div className="inline-flex items-center rounded-lg border bg-muted/40 p-1 gap-px">
            {DATE_RANGES.map(r => (
              <span
                key={r}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md select-none",
                  r === ACTIVE_RANGE
                    ? "bg-background text-foreground shadow-sm border"
                    : "text-muted-foreground cursor-pointer hover:text-foreground",
                )}
              >
                {r}
              </span>
            ))}
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        </div>
      </div>

      {/* ── Trend cards ───────────────────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {TREND_CARDS.map(card => (
          <Card key={card.label}>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-none">{card.label}</p>
              <p className="text-2xl font-bold tracking-tight mt-3">{card.value}</p>
              <div className="flex items-end justify-between mt-2 gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className={cn("text-xs font-semibold", card.positive ? "text-emerald-500" : "text-red-500")}>
                    {card.change}
                  </span>
                  <span className="text-xs text-muted-foreground">{card.period}</span>
                </div>
                <Sparkline data={card.sparkline} positive={card.positive} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Traffic chart + Sources ────────────────────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-3">

        <Card className="lg:col-span-2">
          <CardHeader className="pb-0">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <CardTitle>Traffic Overview</CardTitle>
                <CardDescription>Daily sessions by channel · last 30 days</CardDescription>
              </div>
              {/* Legend */}
              <div className="flex items-center gap-4 shrink-0">
                {SERIES.map(s => (
                  <div key={s.label} className="flex items-center gap-1.5">
                    <span className={cn("h-2 w-3 rounded-sm", s.twColor)} />
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <TrafficChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>284,100 total sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {SOURCES.map(s => (
              <div key={s.name} className="space-y-1.5">
                <div className="flex items-center justify-between gap-2 text-sm">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={cn("h-2 w-2 rounded-full shrink-0", s.color)} />
                    <span className="truncate">{s.name}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-muted-foreground tabular-nums">{s.sessions}</span>
                    <span className="font-semibold w-9 text-right tabular-nums">{s.pct}%</span>
                  </div>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className={cn("h-full rounded-full", s.color)} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>

      {/* ── Top Pages ─────────────────────────────────────────────────────── */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Top Pages</CardTitle>
          <CardDescription>Ranked by total views · last 30 days</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-t border-b bg-muted/40">
                  <th className="px-6 py-3 text-left text-[11px] font-medium tracking-wider uppercase text-muted-foreground">
                    Page
                  </th>
                  <th className="px-4 py-3 text-right text-[11px] font-medium tracking-wider uppercase text-muted-foreground">
                    Views
                  </th>
                  <th className="px-4 py-3 text-right text-[11px] font-medium tracking-wider uppercase text-muted-foreground hidden sm:table-cell">
                    Unique
                  </th>
                  <th className="px-4 py-3 text-right text-[11px] font-medium tracking-wider uppercase text-muted-foreground">
                    Bounce
                  </th>
                  <th className="px-4 py-3 text-right text-[11px] font-medium tracking-wider uppercase text-muted-foreground hidden md:table-cell">
                    Avg. Time
                  </th>
                  <th className="px-4 py-3 text-right text-[11px] font-medium tracking-wider uppercase text-muted-foreground pr-6">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {TOP_PAGES.map(page => (
                  <tr key={page.path} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-3.5">
                      <p className="font-medium leading-none">{page.title}</p>
                      <p className="text-xs text-muted-foreground font-mono mt-1">{page.path}</p>
                    </td>
                    <td className="px-4 py-3.5 text-right font-semibold tabular-nums">
                      {page.views}
                    </td>
                    <td className="px-4 py-3.5 text-right text-muted-foreground tabular-nums hidden sm:table-cell">
                      {page.unique}
                    </td>
                    <td className={cn("px-4 py-3.5 text-right font-medium tabular-nums", bounceColor(page.bounce))}>
                      {page.bounce}%
                    </td>
                    <td className="px-4 py-3.5 text-right text-muted-foreground hidden md:table-cell">
                      {page.avgTime}
                    </td>
                    <td className="px-4 py-3.5 text-right pr-6">
                      <span className={cn("text-xs font-semibold", page.up ? "text-emerald-500" : "text-red-500")}>
                        {page.change}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ── Devices + Geography ───────────────────────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-3">

        <Card>
          <CardHeader>
            <CardTitle>Devices</CardTitle>
            <CardDescription>Sessions by device type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {DEVICES.map(d => (
              <div key={d.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <d.icon className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{d.name}</span>
                  </div>
                  <span className="font-semibold tabular-nums">{d.pct}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${d.pct}%` }} />
                </div>
              </div>
            ))}

            {/* Donut-style total summary */}
            <div className="mt-6 pt-4 border-t grid grid-cols-3 gap-2 text-center">
              {DEVICES.map(d => (
                <div key={d.name}>
                  <p className="text-base font-bold tabular-nums">{d.pct}%</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{d.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Countries</CardTitle>
            <CardDescription>Session distribution by geography</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3.5">
              {GEO.map(g => (
                <div key={g.country} className="flex items-center gap-3">
                  <span className="text-lg leading-none shrink-0">{g.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5 gap-2">
                      <span className="text-sm truncate">{g.country}</span>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs text-muted-foreground tabular-nums hidden sm:inline">
                          {g.sessions}
                        </span>
                        <span className="text-sm font-semibold w-10 text-right tabular-nums">
                          {g.pct}%
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary/60"
                        style={{ width: `${(g.pct / 42.1) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

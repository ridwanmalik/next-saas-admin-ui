import { TrendingDown } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

// ─── Component ────────────────────────────────────────────────────────────────

export const MarketShare = () => (
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
)

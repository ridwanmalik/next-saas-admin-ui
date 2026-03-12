import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// ─── Data ─────────────────────────────────────────────────────────────────────

// 52 weeks of weekly revenue (Jan 1 – Dec 28, 2025) — natural rise, rounded Jul–Aug peak, soft dip, recovery
const WEEKLY_REVENUE = [
  7400, 7580, 7830, 8060, 8340, 8620, 8880, 9120,  // Jan – Feb
  9380, 9820, 10350, 10680, 10540, 10400, 10750, 11230, // Mar – Apr
  11500, 11720, 12010, 12240, 12530, 12780, 13050, 13310, // May – Jun
  13580, 13860, 14120, 14380, 14620, 14820, 14900, 14820, // Jul → rounded peak in Aug
  14580, 14220, 13820, 13420, 13180, 13320, 13580, 13870, // Sep dip → Oct recovery
  14180, 14530, 14860, 15180, 15420, 15680, 15890, 16080, // Nov – Dec
  16250, 16420, 16560, 16700,                              // late Dec
]

const MONTH_TICKS = [
  { label: "Jan", week: 0 },  { label: "Feb", week: 4 },  { label: "Mar", week: 9 },
  { label: "Apr", week: 13 }, { label: "May", week: 17 }, { label: "Jun", week: 22 },
  { label: "Jul", week: 26 }, { label: "Aug", week: 30 }, { label: "Sep", week: 35 },
  { label: "Oct", week: 39 }, { label: "Nov", week: 43 }, { label: "Dec", week: 48 },
]

// ─── Chart ────────────────────────────────────────────────────────────────────

const RevenueChartSvg = () => {
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
  // Build smooth bezier path (catmull-rom → cubic bezier)
  const pts: [number, number][] = data.map((v, i) => [xPos(i), yPos(v)])
  const smoothPath = (points: [number, number][]) => {
    if (points.length < 2) return ""
    let d = `M ${points[0][0]},${points[0][1]}`
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(i - 1, 0)]
      const p1 = points[i]
      const p2 = points[i + 1]
      const p3 = points[Math.min(i + 2, points.length - 1)]
      const cp1x = p1[0] + (p2[0] - p0[0]) / 12
      const cp1y = p1[1] + (p2[1] - p0[1]) / 12
      const cp2x = p2[0] - (p3[0] - p1[0]) / 12
      const cp2y = p2[1] - (p3[1] - p1[1]) / 12
      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}`
    }
    return d
  }
  const linePath = smoothPath(pts)
  const bottom = pT + cH
  const areaPath = `M ${pts[0][0]},${bottom} L ${pts[0][0]},${pts[0][1]} ${linePath.replace(/^M [^C]*/, "")} L ${pts[n - 1][0]},${bottom} Z`
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
      <path d={areaPath} fill="url(#rev-fill)" />

      {/* Line */}
      <path
        d={linePath}
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

// ─── Component ────────────────────────────────────────────────────────────────

export const RevenueChart = () => (
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
      <RevenueChartSvg />
    </CardContent>
  </Card>
)

import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// ─── Data ─────────────────────────────────────────────────────────────────────

// Stacked bar chart data: Mon–Sun, 3 series: Target, Achieved, Pipeline
const SALES_PERF_DATA = [
  { day: "Mon", target: 80, achieved: 120, pipeline: 60 },
  { day: "Tue", target: 140, achieved: 100, pipeline: 100 },
  { day: "Wed", target: 100, achieved: 140, pipeline: 80 },
  { day: "Thu", target: 120, achieved: 110, pipeline: 90 },
  { day: "Fri", target: 200, achieved: 180, pipeline: 120 },
  { day: "Sat", target: 160, achieved: 130, pipeline: 100 },
  { day: "Sun", target: 100, achieved: 90, pipeline: 70 },
]

// ─── Stacked Bar Chart ────────────────────────────────────────────────────────

const StackedBarChart = () => {
  const W = 480, H = 180
  const pL = 36, pR = 12, pT = 12, pB = 28
  const cW = W - pL - pR
  const cH = H - pT - pB
  const n = SALES_PERF_DATA.length
  const maxVal = 400
  const slotW = cW / n
  const barW = slotW * 0.5
  const gridLines = [100, 200, 300, 400]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden>
      {gridLines.map((v) => {
        const y = pT + cH - (v / maxVal) * cH
        return (
          <g key={v}>
            <line x1={pL} y1={y} x2={W - pR} y2={y} strokeWidth={0.5} strokeDasharray="3 3" style={{ stroke: "var(--border)" }} />
            <text x={pL - 5} y={y + 3.5} textAnchor="end" fontSize={9} style={{ fill: "var(--muted-foreground)" }}>{v}</text>
          </g>
        )
      })}

      {SALES_PERF_DATA.map((d, i) => {
        const x = pL + i * slotW + (slotW - barW) / 2
        const targetH = (d.target / maxVal) * cH
        const achievedH = (d.achieved / maxVal) * cH
        const pipelineH = (d.pipeline / maxVal) * cH
        const baseY = pT + cH
        return (
          <g key={d.day}>
            {/* Pipeline (bottom, lightest) */}
            <rect x={x} y={baseY - pipelineH} width={barW} height={pipelineH} rx={2}
              style={{ fill: "var(--primary)" }} fillOpacity={0.15} />
            {/* Achieved (middle) */}
            <rect x={x} y={baseY - pipelineH - achievedH} width={barW} height={achievedH} rx={2}
              style={{ fill: "var(--primary)" }} fillOpacity={0.7} />
            {/* Target (top, darkest) */}
            <rect x={x} y={baseY - pipelineH - achievedH - targetH} width={barW} height={targetH} rx={2}
              style={{ fill: "var(--primary)" }} fillOpacity={0.35} />
            <text x={x + barW / 2} y={H - 6} textAnchor="middle" fontSize={9} style={{ fill: "var(--muted-foreground)" }}>
              {d.day}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export const SalesPerformance = () => (
  <Card>
    <CardHeader className="gap-0">
      <div className="flex items-center justify-between">
        <CardTitle>Sales Performance</CardTitle>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
    <CardContent className="px-3 pb-3 space-y-4">
      {/* Mini metric boxes */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Conversion Rate", value: "200" },
          { label: "Average Deal", value: "120" },
          { label: "Sales Target", value: "234" },
        ].map((m) => (
          <div key={m.label} className="rounded-lg bg-muted/50 p-3 text-center">
            <p className="text-xl font-bold tabular-nums">{m.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{m.label}</p>
          </div>
        ))}
      </div>

      <Separator />

      {/* Stacked bar chart */}
      <StackedBarChart />

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="h-2 w-3 rounded-sm inline-block bg-primary/35" />Target</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-3 rounded-sm inline-block bg-primary/70" />Achieved</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-3 rounded-sm inline-block bg-primary/15" />Pipeline</span>
      </div>
    </CardContent>
  </Card>
)

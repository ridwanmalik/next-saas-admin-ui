"use client"

import { useState } from "react"
import {
  BarChart3,
  CalendarCheck,
  MoreHorizontal,
  PhoneCall,
  TrendingDown,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
  Video,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type LeadTab = "customer" | "complete" | "loss" | "new"

// ─── Data ─────────────────────────────────────────────────────────────────────

const LEAD_TABS: { key: LeadTab; label: string; icon: React.ElementType }[] = [
  { key: "customer", label: "Customer", icon: Users },
  { key: "complete", label: "Complete", icon: UserCheck },
  { key: "loss", label: "Loss Lead", icon: TrendingDown },
  { key: "new", label: "New Lead", icon: UserPlus },
]

// Monthly bars + line per tab (Jan–Oct, 10 months)
const LEAD_DATA: Record<LeadTab, { bars: number[]; line: number[]; total: string }> = {
  customer: {
    bars: [80, 200, 130, 140, 260, 210, 60, 240, 90, 80],
    line: [30, 210, 80, 110, 60, 255, 50, 80, 55, 50],
    total: "$2,324.00",
  },
  complete: {
    bars: [60, 140, 180, 90, 200, 160, 120, 180, 70, 110],
    line: [20, 150, 100, 70, 90, 170, 80, 60, 40, 80],
    total: "$1,840.00",
  },
  loss: {
    bars: [40, 80, 60, 100, 120, 70, 90, 50, 110, 60],
    line: [15, 70, 50, 90, 40, 80, 60, 40, 90, 30],
    total: "$980.00",
  },
  new: {
    bars: [100, 160, 220, 180, 140, 240, 110, 200, 130, 150],
    line: [60, 140, 180, 110, 100, 220, 70, 160, 90, 100],
    total: "$3,120.00",
  },
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"]

const STAT_CARDS = [
  { value: "$203k", label: "Total Income", icon: BarChart3, bg: "bg-blue-600", iconBg: "bg-blue-500" },
  { value: "$120k", label: "Meeting Attends", icon: Video, bg: "bg-rose-500", iconBg: "bg-rose-400" },
  { value: "$234k", label: "Sales Improve", icon: TrendingUp, bg: "bg-amber-500", iconBg: "bg-amber-400" },
  { value: "$248k", label: "New Users", icon: UserPlus, bg: "bg-violet-600", iconBg: "bg-violet-500" },
]

const LEAD_SOURCES = [
  { label: "Social Media", value: 9, color: "#3b82f6" },
  { label: "Website", value: 35, color: "#7c3aed" },
  { label: "Phone Call", value: 28, color: "#a78bfa" },
  { label: "Mail", value: 28, color: "#93c5fd" },
]

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

// ─── Combo Chart (bars + line) ────────────────────────────────────────────────

const ComboChart = ({ tab }: { tab: LeadTab }) => {
  const { bars, line } = LEAD_DATA[tab]
  const n = bars.length
  const W = 600, H = 200
  const pL = 36, pR = 12, pT = 16, pB = 32
  const cW = W - pL - pR
  const cH = H - pT - pB
  const maxVal = 300
  const slotW = cW / n
  const barW = slotW * 0.45
  const gridLines = [50, 100, 150, 200, 250, 300]

  const xPos = (i: number) => pL + i * slotW + slotW / 2
  const yPos = (v: number) => pT + cH - (v / maxVal) * cH

  // Smooth line path
  const pts: [number, number][] = line.map((v, i) => [xPos(i), yPos(v)])
  const smoothPath = (points: [number, number][]) => {
    if (points.length < 2) return ""
    let d = `M ${points[0][0]},${points[0][1]}`
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(i - 1, 0)]
      const p1 = points[i]
      const p2 = points[i + 1]
      const p3 = points[Math.min(i + 2, points.length - 1)]
      const cp1x = p1[0] + (p2[0] - p0[0]) / 6
      const cp1y = p1[1] + (p2[1] - p0[1]) / 6
      const cp2x = p2[0] - (p3[0] - p1[0]) / 6
      const cp2y = p2[1] - (p3[1] - p1[1]) / 6
      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}`
    }
    return d
  }
  const linePath = smoothPath(pts)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden>
      {/* Grid */}
      {gridLines.map((v) => {
        const y = yPos(v)
        return (
          <g key={v}>
            <line x1={pL} y1={y} x2={W - pR} y2={y} strokeWidth={0.5} strokeDasharray="3 3" style={{ stroke: "var(--border)" }} />
            <text x={pL - 5} y={y + 3.5} textAnchor="end" fontSize={9} style={{ fill: "var(--muted-foreground)" }}>{v}</text>
          </g>
        )
      })}

      {/* Bars */}
      {bars.map((v, i) => {
        const barH = (v / maxVal) * cH
        const x = pL + i * slotW + (slotW - barW) / 2
        const y = pT + cH - barH
        return (
          <rect key={i} x={x} y={y} width={barW} height={barH} rx={3}
            style={{ fill: "var(--primary)" }} fillOpacity={0.15} />
        )
      })}

      {/* Line */}
      <path d={linePath} fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
        style={{ stroke: "var(--primary)" }} />

      {/* Dots on line */}
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3} style={{ fill: "var(--primary)" }} />
      ))}

      {/* X labels */}
      {MONTHS.map((m, i) => (
        <text key={m} x={xPos(i)} y={H - 8} textAnchor="middle" fontSize={9} style={{ fill: "var(--muted-foreground)" }}>
          {m}
        </text>
      ))}
    </svg>
  )
}

// ─── Donut Chart (Lead Source) ────────────────────────────────────────────────

const DonutChart = () => {
  const cx = 90, cy = 90, r = 70, innerR = 44
  const total = LEAD_SOURCES.reduce((s, d) => s + d.value, 0)
  let startAngle = -Math.PI / 2

  const slices = LEAD_SOURCES.map((d) => {
    const angle = (d.value / total) * 2 * Math.PI
    const endAngle = startAngle + angle
    const x1 = cx + r * Math.cos(startAngle)
    const y1 = cy + r * Math.sin(startAngle)
    const x2 = cx + r * Math.cos(endAngle)
    const y2 = cy + r * Math.sin(endAngle)
    const ix1 = cx + innerR * Math.cos(endAngle)
    const iy1 = cy + innerR * Math.sin(endAngle)
    const ix2 = cx + innerR * Math.cos(startAngle)
    const iy2 = cy + innerR * Math.sin(startAngle)
    const largeArc = angle > Math.PI ? 1 : 0
    const path = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix2} ${iy2} Z`
    startAngle = endAngle
    return { ...d, path }
  })

  return (
    <svg viewBox="0 0 180 180" className="w-full max-w-[180px] mx-auto" aria-hidden>
      {slices.map((s) => (
        <path key={s.label} d={s.path} fill={s.color} />
      ))}
    </svg>
  )
}

// ─── Stacked Bar Chart (Sales Performance) ───────────────────────────────────

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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CRMDashboardPage() {
  const [activeTab, setActiveTab] = useState<LeadTab>("customer")

  return (
    <div className="space-y-5">

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">CRM Dashboard</h2>
          <p className="text-sm text-muted-foreground mt-0.5">December 2025 · 143 active deals in pipeline</p>
        </div>
      </div>

      {/* ── Lead Summary ──────────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="gap-0">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <CardTitle>Lead Summary</CardTitle>
            <div className="flex items-center gap-1 flex-wrap">
              {LEAD_TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                    activeTab === tab.key
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <tab.icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-6 pb-6 space-y-3">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Total Growth</p>
              <p className="text-2xl font-bold tabular-nums">{LEAD_DATA[activeTab].total}</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm inline-block bg-primary/20" />Leads</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full inline-block bg-primary" />Growth</span>
            </div>
          </div>
          <ComboChart tab={activeTab} />
        </CardContent>
      </Card>

      {/* ── 4 colored stat cards ──────────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STAT_CARDS.map((card) => (
          <div key={card.label} className={cn("rounded-xl p-5 flex items-center gap-4 text-white", card.bg)}>
            <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl", card.iconBg)}>
              <card.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold">{card.value}</p>
              <p className="text-sm text-white/80">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Lead Source + Upcoming + Sales Performance ────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-[1fr_2fr]">

        {/* Left: Lead Source + Upcoming Task */}
        <div className="space-y-5">

          <Card>
            <CardHeader className="gap-0">
              <div className="flex items-center justify-between">
                <CardTitle>Lead Source</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-3 pb-3 space-y-4">
              <DonutChart />
              <div className="space-y-2">
                {LEAD_SOURCES.map((src) => (
                  <div key={src.label} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: src.color }} />
                      <span className="text-muted-foreground">{src.label}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs tabular-nums">
                      {src.value < 10 ? src.value : "100+"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="px-4 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <CalendarCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Upcoming Task &amp; Follow-ups</p>
                    <p className="text-2xl font-bold tabular-nums">200</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs cursor-pointer hover:bg-muted">
                  Follow-up
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="px-4 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
                    <PhoneCall className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Scheduled Calls</p>
                    <p className="text-2xl font-bold tabular-nums">48</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs cursor-pointer hover:bg-muted">
                  View
                </Badge>
              </div>
            </CardContent>
          </Card>


        </div>

        {/* Right: Sales Performance */}
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

      </div>
    </div>
  )
}

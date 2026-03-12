"use client"

import { useState } from "react"
import {
  TrendingDown,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

// ─── Component ────────────────────────────────────────────────────────────────

export const LeadSummary = () => {
  const [activeTab, setActiveTab] = useState<LeadTab>("customer")

  return (
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
  )
}

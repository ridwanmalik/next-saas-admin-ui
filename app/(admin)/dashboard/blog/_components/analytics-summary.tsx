"use client"

import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type ViewPeriod = "7d" | "30d" | "all"

// ─── Data ─────────────────────────────────────────────────────────────────────

const VIEW_TABS = [
  { key: "7d" as ViewPeriod, label: "Views (7 Days)", value: "50" },
  { key: "30d" as ViewPeriod, label: "Views (30 Days)", value: "1,230" },
  { key: "all" as ViewPeriod, label: "Views (All Time)", value: "20,987" },
]

// Daily views for each period (30 data points)
const DAILY_VIEWS: Record<ViewPeriod, number[]> = {
  "7d": [3, 5, 2, 8, 6, 4, 9, 7, 4, 6, 8, 3, 5, 2, 9, 11, 4, 6, 3, 7, 5, 4, 8, 6, 3, 5, 7, 4, 6, 8],
  "30d": [4, 7, 5, 12, 9, 6, 14, 11, 8, 10, 13, 5, 8, 6, 15, 18, 7, 10, 5, 11, 8, 7, 13, 9, 5, 8, 11, 7, 9, 12],
  all: [
    120, 180, 95, 310, 240, 160, 420, 290, 200, 280, 350, 140, 210, 155, 390, 480, 175, 265, 130, 290, 220, 185, 340,
    240, 130, 205, 280, 175, 240, 310,
  ],
}

// ─── Analytics Bar Chart ──────────────────────────────────────────────────────

const AnalyticsChart = ({ period }: { period: ViewPeriod }) => {
  const data = DAILY_VIEWS[period]
  const n = data.length
  const max = Math.max(...data)
  const W = 600,
    H = 160
  const pL = 28,
    pR = 8,
    pT = 12,
    pB = 28
  const cW = W - pL - pR
  const cH = H - pT - pB
  const slotW = cW / n
  const barW = slotW * 0.55
  const gridLines = [Math.round(max * 0.25), Math.round(max * 0.5), Math.round(max * 0.75), max]
  // Show every 5th label
  const xLabels = data.map((_, i) => (i % 5 === 0 ? String(i + 1) : ""))

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden>
      {/* Grid lines */}
      {gridLines.map(v => {
        const y = pT + cH - (v / max) * cH
        return (
          <g key={v}>
            <line
              x1={pL}
              y1={y}
              x2={W - pR}
              y2={y}
              strokeWidth={0.5}
              strokeDasharray="3 3"
              style={{ stroke: "var(--border)" }}
            />
            <text x={pL - 4} y={y + 3} textAnchor="end" fontSize={8} style={{ fill: "var(--muted-foreground)" }}>
              {v}
            </text>
          </g>
        )
      })}

      {/* Bars */}
      {data.map((v, i) => {
        const barH = (v / max) * cH
        const x = pL + i * slotW + (slotW - barW) / 2
        const y = pT + cH - barH
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barW}
            height={barH}
            rx={2}
            style={{ fill: "var(--primary)" }}
            fillOpacity={0.8}
          />
        )
      })}

      {/* X axis labels */}
      {xLabels.map((label, i) =>
        label ? (
          <text
            key={i}
            x={pL + i * slotW + slotW / 2}
            y={H - 6}
            textAnchor="middle"
            fontSize={8}
            style={{ fill: "var(--muted-foreground)" }}>
            {label}
          </text>
        ) : null
      )}
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export const AnalyticsSummary = () => {
  const [activePeriod, setActivePeriod] = useState<ViewPeriod>("30d")

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle>Analytics Summary</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        {/* Period tabs */}
        <div className="grid grid-cols-3 gap-3">
          {VIEW_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActivePeriod(tab.key)}
              className={cn(
                "rounded-xl border p-4 text-left transition-all",
                activePeriod === tab.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-muted/40 hover:bg-muted"
              )}>
              <p
                className={cn(
                  "text-2xl font-bold tabular-nums",
                  activePeriod === tab.key ? "text-primary-foreground" : "text-foreground"
                )}>
                {tab.value}
              </p>
              <p
                className={cn(
                  "text-xs mt-0.5",
                  activePeriod === tab.key ? "text-primary-foreground/80" : "text-muted-foreground"
                )}>
                {tab.label}
              </p>
            </button>
          ))}
        </div>

        {/* Bar chart */}
        <div>
          <AnalyticsChart period={activePeriod} />
          <div className="flex items-center gap-4 mt-1 pl-7">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-primary inline-block" />
              Blog views
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

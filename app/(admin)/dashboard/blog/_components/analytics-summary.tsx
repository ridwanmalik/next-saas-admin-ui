"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/chart"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type ViewPeriod = "7d" | "30d" | "all"

// ─── Data ─────────────────────────────────────────────────────────────────────

const VIEW_TABS = [
  { key: "7d"  as ViewPeriod, label: "Views (7 Days)",   value: "50"     },
  { key: "30d" as ViewPeriod, label: "Views (30 Days)",  value: "1,230"  },
  { key: "all" as ViewPeriod, label: "Views (All Time)", value: "20,987" },
]

const DAILY_VIEWS: Record<ViewPeriod, number[]> = {
  "7d":  [3, 5, 2, 8, 6, 4, 9, 7, 4, 6, 8, 3, 5, 2, 9, 11, 4, 6, 3, 7, 5, 4, 8, 6, 3, 5, 7, 4, 6, 8],
  "30d": [4, 7, 5, 12, 9, 6, 14, 11, 8, 10, 13, 5, 8, 6, 15, 18, 7, 10, 5, 11, 8, 7, 13, 9, 5, 8, 11, 7, 9, 12],
  all:   [120, 180, 95, 310, 240, 160, 420, 290, 200, 280, 350, 140, 210, 155, 390, 480, 175, 265, 130, 290, 220, 185, 340, 240, 130, 205, 280, 175, 240, 310],
}

const chartConfig = {
  views: { label: "Blog views", color: "var(--primary)" },
} satisfies ChartConfig

// ─── Component ────────────────────────────────────────────────────────────────

export const AnalyticsSummary = () => {
  const [activePeriod, setActivePeriod] = useState<ViewPeriod>("30d")

  const chartData = DAILY_VIEWS[activePeriod].map((views, i) => ({ day: i + 1, views }))

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle>Analytics Summary</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        {/* Period tabs */}
        <div className="grid grid-cols-3 gap-3">
          {VIEW_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActivePeriod(tab.key)}
              className={cn(
                "rounded-xl border p-4 text-left transition-all",
                activePeriod === tab.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-muted/40 hover:bg-muted"
              )}
            >
              <p className={cn("text-2xl font-bold tabular-nums", activePeriod === tab.key ? "text-primary-foreground" : "text-foreground")}>
                {tab.value}
              </p>
              <p className={cn("text-xs mt-0.5", activePeriod === tab.key ? "text-primary-foreground/80" : "text-muted-foreground")}>
                {tab.label}
              </p>
            </button>
          ))}
        </div>

        {/* Bar chart */}
        <ChartContainer config={chartConfig} className="h-40 w-full">
          <BarChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" strokeWidth={0.5} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: "var(--muted-foreground)" }}
              interval={4}
            />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 8, fill: "var(--muted-foreground)" }} width={28} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="views" fill="var(--primary)" fillOpacity={0.8} radius={2} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

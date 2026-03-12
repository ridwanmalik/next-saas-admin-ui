"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/chart"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// ─── Data ─────────────────────────────────────────────────────────────────────

const SALES_PERF_DATA = [
  { day: "Mon", target: 80,  achieved: 120, pipeline: 60  },
  { day: "Tue", target: 140, achieved: 100, pipeline: 100 },
  { day: "Wed", target: 100, achieved: 140, pipeline: 80  },
  { day: "Thu", target: 120, achieved: 110, pipeline: 90  },
  { day: "Fri", target: 200, achieved: 180, pipeline: 120 },
  { day: "Sat", target: 160, achieved: 130, pipeline: 100 },
  { day: "Sun", target: 100, achieved: 90,  pipeline: 70  },
]

const METRICS = [
  { label: "Conversion Rate", value: "68%",   accent: "text-emerald-500" },
  { label: "Average Deal",    value: "$1,240", accent: "text-primary"     },
  { label: "Sales Target",    value: "87%",    accent: "text-amber-500"   },
]

const LEGEND = [
  { key: "achieved", label: "Achieved" },
  { key: "target",   label: "Target"   },
  { key: "pipeline", label: "Pipeline" },
]

const chartConfig = {
  achieved: { label: "Achieved", color: "var(--primary)"       },
  target:   { label: "Target",   color: "hsl(217 91% 60%)"     },
  pipeline: { label: "Pipeline", color: "hsl(142 71% 45%)"     },
} satisfies ChartConfig

// ─── Component ────────────────────────────────────────────────────────────────

export const SalesPerformance = () => (
  <Card>
    <CardHeader className="gap-0">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>Sales Performance</CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">Weekly target vs. achieved</p>
        </div>
      </div>
    </CardHeader>
    <CardContent className="px-4 pb-4 space-y-4">
      {/* Metric tiles */}
      <div className="grid grid-cols-3 gap-3">
        {METRICS.map((m) => (
          <div key={m.label} className="rounded-xl border bg-muted/30 px-3 py-3 flex flex-col gap-1">
            <p className={`text-xl font-bold tabular-nums ${m.accent}`}>{m.value}</p>
            <p className="text-xs text-muted-foreground leading-tight">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Grouped bar chart */}
      <ChartContainer config={chartConfig} className="h-55 w-full">
        <BarChart
          data={SALES_PERF_DATA}
          margin={{ top: 4, right: 4, bottom: 0, left: -8 }}
          barCategoryGap="30%"
          barGap={3}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" strokeWidth={0.5} />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
            width={28}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="achieved" fill="var(--color-achieved)" radius={3} />
          <Bar dataKey="target"   fill="var(--color-target)"   radius={3} fillOpacity={0.8} />
          <Bar dataKey="pipeline" fill="var(--color-pipeline)" radius={3} fillOpacity={0.75} />
        </BarChart>
      </ChartContainer>

      {/* Legend */}
      <div className="flex items-center gap-5 text-xs text-muted-foreground">
        {LEGEND.map((item) => (
          <span key={item.key} className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-sm inline-block shrink-0"
              style={{ background: `var(--color-${item.key})` }}
            />
            {item.label}
          </span>
        ))}
      </div>
    </CardContent>
  </Card>
)

"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/chart"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// ─── Data ─────────────────────────────────────────────────────────────────────

const RAW = [
  7400, 7580, 7830, 8060, 8340, 8620, 8880, 9120,
  9380, 9820, 10350, 10680, 10540, 10400, 10750, 11230,
  11500, 11720, 12010, 12240, 12530, 12780, 13050, 13310,
  13580, 13860, 14120, 14380, 14620, 14820, 14900, 14820,
  14580, 14220, 13820, 13420, 13180, 13320, 13580, 13870,
  14180, 14530, 14860, 15180, 15420, 15680, 15890, 16080,
  16250, 16420, 16560, 16700,
]

const MONTH_AT_WEEK: Record<number, string> = {
  0: "Jan", 4: "Feb", 9: "Mar", 13: "Apr", 17: "May", 22: "Jun",
  26: "Jul", 30: "Aug", 35: "Sep", 39: "Oct", 43: "Nov", 48: "Dec",
}

const chartData = RAW.map((revenue, week) => ({ week, revenue }))

const chartConfig = {
  revenue: { label: "Revenue", color: "var(--primary)" },
} satisfies ChartConfig

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
      <ChartContainer config={chartConfig} className="h-42 w-full">
        <AreaChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="rev-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.18} />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" strokeWidth={0.5} />
          <XAxis
            dataKey="week"
            tickLine={false}
            axisLine={false}
            ticks={Object.keys(MONTH_AT_WEEK).map(Number)}
            tickFormatter={(v) => MONTH_AT_WEEK[v] ?? ""}
            tick={{ fontSize: 9, fill: "var(--muted-foreground)" }}
            interval={0}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `$${v / 1000}k`}
            tick={{ fontSize: 9, fill: "var(--muted-foreground)" }}
            domain={[6000, 17000]}
            width={36}
          />
          <ChartTooltip
            content={<ChartTooltipContent formatter={(v) => [`$${Number(v).toLocaleString()}`, "Revenue"]} />}
          />
          <Area
            dataKey="revenue"
            type="natural"
            stroke="var(--primary)"
            strokeWidth={1.75}
            fill="url(#rev-fill)"
            dot={false}
          />
        </AreaChart>
      </ChartContainer>
    </CardContent>
  </Card>
)

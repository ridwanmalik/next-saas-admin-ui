"use client"

import { TrendingDown } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/chart"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

// ─── Data ─────────────────────────────────────────────────────────────────────

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const CHANNELS = [
  { key: "facebook", label: "Facebook", change: "+45.36%", positive: true,  color: "hsl(217 91% 60%)" },
  { key: "twitter",  label: "Twitter",  change: "-50.69%", positive: false, color: "hsl(328 86% 60%)" },
  { key: "youtube",  label: "YouTube",  change: "+16.85%", positive: true,  color: "hsl(271 91% 65%)" },
]

const RAW = {
  facebook: [60, 140, 80, 200, 120, 260, 100, 180, 240, 160, 200, 280],
  twitter:  [30,  60, 40, 100,  80, 140,  60, 120, 100,  80, 140, 100],
  youtube:  [80, 100, 60, 160, 100, 200,  80, 160, 180, 120, 160, 220],
}

const chartData = MONTHS.map((month, i) => ({
  month,
  facebook: RAW.facebook[i],
  twitter:  RAW.twitter[i],
  youtube:  RAW.youtube[i],
}))

const chartConfig = {
  facebook: { label: "Facebook", color: "hsl(217 91% 60%)" },
  twitter:  { label: "Twitter",  color: "hsl(328 86% 60%)" },
  youtube:  { label: "YouTube",  color: "hsl(271 91% 65%)" },
} satisfies ChartConfig

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

      <ChartContainer config={chartConfig} className="h-40 w-full">
        <AreaChart data={chartData} margin={{ top: 8, right: 4, bottom: 0, left: -20 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" strokeWidth={0.5} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 9, fill: "var(--muted-foreground)" }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          {CHANNELS.map((ch) => (
            <Area
              key={ch.key}
              dataKey={ch.key}
              type="natural"
              stroke={ch.color}
              strokeWidth={2}
              fill={ch.color}
              fillOpacity={0.2}
            />
          ))}
        </AreaChart>
      </ChartContainer>
    </CardContent>
  </Card>
)

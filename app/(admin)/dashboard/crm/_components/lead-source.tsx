"use client"

import { CalendarCheck } from "lucide-react"
import { Cell, Pie, PieChart } from "recharts"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/chart"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// ─── Data ─────────────────────────────────────────────────────────────────────

const LEAD_SOURCES = [
  { label: "Social Media", value: 9, color: "#3b82f6" },
  { label: "Website", value: 35, color: "#7c3aed" },
  { label: "Phone Call", value: 28, color: "#a78bfa" },
  { label: "Mail", value: 28, color: "#93c5fd" },
]

const chartConfig = LEAD_SOURCES.reduce<ChartConfig>((acc, src) => {
  acc[src.label] = { label: src.label, color: src.color }
  return acc
}, {})

// ─── Component ────────────────────────────────────────────────────────────────

export const LeadSource = () => (
  <div className="space-y-5">
    <Card>
      <CardHeader className="gap-0">
        <div className="flex items-center justify-between">
          <CardTitle>Lead Source</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-3 pb-3 space-y-4">
        <ChartContainer config={chartConfig} className="mx-auto max-w-45 aspect-square">
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="label" />}
            />
            <Pie
              data={LEAD_SOURCES}
              dataKey="value"
              nameKey="label"
              innerRadius="55%"
              outerRadius="80%"
              paddingAngle={2}
            >
              {LEAD_SOURCES.map((src) => (
                <Cell key={src.label} fill={src.color} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className="space-y-2">
          {LEAD_SOURCES.map((src) => (
            <div key={src.label} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: src.color }} />
                <span className="text-muted-foreground">{src.label}</span>
              </div>
              <Badge variant="secondary" className="text-xs tabular-nums">
                {src.value}
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
  </div>
)

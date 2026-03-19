"use client"

import { useState } from "react"
import { TrendingDown, UserCheck, UserPlus, Users } from "lucide-react"
import { Bar, ComposedChart, CartesianGrid, Line, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/chart"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
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

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"]

const LEAD_DATA: Record<LeadTab, { bars: number[]; line: number[]; total: string }> = {
  customer: { bars: [80, 200, 130, 140, 260, 210, 60, 240, 90, 80],  line: [30, 210, 80, 110, 60, 255, 50, 80, 55, 50],  total: "$2,324.00" },
  complete: { bars: [60, 140, 180, 90, 200, 160, 120, 180, 70, 110], line: [20, 150, 100, 70, 90, 170, 80, 60, 40, 80],  total: "$1,840.00" },
  loss:     { bars: [40, 80, 60, 100, 120, 70, 90, 50, 110, 60],     line: [15, 70, 50, 90, 40, 80, 60, 40, 90, 30],   total: "$980.00" },
  new:      { bars: [100, 160, 220, 180, 140, 240, 110, 200, 130, 150], line: [60, 140, 180, 110, 100, 220, 70, 160, 90, 100], total: "$3,120.00" },
}

const chartConfig = {
  leads:  { label: "Leads",  color: "var(--primary)" },
  growth: { label: "Growth", color: "var(--primary)" },
} satisfies ChartConfig

// ─── Component ────────────────────────────────────────────────────────────────

export const LeadSummary = () => {
  const [activeTab, setActiveTab] = useState<LeadTab>("customer")
  const { bars, line, total } = LEAD_DATA[activeTab]

  const chartData = MONTHS.map((month, i) => ({ month, leads: bars[i], growth: line[i] }))

  return (
    <Card>
      <CardHeader className="gap-0">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <CardTitle>Lead Summary</CardTitle>
          <div className="flex items-center gap-1 flex-wrap">
            {LEAD_TABS.map((tab) => (
              <Button
                key={tab.key}
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab(tab.key)}
                className={cn(activeTab === tab.key && "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary")}
              >
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6 space-y-3">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Total Growth</p>
            <p className="text-2xl font-bold tabular-nums">{total}</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm inline-block bg-primary/20" />Leads</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full inline-block bg-primary" />Growth</span>
          </div>
        </div>

        <ChartContainer config={chartConfig} className="h-50 w-full">
          <ComposedChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" strokeWidth={0.5} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 9, fill: "var(--muted-foreground)" }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 9, fill: "var(--muted-foreground)" }} domain={[0, 300]} width={28} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="leads" fill="var(--primary)" fillOpacity={0.15} radius={3} />
            <Line dataKey="growth" type="natural" stroke="var(--primary)" strokeWidth={2} dot={{ r: 3, fill: "var(--primary)", strokeWidth: 0 }} />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

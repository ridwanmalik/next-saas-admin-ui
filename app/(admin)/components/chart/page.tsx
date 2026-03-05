"use client"

import type { ChartConfig } from "@/components/ui/chart"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import ShowCard from "../_components/show-card"

const ChartPage = () => {
  const monthlyData = [
    { month: "Jan", desktop: 186, mobile: 80 },
    { month: "Feb", desktop: 305, mobile: 200 },
    { month: "Mar", desktop: 237, mobile: 120 },
    { month: "Apr", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "Jun", desktop: 214, mobile: 140 },
  ]
  const barConfig = {
    desktop: { label: "Desktop", color: "var(--chart-1)" },
  } satisfies ChartConfig
  const lineConfig = {
    desktop: { label: "Desktop", color: "var(--chart-1)" },
    mobile: { label: "Mobile", color: "var(--chart-2)" },
  } satisfies ChartConfig
  const areaConfig = {
    desktop: { label: "Desktop", color: "var(--chart-1)" },
    mobile: { label: "Mobile", color: "var(--chart-2)" },
  } satisfies ChartConfig
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Chart</h2>
        <p className="text-muted-foreground">Beautiful charts built using Recharts. Supports bar, line, area, pie, radar, radial, and more.</p>
      </div>
      <div className="space-y-4">
        <ShowCard title="Bar Chart" description="Wrap Recharts in ChartContainer and pass a ChartConfig for theming.">
          <ChartContainer config={barConfig} className="h-[200px] w-full">
            <BarChart data={monthlyData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            </BarChart>
          </ChartContainer>
        </ShowCard>

        <ShowCard title="Line Chart" description="Multiple series with ChartTooltipContent.">
          <ChartContainer config={lineConfig} className="h-[200px] w-full">
            <LineChart data={monthlyData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
              <YAxis hide />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
              <Line dataKey="mobile" type="monotone" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </ShowCard>

        <ShowCard title="Area Chart" description="Stacked area chart with fill opacity.">
          <ChartContainer config={areaConfig} className="h-[200px] w-full">
            <AreaChart data={monthlyData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area dataKey="mobile" type="natural" fill="var(--color-mobile)" fillOpacity={0.4} stroke="var(--color-mobile)" stackId="a" />
              <Area dataKey="desktop" type="natural" fill="var(--color-desktop)" fillOpacity={0.4} stroke="var(--color-desktop)" stackId="a" />
            </AreaChart>
          </ChartContainer>
        </ShowCard>
      </div>
    </div>
  )
}

export default ChartPage

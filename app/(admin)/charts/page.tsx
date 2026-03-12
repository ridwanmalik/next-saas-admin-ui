"use client"

import {
  Area, AreaChart,
  Bar, BarChart,
  Line, LineChart,
  Pie, PieChart, Cell,
  Radar, RadarChart, PolarGrid, PolarAngleAxis,
  RadialBar, RadialBarChart,
  CartesianGrid, XAxis, YAxis, Legend,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"

// ─── Data ─────────────────────────────────────────────────────────────────────

const monthlyData = [
  { month: "Jan", revenue: 12400, expenses: 8200, profit: 4200 },
  { month: "Feb", revenue: 13800, expenses: 8900, profit: 4900 },
  { month: "Mar", revenue: 15200, expenses: 9400, profit: 5800 },
  { month: "Apr", revenue: 14100, expenses: 9100, profit: 5000 },
  { month: "May", revenue: 16800, expenses: 10200, profit: 6600 },
  { month: "Jun", revenue: 18300, expenses: 11000, profit: 7300 },
  { month: "Jul", revenue: 17500, expenses: 10600, profit: 6900 },
  { month: "Aug", revenue: 19200, expenses: 11400, profit: 7800 },
  { month: "Sep", revenue: 20100, expenses: 12000, profit: 8100 },
  { month: "Oct", revenue: 18700, expenses: 11200, profit: 7500 },
  { month: "Nov", revenue: 21400, expenses: 12800, profit: 8600 },
  { month: "Dec", revenue: 23600, expenses: 13500, profit: 10100 },
]

const weeklyVisitors = [
  { day: "Mon", desktop: 1240, mobile: 890 },
  { day: "Tue", desktop: 1580, mobile: 1120 },
  { day: "Wed", desktop: 1350, mobile: 980 },
  { day: "Thu", desktop: 1720, mobile: 1340 },
  { day: "Fri", desktop: 1960, mobile: 1580 },
  { day: "Sat", desktop: 2100, mobile: 1820 },
  { day: "Sun", desktop: 1430, mobile: 1240 },
]

const trafficSources = [
  { name: "Organic", value: 38, fill: "var(--color-organic)" },
  { name: "Direct", value: 24, fill: "var(--color-direct)" },
  { name: "Social", value: 18, fill: "var(--color-social)" },
  { name: "Referral", value: 12, fill: "var(--color-referral)" },
  { name: "Email", value: 8, fill: "var(--color-email)" },
]

const performanceData = [
  { metric: "Speed", score: 88 },
  { metric: "SEO", score: 92 },
  { metric: "A11y", score: 76 },
  { metric: "Best Pract.", score: 84 },
  { metric: "PWA", score: 64 },
  { metric: "Security", score: 95 },
]

const conversionData = [
  { name: "Visitors", value: 100, fill: "var(--color-visitors)" },
  { name: "Leads", value: 62, fill: "var(--color-leads)" },
  { name: "Trials", value: 38, fill: "var(--color-trials)" },
  { name: "Paid", value: 18, fill: "var(--color-paid)" },
]

// ─── Chart configs ─────────────────────────────────────────────────────────────

const revenueConfig = {
  revenue:  { label: "Revenue",  color: "var(--primary)" },
  expenses: { label: "Expenses", color: "oklch(0.72 0.15 210)" },
  profit:   { label: "Profit",   color: "oklch(0.75 0.16 150)" },
} satisfies ChartConfig

const visitorsConfig = {
  desktop: { label: "Desktop", color: "var(--primary)" },
  mobile:  { label: "Mobile",  color: "oklch(0.72 0.15 210)" },
} satisfies ChartConfig

const trafficConfig = {
  organic:  { label: "Organic",  color: "var(--primary)" },
  direct:   { label: "Direct",   color: "oklch(0.72 0.15 210)" },
  social:   { label: "Social",   color: "oklch(0.75 0.16 150)" },
  referral: { label: "Referral", color: "oklch(0.78 0.14 60)" },
  email:    { label: "Email",    color: "oklch(0.76 0.15 330)" },
} satisfies ChartConfig

const performanceConfig = {
  score: { label: "Score", color: "var(--primary)" },
} satisfies ChartConfig

const conversionConfig = {
  visitors: { label: "Visitors", color: "var(--primary)" },
  leads:    { label: "Leads",    color: "oklch(0.72 0.15 210)" },
  trials:   { label: "Trials",   color: "oklch(0.75 0.16 150)" },
  paid:     { label: "Paid",     color: "oklch(0.78 0.14 60)" },
} satisfies ChartConfig

// ─── Charts ───────────────────────────────────────────────────────────────────

const AreaChartCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Area Chart</CardTitle>
      <CardDescription>Monthly revenue vs expenses · 2025</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={revenueConfig} className="h-56 w-full">
        <AreaChart data={monthlyData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="area-revenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.2} />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="area-expenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.72 0.15 210)" stopOpacity={0.2} />
              <stop offset="100%" stopColor="oklch(0.72 0.15 210)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" strokeWidth={0.5} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
          <YAxis tickLine={false} axisLine={false} tickFormatter={v => `$${v / 1000}k`} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} width={40} />
          <ChartTooltip content={<ChartTooltipContent formatter={v => `$${Number(v).toLocaleString()}`} />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Area dataKey="revenue" type="natural" stroke="var(--primary)" strokeWidth={1.75} fill="url(#area-revenue)" dot={false} />
          <Area dataKey="expenses" type="natural" stroke="oklch(0.72 0.15 210)" strokeWidth={1.75} fill="url(#area-expenses)" dot={false} />
        </AreaChart>
      </ChartContainer>
    </CardContent>
  </Card>
)

const BarChartCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Bar Chart</CardTitle>
      <CardDescription>Weekly visitors by device · this week</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={visitorsConfig} className="h-56 w-full">
        <BarChart data={weeklyVisitors} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" strokeWidth={0.5} />
          <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} width={36} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="desktop" fill="var(--primary)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="mobile" fill="oklch(0.72 0.15 210)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>
)

const LineChartCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Line Chart</CardTitle>
      <CardDescription>Monthly profit trend · 2025</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={revenueConfig} className="h-56 w-full">
        <LineChart data={monthlyData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" strokeWidth={0.5} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
          <YAxis tickLine={false} axisLine={false} tickFormatter={v => `$${v / 1000}k`} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} width={40} />
          <ChartTooltip content={<ChartTooltipContent formatter={v => `$${Number(v).toLocaleString()}`} />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Line dataKey="revenue" type="natural" stroke="var(--primary)" strokeWidth={2} dot={false} />
          <Line dataKey="profit" type="natural" stroke="oklch(0.75 0.16 150)" strokeWidth={2} dot={false} strokeDasharray="4 2" />
        </LineChart>
      </ChartContainer>
    </CardContent>
  </Card>
)

const PieChartCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Pie Chart</CardTitle>
      <CardDescription>Traffic sources breakdown</CardDescription>
    </CardHeader>
    <CardContent className="flex items-center justify-center">
      <ChartContainer config={trafficConfig} className="h-56 w-full max-w-xs">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
          <Pie data={trafficSources} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} strokeWidth={2}>
            {trafficSources.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    </CardContent>
  </Card>
)

const DonutChartCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Donut Chart</CardTitle>
      <CardDescription>Conversion funnel</CardDescription>
    </CardHeader>
    <CardContent className="flex items-center justify-center">
      <ChartContainer config={conversionConfig} className="h-56 w-full max-w-xs">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
          <Pie data={conversionData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} strokeWidth={2}>
            {conversionData.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    </CardContent>
  </Card>
)

const RadarChartCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Radar Chart</CardTitle>
      <CardDescription>Lighthouse performance scores</CardDescription>
    </CardHeader>
    <CardContent className="flex items-center justify-center">
      <ChartContainer config={performanceConfig} className="h-56 w-full max-w-sm">
        <RadarChart data={performanceData} cx="50%" cy="50%" outerRadius={80}>
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Radar dataKey="score" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.15} strokeWidth={1.75} />
        </RadarChart>
      </ChartContainer>
    </CardContent>
  </Card>
)

const RadialChartCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Radial Bar Chart</CardTitle>
      <CardDescription>Goal completion by category</CardDescription>
    </CardHeader>
    <CardContent className="flex items-center justify-center">
      <ChartContainer config={conversionConfig} className="h-56 w-full max-w-sm">
        <RadialBarChart
          data={conversionData}
          cx="50%" cy="50%"
          innerRadius={20} outerRadius={90}
          startAngle={90} endAngle={-270}
        >
          <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
          <RadialBar dataKey="value" background={{ fill: "var(--muted)" }} cornerRadius={4} />
        </RadialBarChart>
      </ChartContainer>
    </CardContent>
  </Card>
)

// ─── Page ─────────────────────────────────────────────────────────────────────

const ChartsPage = () => (
  <div className="mx-auto w-full max-w-6xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Charts</h2>
      <p className="text-muted-foreground">Chart components built with Recharts and shadcn/ui.</p>
    </div>

    <div className="grid gap-6 lg:grid-cols-2">
      <AreaChartCard />
      <BarChartCard />
      <LineChartCard />
      <PieChartCard />
      <DonutChartCard />
      <RadarChartCard />
      <RadialChartCard />
    </div>
  </div>
)

export default ChartsPage

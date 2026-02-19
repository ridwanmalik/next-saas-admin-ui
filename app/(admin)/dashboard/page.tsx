import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, DollarSign, Activity } from "lucide-react"

const STATS = [
  {
    title: "Total Users",
    value: "12,340",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    description: "vs last month",
  },
  {
    title: "Monthly Revenue",
    value: "$48,295",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    description: "vs last month",
  },
  {
    title: "Active Sessions",
    value: "3,847",
    change: "+3.1%",
    trend: "up",
    icon: Activity,
    description: "right now",
  },
  {
    title: "Growth Rate",
    value: "24.8%",
    change: "+4.6%",
    trend: "up",
    icon: TrendingUp,
    description: "month over month",
  },
]

const RECENT_ACTIVITY = [
  { user: "Alice Johnson", action: "Upgraded to Pro plan", time: "2 min ago", status: "success" },
  { user: "Bob Smith", action: "Submitted a support ticket", time: "14 min ago", status: "pending" },
  { user: "Carol White", action: "Cancelled subscription", time: "1 hr ago", status: "destructive" },
  { user: "David Lee", action: "Completed onboarding", time: "3 hr ago", status: "success" },
  { user: "Eva Martinez", action: "Invited 3 team members", time: "5 hr ago", status: "success" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Welcome back — here's what's happening.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500 font-medium">{stat.change}</span> {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions across your platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {RECENT_ACTIVITY.map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-sm font-medium truncate">{item.user}</span>
                    <span className="text-xs text-muted-foreground truncate">{item.action}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={item.status === "success" ? "default" : item.status === "destructive" ? "destructive" : "secondary"}>
                      {item.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Overview</CardTitle>
            <CardDescription>Key metrics at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "Free users", value: 8240, max: 12340 },
                { label: "Pro users", value: 3200, max: 12340 },
                { label: "Enterprise", value: 900, max: 12340 },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{item.label}</span>
                    <span className="text-muted-foreground">{item.value.toLocaleString()}</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${(item.value / item.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

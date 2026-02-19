import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">Track your platform performance over time.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Page Views", value: "1.2M", period: "Last 30 days" },
          { label: "Unique Visitors", value: "84K", period: "Last 30 days" },
          { label: "Bounce Rate", value: "32.4%", period: "Last 30 days" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-3xl">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{stat.period}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Traffic Overview</CardTitle>
          <CardDescription>Placeholder for chart visualization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center rounded-lg border border-dashed text-muted-foreground text-sm">
            Chart component goes here
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

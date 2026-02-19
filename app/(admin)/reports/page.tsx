import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const REPORTS = [
  { name: "Monthly Revenue Report", description: "Revenue breakdown by plan and region", date: "Feb 1, 2026", size: "245 KB" },
  { name: "User Acquisition Report", description: "New user signups and churn analysis", date: "Feb 1, 2026", size: "182 KB" },
  { name: "Support Ticket Summary", description: "Ticket volume and resolution times", date: "Jan 1, 2026", size: "98 KB" },
]

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
        <p className="text-muted-foreground">Download and review generated reports.</p>
      </div>
      <div className="grid gap-4">
        {REPORTS.map((report) => (
          <Card key={report.name}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-base">{report.name}</CardTitle>
                  <CardDescription>{report.description}</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="shrink-0">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Generated {report.date} · {report.size}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

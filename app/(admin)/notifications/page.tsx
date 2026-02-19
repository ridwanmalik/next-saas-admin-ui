import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const NOTIFICATIONS = [
  { title: "New user signup", description: "Carol White signed up for the Enterprise plan.", time: "5 min ago", read: false },
  { title: "Payment received", description: "Invoice #1042 paid by Acme Corp ($2,400).", time: "1 hr ago", read: false },
  { title: "Support ticket opened", description: "Ticket #408: 'Dashboard not loading' submitted.", time: "3 hr ago", read: true },
  { title: "Plan downgrade", description: "David Lee downgraded from Pro to Free.", time: "Yesterday", read: true },
]

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
        <p className="text-muted-foreground">Stay updated on important platform events.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>{NOTIFICATIONS.filter((n) => !n.read).length} unread notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {NOTIFICATIONS.map((n, i) => (
              <div key={i} className={`flex items-start justify-between gap-4 py-4 ${n.read ? "opacity-60" : ""}`}>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{n.title}</p>
                    {!n.read && <Badge className="h-4 px-1 text-[10px]">New</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{n.description}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{n.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

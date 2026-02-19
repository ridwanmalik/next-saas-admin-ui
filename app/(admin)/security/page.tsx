import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Security</h2>
        <p className="text-muted-foreground">Manage authentication and access settings.</p>
      </div>
      <div className="grid gap-4 max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Two-Factor Authentication</CardTitle>
              <Badge variant="outline">Disabled</Badge>
            </div>
            <CardDescription>
              Add an extra layer of security to your account by requiring a verification code.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Enable 2FA</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
            <CardDescription>Devices currently logged into your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { device: "MacBook Pro – Chrome", location: "New York, US", current: true },
              { device: "iPhone 15 – Safari", location: "New York, US", current: false },
            ].map((session) => (
              <div key={session.device} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{session.device}</p>
                  <p className="text-xs text-muted-foreground">{session.location}</p>
                </div>
                {session.current ? (
                  <Badge>Current</Badge>
                ) : (
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                    Revoke
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

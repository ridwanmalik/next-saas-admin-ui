import {
  Mail, MapPin, Calendar, Globe, Shield, CreditCard,
  LogIn, Settings, AlertTriangle, CheckCircle2, Pencil,
  Clock, Monitor, Smartphone, MoreHorizontal, ShieldOff, Trash2,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { PageContainer } from "@/components/layout/page-container"

// ─── Mock user ────────────────────────────────────────────────────────────────

const USER = {
  id:        "USR-004",
  name:      "James Okonkwo",
  email:     "james@bigco.com",
  role:      "Admin",
  plan:      "Enterprise",
  status:    "Active",
  location:  "Lagos, Nigeria",
  website:   "bigco.com",
  joined:    "February 14, 2025",
  lastSeen:  "2 hours ago",
  sessions:  429,
  initials:  "JO",
  avatarColor: "bg-amber-500",
}

const STATS = [
  { label: "Total sessions",  value: "429"   },
  { label: "Pages visited",   value: "3,812" },
  { label: "API calls",       value: "18.4k" },
  { label: "Avg. session",    value: "14 min" },
]

const ACTIVITY = [
  { icon: LogIn,         text: "Signed in from Chrome on macOS",           time: "2 hr ago",   status: "success" },
  { icon: Settings,      text: "Updated billing payment method",            time: "Yesterday",  status: "default" },
  { icon: AlertTriangle, text: "Failed login attempt from unknown device",  time: "2 days ago", status: "warning" },
  { icon: CheckCircle2,  text: "Upgraded plan to Enterprise",               time: "3 days ago", status: "success" },
  { icon: LogIn,         text: "Signed in from Safari on iPhone",           time: "4 days ago", status: "success" },
  { icon: Settings,      text: "Changed account email address",             time: "1 week ago", status: "default" },
]

const SESSIONS = [
  { device: "Chrome on macOS",  location: "Lagos, NG",     icon: Monitor,    current: true,  time: "Active now"   },
  { device: "Safari on iPhone", location: "Lagos, NG",     icon: Smartphone, current: false, time: "3 hr ago"     },
  { device: "Firefox on Linux", location: "London, UK",    icon: Monitor,    current: false, time: "2 days ago"   },
]

// ─── Style maps ───────────────────────────────────────────────────────────────

const activityIconStyle: Record<string, string> = {
  success: "bg-emerald-500/10 text-emerald-500",
  warning: "bg-amber-500/10 text-amber-500",
  default: "bg-muted text-muted-foreground",
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const UserDetailsPage = () => (
  <PageContainer wide>
    {/* ── Header ─────────────────────────────────────────────── */}
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-4">
        <Avatar className={cn("h-16 w-16", USER.avatarColor)}>
          <AvatarFallback className={cn("text-lg font-bold text-white", USER.avatarColor)}>
            {USER.initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-2xl font-bold tracking-tight">{USER.name}</h2>
            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              {USER.status}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />{USER.email}
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />{USER.location}
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />Joined {USER.joined}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-1.5">
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5">
              <MoreHorizontal className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem className="gap-2">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              Send email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-amber-600 dark:text-amber-400 focus:text-amber-600">
              <ShieldOff className="h-3.5 w-3.5" />
              Suspend user
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
              <Trash2 className="h-3.5 w-3.5" />
              Delete user
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    {/* ── Stat strip ─────────────────────────────────────────── */}
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {STATS.map(s => (
        <Card key={s.label}>
          <CardContent className="p-4">
            <p className="text-2xl font-bold tabular-nums">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* ── Main grid ──────────────────────────────────────────── */}
    <div className="grid gap-4 lg:grid-cols-3">

      {/* Left col */}
      <div className="space-y-4">

        {/* Profile info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">User ID</span>
              <span className="font-mono text-xs">{USER.id}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Role</span>
              <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400">
                {USER.role}
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Website</span>
              <span className="flex items-center gap-1">
                <Globe className="h-3 w-3 text-muted-foreground" />
                {USER.website}
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Last seen</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-muted-foreground" />
                {USER.lastSeen}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Billing */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Billing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Plan</span>
              <Badge>{USER.plan}</Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Payment</span>
              <span className="flex items-center gap-1.5">
                <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
                Visa ···· 4242
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Next bill</span>
              <span>Aug 14, 2025</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-semibold">$299 / mo</span>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">2FA</span>
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <Shield className="h-3.5 w-3.5" />Enabled
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Password</span>
              <span className="text-xs text-muted-foreground">Updated 3 weeks ago</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Active sessions</span>
              <span>{SESSIONS.length}</span>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Right col (2 cols wide) */}
      <div className="lg:col-span-2 space-y-4">

        {/* Activity */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Recent Activity</CardTitle>
            <CardDescription>Last 7 days of account events.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {ACTIVITY.map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="flex items-start gap-3 py-3 border-b last:border-0">
                    <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full", activityIconStyle[item.status])}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{item.text}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Sessions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Active Sessions</CardTitle>
            <CardDescription>Devices currently signed in to this account.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {SESSIONS.map((s, i) => {
                const Icon = s.icon
                return (
                  <div key={i} className="flex items-center gap-3 py-3 border-b last:border-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{s.device}</p>
                      <p className="text-xs text-muted-foreground">{s.location} · {s.time}</p>
                    </div>
                    {s.current ? (
                      <Badge variant="outline" className="text-emerald-600 border-emerald-500/30 bg-emerald-500/10 text-[10px]">
                        Current
                      </Badge>
                    ) : (
                      <Button variant="ghost" size="sm" className="text-xs text-destructive hover:text-destructive h-7">
                        Revoke
                      </Button>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  </PageContainer>
)

export default UserDetailsPage

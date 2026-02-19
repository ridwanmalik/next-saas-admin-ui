"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Camera, Mail, Monitor, Moon, Sun, AlertTriangle } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// ─── Theme option card ─────────────────────────────────────────────────────

const THEME_OPTIONS = [
  {
    value: "light",
    label: "Light",
    icon: Sun,
    preview: (
      <div className="rounded-md border bg-white p-2 space-y-1.5">
        <div className="h-2 w-3/4 rounded-sm bg-slate-200" />
        <div className="h-2 w-1/2 rounded-sm bg-slate-100" />
        <div className="mt-2 h-5 w-full rounded-sm bg-slate-100" />
      </div>
    ),
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
    preview: (
      <div className="rounded-md border border-slate-700 bg-slate-900 p-2 space-y-1.5">
        <div className="h-2 w-3/4 rounded-sm bg-slate-600" />
        <div className="h-2 w-1/2 rounded-sm bg-slate-700" />
        <div className="mt-2 h-5 w-full rounded-sm bg-slate-800" />
      </div>
    ),
  },
  {
    value: "system",
    label: "System",
    icon: Monitor,
    preview: (
      <div className="rounded-md border overflow-hidden">
        <div className="flex h-full">
          <div className="w-1/2 bg-white p-2 space-y-1.5">
            <div className="h-2 w-3/4 rounded-sm bg-slate-200" />
            <div className="h-5 w-full rounded-sm bg-slate-100" />
          </div>
          <div className="w-1/2 bg-slate-900 p-2 space-y-1.5">
            <div className="h-2 w-3/4 rounded-sm bg-slate-600" />
            <div className="h-5 w-full rounded-sm bg-slate-800" />
          </div>
        </div>
      </div>
    ),
  },
]

// ─── Notification row ──────────────────────────────────────────────────────

function NotificationRow({
  id,
  label,
  description,
  defaultChecked = true,
}: {
  id: string
  label: string
  description: string
  defaultChecked?: boolean
}) {
  const [checked, setChecked] = useState(defaultChecked)
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="space-y-0.5 min-w-0">
        <Label htmlFor={id} className="text-sm font-medium cursor-pointer">{label}</Label>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={setChecked} />
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="space-y-8 max-w-2xl">

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your profile, preferences, and account settings.
        </p>
      </div>

      {/* ── Profile ─────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your public-facing name and contact details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg font-semibold">AL</AvatarFallback>
              </Avatar>
              <button className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm ring-2 ring-background hover:bg-primary/90 transition-colors">
                <Camera className="h-3 w-3" />
              </button>
            </div>
            <div>
              <p className="text-sm font-medium">Profile photo</p>
              <p className="text-xs text-muted-foreground mt-0.5">JPG or PNG, max 2 MB</p>
            </div>
          </div>

          <Separator />

          {/* Name row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" defaultValue="Alice" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" defaultValue="Lawson" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email">Email address</Label>
            <div className="relative">
              <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <Input
                id="email"
                type="email"
                defaultValue="alice@acme.com"
                className="pl-8 bg-muted/40"
                readOnly
              />
            </div>
            <p className="text-xs text-muted-foreground">
              To change your email, contact support.
            </p>
          </div>

          {/* Job + Company */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="job-title">Job title</Label>
              <Input id="job-title" defaultValue="Product Designer" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="company">Company</Label>
              <Input id="company" defaultValue="Acme Corp" />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              rows={3}
              defaultValue="Building products people love. Formerly at Stripe and Figma."
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">160 characters max.</p>
          </div>

          <div className="flex justify-end">
            <Button>Save profile</Button>
          </div>
        </CardContent>
      </Card>

      {/* ── Appearance ──────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Choose how Next SaaS looks for you.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Theme picker */}
          <div className="space-y-2">
            <Label>Theme</Label>
            <div className="grid grid-cols-3 gap-3">
              {THEME_OPTIONS.map(opt => {
                const Icon = opt.icon
                const isActive = theme === opt.value
                return (
                  <button
                    key={opt.value}
                    onClick={() => setTheme(opt.value)}
                    className={cn(
                      "flex flex-col gap-2 rounded-lg border-2 p-3 text-left transition-all hover:border-primary/60",
                      isActive ? "border-primary" : "border-border",
                    )}
                  >
                    {opt.preview}
                    <span className={cn(
                      "flex items-center gap-1.5 text-xs font-medium mt-0.5",
                      isActive ? "text-foreground" : "text-muted-foreground",
                    )}>
                      <Icon className="h-3 w-3" />
                      {opt.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <Separator />

          {/* Interface density */}
          <div className="space-y-1.5">
            <Label htmlFor="density">Interface density</Label>
            <Select defaultValue="default">
              <SelectTrigger id="density">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compact">Compact</SelectItem>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="comfortable">Comfortable</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Controls spacing and element sizing across the UI.</p>
          </div>

        </CardContent>
      </Card>

      {/* ── Preferences ─────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Language, timezone, and regional settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="language">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="timezone">Timezone</Label>
              <Select defaultValue="utc">
                <SelectTrigger id="timezone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC+0 — London</SelectItem>
                  <SelectItem value="est">UTC-5 — New York</SelectItem>
                  <SelectItem value="pst">UTC-8 — Los Angeles</SelectItem>
                  <SelectItem value="cet">UTC+1 — Paris</SelectItem>
                  <SelectItem value="ist">UTC+5:30 — Mumbai</SelectItem>
                  <SelectItem value="jst">UTC+9 — Tokyo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="date-format">Date format</Label>
            <Select defaultValue="mdy">
              <SelectTrigger id="date-format">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end">
            <Button>Save preferences</Button>
          </div>
        </CardContent>
      </Card>

      {/* ── Notifications ───────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Choose what you want to be notified about.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            <NotificationRow
              id="notif-email"
              label="Email updates"
              description="Receive a weekly digest of activity on your account."
            />
            <NotificationRow
              id="notif-push"
              label="Push notifications"
              description="Get real-time alerts in your browser."
            />
            <NotificationRow
              id="notif-marketing"
              label="Product announcements"
              description="News about new features and improvements."
              defaultChecked={false}
            />
            <NotificationRow
              id="notif-security"
              label="Security alerts"
              description="Be notified of sign-ins from new devices or locations."
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button>Save notifications</Button>
          </div>
        </CardContent>
      </Card>

      {/* ── Danger zone ─────────────────────────────────────────────── */}
      <Card className="border-destructive/40">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <CardTitle>Danger zone</CardTitle>
          </div>
          <CardDescription>
            These actions are permanent and cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3">
            <div>
              <p className="text-sm font-medium">Delete account</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Permanently remove your account and all associated data.
              </p>
            </div>
            <Button variant="destructive" size="sm">Delete account</Button>
          </div>
          <div className="flex items-center justify-between rounded-lg border px-4 py-3">
            <div>
              <p className="text-sm font-medium">Export data</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Download a copy of all your data in JSON format.
              </p>
            </div>
            <Button variant="outline" size="sm">Export</Button>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}

"use client"

import { Bell, Camera, Lock, Shield, Smartphone, Trash2, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

function Variant({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <h3 className="text-sm font-semibold">{label}</h3>
        <div className="h-px flex-1 bg-border" />
      </div>
      {children}
    </section>
  )
}

function SectionDivider({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border bg-muted">
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

export default function ProfileFormsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-14">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Profile Forms</h2>
        <p className="text-muted-foreground">Account settings layouts — personal info, notifications, and security.</p>
      </div>

      {/* ── Variant 1: Personal Info ─────────────────────────────────────── */}
      <Variant label="Personal Info">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your personal information and public profile.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar upload */}
            <div className="flex items-center gap-5">
              <div className="relative">
                <Avatar className="size-20">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Profile" className="grayscale" />
                  <AvatarFallback className="text-lg">JD</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm hover:opacity-90">
                  <Camera className="size-3" />
                </button>
              </div>
              <div>
                <p className="text-sm font-medium">Profile photo</p>
                <p className="text-xs text-muted-foreground mt-0.5">JPG, PNG or GIF · max 5 MB</p>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="outline">Upload photo</Button>
                  <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">Remove</Button>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="pi-fn">First name</Label>
                <Input id="pi-fn" defaultValue="Jane" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pi-ln">Last name</Label>
                <Input id="pi-ln" defaultValue="Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pi-email">Email</Label>
                <Input id="pi-email" type="email" defaultValue="jane@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pi-username">Username</Label>
                <div className="flex">
                  <span className="flex items-center rounded-l-md border border-r-0 bg-muted px-3 text-sm text-muted-foreground">@</span>
                  <Input id="pi-username" defaultValue="janedoe" className="rounded-l-none" />
                </div>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="pi-bio">Bio</Label>
                <Textarea id="pi-bio" rows={3} placeholder="Tell us a little about yourself..." defaultValue="Product designer & developer. Building things for the web." />
                <p className="text-xs text-muted-foreground">Max 160 characters.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pi-role">Role</Label>
                <NativeSelect id="pi-role" defaultValue="designer">
                  <NativeSelectOption value="designer">Product Designer</NativeSelectOption>
                  <NativeSelectOption value="engineer">Engineer</NativeSelectOption>
                  <NativeSelectOption value="manager">Manager</NativeSelectOption>
                  <NativeSelectOption value="other">Other</NativeSelectOption>
                </NativeSelect>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pi-timezone">Timezone</Label>
                <NativeSelect id="pi-timezone">
                  <NativeSelectOption>America/New_York (UTC-5)</NativeSelectOption>
                  <NativeSelectOption>America/Los_Angeles (UTC-8)</NativeSelectOption>
                  <NativeSelectOption>Europe/London (UTC+0)</NativeSelectOption>
                  <NativeSelectOption>Asia/Tokyo (UTC+9)</NativeSelectOption>
                </NativeSelect>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-between border-t pt-6">
            <Button variant="ghost" className="text-destructive hover:text-destructive">
              <Trash2 className="size-4" />Delete account
            </Button>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </Variant>

      {/* ── Variant 2: Notifications ──────────────────────────────────────── */}
      <Variant label="Notifications">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Notification preferences</CardTitle>
            <CardDescription>Choose how and when you want to be notified.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <SectionDivider icon={Bell} title="Email notifications" description="Sent to jane@example.com" />
            <div className="space-y-1 divide-y">
              {[
                { id: "n-product", label: "Product updates", desc: "News about features and releases", on: true },
                { id: "n-security", label: "Security alerts", desc: "Unusual activity on your account", on: true },
                { id: "n-comments", label: "Comments & mentions", desc: "When someone mentions you", on: false },
                { id: "n-digest", label: "Weekly digest", desc: "Summary of your team's activity", on: false },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3">
                  <div>
                    <Label htmlFor={item.id} className="text-sm">{item.label}</Label>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch id={item.id} defaultChecked={item.on} />
                </div>
              ))}
            </div>

            <Separator />

            <SectionDivider icon={Smartphone} title="Push notifications" description="Delivered to your device" />
            <div className="space-y-1 divide-y">
              {[
                { id: "p-new", label: "New messages", desc: "When you receive a direct message", on: true },
                { id: "p-assign", label: "Assignments", desc: "When a task is assigned to you", on: true },
                { id: "p-remind", label: "Reminders", desc: "Scheduled task and event reminders", on: false },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3">
                  <div>
                    <Label htmlFor={item.id} className="text-sm">{item.label}</Label>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch id={item.id} defaultChecked={item.on} />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button>Save preferences</Button>
          </CardFooter>
        </Card>
      </Variant>

      {/* ── Variant 3: Security ──────────────────────────────────────────── */}
      <Variant label="Security">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Security settings</CardTitle>
            <CardDescription>Manage your password, two-factor auth, and active sessions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <SectionDivider icon={Lock} title="Change password" description="Use a strong, unique password" />
            <div className="grid gap-3 sm:max-w-sm">
              <div className="space-y-2">
                <Label htmlFor="sec-cur">Current password</Label>
                <Input id="sec-cur" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sec-new">New password</Label>
                <Input id="sec-new" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sec-conf">Confirm new password</Label>
                <Input id="sec-conf" type="password" placeholder="••••••••" />
              </div>
              <Button className="w-fit">Update password</Button>
            </div>

            <Separator />

            <SectionDivider icon={Shield} title="Two-factor authentication" description="Add an extra layer of security" />
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">Authenticator app</p>
                <p className="text-xs text-muted-foreground mt-0.5">Use an app like 1Password or Authy to generate one-time codes.</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-green-600 border-green-200 dark:border-green-800">Enabled</Badge>
                <Button size="sm" variant="outline">Manage</Button>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-sm font-medium mb-3">Active sessions</p>
              <div className="space-y-2">
                {[
                  { device: "MacBook Pro 16″", location: "San Francisco, CA", time: "Active now", current: true },
                  { device: "iPhone 15", location: "San Francisco, CA", time: "2 hours ago", current: false },
                  { device: "Chrome · Windows 11", location: "New York, NY", time: "3 days ago", current: false },
                ].map(({ device, location, time, current }) => (
                  <div key={device} className="flex items-center justify-between rounded-lg border px-4 py-3">
                    <div>
                      <p className="text-sm font-medium flex items-center gap-2">
                        {device}
                        {current && <Badge variant="secondary" className="text-xs h-4">This device</Badge>}
                      </p>
                      <p className="text-xs text-muted-foreground">{location} · {time}</p>
                    </div>
                    {!current && (
                      <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                        Revoke
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </Variant>
    </div>
  )
}

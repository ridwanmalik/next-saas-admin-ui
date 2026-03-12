"use client"

import { useState } from "react"
import {
  Bell, AtSign, CheckCircle2, AlertTriangle, Info,
  CreditCard, Users, ShieldAlert, Zap, Settings, Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/ui/empty-state"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type NotifType = "mention" | "success" | "warning" | "info" | "billing" | "security" | "team"
type Tab = "all" | "mentions" | "system" | "billing"

interface Notification {
  id: string
  type: NotifType
  sender: string
  initials: string
  title: string
  message: string
  time: string
  date: "today" | "yesterday" | "week"
  read: boolean
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const INITIAL: Notification[] = [
  {
    id: "1", type: "mention", sender: "Sarah Chen", initials: "SC",
    title: "Sarah mentioned you in Q4 Report",
    message: "\"The projections look off — can you double-check the APAC numbers before we share this with the board?\"",
    time: "2 min ago", date: "today", read: false,
  },
  {
    id: "2", type: "success", sender: "System", initials: "SY",
    title: "Data export ready",
    message: "Your export of 1,240 user records completed successfully. The CSV file is ready to download.",
    time: "18 min ago", date: "today", read: false,
  },
  {
    id: "3", type: "team", sender: "James Park", initials: "JP",
    title: "You were assigned a task",
    message: "James assigned you to \"Redesign onboarding flow\" in the Mobile App project — high priority, due Friday.",
    time: "1 hr ago", date: "today", read: false,
  },
  {
    id: "4", type: "billing", sender: "Billing", initials: "BL",
    title: "Invoice #1084 paid",
    message: "Acme Corp paid invoice #1084 for $2,400. The payment has been applied to their account.",
    time: "2 hr ago", date: "today", read: false,
  },
  {
    id: "5", type: "warning", sender: "System", initials: "SY",
    title: "API quota at 81%",
    message: "Your workspace has used 810K of 1M monthly API calls. At this rate you'll hit the limit in ~4 days.",
    time: "3 hr ago", date: "today", read: true,
  },
  {
    id: "6", type: "mention", sender: "Priya Nair", initials: "PN",
    title: "Priya commented on Launch Checklist",
    message: "\"Staging is updated and all smoke tests are passing. Waiting on your sign-off before we push to production.\"",
    time: "5 hr ago", date: "today", read: true,
  },
  {
    id: "7", type: "success", sender: "System", initials: "SY",
    title: "Deployment to production succeeded",
    message: "Version 2.4.1 is live. Zero errors detected across all health checks and uptime monitors.",
    time: "Yesterday, 4:12 PM", date: "yesterday", read: true,
  },
  {
    id: "8", type: "billing", sender: "Billing", initials: "BL",
    title: "New user on Enterprise plan",
    message: "Carol White signed up for the Enterprise plan. Monthly recurring revenue increased by $299.",
    time: "Yesterday, 11:34 AM", date: "yesterday", read: true,
  },
  {
    id: "9", type: "security", sender: "Security", initials: "SE",
    title: "New sign-in from unrecognised device",
    message: "A sign-in was detected from Chrome on Windows in London, UK. If this wasn't you, secure your account immediately.",
    time: "Yesterday, 8:02 AM", date: "yesterday", read: true,
  },
  {
    id: "10", type: "mention", sender: "Tom Rivera", initials: "TR",
    title: "Tom mentioned you in #general",
    message: "\"Let's loop in the team lead before the client call on Friday — they'll want final sign-off on the proposal.\"",
    time: "Mon, 3:45 PM", date: "week", read: true,
  },
  {
    id: "11", type: "team", sender: "Leila Hassan", initials: "LH",
    title: "You were added to a project",
    message: "Leila added you to the \"Website Redesign\" project. You now have editor access to all tasks and files.",
    time: "Mon, 10:20 AM", date: "week", read: true,
  },
  {
    id: "12", type: "warning", sender: "System", initials: "SY",
    title: "Storage at 78% capacity",
    message: "Your workspace is using 39 GB of 50 GB storage. Consider upgrading your plan or archiving old files.",
    time: "Sun, 6:00 AM", date: "week", read: true,
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TYPE_META: Record<NotifType, { icon: React.ElementType; color: string; bg: string }> = {
  mention:  { icon: AtSign,       color: "text-blue-500",    bg: "bg-blue-500/10"    },
  success:  { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  warning:  { icon: AlertTriangle,color: "text-amber-500",   bg: "bg-amber-500/10"   },
  info:     { icon: Info,         color: "text-sky-500",     bg: "bg-sky-500/10"     },
  billing:  { icon: CreditCard,   color: "text-violet-500",  bg: "bg-violet-500/10"  },
  security: { icon: ShieldAlert,  color: "text-red-500",     bg: "bg-red-500/10"     },
  team:     { icon: Users,        color: "text-indigo-500",  bg: "bg-indigo-500/10"  },
}

const TAB_FILTERS: Record<Tab, (n: Notification) => boolean> = {
  all:      () => true,
  mentions: n => n.type === "mention",
  system:   n => ["success", "warning", "info", "security"].includes(n.type),
  billing:  n => n.type === "billing",
}

const GROUP_LABELS: Record<Notification["date"], string> = {
  today:     "Today",
  yesterday: "Yesterday",
  week:      "This week",
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const NotifItem = ({
  n,
  onRead,
}: {
  n: Notification
  onRead: (id: string) => void
}) => {
  const { icon: Icon, color, bg } = TYPE_META[n.type]

  return (
    <div
      className={cn(
        "flex gap-3 px-4 py-4 transition-colors hover:bg-muted/40 cursor-pointer",
        !n.read && "bg-primary/[0.03]",
      )}
      onClick={() => onRead(n.id)}
    >
      {/* Avatar + type icon */}
      <div className="relative shrink-0 mt-0.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
          {n.initials}
        </div>
        <div className={cn("absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full", bg)}>
          <Icon className={cn("h-2.5 w-2.5", color)} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-0.5">
        <div className="flex items-start justify-between gap-2">
          <p className={cn("text-sm leading-snug", !n.read ? "font-semibold" : "font-medium")}>
            {n.title}
          </p>
          {!n.read && (
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
          )}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{n.message}</p>
        <p className="text-[10px] text-muted-foreground/60">{n.time}</p>
      </div>
    </div>
  )
}

const StatCard = ({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: number; color: string }) => (
  <div className="rounded-xl border bg-card p-4 flex items-center gap-3">
    <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", color)}>
      <Icon className="h-4 w-4" />
    </div>
    <div>
      <p className="text-xl font-bold tabular-nums">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  </div>
)

// ─── Page ─────────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string }[] = [
  { id: "all",      label: "All"      },
  { id: "mentions", label: "Mentions" },
  { id: "system",   label: "System"   },
  { id: "billing",  label: "Billing"  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(INITIAL)
  const [activeTab, setActiveTab] = useState<Tab>("all")

  const markRead = (id: string) =>
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))

  const markAllRead = () =>
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))

  const filtered = notifications.filter(TAB_FILTERS[activeTab])
  const unread   = notifications.filter(n => !n.read).length

  const groups: Notification["date"][] = ["today", "yesterday", "week"]

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
          <p className="text-muted-foreground">Stay on top of activity across your workspace.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          {unread > 0 && (
            <Button variant="outline" size="sm" className="gap-1.5" onClick={markAllRead}>
              <Check className="h-3.5 w-3.5" /> Mark all read
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon={Bell}         label="Total"    value={notifications.length}                                    color="bg-primary/10 text-primary"         />
        <StatCard icon={Zap}          label="Unread"   value={unread}                                                  color="bg-amber-500/10 text-amber-500"     />
        <StatCard icon={AtSign}       label="Mentions" value={notifications.filter(n => n.type === "mention").length}  color="bg-blue-500/10 text-blue-500"       />
        <StatCard icon={ShieldAlert}  label="Security" value={notifications.filter(n => n.type === "security").length} color="bg-red-500/10 text-red-500"         />
      </div>

      {/* Tabs + list */}
      <div className="rounded-xl border bg-card overflow-hidden">

        {/* Tab bar */}
        <div className="flex items-center justify-between gap-2 border-b px-4 py-2">
          <div className="flex gap-1">
            {TABS.map(({ id, label }) => {
              const count = notifications.filter(TAB_FILTERS[id]).filter(n => !n.read).length
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={cn(
                    "relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                    activeTab === id
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  )}
                >
                  {label}
                  {count > 0 && (
                    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                      {count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
          <span className="text-xs text-muted-foreground">
            {filtered.length} notification{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Notification list grouped by date */}
        {filtered.length === 0 ? (
          <div className="py-10">
            <EmptyState
              icon={Bell}
              title="All caught up"
              description="No notifications in this category."
              size="sm"
            />
          </div>
        ) : (
          <div className="divide-y">
            {groups.map(group => {
              const items = filtered.filter(n => n.date === group)
              if (!items.length) return null
              return (
                <div key={group}>
                  <div className="px-4 py-2 bg-muted/30">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {GROUP_LABELS[group]}
                    </p>
                  </div>
                  <div className="divide-y">
                    {items.map(n => (
                      <NotifItem key={n.id} n={n} onRead={markRead} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

    </div>
  )
}

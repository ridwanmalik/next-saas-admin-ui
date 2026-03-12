"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, AtSign, Info, AlertTriangle, CheckCircle2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export type NotificationType = "mention" | "info" | "warning" | "success"

export interface Notification {
  id: string
  type: NotificationType
  message: string
  timestamp: string
  read: boolean
  avatarUrl?: string
  avatarFallback?: string
  sender?: string
}

interface NotificationDropdownProps {
  notifications: Notification[]
  onMarkAllRead?: () => void
  onDismiss?: (id: string) => void
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const TYPE_ICON: Record<NotificationType, React.ReactNode> = {
  mention:  <AtSign className="h-3.5 w-3.5 text-blue-500" />,
  info:     <Info className="h-3.5 w-3.5 text-blue-500" />,
  warning:  <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />,
  success:  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />,
}

// ─── Notification Item ────────────────────────────────────────────────────────

const NotificationItem = ({
  notification,
  onDismiss,
}: {
  notification: Notification
  onDismiss?: (id: string) => void
}) => (
  <div className={cn(
    "flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors group relative",
    !notification.read && "bg-primary/[0.03]",
  )}>
    <div className="relative shrink-0 mt-0.5">
      <Avatar className="h-8 w-8">
        <AvatarImage src={notification.avatarUrl} />
        <AvatarFallback className="text-xs">{notification.avatarFallback ?? "?"}</AvatarFallback>
      </Avatar>
      <span className="absolute -bottom-0.5 -right-0.5 rounded-full bg-background p-0.5">
        {TYPE_ICON[notification.type]}
      </span>
    </div>

    <div className="flex-1 min-w-0">
      {notification.sender && (
        <p className="text-xs font-medium">{notification.sender}</p>
      )}
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
        {notification.message}
      </p>
      <p className="text-[11px] text-muted-foreground/70 mt-1">{notification.timestamp}</p>
    </div>

    <div className="flex items-center gap-1.5 shrink-0">
      {!notification.read && (
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      )}
      {onDismiss && (
        <button
          onClick={() => onDismiss(notification.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-muted"
        >
          <X className="h-3 w-3 text-muted-foreground" />
        </button>
      )}
    </div>
  </div>
)

// ─── Component ────────────────────────────────────────────────────────────────

export const NotificationDropdown = ({
  notifications,
  onMarkAllRead,
  onDismiss,
}: NotificationDropdownProps) => {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"all" | "mentions">("all")

  const unread = notifications.filter(n => !n.read).length
  const mentions = notifications.filter(n => n.type === "mention")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-8 w-8">
          <Bell className="h-4 w-4" />
          {unread > 0 && (
            <Badge className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 text-[10px] flex items-center justify-center rounded-full">
              {unread > 99 ? "99+" : unread}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-80 p-0 shadow-lg" sideOffset={8}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">Notifications</h3>
            {unread > 0 && (
              <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">{unread} new</Badge>
            )}
          </div>
          {unread > 0 && onMarkAllRead && (
            <button
              onClick={onMarkAllRead}
              className="text-xs text-primary hover:underline"
            >
              Mark all read
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="px-3 py-2 border-b">
          <div className="inline-flex rounded-xl border bg-muted/40 p-1 gap-1 w-full">
            {(["all", "mentions"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                  activeTab === tab
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {tab === "all" ? "All" : "Mentions"}
                {tab === "mentions" && mentions.filter(n => !n.read).length > 0 && (
                  <Badge variant="secondary" className="h-4 px-1 text-[10px]">
                    {mentions.filter(n => !n.read).length}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <ScrollArea className="h-72">
          {activeTab === "all" && (
            notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                <Bell className="h-8 w-8 mb-2 opacity-30" />
                <p className="text-xs">You're all caught up</p>
              </div>
            ) : (
              <div className="divide-y">
                {notifications.map(n => (
                  <NotificationItem key={n.id} notification={n} onDismiss={onDismiss} />
                ))}
              </div>
            )
          )}
          {activeTab === "mentions" && (
            mentions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                <AtSign className="h-8 w-8 mb-2 opacity-30" />
                <p className="text-xs">No mentions yet</p>
              </div>
            ) : (
              <div className="divide-y">
                {mentions.map(n => (
                  <NotificationItem key={n.id} notification={n} onDismiss={onDismiss} />
                ))}
              </div>
            )
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="border-t p-2">
          <Link
            href="/notifications"
            className="flex w-full items-center justify-center rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            onClick={() => setOpen(false)}
          >
            See all
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  )
}

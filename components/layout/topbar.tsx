"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Button } from "@/components/ui/button"
import { CommandPalette, type PaletteCommand } from "@/components/ui/command-palette"
import { NotificationDropdown, type Notification } from "@/components/ui/notification-dropdown"
import { useModKey } from "@/hooks/use-mod-key"
import { NAV_GROUPS } from "@/lib/constants"
import { ModeToggle } from "./mode-toggle"
import { UserDropdown } from "./user-dropdown"

// Build commands from nav groups
const NAV_COMMANDS: PaletteCommand[] = NAV_GROUPS.flatMap(group =>
  group.items.flatMap(item => {
    if (item.children) {
      return item.children.map(child => ({
        id: child.href,
        label: `${item.title} › ${child.title}`,
        icon: item.icon,
        group: group.label,
        href: child.href,
      }))
    }
    return [
      {
        id: item.href!,
        label: item.title,
        icon: item.icon,
        group: group.label,
        href: item.href!,
      },
    ]
  })
)

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "mention",
    sender: "Sarah Chen",
    avatarFallback: "SC",
    message: "Sarah left a comment on the Q4 Revenue Report: \"The projections look off — can you double-check the APAC numbers before we share this with the board?\"",
    timestamp: "2 min ago",
    read: false,
  },
  {
    id: "2",
    type: "success",
    sender: "System",
    avatarFallback: "SY",
    message: "Your data export is ready to download. 1,240 user records were exported successfully as a CSV file.",
    timestamp: "14 min ago",
    read: false,
  },
  {
    id: "3",
    type: "mention",
    sender: "James Park",
    avatarFallback: "JP",
    message: "James assigned you to \"Redesign onboarding flow\" in the Mobile App project. The task is marked high priority with a due date of this Friday.",
    timestamp: "1 hr ago",
    read: false,
  },
  {
    id: "4",
    type: "warning",
    sender: "System",
    avatarFallback: "SY",
    message: "API usage has reached 81% of your monthly quota (810K / 1M calls). At the current rate you will hit the limit in approximately 4 days.",
    timestamp: "3 hr ago",
    read: false,
  },
  {
    id: "5",
    type: "info",
    sender: "Priya Nair",
    avatarFallback: "PN",
    message: "Priya commented on the Launch Checklist: \"Staging is updated and all smoke tests are passing. Waiting on your sign-off before we push to production.\"",
    timestamp: "5 hr ago",
    read: true,
  },
  {
    id: "6",
    type: "success",
    sender: "System",
    avatarFallback: "SY",
    message: "Deployment to production completed successfully. Version 2.4.1 is live. Zero errors detected across all health checks and uptime monitors.",
    timestamp: "Yesterday",
    read: true,
  },
  {
    id: "7",
    type: "mention",
    sender: "Tom Rivera",
    avatarFallback: "TR",
    message: "Tom mentioned you in #general: \"Let's loop in the team lead before the client call on Friday — they will want final sign-off on the proposal before it goes out.\"",
    timestamp: "Yesterday",
    read: true,
  },
  {
    id: "8",
    type: "warning",
    sender: "Security",
    avatarFallback: "SE",
    message: "A new sign-in was detected from an unrecognized device (Chrome on Windows) in London, UK. If this was you, no action is needed. If not, secure your account immediately.",
    timestamp: "2 days ago",
    read: true,
  },
]

interface TopbarProps {
  title?: string
}

export const Topbar = ({ title }: TopbarProps) => {
  const modKey = useModKey()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS)

  const handleMarkAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  const handleDismiss = (id: string) => setNotifications(prev => prev.filter(n => n.id !== id))

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarTrigger className="-ml-1" />
            </TooltipTrigger>
            <TooltipContent className="flex items-center gap-1.5">
              Toggle Sidebar
              <KbdGroup>
                <Kbd>{modKey}</Kbd>
                <span>+</span>
                <Kbd>B</Kbd>
              </KbdGroup>
            </TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="mr-2 h-4" />
          {title && <h1 className="text-sm font-medium text-muted-foreground">{title}</h1>}
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* Command palette trigger */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPaletteOpen(true)}
            className="hidden sm:flex items-center gap-2 h-8 px-3 text-muted-foreground text-xs w-48 justify-between">
            <span className="flex items-center gap-1.5">
              <Search className="h-3.5 w-3.5" />
              Search
            </span>
            <KbdGroup>
              <Kbd>{modKey}</Kbd>
              <span>+</span>
              <Kbd>K</Kbd>
            </KbdGroup>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setPaletteOpen(true)} className="sm:hidden h-8 w-8">
            <Search className="h-4 w-4" />
          </Button>

          <NotificationDropdown
            notifications={notifications}
            onMarkAllRead={handleMarkAllRead}
            onDismiss={handleDismiss}
          />
          <ModeToggle />
          <UserDropdown />
        </div>
      </header>

      <CommandPalette commands={NAV_COMMANDS} open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  )
}

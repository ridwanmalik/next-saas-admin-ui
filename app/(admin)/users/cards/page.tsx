import { MoreHorizontal, Mail, Activity } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// ─── Data ─────────────────────────────────────────────────────────────────────

type Plan   = "Free" | "Pro" | "Enterprise"
type Status = "Active" | "Inactive" | "Suspended"
type Role   = "Admin" | "Member" | "Viewer"

type User = {
  id: string
  name: string
  email: string
  role: Role
  plan: Plan
  status: Status
  sessions: number
  joined: string
  initials: string
  avatarColor: string
}

const USERS: User[] = [
  { id: "USR-001", name: "Alice Johnson",  email: "alice@acme.com",        role: "Admin",  plan: "Enterprise", status: "Active",    sessions: 312, joined: "Jan 2025",  initials: "AJ", avatarColor: "bg-violet-500"  },
  { id: "USR-002", name: "Marcus Rivera",  email: "marcus@startup.io",     role: "Member", plan: "Pro",        status: "Active",    sessions: 204, joined: "Jan 2025",  initials: "MR", avatarColor: "bg-blue-500"    },
  { id: "USR-003", name: "Priya Nair",     email: "priya@techcorp.com",    role: "Member", plan: "Pro",        status: "Active",    sessions: 178, joined: "Feb 2025",  initials: "PN", avatarColor: "bg-emerald-500" },
  { id: "USR-004", name: "James Okonkwo",  email: "james@bigco.com",       role: "Admin",  plan: "Enterprise", status: "Active",    sessions: 429, joined: "Feb 2025",  initials: "JO", avatarColor: "bg-amber-500"   },
  { id: "USR-005", name: "Sofia Chen",     email: "sofia@designlab.co",    role: "Viewer", plan: "Free",       status: "Active",    sessions: 44,  joined: "Feb 2025",  initials: "SC", avatarColor: "bg-pink-500"    },
  { id: "USR-006", name: "Liam Barrett",   email: "liam@agencyx.com",      role: "Member", plan: "Pro",        status: "Inactive",  sessions: 9,   joined: "Mar 2025",  initials: "LB", avatarColor: "bg-slate-500"   },
  { id: "USR-007", name: "Amara Diallo",   email: "amara@ngocorp.org",     role: "Member", plan: "Pro",        status: "Active",    sessions: 156, joined: "Mar 2025",  initials: "AD", avatarColor: "bg-teal-500"    },
  { id: "USR-008", name: "Noah Williams",  email: "noah@freelance.dev",    role: "Viewer", plan: "Free",       status: "Active",    sessions: 28,  joined: "Mar 2025",  initials: "NW", avatarColor: "bg-orange-500"  },
  { id: "USR-009", name: "Elena Kim",      email: "elena@kstudio.co",      role: "Member", plan: "Pro",        status: "Active",    sessions: 93,  joined: "Apr 2025",  initials: "EK", avatarColor: "bg-cyan-500"    },
  { id: "USR-010", name: "David Park",     email: "david@fintech.io",      role: "Admin",  plan: "Enterprise", status: "Active",    sessions: 381, joined: "Apr 2025",  initials: "DP", avatarColor: "bg-indigo-500"  },
  { id: "USR-011", name: "Isabel Torres",  email: "isabel@mediahouse.com", role: "Member", plan: "Pro",        status: "Suspended", sessions: 2,   joined: "Apr 2025",  initials: "IT", avatarColor: "bg-rose-500"    },
  { id: "USR-012", name: "Ryan Murphy",    email: "ryan@cloudbase.io",     role: "Viewer", plan: "Free",       status: "Active",    sessions: 61,  joined: "May 2025",  initials: "RM", avatarColor: "bg-lime-600"    },
]

// ─── Style maps ───────────────────────────────────────────────────────────────

const planVariant: Record<Plan, "default" | "outline" | "secondary"> = {
  Enterprise: "default",
  Pro:        "outline",
  Free:       "secondary",
}

const statusDot: Record<Status, string> = {
  Active:    "bg-emerald-500",
  Inactive:  "bg-muted-foreground",
  Suspended: "bg-red-500",
}

const roleStyle: Record<Role, string> = {
  Admin:  "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  Member: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Viewer: "bg-muted text-muted-foreground",
}

// ─── Card ─────────────────────────────────────────────────────────────────────

const UserCard = ({ user }: { user: User }) => (
  <Card className="relative overflow-hidden">
    <CardContent className="p-5">
      {/* Menu */}
      <div className="absolute top-3 right-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem className="gap-2">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              Send email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
              Remove user
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Avatar + status */}
      <div className="flex flex-col items-center text-center gap-3">
        <div className="relative">
          <Avatar className={cn("h-14 w-14", user.avatarColor)}>
            <AvatarFallback className={cn("text-sm font-semibold text-white", user.avatarColor)}>
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <span className={cn("absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full ring-2 ring-card", statusDot[user.status])} />
        </div>

        <div>
          <p className="font-semibold text-sm leading-tight">{user.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>
        </div>

        <div className="flex items-center gap-1.5">
          <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium", roleStyle[user.role])}>
            {user.role}
          </span>
          <Badge variant={planVariant[user.plan]} className="text-[10px] px-1.5 h-4">
            {user.plan}
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-2 divide-x rounded-lg border bg-muted/30">
        <div className="flex flex-col items-center py-2.5">
          <span className="text-sm font-semibold tabular-nums">{user.sessions.toLocaleString()}</span>
          <span className="text-[10px] text-muted-foreground mt-0.5">Sessions</span>
        </div>
        <div className="flex flex-col items-center py-2.5">
          <span className="text-sm font-semibold">{user.joined}</span>
          <span className="text-[10px] text-muted-foreground mt-0.5">Joined</span>
        </div>
      </div>
    </CardContent>
  </Card>
)

// ─── Page ─────────────────────────────────────────────────────────────────────

const UserCardsPage = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Users</h2>
      <p className="text-sm text-muted-foreground mt-0.5">{USERS.length} users</p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {USERS.map(user => <UserCard key={user.id} user={user} />)}
    </div>
  </div>
)

export default UserCardsPage

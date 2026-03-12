"use client"

import { useState } from "react"
import { ClipboardCopy, Eye, MoreHorizontal, Pencil, ShieldOff, ShieldCheck, Trash2, UserPlus } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable, MultiSelectFilter, type DataTableColumn } from "@/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

// ─── Types & Data ─────────────────────────────────────────────────────────────

type Plan   = "Free" | "Pro" | "Enterprise"
type Status = "Active" | "Inactive" | "Suspended"
type Role   = "Admin" | "Member" | "Viewer"

type User = {
  id: string
  name: string
  email: string
  plan: Plan
  status: Status
  role: Role
  sessions: number
  joined: string
}

const USERS: User[] = [
  { id: "USR-001", name: "Alice Johnson",   email: "alice@acme.com",        plan: "Enterprise", status: "Active",    role: "Admin",  sessions: 312, joined: "Jan 12, 2025" },
  { id: "USR-002", name: "Marcus Rivera",   email: "marcus@startup.io",     plan: "Pro",        status: "Active",    role: "Member", sessions: 204, joined: "Jan 28, 2025" },
  { id: "USR-003", name: "Priya Nair",      email: "priya@techcorp.com",    plan: "Pro",        status: "Active",    role: "Member", sessions: 178, joined: "Feb 3, 2025"  },
  { id: "USR-004", name: "James Okonkwo",   email: "james@bigco.com",       plan: "Enterprise", status: "Active",    role: "Admin",  sessions: 429, joined: "Feb 14, 2025" },
  { id: "USR-005", name: "Sofia Chen",      email: "sofia@designlab.co",    plan: "Free",       status: "Active",    role: "Viewer", sessions: 44,  joined: "Feb 22, 2025" },
  { id: "USR-006", name: "Liam Barrett",    email: "liam@agencyx.com",      plan: "Pro",        status: "Inactive",  role: "Member", sessions: 9,   joined: "Mar 5, 2025"  },
  { id: "USR-007", name: "Amara Diallo",    email: "amara@ngocorp.org",     plan: "Pro",        status: "Active",    role: "Member", sessions: 156, joined: "Mar 18, 2025" },
  { id: "USR-008", name: "Noah Williams",   email: "noah@freelance.dev",    plan: "Free",       status: "Active",    role: "Viewer", sessions: 28,  joined: "Mar 29, 2025" },
  { id: "USR-009", name: "Elena Kim",       email: "elena@kstudio.co",      plan: "Pro",        status: "Active",    role: "Member", sessions: 93,  joined: "Apr 7, 2025"  },
  { id: "USR-010", name: "David Park",      email: "david@fintech.io",      plan: "Enterprise", status: "Active",    role: "Admin",  sessions: 381, joined: "Apr 11, 2025" },
  { id: "USR-011", name: "Isabel Torres",   email: "isabel@mediahouse.com", plan: "Pro",        status: "Suspended", role: "Member", sessions: 2,   joined: "Apr 20, 2025" },
  { id: "USR-012", name: "Ryan Murphy",     email: "ryan@cloudbase.io",     plan: "Free",       status: "Active",    role: "Viewer", sessions: 61,  joined: "May 1, 2025"  },
  { id: "USR-013", name: "Fatima Al-Amin",  email: "fatima@growthco.com",   plan: "Enterprise", status: "Active",    role: "Member", sessions: 247, joined: "May 9, 2025"  },
  { id: "USR-014", name: "Tom Henriksen",   email: "tom@norddata.no",       plan: "Pro",        status: "Active",    role: "Member", sessions: 118, joined: "May 17, 2025" },
  { id: "USR-015", name: "Layla Hassan",    email: "layla@consult.ae",      plan: "Pro",        status: "Inactive",  role: "Viewer", sessions: 7,   joined: "May 24, 2025" },
  { id: "USR-016", name: "Chris Watkins",   email: "chris@saasbuilder.io",  plan: "Free",       status: "Active",    role: "Viewer", sessions: 35,  joined: "Jun 2, 2025"  },
  { id: "USR-017", name: "Mei Lin",         email: "mei@techventures.cn",   plan: "Enterprise", status: "Active",    role: "Admin",  sessions: 502, joined: "Jun 10, 2025" },
  { id: "USR-018", name: "Samuel Osei",     email: "samuel@accratech.gh",   plan: "Free",       status: "Active",    role: "Viewer", sessions: 19,  joined: "Jun 21, 2025" },
  { id: "USR-019", name: "Hannah Brooks",   email: "hannah@remotework.co",  plan: "Pro",        status: "Active",    role: "Member", sessions: 143, joined: "Jul 3, 2025"  },
  { id: "USR-020", name: "Omar Shaikh",     email: "omar@launchpad.pk",     plan: "Pro",        status: "Suspended", role: "Member", sessions: 0,   joined: "Jul 14, 2025" },
  { id: "USR-021", name: "Chloe Dupont",    email: "chloe@parisdev.fr",     plan: "Free",       status: "Active",    role: "Viewer", sessions: 52,  joined: "Jul 22, 2025" },
  { id: "USR-022", name: "Arjun Mehta",     email: "arjun@productify.in",   plan: "Enterprise", status: "Active",    role: "Member", sessions: 291, joined: "Aug 5, 2025"  },
  { id: "USR-023", name: "Zara O'Brien",    email: "zara@dublinstudio.ie",  plan: "Pro",        status: "Active",    role: "Member", sessions: 87,  joined: "Aug 19, 2025" },
  { id: "USR-024", name: "Lucas Ferreira",  email: "lucas@devhouse.br",     plan: "Free",       status: "Inactive",  role: "Viewer", sessions: 4,   joined: "Sep 1, 2025"  },
  { id: "USR-025", name: "Nadia Petrov",    email: "nadia@techlab.ru",      plan: "Enterprise", status: "Active",    role: "Admin",  sessions: 334, joined: "Sep 15, 2025" },
]

// ─── Style maps ───────────────────────────────────────────────────────────────

const planVariant: Record<Plan, "default" | "outline" | "secondary"> = {
  Enterprise: "default",
  Pro:        "outline",
  Free:       "secondary",
}

const statusStyle: Record<Status, string> = {
  Active:    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Inactive:  "bg-muted text-muted-foreground",
  Suspended: "bg-red-500/10 text-red-600 dark:text-red-400",
}

const roleStyle: Record<Role, string> = {
  Admin:  "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  Member: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Viewer: "bg-muted text-muted-foreground",
}

const initials = (name: string) =>
  name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)

// ─── Actions cell ─────────────────────────────────────────────────────────────

const UserActions = ({ user }: { user: User }) => (
  <div className="flex items-center justify-end gap-0.5">

    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
          <Eye className="h-3.5 w-3.5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>View profile</TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
          <Pencil className="h-3.5 w-3.5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Edit user</TooltipContent>
    </Tooltip>

    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
              <MoreHorizontal className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>More actions</TooltipContent>
      </Tooltip>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(user.id)}
          className="gap-2"
        >
          <ClipboardCopy className="h-3.5 w-3.5 text-muted-foreground" />
          Copy user ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2">
          <Eye className="h-3.5 w-3.5 text-muted-foreground" />
          View profile
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
          Edit user
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {user.status === "Suspended" ? (
          <DropdownMenuItem className="gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground" />
            Unsuspend
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="gap-2 text-amber-600 dark:text-amber-400 focus:text-amber-600">
            <ShieldOff className="h-3.5 w-3.5" />
            Suspend user
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
          <Trash2 className="h-3.5 w-3.5" />
          Delete user
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  </div>
)

// ─── Columns ──────────────────────────────────────────────────────────────────

const columns: DataTableColumn<User>[] = [
  {
    key: "name",
    header: "User",
    sortable: true,
    hideable: false,
    render: row => (
      <div className="flex items-center gap-3">
        <Avatar className="h-7 w-7 shrink-0">
          <AvatarFallback className="text-[10px] font-semibold">{initials(row.name)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="font-medium leading-none truncate">{row.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{row.email}</p>
        </div>
      </div>
    ),
  },
  {
    key: "plan",
    header: "Plan",
    sortable: true,
    hideBelow: "sm",
    render: row => (
      <Badge variant={planVariant[row.plan]} className="text-xs">{row.plan}</Badge>
    ),
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: row => (
      <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", statusStyle[row.status])}>
        {row.status}
      </span>
    ),
  },
  {
    key: "role",
    header: "Role",
    sortable: true,
    hideBelow: "md",
    render: row => (
      <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", roleStyle[row.role])}>
        {row.role}
      </span>
    ),
  },
  {
    key: "sessions",
    header: "Sessions",
    sortable: true,
    align: "right",
    hideBelow: "lg",
    render: row => (
      <span className="tabular-nums font-medium">{row.sessions.toLocaleString()}</span>
    ),
  },
  {
    key: "joined",
    header: "Joined",
    sortable: true,
    align: "right",
    hideBelow: "md",
    render: row => (
      <span className="text-muted-foreground">{row.joined}</span>
    ),
  },
  {
    key: "actions",
    header: "",
    hideable: false,
    align: "right",
    render: row => <UserActions user={row} />,
  },
]

// ─── Filter options ───────────────────────────────────────────────────────────

const STATUS_OPTIONS = (["Active", "Inactive", "Suspended"] as Status[]).map(s => ({
  value: s,
  label: s,
  count: USERS.filter(u => u.status === s).length,
}))

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UsersPage() {
  const [activeStatuses, setActiveStatuses] = useState<Set<string>>(new Set())

  const filteredUsers = activeStatuses.size === 0
    ? USERS
    : USERS.filter(u => activeStatuses.has(u.status))

  return (
    <div className="space-y-6">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Users</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          {USERS.length} total users
        </p>
      </div>

      {/* ── Table ───────────────────────────────────────────────── */}
      <DataTable
        columns={columns}
        data={filteredUsers}
        defaultPageSize={10}
        pageSizeOptions={[5, 10, 25]}
        searchPlaceholder="Search users..."
        toolbarFilters={
          <MultiSelectFilter
            label="Status"
            options={STATUS_OPTIONS}
            value={activeStatuses}
            onChange={setActiveStatuses}
          />
        }
        toolbarActions={
          <Button size="sm" className="h-8 gap-1.5 text-xs">
            <UserPlus className="h-3.5 w-3.5" />
            Add user
          </Button>
        }
      />
    </div>
  )
}

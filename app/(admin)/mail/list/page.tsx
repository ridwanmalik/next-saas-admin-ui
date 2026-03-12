"use client"

import { useState } from "react"
import { MoreHorizontal, Reply, Archive, Trash2, Star, Pencil } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

// ─── Types ────────────────────────────────────────────────────────────────────

type Folder = "Inbox" | "Sent" | "Drafts" | "Starred" | "Archive" | "Trash"
type Label  = "Work" | "Personal" | "Finance" | "Urgent"

type EmailRow = {
  id: string
  from: string
  fromEmail: string
  avatar: string
  avatarFallback: string
  avatarColor: string
  subject: string
  preview: string
  time: string
  read: boolean
  starred: boolean
  folder: Folder
  labels: Label[]
  hasAttachment: boolean
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const EMAILS: EmailRow[] = [
  {
    id: "1",
    from: "Sarah Chen",
    fromEmail: "sarah@designlab.co",
    avatar: "https://i.pravatar.cc/80?img=5",
    avatarFallback: "SC",
    avatarColor: "bg-pink-500",
    subject: "Dashboard redesign — final mockups",
    preview: "Hey! I've finished the final round of mockups for the dashboard redesign...",
    time: "9:53 AM",
    read: false,
    starred: true,
    folder: "Inbox",
    labels: ["Work"],
    hasAttachment: true,
  },
  {
    id: "2",
    from: "James Okonkwo",
    fromEmail: "james@bigco.com",
    avatar: "https://i.pravatar.cc/80?img=12",
    avatarFallback: "JO",
    avatarColor: "bg-amber-500",
    subject: "Auth refactor — ready to merge",
    preview: "The auth refactor PR is ready for your final review. All tests passing...",
    time: "8:41 AM",
    read: false,
    starred: false,
    folder: "Inbox",
    labels: ["Work", "Urgent"],
    hasAttachment: false,
  },
  {
    id: "3",
    from: "Stripe",
    fromEmail: "receipts@stripe.com",
    avatar: "",
    avatarFallback: "ST",
    avatarColor: "bg-indigo-500",
    subject: "Your invoice from Stripe — $299.00",
    preview: "Your monthly invoice for the Pro plan is ready to view...",
    time: "Jul 31",
    read: true,
    starred: false,
    folder: "Inbox",
    labels: ["Finance"],
    hasAttachment: true,
  },
  {
    id: "4",
    from: "Priya Nair",
    fromEmail: "priya@techcorp.com",
    avatar: "https://i.pravatar.cc/80?img=9",
    avatarFallback: "PN",
    avatarColor: "bg-emerald-500",
    subject: "Q3 campaign wrap-up report",
    preview: "Attached is the full Q3 campaign wrap-up report. Key highlights inside...",
    time: "Jul 30",
    read: true,
    starred: true,
    folder: "Inbox",
    labels: ["Work"],
    hasAttachment: true,
  },
  {
    id: "5",
    from: "GitHub",
    fromEmail: "noreply@github.com",
    avatar: "",
    avatarFallback: "GH",
    avatarColor: "bg-slate-600",
    subject: "[bigco/platform] PR #482 approved by Elena Kim",
    preview: "Elena Kim approved pull request #482: Auth refactor — JWT migration...",
    time: "Jul 30",
    read: true,
    starred: false,
    folder: "Inbox",
    labels: ["Work"],
    hasAttachment: false,
  },
  {
    id: "6",
    from: "David Park",
    fromEmail: "david@fintech.io",
    avatar: "https://i.pravatar.cc/80?img=15",
    avatarFallback: "DP",
    avatarColor: "bg-indigo-500",
    subject: "Q3 budget review notes",
    preview: "Sharing my notes from the Q3 budget review. A few items to flag...",
    time: "Jul 29",
    read: true,
    starred: false,
    folder: "Inbox",
    labels: ["Finance", "Work"],
    hasAttachment: false,
  },
  {
    id: "7",
    from: "Amara Diallo",
    fromEmail: "amara@ngocorp.org",
    avatar: "https://i.pravatar.cc/80?img=23",
    avatarFallback: "AD",
    avatarColor: "bg-teal-500",
    subject: "Acme Corp onboarding — follow-up",
    preview: "Just wanted to share a follow-up from the Acme onboarding session...",
    time: "Jul 28",
    read: true,
    starred: false,
    folder: "Inbox",
    labels: ["Work"],
    hasAttachment: false,
  },
  {
    id: "8",
    from: "Layla Hassan",
    fromEmail: "layla@consult.ae",
    avatar: "https://i.pravatar.cc/80?img=44",
    avatarFallback: "LH",
    avatarColor: "bg-violet-500",
    subject: "Product launch blog post — ready to review",
    preview: "The blog post for the product launch is ready for your review...",
    time: "Jul 27",
    read: true,
    starred: false,
    folder: "Inbox",
    labels: ["Work"],
    hasAttachment: true,
  },
  {
    id: "9",
    from: "Noah Williams",
    fromEmail: "noah@freelance.dev",
    avatar: "https://i.pravatar.cc/80?img=60",
    avatarFallback: "NW",
    avatarColor: "bg-lime-600",
    subject: "QA regression results — July build",
    preview: "Regression suite complete. 96% pass rate with 3 failures in checkout...",
    time: "Jul 26",
    read: true,
    starred: false,
    folder: "Inbox",
    labels: ["Work"],
    hasAttachment: true,
  },
  {
    id: "10",
    from: "Mei Lin",
    fromEmail: "mei@techventures.cn",
    avatar: "https://i.pravatar.cc/80?img=47",
    avatarFallback: "ML",
    avatarColor: "bg-rose-500",
    subject: "Sprint planning — Q3 final sprint",
    preview: "Agenda for the sprint planning session tomorrow at 10am...",
    time: "Jul 25",
    read: true,
    starred: false,
    folder: "Inbox",
    labels: ["Work"],
    hasAttachment: false,
  },
  {
    id: "11",
    from: "Me",
    fromEmail: "me@company.com",
    avatar: "",
    avatarFallback: "ME",
    avatarColor: "bg-primary",
    subject: "Re: Dashboard redesign — final mockups",
    preview: "Thanks Sarah, the mockups look great! Will review and leave comments...",
    time: "10:15 AM",
    read: true,
    starred: false,
    folder: "Sent",
    labels: ["Work"],
    hasAttachment: false,
  },
  {
    id: "12",
    from: "Me",
    fromEmail: "me@company.com",
    avatar: "",
    avatarFallback: "ME",
    avatarColor: "bg-primary",
    subject: "Q3 OKR review — slides attached",
    preview: "Team, attaching the updated OKR slides ahead of tomorrow's review...",
    time: "Jul 29",
    read: true,
    starred: false,
    folder: "Sent",
    labels: ["Work"],
    hasAttachment: true,
  },
  {
    id: "13",
    from: "Me",
    fromEmail: "me@company.com",
    avatar: "",
    avatarFallback: "ME",
    avatarColor: "bg-primary",
    subject: "Follow-up: partnership proposal",
    preview: "Hi, just following up on the partnership proposal I sent last week...",
    time: "Jul 26",
    read: true,
    starred: false,
    folder: "Sent",
    labels: ["Work"],
    hasAttachment: false,
  },
  {
    id: "14",
    from: "Me",
    fromEmail: "me@company.com",
    avatar: "",
    avatarFallback: "ME",
    avatarColor: "bg-primary",
    subject: "Product update — August 2025",
    preview: "Draft: Our biggest release yet — 3 new integrations, a faster dashboard, and...",
    time: "Today",
    read: true,
    starred: false,
    folder: "Drafts",
    labels: ["Personal"],
    hasAttachment: false,
  },
  {
    id: "15",
    from: "Me",
    fromEmail: "me@company.com",
    avatar: "",
    avatarFallback: "ME",
    avatarColor: "bg-primary",
    subject: "Team offsite — venue ideas",
    preview: "Draft: Hey team, sharing a few venue options I've shortlisted for the...",
    time: "Jul 30",
    read: true,
    starred: false,
    folder: "Drafts",
    labels: ["Personal"],
    hasAttachment: false,
  },
  {
    id: "16",
    from: "Priya Nair",
    fromEmail: "priya@techcorp.com",
    avatar: "https://i.pravatar.cc/80?img=9",
    avatarFallback: "PN",
    avatarColor: "bg-emerald-500",
    subject: "Q3 campaign wrap-up report",
    preview: "Attached is the full Q3 campaign wrap-up report. Key highlights inside...",
    time: "Jul 30",
    read: true,
    starred: true,
    folder: "Starred",
    labels: ["Work"],
    hasAttachment: true,
  },
  {
    id: "17",
    from: "Sarah Chen",
    fromEmail: "sarah@designlab.co",
    avatar: "https://i.pravatar.cc/80?img=5",
    avatarFallback: "SC",
    avatarColor: "bg-pink-500",
    subject: "Dashboard redesign — final mockups",
    preview: "Hey! I've finished the final round of mockups for the dashboard redesign...",
    time: "9:53 AM",
    read: false,
    starred: true,
    folder: "Starred",
    labels: ["Work"],
    hasAttachment: true,
  },
  {
    id: "18",
    from: "Vercel",
    fromEmail: "no-reply@vercel.com",
    avatar: "",
    avatarFallback: "VC",
    avatarColor: "bg-slate-800",
    subject: "Deployment successful — production",
    preview: "Your project next-saas-admin-ui was deployed to production successfully...",
    time: "Jul 28",
    read: true,
    starred: false,
    folder: "Archive",
    labels: ["Work"],
    hasAttachment: false,
  },
  {
    id: "19",
    from: "LinkedIn",
    fromEmail: "messages-noreply@linkedin.com",
    avatar: "",
    avatarFallback: "LI",
    avatarColor: "bg-blue-600",
    subject: "You have 5 new connection requests",
    preview: "See who wants to connect with you on LinkedIn...",
    time: "Jul 25",
    read: true,
    starred: false,
    folder: "Archive",
    labels: ["Personal"],
    hasAttachment: false,
  },
  {
    id: "20",
    from: "Old Vendor",
    fromEmail: "sales@oldvendor.com",
    avatar: "",
    avatarFallback: "OV",
    avatarColor: "bg-gray-500",
    subject: "Limited time offer — renew your subscription",
    preview: "Your subscription is expiring soon. Renew now for 20% off...",
    time: "Jul 20",
    read: true,
    starred: false,
    folder: "Trash",
    labels: [],
    hasAttachment: false,
  },
]

// ─── Style maps ───────────────────────────────────────────────────────────────

const LABEL_STYLE: Record<Label, string> = {
  Work:     "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Personal: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  Finance:  "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Urgent:   "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
}

const FOLDER_STYLE: Record<Folder, string> = {
  Inbox:   "bg-muted text-muted-foreground",
  Sent:    "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Drafts:  "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Starred: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  Archive: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  Trash:   "bg-red-500/10 text-red-500 dark:text-red-400",
}

// ─── Actions ──────────────────────────────────────────────────────────────────

const EmailActions = ({ email }: { email: EmailRow }) => (
  <div className="flex items-center justify-end gap-0.5">
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
          <Reply className="h-3.5 w-3.5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Reply</TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
          <Archive className="h-3.5 w-3.5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Archive</TooltipContent>
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
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem className="gap-2">
          <Reply className="h-3.5 w-3.5 text-muted-foreground" />
          Reply
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <Star className="h-3.5 w-3.5 text-muted-foreground" />
          {email.starred ? "Unstar" : "Star"}
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
          Mark as {email.read ? "unread" : "read"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
)

// ─── Columns ──────────────────────────────────────────────────────────────────

const columns: DataTableColumn<EmailRow>[] = [
  {
    key: "from",
    header: "From",
    sortable: true,
    hideable: false,
    render: row => (
      <div className="flex items-center gap-2.5 min-w-0">
        <Avatar className="h-7 w-7 shrink-0">
          {row.avatar && <AvatarImage src={row.avatar} alt={row.from} />}
          <AvatarFallback className={cn("text-[10px] font-semibold text-white", row.avatarColor)}>
            {row.avatarFallback}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className={cn("text-sm truncate", !row.read && "font-semibold")}>{row.from}</p>
          <p className="text-[11px] text-muted-foreground truncate">{row.fromEmail}</p>
        </div>
      </div>
    ),
  },
  {
    key: "subject",
    header: "Subject",
    sortable: true,
    render: row => (
      <div className="min-w-0">
        <p className={cn("text-sm truncate", !row.read && "font-medium")}>{row.subject}</p>
        <p className="text-[11px] text-muted-foreground truncate">{row.preview}</p>
      </div>
    ),
  },
  {
    key: "folder",
    header: "Folder",
    sortable: true,
    hideBelow: "md",
    render: row => (
      <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", FOLDER_STYLE[row.folder])}>
        {row.folder}
      </span>
    ),
  },
  {
    key: "labels",
    header: "Labels",
    hideBelow: "lg",
    render: row => row.labels.length > 0 ? (
      <div className="flex items-center gap-1 flex-wrap">
        {row.labels.map(label => (
          <Badge key={label} variant="outline" className={cn("text-xs border", LABEL_STYLE[label])}>
            {label}
          </Badge>
        ))}
      </div>
    ) : (
      <span className="text-xs text-muted-foreground">—</span>
    ),
  },
  {
    key: "time",
    header: "Date",
    sortable: true,
    align: "right",
    hideBelow: "sm",
    render: row => (
      <span className={cn("text-xs", !row.read ? "text-foreground font-medium" : "text-muted-foreground")}>
        {row.time}
      </span>
    ),
  },
  {
    key: "actions",
    header: "",
    hideable: false,
    align: "right",
    render: row => <EmailActions email={row} />,
  },
]

// ─── Filter options ───────────────────────────────────────────────────────────

const FOLDER_OPTIONS = (["Inbox", "Sent", "Drafts", "Starred", "Archive", "Trash"] as Folder[]).map(f => ({
  value: f,
  label: f,
  count: EMAILS.filter(e => e.folder === f).length,
}))

const LABEL_OPTIONS = (["Work", "Personal", "Finance", "Urgent"] as Label[]).map(l => ({
  value: l,
  label: l,
  count: EMAILS.filter(e => e.labels.includes(l)).length,
}))

// ─── Page ─────────────────────────────────────────────────────────────────────

const MailListPage = () => {
  const [activeFolders, setActiveFolders] = useState<Set<string>>(new Set())
  const [activeLabels,  setActiveLabels]  = useState<Set<string>>(new Set())

  const filtered = EMAILS.filter(e =>
    (activeFolders.size === 0 || activeFolders.has(e.folder)) &&
    (activeLabels.size  === 0 || e.labels.some(l => activeLabels.has(l)))
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">All Mail</h2>
        <p className="text-sm text-muted-foreground mt-0.5">{EMAILS.length} messages</p>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        defaultPageSize={10}
        pageSizeOptions={[10, 25, 50]}
        searchPlaceholder="Search mail…"
        toolbarFilters={<>
          <MultiSelectFilter label="Folder" options={FOLDER_OPTIONS} value={activeFolders} onChange={setActiveFolders} />
          <MultiSelectFilter label="Label"  options={LABEL_OPTIONS}  value={activeLabels}  onChange={setActiveLabels}  />
        </>}
        toolbarActions={
          <Button size="sm" className="h-8 gap-1.5 text-xs">
            <Pencil className="h-3.5 w-3.5" />
            Compose
          </Button>
        }
      />
    </div>
  )
}

export default MailListPage

"use client"

import { useState } from "react"
import {
  Inbox, Send, FileText, Trash2, Star, Archive,
  Tag, AlertCircle, Search, Pencil, Reply, Forward,
  MoreHorizontal, Paperclip, ChevronDown, RefreshCw,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

import { EmailRow } from "./_components/email-row"

// ─── Types ────────────────────────────────────────────────────────────────────

type Folder = "inbox" | "sent" | "drafts" | "starred" | "archive" | "trash"
type Label  = "Work" | "Personal" | "Finance" | "Urgent"

type Email = {
  id: string
  from: string
  fromEmail: string
  avatar: string
  avatarFallback: string
  avatarColor: string
  subject: string
  preview: string
  body: string
  time: string
  read: boolean
  starred: boolean
  folder: Folder
  labels: Label[]
  attachments?: string[]
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const EMAILS: Email[] = [
  {
    id: "1",
    from: "Sarah Chen",
    fromEmail: "sarah@designlab.co",
    avatar: "https://i.pravatar.cc/80?img=5",
    avatarFallback: "SC",
    avatarColor: "bg-pink-500",
    subject: "Dashboard redesign — final mockups",
    preview: "Hey! I've finished the final round of mockups for the dashboard redesign...",
    body: `Hey!\n\nI've finished the final round of mockups for the dashboard redesign. I'm really happy with how the card layout turned out — it feels much cleaner than the previous version.\n\nI've addressed all the feedback from last week's review:\n• Reduced visual noise in the stat cards\n• Updated the chart color palette\n• Added the collapsible sidebar behaviour on smaller screens\n• Tightened up the topbar spacing\n\nThe Figma file is updated. Let me know if you'd like to jump on a quick call to walk through it, or feel free to leave comments directly in the file.\n\nLet me know your thoughts!\n\nSarah`,
    time: "9:53 AM",
    read: false,
    starred: true,
    folder: "inbox",
    labels: ["Work"],
    attachments: ["dashboard-v3.fig", "design-tokens.json"],
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
    body: `Hi,\n\nThe auth refactor PR is ready for your final review. Here's a summary of what changed:\n\n• Replaced legacy session tokens with short-lived JWTs\n• Added refresh token rotation\n• Migrated all endpoints to the new middleware\n• 94% test coverage on the new flows\n\nThe PR has already been reviewed by Elena and Tom. Only needs your sign-off before we can merge and deploy to staging tomorrow morning.\n\nLink: github.com/bigco/platform/pull/482\n\nThanks,\nJames`,
    time: "8:41 AM",
    read: false,
    starred: false,
    folder: "inbox",
    labels: ["Work", "Urgent"],
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
    body: `Hello,\n\nYour monthly invoice is ready.\n\nAmount due: $299.00\nPlan: Enterprise\nBilling period: July 1 – July 31, 2025\nPayment method: Visa ending in 4242\n\nPayment will be automatically charged on August 1, 2025.\n\nYou can view and download your invoice at stripe.com/invoices.\n\nThank you for your business.\n\nThe Stripe Team`,
    time: "Jul 31",
    read: true,
    starred: false,
    folder: "inbox",
    labels: ["Finance"],
    attachments: ["invoice-july-2025.pdf"],
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
    body: `Hi,\n\nAttached is the full Q3 campaign wrap-up report. Here are the key highlights:\n\n• CTR up 32% vs Q2\n• Conversions up 18% vs Q2\n• LinkedIn drove the most qualified traffic\n• Email was a close second\n• Total leads generated: 1,840\n\nWe're already planning Q4 with a similar channel mix, doubling down on LinkedIn sponsored content and refining the email segmentation.\n\nFull breakdown is in the attached PDF. Happy to walk through it on a call if useful.\n\nPriya`,
    time: "Jul 30",
    read: true,
    starred: true,
    folder: "inbox",
    labels: ["Work"],
    attachments: ["q3-campaign-report.pdf"],
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
    body: `Elena Kim approved pull request #482.\n\nAuth refactor — JWT migration\nbigco/platform\n\nView pull request → github.com/bigco/platform/pull/482\n\n—\nYou are receiving this because you are subscribed to this thread.`,
    time: "Jul 30",
    read: true,
    starred: false,
    folder: "inbox",
    labels: ["Work"],
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
    body: `Hi,\n\nSharing my notes from the Q3 budget review:\n\n1. Infra spend is elevated but within tolerance — flagged as a temporary spike due to the migration\n2. Headcount projection for Q4 is approved\n3. The new vendor contract is under legal review\n4. Travel budget is underspent — carry-over approved to Q4\n\nI've approved the outstanding invoices. Payment is scheduled for this Friday.\n\nLet me know if you have questions.\n\nDavid`,
    time: "Jul 29",
    read: true,
    starred: false,
    folder: "inbox",
    labels: ["Finance", "Work"],
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
    body: `Hi,\n\nJust wanted to share a quick follow-up from the Acme Corp onboarding session yesterday.\n\nThey're very happy with the product and are planning to go live next week. A few things they asked about that we should follow up on:\n\n1. SSO configuration — they want SAML, not OIDC\n2. Webhook documentation — they'd like more examples\n3. Custom domain support — is this on the roadmap?\n\nI'll send them a follow-up email today with the answers we have. Can you check on #3?\n\nThanks!\nAmara`,
    time: "Jul 28",
    read: true,
    starred: false,
    folder: "inbox",
    labels: ["Work"],
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
    body: `Hi,\n\nThe blog post for the product launch is ready for your review. I've focused the angle on developer experience improvements — the audience is technical founders and senior engineers.\n\nThe CTA links to:\n• Start free trial\n• API documentation\n\nShared doc link: docs.google.com/...\n\nPlease leave comments directly in the doc. Planning to submit for publish approval by end of day Thursday.\n\nThanks,\nLayla`,
    time: "Jul 27",
    read: true,
    starred: false,
    folder: "inbox",
    labels: ["Work"],
    attachments: ["blog-draft-v2.docx"],
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
    body: `Hi,\n\nThe regression suite for the July build is complete. Summary:\n\n• Total tests: 340\n• Passed: 326 (96%)\n• Failed: 3\n• Flaky: 11\n\nAll 3 failures are in the checkout flow — tickets logged:\n• PLAT-1821: Amount rounding error on international currencies\n• PLAT-1822: Coupon code field doesn't clear on error\n• PLAT-1823: Order summary doesn't update on quantity change\n\nFlaky tests are mostly timing-related in the payment step. Recommending we add artificial waits or switch to polling assertions.\n\nNoah`,
    time: "Jul 26",
    read: true,
    starred: false,
    folder: "inbox",
    labels: ["Work"],
    attachments: ["regression-report-july.xlsx"],
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
    body: `Hi everyone,\n\nAgenda for tomorrow's sprint planning at 10am:\n\n1. Review velocity from last sprint\n2. Prioritise backlog items for final Q3 sprint\n3. Confirm stretch goals (PDF export is deferred to Q4)\n4. Assign owners\n\nPlease come prepared with your estimates. The Jira board has been updated with the candidate items.\n\nSee you tomorrow!\nMei`,
    time: "Jul 25",
    read: true,
    starred: false,
    folder: "inbox",
    labels: ["Work"],
  },
]

// ─── Sidebar folders ──────────────────────────────────────────────────────────

const FOLDERS: { id: Folder; label: string; icon: React.ElementType }[] = [
  { id: "inbox",   label: "Inbox",   icon: Inbox    },
  { id: "sent",    label: "Sent",    icon: Send     },
  { id: "drafts",  label: "Drafts",  icon: FileText },
  { id: "starred", label: "Starred", icon: Star     },
  { id: "archive", label: "Archive", icon: Archive  },
  { id: "trash",   label: "Trash",   icon: Trash2   },
]

const LABEL_STYLE: Record<Label, string> = {
  Work:     "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Personal: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Finance:  "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Urgent:   "bg-red-500/10 text-red-600 dark:text-red-400",
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const MailPage = () => {
  const [folder, setFolder]   = useState<Folder>("inbox")
  const [activeId, setActiveId] = useState<string | null>(EMAILS[0].id)
  const [emails, setEmails]   = useState(EMAILS)
  const [search, setSearch]   = useState("")

  const folderEmails = emails.filter(e =>
    e.folder === folder &&
    (e.from.toLowerCase().includes(search.toLowerCase()) ||
     e.subject.toLowerCase().includes(search.toLowerCase()))
  )

  const active = emails.find(e => e.id === activeId) ?? null

  const openEmail = (id: string) => {
    setActiveId(id)
    setEmails(prev => prev.map(e => e.id === id ? { ...e, read: true } : e))
  }

  const unread = (f: Folder) => emails.filter(e => e.folder === f && !e.read).length

  return (
    <div className="flex h-[calc(100svh-4rem-1px)] -m-4 md:-m-6 overflow-hidden">

      {/* ── Folders sidebar ──────────────────────────────────── */}
      <div className="flex w-52 shrink-0 flex-col border-r bg-card">
        <div className="p-3">
          <Button size="sm" className="w-full gap-1.5">
            <Pencil className="h-3.5 w-3.5" />
            Compose
          </Button>
        </div>
        <Separator />
        <nav className="flex-1 p-2 space-y-0.5">
          {FOLDERS.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant="ghost"
              size="sm"
              onClick={() => { setFolder(id); setActiveId(null) }}
              className={cn(
                "w-full justify-start gap-2.5 px-3",
                folder === id ? "bg-muted font-medium hover:bg-muted" : "text-muted-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1 text-left">{label}</span>
              {unread(id) > 0 && (
                <span className="text-xs font-semibold text-primary">{unread(id)}</span>
              )}
            </Button>
          ))}
        </nav>
        <Separator />
        <div className="p-3 space-y-0.5">
          <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Labels</p>
          {(Object.keys(LABEL_STYLE) as Label[]).map(l => (
            <Button key={l} variant="ghost" size="sm" className="w-full justify-start gap-2.5 px-3 text-muted-foreground">
              <Tag className="h-3.5 w-3.5 shrink-0" />
              {l}
            </Button>
          ))}
        </div>
      </div>

      {/* ── Email list ───────────────────────────────────────── */}
      <div className="flex w-80 shrink-0 flex-col border-r">
        <div className="flex items-center gap-2 border-b px-3 py-2.5">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search mail…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-8 h-8 text-sm"
            />
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-muted-foreground">
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {folderEmails.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground">
              <AlertCircle className="h-8 w-8 opacity-30" />
              <p className="text-sm">No emails here</p>
            </div>
          ) : (
            folderEmails.map(email => (
              <EmailRow
                key={email.id}
                email={email}
                active={email.id === activeId}
                onClick={() => openEmail(email.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* ── Email detail ─────────────────────────────────────── */}
      <div className="flex flex-1 flex-col min-w-0">
        {active ? (
          <>
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-2 border-b px-4 py-2.5 shrink-0">
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="gap-1.5 h-8 text-xs">
                  <Reply className="h-3.5 w-3.5" />Reply
                </Button>
                <Button variant="ghost" size="sm" className="gap-1.5 h-8 text-xs">
                  <Forward className="h-3.5 w-3.5" />Forward
                </Button>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <Archive className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <Trash2 className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuItem className="gap-2">
                      <Star className="h-3.5 w-3.5 text-muted-foreground" />Star
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Tag className="h-3.5 w-3.5 text-muted-foreground" />Add label
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <FileText className="h-3.5 w-3.5 text-muted-foreground" />Mark as unread
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Email content */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <h1 className="text-lg font-semibold leading-tight">{active.subject}</h1>

              <div className="flex items-start justify-between gap-4 mt-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarImage src={active.avatar} alt={active.from} />
                    <AvatarFallback className={cn("text-sm font-semibold text-white", active.avatarColor)}>
                      {active.avatarFallback}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{active.from}</p>
                      {active.labels.map(l => (
                        <span key={l} className={cn("inline-flex items-center rounded-full px-1.5 py-0 text-[10px] font-medium", LABEL_STYLE[l])}>
                          {l}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">{active.fromEmail}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{active.time}</span>
              </div>

              <Separator className="my-4" />

              <div className="text-sm leading-relaxed whitespace-pre-line text-foreground">
                {active.body}
              </div>

              {active.attachments && active.attachments.length > 0 && (
                <div className="mt-6">
                  <p className="text-xs font-medium text-muted-foreground mb-2">
                    {active.attachments.length} attachment{active.attachments.length > 1 ? "s" : ""}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {active.attachments.map(file => (
                      <div key={file} className="flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2">
                        <Paperclip className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <span className="text-xs">{file}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick reply */}
            <div className="border-t px-4 py-3 shrink-0">
              <div className="rounded-lg border bg-muted/30 px-4 py-3">
                <p className="text-xs text-muted-foreground mb-2">Reply to {active.from}</p>
                <Input
                  placeholder="Write a reply…"
                  className="border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0 h-auto"
                />
                <div className="flex items-center justify-between mt-3">
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                    <Paperclip className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="sm" className="h-7 gap-1.5 text-xs">
                    <Send className="h-3 w-3" />Send
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
            <Inbox className="h-10 w-10 opacity-20" />
            <p className="text-sm">Select an email to read</p>
          </div>
        )}
      </div>

    </div>
  )
}

export default MailPage

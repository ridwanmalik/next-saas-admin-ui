"use client"

import { useState } from "react"
import { Plus, ChevronRight } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PageContainer } from "@/components/layout/page-container"
import {
  LABEL_CONFIG,
  PRIORITY_CONFIG,
  TEAM_MEMBERS,
  type Task,
} from "../board/_components/kanban-card"

// ─── Data ─────────────────────────────────────────────────────────────────────

const AK = TEAM_MEMBERS[0]
const MT = TEAM_MEMBERS[1]
const JL = TEAM_MEMBERS[2]
const SR = TEAM_MEMBERS[3]

interface BacklogGroup {
  id: string
  title: string
  tasks: Task[]
}

const BACKLOG: BacklogGroup[] = [
  {
    id: "icebox",
    title: "Icebox",
    tasks: [
      { id: "b1", title: "Implement dark mode for mobile app", priority: "Low",    label: "Frontend", assignee: null, dueDate: "—",       comments: 0 },
      { id: "b2", title: "Migrate legacy auth endpoints",      priority: "Medium", label: "Backend",  assignee: AK,   dueDate: "—",       comments: 2 },
      { id: "b3", title: "Accessibility audit pass",           priority: "Medium", label: "Design",   assignee: MT,   dueDate: "—",       comments: 1 },
      { id: "b4", title: "Add SSO via SAML 2.0",               priority: "High",   label: "Security", assignee: null, dueDate: "—",       comments: 0 },
    ],
  },
  {
    id: "planned",
    title: "Planned — Q3",
    tasks: [
      { id: "b5", title: "Redesign onboarding flow",           priority: "High",   label: "Design",   assignee: SR,   dueDate: "Jul 15",  comments: 4 },
      { id: "b6", title: "GraphQL API gateway",                priority: "High",   label: "Backend",  assignee: JL,   dueDate: "Jul 22",  comments: 3 },
      { id: "b7", title: "CSV export for reports",             priority: "Medium", label: "Frontend", assignee: AK,   dueDate: "Jul 30",  comments: 1 },
      { id: "b8", title: "Rate limiting per API key",          priority: "High",   label: "Security", assignee: MT,   dueDate: "Aug 5",   comments: 2 },
      { id: "b9", title: "Billing portal self-serve",          priority: "Critical", label: "Frontend", assignee: SR, dueDate: "Aug 12",  comments: 6 },
    ],
  },
  {
    id: "future",
    title: "Future",
    tasks: [
      { id: "b10", title: "Native iOS & Android apps",         priority: "Low",    label: "Frontend", assignee: null, dueDate: "—",       comments: 0 },
      { id: "b11", title: "AI-powered usage analytics",        priority: "Medium", label: "Backend",  assignee: null, dueDate: "—",       comments: 0 },
      { id: "b12", title: "White-label theming system",        priority: "Low",    label: "Design",   assignee: null, dueDate: "—",       comments: 1 },
    ],
  },
]

// ─── Row ──────────────────────────────────────────────────────────────────────

const BacklogRow = ({ task }: { task: Task }) => (
  <div className="flex items-center gap-3 px-4 py-2.5 border-b last:border-0 hover:bg-muted/40 transition-colors group">
    <span className="text-sm flex-1 min-w-0 truncate">{task.title}</span>
    <div className="flex items-center gap-2 shrink-0">
      <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 h-5 border", LABEL_CONFIG[task.label])}>
        {task.label}
      </Badge>
      <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 h-5 border", PRIORITY_CONFIG[task.priority])}>
        {task.priority}
      </Badge>
      <span className="text-xs text-muted-foreground w-14 text-right">{task.dueDate}</span>
      {task.assignee ? (
        <Avatar className={cn("h-6 w-6 text-[10px] text-white shrink-0", task.assignee.className)}>
          <AvatarFallback className={cn("text-[10px] text-white", task.assignee.className)}>
            {task.assignee.initials}
          </AvatarFallback>
        </Avatar>
      ) : (
        <span className="h-6 w-6 shrink-0 rounded-full border border-dashed border-muted-foreground/30" />
      )}
    </div>
  </div>
)

// ─── Group ────────────────────────────────────────────────────────────────────

const BacklogGroup = ({ group }: { group: BacklogGroup }) => {
  const [open, setOpen] = useState(true)
  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center gap-2 px-4 py-3 text-left hover:bg-muted/40 transition-colors"
      >
        <ChevronRight className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform", open && "rotate-90")} />
        <span className="text-sm font-semibold">{group.title}</span>
        <span className="ml-1 text-xs text-muted-foreground">{group.tasks.length}</span>
      </button>
      {open && (
        <div className="border-t">
          {group.tasks.map(task => <BacklogRow key={task.id} task={task} />)}
        </div>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const BacklogPage = () => (
  <PageContainer wide className="flex flex-col gap-3">
    <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
      <div>
        <h1 className="text-xl font-bold">Backlog</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {BACKLOG.reduce((n, g) => n + g.tasks.length, 0)} tasks not yet in progress
        </p>
      </div>
      <Button size="sm" className="h-8 gap-1.5">
        <Plus className="h-3.5 w-3.5" />
        Add Task
      </Button>
    </div>

    {BACKLOG.map(group => <BacklogGroup key={group.id} group={group} />)}
  </PageContainer>
)

export default BacklogPage

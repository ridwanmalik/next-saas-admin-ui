"use client"

import { useState } from "react"
import { MoreHorizontal, Plus, Pencil, Eye, Trash2 } from "lucide-react"

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
import {
  LABEL_CONFIG,
  PRIORITY_CONFIG,
  TEAM_MEMBERS,
  type Priority,
  type Label,
  type Task,
} from "../board/_components/kanban-card"

// ─── Data ─────────────────────────────────────────────────────────────────────

const AK = TEAM_MEMBERS[0]
const MT = TEAM_MEMBERS[1]
const JL = TEAM_MEMBERS[2]
const SR = TEAM_MEMBERS[3]

type TaskStatus = "Todo" | "In Progress" | "In Review" | "Done"

type TaskRow = Task & { status: TaskStatus }

const TASKS: TaskRow[] = [
  { id: "T-001", title: "Design new onboarding screens",        priority: "High",     label: "Design",   assignee: SR, dueDate: "Jul 15", comments: 4,  attachments: 2, status: "In Progress" },
  { id: "T-002", title: "Implement JWT refresh token flow",     priority: "Critical", label: "Backend",  assignee: JL, dueDate: "Jul 18", comments: 6,  attachments: 1, status: "In Review"   },
  { id: "T-003", title: "Fix mobile nav overflow bug",          priority: "High",     label: "Frontend", assignee: MT, dueDate: "Jul 14", comments: 3,  attachments: 0, status: "Todo"        },
  { id: "T-004", title: "Set up rate limiting middleware",      priority: "High",     label: "Security", assignee: AK, dueDate: "Jul 20", comments: 2,  attachments: 0, status: "Todo"        },
  { id: "T-005", title: "Write API docs for v2 endpoints",      priority: "Medium",   label: "Backend",  assignee: JL, dueDate: "Jul 22", comments: 1,  attachments: 3, status: "In Progress" },
  { id: "T-006", title: "Migrate Postgres schema to v3",        priority: "Critical", label: "Backend",  assignee: AK, dueDate: "Jul 16", comments: 8,  attachments: 2, status: "In Review"   },
  { id: "T-007", title: "Add CSV export to reports page",       priority: "Medium",   label: "Frontend", assignee: MT, dueDate: "Jul 25", comments: 0,  attachments: 0, status: "Todo"        },
  { id: "T-008", title: "Dark mode polish pass",                priority: "Low",      label: "Design",   assignee: SR, dueDate: "Jul 30", comments: 2,  attachments: 1, status: "Todo"        },
  { id: "T-009", title: "Load test the payment service",        priority: "High",     label: "Backend",  assignee: JL, dueDate: "Jul 19", comments: 5,  attachments: 0, status: "In Progress" },
  { id: "T-010", title: "Redesign pricing card layout",         priority: "Medium",   label: "Design",   assignee: SR, dueDate: "Aug 1",  comments: 3,  attachments: 2, status: "Done"        },
  { id: "T-011", title: "Add 2FA backup codes UI",              priority: "High",     label: "Security", assignee: AK, dueDate: "Jul 21", comments: 4,  attachments: 0, status: "In Progress" },
  { id: "T-012", title: "Fix Safari date picker regression",    priority: "Medium",   label: "Frontend", assignee: MT, dueDate: "Jul 17", comments: 2,  attachments: 0, status: "Done"        },
  { id: "T-013", title: "Accessibility audit — dashboard",      priority: "Medium",   label: "Design",   assignee: SR, dueDate: "Aug 5",  comments: 1,  attachments: 1, status: "Todo"        },
  { id: "T-014", title: "Webhook retry logic with backoff",     priority: "High",     label: "Backend",  assignee: JL, dueDate: "Jul 23", comments: 3,  attachments: 0, status: "Todo"        },
  { id: "T-015", title: "Setup Datadog APM traces",             priority: "Medium",   label: "Backend",  assignee: AK, dueDate: "Aug 8",  comments: 0,  attachments: 0, status: "Todo"        },
  { id: "T-016", title: "Keyboard nav for command palette",     priority: "Low",      label: "Frontend", assignee: MT, dueDate: "Aug 10", comments: 2,  attachments: 0, status: "Done"        },
  { id: "T-017", title: "Pen test — auth endpoints",            priority: "Critical", label: "Security", assignee: AK, dueDate: "Jul 28", comments: 7,  attachments: 3, status: "In Review"   },
  { id: "T-018", title: "Empty state illustrations",            priority: "Low",      label: "Design",   assignee: SR, dueDate: "Aug 12", comments: 1,  attachments: 4, status: "Todo"        },
]

// ─── Style maps ───────────────────────────────────────────────────────────────

const statusStyle: Record<TaskStatus, string> = {
  "Todo":        "bg-muted text-muted-foreground",
  "In Progress": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "In Review":   "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Done":        "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
}

// ─── Actions cell ─────────────────────────────────────────────────────────────

const TaskActions = ({ task }: { task: TaskRow }) => (
  <div className="flex items-center justify-end gap-0.5">
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
          <Eye className="h-3.5 w-3.5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>View task</TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
          <Pencil className="h-3.5 w-3.5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Edit task</TooltipContent>
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
          <Eye className="h-3.5 w-3.5 text-muted-foreground" />
          View task
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
          Edit task
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
          <Trash2 className="h-3.5 w-3.5" />
          Delete task
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
)

// ─── Columns ──────────────────────────────────────────────────────────────────

const columns: DataTableColumn<TaskRow>[] = [
  {
    key: "title",
    header: "Task",
    sortable: true,
    hideable: false,
    render: row => (
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-xs text-muted-foreground font-mono shrink-0">{row.id}</span>
        <span className="font-medium truncate">{row.title}</span>
      </div>
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
    key: "priority",
    header: "Priority",
    sortable: true,
    hideBelow: "sm",
    render: row => (
      <Badge variant="outline" className={cn("text-xs border", PRIORITY_CONFIG[row.priority])}>
        {row.priority}
      </Badge>
    ),
  },
  {
    key: "label",
    header: "Label",
    sortable: true,
    hideBelow: "md",
    render: row => (
      <Badge variant="outline" className={cn("text-xs border", LABEL_CONFIG[row.label])}>
        {row.label}
      </Badge>
    ),
  },
  {
    key: "assignee",
    header: "Assignee",
    sortable: true,
    hideBelow: "md",
    render: row => row.assignee ? (
      <div className="flex items-center gap-2">
        <Avatar className={cn("h-6 w-6 shrink-0", row.assignee.className)}>
          <AvatarFallback className={cn("text-[10px] text-white", row.assignee.className)}>
            {row.assignee.initials}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm">{row.assignee.name}</span>
      </div>
    ) : (
      <span className="text-xs text-muted-foreground">Unassigned</span>
    ),
  },
  {
    key: "dueDate",
    header: "Due",
    sortable: true,
    align: "right",
    hideBelow: "lg",
    render: row => (
      <span className="text-muted-foreground">{row.dueDate}</span>
    ),
  },
  {
    key: "actions",
    header: "",
    hideable: false,
    align: "right",
    render: row => <TaskActions task={row} />,
  },
]

// ─── Filter options ───────────────────────────────────────────────────────────

const STATUS_OPTIONS = (["Todo", "In Progress", "In Review", "Done"] as TaskStatus[]).map(s => ({
  value: s,
  label: s,
  count: TASKS.filter(t => t.status === s).length,
}))

const PRIORITY_OPTIONS = (["Critical", "High", "Medium", "Low"] as Priority[]).map(p => ({
  value: p,
  label: p,
  count: TASKS.filter(t => t.priority === p).length,
}))

// ─── Page ─────────────────────────────────────────────────────────────────────

const TaskListPage = () => {
  const [activeStatuses,   setActiveStatuses]   = useState<Set<string>>(new Set())
  const [activePriorities, setActivePriorities] = useState<Set<string>>(new Set())

  const filtered = TASKS.filter(t =>
    (activeStatuses.size   === 0 || activeStatuses.has(t.status))   &&
    (activePriorities.size === 0 || activePriorities.has(t.priority))
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
        <p className="text-sm text-muted-foreground mt-0.5">{TASKS.length} tasks</p>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        defaultPageSize={10}
        pageSizeOptions={[10, 25, 50]}
        searchPlaceholder="Search tasks…"
        toolbarFilters={<>
          <MultiSelectFilter label="Status"   options={STATUS_OPTIONS}   value={activeStatuses}   onChange={setActiveStatuses}   />
          <MultiSelectFilter label="Priority" options={PRIORITY_OPTIONS} value={activePriorities} onChange={setActivePriorities} />
        </>}
        toolbarActions={
          <Button size="sm" className="h-8 gap-1.5 text-xs">
            <Plus className="h-3.5 w-3.5" />
            Add task
          </Button>
        }
      />
    </div>
  )
}

export default TaskListPage

"use client"

import { useState } from "react"
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { CalendarDays, MessageCircle, Paperclip, Plus } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

import {
  KanbanCard,
  LABEL_CONFIG,
  PRIORITY_CONFIG,
  TEAM_MEMBERS,
  type Assignee,
  type Task,
} from "./kanban-card"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Column {
  id: string
  title: string
  dotColor: string
  tasks: Task[]
}

// ─── Shorthands for initial data ──────────────────────────────────────────────

const AK = TEAM_MEMBERS[0]
const MT = TEAM_MEMBERS[1]
const JL = TEAM_MEMBERS[2]
const SR = TEAM_MEMBERS[3]

// ─── Initial data ─────────────────────────────────────────────────────────────

const INITIAL_COLUMNS: Column[] = [
  {
    id: "backlog",
    title: "Backlog",
    dotColor: "bg-slate-400",
    tasks: [
      {
        id: "b1",
        title: "Redesign onboarding flow",
        description: "Revamp the user onboarding experience with new illustrations and copy.",
        priority: "High",
        label: "Design",
        assignee: AK,
        dueDate: "Dec 28",
        comments: 3,
        attachments: 2,
      },
      {
        id: "b2",
        title: "API rate limiting & throttling",
        description: "Implement per-user rate limits to prevent abuse on public endpoints.",
        priority: "Medium",
        label: "Backend",
        assignee: JL,
        dueDate: "Jan 5",
        comments: 1,
      },
      {
        id: "b3",
        title: "Dark mode token audit",
        description: "Review all color tokens for dark mode contrast compliance.",
        priority: "Low",
        label: "Frontend",
        assignee: SR,
        dueDate: "Jan 10",
        comments: 5,
        attachments: 1,
      },
      {
        id: "b4",
        title: "User data export (CSV)",
        description: "Allow admins to export filtered user data as a CSV download.",
        priority: "Medium",
        label: "Backend",
        assignee: MT,
        dueDate: "Jan 12",
        comments: 2,
      },
      {
        id: "b5",
        title: "Mobile responsive audit",
        description: "Test and fix layout issues across all breakpoints below 768px.",
        priority: "High",
        label: "Frontend",
        assignee: AK,
        dueDate: "Dec 30",
        comments: 7,
        attachments: 3,
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    dotColor: "bg-primary",
    tasks: [
      {
        id: "p1",
        title: "OAuth 2.0 integration",
        description: "Connect Google, GitHub, and Microsoft identity providers.",
        priority: "High",
        label: "Backend",
        assignee: JL,
        dueDate: "Dec 20",
        comments: 8,
        attachments: 2,
      },
      {
        id: "p2",
        title: "Dashboard analytics v2",
        description: "Build new KPI cards, sparklines, and revenue chart widgets.",
        priority: "High",
        label: "Frontend",
        assignee: SR,
        dueDate: "Dec 18",
        comments: 12,
        attachments: 5,
      },
      {
        id: "p3",
        title: "Email notification system",
        description: "Transactional emails for account events using Resend.",
        priority: "Medium",
        label: "Backend",
        assignee: MT,
        dueDate: "Dec 22",
        comments: 3,
        attachments: 1,
      },
      {
        id: "p4",
        title: "Component library update",
        description: "Upgrade shadcn components to latest and fix breaking changes.",
        priority: "Low",
        label: "Design",
        assignee: AK,
        dueDate: "Jan 3",
        comments: 2,
      },
    ],
  },
  {
    id: "in-review",
    title: "In Review",
    dotColor: "bg-amber-500",
    tasks: [
      {
        id: "r1",
        title: "Billing page redesign",
        description: "New subscription management UI with plan comparison table.",
        priority: "High",
        label: "Design",
        assignee: SR,
        dueDate: "Dec 15",
        comments: 6,
        attachments: 4,
      },
      {
        id: "r2",
        title: "CSV bulk import",
        description: "Parse, validate, and import user records from uploaded CSV files.",
        priority: "Medium",
        label: "Backend",
        assignee: JL,
        dueDate: "Dec 16",
        comments: 4,
        attachments: 2,
      },
      {
        id: "r3",
        title: "Lighthouse score improvements",
        description: "Optimize LCP, TBT, and CLS to hit 95+ on all key pages.",
        priority: "High",
        label: "Frontend",
        assignee: AK,
        dueDate: "Dec 17",
        comments: 9,
        attachments: 3,
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    dotColor: "bg-emerald-500",
    tasks: [
      {
        id: "d1",
        title: "User profile settings",
        description: "Name, avatar, timezone, and notification preferences.",
        priority: "Low",
        label: "Frontend",
        assignee: SR,
        dueDate: "Dec 10",
        comments: 5,
        attachments: 1,
      },
      {
        id: "d2",
        title: "Role-based access control",
        description: "Admin, editor, and viewer roles with route-level guards.",
        priority: "High",
        label: "Backend",
        assignee: JL,
        dueDate: "Dec 8",
        comments: 11,
        attachments: 3,
      },
      {
        id: "d3",
        title: "Landing page v2",
        description: "Refreshed hero, feature sections, and testimonials block.",
        priority: "Medium",
        label: "Design",
        assignee: AK,
        dueDate: "Dec 5",
        comments: 7,
        attachments: 6,
      },
      {
        id: "d4",
        title: "Two-factor authentication",
        description: "Time-based 2FA with backup codes and session management.",
        priority: "High",
        label: "Security",
        assignee: MT,
        dueDate: "Dec 3",
        comments: 4,
        attachments: 2,
      },
    ],
  },
]

// ─── Detail dialog ────────────────────────────────────────────────────────────

const TaskDetailDialog = ({
  task,
  open,
  onOpenChange,
}: {
  task: Task | null
  open: boolean
  onOpenChange: (v: boolean) => void
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-lg">
      {task && (
        <>
          <DialogHeader className="gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full border", LABEL_CONFIG[task.label])}>
                {task.label}
              </span>
              <span className={cn("flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border", PRIORITY_CONFIG[task.priority])}>
                <span className="h-1.5 w-1.5 rounded-full bg-current shrink-0" />
                {task.priority}
              </span>
            </div>
            <DialogTitle className="text-base font-bold leading-snug">{task.title}</DialogTitle>
          </DialogHeader>

          {task.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">{task.description}</p>
          )}

          <Separator />

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Due Date</p>
              <div className="flex items-center gap-1.5 text-sm">
                <CalendarDays className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                {task.dueDate}
              </div>
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Comments</p>
              <div className="flex items-center gap-1.5 text-sm">
                <MessageCircle className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                {task.comments}
              </div>
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Attachments</p>
              <div className="flex items-center gap-1.5 text-sm">
                <Paperclip className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                {task.attachments ?? 0}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Assignee</p>
            {task.assignee ? (
              <div className="flex items-center gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className={cn("text-[10px] font-bold text-white", task.assignee.className)}>
                    {task.assignee.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{task.assignee.name}</span>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Unassigned</p>
            )}
          </div>
        </>
      )}
    </DialogContent>
  </Dialog>
)

// ─── Sortable card wrapper ────────────────────────────────────────────────────

const SortableCard = ({
  task,
  done,
  onSelect,
  onAssignTask,
}: {
  task: Task
  done?: boolean
  onSelect: (t: Task) => void
  onAssignTask: (taskId: string, assignee: Assignee | null) => void
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id })

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.35 : 1 }}
      {...attributes}
      {...listeners}
    >
      <KanbanCard
        task={task}
        done={done}
        onClick={() => onSelect(task)}
        onAssign={a => onAssignTask(task.id, a)}
      />
    </div>
  )
}

// ─── Column ───────────────────────────────────────────────────────────────────

const KanbanColumn = ({
  column,
  onSelect,
  onAddTask,
  onAssignTask,
}: {
  column: Column
  onSelect: (t: Task) => void
  onAddTask: (columnId: string, title: string) => void
  onAssignTask: (taskId: string, assignee: Assignee | null) => void
}) => {
  const { setNodeRef, isOver } = useDroppable({ id: column.id })
  const [isAdding, setIsAdding] = useState(false)
  const [newTitle, setNewTitle] = useState("")

  const handleAdd = () => {
    if (!newTitle.trim()) return
    onAddTask(column.id, newTitle.trim())
    setNewTitle("")
    setIsAdding(false)
  }

  const handleCancel = () => {
    setNewTitle("")
    setIsAdding(false)
  }

  return (
    <div className="flex flex-col flex-1 min-w-56 bg-muted/40 dark:bg-muted/20 rounded-xl p-3">
      {/* Header */}
      <div className="flex items-center px-1 mb-3">
        <div className="flex items-center gap-2">
          <span className={cn("h-2 w-2 rounded-full shrink-0", column.dotColor)} />
          <span className="text-sm font-semibold">{column.title}</span>
          <Badge variant="secondary" className="h-4.5 min-w-4.5 px-1.5 text-[10px] font-semibold tabular-nums">
            {column.tasks.length}
          </Badge>
        </div>
      </div>

      {/* Cards drop zone */}
      <SortableContext items={column.tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={cn(
            "flex flex-col gap-2.5 rounded-xl min-h-24 p-1 -m-1 transition-colors",
            isOver && "bg-muted/60",
          )}
        >
          {column.tasks.map(task => (
            <SortableCard
              key={task.id}
              task={task}
              done={column.id === "done"}
              onSelect={onSelect}
              onAssignTask={onAssignTask}
            />
          ))}
        </div>
      </SortableContext>

      {/* Add task */}
      {isAdding ? (
        <div className="mt-2.5 space-y-2">
          <Textarea
            autoFocus
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleAdd() }
              if (e.key === "Escape") handleCancel()
            }}
            placeholder="Task title…"
            rows={2}
            className="resize-none text-sm"
          />
          <div className="flex items-center gap-2">
            <Button size="sm" className="h-7 text-xs" onClick={handleAdd}>Add</Button>
            <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={handleCancel}>Cancel</Button>
          </div>
        </div>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsAdding(true)}
          className="mt-2.5 w-full rounded-xl border border-dashed border-border/60 py-2.5 h-auto text-xs text-muted-foreground hover:text-foreground hover:bg-muted/60"
        >
          <Plus className="h-3.5 w-3.5" />
          Add task
        </Button>
      )}
    </div>
  )
}

// ─── Board ────────────────────────────────────────────────────────────────────

export const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>(INITIAL_COLUMNS)
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const openTask = (task: Task) => {
    setSelectedTask(task)
    setDialogOpen(true)
  }

  const handleAddTask = (columnId: string, title: string) => {
    const task: Task = {
      id: `task-${Date.now()}`,
      title,
      priority: "Medium",
      label: "Frontend",
      assignee: null,
      dueDate: "TBD",
      comments: 0,
    }
    setColumns(prev => prev.map(col =>
      col.id === columnId ? { ...col, tasks: [...col.tasks, task] } : col
    ))
  }

  const handleAssignTask = (taskId: string, assignee: Assignee | null) => {
    setColumns(prev => prev.map(col => ({
      ...col,
      tasks: col.tasks.map(t => t.id === taskId ? { ...t, assignee } : t),
    })))
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  )

  const findTask = (id: string) => {
    for (const col of columns) {
      const task = col.tasks.find(t => t.id === id)
      if (task) return task
    }
  }

  const findColumnByTaskId = (taskId: string) =>
    columns.find(col => col.tasks.some(t => t.id === taskId))?.id

  const isColumnId = (id: string) => columns.some(col => col.id === id)

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTask(findTask(active.id as string) ?? null)
  }

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return
    const activeId = active.id as string
    const overId   = over.id as string

    const activeColId = findColumnByTaskId(activeId)
    const overColId   = isColumnId(overId) ? overId : findColumnByTaskId(overId)

    if (!activeColId || !overColId || activeColId === overColId) return

    setColumns(prev => {
      const activeCol  = prev.find(c => c.id === activeColId)!
      const overCol    = prev.find(c => c.id === overColId)!
      const activeTask = activeCol.tasks.find(t => t.id === activeId)!

      const overIndex = isColumnId(overId)
        ? overCol.tasks.length
        : overCol.tasks.findIndex(t => t.id === overId)

      return prev.map(col => {
        if (col.id === activeColId) return { ...col, tasks: col.tasks.filter(t => t.id !== activeId) }
        if (col.id === overColId) {
          const next = [...col.tasks]
          next.splice(overIndex, 0, activeTask)
          return { ...col, tasks: next }
        }
        return col
      })
    })
  }

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveTask(null)
    if (!over || active.id === over.id) return

    const activeId = active.id as string
    const overId   = over.id as string

    const activeColId = findColumnByTaskId(activeId)
    const overColId   = isColumnId(overId) ? overId : findColumnByTaskId(overId)

    if (!activeColId || !overColId || activeColId !== overColId) return

    setColumns(prev => prev.map(col => {
      if (col.id !== activeColId) return col
      const oldIndex = col.tasks.findIndex(t => t.id === activeId)
      const newIndex = col.tasks.findIndex(t => t.id === overId)
      return { ...col, tasks: arrayMove(col.tasks, oldIndex, newIndex) }
    }))
  }

  const handleDragCancel = () => setActiveTask(null)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="overflow-x-auto pb-6 -mx-4 px-4 md:-mx-6 md:px-6">
        <div className="flex gap-3">
          {columns.map(col => (
            <KanbanColumn
              key={col.id}
              column={col}
              onSelect={openTask}
              onAddTask={handleAddTask}
              onAssignTask={handleAssignTask}
            />
          ))}
        </div>
      </div>

      <DragOverlay>
        {activeTask && <KanbanCard task={activeTask} overlay />}
      </DragOverlay>

      <TaskDetailDialog task={selectedTask} open={dialogOpen} onOpenChange={setDialogOpen} />
    </DndContext>
  )
}

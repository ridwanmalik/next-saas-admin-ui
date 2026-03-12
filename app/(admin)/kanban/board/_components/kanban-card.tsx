"use client"

import { CalendarDays, Check, MessageCircle, Paperclip, User } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export type Priority = "Critical" | "High" | "Medium" | "Low"
export type Label    = "Design" | "Backend" | "Frontend" | "Security"

export interface Assignee {
  id: string
  initials: string
  name: string
  className: string
}

export interface Task {
  id: string
  title: string
  description?: string
  priority: Priority
  label: Label
  assignee: Assignee | null
  dueDate: string
  comments: number
  attachments?: number
}

// ─── Config ───────────────────────────────────────────────────────────────────

export const PRIORITY_CONFIG: Record<Priority, string> = {
  Critical: "bg-red-500/10 text-red-500 border-red-500/20",
  High:     "bg-rose-500/10 text-rose-500 border-rose-500/20",
  Medium:   "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Low:      "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
}

export const LABEL_CONFIG: Record<Label, string> = {
  Design:   "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400",
  Backend:  "bg-sky-500/10 text-sky-600 border-sky-500/20 dark:text-sky-400",
  Frontend: "bg-pink-500/10 text-pink-600 border-pink-500/20 dark:text-pink-400",
  Security: "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400",
}

export const TEAM_MEMBERS: Assignee[] = [
  { id: "AK", initials: "AK", name: "Alex Kim",    className: "bg-violet-500" },
  { id: "MT", initials: "MT", name: "Maya Torres", className: "bg-primary/80" },
  { id: "JL", initials: "JL", name: "Jake Liu",    className: "bg-emerald-500" },
  { id: "SR", initials: "SR", name: "Sara Reyes",  className: "bg-amber-500" },
]

// ─── Card ─────────────────────────────────────────────────────────────────────

interface KanbanCardProps {
  task: Task
  done?: boolean
  overlay?: boolean
  onClick?: () => void
  onAssign?: (assignee: Assignee | null) => void
}

export const KanbanCard = ({ task, done, overlay, onClick, onAssign }: KanbanCardProps) => (
  <div
    onClick={onClick}
    className={cn(
      "rounded-xl border bg-card p-3.5 space-y-3 transition-all group",
      overlay
        ? "shadow-2xl cursor-grabbing ring-1 ring-primary/20"
        : "hover:shadow-md cursor-grab",
      done && "opacity-60 hover:opacity-100",
    )}
  >
    {/* Label + Priority */}
    <div className="flex items-center justify-between gap-2">
      <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full border", LABEL_CONFIG[task.label])}>
        {task.label}
      </span>
      <span className={cn("flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border", PRIORITY_CONFIG[task.priority])}>
        <span className="h-1.5 w-1.5 rounded-full bg-current shrink-0" />
        {task.priority}
      </span>
    </div>

    {/* Title + description */}
    <div className="space-y-1">
      <h3 className={cn(
        "text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors",
        done && "line-through decoration-muted-foreground/40",
      )}>
        {task.title}
      </h3>
      {task.description && (
        <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
          {task.description}
        </p>
      )}
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between pt-0.5">
      {/* Meta */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <CalendarDays className="h-3.5 w-3.5" />
          {task.dueDate}
        </span>
        <span className="flex items-center gap-1">
          <MessageCircle className="h-3.5 w-3.5" />
          {task.comments}
        </span>
        {task.attachments && task.attachments > 0 ? (
          <span className="flex items-center gap-1">
            <Paperclip className="h-3.5 w-3.5" />
            {task.attachments}
          </span>
        ) : null}
      </div>

      {/* Assignee */}
      {onAssign ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              onClick={e => e.stopPropagation()}
              onPointerDown={e => e.stopPropagation()}
              className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              {task.assignee ? (
                <Avatar className="h-6 w-6 border-2 border-background">
                  <AvatarFallback className={cn("text-[8px] font-bold text-white", task.assignee.className)}>
                    {task.assignee.initials}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <Avatar className="h-6 w-6 opacity-50 hover:opacity-100 transition-opacity">
                  <AvatarFallback className="bg-muted">
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem
              onClick={e => { e.stopPropagation(); onAssign(null) }}
              className="gap-2 hover:bg-accent"
            >
              <Avatar className="h-5 w-5 shrink-0">
                <AvatarFallback className="bg-muted/80">
                  <User className="h-3 w-3 text-foreground" />
                </AvatarFallback>
              </Avatar>
              <span className="text-foreground/70">Unassigned</span>
              {!task.assignee && (
                <Check className="h-3.5 w-3.5 ml-auto text-primary shrink-0" />
              )}
            </DropdownMenuItem>
            {TEAM_MEMBERS.map(member => (
              <DropdownMenuItem
                key={member.id}
                onClick={e => { e.stopPropagation(); onAssign(member) }}
                className="gap-2"
              >
                <Avatar className="h-5 w-5 shrink-0">
                  <AvatarFallback className={cn("text-[7px] font-bold text-white", member.className)}>
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <span>{member.name}</span>
                {task.assignee?.id === member.id && (
                  <Check className="h-3.5 w-3.5 ml-auto text-primary shrink-0" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        task.assignee && (
          <Avatar className="h-6 w-6 border-2 border-background">
            <AvatarFallback className={cn("text-[8px] font-bold text-white", task.assignee.className)}>
              {task.assignee.initials}
            </AvatarFallback>
          </Avatar>
        )
      )}
    </div>
  </div>
)

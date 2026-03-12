import { Filter, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { KanbanBoard } from "./_components/kanban-board"

// ─── Page ─────────────────────────────────────────────────────────────────────

const ProjectsPage = () => (
  <div className="flex flex-col gap-6">
    {/* Page header */}
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div>
        <h1 className="text-xl font-bold">Projects</h1>
        <p className="text-sm text-muted-foreground mt-0.5">16 tasks across 4 stages</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search tasks…"
            className="pl-8 h-8 w-52 text-sm"
          />
        </div>
        <Button variant="outline" size="sm" className="h-8 gap-1.5">
          <Filter className="h-3.5 w-3.5" />
          Filter
        </Button>
        <Button size="sm" className="h-8 gap-1.5">
          <Plus className="h-3.5 w-3.5" />
          New Task
        </Button>
      </div>
    </div>

    {/* Kanban board */}
    <KanbanBoard />
  </div>
)

export default ProjectsPage

import { MoreHorizontal, PenLine } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Draft {
  id: number
  tag: string
  tagColor: string
  title: string
  excerpt: string
  updatedAt: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const DRAFTS: Draft[] = [
  {
    id: 1,
    tag: "Engineering",
    tagColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    title: "Responsive UI Design With shadcn/ui & Next.js",
    excerpt: "Responsive UI Design With shadcn/ui & Next.js in depth guide",
    updatedAt: "Last update March 23, 2025",
  },
  {
    id: 2,
    tag: "Engineering",
    tagColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    title: "Data Visualization in React Using Custom SVG Charts",
    excerpt: "Data Visualization in React Using Custom SVG Charts",
    updatedAt: "Last update April 13, 2025",
  },
  {
    id: 3,
    tag: "Tutorial",
    tagColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    title: "Building Scalable APIs With Next.js Route Handlers",
    excerpt: "Building Scalable APIs With Next.js Route Handlers and middleware",
    updatedAt: "Last update June 20, 2025",
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export const DraftsList = () => (
  <Card className="flex flex-col">
    <CardHeader className="gap-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle>Drafts</CardTitle>
          <Badge className="h-5 min-w-5 px-1.5 text-xs">{DRAFTS.length + 3}</Badge>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
    <Separator />
    <CardContent className="flex-1 px-3 pb-3 divide-y divide-border">
      {DRAFTS.map(draft => (
        <div key={draft.id} className="py-3 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
                    draft.tagColor
                  )}>
                  {draft.tag}
                </span>
              </div>
              <p className="text-sm font-semibold leading-snug line-clamp-1">{draft.title}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">{draft.excerpt}</p>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 text-muted-foreground">
              <PenLine className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span>{draft.updatedAt}</span>
          </div>
        </div>
      ))}
    </CardContent>
    <div className="px-3 pb-3 pt-0">
      <Button variant="ghost" className="w-full text-sm text-primary hover:text-primary" size="sm">
        View All →
      </Button>
    </div>
  </Card>
)

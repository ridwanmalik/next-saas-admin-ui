import { MoreHorizontal, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Challenge {
  id: number
  tag: string
  status: "New" | "Closed"
  timeAgo: string
  description: string
  challengers: number
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    tag: "#Code&Passion",
    status: "New",
    timeAgo: "5 min ago",
    description: "Dive into coding insights, experiences & ideas.",
    challengers: 104,
  },
  {
    id: 2,
    tag: "#DesignInspire",
    status: "Closed",
    timeAgo: "2 hrs ago",
    description: "Explore creative design ideas, innovations and experience.",
    challengers: 121,
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export const WritingChallenges = () => (
  <Card className="flex flex-col gap-2">
    <CardHeader className="gap-0 border-b">
      <div className="flex items-center justify-between">
        <CardTitle>Writing Challenges</CardTitle>
        <Button variant="ghost" size="icon" className="h-4.5 w-4.5 text-muted-foreground">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
    <CardContent className="flex-1 px-3 pb-3 divide-y divide-border">
      {CHALLENGES.map(c => (
        <div key={c.id} className="py-3 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold">{c.tag}</span>
              <Badge variant={c.status === "New" ? "default" : "destructive"} className="text-[10px] h-4 px-1.5">
                {c.status}
              </Badge>
            </div>
            <span className="text-[11px] text-muted-foreground shrink-0">{c.timeAgo}</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{c.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>{c.challengers} challengers</span>
            </div>
            <Button size="sm" variant="outline" className="h-6 px-3 text-xs">
              Accept
            </Button>
          </div>
        </div>
      ))}
    </CardContent>
    <div className="px-3 pt-0">
      <Button variant="ghost" className="w-full text-sm text-primary hover:text-primary" size="sm">
        View All →
      </Button>
    </div>
  </Card>
)

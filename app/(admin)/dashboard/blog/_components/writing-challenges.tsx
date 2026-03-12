import { MoreHorizontal, Sparkles, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

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
  {
    id: 3,
    tag: "#ShareYourVoice",
    status: "New",
    timeAgo: "10 min ago",
    description: "Discover unique perspectives and personal stories.",
    challengers: 162,
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export const WritingChallenges = () => (
  <Card className="flex flex-col">
    <CardHeader className="gap-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <CardTitle>Writing Challenges</CardTitle>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
    <Separator />
    <CardContent className="flex-1 px-3 pb-3 divide-y divide-border">
      {CHALLENGES.map(c => (
        <div key={c.id} className="py-3 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold">{c.tag}</span>
              <Badge
                variant={c.status === "New" ? "default" : "destructive"}
                className="text-[10px] h-4 px-1.5">
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
    <div className="px-3 pb-3 pt-0">
      <Button variant="ghost" className="w-full text-sm text-primary hover:text-primary" size="sm">
        View All →
      </Button>
    </div>
  </Card>
)

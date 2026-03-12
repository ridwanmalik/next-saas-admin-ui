import { Eye, Heart, MessageCircle, MoreHorizontal } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Post {
  id: number
  title: string
  excerpt: string
  likes: string
  comments: string
  views: number
  timeAgo: string
  author: string
  initials: string
  domain: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const RECENT_POSTS: Post[] = [
  {
    id: 1,
    title: "Year Wrap-up 2025 — December Edition",
    excerpt: "A look back at the biggest moments, milestones, and lessons learned across the tech world in 2025.",
    likes: "45k",
    comments: "65k",
    views: 132,
    timeAgo: "5 min ago",
    author: "Alice Johnson",
    initials: "AJ",
    domain: "dashboard.io/",
  },
  {
    id: 2,
    title: "Tech Trends 2026 — January Edition",
    excerpt: "From AI agents to edge computing, here are the trends shaping the way we build software this year.",
    likes: "40k",
    comments: "35k",
    views: 120,
    timeAgo: "2 hrs ago",
    author: "Marcus Rivera",
    initials: "MR",
    domain: "analytics.io/",
  },
  {
    id: 3,
    title: "Quarterly Review 2025 — March Recap",
    excerpt: "A deep dive into product launches, team growth, and the metrics that defined our Q1 performance.",
    likes: "55k",
    comments: "50k",
    views: 142,
    timeAgo: "10 min ago",
    author: "Brittany Shaw",
    initials: "BS",
    domain: "statistics.io/",
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export const RecentBlogList = () => (
  <Card>
    <CardHeader className="gap-0">
      <CardTitle>Recent Blog List</CardTitle>
    </CardHeader>
    <Separator />
    <CardContent className="px-3 pb-3 space-y-3">
      {RECENT_POSTS.map(post => (
        <div
          key={post.id}
          className="rounded-lg border border-border bg-muted/30 p-4 space-y-3 hover:bg-muted/50 transition-colors">
          {/* Title row */}
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1 flex-1 min-w-0">
              <h3 className="text-sm font-semibold leading-snug">{post.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{post.excerpt}</p>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 -mt-0.5 text-muted-foreground">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <button className="flex items-center gap-1 hover:text-rose-500 transition-colors">
              <Heart className="h-3.5 w-3.5" />
              <span>{post.likes} likes</span>
            </button>
            <span className="text-border">|</span>
            <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
              <MessageCircle className="h-3.5 w-3.5" />
              <span>{post.comments} comments</span>
            </button>
            <div className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              <span>{post.views}</span>
            </div>
          </div>

          {/* Author */}
          <div className="flex items-center justify-between pt-0.5">
            <span className="text-xs text-muted-foreground">{post.timeAgo}</span>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-[9px] font-semibold">{post.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs font-medium leading-none">{post.author}</p>
                <p className="text-[10px] text-muted-foreground">{post.domain}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
)

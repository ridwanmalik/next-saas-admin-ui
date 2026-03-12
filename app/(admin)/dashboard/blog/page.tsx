"use client"

import { Eye, Heart, MessageCircle, MoreHorizontal, PenLine, Sparkles, Users } from "lucide-react"
import { useState } from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type ViewPeriod = "7d" | "30d" | "all"

// ─── Data ─────────────────────────────────────────────────────────────────────

const VIEW_TABS = [
  { key: "7d" as ViewPeriod, label: "Views (7 Days)", value: "50" },
  { key: "30d" as ViewPeriod, label: "Views (30 Days)", value: "1,230" },
  { key: "all" as ViewPeriod, label: "Views (All Time)", value: "20,987" },
]

// Daily views for each period (30 data points)
const DAILY_VIEWS: Record<ViewPeriod, number[]> = {
  "7d": [3, 5, 2, 8, 6, 4, 9, 7, 4, 6, 8, 3, 5, 2, 9, 11, 4, 6, 3, 7, 5, 4, 8, 6, 3, 5, 7, 4, 6, 8],
  "30d": [4, 7, 5, 12, 9, 6, 14, 11, 8, 10, 13, 5, 8, 6, 15, 18, 7, 10, 5, 11, 8, 7, 13, 9, 5, 8, 11, 7, 9, 12],
  all: [
    120, 180, 95, 310, 240, 160, 420, 290, 200, 280, 350, 140, 210, 155, 390, 480, 175, 265, 130, 290, 220, 185, 340,
    240, 130, 205, 280, 175, 240, 310,
  ],
}

const RECENT_POSTS = [
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

const DRAFTS = [
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

const CHALLENGES = [
  {
    id: 1,
    tag: "#Code&Passion",
    status: "New" as const,
    timeAgo: "5 min ago",
    description: "Dive into coding insights, experiences & ideas.",
    challengers: 104,
  },
  {
    id: 2,
    tag: "#DesignInspire",
    status: "Closed" as const,
    timeAgo: "2 hrs ago",
    description: "Explore creative design ideas, innovations and experience.",
    challengers: 121,
  },
  {
    id: 3,
    tag: "#ShareYourVoice",
    status: "New" as const,
    timeAgo: "10 min ago",
    description: "Discover unique perspectives and personal stories.",
    challengers: 162,
  },
]

// ─── Analytics Bar Chart ──────────────────────────────────────────────────────

const AnalyticsChart = ({ period }: { period: ViewPeriod }) => {
  const data = DAILY_VIEWS[period]
  const n = data.length
  const max = Math.max(...data)
  const W = 600,
    H = 160
  const pL = 28,
    pR = 8,
    pT = 12,
    pB = 28
  const cW = W - pL - pR
  const cH = H - pT - pB
  const slotW = cW / n
  const barW = slotW * 0.55
  const gridLines = [Math.round(max * 0.25), Math.round(max * 0.5), Math.round(max * 0.75), max]
  // Show every 5th label
  const xLabels = data.map((_, i) => (i % 5 === 0 ? String(i + 1) : ""))

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden>
      {/* Grid lines */}
      {gridLines.map(v => {
        const y = pT + cH - (v / max) * cH
        return (
          <g key={v}>
            <line
              x1={pL}
              y1={y}
              x2={W - pR}
              y2={y}
              strokeWidth={0.5}
              strokeDasharray="3 3"
              style={{ stroke: "var(--border)" }}
            />
            <text x={pL - 4} y={y + 3} textAnchor="end" fontSize={8} style={{ fill: "var(--muted-foreground)" }}>
              {v}
            </text>
          </g>
        )
      })}

      {/* Bars */}
      {data.map((v, i) => {
        const barH = (v / max) * cH
        const x = pL + i * slotW + (slotW - barW) / 2
        const y = pT + cH - barH
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barW}
            height={barH}
            rx={2}
            style={{ fill: "var(--primary)" }}
            fillOpacity={0.8}
          />
        )
      })}

      {/* X axis labels */}
      {xLabels.map((label, i) =>
        label ? (
          <text
            key={i}
            x={pL + i * slotW + slotW / 2}
            y={H - 6}
            textAnchor="middle"
            fontSize={8}
            style={{ fill: "var(--muted-foreground)" }}>
            {label}
          </text>
        ) : null
      )}
    </svg>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogDashboardPage() {
  const [activePeriod, setActivePeriod] = useState<ViewPeriod>("30d")

  return (
    <div className="space-y-5">
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Blog Dashboard</h2>
          <p className="text-sm text-muted-foreground mt-0.5">December 2025 · 284 posts published</p>
        </div>
        <Button size="sm">
          <PenLine className="h-3.5 w-3.5" />
          New Post
        </Button>
      </div>

      {/* ── Analytics Summary ─────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-0">
          <CardTitle>Analytics Summary</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          {/* Period tabs */}
          <div className="grid grid-cols-3 gap-3">
            {VIEW_TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActivePeriod(tab.key)}
                className={cn(
                  "rounded-xl border p-4 text-left transition-all",
                  activePeriod === tab.key
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-muted/40 hover:bg-muted"
                )}>
                <p
                  className={cn(
                    "text-2xl font-bold tabular-nums",
                    activePeriod === tab.key ? "text-primary-foreground" : "text-foreground"
                  )}>
                  {tab.value}
                </p>
                <p
                  className={cn(
                    "text-xs mt-0.5",
                    activePeriod === tab.key ? "text-primary-foreground/80" : "text-muted-foreground"
                  )}>
                  {tab.label}
                </p>
              </button>
            ))}
          </div>

          {/* Bar chart */}
          <div>
            <AnalyticsChart period={activePeriod} />
            <div className="flex items-center gap-4 mt-1 pl-7">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-primary inline-block" />
                Blog views
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 3-column section ──────────────────────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-[2fr_2fr_1.6fr]">
        {/* ── Recent Blog List ──────────────────────────────────────────── */}
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

        {/* ── Drafts ───────────────────────────────────────────────────────── */}
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

        {/* ── Create New Blog + Writing Challenges ─────────────────────────── */}
        <div className="space-y-5">
          {/* Create New Blog CTA */}
          <Card className="bg-primary text-primary-foreground border-primary overflow-hidden relative">
            <CardContent className="p-5 space-y-3">
              <div className="space-y-1">
                <h3 className="text-base font-bold">Create New Blog</h3>
                <p className="text-xs text-primary-foreground/75 leading-relaxed">
                  Unleash your creativity by writing a new blog post. Share your unique insights, stories, and expertise
                  with the world.
                </p>
              </div>
              <Button size="sm" variant="secondary" className="w-full font-semibold">
                Create new blog
              </Button>
            </CardContent>
          </Card>

          {/* Writing Challenges */}
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
        </div>
      </div>
    </div>
  )
}

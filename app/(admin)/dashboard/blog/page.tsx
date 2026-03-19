import { PenLine } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AnalyticsSummary } from "./_components/analytics-summary"
import { CreateNewBlog } from "./_components/create-new-blog"
import { DraftsList } from "./_components/drafts-list"
import { RecentBlogList } from "./_components/recent-blog-list"
import { WritingChallenges } from "./_components/writing-challenges"

const BlogDashboardPage = () => (
  <div className="space-y-5">

    {/* ── Header ────────────────────────────────────────────────────────── */}
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Blog Dashboard</h2>
        <p className="text-sm text-muted-foreground mt-0.5">{new Date().toLocaleString("default", { month: "long", year: "numeric" })} · 284 posts published</p>
      </div>
      <Button size="sm">
        <PenLine className="h-3.5 w-3.5" />
        New Post
      </Button>
    </div>

    {/* ── Analytics Summary ─────────────────────────────────────────────── */}
    <AnalyticsSummary />

    {/* ── 3-column section ──────────────────────────────────────────────── */}
    <div className="grid gap-5 lg:grid-cols-[2fr_2fr_1.6fr]">
      <RecentBlogList />
      <DraftsList />
      <div className="space-y-5">
        <CreateNewBlog />
        <WritingChallenges />
      </div>
    </div>

  </div>
)

export default BlogDashboardPage

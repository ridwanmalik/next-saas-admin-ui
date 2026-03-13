"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, MessageSquare, ThumbsUp, Plus, Search, LayoutGrid, List, Edit, Calendar } from "lucide-react"
import Link from "next/link"

type Post = {
  id: number
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  views: number
  likes: number
  comments: number
  status: "Published" | "Draft" | "Archived"
  image: string
}

const POSTS: Post[] = [
  { id: 1, title: "Getting Started with Next.js 16 App Router", excerpt: "A comprehensive guide to building modern web apps with the new App Router paradigm, server components, and co-located data fetching.", category: "Tutorial", author: "Jane Doe", date: "Feb 15, 2026", views: 4821, likes: 342, comments: 28, status: "Published", image: "https://picsum.photos/seed/nextjs-blog/600/400" },
  { id: 2, title: "Tailwind CSS v4: What's New", excerpt: "Explore the most exciting changes in Tailwind v4, from the new engine to the revamped configuration system and performance gains.", category: "Technology", author: "John Smith", date: "Feb 10, 2026", views: 3204, likes: 218, comments: 15, status: "Published", image: "https://picsum.photos/seed/tailwind-blog/600/400" },
  { id: 3, title: "TypeScript Tips for React Developers", excerpt: "Practical TypeScript patterns that will make your React components more type-safe, maintainable, and easier to refactor.", category: "Technology", author: "Jane Doe", date: "Jan 28, 2026", views: 2780, likes: 196, comments: 22, status: "Published", image: "https://picsum.photos/seed/typescript-blog/600/400" },
  { id: 4, title: "Authentication Patterns with Next.js", excerpt: "From session cookies to JWTs and OAuth — learn the right authentication approach for your Next.js application.", category: "Tutorial", author: "Alex Kim", date: "Jan 20, 2026", views: 1950, likes: 143, comments: 11, status: "Published", image: "https://picsum.photos/seed/auth-blog/600/400" },
  { id: 5, title: "Building a Design System from Scratch", excerpt: "Step-by-step guide to creating a scalable, token-based design system that works across web and mobile platforms.", category: "Design", author: "Maria Ortiz", date: "Jan 15, 2026", views: 1420, likes: 98, comments: 8, status: "Published", image: "https://picsum.photos/seed/design-system/600/400" },
  { id: 6, title: "SaaS Pricing Strategies That Work", excerpt: "Tested pricing models, packaging advice, and psychological triggers that convert free users into paying customers.", category: "Business", author: "John Smith", date: "Jan 8, 2026", views: 870, likes: 64, comments: 5, status: "Published", image: "https://picsum.photos/seed/saas-pricing/600/400" },
  { id: 7, title: "Introduction to React Server Components", excerpt: "Understand how React Server Components work under the hood, when to use them, and how they change your mental model.", category: "Tutorial", author: "Jane Doe", date: "Jan 3, 2026", views: 0, likes: 0, comments: 0, status: "Draft", image: "https://picsum.photos/seed/rsc-blog/600/400" },
  { id: 8, title: "State Management in 2026", excerpt: "A landscape overview of modern state management — from Zustand and Jotai to server state with TanStack Query.", category: "Technology", author: "Alex Kim", date: "Dec 20, 2025", views: 3100, likes: 220, comments: 19, status: "Archived", image: "https://picsum.photos/seed/state-mgmt/600/400" },
]

const STATUS_FILTERS = ["All", "Published", "Draft", "Archived"] as const
type StatusFilter = typeof STATUS_FILTERS[number]

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  Published: "default",
  Draft: "secondary",
  Archived: "outline",
}

const BlogListPage = () => {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All")

  const filtered = POSTS.filter(p =>
    (statusFilter === "All" || p.status === statusFilter) &&
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Blog List</h2>
          <p className="text-muted-foreground">Manage all your blog posts.</p>
        </div>
        <Button asChild size="sm">
          <Link href="/blog/new">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-52">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search posts…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-8 h-9"
          />
        </div>

        {/* Status filter tabs */}
        <div className="flex items-center rounded-md border bg-muted/40 p-0.5 gap-0.5">
          {STATUS_FILTERS.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
                statusFilter === s
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div className="flex items-center rounded-md border bg-muted/40 p-0.5">
          <button
            onClick={() => setView("grid")}
            className={`rounded p-1.5 transition-colors ${view === "grid" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`rounded p-1.5 transition-colors ${view === "list" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Count */}
      <p className="text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "post" : "posts"}
      </p>

      {/* Grid view */}
      {view === "grid" && (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map(post => (
            <Card key={post.id} className="overflow-hidden gap-0 p-0 group hover:shadow-md transition-shadow">
              <Link href="/blog/details" className="relative block h-44 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <Badge variant={statusVariant[post.status]}>{post.status}</Badge>
                  <Badge variant="secondary">{post.category}</Badge>
                </div>
              </Link>
              <CardContent className="p-4 space-y-3">
                <Link href="/blog/details" className="block">
                  <h3 className="font-semibold leading-snug line-clamp-2 group-hover:underline">{post.title}</h3>
                </Link>
                <p className="text-xs text-muted-foreground line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{post.views.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" />{post.likes}</span>
                    <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" />{post.comments}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1 border-t">
                  <span className="text-xs text-muted-foreground">{post.author}</span>
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" asChild>
                    <Link href="/blog/edit">
                      <Edit className="mr-1 h-3 w-3" />
                      Edit
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* List view */}
      {view === "list" && (
        <div className="space-y-3">
          {filtered.map(post => (
            <Card key={post.id} className="overflow-hidden gap-0 p-0 group hover:shadow-md transition-shadow">
              <div className="flex">
                <Link href="/blog/details" className="relative h-auto w-44 shrink-0 overflow-hidden sm:w-52">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </Link>
                <CardContent className="flex flex-1 flex-col justify-between p-4 gap-2 min-w-0">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap gap-1.5">
                      <Badge variant={statusVariant[post.status]}>{post.status}</Badge>
                      <Badge variant="secondary">{post.category}</Badge>
                    </div>
                    <Link href="/blog/details">
                      <h3 className="font-semibold leading-snug line-clamp-1 group-hover:underline">{post.title}</h3>
                    </Link>
                    <p className="text-xs text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span>{post.author}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{post.views.toLocaleString()}</span>
                      <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" />{post.likes}</span>
                      <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" />{post.comments}</span>
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" asChild>
                        <Link href="/blog/edit">
                          <Edit className="mr-1 h-3 w-3" />
                          Edit
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default BlogListPage

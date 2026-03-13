"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft, Calendar, Clock, Edit, Eye, MessageSquare,
  ThumbsUp, User, TrendingUp, Flame, Link2, Twitter, Facebook, Linkedin,
  Send, CornerDownRight,
} from "lucide-react"
import Link from "next/link"

const POST = {
  title: "Getting Started with Next.js 16 App Router",
  category: "Tutorial",
  status: "Published",
  author: "Jane Doe",
  date: "February 15, 2026",
  readTime: "8 min read",
  views: 4821,
  likes: 342,
  comments: 28,
  image: "https://picsum.photos/seed/nextjs-blog/1200/500",
  tags: ["Next.js", "React", "Web Development", "App Router"],
  content: [
    "Next.js 16 introduces a new era of web development with the App Router — a powerful paradigm that enables nested layouts, server components, and co-located data fetching.",
    "In this guide, we'll walk through the core concepts you need to understand to build modern, performant web applications. We'll cover routing, layouts, loading states, error boundaries, and data fetching patterns.",
    "The App Router is built on top of React Server Components, which means you can fetch data directly in your component tree without any client-side waterfalls. This dramatically improves initial page load times and reduces the amount of JavaScript shipped to the browser.",
    "Let's start by understanding the file-system based routing that forms the foundation of Next.js. Every folder inside the `app` directory represents a URL segment. A `page.tsx` file inside that folder makes the route publicly accessible.",
    "Layouts are one of the most powerful features of the App Router. A `layout.tsx` file wraps its children and persists across navigations — perfect for sidebars, headers, and other shared UI elements.",
  ],
  relatedPosts: [
    { title: "Tailwind CSS v4: What's New", date: "Feb 10, 2026", category: "Technology", image: "https://picsum.photos/seed/tailwind-blog/80/80" },
    { title: "TypeScript Tips for React Developers", date: "Jan 28, 2026", category: "Technology", image: "https://picsum.photos/seed/typescript-blog/80/80" },
    { title: "Authentication Patterns with Next.js", date: "Jan 20, 2026", category: "Tutorial", image: "https://picsum.photos/seed/auth-blog/80/80" },
  ],
  trendingPosts: [
    { title: "Building a Design System from Scratch", views: 12400, category: "Design", image: "https://picsum.photos/seed/design-system/80/80" },
    { title: "SaaS Pricing Strategies That Work", views: 9870, category: "Business", image: "https://picsum.photos/seed/saas-pricing/80/80" },
    { title: "State Management in 2026", views: 8320, category: "Technology", image: "https://picsum.photos/seed/state-mgmt/80/80" },
    { title: "React Performance Patterns", views: 7150, category: "Tutorial", image: "https://picsum.photos/seed/react-perf/80/80" },
  ],
}

const MORE_ARTICLES = [
  { title: "Mastering Server Actions in Next.js", excerpt: "Learn how to handle form submissions and mutations directly on the server without writing API routes.", category: "Tutorial", date: "Mar 5, 2026", readTime: "6 min read", image: "https://picsum.photos/seed/server-actions/600/400" },
  { title: "CSS Grid vs Flexbox: When to Use Each", excerpt: "A practical breakdown of layout strategies to help you pick the right tool for every design challenge.", category: "Design", date: "Feb 28, 2026", readTime: "5 min read", image: "https://picsum.photos/seed/css-grid/600/400" },
  { title: "Introduction to Edge Functions", excerpt: "Run your code closer to users with edge runtimes — faster responses, lower latency, global reach.", category: "Technology", date: "Feb 20, 2026", readTime: "7 min read", image: "https://picsum.photos/seed/edge-fn/600/400" },
]

type Comment = {
  id: number
  name: string
  avatar: string
  date: string
  body: string
  likes: number
  replies?: Comment[]
}

const INITIAL_COMMENTS: Comment[] = [
  {
    id: 1,
    name: "Alex Kim",
    avatar: "https://i.pravatar.cc/40?img=3",
    date: "Feb 16, 2026",
    body: "This is exactly what I needed! The section on server components really clarified things for me. I've been confused about when to use client vs server components.",
    likes: 14,
    replies: [
      {
        id: 11,
        name: "Jane Doe",
        avatar: "https://i.pravatar.cc/40?img=5",
        date: "Feb 16, 2026",
        body: "Glad it helped, Alex! The mental model really clicks once you think of server components as just \"async functions that return UI.\"",
        likes: 7,
      },
    ],
  },
  {
    id: 2,
    name: "Maria Ortiz",
    avatar: "https://i.pravatar.cc/40?img=9",
    date: "Feb 17, 2026",
    body: "Great write-up. One thing I'd add — nested layouts are also super useful for route groups. You can have completely different shells for `/app` vs `/marketing` without any extra config.",
    likes: 9,
    replies: [],
  },
  {
    id: 3,
    name: "Tom Nguyen",
    avatar: "https://i.pravatar.cc/40?img=12",
    date: "Feb 18, 2026",
    body: "Does this still apply to Next.js 15? I'm not sure all of this was stable in earlier versions.",
    likes: 3,
    replies: [
      {
        id: 31,
        name: "John Smith",
        avatar: "https://i.pravatar.cc/40?img=7",
        date: "Feb 18, 2026",
        body: "Yes, the App Router has been stable since Next.js 13.4. Everything here applies to 15 and 16 without changes.",
        likes: 5,
      },
    ],
  },
]

const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(comment.likes)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyText, setReplyText] = useState("")

  const handleLike = () => {
    setLiked(prev => !prev)
    setLikes(prev => prev + (liked ? -1 : 1))
  }

  return (
    <div className={isReply ? "ml-10 mt-4" : ""}>
      {isReply && <CornerDownRight className="h-3.5 w-3.5 text-muted-foreground/50 mb-2" />}
      <div className="flex gap-3">
        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
          <Image src={comment.avatar} alt={comment.name} fill className="object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold">{comment.name}</span>
            <span className="text-xs text-muted-foreground">{comment.date}</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{comment.body}</p>
          <div className="mt-2 flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-xs transition-colors ${liked ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              <ThumbsUp className="h-3 w-3" />
              {likes}
            </button>
            {!isReply && (
              <button
                onClick={() => setShowReplyForm(p => !p)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageSquare className="h-3 w-3" />
                Reply
              </button>
            )}
          </div>

          {showReplyForm && (
            <div className="mt-3 flex gap-2">
              <Textarea
                placeholder="Write a reply…"
                rows={2}
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                className="text-sm resize-none"
              />
              <Button
                size="sm"
                className="shrink-0 self-end"
                disabled={!replyText.trim()}
                onClick={() => { setReplyText(""); setShowReplyForm(false) }}
              >
                <Send className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {comment.replies?.map(reply => (
        <CommentItem key={reply.id} comment={reply} isReply />
      ))}
    </div>
  )
}

const BlogDetailsPage = () => {
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [body, setBody] = useState("")

  const handleSubmit = () => {
    if (!name.trim() || !body.trim()) return
    const next: Comment = {
      id: Date.now(),
      name: name.trim(),
      avatar: `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 70)}`,
      date: "Just now",
      body: body.trim(),
      likes: 0,
      replies: [],
    }
    setComments(prev => [next, ...prev])
    setName("")
    setEmail("")
    setBody("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/blog/list">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold tracking-tight">Blog Details</h2>
          <p className="text-muted-foreground">Post preview and analytics</p>
        </div>
        <Button asChild>
          <Link href="/blog/edit">
            <Edit className="mr-2 h-4 w-4" />
            Edit Post
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden gap-0 p-0">
            {/* Featured image */}
            <div className="relative h-64 w-full sm:h-80">
              <Image src={POST.image} alt={POST.title} fill className="object-cover" />
            </div>

            <CardContent className="space-y-4 p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{POST.status}</Badge>
                <Badge variant="outline">{POST.category}</Badge>
              </div>

              <h1 className="text-2xl font-bold leading-tight">{POST.title}</h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{POST.author}</span>
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{POST.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{POST.readTime}</span>
                <span className="h-3 w-px bg-border" />
                <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{POST.views.toLocaleString()}</span>
                <span className="flex items-center gap-1"><ThumbsUp className="h-3.5 w-3.5" />{POST.likes}</span>
                <span className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" />{POST.comments}</span>
              </div>

              <Separator />

              <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                {POST.content.map((para, i) => <p key={i}>{para}</p>)}
              </div>

              <Separator />

              <div className="flex flex-wrap gap-2">
                {POST.tags.map(tag => (
                  <span key={tag} className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    #{tag}
                  </span>
                ))}
              </div>

              <Separator />

              {/* Share */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium">Share this article</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Twitter className="h-3.5 w-3.5" />Twitter
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Facebook className="h-3.5 w-3.5" />Facebook
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Linkedin className="h-3.5 w-3.5" />LinkedIn
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Link2 className="h-3.5 w-3.5" />Copy Link
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments */}
          <Card className="gap-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <MessageSquare className="h-4 w-4 text-primary" />
                Comments
                <span className="text-muted-foreground font-normal text-sm">({comments.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* New comment form */}
              <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                <p className="text-sm font-medium">Leave a comment</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="comment-name" className="text-xs">Name <span className="text-destructive">*</span></Label>
                    <Input id="comment-name" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} className="h-8 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="comment-email" className="text-xs">Email</Label>
                    <Input id="comment-email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className="h-8 text-sm" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="comment-body" className="text-xs">Comment <span className="text-destructive">*</span></Label>
                  <Textarea
                    id="comment-body"
                    placeholder="Share your thoughts…"
                    rows={3}
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    className="text-sm resize-none"
                  />
                </div>
                <div className="flex justify-end">
                  <Button size="sm" onClick={handleSubmit} disabled={!name.trim() || !body.trim()}>
                    <Send className="mr-2 h-3.5 w-3.5" />
                    Post Comment
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Comment list */}
              <div className="space-y-6">
                {comments.map(comment => (
                  <div key={comment.id}>
                    <CommentItem comment={comment} />
                    <Separator className="mt-6" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* More Articles */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">More Articles</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {MORE_ARTICLES.map((article, i) => (
                <Link key={i} href="/blog/details" className="group">
                  <Card className="overflow-hidden gap-0 p-0 h-full transition-shadow hover:shadow-md">
                    <div className="relative h-40 w-full">
                      <Image src={article.image} alt={article.title} fill className="object-cover transition-transform group-hover:scale-105" />
                    </div>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">{article.category}</Badge>
                        <span className="text-[11px] text-muted-foreground">{article.readTime}</span>
                      </div>
                      <p className="text-sm font-semibold leading-snug line-clamp-2 group-hover:underline">{article.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{article.excerpt}</p>
                      <p className="text-[11px] text-muted-foreground">{article.date}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4 text-primary" />
                Related Posts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {POST.relatedPosts.map((p, i) => (
                <div key={i}>
                  <Link href="/blog/details" className="flex items-start gap-3 group">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md">
                      <Image src={p.image} alt={p.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight line-clamp-2 group-hover:underline">{p.title}</p>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                        <span>{p.category}</span><span>·</span><span>{p.date}</span>
                      </div>
                    </div>
                  </Link>
                  {i < POST.relatedPosts.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Flame className="h-4 w-4 text-orange-500" />
                Trending
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {POST.trendingPosts.map((p, i) => (
                <div key={i}>
                  <Link href="/blog/details" className="flex items-start gap-3 group">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md">
                      <Image src={p.image} alt={p.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight line-clamp-2 group-hover:underline">{p.title}</p>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                        <span>{p.category}</span><span>·</span>
                        <Eye className="h-3 w-3" /><span>{p.views.toLocaleString()}</span>
                      </div>
                    </div>
                  </Link>
                  {i < POST.trendingPosts.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default BlogDetailsPage

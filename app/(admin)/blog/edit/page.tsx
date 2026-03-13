"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { RichEditor } from "@/components/ui/rich-editor"
import { FileUploader } from "@/components/ui/file-uploader"
import { ArrowLeft, Save, Send, X } from "lucide-react"
import Link from "next/link"

const CATEGORIES = ["Tutorial", "Technology", "Design", "Business", "News"]

const EXISTING_POST = {
  title: "Getting Started with Next.js 16 App Router",
  excerpt: "A comprehensive guide to building modern web applications with the Next.js App Router paradigm.",
  content: `<p>Next.js 16 introduces a new era of web development with the App Router — a powerful paradigm that enables nested layouts, server components, and co-located data fetching.</p><p>In this guide, we'll walk through the core concepts you need to understand to build modern, performant web applications.</p><p>The App Router is built on top of React Server Components, which means you can fetch data directly in your component tree without any client-side waterfalls.</p>`,
  category: "Tutorial",
  tags: ["Next.js", "React", "App Router"],
  metaTitle: "Getting Started with Next.js 16 App Router | Next SaaS Blog",
  metaDesc: "Learn how to build modern web applications using the Next.js 16 App Router, server components, and co-located data fetching.",
  slug: "getting-started-nextjs-16-app-router",
}

const EditPostPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(EXISTING_POST.category)
  const [tags, setTags] = useState(EXISTING_POST.tags)
  const [tagInput, setTagInput] = useState("")

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !tags.includes(t)) setTags(prev => [...prev, t])
    setTagInput("")
  }

  const removeTag = (tag: string) => setTags(prev => prev.filter(t => t !== tag))

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/blog/list">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold tracking-tight">Edit Post</h2>
          <p className="text-muted-foreground">Update your blog article.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button>
            <Send className="mr-2 h-4 w-4" />
            Update
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input id="title" defaultValue={EXISTING_POST.title} className="text-lg" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea id="excerpt" defaultValue={EXISTING_POST.excerpt} rows={2} />
              </div>
              <div className="space-y-1.5">
                <Label>Content</Label>
                <RichEditor variant="full" defaultContent={EXISTING_POST.content} />
              </div>
            </CardContent>
          </Card>

          <Card className="gap-0">
            <CardHeader>
              <CardTitle className="text-base">Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUploader
                accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
                maxFiles={1}
                maxSize={5 * 1024 * 1024}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="gap-0">
            <CardHeader>
              <CardTitle className="text-base">Category</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-muted/30 hover:bg-muted"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="gap-0">
            <CardHeader>
              <CardTitle className="text-base">Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="rounded-full hover:bg-muted-foreground/20 p-0.5">
                      <X className="h-2.5 w-2.5" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag…"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addTag() } }}
                  className="h-8 text-sm"
                />
                <Button size="sm" variant="outline" onClick={addTag}>Add</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="gap-0">
            <CardHeader>
              <CardTitle className="text-base">SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="meta-title" className="text-xs">Meta Title</Label>
                <Input id="meta-title" defaultValue={EXISTING_POST.metaTitle} className="h-8 text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="meta-desc" className="text-xs">Meta Description</Label>
                <Textarea id="meta-desc" defaultValue={EXISTING_POST.metaDesc} rows={3} className="text-sm resize-none" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="slug" className="text-xs">URL Slug</Label>
                <Input id="slug" defaultValue={EXISTING_POST.slug} className="h-8 font-mono text-sm" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default EditPostPage

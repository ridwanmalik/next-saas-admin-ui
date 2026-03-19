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
import { Save, Send, X } from "lucide-react"
import { cn } from "@/lib/utils"

const CATEGORIES = ["Tutorial", "Technology", "Design", "Business", "News"]

const AddNewPostPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [tags, setTags] = useState<string[]>(["Next.js", "React"])
  const [tagInput, setTagInput] = useState("")

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !tags.includes(t)) setTags(prev => [...prev, t])
    setTagInput("")
  }

  const removeTag = (tag: string) => setTags(prev => prev.filter(t => t !== tag))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Add New Post</h2>
          <p className="text-muted-foreground">Write and publish a new blog article.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button>
            <Send className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter post title…" className="text-lg" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea id="excerpt" placeholder="Short description of the post…" rows={2} />
              </div>
              <div className="space-y-1.5">
                <Label>Content</Label>
                <RichEditor variant="full" placeholder="Start writing your post…" />
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
                <Button
                  key={cat}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                  className={cn(selectedCategory === cat && "border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground")}
                >
                  {cat}
                </Button>
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
                <Input id="meta-title" placeholder="SEO title…" className="h-8 text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="meta-desc" className="text-xs">Meta Description</Label>
                <Textarea id="meta-desc" placeholder="SEO description…" rows={3} className="text-sm resize-none" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="slug" className="text-xs">URL Slug</Label>
                <Input id="slug" placeholder="post-url-slug" className="h-8 font-mono text-sm" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AddNewPostPage

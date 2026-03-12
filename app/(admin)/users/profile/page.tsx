import Image from "next/image"
import {
  MapPin, Globe, Twitter, Github, Linkedin,
  Heart, MessageCircle, Repeat2, Bookmark,
  UserPlus, MoreHorizontal, Link2,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// ─── Mock data ────────────────────────────────────────────────────────────────

const USER = {
  name:        "James Okonkwo",
  handle:      "@james_okonkwo",
  bio:         "Building products at the intersection of finance and technology. Shipping things that matter. Dad of 2 🌍",
  location:    "Lagos, Nigeria",
  website:     "bigco.com",
  joinedMonth: "February 2025",
  plan:        "Enterprise",
  initials:    "JO",
  avatarColor: "bg-amber-500",
  avatar:      "https://i.pravatar.cc/160?img=12",
  cover:       "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=300&fit=crop&auto=format",
  followers:   1284,
  following:   318,
  posts:       47,
}

const SOCIAL = [
  { icon: Twitter,  label: "Twitter",  handle: "@james_ok",        color: "text-sky-500"  },
  { icon: Github,   label: "GitHub",   handle: "james-okonkwo",    color: "text-foreground" },
  { icon: Linkedin, label: "LinkedIn", handle: "in/jamesokonkwo",  color: "text-blue-600" },
]

const POSTS = [
  {
    id: 1,
    content: "Just shipped our new dashboard redesign after 3 months of iteration. Huge thanks to the team who stayed late to make this happen. The details matter. 🚀",
    time: "2 hr ago",
    likes: 48,
    comments: 12,
    reposts: 6,
    image: null,
  },
  {
    id: 2,
    content: "Hot take: most SaaS onboarding flows are 3x longer than they need to be. Users don't want a tour — they want their first win, fast. Cut everything else.",
    time: "1 day ago",
    likes: 134,
    comments: 31,
    reposts: 22,
    image: null,
  },
  {
    id: 3,
    content: "We crossed 10,000 active users this week. When we started in January we had 12. Grateful doesn't even cover it.",
    time: "3 days ago",
    likes: 312,
    comments: 54,
    reposts: 41,
    image: null,
  },
  {
    id: 4,
    content: "Reading: 'The Mom Test' for the third time this year. Still the best book on customer conversations. Every founder should have a worn copy.",
    time: "5 days ago",
    likes: 89,
    comments: 17,
    reposts: 14,
    image: null,
  },
  {
    id: 5,
    content: "Reminder that done is better than perfect — but you still have to care. The goal is to ship something you're proud of, not just something that ships.",
    time: "1 week ago",
    likes: 201,
    comments: 28,
    reposts: 33,
    image: null,
  },
]

const SUGGESTED = [
  { name: "Priya Nair",    handle: "@priya_n",   initials: "PN", color: "bg-emerald-500", avatar: "https://i.pravatar.cc/80?img=5"  },
  { name: "Sofia Chen",    handle: "@sofiac",    initials: "SC", color: "bg-pink-500",    avatar: "https://i.pravatar.cc/80?img=9"  },
  { name: "David Park",    handle: "@dpark_io",  initials: "DP", color: "bg-indigo-500",  avatar: "https://i.pravatar.cc/80?img=15" },
  { name: "Amara Diallo",  handle: "@amara_d",   initials: "AD", color: "bg-teal-500",    avatar: "https://i.pravatar.cc/80?img=23" },
]

const PHOTOS = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=200&h=200&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200&h=200&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=200&h=200&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200&h=200&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop&auto=format",
]

// ─── Post card ────────────────────────────────────────────────────────────────

const PostCard = ({ post }: { post: typeof POSTS[number] }) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex gap-3">
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarImage src={USER.avatar} alt={USER.name} />
          <AvatarFallback className={cn("text-xs font-bold text-white", USER.avatarColor)}>
            {USER.initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sm font-semibold">{USER.name}</span>
              <span className="text-xs text-muted-foreground">{USER.handle}</span>
              <span className="text-xs text-muted-foreground">· {post.time}</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" className="text-muted-foreground shrink-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem className="gap-2">
                  <Bookmark className="h-3.5 w-3.5 text-muted-foreground" />
                  Bookmark
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <Link2 className="h-3.5 w-3.5 text-muted-foreground" />
                  Copy link
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="text-sm mt-2 leading-relaxed">{post.content}</p>

          <div className="flex items-center gap-4 mt-3">
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-rose-500 transition-colors">
              <Heart className="h-3.5 w-3.5" />
              {post.likes}
            </button>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-blue-500 transition-colors">
              <MessageCircle className="h-3.5 w-3.5" />
              {post.comments}
            </button>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-emerald-500 transition-colors">
              <Repeat2 className="h-3.5 w-3.5" />
              {post.reposts}
            </button>
            <button className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Bookmark className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)

// ─── Page ─────────────────────────────────────────────────────────────────────

const UserProfilePage = () => (
  <div className="mx-auto w-full max-w-5xl space-y-6">

    {/* ── Cover + avatar ──────────────────────────────────────── */}
    <div className="rounded-xl overflow-hidden border">
      {/* Cover */}
      <div className="relative h-36 bg-muted overflow-hidden">
        <Image src={USER.cover} alt="Cover" fill priority sizes="100vw" className="object-cover" />
      </div>

      {/* Profile row */}
      <div className="bg-card px-5 pb-5">
        <div className="flex items-end justify-between gap-4 -mt-10 flex-wrap">
          <Avatar className="h-20 w-20 ring-4 ring-card shrink-0">
            <AvatarImage src={USER.avatar} alt={USER.name} />
            <AvatarFallback className={cn("text-2xl font-bold text-white", USER.avatarColor)}>
              {USER.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2 pt-12 sm:pt-2">
            <Button size="sm" className="gap-1.5">
              <UserPlus className="h-3.5 w-3.5" />
              Follow
            </Button>
            <Button variant="outline" size="sm">Message</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem className="gap-2">
                  <Link2 className="h-3.5 w-3.5 text-muted-foreground" />
                  Copy profile link
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl font-bold">{USER.name}</h2>
            <Badge>{USER.plan}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{USER.handle}</p>
          <p className="text-sm mt-2 max-w-lg">{USER.bio}</p>

          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />{USER.location}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Globe className="h-3.5 w-3.5" />{USER.website}
            </span>
            {SOCIAL.map(s => {
              const Icon = s.icon
              return (
                <span key={s.label} className={cn("flex items-center gap-1 text-xs", s.color)}>
                  <Icon className="h-3.5 w-3.5" />{s.handle}
                </span>
              )
            })}
          </div>

          <div className="flex gap-4 mt-3">
            <span className="text-sm"><strong>{USER.posts}</strong> <span className="text-muted-foreground">Posts</span></span>
            <span className="text-sm"><strong>{USER.followers.toLocaleString()}</strong> <span className="text-muted-foreground">Followers</span></span>
            <span className="text-sm"><strong>{USER.following}</strong> <span className="text-muted-foreground">Following</span></span>
          </div>
        </div>
      </div>
    </div>

    {/* ── Content grid ────────────────────────────────────────── */}
    <div className="grid gap-6 lg:grid-cols-3">

      {/* Feed */}
      <div className="lg:col-span-2 space-y-3">
        {POSTS.map(post => <PostCard key={post.id} post={post} />)}
      </div>

      {/* Sidebar */}
      <div className="space-y-4">

        {/* Photos */}
        <Card className="gap-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Photos</CardTitle>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground">See all</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-1.5">
              {PHOTOS.map((src, i) => (
                <div key={i} className="relative aspect-square rounded-md overflow-hidden bg-muted">
                  <Image src={src} alt={`Photo ${i + 1}`} fill sizes="120px" className="object-cover" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Suggested */}
        <Card className="gap-3">
          <CardHeader>
            <CardTitle className="text-sm">People to follow</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            {SUGGESTED.map((person, i) => (
              <div key={person.handle}>
                {i > 0 && <Separator className="my-2" />}
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src={person.avatar} alt={person.name} />
                    <AvatarFallback className={cn("text-xs font-semibold text-white", person.color)}>
                      {person.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{person.name}</p>
                    <p className="text-[11px] text-muted-foreground">{person.handle}</p>
                  </div>
                  <Button variant="outline" size="sm" className="h-7 text-xs shrink-0">Follow</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </div>
  </div>
)

export default UserProfilePage

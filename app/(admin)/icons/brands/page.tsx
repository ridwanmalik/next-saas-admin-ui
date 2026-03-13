"use client"

import { useState, useMemo, useEffect } from "react"
import { Search, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type BrandIcon = {
  title: string
  slug: string
  hex: string
  path: string
}

const BrandTile = ({ icon }: { icon: BrandIcon }) => {
  const [copied, setCopied] = useState(false)

  const handleClick = () => {
    navigator.clipboard.writeText(icon.title)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "group flex flex-col items-center gap-2 rounded-xl border bg-card p-3 text-center transition-colors hover:bg-muted/50 hover:border-muted-foreground/30",
      )}
      title={icon.title}
    >
      <div className="flex h-9 w-9 items-center justify-center">
        {copied ? (
          <Check className="h-5 w-5 text-emerald-500" />
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill={`#${icon.hex}`}
            aria-hidden="true"
          >
            <path d={icon.path} />
          </svg>
        )}
      </div>
      <span className="w-full truncate text-[10px] text-muted-foreground leading-tight">
        {copied ? "Copied!" : icon.title}
      </span>
    </button>
  )
}

const BrandsPage = () => {
  const [query, setQuery] = useState("")
  const [allIcons, setAllIcons] = useState<BrandIcon[]>([])

  useEffect(() => {
    import("simple-icons").then(mod => {
      const icons = Object.values(mod).filter(
        v => v != null && typeof v === "object" && "slug" in v
      ) as BrandIcon[]
      setAllIcons(icons)
    })
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return allIcons
    return allIcons.filter(icon =>
      icon.title.toLowerCase().includes(q) || icon.slug.toLowerCase().includes(q)
    )
  }, [query, allIcons])

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Brand Icons</h2>
        <p className="text-muted-foreground">
          {allIcons.length > 0 ? `${allIcons.length} Simple Icons` : "Loading icons…"} — click any to copy the name.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search brands…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {allIcons.length === 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-2">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 rounded-xl border bg-card p-3">
              <div className="h-9 w-9 rounded-lg bg-muted animate-pulse" />
              <div className="h-2 w-12 rounded bg-muted animate-pulse" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 && query ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Search className="h-10 w-10 mb-3 opacity-30" />
          <p className="text-sm">No brands match &quot;{query}&quot;</p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-2">
          {filtered.map(icon => (
            <BrandTile key={icon.slug} icon={icon} />
          ))}
        </div>
      )}

      {allIcons.length > 0 && (
        <p className="text-center text-xs text-muted-foreground pb-4">
          Showing {filtered.length} of {allIcons.length} icons
        </p>
      )}
    </div>
  )
}

export default BrandsPage

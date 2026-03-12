import { cn } from "@/lib/utils"

// ─── Primitives ───────────────────────────────────────────────────────────────

const Section = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <div className="rounded-xl border bg-card p-6">
      {children}
    </div>
  </div>
)

const Grid = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-wrap items-center gap-8">
    {children}
  </div>
)

const Tile = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col items-center gap-3">
    <div className="flex h-16 w-16 items-center justify-center">
      {children}
    </div>
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>
)

// ─── Spinner ──────────────────────────────────────────────────────────────────

const Spinner = ({ size = "md", className }: { size?: "xs" | "sm" | "md" | "lg" | "xl"; className?: string }) => {
  const sizes = { xs: "h-3 w-3", sm: "h-4 w-4", md: "h-6 w-6", lg: "h-8 w-8", xl: "h-12 w-12" }
  return (
    <svg
      className={cn("animate-spin text-primary", sizes[size], className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  )
}

// ─── Dots ─────────────────────────────────────────────────────────────────────

const DotsLoader = ({ size = "md", variant = "bounce" }: { size?: "sm" | "md" | "lg"; variant?: "bounce" | "pulse" | "fade" }) => {
  const dot = { sm: "h-1.5 w-1.5", md: "h-2.5 w-2.5", lg: "h-3.5 w-3.5" }[size]
  const gap  = { sm: "gap-1", md: "gap-1.5", lg: "gap-2" }[size]

  const delays = ["[animation-delay:-0.3s]", "[animation-delay:-0.15s]", ""]

  const animClass = {
    bounce: "animate-bounce",
    pulse:  "animate-pulse",
    fade:   "animate-pulse",
  }[variant]

  return (
    <div className={cn("flex items-center", gap)}>
      {delays.map((delay, i) => (
        <span key={i} className={cn("rounded-full bg-primary", dot, animClass, delay)} />
      ))}
    </div>
  )
}

// ─── Ring ─────────────────────────────────────────────────────────────────────

const RingLoader = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizes = { sm: "h-6 w-6 border-2", md: "h-9 w-9 border-[3px]", lg: "h-12 w-12 border-4" }
  return (
    <span className={cn(
      "inline-block animate-spin rounded-full border-primary/20 border-t-primary",
      sizes[size],
    )} />
  )
}

// ─── Ping ─────────────────────────────────────────────────────────────────────

const PingLoader = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizes = { sm: "h-3 w-3", md: "h-5 w-5", lg: "h-8 w-8" }
  return (
    <span className="relative inline-flex">
      <span className={cn("animate-ping absolute inline-flex rounded-full bg-primary opacity-60", sizes[size])} />
      <span className={cn("relative inline-flex rounded-full bg-primary", sizes[size])} />
    </span>
  )
}

// ─── Bars ─────────────────────────────────────────────────────────────────────

const BarsLoader = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const h   = { sm: "h-4",  md: "h-6",  lg: "h-9"  }[size]
  const w   = { sm: "w-1",  md: "w-1.5", lg: "w-2" }[size]
  const gap = { sm: "gap-0.5", md: "gap-1", lg: "gap-1.5" }[size]
  const delays = ["[animation-delay:-0.45s]", "[animation-delay:-0.3s]", "[animation-delay:-0.15s]", ""]
  return (
    <div className={cn("flex items-end", gap)}>
      {delays.map((delay, i) => (
        <span
          key={i}
          className={cn("animate-bounce rounded-sm bg-primary", w, h, delay)}
          style={{ animationDuration: "0.6s" }}
        />
      ))}
    </div>
  )
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const SkeletonBox = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <div className={cn("animate-pulse rounded-md bg-muted", className)} style={style} />
)

const CardSkeleton = () => (
  <div className="space-y-3 rounded-xl border bg-card p-4 w-64">
    <div className="flex items-center gap-3">
      <SkeletonBox className="h-10 w-10 rounded-full shrink-0" />
      <div className="space-y-2 flex-1">
        <SkeletonBox className="h-3 w-3/4" />
        <SkeletonBox className="h-3 w-1/2" />
      </div>
    </div>
    <SkeletonBox className="h-3 w-full" />
    <SkeletonBox className="h-3 w-5/6" />
    <SkeletonBox className="h-3 w-4/6" />
    <div className="flex gap-2 pt-1">
      <SkeletonBox className="h-7 w-20 rounded-lg" />
      <SkeletonBox className="h-7 w-16 rounded-lg" />
    </div>
  </div>
)

const ListSkeleton = () => (
  <div className="space-y-3 w-64">
    {[80, 100, 65, 90, 75].map((w, i) => (
      <div key={i} className="flex items-center gap-3">
        <SkeletonBox className="h-8 w-8 rounded-full shrink-0" />
        <div className="flex-1 space-y-1.5">
          <SkeletonBox className={`h-2.5`} style={{ width: `${w}%` } as React.CSSProperties} />
          <SkeletonBox className="h-2 w-1/2" />
        </div>
      </div>
    ))}
  </div>
)

const DataTableSkeleton = () => (
  <div className="w-full rounded-xl border overflow-hidden">
    {/* Toolbar */}
    <div className="flex items-center justify-between gap-3 border-b px-4 py-3 bg-muted/30">
      <SkeletonBox className="h-8 w-52 rounded-lg" />
      <div className="flex gap-2">
        <SkeletonBox className="h-8 w-24 rounded-lg" />
        <SkeletonBox className="h-8 w-20 rounded-lg" />
      </div>
    </div>

    {/* Header */}
    <div className="flex items-center gap-4 border-b bg-muted/40 px-4 py-3">
      <SkeletonBox className="h-4 w-4 rounded" />
      {[160, 100, 120, 80, 90].map((w, i) => (
        <SkeletonBox key={i} className="h-3 rounded" style={{ width: `${w}px` }} />
      ))}
      <SkeletonBox className="h-3 w-12 rounded ml-auto" />
    </div>

    {/* Rows */}
    {Array.from({ length: 6 }).map((_, row) => (
      <div key={row} className={cn("flex items-center gap-4 px-4 py-3 border-b last:border-0", row % 2 !== 0 && "bg-muted/10")}>
        <SkeletonBox className="h-4 w-4 rounded" />
        {[160, 100, 120, 80, 90].map((w, i) => (
          <SkeletonBox key={i} className="h-3 rounded" style={{ width: `${w * (0.6 + (row + i) % 3 * 0.2)}px` }} />
        ))}
        <SkeletonBox className="h-6 w-16 rounded-full ml-auto" />
      </div>
    ))}

    {/* Pagination */}
    <div className="flex items-center justify-between px-4 py-3 bg-muted/20">
      <SkeletonBox className="h-3 w-36 rounded" />
      <div className="flex gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonBox key={i} className="h-8 w-8 rounded-lg" />
        ))}
      </div>
    </div>
  </div>
)

const TableSkeleton = () => {
  const cols = [140, 100, 120, 80, 90, 60]
  const fills = [
    [0.9, 0.7, 0.8, 1.0, 0.6, 0.85],
    [0.7, 1.0, 0.6, 0.8, 0.9, 0.7],
    [0.85, 0.6, 1.0, 0.7, 0.75, 1.0],
    [0.6, 0.9, 0.75, 0.9, 1.0, 0.6],
    [1.0, 0.75, 0.85, 0.6, 0.8, 0.9],
  ]
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex gap-4 border-b pb-2 mb-1">
        {cols.map((w, i) => (
          <div key={i} style={{ width: `${w}px`, flexShrink: 0 }}>
            <SkeletonBox className="h-3 rounded" />
          </div>
        ))}
      </div>
      {/* Rows */}
      {fills.map((rowFills, row) => (
        <div key={row} className="flex gap-4 py-1.5 border-b last:border-0">
          {cols.map((w, i) => (
            <div key={i} style={{ width: `${w}px`, flexShrink: 0 }}>
              <SkeletonBox className="h-3 rounded" style={{ width: `${Math.round(w * rowFills[i])}px` }} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

const IndeterminateBar = ({ className }: { className?: string }) => (
  <div className={cn("relative h-1.5 w-full overflow-hidden rounded-full bg-primary/15", className)}>
    <div className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-primary animate-[indeterminate_1.4s_ease-in-out_infinite]" />
    <style>{`
      @keyframes indeterminate {
        0%   { transform: translateX(-100%) scaleX(1); }
        50%  { transform: translateX(100%) scaleX(1.5); }
        100% { transform: translateX(300%) scaleX(1); }
      }
    `}</style>
  </div>
)

// ─── Page ─────────────────────────────────────────────────────────────────────

const LoadersPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-10">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Loaders</h2>
      <p className="text-muted-foreground">Loading indicators and skeleton screens for async states.</p>
    </div>

    <Section title="Spinner" description="Classic rotating arc — multiple sizes.">
      <Grid>
        {(["xs", "sm", "md", "lg", "xl"] as const).map(size => (
          <Tile key={size} label={size}><Spinner size={size} /></Tile>
        ))}
      </Grid>
    </Section>

    <Section title="Ring" description="Simple border-based spinning ring.">
      <Grid>
        {(["sm", "md", "lg"] as const).map(size => (
          <Tile key={size} label={size}><RingLoader size={size} /></Tile>
        ))}
      </Grid>
    </Section>

    <Section title="Dots" description="Three-dot loaders in bounce, pulse, and fade variants.">
      <Grid>
        <Tile label="bounce"><DotsLoader variant="bounce" /></Tile>
        <Tile label="pulse"><DotsLoader variant="pulse" /></Tile>
        <Tile label="sm"><DotsLoader size="sm" /></Tile>
        <Tile label="lg"><DotsLoader size="lg" /></Tile>
      </Grid>
    </Section>

    <Section title="Bars" description="Animated equaliser-style bar loader.">
      <Grid>
        {(["sm", "md", "lg"] as const).map(size => (
          <Tile key={size} label={size}><BarsLoader size={size} /></Tile>
        ))}
      </Grid>
    </Section>

    <Section title="Ping" description="Radiating pulse dot — great for live status indicators.">
      <Grid>
        {(["sm", "md", "lg"] as const).map(size => (
          <Tile key={size} label={size}><PingLoader size={size} /></Tile>
        ))}
      </Grid>
    </Section>

    <Section title="Progress Bar" description="Indeterminate progress bar for page or section loading.">
      <div className="space-y-4">
        <IndeterminateBar />
        <IndeterminateBar className="h-2" />
        <IndeterminateBar className="h-3" />
      </div>
    </Section>

    <Section title="Skeleton — Card" description="Placeholder while a content card loads.">
      <CardSkeleton />
    </Section>

    <Section title="Skeleton — List" description="Placeholder for a list or feed of items.">
      <ListSkeleton />
    </Section>

    <Section title="Skeleton — Table" description="Placeholder while a data table loads.">
      <TableSkeleton />
    </Section>

    <Section title="Skeleton — Data Table" description="Full data table placeholder with toolbar and pagination.">
      <DataTableSkeleton />
    </Section>
  </div>
)

export default LoadersPage

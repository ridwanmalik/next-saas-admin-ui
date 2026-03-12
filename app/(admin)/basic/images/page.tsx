import { cn } from "@/lib/utils"

const Section = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <div className="rounded-xl border bg-card p-6">{children}</div>
  </div>
)

// Placeholder image using picsum.photos (seeded so images are consistent)
const Img = ({
  seed = 10,
  width = 400,
  height = 300,
  className,
  alt = "Placeholder image",
}: {
  seed?: number
  width?: number
  height?: number
  className?: string
  alt?: string
}) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={`https://picsum.photos/seed/${seed}/${width}/${height}`}
    width={width}
    height={height}
    alt={alt}
    loading="lazy"
    className={cn("object-cover", className)}
  />
)

const ImagesPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-10">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Images</h2>
      <p className="text-muted-foreground">Image shapes, aspect ratios, overlays, and layout patterns.</p>
    </div>

    {/* Shapes */}
    <Section title="Shapes & border radius" description="Square, rounded, and circular image crops.">
      <div className="flex flex-wrap items-end gap-6">
        <div className="flex flex-col items-center gap-2">
          <Img seed={10} width={96} height={96} className="w-24 h-24 rounded-none" />
          <span className="text-xs text-muted-foreground">Square</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Img seed={11} width={96} height={96} className="w-24 h-24 rounded-lg" />
          <span className="text-xs text-muted-foreground">Rounded</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Img seed={12} width={96} height={96} className="w-24 h-24 rounded-2xl" />
          <span className="text-xs text-muted-foreground">2xl</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Img seed={13} width={96} height={96} className="w-24 h-24 rounded-full" />
          <span className="text-xs text-muted-foreground">Circle</span>
        </div>
      </div>
    </Section>

    {/* Avatar sizes */}
    <Section title="Avatar sizes" description="Circular images at common avatar sizes.">
      <div className="flex flex-wrap items-end gap-4">
        {[
          { size: 8,  label: "8" },
          { size: 10, label: "10" },
          { size: 12, label: "12" },
          { size: 16, label: "16" },
          { size: 20, label: "20" },
          { size: 24, label: "24" },
        ].map(({ size, label }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <Img
              seed={20 + size}
              width={size * 4}
              height={size * 4}
              className={cn("rounded-full shrink-0", `w-${size} h-${size}`)}
            />
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </Section>

    {/* Aspect ratios */}
    <Section title="Aspect ratios" description="Common aspect ratios using a fixed-width container.">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "1:1 — Square",   ratio: "aspect-square"    },
          { label: "4:3 — Classic",  ratio: "aspect-[4/3]"     },
          { label: "16:9 — Wide",    ratio: "aspect-video"     },
          { label: "3:4 — Portrait", ratio: "aspect-[3/4]"     },
          { label: "21:9 — Ultra",   ratio: "aspect-[21/9]"    },
          { label: "2:1 — Banner",   ratio: "aspect-[2/1]"     },
        ].map(({ label, ratio }, i) => (
          <div key={label} className="space-y-1.5">
            <div className={cn("w-full overflow-hidden rounded-lg bg-muted", ratio)}>
              <Img seed={30 + i} width={400} height={400} className="w-full h-full" />
            </div>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    </Section>

    {/* With caption */}
    <Section title="Figure with caption" description="Semantic figure + figcaption for labelled images.">
      <figure className="space-y-2 max-w-sm">
        <Img seed={40} width={600} height={400} className="w-full rounded-xl" />
        <figcaption className="text-xs text-muted-foreground text-center">
          Fig. 1 — A sample landscape photograph used as a placeholder.
        </figcaption>
      </figure>
    </Section>

    {/* Overlay */}
    <Section title="Image with overlay" description="Text or gradient layered on top of an image.">
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Gradient overlay */}
        <div className="relative overflow-hidden rounded-xl">
          <Img seed={50} width={600} height={400} className="w-full h-44" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4">
            <p className="text-sm font-semibold text-white">Mountain Landscape</p>
            <p className="text-xs text-white/70">Captured in the Swiss Alps, 2024</p>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="relative overflow-hidden rounded-xl group cursor-pointer">
          <Img seed={51} width={600} height={400} className="w-full h-44 transition-transform duration-300 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
            <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View photo
            </span>
          </div>
        </div>
      </div>
    </Section>

    {/* Grid layouts */}
    <Section title="Image grid" description="Masonry-style and uniform grid layouts.">
      <div className="space-y-4">
        {/* Uniform 3-col */}
        <div className="grid grid-cols-3 gap-2">
          {[60, 61, 62, 63, 64, 65].map(seed => (
            <div key={seed} className="aspect-square overflow-hidden rounded-lg">
              <Img seed={seed} width={200} height={200} className="w-full h-full" />
            </div>
          ))}
        </div>

        {/* Featured + small */}
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2 row-span-2 overflow-hidden rounded-lg">
            <Img seed={70} width={400} height={400} className="w-full h-full" style={{ minHeight: "200px" }} />
          </div>
          <div className="overflow-hidden rounded-lg aspect-square">
            <Img seed={71} width={200} height={200} className="w-full h-full" />
          </div>
          <div className="overflow-hidden rounded-lg aspect-square">
            <Img seed={72} width={200} height={200} className="w-full h-full" />
          </div>
        </div>
      </div>
    </Section>

    {/* Border & shadow */}
    <Section title="Border & shadow" description="Image treatments with borders and drop shadows.">
      <div className="flex flex-wrap gap-6 items-end">
        <div className="flex flex-col items-center gap-2">
          <Img seed={80} width={120} height={120} className="w-28 h-28 rounded-xl border-2 border-border" />
          <span className="text-xs text-muted-foreground">Border</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Img seed={81} width={120} height={120} className="w-28 h-28 rounded-xl border-2 border-primary" />
          <span className="text-xs text-muted-foreground">Primary border</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Img seed={82} width={120} height={120} className="w-28 h-28 rounded-xl shadow-md" />
          <span className="text-xs text-muted-foreground">Shadow md</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Img seed={83} width={120} height={120} className="w-28 h-28 rounded-xl shadow-xl" />
          <span className="text-xs text-muted-foreground">Shadow xl</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Img seed={84} width={120} height={120} className="w-28 h-28 rounded-full ring-4 ring-primary ring-offset-2 ring-offset-background" />
          <span className="text-xs text-muted-foreground">Ring</span>
        </div>
      </div>
    </Section>

    {/* Responsive */}
    <Section title="Responsive full-width" description="Image that fills its container and maintains ratio.">
      <div className="space-y-2">
        <div className="aspect-video w-full overflow-hidden rounded-xl">
          <Img seed={90} width={1200} height={675} className="w-full h-full" />
        </div>
        <p className="text-xs text-muted-foreground">
          Use <code className="bg-muted px-1 rounded font-mono">aspect-video</code> +{" "}
          <code className="bg-muted px-1 rounded font-mono">w-full h-full object-cover</code> for fully responsive images.
        </p>
      </div>
    </Section>

  </div>
)

export default ImagesPage

const Section = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <div className="rounded-xl border bg-card p-6">{children}</div>
  </div>
)

const THEME_TOKENS = [
  { name: "background",        var: "--background",        class: "bg-background border"        },
  { name: "foreground",        var: "--foreground",        class: "bg-foreground"                },
  { name: "card",              var: "--card",              class: "bg-card border"               },
  { name: "primary",           var: "--primary",           class: "bg-primary"                   },
  { name: "primary-foreground",var: "--primary-foreground",class: "bg-primary-foreground border" },
  { name: "secondary",         var: "--secondary",         class: "bg-secondary"                 },
  { name: "muted",             var: "--muted",             class: "bg-muted"                     },
  { name: "muted-foreground",  var: "--muted-foreground",  class: "bg-muted-foreground"          },
  { name: "accent",            var: "--accent",            class: "bg-accent"                    },
  { name: "destructive",       var: "--destructive",       class: "bg-destructive"               },
  { name: "border",            var: "--border",            class: "bg-border"                    },
  { name: "ring",              var: "--ring",              class: "bg-ring"                      },
]

const SEMANTIC = [
  { label: "Success",  bg: "bg-emerald-500",  text: "text-emerald-700 dark:text-emerald-300",  light: "bg-emerald-500/10" },
  { label: "Warning",  bg: "bg-amber-500",    text: "text-amber-700 dark:text-amber-300",      light: "bg-amber-500/10"   },
  { label: "Error",    bg: "bg-red-500",      text: "text-red-700 dark:text-red-300",          light: "bg-red-500/10"     },
  { label: "Info",     bg: "bg-blue-500",     text: "text-blue-700 dark:text-blue-300",        light: "bg-blue-500/10"    },
]

const GRAYS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

const ColorsPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-10">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Colors</h2>
      <p className="text-muted-foreground">Design token palette, semantic colors, and Tailwind gray scale.</p>
    </div>

    <Section title="Theme tokens" description="CSS variables used throughout the design system.">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {THEME_TOKENS.map(({ name, var: cssVar, class: cls }) => (
          <div key={name} className="space-y-1.5">
            <div className={`h-10 rounded-lg ${cls}`} />
            <div>
              <p className="text-xs font-medium">{name}</p>
              <p className="text-[10px] font-mono text-muted-foreground">{cssVar}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>

    <Section title="Semantic colors" description="Status colors for feedback states.">
      <div className="grid gap-4 sm:grid-cols-2">
        {SEMANTIC.map(({ label, bg, text, light }) => (
          <div key={label} className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">{label}</p>
            <div className="flex gap-2">
              <div className={`h-10 flex-1 rounded-lg ${bg}`} />
              <div className={`h-10 flex-1 rounded-lg ${light} border`} />
            </div>
            <div className={`rounded-lg px-3 py-2 ${light} border`}>
              <p className={`text-xs font-medium ${text}`}>{label} message example</p>
            </div>
          </div>
        ))}
      </div>
    </Section>

    <Section title="Gray scale" description="Tailwind neutral gray ramp from 50 to 950.">
      <div className="space-y-2">
        {GRAYS.map(shade => (
          <div key={shade} className="flex items-center gap-3">
            <div
              className="h-8 flex-1 rounded-md"
              style={{ backgroundColor: `oklch(from var(--background) calc(l - ${(shade - 500) / 2000}) 0 0)` }}
            />
            <span className="text-[10px] font-mono text-muted-foreground w-8 text-right">{shade}</span>
          </div>
        ))}
        <p className="text-xs text-muted-foreground pt-1">
          Tip: use Tailwind classes like <code className="bg-muted px-1 rounded font-mono text-[10px]">bg-neutral-100</code> for explicit gray shades.
        </p>
      </div>
    </Section>

    <Section title="Tailwind color palette" description="A sample of Tailwind's full color spectrum.">
      <div className="space-y-2">
        {[
          { name: "Red",     shades: ["bg-red-100", "bg-red-300", "bg-red-500", "bg-red-700", "bg-red-900"]       },
          { name: "Orange",  shades: ["bg-orange-100", "bg-orange-300", "bg-orange-500", "bg-orange-700", "bg-orange-900"] },
          { name: "Amber",   shades: ["bg-amber-100", "bg-amber-300", "bg-amber-500", "bg-amber-700", "bg-amber-900"]   },
          { name: "Green",   shades: ["bg-green-100", "bg-green-300", "bg-green-500", "bg-green-700", "bg-green-900"]   },
          { name: "Blue",    shades: ["bg-blue-100", "bg-blue-300", "bg-blue-500", "bg-blue-700", "bg-blue-900"]     },
          { name: "Violet",  shades: ["bg-violet-100", "bg-violet-300", "bg-violet-500", "bg-violet-700", "bg-violet-900"] },
          { name: "Pink",    shades: ["bg-pink-100", "bg-pink-300", "bg-pink-500", "bg-pink-700", "bg-pink-900"]     },
        ].map(({ name, shades }) => (
          <div key={name} className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-14 shrink-0">{name}</span>
            <div className="flex flex-1 gap-1">
              {shades.map(s => (
                <div key={s} className={`h-7 flex-1 rounded-md ${s}`} title={s.replace("bg-", "")} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>

    <Section title="Text on backgrounds" description="Contrast combinations for accessibility.">
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { bg: "bg-primary",      text: "text-primary-foreground", label: "Primary"   },
          { bg: "bg-secondary",    text: "text-secondary-foreground", label: "Secondary" },
          { bg: "bg-muted",        text: "text-muted-foreground",   label: "Muted"     },
          { bg: "bg-destructive",  text: "text-white",              label: "Destructive"},
        ].map(({ bg, text, label }) => (
          <div key={label} className={`rounded-lg px-4 py-3 ${bg}`}>
            <p className={`text-sm font-medium ${text}`}>{label}</p>
            <p className={`text-xs ${text} opacity-80`}>Foreground text on {label.toLowerCase()} bg</p>
          </div>
        ))}
      </div>
    </Section>
  </div>
)

export default ColorsPage

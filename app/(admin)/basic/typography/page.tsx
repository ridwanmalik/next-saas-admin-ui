import { cn } from "@/lib/utils"

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <h3 className="text-sm font-semibold">{title}</h3>
    <div className="rounded-xl border bg-card p-6 space-y-4">{children}</div>
  </div>
)

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{label}</span>
    {children}
  </div>
)

const TypographyPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-10">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Typography</h2>
      <p className="text-muted-foreground">Heading scales, paragraph styles, and text utilities.</p>
    </div>

    <Section title="Headings">
      <Row label="h1"><h1 className="text-4xl font-bold tracking-tight">The quick brown fox</h1></Row>
      <Row label="h2"><h2 className="text-3xl font-semibold tracking-tight">The quick brown fox</h2></Row>
      <Row label="h3"><h3 className="text-2xl font-semibold tracking-tight">The quick brown fox</h3></Row>
      <Row label="h4"><h4 className="text-xl font-semibold">The quick brown fox</h4></Row>
      <Row label="h5"><h5 className="text-base font-semibold">The quick brown fox</h5></Row>
      <Row label="h6"><h6 className="text-sm font-semibold text-muted-foreground">The quick brown fox</h6></Row>
    </Section>

    <Section title="Body text">
      <Row label="large">
        <p className="text-lg leading-relaxed">
          Platform engineering helps teams build better software faster by providing golden paths, internal tooling, and self-service infrastructure.
        </p>
      </Row>
      <Row label="base">
        <p className="text-base leading-relaxed">
          Platform engineering helps teams build better software faster by providing golden paths, internal tooling, and self-service infrastructure. It reduces cognitive load and lets developers focus on delivering value.
        </p>
      </Row>
      <Row label="small">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Platform engineering helps teams build better software faster by providing golden paths, internal tooling, and self-service infrastructure. It reduces cognitive load and lets developers focus on delivering value.
        </p>
      </Row>
      <Row label="xs">
        <p className="text-xs text-muted-foreground">
          Supplementary text — captions, footnotes, helper copy. Use sparingly to avoid visual clutter.
        </p>
      </Row>
    </Section>

    <Section title="Font weights">
      {(["font-light", "font-normal", "font-medium", "font-semibold", "font-bold", "font-extrabold"] as const).map(w => (
        <Row key={w} label={w.replace("font-", "")}>
          <p className={cn("text-base", w)}>The quick brown fox jumps over the lazy dog</p>
        </Row>
      ))}
    </Section>

    <Section title="Text colors">
      <Row label="foreground"><p className="text-base text-foreground">Primary content text</p></Row>
      <Row label="muted-foreground"><p className="text-base text-muted-foreground">Secondary / helper text</p></Row>
      <Row label="primary"><p className="text-base text-primary font-medium">Accent / brand text</p></Row>
      <Row label="destructive"><p className="text-base text-destructive font-medium">Error or danger text</p></Row>
    </Section>

    <Section title="Inline styles">
      <div className="text-base space-y-2.5 text-muted-foreground">
        <p><strong className="text-foreground font-semibold">Bold</strong> — for emphasis on key terms or phrases.</p>
        <p><em>Italic</em> — for titles, foreign words, or soft emphasis.</p>
        <p><u>Underline</u> — for hyperlinks or important terms.</p>
        <p><s className="text-muted-foreground/60">Strikethrough</s> — for removed or deprecated content.</p>
        <p>Inline <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">code</code> — for variable names or snippets.</p>
        <p>Super<sup className="text-xs">script</sup> and Sub<sub className="text-xs">script</sub></p>
        <p><mark className="bg-amber-200/60 dark:bg-amber-400/20 px-0.5 rounded">Highlighted text</mark> — for drawing attention to specific content.</p>
      </div>
    </Section>

    <Section title="Text alignment">
      {(["left", "center", "right", "justify"] as const).map(align => (
        <Row key={align} label={align}>
          <p className={cn("text-sm text-muted-foreground", `text-${align}`)}>
            Platform engineering provides self-service tooling that reduces cognitive overhead for developers across teams.
          </p>
        </Row>
      ))}
    </Section>

    <Section title="Line heights">
      <Row label="leading-tight">
        <p className="text-base leading-tight">Line height tight — best for headings and short display text where generous spacing would feel loose.</p>
      </Row>
      <Row label="leading-normal">
        <p className="text-base leading-normal">Line height normal — the browser default. Fine for short blocks but can feel cramped in body copy.</p>
      </Row>
      <Row label="leading-relaxed">
        <p className="text-base leading-relaxed">Line height relaxed — the sweet spot for body copy. Improves readability across longer paragraphs and prose.</p>
      </Row>
      <Row label="leading-loose">
        <p className="text-base leading-loose">Line height loose — generous spacing, often used in UI labels, forms, or airy editorial layouts.</p>
      </Row>
    </Section>
  </div>
)

export default TypographyPage

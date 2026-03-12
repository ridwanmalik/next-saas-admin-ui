import { Badge } from "@/components/ui/badge"

const TEAM = [
  { name: "Alex Morgan",   role: "CEO & Co-founder",      initials: "AM", bio: "Previously VP Engineering at Stripe. Obsessed with developer experience and elegant systems." },
  { name: "Sarah Chen",    role: "CTO & Co-founder",      initials: "SC", bio: "Ex-Google infrastructure engineer. Believes great software is invisible — it just works." },
  { name: "James Park",    role: "Head of Design",        initials: "JP", bio: "Spent 8 years at Figma crafting tools that millions of designers rely on every day." },
  { name: "Priya Nair",    role: "Head of Product",       initials: "PN", bio: "Former PM at Linear. Passionate about making complex workflows feel effortless." },
  { name: "Tom Rivera",    role: "Head of Growth",        initials: "TR", bio: "Scaled three B2B SaaS companies from zero to Series B. Data-driven to the core." },
  { name: "Leila Hassan",  role: "Head of Customer Success", initials: "LH", bio: "Believes the best support is proactive. Reduced churn by 60% at her last company." },
]

const VALUES = [
  { title: "Ship fast, learn faster",   description: "We believe speed of learning beats speed of execution. We launch, measure, and iterate constantly." },
  { title: "Radical transparency",      description: "From our roadmap to our metrics — we share openly with our team and our customers." },
  { title: "Respect people's time",     description: "Every feature we build should save more time than it takes to learn. Complexity is a bug." },
  { title: "Long-term thinking",        description: "We optimise for 10-year outcomes, not next quarter's numbers. Quality compounds." },
]

const MILESTONES = [
  { year: "2020", event: "Founded in San Francisco with a team of 3 and a rented desk." },
  { year: "2021", event: "Launched public beta. 1,000 sign-ups in the first week." },
  { year: "2022", event: "Raised $6M seed round. Grew team to 18 people across 4 countries." },
  { year: "2023", event: "Hit 20,000 active teams. Launched enterprise tier and SOC2 certification." },
  { year: "2024", event: "Raised $28M Series A. Expanded to EMEA and APAC." },
  { year: "2025", event: "50,000+ teams. Processing over 2 billion events per month." },
]

const LandingAboutPage = () => (
  <div className="mx-auto w-full max-w-5xl space-y-20 pb-16">

    {/* Mission */}
    <section className="pt-10 space-y-4 max-w-2xl">
      <Badge variant="secondary" className="rounded-full px-4 py-1 text-xs">Our story</Badge>
      <h1 className="text-4xl font-bold tracking-tight leading-tight">
        Built by builders,<br />for builders
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed">
        We started this company because we were frustrated with the tools available to us.
        Too complex, too expensive, too fragmented. We set out to build the platform we
        always wished existed — and now 50,000 teams use it every day.
      </p>
    </section>

    {/* Values */}
    <section className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight">What we believe</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        {VALUES.map(({ title, description }) => (
          <div key={title} className="rounded-xl border bg-card p-5 space-y-2">
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Timeline */}
    <section className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight">Our journey</h2>
      <div className="relative space-y-0">
        {MILESTONES.map(({ year, event }, i) => (
          <div key={year} className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background z-10">
                <div className="h-2 w-2 rounded-full bg-primary" />
              </div>
              {i < MILESTONES.length - 1 && (
                <div className="w-px flex-1 bg-border my-1" />
              )}
            </div>
            <div className="pb-8 pt-1 space-y-1">
              <span className="text-xs font-semibold text-primary">{year}</span>
              <p className="text-sm text-muted-foreground leading-relaxed">{event}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Team */}
    <section className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight">Meet the team</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TEAM.map(({ name, role, initials, bio }) => (
          <div key={name} className="rounded-xl border bg-card p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {initials}
              </div>
              <div>
                <p className="font-semibold text-sm">{name}</p>
                <p className="text-xs text-muted-foreground">{role}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{bio}</p>
          </div>
        ))}
      </div>
    </section>

  </div>
)

export default LandingAboutPage

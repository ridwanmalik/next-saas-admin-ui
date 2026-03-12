import { ArrowRight, BarChart3, Shield, Zap, Globe, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const FEATURES = [
  { icon: Zap,       title: "Lightning Fast",    description: "Optimised for performance. Pages load in under 100ms with edge delivery and smart caching." },
  { icon: Shield,    title: "Secure by Default", description: "SOC2 compliant infrastructure with end-to-end encryption and automatic threat detection." },
  { icon: BarChart3, title: "Deep Analytics",    description: "Real-time dashboards, custom reports, and AI-powered insights to drive smarter decisions." },
  { icon: Globe,     title: "Global Scale",      description: "Deploy to 30+ regions instantly. Your product grows without you thinking about infrastructure." },
  { icon: Users,     title: "Team Collaboration",description: "Invite unlimited teammates, assign roles, and ship together with live presence and comments." },
  { icon: Star,      title: "5-Star Support",    description: "24/7 support from engineers who built the product. Average first response under 4 minutes." },
]

const STATS = [
  { value: "50K+",  label: "Active users"    },
  { value: "99.9%", label: "Uptime SLA"      },
  { value: "180ms", label: "Avg. load time"  },
  { value: "4 min", label: "Support response"},
]

const TESTIMONIALS = [
  { name: "Sarah Chen",   role: "CTO, Verve",       body: "Switching to this platform cut our infrastructure cost by 40% and our team ships twice as fast. I can't imagine going back." },
  { name: "James Park",   role: "Founder, Arclight", body: "The analytics alone are worth it. We finally understand where users drop off and have improved conversion by 28% in 6 weeks." },
  { name: "Priya Nair",   role: "PM, Forma",         body: "Onboarding took less than a day. The docs are excellent and the support team actually knows the product inside and out." },
]

const LandingHomePage = () => (
  <div className="mx-auto w-full max-w-5xl space-y-20 pb-16">

    {/* Hero */}
    <section className="pt-10 text-center space-y-6">
      <Badge variant="secondary" className="rounded-full px-4 py-1 text-xs">
        Now in public beta · Join 50,000+ teams
      </Badge>
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
        The platform that grows<br className="hidden sm:block" /> with your business
      </h1>
      <p className="mx-auto max-w-xl text-lg text-muted-foreground">
        Everything your team needs to build, ship, and scale — analytics, auth,
        storage, and more — in one beautifully simple dashboard.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button size="lg" className="gap-2">
          Start for free <ArrowRight className="h-4 w-4" />
        </Button>
        <Button size="lg" variant="outline">View demo</Button>
      </div>
    </section>

    {/* Stats */}
    <section className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl border bg-border overflow-hidden">
      {STATS.map(({ value, label }) => (
        <div key={label} className="flex flex-col items-center gap-1 bg-card px-6 py-8">
          <span className="text-3xl font-bold tabular-nums">{value}</span>
          <span className="text-sm text-muted-foreground">{label}</span>
        </div>
      ))}
    </section>

    {/* Features */}
    <section className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Everything you need</h2>
        <p className="text-muted-foreground">Built for teams who move fast and care about quality.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <div key={title} className="rounded-xl border bg-card p-5 space-y-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-4.5 w-4.5 text-primary" />
            </div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Testimonials */}
    <section className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Loved by builders</h2>
        <p className="text-muted-foreground">Don&apos;t take our word for it.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        {TESTIMONIALS.map(({ name, role, body }) => (
          <div key={name} className="rounded-xl border bg-card p-5 space-y-4">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">&ldquo;{body}&rdquo;</p>
            <div>
              <p className="text-sm font-semibold">{name}</p>
              <p className="text-xs text-muted-foreground">{role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="rounded-2xl border bg-card p-10 text-center space-y-5">
      <h2 className="text-2xl font-bold tracking-tight">Ready to get started?</h2>
      <p className="text-muted-foreground max-w-md mx-auto">
        Free for up to 3 team members. No credit card required. Set up in under 5 minutes.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button size="lg" className="gap-2">
          Create free account <ArrowRight className="h-4 w-4" />
        </Button>
        <Button size="lg" variant="outline">Talk to sales</Button>
      </div>
    </section>

  </div>
)

export default LandingHomePage

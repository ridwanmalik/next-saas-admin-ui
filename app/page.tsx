import Link from "next/link"
import {
  BarChart3,
  Bell,
  ChevronRight,
  FileText,
  LayoutDashboard,
  Lock,
  Settings,
  Shield,
  Users,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LandingNavbar } from "@/app/_components/landing-navbar"

const features = [
  {
    icon: LayoutDashboard,
    title: "Powerful Dashboard",
    description:
      "Real-time KPIs, sparklines, and stat cards give you instant visibility into your business metrics.",
  },
  {
    icon: Users,
    title: "User Management",
    description:
      "Manage roles, permissions, and accounts with a full-featured data table and bulk actions.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description:
      "Deep-dive into traffic, revenue, and retention with interactive charts and exportable reports.",
  },
  {
    icon: FileText,
    title: "Billing & Invoices",
    description:
      "Track subscriptions, generate invoices, and monitor payment status from one place.",
  },
  {
    icon: Bell,
    title: "Notifications",
    description:
      "Unified notification centre keeps your team aligned without leaving the admin panel.",
  },
  {
    icon: Lock,
    title: "Security Center",
    description:
      "Audit logs, two-factor settings, and session management built right in.",
  },
]

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <LandingNavbar />

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-28 max-w-4xl mx-auto w-full">
        <Badge variant="secondary" className="mb-6 gap-1.5">
          <Zap className="size-3" />
          Built with Next.js 15 &amp; Tailwind v4
        </Badge>

        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight mb-6">
          The admin panel your
          <br />
          <span className="text-primary">SaaS deserves</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mb-10">
          A fully-featured, open-source admin template — dashboards, user management, analytics,
          billing, and security, all wired up and ready to ship.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/dashboard">
              Live preview <ChevronRight className="size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              Purchase now
            </Link>
          </Button>
        </div>

        {/* Decorative dashboard preview hint */}
        <div className="mt-16 w-full max-w-3xl rounded-2xl border border-border bg-muted/40 h-72 flex items-center justify-center text-muted-foreground/40">
          <div className="flex flex-col items-center gap-2">
            <LayoutDashboard className="size-10" />
            <span className="text-sm">Dashboard preview</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight mb-3">Everything you need</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every page and pattern you&apos;ll need to build a world-class SaaS product, without
              starting from scratch.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-background rounded-xl border border-border p-6 flex flex-col gap-3 hover:shadow-sm transition-shadow"
              >
                <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="size-4 text-primary" />
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8">
            Jump into the live demo or clone the repo and make it your own.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Live preview <ChevronRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#">Purchase now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="size-4 text-primary" />
            <span className="font-medium text-foreground">Next SaaS</span>
          </div>
          <div className="flex items-center gap-2">
            <Settings className="size-3.5" />
            <Link href="/settings" className="hover:text-foreground transition-colors">
              Settings
            </Link>
            <span className="mx-1">·</span>
            <Link href="/dashboard" className="hover:text-foreground transition-colors">
              Dashboard
            </Link>
          </div>
          <p>&copy; {new Date().getFullYear()} Next SaaS. MIT License.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search, LayoutDashboard, Users, FileText, BarChart2,
  ShoppingCart, Mail, Calendar, Settings, Shield,
  CreditCard, Bell, MapPin, MessageSquare,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { cn } from "@/lib/utils"

type SearchResult = {
  title: string
  description: string
  href: string
  icon: LucideIcon
  category: string
  badge?: string
}

const ALL_RESULTS: SearchResult[] = [
  { title: "Dashboard",            description: "Main overview with KPI cards, charts, and recent activity",   href: "/dashboard",            icon: LayoutDashboard, category: "Pages" },
  { title: "Analytics Dashboard",  description: "Traffic, conversions, and user behaviour analytics",          href: "/dashboard/analytics",  icon: BarChart2,       category: "Pages" },
  { title: "CRM Dashboard",        description: "Leads, pipeline, and customer relationship overview",         href: "/dashboard/crm",        icon: Users,           category: "Pages" },
  { title: "Users List",           description: "Manage all users, roles, and account statuses",               href: "/users/list",           icon: Users,           category: "Pages" },
  { title: "User Profile",         description: "View and edit user profile details",                          href: "/users/profile",        icon: Users,           category: "Pages" },
  { title: "Invoice List",         description: "All invoices with status, amounts, and due dates",            href: "/invoice/list",         icon: FileText,        category: "Pages" },
  { title: "Create Invoice",       description: "Generate a new invoice with line items and client details",   href: "/invoice/create",       icon: FileText,        category: "Pages" },
  { title: "Products",             description: "Product catalogue with images, pricing, and inventory",       href: "/ecommerce/products",   icon: ShoppingCart,    category: "Pages", badge: "E-commerce" },
  { title: "Inbox",                description: "Mail inbox with compose, reply, and folder management",       href: "/mail/inbox",           icon: Mail,            category: "Pages" },
  { title: "Calendar",             description: "Event calendar with day, week, and month views",              href: "/calendar",             icon: Calendar,        category: "Pages" },
  { title: "Security",             description: "Active sessions, login history, and 2FA settings",            href: "/security",             icon: Shield,          category: "Pages" },
  { title: "Billing",              description: "Subscription plans, payment history, and invoices",           href: "/billing",              icon: CreditCard,      category: "Pages" },
  { title: "Notifications",        description: "All system and user notifications",                           href: "/notifications",        icon: Bell,            category: "Pages" },
  { title: "Settings",             description: "Account preferences, theme, and notification settings",       href: "/settings",             icon: Settings,        category: "Pages" },
  { title: "Map Locations",        description: "Interactive map showing office and hub locations",            href: "/map/locations",        icon: MapPin,          category: "Pages" },
  { title: "Chat",                 description: "Real-time messaging and conversation threads",                href: "/chat",                 icon: MessageSquare,   category: "Pages" },
  { title: "Reports",              description: "Exportable reports with charts and data tables",              href: "/reports",              icon: BarChart2,       category: "Pages" },

  { title: "Sarah Chen",    description: "sarah.chen@company.com · Admin · Active",    href: "/users/details", icon: Users, category: "Users" },
  { title: "James Wilson",  description: "james.wilson@company.com · Editor · Active",  href: "/users/details", icon: Users, category: "Users" },
  { title: "Maria Garcia",  description: "maria.garcia@company.com · Viewer · Inactive", href: "/users/details", icon: Users, category: "Users" },
  { title: "Alex Thompson", description: "alex.thompson@company.com · Admin · Active",  href: "/users/details", icon: Users, category: "Users" },

  { title: "INV-2025-0042", description: "Acme Corp · $4,200.00 · Due Jan 30, 2025",   href: "/invoice/details", icon: FileText, category: "Invoices", badge: "Overdue" },
  { title: "INV-2025-0041", description: "Globex Inc · $1,800.00 · Paid Jan 15, 2025", href: "/invoice/details", icon: FileText, category: "Invoices", badge: "Paid"    },
  { title: "INV-2025-0040", description: "Initech · $950.00 · Due Feb 5, 2025",        href: "/invoice/details", icon: FileText, category: "Invoices"                   },
  { title: "INV-2025-0039", description: "Umbrella Co · $3,100.00 · Draft",            href: "/invoice/details", icon: FileText, category: "Invoices", badge: "Draft"   },

  { title: "Q4 2024 Revenue Report",    description: "Revenue breakdown by product line and region",     href: "/reports", icon: BarChart2, category: "Reports" },
  { title: "Monthly Active Users",      description: "User growth and engagement for December 2024",     href: "/reports", icon: BarChart2, category: "Reports" },
  { title: "Conversion Rate Analysis",  description: "Funnel analysis across all acquisition channels",  href: "/reports", icon: BarChart2, category: "Reports" },
]

const RECENT = ["dashboard", "invoice", "users", "settings"]

const BADGE_STYLES: Record<string, string> = {
  Overdue: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Paid:    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Draft:   "bg-muted text-muted-foreground",
}

const SearchPage = () => {
  const [query, setQuery] = useState("")
  const trimmed = query.trim().toLowerCase()

  const filtered = trimmed
    ? ALL_RESULTS.filter(r =>
        r.title.toLowerCase().includes(trimmed) ||
        r.description.toLowerCase().includes(trimmed) ||
        r.category.toLowerCase().includes(trimmed)
      )
    : []

  const grouped = filtered.reduce<Record<string, SearchResult[]>>((acc, r) => {
    if (!acc[r.category]) acc[r.category] = []
    acc[r.category].push(r)
    return acc
  }, {})

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Search</h2>
        <p className="text-muted-foreground">Search across pages, users, invoices, and more.</p>
      </div>

      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          autoFocus
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search anything…"
          className="pl-9 h-11 text-base"
        />
      </div>

      {/* No query — show recent searches */}
      {!trimmed && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-1">Recent searches</p>
          <div className="flex flex-wrap gap-2">
            {RECENT.map(term => (
              <Button
                key={term}
                variant="outline"
                size="sm"
                className="gap-1.5 font-normal"
                onClick={() => setQuery(term)}
              >
                <Search className="h-3.5 w-3.5 text-muted-foreground" />
                {term}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* No results */}
      {trimmed && filtered.length === 0 && (
        <EmptyState
          icon={Search}
          title="No results found"
          description={`Nothing matched "${query}". Try a different keyword.`}
          size="md"
        />
      )}

      {/* Results */}
      {trimmed && filtered.length > 0 && (
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for{" "}
            <span className="font-medium text-foreground">"{query}"</span>
          </p>

          {Object.entries(grouped).map(([category, results]) => (
            <div key={category} className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-1 pb-1">
                {category}
              </p>
              <div className="rounded-xl border bg-card overflow-hidden divide-y">
                {results.map((result, i) => (
                  <Link
                    key={i}
                    href={result.href}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted group-hover:bg-background transition-colors">
                      <result.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{result.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{result.description}</p>
                    </div>
                    {result.badge && (
                      <span className={cn(
                        "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium",
                        BADGE_STYLES[result.badge] ?? "bg-muted text-muted-foreground"
                      )}>
                        {result.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchPage

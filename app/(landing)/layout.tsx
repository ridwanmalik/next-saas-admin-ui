"use client"

import Link from "next/link"
import { LayoutDashboard, ChevronDown, Clock, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import dynamic from "next/dynamic"
import { APP_NAME } from "@/lib/constants"

const ThemeFab = dynamic(() => import("@/components/layout/theme-fab").then(m => m.ThemeFab), { ssr: false })
const LandingNavControls = dynamic(() => import("@/components/layout/landing-nav-controls").then(m => m.LandingNavControls), { ssr: false })

const NAV_LINKS = [
  { title: "Home",    href: "/landing/home"    },
  { title: "About",   href: "/landing/about"   },
  { title: "Pricing", href: "/landing/pricing" },
  { title: "FAQ",     href: "/landing/faq"     },
  { title: "Contact", href: "/landing/contact" },
]

const STATUS_PAGES = [
  { title: "Coming Soon",  href: "/landing/coming-soon",  icon: Clock   },
  { title: "Maintenance",  href: "/landing/maintenance",  icon: Wrench  },
]

const ERROR_PAGES = [
  { title: "404 — Not Found",    href: "/landing/error/404" },
  { title: "500 — Server Error", href: "/landing/error/500" },
  { title: "401 — Unauthorized", href: "/landing/error/401" },
]

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top navbar */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4">
          {/* Logo */}
          <Link href="/landing/home" className="flex items-center gap-2 font-semibold text-sm shrink-0">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground text-xs font-bold">
              N
            </div>
            {APP_NAME}
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {NAV_LINKS.map(({ title, href }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                {title}
              </Link>
            ))}

            {/* Status pages dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors outline-none">
                  Status Pages <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-44">
                {STATUS_PAGES.map(({ title, href, icon: Icon }) => (
                  <DropdownMenuItem key={href} asChild>
                    <Link href={href} className="flex items-center gap-2 text-sm">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                      {title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Error pages dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors outline-none">
                  Error Pages <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {ERROR_PAGES.map(({ title, href }) => (
                  <DropdownMenuItem key={href} asChild>
                    <Link href={href} className="text-sm">
                      {title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right controls */}
          <div className="ml-auto flex items-center gap-1">
            <LandingNavControls />
            <Button asChild variant="outline" size="sm" className="gap-2 ml-1">
              <Link href="/dashboard">
                <LayoutDashboard className="h-3.5 w-3.5" />
                Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 px-4 py-6">
        {children}
      </main>

      <ThemeFab />

      {/* Footer */}
      <footer className="border-t py-6 px-4">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© 2025 {APP_NAME}. All rights reserved.</span>
          <div className="flex items-center gap-4">
            {NAV_LINKS.map(({ title, href }) => (
              <Link key={href} href={href} className="hover:text-foreground transition-colors">
                {title}
              </Link>
            ))}
            <Link href="/dashboard" className="hover:text-foreground transition-colors flex items-center gap-1">
              <LayoutDashboard className="h-3 w-3" /> Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

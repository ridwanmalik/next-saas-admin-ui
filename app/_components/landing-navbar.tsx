"use client"

import Link from "next/link"
import { ChevronRight, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/layout/mode-toggle"

export const LandingNavbar = () => {
  return (
    <header className="border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <Shield className="size-5 text-primary" />
          Next SaaS
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="#features" className="hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/dashboard" className="hover:text-foreground transition-colors">
            Demo
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button size="sm" asChild>
            <Link href="#">Purchase now</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

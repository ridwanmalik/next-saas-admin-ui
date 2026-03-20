"use client"

import { useState } from "react"
import { Search, Globe, Check, Home, Info, DollarSign, Mail, Clock, Wrench, AlertTriangle, ServerCrash, ShieldOff, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CommandPalette, type PaletteCommand } from "@/components/ui/command-palette"
import { ModeToggle } from "./mode-toggle"

const LANGUAGES = [
  { code: "en", label: "English",  flag: "🇺🇸" },
  { code: "es", label: "Español",  flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch",  flag: "🇩🇪" },
  { code: "ja", label: "日本語",   flag: "🇯🇵" },
  { code: "zh", label: "中文",     flag: "🇨🇳" },
  { code: "ar", label: "العربية",  flag: "🇸🇦" },
]

const LANDING_COMMANDS: PaletteCommand[] = [
  { id: "home",         label: "Home",            icon: Home,          group: "Pages",  href: "/landing/home"         },
  { id: "about",        label: "About",           icon: Info,          group: "Pages",  href: "/landing/about"        },
  { id: "pricing",      label: "Pricing",         icon: DollarSign,    group: "Pages",  href: "/landing/pricing"      },
  { id: "faq",          label: "FAQ",             icon: HelpCircle,    group: "Pages",  href: "/landing/faq"          },
  { id: "contact",      label: "Contact",         icon: Mail,          group: "Pages",  href: "/landing/contact"      },
  { id: "coming-soon",  label: "Coming Soon",     icon: Clock,         group: "Status", href: "/landing/coming-soon"  },
  { id: "maintenance",  label: "Maintenance",     icon: Wrench,        group: "Status", href: "/landing/maintenance"  },
  { id: "404",          label: "404 — Not Found", icon: AlertTriangle, group: "Errors", href: "/landing/error/404"    },
  { id: "500",          label: "500 — Server Error", icon: ServerCrash, group: "Errors", href: "/landing/error/500"  },
  { id: "401",          label: "401 — Unauthorized", icon: ShieldOff,  group: "Errors", href: "/landing/error/401"   },
]

export const LandingNavControls = () => {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [lang, setLang] = useState("en")

  return (
    <>
      {/* Search */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setPaletteOpen(true)}
        className="h-8 w-8 text-muted-foreground"
      >
        <Search className="h-4 w-4" />
      </Button>

      {/* Language */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
            <Globe className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          {LANGUAGES.map(({ code, label, flag }) => (
            <DropdownMenuItem key={code} onClick={() => setLang(code)} className="gap-2 text-xs">
              <span>{flag}</span>
              <span className="flex-1">{label}</span>
              {lang === code && <Check className="h-3 w-3 text-primary" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Theme toggle */}
      <ModeToggle />

      <CommandPalette commands={LANDING_COMMANDS} open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  )
}

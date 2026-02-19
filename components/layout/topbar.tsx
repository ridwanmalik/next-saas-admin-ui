"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "./mode-toggle"
import { UserDropdown } from "./user-dropdown"

interface TopbarProps {
  title?: string
}

export const Topbar = ({ title }: TopbarProps) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        {title && (
          <h1 className="text-sm font-medium text-muted-foreground">{title}</h1>
        )}
      </div>
      <div className="ml-auto flex items-center gap-2">
        <ModeToggle />
        <UserDropdown />
      </div>
    </header>
  )
}

"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import type { LucideIcon } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PaletteCommand {
  id: string
  label: string
  icon?: LucideIcon
  group?: string
  href?: string
  action?: () => void
  shortcut?: string
}

interface CommandPaletteProps {
  commands: PaletteCommand[]
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

// ─── Component ────────────────────────────────────────────────────────────────

export const CommandPalette = ({ commands, open: controlledOpen, onOpenChange }: CommandPaletteProps) => {
  const router = useRouter()
  const [internalOpen, setInternalOpen] = useState(false)

  const open = controlledOpen ?? internalOpen
  const setOpen = onOpenChange ?? setInternalOpen

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [setOpen])

  const runCommand = useCallback((cmd: PaletteCommand) => {
    setOpen(false)
    if (cmd.href) {
      router.push(cmd.href)
    } else if (cmd.action) {
      cmd.action()
    }
  }, [router, setOpen])

  // Group commands
  const grouped = commands.reduce<Record<string, PaletteCommand[]>>((acc, cmd) => {
    const group = cmd.group ?? "Commands"
    acc[group] = acc[group] ? [...acc[group], cmd] : [cmd]
    return acc
  }, {})

  const groups = Object.entries(grouped)

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search commands, pages, actions…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {groups.map(([group, items], i) => (
          <div key={group}>
            {i > 0 && <CommandSeparator />}
            <CommandGroup heading={group}>
              {items.map(cmd => (
                <CommandItem
                  key={cmd.id}
                  value={cmd.label}
                  onSelect={() => runCommand(cmd)}
                >
                  {cmd.icon && <cmd.icon />}
                  {cmd.label}
                  {cmd.shortcut && (
                    <span className="ml-auto text-xs text-muted-foreground">{cmd.shortcut}</span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        ))}
      </CommandList>
    </CommandDialog>
  )
}

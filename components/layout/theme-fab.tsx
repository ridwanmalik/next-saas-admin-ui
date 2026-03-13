"use client"

import { Paintbrush } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { COLOR_THEMES, SURFACE_THEMES } from "@/lib/themes"
import { useColorTheme } from "@/hooks/use-color-theme"
import { useSurfaceTheme } from "@/hooks/use-surface-theme"

export const ThemeFab = () => {
  const { colorTheme,   setColorTheme   } = useColorTheme()
  const { surfaceTheme, setSurfaceTheme } = useSurfaceTheme()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-16 right-8 z-50 h-12 w-12 rounded-full shadow-lg"
        >
          <Paintbrush className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="top" align="end" className="w-auto p-3 mb-2 space-y-3">

        {/* Accent colour */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Accent colour</p>
          <div className="flex items-center gap-2">
            {COLOR_THEMES.map(theme => (
              <button
                key={theme.id}
                title={theme.label}
                onClick={() => setColorTheme(theme.id)}
                className={cn(
                  "h-7 w-7 rounded-full transition-transform hover:scale-110 focus:outline-none",
                  colorTheme === theme.id && "ring-2 ring-offset-2 ring-offset-background ring-primary scale-110",
                )}
                style={{ background: theme.swatch }}
              />
            ))}
          </div>
        </div>

        <Separator />

        {/* Surface */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Surface</p>
          <div className="flex flex-wrap gap-2" style={{ maxWidth: 208 }}>
            {SURFACE_THEMES.map(theme => (
              <button
                key={theme.id}
                title={theme.label}
                onClick={() => setSurfaceTheme(theme.id)}
                className={cn(
                  "h-7 w-7 rounded-full transition-transform hover:scale-110 focus:outline-none ring-1 ring-border",
                  surfaceTheme === theme.id && "ring-2 ring-offset-2 ring-offset-background ring-primary scale-110",
                )}
                style={{ background: theme.sidebarColor }}
              />
            ))}
          </div>
        </div>

      </PopoverContent>
    </Popover>
  )
}

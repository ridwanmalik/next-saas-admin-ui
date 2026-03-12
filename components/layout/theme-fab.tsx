"use client"

import { Paintbrush } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { COLOR_THEMES } from "@/lib/themes"
import { useColorTheme } from "@/hooks/use-color-theme"

export const ThemeFab = () => {
  const { colorTheme, setColorTheme } = useColorTheme()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg"
        >
          <Paintbrush className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="top" align="end" className="w-auto p-3 mb-2">
        <p className="text-xs font-medium text-muted-foreground mb-2.5">Accent colour</p>
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
      </PopoverContent>
    </Popover>
  )
}

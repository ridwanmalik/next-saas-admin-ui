"use client"

import { useState } from "react"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

const InteractiveMap = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const toggle = (name: string) =>
    setSelected(prev => {
      const next = new Set(prev)
      next.has(name) ? next.delete(name) : next.add(name)
      return next
    })

  return (
    <div className="space-y-3">
      <div className="h-100">
      <ComposableMap projectionConfig={{ scale: 147 }} height={600} className="w-full h-full">
        <ZoomableGroup>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map(geo => {
                const isSelected = selected.has(geo.properties.name)
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => toggle(geo.properties.name)}
                    fill={isSelected ? "var(--primary)" : "var(--muted)"}
                    stroke="var(--border)"
                    strokeWidth={0.3}
                    style={{
                      default: { outline: "none", cursor: "pointer" },
                      hover: {
                        outline: "none",
                        fill: isSelected ? "var(--primary)" : "oklch(0.82 0.04 240)",
                        cursor: "pointer",
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                )
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      </div>

      <div className="min-h-8">
        {selected.size > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {[...selected].map(name => (
              <Badge key={name} variant="secondary" className="gap-1 pr-1.5 text-xs">
                {name}
                <button
                  onClick={() => toggle(name)}
                  className="ml-0.5 rounded-full opacity-60 hover:opacity-100"
                >
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-muted-foreground">
            Click countries on the map to highlight them
          </p>
        )}
      </div>
    </div>
  )
}

export default InteractiveMap

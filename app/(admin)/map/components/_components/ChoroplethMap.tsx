"use client"

import { useState } from "react"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

// Deterministic value 1–100 from country id string
const seededValue = (id: string) => {
  let h = 0
  for (const c of id) h = (Math.imul(31, h) + c.charCodeAt(0)) | 0
  return ((h >>> 0) % 100) + 1
}

const valueToColor = (v: number) => {
  const l = 0.93 - (v / 100) * 0.42
  const c = 0.01 + (v / 100) * 0.13
  return `oklch(${l.toFixed(3)} ${c.toFixed(3)} 240)`
}

const ChoroplethMap = () => {
  const [tooltip, setTooltip] = useState<{ name: string; value: number } | null>(null)

  return (
    <div className="relative h-100">
      <ComposableMap projectionConfig={{ scale: 147 }} height={600} className="w-full h-full">
        <ZoomableGroup>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map(geo => {
                const value = seededValue(String(geo.id ?? geo.rsmKey))
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={valueToColor(value)}
                    stroke="var(--border)"
                    strokeWidth={0.3}
                    style={{
                      default: { outline: "none" },
                      hover:   { outline: "none", fill: "var(--primary)", opacity: 0.75 },
                      pressed: { outline: "none" },
                    }}
                    onMouseEnter={() => setTooltip({ name: geo.properties.name, value })}
                    onMouseLeave={() => setTooltip(null)}
                  />
                )
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Legend */}
      <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-md border bg-popover px-3 py-2 text-xs shadow-sm">
        <span className="text-muted-foreground">Low</span>
        <div
          className="h-2 w-24 rounded-full"
          style={{ background: "linear-gradient(to right, oklch(0.93 0.01 240), oklch(0.51 0.14 240))" }}
        />
        <span className="text-muted-foreground">High</span>
      </div>

      {tooltip && (
        <div className="pointer-events-none absolute bottom-3 left-3 rounded-md border bg-popover px-3 py-1.5 text-sm shadow-md">
          <span className="font-medium">{tooltip.name}</span>
          <span className="ml-2 text-muted-foreground">{tooltip.value} users/k</span>
        </div>
      )}
    </div>
  )
}

export default ChoroplethMap

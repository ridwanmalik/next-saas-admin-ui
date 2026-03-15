"use client"

import { useState } from "react"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

const CITIES = [
  { name: "New York",     lat: 40.71,  lng: -74.01, value: 1240 },
  { name: "London",       lat: 51.51,  lng: -0.13,  value: 980  },
  { name: "Tokyo",        lat: 35.68,  lng: 139.69, value: 760  },
  { name: "São Paulo",    lat: -23.55, lng: -46.63, value: 540  },
  { name: "Mumbai",       lat: 19.08,  lng: 72.88,  value: 370  },
  { name: "Sydney",       lat: -33.87, lng: 151.21, value: 310  },
  { name: "Singapore",    lat: 1.35,   lng: 103.82, value: 420  },
  { name: "Berlin",       lat: 52.52,  lng: 13.40,  value: 290  },
  { name: "Seoul",        lat: 37.57,  lng: 126.98, value: 155  },
  { name: "Dubai",        lat: 25.20,  lng: 55.27,  value: 180  },
  { name: "Toronto",      lat: 43.65,  lng: -79.38, value: 210  },
  { name: "Mexico City",  lat: 19.43,  lng: -99.13, value: 130  },
  { name: "Cairo",        lat: 30.06,  lng: 31.25,  value: 95   },
  { name: "Lagos",        lat: 6.37,   lng: 2.38,   value: 75   },
  { name: "Jakarta",      lat: -6.21,  lng: 106.85, value: 200  },
]

const BubbleMap = () => {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="relative h-100">
      <ComposableMap projectionConfig={{ scale: 147 }} height={600} className="w-full h-full">
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="var(--muted)"
                stroke="var(--border)"
                strokeWidth={0.3}
                style={{
                  default: { outline: "none" },
                  hover:   { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {CITIES.sort((a, b) => b.value - a.value).map(({ name, lat, lng, value }) => (
          <Marker
            key={name}
            coordinates={[lng, lat]}
            onMouseEnter={() => setHovered(name)}
            onMouseLeave={() => setHovered(null)}
          >
            <circle
              r={Math.sqrt(value) / 2.2}
              fill="var(--primary)"
              fillOpacity={hovered === name ? 0.9 : 0.55}
              stroke="white"
              strokeWidth={0.8}
              style={{ cursor: "pointer", transition: "fill-opacity 0.15s" }}
            />
          </Marker>
        ))}
      </ComposableMap>

      {hovered && (() => {
        const city = CITIES.find(c => c.name === hovered)!
        return (
          <div className="pointer-events-none absolute bottom-3 left-3 rounded-md border bg-popover px-3 py-1.5 text-sm shadow-md">
            <span className="font-medium">{city.name}</span>
            <span className="ml-2 text-muted-foreground">{city.value.toLocaleString()} users</span>
          </div>
        )
      })()}
    </div>
  )
}

export default BubbleMap

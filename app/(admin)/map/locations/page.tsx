"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Map, type MapMarker } from "@/components/ui/map"
import { StatCard } from "@/components/ui/stat-card"
import { cn } from "@/lib/utils"
import { Building2, Globe, MapPin, Users } from "lucide-react"
import { useState } from "react"

// ─── Data ─────────────────────────────────────────────────────────────────────

const MARKERS: MapMarker[] = [
  { id: 1, name: "New York", lat: 40.71, lng: -74.01, description: "Northeast HQ — 1,240 users", category: "Office" },
  { id: 2, name: "London", lat: 51.51, lng: -0.13, description: "EMEA HQ — 980 users", category: "Office" },
  { id: 3, name: "Tokyo", lat: 35.68, lng: 139.69, description: "APAC HQ — 760 users", category: "Office" },
  { id: 4, name: "São Paulo", lat: -23.55, lng: -46.63, description: "LATAM HQ — 540 users", category: "Office" },
  { id: 5, name: "Sydney", lat: -33.87, lng: 151.21, description: "ANZ office — 310 users", category: "Office" },
  { id: 6, name: "Singapore", lat: 1.35, lng: 103.82, description: "SEA hub — 420 users", category: "Hub" },
  { id: 7, name: "Berlin", lat: 52.52, lng: 13.4, description: "Engineering hub — 290 users", category: "Hub" },
  { id: 8, name: "Toronto", lat: 43.65, lng: -79.38, description: "Canada office — 210 users", category: "Office" },
  { id: 9, name: "Dubai", lat: 25.2, lng: 55.27, description: "MEA office — 180 users", category: "Office" },
  { id: 10, name: "Cape Town", lat: -33.93, lng: 18.42, description: "Africa hub — 95 users", category: "Hub" },
  { id: 11, name: "Mumbai", lat: 19.08, lng: 72.88, description: "South Asia office — 370 users", category: "Office" },
  { id: 12, name: "Chicago", lat: 41.88, lng: -87.63, description: "Midwest data center", category: "Data Center" },
  { id: 13, name: "Frankfurt", lat: 50.11, lng: 8.68, description: "EU data center", category: "Data Center" },
  { id: 14, name: "Seoul", lat: 37.57, lng: 126.98, description: "Korea office — 155 users", category: "Office" },
  {
    id: 15,
    name: "Mexico City",
    lat: 19.43,
    lng: -99.13,
    description: "Mexico office — 130 users",
    category: "Office",
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  Office: "bg-primary/10 text-primary",
  Hub: "bg-blue-500/10 text-blue-500",
  "Data Center": "bg-orange-500/10 text-orange-500",
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const MapPage = () => {
  const [selected, setSelected] = useState<MapMarker | null>(null)
  const [flyTrigger, setFlyTrigger] = useState(0)

  const handleSelect = (m: MapMarker) => {
    setSelected(m)
    setFlyTrigger(t => t + 1)
  }

  const offices = MARKERS.filter(m => m.category === "Office").length
  const hubs = MARKERS.filter(m => m.category === "Hub").length
  const totalUsers = 5_685

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Map</h2>
        <p className="text-muted-foreground">Global office locations and infrastructure overview.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Locations"
          value={String(MARKERS.length)}
          change={2}
          positive
          period="vs last year"
          icon={MapPin}
        />
        <StatCard label="Offices" value={String(offices)} change={1} positive period="vs last year" icon={Building2} />
        <StatCard label="Hubs" value={String(hubs)} change={0} positive period="vs last year" icon={Globe} />
        <StatCard
          label="Total Users"
          value={totalUsers.toLocaleString()}
          change={12}
          positive
          period="vs last month"
          icon={Users}
        />
      </div>

      {/* Map + sidebar */}
      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        {/* Map */}
        <div className="">
          <Card className="flex flex-col gap-0 overflow-hidden p-0">
            <Map markers={MARKERS} selected={selected} flyTrigger={flyTrigger} className="min-h-[600px] flex-1 w-full" />
          </Card>
        </div>

        {/* Locations list */}
        <Card className="flex flex-col gap-0">
          <CardHeader className="border-b gap-0">
            <CardTitle className="text-sm font-medium">Locations</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-0">
            <ul>
              {MARKERS.map(m => (
                <li key={m.id}>
                  <button
                    onClick={() => handleSelect(m)}
                    className={cn(
                      "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50",
                      selected?.id === m.id && "bg-muted"
                    )}>
                    <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{m.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{m.description}</p>
                    </div>
                    <Badge variant="secondary" className={cn("shrink-0 text-xs", m.category && CATEGORY_COLORS[m.category])}>
                      {m.category}
                    </Badge>
                  </button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default MapPage

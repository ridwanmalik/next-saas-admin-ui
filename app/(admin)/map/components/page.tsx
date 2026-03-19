"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Map, type MapMarker } from "@/components/ui/map"
import { Moon, Sun } from "lucide-react"
import dynamic from "next/dynamic"
import { useState } from "react"

// ─── Dynamic imports (no SSR for map libs) ────────────────────────────────────

const MapLoader = () => (
  <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
    Loading map…
  </div>
)

const DraggableMarkerMap = dynamic(() => import("./_components/LeafletDraggable"), {
  ssr: false,
  loading: () => (
    <div className="h-100">
      <MapLoader />
    </div>
  ),
})
const ClusterMap = dynamic(() => import("./_components/LeafletCluster"), {
  ssr: false,
  loading: () => (
    <div className="h-100">
      <MapLoader />
    </div>
  ),
})
const ChoroplethMap = dynamic(() => import("./_components/ChoroplethMap"), {
  ssr: false,
  loading: () => (
    <div className="h-100">
      <MapLoader />
    </div>
  ),
})
const BubbleMap = dynamic(() => import("./_components/BubbleMap"), {
  ssr: false,
  loading: () => (
    <div className="h-100">
      <MapLoader />
    </div>
  ),
})
const InteractiveMap = dynamic(() => import("./_components/InteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="h-100">
      <MapLoader />
    </div>
  ),
})

// ─── Data ─────────────────────────────────────────────────────────────────────

const SIMPLE_MARKERS: MapMarker[] = [
  { id: 1, name: "Central Park", lat: 40.785, lng: -73.968, description: "Famous park in Manhattan" },
  { id: 2, name: "Times Square", lat: 40.758, lng: -73.985, description: "The crossroads of the world" },
  { id: 3, name: "Brooklyn Bridge", lat: 40.706, lng: -73.997, description: "Iconic suspension bridge" },
  { id: 4, name: "Empire State", lat: 40.749, lng: -73.986, description: "Art Deco skyscraper" },
  { id: 5, name: "Statue of Liberty", lat: 40.689, lng: -74.044, description: "Symbol of freedom" },
]

const FLY_TO_CITIES: { label: string; marker: MapMarker }[] = [
  { label: "New York", marker: { id: 1, name: "New York", lat: 40.71, lng: -74.01 } },
  { label: "London", marker: { id: 2, name: "London", lat: 51.51, lng: -0.13 } },
  { label: "Tokyo", marker: { id: 3, name: "Tokyo", lat: 35.68, lng: 139.69 } },
  { label: "Sydney", marker: { id: 4, name: "Sydney", lat: -33.87, lng: 151.21 } },
  { label: "Cape Town", marker: { id: 5, name: "Cape Town", lat: -33.93, lng: 18.42 } },
  { label: "São Paulo", marker: { id: 6, name: "São Paulo", lat: -23.55, lng: -46.63 } },
]

// ─── Section wrapper ─────────────────────────────────────────────────────────

type SectionProps = {
  title: string
  description: string
  children: React.ReactNode
  className?: string
  headerAction?: React.ReactNode
}

const Section = ({ title, description, children, className, headerAction }: SectionProps) => (
  <Card className={className}>
    <CardHeader>
      <div className="flex items-center justify-between gap-4">
        <div className="">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {headerAction && <div className="shrink-0">{headerAction}</div>}
      </div>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
)

// ─── Show Markers section ─────────────────────────────────────────────────────

const ShowMarkersSection = () => {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <Section
      title="Show Markers"
      description="City landmarks marked on an OpenStreetMap tile layer."
      headerAction={
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setDarkMode(d => !d)}
          aria-label={darkMode ? "Switch to light map" : "Switch to dark map"}>
          {darkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
      }>
      <Map
        markers={SIMPLE_MARKERS}
        defaultCenter={[40.73, -73.99]}
        defaultZoom={11}
        darkMode={darkMode}
        className="h-100 w-full rounded-lg"
      />
    </Section>
  )
}

// ─── Fly To section ───────────────────────────────────────────────────────────

const FlyToSection = () => {
  const [selected, setSelected] = useState<MapMarker>(FLY_TO_CITIES[0].marker)
  const [trigger, setTrigger] = useState(0)

  const flyTo = (marker: MapMarker) => {
    setSelected(marker)
    setTrigger(t => t + 1)
  }

  return (
    <Section title="Geo Zoom Animation" description="Click a city to fly the map to that location.">
      <div className="flex flex-wrap gap-2 mb-3">
        {FLY_TO_CITIES.map(({ label, marker }) => (
          <Button
            key={label}
            size="sm"
            variant={selected.id === marker.id ? "default" : "outline"}
            onClick={() => flyTo(marker)}>
            {label}
          </Button>
        ))}
      </div>
      <Map
        markers={FLY_TO_CITIES.map(c => c.marker)}
        selected={selected}
        flyTrigger={trigger}
        defaultCenter={[20, 0]}
        defaultZoom={2}
        flyToZoom={5}
        className="h-100 w-full rounded-lg"
      />
    </Section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const MapComponentsPage = () => (
  <div className="mx-auto w-full max-w-6xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Map Components</h2>
      <p className="text-muted-foreground">Interactive map examples built with React Leaflet and React Simple Maps.</p>
    </div>

    {/* 1 — Simple Markers */}
    <ShowMarkersSection />

    {/* 2 — Markers with Popup */}
    <Section title="Markers with Popup" description="Click a marker to see a custom popup with details.">
      <Map
        markers={FLY_TO_CITIES.map(c => ({
          ...c.marker,
          description: `Coordinates: ${c.marker.lat}, ${c.marker.lng}`,
        }))}
        defaultCenter={[20, 0]}
        defaultZoom={2}
        className="h-100 w-full rounded-lg"
        renderPopup={m => (
          <div className="min-w-40 space-y-1">
            <p className="font-semibold text-sm">{m.name}</p>
            <p className="text-xs text-gray-500">{m.description}</p>
            <p className="text-xs font-mono text-gray-400">
              {m.lat.toFixed(2)}, {m.lng.toFixed(2)}
            </p>
          </div>
        )}
      />
    </Section>

    {/* 3 + 4 — Draggable & Fly To (2-col) */}
    <div className="grid gap-6 lg:grid-cols-2">
      <Section title="Draggable Marker" description="Drag the pin anywhere — coordinates update in real time.">
        <DraggableMarkerMap />
      </Section>
      <FlyToSection />
    </div>

    {/* 5 — Choropleth */}
    <Section title="Regional Map" description="World choropleth — hover a country to see its user density value.">
      <ChoroplethMap />
    </Section>

    {/* 6 + 7 — Bubble Map + Cluster (2-col) */}
    <div className="grid gap-6 lg:grid-cols-2">
      <Section title="Bubble Map" description="Circle size is proportional to user count. Hover for details.">
        <BubbleMap />
      </Section>
      <Section title="Clusters" description="Markers auto-cluster at low zoom. Zoom in to expand clusters.">
        <ClusterMap />
      </Section>
    </div>

    {/* 8 — Interactive */}
    <Section title="Interactive Map" description="Click countries to select them. Click again to deselect.">
      <InteractiveMap />
    </Section>
  </div>
)

export default MapComponentsPage

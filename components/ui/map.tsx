"use client"

import dynamic from "next/dynamic"
import type { ReactNode } from "react"

export type MapMarker = {
  id: number | string
  name: string
  lat: number
  lng: number
  description?: string
  category?: string
}

export type MapProps = {
  markers: MapMarker[]
  /** Currently selected marker — the map will fly to it when flyTrigger changes */
  selected?: MapMarker | null
  /** Increment this value to trigger a fly-to animation to the selected marker */
  flyTrigger?: number
  /** Zoom level used when flying to a selected marker (default: 6) */
  flyToZoom?: number
  /** Initial map center as [lat, lng] (default: [20, 0]) */
  defaultCenter?: [number, number]
  /** Initial zoom level (default: 2) */
  defaultZoom?: number
  /** className applied to the MapContainer — use this to set height/width */
  className?: string
  /** Custom popup content. Receives the marker and returns ReactNode. */
  renderPopup?: (marker: MapMarker) => ReactNode
  /** Switch to a dark tile layer (CartoDB Dark Matter) */
  darkMode?: boolean
}

// Dynamic import keeps Leaflet (a browser-only lib) out of the SSR bundle.
// Consumers don't need to do anything special — just import { Map } and use it.
const MapLeaflet = dynamic(() => import("./map-leaflet"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
      Loading map…
    </div>
  ),
})

export const Map = (props: MapProps) => <MapLeaflet {...props} />

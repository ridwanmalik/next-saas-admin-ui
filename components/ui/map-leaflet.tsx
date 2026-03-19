"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { cn } from "@/lib/utils"
import type { MapProps } from "./map"

// Fix Leaflet default marker icon broken by webpack
const fixIcon = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  })
}

type FlyToProps = { center: [number, number]; zoom: number; trigger: number }

const FlyToMarker = ({ center, zoom, trigger }: FlyToProps) => {
  const map = useMap()
  useEffect(() => {
    if (trigger > 0) map.flyTo(center, zoom, { duration: 1.2 })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger])
  return null
}

const TILES = {
  light: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
  dark: {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
}

const MapLeaflet = ({
  markers,
  selected,
  flyTrigger = 0,
  flyToZoom = 6,
  defaultCenter = [20, 0],
  defaultZoom = 2,
  className = "h-full w-full",
  renderPopup,
  darkMode = false,
}: MapProps) => {
  useEffect(() => { fixIcon() }, [])

  const tile = darkMode ? TILES.dark : TILES.light

  return (
    <div className={cn("contents", darkMode && "map-dark")}>
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      scrollWheelZoom
      className={className}
    >
      <TileLayer
        key={darkMode ? "dark" : "light"}
        attribution={tile.attribution}
        url={tile.url}
      />
      {selected && (
        <FlyToMarker
          center={[selected.lat, selected.lng]}
          zoom={flyToZoom}
          trigger={flyTrigger}
        />
      )}
      {markers.map(m => (
        <Marker key={m.id} position={[m.lat, m.lng]}>
          <Popup>
            {renderPopup ? renderPopup(m) : (
              <div className={cn("min-w-35", darkMode && "text-white")}>
                <p className="font-semibold">{m.name}</p>
                {m.category && (
                  <p className={cn("text-xs", darkMode ? "text-white/60" : "text-gray-500")}>
                    {m.category}
                  </p>
                )}
                {m.description && <p className="mt-1 text-sm">{m.description}</p>}
              </div>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </div>
  )
}

export default MapLeaflet

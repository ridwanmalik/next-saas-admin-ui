"use client"

import { useEffect, useRef, useState } from "react"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const fixIcon = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  })
}

const LeafletDraggable = () => {
  useEffect(() => { fixIcon() }, [])
  const markerRef = useRef<L.Marker>(null)
  const [pos, setPos] = useState<[number, number]>([51.505, -0.09])

  return (
    <div className="space-y-3">
      <MapContainer center={pos} zoom={5} scrollWheelZoom className="h-100 w-full rounded-lg">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker
          ref={markerRef}
          position={pos}
          draggable
          eventHandlers={{
            dragend: () => {
              const m = markerRef.current
              if (m) {
                const { lat, lng } = m.getLatLng()
                setPos([lat, lng])
              }
            },
          }}
        />
      </MapContainer>
      <p className="text-center text-sm text-muted-foreground">
        Lat:{" "}
        <span className="font-mono font-medium text-foreground">{pos[0].toFixed(5)}</span>
        &nbsp;·&nbsp;Lng:{" "}
        <span className="font-mono font-medium text-foreground">{pos[1].toFixed(5)}</span>
      </p>
    </div>
  )
}

export default LeafletDraggable

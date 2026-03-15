"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
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

const CITIES: { name: string; pos: [number, number] }[] = [
  { name: "London",       pos: [51.51, -0.13]    },
  { name: "Paris",        pos: [48.85, 2.35]     },
  { name: "Berlin",       pos: [52.52, 13.40]    },
  { name: "Rome",         pos: [41.90, 12.48]    },
  { name: "Madrid",       pos: [40.41, -3.70]    },
  { name: "Lisbon",       pos: [38.72, -9.14]    },
  { name: "Kyiv",         pos: [50.45, 30.52]    },
  { name: "St Petersburg",pos: [59.93, 30.32]    },
  { name: "Moscow",       pos: [55.75, 37.62]    },
  { name: "Warsaw",       pos: [52.23, 21.01]    },
  { name: "Budapest",     pos: [47.50, 19.04]    },
  { name: "Vienna",       pos: [48.21, 16.37]    },
  { name: "Prague",       pos: [50.08, 14.44]    },
  { name: "Bern",         pos: [46.95, 7.45]     },
  { name: "Milan",        pos: [45.46, 9.19]     },
  { name: "New York",     pos: [40.71, -74.01]   },
  { name: "Los Angeles",  pos: [34.05, -118.24]  },
  { name: "Chicago",      pos: [41.85, -87.65]   },
  { name: "Houston",      pos: [29.76, -95.37]   },
  { name: "Phoenix",      pos: [33.45, -112.07]  },
  { name: "São Paulo",    pos: [-23.55, -46.63]  },
  { name: "Buenos Aires", pos: [-34.61, -58.38]  },
  { name: "Bogotá",       pos: [4.71, -74.07]    },
  { name: "Quito",        pos: [-0.23, -78.52]   },
  { name: "Lima",         pos: [-12.04, -77.03]  },
  { name: "Mexico City",  pos: [19.43, -99.13]   },
  { name: "Abuja",        pos: [9.06, 7.50]      },
  { name: "Lagos",        pos: [6.37, 2.38]      },
  { name: "Kinshasa",     pos: [-4.32, 15.32]    },
  { name: "Nairobi",      pos: [-1.29, 36.82]    },
  { name: "Cairo",        pos: [30.06, 31.25]    },
  { name: "Tunis",        pos: [36.82, 10.17]    },
  { name: "Beirut",       pos: [33.89, 35.50]    },
  { name: "Karachi",      pos: [24.87, 67.01]    },
  { name: "New Delhi",    pos: [28.61, 77.21]    },
  { name: "Bangalore",    pos: [12.97, 77.59]    },
  { name: "Singapore",    pos: [1.35, 103.82]    },
  { name: "Kuala Lumpur", pos: [3.14, 101.69]    },
  { name: "Bangkok",      pos: [13.75, 100.52]   },
  { name: "Tokyo",        pos: [35.68, 139.69]   },
]

const LeafletCluster = () => {
  useEffect(() => { fixIcon() }, [])

  return (
    <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom className="h-100 w-full rounded-lg">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <MarkerClusterGroup chunkedLoading>
        {CITIES.map(({ name, pos }) => (
          <Marker key={name} position={pos}>
            <Popup>{name}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  )
}

export default LeafletCluster

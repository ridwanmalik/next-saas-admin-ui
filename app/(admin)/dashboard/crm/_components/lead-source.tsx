import { CalendarCheck, PhoneCall } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// ─── Data ─────────────────────────────────────────────────────────────────────

const LEAD_SOURCES = [
  { label: "Social Media", value: 9, color: "#3b82f6" },
  { label: "Website", value: 35, color: "#7c3aed" },
  { label: "Phone Call", value: 28, color: "#a78bfa" },
  { label: "Mail", value: 28, color: "#93c5fd" },
]

// ─── Donut Chart ──────────────────────────────────────────────────────────────

const DonutChart = () => {
  const cx = 90, cy = 90, r = 70, innerR = 44
  const total = LEAD_SOURCES.reduce((s, d) => s + d.value, 0)
  let startAngle = -Math.PI / 2

  const slices = LEAD_SOURCES.map((d) => {
    const angle = (d.value / total) * 2 * Math.PI
    const endAngle = startAngle + angle
    const x1 = cx + r * Math.cos(startAngle)
    const y1 = cy + r * Math.sin(startAngle)
    const x2 = cx + r * Math.cos(endAngle)
    const y2 = cy + r * Math.sin(endAngle)
    const ix1 = cx + innerR * Math.cos(endAngle)
    const iy1 = cy + innerR * Math.sin(endAngle)
    const ix2 = cx + innerR * Math.cos(startAngle)
    const iy2 = cy + innerR * Math.sin(startAngle)
    const largeArc = angle > Math.PI ? 1 : 0
    const path = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix2} ${iy2} Z`
    startAngle = endAngle
    return { ...d, path }
  })

  return (
    <svg viewBox="0 0 180 180" className="w-full max-w-[180px] mx-auto" aria-hidden>
      {slices.map((s) => (
        <path key={s.label} d={s.path} fill={s.color} />
      ))}
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export const LeadSource = () => (
  <div className="space-y-5">
    <Card>
      <CardHeader className="gap-0">
        <div className="flex items-center justify-between">
          <CardTitle>Lead Source</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-3 pb-3 space-y-4">
        <DonutChart />
        <div className="space-y-2">
          {LEAD_SOURCES.map((src) => (
            <div key={src.label} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: src.color }} />
                <span className="text-muted-foreground">{src.label}</span>
              </div>
              <Badge variant="secondary" className="text-xs tabular-nums">
                {src.value < 10 ? src.value : "100+"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent className="px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <CalendarCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Upcoming Task &amp; Follow-ups</p>
              <p className="text-2xl font-bold tabular-nums">200</p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-muted">
            Follow-up
          </Badge>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent className="px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
              <PhoneCall className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Scheduled Calls</p>
              <p className="text-2xl font-bold tabular-nums">48</p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-muted">
            View
          </Badge>
        </div>
      </CardContent>
    </Card>
  </div>
)

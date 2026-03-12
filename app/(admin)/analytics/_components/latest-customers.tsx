import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Customer {
  flag: string
  country: string
  name: string
  pct: number
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CUSTOMERS: Customer[] = [
  { flag: "🇩🇪", country: "Germany",       name: "Angelina Jolly",  pct: 56.23 },
  { flag: "🇺🇸", country: "USA",            name: "John Deo",        pct: 25.23 },
  { flag: "🇦🇺", country: "Australia",      name: "Jenifer Vintage", pct: 12.45 },
  { flag: "🇬🇧", country: "United Kingdom", name: "Lori Moore",      pct: 8.65  },
  { flag: "🇧🇷", country: "Brazil",         name: "Allianz Dacron",  pct: 3.56  },
  { flag: "🇯🇵", country: "Japan",          name: "Kiyoshi Tanaka",  pct: 2.84  },
  { flag: "🇨🇦", country: "Canada",         name: "Sophie Tremblay", pct: 1.92  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export const LatestCustomers = () => (
  <Card className="overflow-hidden">
    <CardHeader className="gap-0">
      <CardTitle>Latest Customers</CardTitle>
    </CardHeader>
    <Separator />
    <CardContent className="p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40">
              {["#", "Country", "Name", "Average"].map((col) => (
                <th key={col} className="px-5 py-3 text-left text-[11px] font-medium tracking-wider uppercase text-muted-foreground">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {CUSTOMERS.map((c, i) => (
              <tr key={c.name} className="hover:bg-muted/30 transition-colors">
                <td className="px-5 py-3 text-muted-foreground text-xs">{i + 1}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none">{c.flag}</span>
                    <span className="text-sm">{c.country}</span>
                  </div>
                </td>
                <td className="px-5 py-3 font-medium">{c.name}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${(c.pct / 60) * 100}%` }} />
                    </div>
                    <span className="text-xs tabular-nums text-muted-foreground">{c.pct}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t p-3">
        <Button variant="ghost" className="w-full text-sm text-primary hover:text-primary" size="sm">
          View All Latest Customers →
        </Button>
      </div>
    </CardContent>
  </Card>
)

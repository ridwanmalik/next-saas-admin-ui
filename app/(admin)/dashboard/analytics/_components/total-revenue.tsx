import { ArrowDownRight, ArrowUpRight, CreditCard, RefreshCw, Share2, Wifi } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// ─── Data ─────────────────────────────────────────────────────────────────────

const MINI_STATS = [
  { icon: Share2,     value: "1,000", label: "SHARES",  color: "text-blue-500",    bg: "bg-blue-500/10"    },
  { icon: Wifi,       value: "600",   label: "NETWORK", color: "text-violet-500",  bg: "bg-violet-500/10"  },
  { icon: RefreshCw,  value: "3,550", label: "RETURNS", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { icon: CreditCard, value: "100%",  label: "ORDER",   color: "text-amber-500",   bg: "bg-amber-500/10"   },
]

const REVENUE_LIST = [
  { name: "Bitcoin",  change: "+$145.85", positive: true  },
  { name: "Ethereum", change: "-$6.368",  positive: false },
  { name: "Ripple",   change: "+$458.63", positive: true  },
  { name: "Neo",      change: "-$5.631",  positive: false },
  { name: "Litecoin", change: "+$92.40",  positive: true  },
  { name: "Cardano",  change: "-$3.210",  positive: false },
  { name: "Solana",   change: "+$218.75", positive: true  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export const TotalRevenue = () => (
  <>
    {/* 4 mini stat cards 2×2 */}
    <div className="grid grid-cols-2 gap-3">
      {MINI_STATS.map((s) => (
        <Card key={s.label}>
          <CardContent className="p-4 flex items-center gap-3">
            <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", s.bg)}>
              <s.icon className={cn("h-5 w-5", s.color)} />
            </div>
            <div>
              <p className="text-base font-bold tabular-nums">{s.value}</p>
              <p className="text-[10px] font-semibold tracking-wider text-muted-foreground">{s.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Total Revenue list */}
    <Card>
      <CardHeader className="gap-0">
        <CardTitle>Total Revenue</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="px-3 pb-3 divide-y divide-border">
        {REVENUE_LIST.map((item) => (
          <div key={item.name} className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-2.5">
              <div className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full shrink-0",
                item.positive ? "bg-emerald-500/10" : "bg-rose-500/10"
              )}>
                {item.positive
                  ? <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />
                  : <ArrowDownRight className="h-3.5 w-3.5 text-rose-500" />
                }
              </div>
              <span className="text-sm font-medium">{item.name}</span>
            </div>
            <span className={cn("text-sm font-semibold tabular-nums", item.positive ? "text-emerald-500" : "text-rose-500")}>
              {item.change}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  </>
)

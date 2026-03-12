import type { LucideIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

// ─── Types ────────────────────────────────────────────────────────────────────

type TxStatus = "paid" | "pending" | "failed"
type Plan = "Free" | "Pro" | "Enterprise"

interface Transaction {
  id: string
  customer: string
  email: string
  plan: Plan
  amount: string
  date: string
  status: TxStatus
  initials: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TRANSACTIONS: Transaction[] = [
  { id: "TXN-4821", customer: "Alice Johnson", email: "alice@acme.com", plan: "Enterprise", amount: "$299.00", date: "Dec 18, 2025", status: "paid", initials: "AJ" },
  { id: "TXN-4820", customer: "Marcus Rivera", email: "marcus@startup.io", plan: "Pro", amount: "$29.00", date: "Dec 17, 2025", status: "paid", initials: "MR" },
  { id: "TXN-4819", customer: "Priya Nair", email: "priya@techcorp.com", plan: "Pro", amount: "$29.00", date: "Dec 17, 2025", status: "pending", initials: "PN" },
  { id: "TXN-4818", customer: "James Okonkwo", email: "james@bigco.com", plan: "Enterprise", amount: "$299.00", date: "Dec 16, 2025", status: "paid", initials: "JO" },
  { id: "TXN-4817", customer: "Sofia Chen", email: "sofia@designlab.co", plan: "Free", amount: "$0.00", date: "Dec 15, 2025", status: "paid", initials: "SC" },
  { id: "TXN-4816", customer: "Liam Barrett", email: "liam@agencyx.com", plan: "Pro", amount: "$29.00", date: "Dec 14, 2025", status: "failed", initials: "LB" },
  { id: "TXN-4815", customer: "Amara Diallo", email: "amara@ngocorp.org", plan: "Pro", amount: "$29.00", date: "Dec 13, 2025", status: "paid", initials: "AD" },
]

const statusConfig: Record<TxStatus, { label: string; variant: "default" | "secondary" | "destructive" }> = {
  paid: { label: "Paid", variant: "default" },
  pending: { label: "Pending", variant: "secondary" },
  failed: { label: "Failed", variant: "destructive" },
}

const planConfig: Record<Plan, { variant: "default" | "outline" | "secondary" }> = {
  Enterprise: { variant: "default" },
  Pro: { variant: "outline" },
  Free: { variant: "secondary" },
}

// ─── Component ────────────────────────────────────────────────────────────────

export const RecentTransactions = () => (
  <Card className="lg:col-span-2 overflow-hidden">
    <CardHeader>
      <div className="flex items-start justify-between gap-4">
        <div>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Last 7 billing events</CardDescription>
        </div>
        <Badge variant="outline" className="text-xs shrink-0">
          {TRANSACTIONS.filter(t => t.status === "pending").length} pending
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-t border-b bg-muted/40">
              <th className="px-6 py-3 text-left text-[11px] font-medium tracking-wider uppercase text-muted-foreground">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-medium tracking-wider uppercase text-muted-foreground">
                Plan
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-medium tracking-wider uppercase text-muted-foreground">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-medium tracking-wider uppercase text-muted-foreground hidden md:table-cell">
                Date
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-medium tracking-wider uppercase text-muted-foreground">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {TRANSACTIONS.map((tx) => {
              const { label, variant } = statusConfig[tx.status]
              return (
                <tr key={tx.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar className="h-7 w-7 shrink-0">
                        <AvatarFallback className="text-[10px] font-semibold">
                          {tx.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-medium leading-none truncate">{tx.customer}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">{tx.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge variant={planConfig[tx.plan].variant} className="text-xs">
                      {tx.plan}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5 font-semibold tabular-nums">{tx.amount}</td>
                  <td className="px-4 py-3.5 text-muted-foreground hidden md:table-cell">
                    {tx.date}
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge variant={variant} className="text-xs">{label}</Badge>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
)

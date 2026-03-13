"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, Clock, Plus, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DataTable, MultiSelectFilter, type DataTableColumn } from "@/components/ui/data-table"
import { StatCard } from "@/components/ui/stat-card"

// ─── Types & Data ─────────────────────────────────────────────────────────────

type PaymentStatus = "Paid" | "Pending" | "Overdue"

type Payment = {
  id: number
  receiptId: string
  issueDate: string
  clientName: string
  clientAvatar: string
  status: PaymentStatus
  dateOfPayment: string
  dueDate: string
  tax: string
  balance: number
}

const PAYMENTS: Payment[] = [
  { id: 1,  receiptId: "#790841", issueDate: "10.12.2020", clientName: "Joseph Williams", clientAvatar: "https://i.pravatar.cc/32?img=1",  status: "Overdue",  dateOfPayment: "13-2-2026", dueDate: "16/3/2026", tax: "2.5%", balance: 2500 },
  { id: 2,  receiptId: "#790842", issueDate: "10.12.2020", clientName: "Anshan Patel",    clientAvatar: "https://i.pravatar.cc/32?img=2",  status: "Pending",  dateOfPayment: "12-3-2026", dueDate: "3/4/2026",  tax: "2.5%", balance: 5000 },
  { id: 3,  receiptId: "#798699", issueDate: "10.12.2020", clientName: "Larry Downs",     clientAvatar: "https://i.pravatar.cc/32?img=3",  status: "Paid",     dateOfPayment: "16-2-2026", dueDate: "27/3/2026", tax: "2.5%", balance: 2500 },
  { id: 4,  receiptId: "#790752", issueDate: "10.12.2020", clientName: "Sara Soudan",     clientAvatar: "https://i.pravatar.cc/32?img=4",  status: "Paid",     dateOfPayment: "12-3-2026", dueDate: "15/3/2026", tax: "2.5%", balance: 5000 },
  { id: 5,  receiptId: "#790955", issueDate: "10.12.2020", clientName: "Joseph Williams", clientAvatar: "https://i.pravatar.cc/32?img=5",  status: "Pending",  dateOfPayment: "21-2-2026", dueDate: "18/3/2026", tax: "2.5%", balance: 2500 },
  { id: 6,  receiptId: "#790785", issueDate: "10.12.2020", clientName: "Anshan Patel",    clientAvatar: "https://i.pravatar.cc/32?img=6",  status: "Overdue",  dateOfPayment: "18-2-2026", dueDate: "28/3/2026", tax: "2.5%", balance: 5000 },
  { id: 7,  receiptId: "#800837", issueDate: "10.12.2020", clientName: "Larry Downs",     clientAvatar: "https://i.pravatar.cc/32?img=7",  status: "Overdue",  dateOfPayment: "18-2-2026", dueDate: "24/3/2026", tax: "2.5%", balance: 2500 },
  { id: 8,  receiptId: "#810365", issueDate: "10.12.2020", clientName: "Sara Soudan",     clientAvatar: "https://i.pravatar.cc/32?img=8",  status: "Pending",  dateOfPayment: "7-3-2026",  dueDate: "19/3/2026", tax: "2.5%", balance: 5000 },
  { id: 9,  receiptId: "#810814", issueDate: "10.12.2020", clientName: "Sara Soudan",     clientAvatar: "https://i.pravatar.cc/32?img=9",  status: "Paid",     dateOfPayment: "21-2-2026", dueDate: "26/3/2026", tax: "2.5%", balance: 2500 },
  { id: 10, receiptId: "#820385", issueDate: "10.12.2020", clientName: "Joseph Williams", clientAvatar: "https://i.pravatar.cc/32?img=10", status: "Paid",     dateOfPayment: "14-2-2026", dueDate: "23/3/2026", tax: "2.5%", balance: 5000 },
]

// ─── Status icon ──────────────────────────────────────────────────────────────

const StatusIcon = ({ status }: { status: PaymentStatus }) => {
  if (status === "Paid")    return <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
  if (status === "Pending") return <Clock        className="h-4 w-4 text-amber-500   shrink-0" />
  return <XCircle className="h-4 w-4 text-destructive shrink-0" />
}

// ─── Columns ──────────────────────────────────────────────────────────────────

const columns: DataTableColumn<Payment>[] = [
  {
    key: "receiptId",
    header: "Receipt ID",
    sortable: true,
    render: row => <span className="font-semibold text-sm">{row.receiptId}</span>,
  },
  {
    key: "issueDate",
    header: "Issue Date",
    sortable: true,
    render: row => <span className="text-sm text-muted-foreground whitespace-nowrap">{row.issueDate}</span>,
  },
  {
    key: "clientName",
    header: "Account Name",
    hideable: false,
    sortable: true,
    render: row => (
      <div className="flex items-center gap-2.5">
        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
          <Image src={row.clientAvatar} alt={row.clientName} fill className="object-cover" />
        </div>
        <span className="text-sm font-medium truncate">{row.clientName}</span>
        <StatusIcon status={row.status} />
      </div>
    ),
  },
  {
    key: "dateOfPayment",
    header: "Date of Payment",
    sortable: true,
    hideBelow: "sm",
    render: row => <span className="text-sm text-muted-foreground whitespace-nowrap">{row.dateOfPayment}</span>,
  },
  {
    key: "dueDate",
    header: "Due Date",
    sortable: true,
    hideBelow: "md",
    render: row => <span className="text-sm text-muted-foreground whitespace-nowrap">{row.dueDate}</span>,
  },
  {
    key: "tax",
    header: "Tax",
    sortable: true,
    hideBelow: "lg",
    render: row => <span className="text-sm tabular-nums">{row.tax}</span>,
  },
  {
    key: "balance",
    header: "Balance",
    sortable: true,
    align: "right",
    render: row => <span className="text-sm tabular-nums font-medium">£{row.balance.toLocaleString()}</span>,
  },
  {
    key: "actions",
    header: "",
    hideable: false,
    align: "right",
    render: () => (
      <Button variant="outline" size="sm" className="h-7 text-xs" asChild>
        <Link href="/invoice/payment/details">View</Link>
      </Button>
    ),
  },
]

// ─── Filter options ───────────────────────────────────────────────────────────

const STATUS_OPTIONS = (["Paid", "Pending", "Overdue"] as PaymentStatus[]).map(s => ({
  value: s,
  label: s,
  count: PAYMENTS.filter(p => p.status === s).length,
}))

// ─── Sparkline data ───────────────────────────────────────────────────────────

const TOTAL_SPARKLINE   = [4, 7, 5, 8, 6, 9, 7, 10, 8, 6]
const PAID_SPARKLINE    = [12, 15, 11, 18, 14, 20, 16, 22, 18, 15]
const PENDING_SPARKLINE = [3, 5, 2, 4, 6, 3, 5, 4, 3, 2]
const OVERDUE_SPARKLINE = [8, 12, 10, 15, 12, 18, 14, 16, 12, 10]

// ─── Page ─────────────────────────────────────────────────────────────────────

const PaymentListPage = () => {
  const [activeStatuses, setActiveStatuses] = useState<Set<string>>(new Set())

  const filtered = activeStatuses.size === 0
    ? PAYMENTS
    : PAYMENTS.filter(p => activeStatuses.has(p.status))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Payment List</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Track and manage all payment receipts.</p>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Invoice" value="180"     change="+12"   positive sparkline={TOTAL_SPARKLINE}   />
        <StatCard label="Paid"          value="$25,890" change="+8.2%" positive sparkline={PAID_SPARKLINE}    />
        <StatCard label="Pending"       value="$3,400"  change="-2.1%" positive={false} sparkline={PENDING_SPARKLINE} />
        <StatCard label="Overdue"       value="$55,865" change="+5.4%" positive={false} sparkline={OVERDUE_SPARKLINE} />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        defaultPageSize={10}
        pageSizeOptions={[5, 10, 25]}
        searchPlaceholder="Search payments..."
        toolbarFilters={
          <MultiSelectFilter
            label="Status"
            options={STATUS_OPTIONS}
            value={activeStatuses}
            onChange={setActiveStatuses}
          />
        }
        toolbarActions={
          <Button size="sm" className="h-8 gap-1.5 text-xs" asChild>
            <Link href="/invoice/payment/create">
              <Plus className="h-3.5 w-3.5" />
              Add Payment
            </Link>
          </Button>
        }
      />
    </div>
  )
}

export default PaymentListPage

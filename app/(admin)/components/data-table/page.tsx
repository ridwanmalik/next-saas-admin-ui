"use client"

import { useState } from "react"
import { MoreHorizontalIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable, MultiSelectFilter, type DataTableColumn } from "@/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ShowCard from "../_components/show-card"

// ─── Types & Data ─────────────────────────────────────────────────────────────

type PaymentStatus = "pending" | "processing" | "success" | "failed"

type Payment = {
  id: string
  amount: number
  status: PaymentStatus
  email: string
}

const PAYMENTS: Payment[] = [
  { id: "728ed52f", amount: 100,  status: "pending",    email: "m@example.com"    },
  { id: "489e1d42", amount: 125,  status: "processing", email: "example@gmail.com"},
  { id: "573b1a8c", amount: 250,  status: "success",    email: "lee@acme.com"     },
  { id: "6a4d2f91", amount: 75,   status: "failed",     email: "raj@corp.io"      },
  { id: "2c9e4b17", amount: 310,  status: "success",    email: "nina@startup.co"  },
  { id: "8f3c7d05", amount: 50,   status: "pending",    email: "tom@mail.net"     },
  { id: "1e6b9a4f", amount: 420,  status: "success",    email: "sara@techco.dev"  },
  { id: "3d7f2e18", amount: 90,   status: "failed",     email: "mike@cloud.io"    },
  { id: "9a1c5b2d", amount: 175,  status: "processing", email: "ann@growthco.com" },
  { id: "4f8e3c6a", amount: 600,  status: "success",    email: "josh@fintech.io"  },
]

const statusVariant: Record<PaymentStatus, "default" | "secondary" | "outline" | "destructive"> = {
  success:    "default",
  processing: "secondary",
  pending:    "outline",
  failed:     "destructive",
}

// ─── Payment Actions ───────────────────────────────────────────────────────────

const PaymentActions = ({ payment }: { payment: Payment }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon-sm">
        <span className="sr-only">Open menu</span>
        <MoreHorizontalIcon />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
        Copy payment ID
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>View customer</DropdownMenuItem>
      <DropdownMenuItem>View payment details</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

// ─── Columns ──────────────────────────────────────────────────────────────────

const columns: DataTableColumn<Payment>[] = [
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: row => (
      <Badge variant={statusVariant[row.status]} className="capitalize">
        {row.status}
      </Badge>
    ),
  },
  {
    key: "email",
    header: "Email",
    sortable: true,
    render: row => <span className="font-medium">{row.email}</span>,
  },
  {
    key: "amount",
    header: "Amount",
    sortable: true,
    align: "right",
    render: row => (
      <span className="font-medium tabular-nums">
        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(row.amount)}
      </span>
    ),
  },
  {
    key: "actions",
    header: "",
    hideable: false,
    align: "right",
    render: row => <PaymentActions payment={row} />,
  },
]

const STATUS_OPTIONS = (["pending", "processing", "success", "failed"] as PaymentStatus[]).map(s => ({
  value: s,
  label: s.charAt(0).toUpperCase() + s.slice(1),
  count: PAYMENTS.filter(p => p.status === s).length,
}))

// ─── Page ─────────────────────────────────────────────────────────────────────

const DataTablePage = () => {
  const [activeStatuses, setActiveStatuses] = useState<Set<string>>(new Set())

  const filteredPayments = activeStatuses.size === 0
    ? PAYMENTS
    : PAYMENTS.filter(p => activeStatuses.has(p.status))

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Data Table</h2>
        <p className="text-muted-foreground">A powerful table built using TanStack Table with sorting, filtering, pagination, and column visibility.</p>
      </div>
      <div className="space-y-4">
        <ShowCard>
          <DataTable
            columns={columns}
            data={filteredPayments}
            defaultPageSize={5}
            pageSizeOptions={[5, 10]}
            searchPlaceholder="Search payments..."
            toolbarFilters={
              <MultiSelectFilter
                label="Status"
                options={STATUS_OPTIONS}
                value={activeStatuses}
                onChange={setActiveStatuses}
              />
            }
          />
        </ShowCard>
      </div>
    </div>
  )
}

export default DataTablePage

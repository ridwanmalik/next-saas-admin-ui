"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Plus } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable, MultiSelectFilter, type DataTableColumn } from "@/components/ui/data-table"

// ─── Types & Data ─────────────────────────────────────────────────────────────

type InvoiceStatus = "Paid" | "Unpaid" | "Cancelled" | "Pending"

type Invoice = {
  id: number
  invoiceNo: string
  issueDate: string
  dueDate: string
  clientName: string
  clientEmail: string
  clientAvatar: string
  amount: number
  status: InvoiceStatus
}

const INVOICES: Invoice[] = [
  { id: 1, invoiceNo: "INV-0001", issueDate: "Jan 10, 2024", dueDate: "Jan 25, 2024", clientName: "Gaetano Rossi",   clientEmail: "gaetano@example.com",  clientAvatar: "https://i.pravatar.cc/32?img=1", amount: 1200, status: "Paid"      },
  { id: 2, invoiceNo: "INV-0002", issueDate: "Jan 18, 2024", dueDate: "Feb 2, 2024",  clientName: "Tessi Eneas",     clientEmail: "tessi@example.com",    clientAvatar: "https://i.pravatar.cc/32?img=2", amount: 850,  status: "Unpaid"    },
  { id: 3, invoiceNo: "INV-0003", issueDate: "Feb 3, 2024",  dueDate: "Feb 18, 2024", clientName: "Abey Boseley",    clientEmail: "abey@example.com",     clientAvatar: "https://i.pravatar.cc/32?img=3", amount: 3400, status: "Pending"   },
  { id: 4, invoiceNo: "INV-0004", issueDate: "Feb 14, 2024", dueDate: "Mar 1, 2024",  clientName: "Shelba Thews",    clientEmail: "shelba@example.com",   clientAvatar: "https://i.pravatar.cc/32?img=4", amount: 560,  status: "Cancelled" },
  { id: 5, invoiceNo: "INV-0005", issueDate: "Mar 5, 2024",  dueDate: "Mar 20, 2024", clientName: "Sophia Hale",     clientEmail: "sophia@example.com",   clientAvatar: "https://i.pravatar.cc/32?img=5", amount: 2500, status: "Paid"      },
  { id: 6, invoiceNo: "INV-0006", issueDate: "Mar 22, 2024", dueDate: "Apr 6, 2024",  clientName: "Marcus Webb",     clientEmail: "marcus@example.com",   clientAvatar: "https://i.pravatar.cc/32?img=6", amount: 980,  status: "Unpaid"    },
  { id: 7, invoiceNo: "INV-0007", issueDate: "Apr 8, 2024",  dueDate: "Apr 23, 2024", clientName: "Elena Vasquez",   clientEmail: "elena@example.com",    clientAvatar: "https://i.pravatar.cc/32?img=7", amount: 1750, status: "Paid"      },
  { id: 8, invoiceNo: "INV-0008", issueDate: "Apr 17, 2024", dueDate: "May 2, 2024",  clientName: "David Okafor",    clientEmail: "david@example.com",    clientAvatar: "https://i.pravatar.cc/32?img=8", amount: 640,  status: "Pending"   },
]

// ─── Style maps ───────────────────────────────────────────────────────────────

const statusVariant: Record<InvoiceStatus, "default" | "destructive" | "outline" | "secondary"> = {
  Paid:      "default",
  Unpaid:    "destructive",
  Cancelled: "outline",
  Pending:   "secondary",
}

// ─── Columns ──────────────────────────────────────────────────────────────────

const columns: DataTableColumn<Invoice>[] = [
  {
    key: "issueDate",
    header: "Issue Date",
    sortable: true,
    render: row => <span className="text-muted-foreground whitespace-nowrap">{row.issueDate}</span>,
  },
  {
    key: "invoiceNo",
    header: "Invoice No",
    sortable: true,
    render: row => <span className="font-semibold">{row.invoiceNo}</span>,
  },
  {
    key: "clientName",
    header: "Customer",
    hideable: false,
    render: row => (
      <div className="flex items-center gap-2.5">
        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
          <Image src={row.clientAvatar} alt={row.clientName} fill className="object-cover" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium leading-none truncate">{row.clientName}</p>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{row.clientEmail}</p>
        </div>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: row => (
      <Badge variant={statusVariant[row.status]} className="text-xs">
        {row.status}
      </Badge>
    ),
  },
  {
    key: "dueDate",
    header: "Due Date",
    sortable: true,
    hideBelow: "md",
    render: row => <span className="text-muted-foreground whitespace-nowrap">{row.dueDate}</span>,
  },
  {
    key: "amount",
    header: "Amount",
    sortable: true,
    align: "right",
    render: row => (
      <span className="tabular-nums font-medium">
        ${row.amount.toLocaleString()}
      </span>
    ),
  },
  {
    key: "actions",
    header: "",
    hideable: false,
    align: "right",
    render: () => (
      <Button variant="outline" size="sm" className="h-7 text-xs" asChild>
        <Link href="/invoice/details">View</Link>
      </Button>
    ),
  },
]

// ─── Filter options ───────────────────────────────────────────────────────────

const STATUS_OPTIONS = (["Paid", "Unpaid", "Pending", "Cancelled"] as InvoiceStatus[]).map(s => ({
  value: s,
  label: s,
  count: INVOICES.filter(i => i.status === s).length,
}))

// ─── Page ─────────────────────────────────────────────────────────────────────

const InvoiceListPage = () => {
  const [activeStatuses, setActiveStatuses] = useState<Set<string>>(new Set())

  const filteredInvoices = activeStatuses.size === 0
    ? INVOICES
    : INVOICES.filter(i => activeStatuses.has(i.status))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Invoice List</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Manage and track all invoices.</p>
      </div>

      <DataTable
        columns={columns}
        data={filteredInvoices}
        defaultPageSize={10}
        pageSizeOptions={[5, 10, 25]}
        searchPlaceholder="Search invoices..."
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
            <Link href="/invoice/create">
              <Plus className="h-3.5 w-3.5" />
              New Invoice
            </Link>
          </Button>
        }
      />
    </div>
  )
}

export default InvoiceListPage

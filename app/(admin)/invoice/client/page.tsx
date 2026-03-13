"use client"

import Image from "next/image"
import Link from "next/link"
import { Pencil, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DataTable, type DataTableColumn } from "@/components/ui/data-table"

// ─── Types & Data ─────────────────────────────────────────────────────────────

type Client = {
  id: number
  name: string
  email: string
  phone: string
  address: string
  invoices: number
  totalSpend: number
  avatar: string
}

const CLIENTS: Client[] = [
  { id: 1, name: "Gaetano Rossi",   email: "gaetano@example.com",  phone: "253-418-5940", address: "Herminahaven, NY",       invoices: 12, totalSpend: 8400,  avatar: "https://i.pravatar.cc/32?img=1" },
  { id: 2, name: "Tessi Eneas",     email: "tessi@example.com",    phone: "617-234-9812", address: "Springfield, MA",        invoices: 7,  totalSpend: 3200,  avatar: "https://i.pravatar.cc/32?img=2" },
  { id: 3, name: "Abey Boseley",    email: "abey@example.com",     phone: "401-554-1293", address: "Providence, RI",         invoices: 5,  totalSpend: 2100,  avatar: "https://i.pravatar.cc/32?img=3" },
  { id: 4, name: "Shelba Thews",    email: "shelba@example.com",   phone: "312-789-0045", address: "Chicago, IL",            invoices: 9,  totalSpend: 5750,  avatar: "https://i.pravatar.cc/32?img=4" },
  { id: 5, name: "Sophia Hale",     email: "sophia@example.com",   phone: "415-336-8872", address: "San Francisco, CA",      invoices: 14, totalSpend: 12300, avatar: "https://i.pravatar.cc/32?img=5" },
  { id: 6, name: "Marcus Webb",     email: "marcus@example.com",   phone: "720-944-0011", address: "Denver, CO",             invoices: 4,  totalSpend: 1850,  avatar: "https://i.pravatar.cc/32?img=6" },
]

// ─── Columns ──────────────────────────────────────────────────────────────────

const columns: DataTableColumn<Client>[] = [
  {
    key: "name",
    header: "Client",
    sortable: true,
    hideable: false,
    render: row => (
      <div className="flex items-center gap-2.5">
        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
          <Image src={row.avatar} alt={row.name} fill className="object-cover" />
        </div>
        <span className="text-sm font-medium truncate">{row.name}</span>
      </div>
    ),
  },
  {
    key: "email",
    header: "Email",
    sortable: true,
    hideBelow: "sm",
    render: row => <span className="text-muted-foreground text-sm">{row.email}</span>,
  },
  {
    key: "phone",
    header: "Phone",
    hideBelow: "md",
    render: row => <span className="text-sm tabular-nums">{row.phone}</span>,
  },
  {
    key: "address",
    header: "Address",
    hideBelow: "lg",
    render: row => <span className="text-sm text-muted-foreground">{row.address}</span>,
  },
  {
    key: "invoices",
    header: "Invoices",
    sortable: true,
    align: "right",
    hideBelow: "sm",
    render: row => <span className="tabular-nums font-medium">{row.invoices}</span>,
  },
  {
    key: "totalSpend",
    header: "Total Spend",
    sortable: true,
    align: "right",
    render: row => <span className="tabular-nums font-medium">${row.totalSpend.toLocaleString()}</span>,
  },
  {
    key: "actions",
    header: "",
    hideable: false,
    align: "right",
    render: () => (
      <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
        <Pencil className="h-3.5 w-3.5" />
      </Button>
    ),
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

const ClientsPage = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Clients</h2>
      <p className="text-sm text-muted-foreground mt-0.5">Manage invoice clients.</p>
    </div>

    <DataTable
      columns={columns}
      data={CLIENTS}
      defaultPageSize={10}
      pageSizeOptions={[5, 10, 25]}
      searchPlaceholder="Search clients..."
      toolbarActions={
        <Button size="sm" className="h-8 gap-1.5 text-xs" asChild>
          <Link href="/invoice/client/create">
            <UserPlus className="h-3.5 w-3.5" />
            Add Client
          </Link>
        </Button>
      }
    />
  </div>
)

export default ClientsPage

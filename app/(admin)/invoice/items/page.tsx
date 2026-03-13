"use client"

import { useState } from "react"
import { Pencil, Plus } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable, MultiSelectFilter, type DataTableColumn } from "@/components/ui/data-table"

// ─── Types & Data ─────────────────────────────────────────────────────────────

type ItemStatus = "Active" | "Inactive"

type Item = {
  id: number
  name: string
  description: string
  unitPrice: number
  unit: string
  status: ItemStatus
}

const ITEMS: Item[] = [
  { id: 1, name: "Logo Design",     description: "Professional logo design with multiple revisions and source files included.",    unitPrice: 200, unit: "project", status: "Active"   },
  { id: 2, name: "Landing Page",    description: "Responsive landing page with conversion-optimized layout and CMS integration.", unitPrice: 100, unit: "page",    status: "Active"   },
  { id: 3, name: "Admin Template",  description: "Full-featured admin dashboard template with dark mode and component library.",   unitPrice: 150, unit: "license", status: "Active"   },
  { id: 4, name: "Mobile App",      description: "Cross-platform mobile app development with React Native for iOS and Android.",  unitPrice: 300, unit: "app",     status: "Inactive" },
  { id: 5, name: "SEO Package",     description: "Comprehensive SEO audit, keyword research, and on-page optimization service.",  unitPrice: 250, unit: "month",   status: "Active"   },
  { id: 6, name: "Content Writing", description: "High-quality blog posts and articles written by experienced content writers.", unitPrice: 80,  unit: "article", status: "Inactive" },
]

// ─── Style maps ───────────────────────────────────────────────────────────────

const statusVariant: Record<ItemStatus, "default" | "secondary"> = {
  Active:   "default",
  Inactive: "secondary",
}

// ─── Columns ──────────────────────────────────────────────────────────────────

const columns: DataTableColumn<Item>[] = [
  {
    key: "name",
    header: "Name",
    sortable: true,
    hideable: false,
    render: row => <span className="font-medium text-sm">{row.name}</span>,
  },
  {
    key: "description",
    header: "Description",
    hideBelow: "md",
    render: row => (
      <span className="text-sm text-muted-foreground line-clamp-1 max-w-72">{row.description}</span>
    ),
  },
  {
    key: "unit",
    header: "Unit",
    sortable: true,
    hideBelow: "sm",
    render: row => <span className="text-sm text-muted-foreground capitalize">{row.unit}</span>,
  },
  {
    key: "unitPrice",
    header: "Unit Price",
    sortable: true,
    align: "right",
    render: row => <span className="tabular-nums font-medium">${row.unitPrice}</span>,
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

// ─── Filter options ───────────────────────────────────────────────────────────

const STATUS_OPTIONS = (["Active", "Inactive"] as ItemStatus[]).map(s => ({
  value: s,
  label: s,
  count: ITEMS.filter(i => i.status === s).length,
}))

// ─── Page ─────────────────────────────────────────────────────────────────────

const ItemsPage = () => {
  const [activeStatuses, setActiveStatuses] = useState<Set<string>>(new Set())

  const filteredItems = activeStatuses.size === 0
    ? ITEMS
    : ITEMS.filter(i => activeStatuses.has(i.status))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Items</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Manage invoice line items.</p>
      </div>

      <DataTable
        columns={columns}
        data={filteredItems}
        defaultPageSize={10}
        pageSizeOptions={[5, 10, 25]}
        searchPlaceholder="Search items..."
        toolbarFilters={
          <MultiSelectFilter
            label="Status"
            options={STATUS_OPTIONS}
            value={activeStatuses}
            onChange={setActiveStatuses}
          />
        }
        toolbarActions={
          <Button size="sm" className="h-8 gap-1.5 text-xs">
            <Plus className="h-3.5 w-3.5" />
            Add Item
          </Button>
        }
      />
    </div>
  )
}

export default ItemsPage

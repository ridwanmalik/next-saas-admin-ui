"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable, MultiSelectFilter } from "@/components/ui/data-table"
import type { DataTableColumn } from "@/components/ui/data-table"
import Link from "next/link"
import { Plus, Star } from "lucide-react"

type Product = {
  id: number
  name: string
  image: string
  category: string
  price: number
  sales: number
  rating: number
  status: "In Stock" | "Out of Stock" | "Low Stock"
}

const PRODUCTS: Product[] = [
  { id: 1,  name: "Wireless Noise-Cancelling Headphones", image: "https://picsum.photos/seed/headphones/80/80",      category: "Electronics", price: 249, sales: 1240, rating: 4.8, status: "In Stock"     },
  { id: 2,  name: "Premium Smart Watch Series 5",         image: "https://picsum.photos/seed/smartwatch/80/80",    category: "Electronics", price: 399, sales: 876,  rating: 4.9, status: "In Stock"     },
  { id: 3,  name: "Mechanical Gaming Keyboard",           image: "https://picsum.photos/seed/keyboard/80/80",      category: "Electronics", price: 129, sales: 543,  rating: 4.7, status: "Low Stock"    },
  { id: 4,  name: "Ergonomic Laptop Stand",               image: "https://picsum.photos/seed/laptopstand/80/80",   category: "Accessories", price: 79,  sales: 321,  rating: 4.6, status: "In Stock"     },
  { id: 5,  name: "Running Shoes Pro Elite",              image: "https://picsum.photos/seed/runningshoe/80/80",   category: "Footwear",    price: 189, sales: 2100, rating: 4.5, status: "In Stock"     },
  { id: 6,  name: "Minimalist Leather Backpack",          image: "https://picsum.photos/seed/backpackleather/80/80", category: "Bags",      price: 149, sales: 654,  rating: 4.8, status: "In Stock"     },
  { id: 7,  name: "Portable Bluetooth Speaker",           image: "https://picsum.photos/seed/btspeaker/80/80",    category: "Electronics", price: 89,  sales: 987,  rating: 4.4, status: "Low Stock"    },
  { id: 8,  name: "Stainless Steel Water Bottle",         image: "https://picsum.photos/seed/waterbottle/80/80",   category: "Accessories", price: 39,  sales: 3200, rating: 4.7, status: "In Stock"     },
  { id: 9,  name: "Polarized Sunglasses",                 image: "https://picsum.photos/seed/sunglasses/80/80",   category: "Accessories", price: 119, sales: 432,  rating: 4.5, status: "In Stock"     },
  { id: 10, name: "Woolen Winter Jacket",                 image: "https://picsum.photos/seed/winterjacket/80/80", category: "Clothing",    price: 299, sales: 287,  rating: 4.6, status: "Out of Stock"  },
  { id: 11, name: "Ceramic Coffee Mug Set",               image: "https://picsum.photos/seed/coffeemug/80/80",    category: "Home",        price: 49,  sales: 1560, rating: 4.9, status: "In Stock"     },
  { id: 12, name: "Yoga Mat Premium Thick",               image: "https://picsum.photos/seed/yogamat/80/80",      category: "Sports",      price: 69,  sales: 812,  rating: 4.8, status: "Low Stock"    },
]

const STATUS_OPTIONS = [
  { label: "In Stock",     value: "In Stock"     },
  { label: "Low Stock",    value: "Low Stock"    },
  { label: "Out of Stock", value: "Out of Stock" },
]

const CATEGORY_OPTIONS = [
  { label: "Electronics", value: "Electronics" },
  { label: "Accessories", value: "Accessories" },
  { label: "Footwear",    value: "Footwear"    },
  { label: "Bags",        value: "Bags"        },
  { label: "Clothing",    value: "Clothing"    },
  { label: "Home",        value: "Home"        },
  { label: "Sports",      value: "Sports"      },
]

const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  "In Stock":     "default",
  "Low Stock":    "secondary",
  "Out of Stock": "destructive",
}

const columns: DataTableColumn<Product>[] = [
  {
    key: "name",
    header: "Product",
    sortable: true,
    render: p => (
      <Link href="/ecommerce/product-details" className="flex items-center gap-3 group">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border bg-muted">
          <Image src={p.image} alt={p.name} fill className="object-cover" />
        </div>
        <span className="font-medium line-clamp-1 group-hover:underline">{p.name}</span>
      </Link>
    ),
  },
  { key: "category", header: "Category", sortable: true },
  {
    key: "price",
    header: "Price",
    sortable: true,
    render: p => <span className="font-medium">${p.price}</span>,
  },
  {
    key: "sales",
    header: "Sales",
    sortable: true,
    render: p => p.sales.toLocaleString(),
  },
  {
    key: "rating",
    header: "Rating",
    sortable: true,
    render: p => (
      <span className="flex items-center gap-1">
        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
        {p.rating}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: p => <Badge variant={statusVariant[p.status]}>{p.status}</Badge>,
  },
  {
    key: "id",
    header: "",
    render: () => (
      <Button variant="ghost" size="sm" asChild>
        <Link href="/ecommerce/product-details">Edit</Link>
      </Button>
    ),
  },
]

const ProductListPage = () => {
  const [statusFilter, setStatusFilter]     = useState<Set<string>>(new Set())
  const [categoryFilter, setCategoryFilter] = useState<Set<string>>(new Set())

  const filtered = PRODUCTS.filter(p =>
    (statusFilter.size === 0 || statusFilter.has(p.status)) &&
    (categoryFilter.size === 0 || categoryFilter.has(p.category))
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Product List</h2>
          <p className="text-muted-foreground">Browse and manage all products.</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        toolbarFilters={[
          <MultiSelectFilter
            key="status"
            label="Status"
            options={STATUS_OPTIONS}
            value={statusFilter}
            onChange={setStatusFilter}
          />,
          <MultiSelectFilter
            key="category"
            label="Category"
            options={CATEGORY_OPTIONS}
            value={categoryFilter}
            onChange={setCategoryFilter}
          />,
        ]}
        toolbarActions={[
          <Button key="add" size="sm" asChild>
            <Link href="/ecommerce/products">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>,
        ]}
      />
    </div>
  )
}

export default ProductListPage

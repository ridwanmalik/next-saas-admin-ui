"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

// ─── Types ────────────────────────────────────────────────────────────────────

type LineItem = {
  name: string
  qty: number
  unitPrice: number
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ITEM_OPTIONS = [
  { name: "Logo Design",     price: 200 },
  { name: "Landing Page",    price: 100 },
  { name: "Admin Template",  price: 150 },
  { name: "Mobile App",      price: 300 },
]

const CLIENT_OPTIONS = ["Gaetano", "Tessi Eneas", "Abey Boseley", "Shelba Thews"]

const STATUS_OPTIONS = ["Pending", "Paid", "Unpaid", "Cancelled"]

const TAX_RATE = 0.10
const DISCOUNT_RATE = 0.05

const INITIAL_ITEMS: LineItem[] = [
  { name: "Canon EOS 1500D 24.1 Digital SLR", qty: 1, unitPrice: 12.99 },
  { name: "Fitbit MX30 Smart Watch",           qty: 1, unitPrice: 49.90 },
  { name: "Apple iPhone 13 Mini",              qty: 1, unitPrice: 86.99 },
]

// ─── Totals helpers ───────────────────────────────────────────────────────────

const computeTotals = (items: LineItem[]) => {
  const sub      = items.reduce((acc, i) => acc + i.qty * i.unitPrice, 0)
  const tax      = sub * TAX_RATE
  const discount = sub * DISCOUNT_RATE
  const total    = sub + tax - discount
  return { sub, tax, discount, total }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const EditInvoicePage = () => {
  const [items, setItems] = useState<LineItem[]>(INITIAL_ITEMS)
  const [selectedItemName, setSelectedItemName] = useState(ITEM_OPTIONS[0].name)
  const [addQty, setAddQty] = useState(1)

  const selectedItemOption = ITEM_OPTIONS.find(o => o.name === selectedItemName) ?? ITEM_OPTIONS[0]
  const addTotal = addQty * selectedItemOption.price

  const handleAddItem = () => {
    setItems(prev => [
      ...prev,
      { name: selectedItemName, qty: addQty, unitPrice: selectedItemOption.price },
    ])
    setAddQty(1)
  }

  const handleRemoveItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  const { sub, tax, discount, total } = computeTotals(items)

  return (
    <div className="space-y-6">

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 flex-wrap">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/invoice/list">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold tracking-tight">Edit Invoice</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Update invoice details below.</p>
        </div>
        <Button>Submit</Button>
      </div>

      {/* ── Form card ───────────────────────────────────────────────── */}
      <Card className="gap-0">
        <CardHeader className="pb-6">
          <CardTitle className="text-base">Invoice Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Row 1: Invoice number + client */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="invoice-no">Invoice Number</Label>
              <Input
                id="invoice-no"
                defaultValue="#45040"
                readOnly
                className="bg-muted/50 text-muted-foreground"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="select-client">Select Client</Label>
              <div className="flex gap-2">
                <Select defaultValue="Gaetano">
                  <SelectTrigger id="select-client">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CLIENT_OPTIONS.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="shrink-0 gap-1 text-xs h-9">
                  <Plus className="h-3.5 w-3.5" />
                  New Client
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Row 2: Client name, email, phone */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="client-name">
                Client Name <span className="text-destructive">*</span>
              </Label>
              <Input id="client-name" defaultValue="Gaetano" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="client-email">
                Client Email <span className="text-destructive">*</span>
              </Label>
              <Input id="client-email" type="email" defaultValue="alia_shields25@yahoo.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="client-phone">
                Client Contact Number <span className="text-destructive">*</span>
              </Label>
              <Input id="client-phone" type="tel" defaultValue="253-418-5940" />
            </div>
          </div>

          {/* Row 3: Address */}
          <div className="space-y-1.5">
            <Label htmlFor="client-address">
              Client Address <span className="text-destructive">*</span>
            </Label>
            <Input id="client-address" defaultValue="Herminahaven" />
          </div>

          <Separator />

          {/* Row 4: Invoice date + status */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="invoice-date">
                Invoice Date <span className="text-destructive">*</span>
              </Label>
              <Input id="invoice-date" type="date" defaultValue="2024-01-12" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="invoice-status">
                Status <span className="text-destructive">*</span>
              </Label>
              <Select defaultValue="Pending">
                <SelectTrigger id="invoice-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Items section */}
          <div className="space-y-4">
            <p className="text-sm font-semibold">Items</p>

            {/* Items table */}
            <div className="rounded-lg border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Description</th>
                    <th className="px-4 py-2.5 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground w-20">Qty</th>
                    <th className="px-4 py-2.5 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground w-28">Unit Price</th>
                    <th className="px-4 py-2.5 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground w-28">Total</th>
                    <th className="px-4 py-2.5 w-10" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {items.map((item, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3 font-medium truncate max-w-xs">{item.name}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{item.qty}</td>
                      <td className="px-4 py-3 text-right tabular-nums">${item.unitPrice.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right tabular-nums font-medium">${(item.qty * item.unitPrice).toFixed(2)}</td>
                      <td className="px-4 py-3 text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(i)}
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add item row */}
            <div className="flex items-end gap-2 flex-wrap">
              <div className="flex-1 min-w-44 space-y-1.5">
                <Label className="text-xs">Item</Label>
                <Select value={selectedItemName} onValueChange={setSelectedItemName}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ITEM_OPTIONS.map(o => (
                      <SelectItem key={o.name} value={o.name}>{o.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-20 space-y-1.5">
                <Label className="text-xs">Qty</Label>
                <Input
                  type="number"
                  min={1}
                  value={addQty}
                  onChange={e => setAddQty(Math.max(1, Number(e.target.value)))}
                  className="h-9"
                />
              </div>
              <div className="w-28 space-y-1.5">
                <Label className="text-xs">Unit Price</Label>
                <Input
                  readOnly
                  value={`$${selectedItemOption.price.toFixed(2)}`}
                  className="h-9 bg-muted/50 text-muted-foreground"
                />
              </div>
              <div className="w-24 space-y-1.5">
                <Label className="text-xs">Total</Label>
                <Input
                  readOnly
                  value={`$${addTotal.toFixed(2)}`}
                  className="h-9 bg-muted/50 text-muted-foreground font-medium"
                />
              </div>
              <Button size="sm" onClick={handleAddItem} className="h-9 gap-1.5">
                <Plus className="h-3.5 w-3.5" />
                Add Item
              </Button>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-72 rounded-lg bg-muted/50 p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sub Total</span>
                  <span className="tabular-nums">${sub.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (10%)</span>
                  <span className="tabular-nums">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount (5%)</span>
                  <span className="tabular-nums text-destructive">-${discount.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm font-semibold">
                  <span>Total</span>
                  <span className="tabular-nums text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Terms */}
          <div className="space-y-1.5">
            <Label htmlFor="terms">
              Terms and Condition <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="terms"
              rows={3}
              defaultValue="I acknowledge terms and conditions."
              className="resize-none text-sm"
            />
          </div>

        </CardContent>
      </Card>
    </div>
  )
}

export default EditInvoicePage

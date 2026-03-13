"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// ─── Page ─────────────────────────────────────────────────────────────────────

const AddItemPage = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    quantity: "",
    unit: "",
    tax: "",
    salesUnitPrice: "",
    salesCurrency: "USD",
    salesCess: "",
    purchaseUnitPrice: "",
    purchaseCurrency: "USD",
    purchaseCess: "",
  })

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  const setSelect = (field: keyof typeof form) => (value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleSave = () => {
    // TODO: submit form
    console.log(form)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Create Item</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Add a new invoice line item.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Add New Item</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Name" value={form.name} onChange={set("name")} />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Description"
              rows={4}
              value={form.description}
              onChange={set("description")}
            />
          </div>

          {/* Quantity / Unit / Tax */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={set("quantity")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="unit">Unit</Label>
              <Input id="unit" placeholder="Unit" value={form.unit} onChange={set("unit")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tax">Tax</Label>
              <Input id="tax" placeholder="Tax" value={form.tax} onChange={set("tax")} />
            </div>
          </div>

          {/* Sales Information */}
          <div className="space-y-4">
            <p className="text-sm font-semibold">Sales Information</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="sales-unit-price">Unit Price</Label>
                <Input id="sales-unit-price" type="number" placeholder="Unit Price" value={form.salesUnitPrice} onChange={set("salesUnitPrice")} />
              </div>
              <div className="space-y-1.5">
                <Label>Currency</Label>
                <Select value={form.salesCurrency} onValueChange={setSelect("salesCurrency")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="INR">INR</SelectItem>
                    <SelectItem value="CAD">CAD</SelectItem>
                    <SelectItem value="AUD">AUD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="sales-cess">CESS%</Label>
                <Input id="sales-cess" placeholder="CESS%" value={form.salesCess} onChange={set("salesCess")} />
              </div>
            </div>
          </div>

          {/* Purchase Information */}
          <div className="space-y-4">
            <p className="text-sm font-semibold">Purchase Information</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="purchase-unit-price">Unit Price</Label>
                <Input id="purchase-unit-price" type="number" placeholder="Unit Price" value={form.purchaseUnitPrice} onChange={set("purchaseUnitPrice")} />
              </div>
              <div className="space-y-1.5">
                <Label>Currency</Label>
                <Select value={form.purchaseCurrency} onValueChange={setSelect("purchaseCurrency")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="INR">INR</SelectItem>
                    <SelectItem value="CAD">CAD</SelectItem>
                    <SelectItem value="AUD">AUD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="purchase-cess">CESS%</Label>
                <Input id="purchase-cess" placeholder="CESS%" value={form.purchaseCess} onChange={set("purchaseCess")} />
              </div>
            </div>
          </div>

          {/* Save */}
          <div className="flex justify-end">
            <Button onClick={handleSave}>Save</Button>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}

export default AddItemPage

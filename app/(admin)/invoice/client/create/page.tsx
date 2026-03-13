"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

const CreateClientPage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    notes: "",
  })

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/invoice/client"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold tracking-tight">Add New Client</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Create a new client for invoicing.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/invoice/client">Cancel</Link>
          </Button>
          <Button size="sm" className="gap-1.5">
            <UserPlus className="h-3.5 w-3.5" />
            Add Client
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <Card className="gap-0">
            <CardHeader>
              <CardTitle className="text-base">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName">First Name <span className="text-destructive">*</span></Label>
                  <Input id="firstName" placeholder="John" value={form.firstName} onChange={set("firstName")} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName">Last Name <span className="text-destructive">*</span></Label>
                  <Input id="lastName" placeholder="Doe" value={form.lastName} onChange={set("lastName")} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email Address <span className="text-destructive">*</span></Label>
                  <Input id="email" type="email" placeholder="john@company.com" value={form.email} onChange={set("email")} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone Number <span className="text-destructive">*</span></Label>
                  <Input id="phone" placeholder="+1 000 000 0000" value={form.phone} onChange={set("phone")} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="company">Company / Organization</Label>
                  <Input id="company" placeholder="Acme Inc." value={form.company} onChange={set("company")} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="https://example.com" value={form.website} onChange={set("website")} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card className="gap-0">
            <CardHeader>
              <CardTitle className="text-base">Billing Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="address">Street Address <span className="text-destructive">*</span></Label>
                <Input id="address" placeholder="4898 Joanne Lane" value={form.address} onChange={set("address")} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Boston" value={form.city} onChange={set("city")} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" placeholder="Massachusetts" value={form.state} onChange={set("state")} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="zip">ZIP / Postal Code</Label>
                  <Input id="zip" placeholder="02110" value={form.zip} onChange={set("zip")} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" placeholder="United States" value={form.country} onChange={set("country")} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Notes */}
          <Card className="gap-0">
            <CardHeader>
              <CardTitle className="text-base">Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add any additional notes about this client…"
                rows={5}
                className="resize-none text-sm"
                value={form.notes}
                onChange={set("notes")}
              />
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="gap-0">
            <CardHeader>
              <CardTitle className="text-base">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Full Name</span>
                <span className="font-medium truncate max-w-36 text-right">
                  {form.firstName || form.lastName ? `${form.firstName} ${form.lastName}`.trim() : "—"}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium truncate max-w-36 text-right">{form.email || "—"}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Company</span>
                <span className="font-medium truncate max-w-36 text-right">{form.company || "—"}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location</span>
                <span className="font-medium truncate max-w-36 text-right">
                  {form.city || form.country ? [form.city, form.country].filter(Boolean).join(", ") : "—"}
                </span>
              </div>
              <div className="pt-2">
                <Button className="w-full gap-1.5" size="sm">
                  <Save className="h-3.5 w-3.5" />
                  Save Client
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CreateClientPage

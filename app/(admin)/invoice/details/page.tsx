"use client"

import Link from "next/link"
import { ArrowLeft, CheckCircle2, Clock, CreditCard, Edit, Mail, MapPin, Phone, Printer, Truck, User } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// ─── Mock Data ────────────────────────────────────────────────────────────────

const INVOICE_ITEMS = [
  { name: "Logo Design",    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", qty: 6, amount: 200.00 },
  { name: "Landing Page",   description: "Sed do eiusmod tempor incididunt ut labore et dolore magna.", qty: 7, amount: 100.00 },
  { name: "Admin Template", description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco.", qty: 5, amount: 150.00 },
]

const SUB_TOTAL = 2650
const TAX       = 265
const DISCOUNT  = 145.75
const TOTAL     = 2769.25

const TIMELINE = [
  { label: "Invoice Created",   date: "Jan 12, 2018", status: "done"    },
  { label: "Sent to Client",    date: "Jan 14, 2018", status: "done"    },
  { label: "Payment Pending",   date: "Jan 15, 2018", status: "pending" },
  { label: "Payment Received",  date: "Jan 20, 2018", status: "done"    },
  { label: "Invoice Closed",    date: "Jan 21, 2018", status: "done"    },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

const ItemsTable = () => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b bg-muted/40">
          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Description</th>
          <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">Qty</th>
          <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Amount</th>
          <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Total</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {INVOICE_ITEMS.map((item, i) => (
          <tr key={i} className="hover:bg-muted/30 transition-colors">
            <td className="px-4 py-3.5">
              <p className="font-medium">{item.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{item.description}</p>
            </td>
            <td className="px-4 py-3.5 text-center tabular-nums">{item.qty}</td>
            <td className="px-4 py-3.5 text-right tabular-nums">${item.amount.toFixed(2)}</td>
            <td className="px-4 py-3.5 text-right tabular-nums font-medium">${(item.qty * item.amount).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const TotalsBox = () => (
  <div className="flex justify-end px-4 pb-4">
    <div className="w-72 rounded-lg bg-muted/50 p-4 space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Sub Total</span>
        <span className="tabular-nums">${SUB_TOTAL.toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Tax (10%)</span>
        <span className="tabular-nums">${TAX.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Discount (5%)</span>
        <span className="tabular-nums text-destructive">-${DISCOUNT.toFixed(2)}</span>
      </div>
      <Separator />
      <div className="flex justify-between text-sm font-semibold">
        <span>Total</span>
        <span className="tabular-nums text-primary">${TOTAL.toFixed(2)}</span>
      </div>
    </div>
  </div>
)

// ─── Details Tab ──────────────────────────────────────────────────────────────

const DetailsTab = () => (
  <Card className="gap-0">
    <CardContent className="p-0 space-y-0">

      {/* Header row */}
      <div className="flex items-center justify-between flex-wrap gap-2 px-6 py-4">
        <p className="text-sm font-semibold">Client</p>
        <p className="text-sm text-muted-foreground">Placed on 12.07.2018 10:00</p>
      </div>

      {/* Client info row */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 px-6 pb-5">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <span>Sophia Hale</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <span>070 123 4567</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <span>example@mail.com</span>
        </div>
      </div>

      <Separator />

      {/* 3-column info */}
      <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
        {/* Payment */}
        <div className="px-6 py-5 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <CreditCard className="h-3.5 w-3.5" />
            <span className="font-medium">Payment</span>
          </div>
          <p className="text-sm"><span className="text-muted-foreground">Method:</span> Credit Card</p>
          <p className="text-sm"><span className="text-muted-foreground">Transaction ID:</span> 000001-TXT</p>
          <p className="text-sm"><span className="text-muted-foreground">Amount:</span> $2500</p>
        </div>
        {/* Shipping */}
        <div className="px-6 py-5 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Truck className="h-3.5 w-3.5" />
            <span className="font-medium">Shipping</span>
          </div>
          <p className="text-sm"><span className="text-muted-foreground">Method:</span> Carrier</p>
          <p className="text-sm"><span className="text-muted-foreground">Tracking Code:</span> FX-012345-6</p>
          <p className="text-sm"><span className="text-muted-foreground">Date:</span> 12.15.2018</p>
        </div>
        {/* Status */}
        <div className="px-6 py-5 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span className="font-medium">Status</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Fulfillment:</span>
            <Badge variant="default" className="text-xs">Delivered</Badge>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Payment:</span>
            <Badge variant="secondary" className="text-xs">Paid</Badge>
          </div>
        </div>
      </div>

      <Separator />

      {/* 2-column address */}
      <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
        {/* Billing */}
        <div className="px-6 py-5 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <MapPin className="h-3.5 w-3.5" />
            <span className="font-medium">Billing Address</span>
          </div>
          <p className="text-sm font-medium">Joseph William</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            4898 Joanne Lane street<br />
            Boston, United States<br />
            Massachusetts, 02110<br />
            +1 (070) 123-4567
          </p>
        </div>
        {/* Shipping */}
        <div className="px-6 py-5 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <MapPin className="h-3.5 w-3.5" />
            <span className="font-medium">Shipping Address</span>
          </div>
          <p className="text-sm font-medium">Sara Soudan</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            4898 Joanne Lane street<br />
            Boston, United States<br />
            Massachusetts, 02110<br />
            +1 (070) 123-4567
          </p>
        </div>
      </div>

      <Separator />

      {/* Items table */}
      <ItemsTable />
      <TotalsBox />

    </CardContent>
  </Card>
)

// ─── Invoice Tab ──────────────────────────────────────────────────────────────

const InvoiceTab = () => (
  <Card className="gap-0">
    <CardContent className="p-6 space-y-6">

      {/* Top */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">N</div>
            <span className="text-base font-bold">Next SaaS Inc.</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            123 Business Ave, Suite 100<br />
            San Francisco, CA 94105<br />
            contact@nextsaas.io
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold tracking-tight text-muted-foreground/60">INVOICE</p>
        </div>
      </div>

      <Separator />

      {/* Invoice details + Bill To */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Invoice Details</p>
          <p className="text-sm"><span className="text-muted-foreground w-24 inline-block">Invoice #</span> INV-2018-001</p>
          <p className="text-sm"><span className="text-muted-foreground w-24 inline-block">Issue Date</span> Jan 12, 2018</p>
          <p className="text-sm"><span className="text-muted-foreground w-24 inline-block">Due Date</span> Jan 30, 2018</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground w-24 inline-block">Status</span>
            <Badge variant="default" className="text-xs">Paid</Badge>
          </div>
        </div>
        <div className="space-y-1.5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Bill To</p>
          <p className="text-sm font-medium">Sophia Hale</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            4898 Joanne Lane street<br />
            Boston, MA 02110<br />
            United States
          </p>
        </div>
      </div>

      <Separator />

      {/* Items */}
      <div className="overflow-x-auto -mx-6">
        <ItemsTable />
      </div>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-72 rounded-lg bg-muted/50 p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Sub Total</span>
            <span className="tabular-nums">${SUB_TOTAL.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax (10%)</span>
            <span className="tabular-nums">${TAX.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Discount (5%)</span>
            <span className="tabular-nums text-destructive">-${DISCOUNT.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-sm font-semibold">
            <span>Total</span>
            <span className="tabular-nums text-primary">${TOTAL.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Note */}
      <div className="space-y-1.5">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Terms &amp; Conditions</p>
        <p className="text-sm text-muted-foreground">I acknowledge terms and conditions.</p>
      </div>

      {/* Print */}
      <div className="flex justify-end">
        <Button variant="outline" size="sm" className="gap-1.5" onClick={() => window.print()}>
          <Printer className="h-3.5 w-3.5" />
          Print Invoice
        </Button>
      </div>

    </CardContent>
  </Card>
)

// ─── Status Tab ───────────────────────────────────────────────────────────────

const StatusTab = () => (
  <Card className="gap-0">
    <CardHeader className="pb-4">
      <CardTitle className="text-base">Invoice Timeline</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="relative pl-6">
        {/* Vertical line */}
        <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />

        <div className="space-y-8">
          {TIMELINE.map((step, i) => (
            <div key={i} className="relative flex items-start gap-4">
              {/* Icon */}
              <div
                className={cn(
                  "absolute -left-6 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 bg-background",
                  step.status === "done"    && "border-emerald-500",
                  step.status === "pending" && "border-amber-500"
                )}
              >
                {step.status === "done" ? (
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                ) : (
                  <Clock className="h-3 w-3 text-amber-500" />
                )}
              </div>
              {/* Content */}
              <div>
                <p className="text-sm font-medium">{step.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{step.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
)

// ─── Page ─────────────────────────────────────────────────────────────────────

const InvoiceDetailsPage = () => (
  <div className="space-y-6">

    {/* ── Header ──────────────────────────────────────────────────── */}
    <div className="flex items-center gap-4 flex-wrap">
      <Button variant="ghost" size="icon" asChild>
        <Link href="/invoice/list">
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </Button>
      <div className="flex-1">
        <h2 className="text-2xl font-bold tracking-tight">Invoice Details</h2>
        <p className="text-sm text-muted-foreground mt-0.5">View invoice info, printable version and status.</p>
      </div>
      <Button variant="outline" asChild>
        <Link href="/invoice/edit">
          <Edit className="mr-2 h-4 w-4" />
          Edit Invoice
        </Link>
      </Button>
    </div>

    {/* ── Tabs ────────────────────────────────────────────────────── */}
    <Tabs defaultValue="details">
      <TabsList>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="invoice">Invoice</TabsTrigger>
        <TabsTrigger value="status">Status</TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="mt-4">
        <DetailsTab />
      </TabsContent>

      <TabsContent value="invoice" className="mt-4">
        <InvoiceTab />
      </TabsContent>

      <TabsContent value="status" className="mt-4">
        <StatusTab />
      </TabsContent>
    </Tabs>
  </div>
)

export default InvoiceDetailsPage

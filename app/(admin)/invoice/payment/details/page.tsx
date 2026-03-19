"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Link2, Printer } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// ─── Mock data ────────────────────────────────────────────────────────────────

const RECEIPT = {
  id: "#00054196",
  client: {
    name: "Material Ui-SAAS",
    code: "CT-205",
    avatar: "https://i.pravatar.cc/48?img=5",
  },
  summary: {
    invoiceCount: 5,
    method: "UPI",
    amount: 10653,
    reference: "#00026557",
    bankCharges: 94,
    createDate: "26/2/2026",
  },
  billTo: {
    address: "128 Rue La Boétie, Paris, Île-de-France 75008, FR",
    email: "accounts@material-ui.com",
    siren: "852357748",
    vat: "FR93852357748",
  },
  shipTo: {
    address: "128 Rue La Boétie, Paris, Île-de-France 75008, FR",
  },
  invoices: [
    { issueDate: "7/15/2022",  invoiceNo: "#8795646525452", dueDate: "2/15/2022",  dueAmount: 2030, paymentValue: 2030 },
    { issueDate: "05/01/2022", invoiceNo: "#8795646525451", dueDate: "06/02/2022", dueAmount: 1000, paymentValue: 1000 },
    { issueDate: "7/6/2022",   invoiceNo: "#8795646525453", dueDate: "7/8/2022",   dueAmount: 3000, paymentValue: 3000 },
    { issueDate: "5/5/2022",   invoiceNo: "#8795646525455", dueDate: "7/11/2022",  dueAmount: 3000, paymentValue: 3000 },
    { issueDate: "2/8/2022",   invoiceNo: "#8795646525454", dueDate: "3/30/2022",  dueAmount: 2000, paymentValue: 1623 },
  ],
  totalPayment: 10653,
  totalDue: 377,
  notes: "We appreciate your business. Should you need us to add VAT or extra notes let us know!",
  supportEmail: "Support@Berrytheme.com",
}

const SUMMARY_FIELDS = [
  { label: "No. of Invoice", value: String(RECEIPT.summary.invoiceCount)           },
  { label: "Method",         value: RECEIPT.summary.method                         },
  { label: "Amount",         value: `$${RECEIPT.summary.amount.toLocaleString()}`  },
  { label: "Reference",      value: RECEIPT.summary.reference                      },
  { label: "Bank charges",   value: `$${RECEIPT.summary.bankCharges}`              },
  { label: "Create Date",    value: RECEIPT.summary.createDate                     },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

const PaymentDetailsPage = () => (
  <div className="space-y-6">

    {/* Header */}
    <div className="flex items-center gap-3 flex-wrap">
      <Button variant="ghost" size="icon" asChild>
        <Link href="/invoice/payment"><ArrowLeft className="h-4 w-4" /></Link>
      </Button>
      <div className="flex-1">
        <h2 className="text-2xl font-bold tracking-tight">Payment Details</h2>
        <p className="text-sm text-muted-foreground mt-0.5">View payment receipt details.</p>
      </div>
      <Button variant="outline" onClick={() => window.print()}>
        <Printer className="mr-2 h-4 w-4" />
        Print
      </Button>
    </div>

    <Card className="gap-0">
      <CardContent className="p-0">

        {/* Receipt title */}
        <div className="px-6 py-5">
          <h3 className="text-lg font-semibold">
            Payment Receipt Details{" "}
            <span className="text-muted-foreground font-normal text-base">({RECEIPT.id})</span>
          </h3>
        </div>

        <Separator />

        {/* Client + summary row */}
        <div className="px-6 py-5 flex flex-wrap gap-6 items-start">
          {/* Client */}
          <div className="flex items-start gap-3 min-w-40">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
              <Image src={RECEIPT.client.avatar} alt={RECEIPT.client.name} fill className="object-cover" />
            </div>
            <div>
              <p className="text-sm font-semibold">{RECEIPT.client.name}</p>
              <p className="text-xs text-muted-foreground">{RECEIPT.client.code}</p>
              <Button variant="link" size="sm" className="h-auto p-0 text-xs mt-1 gap-1">
                Get Link <Link2 className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Summary fields */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {SUMMARY_FIELDS.map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium tabular-nums">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Bill To / Ship To */}
        <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
          <div className="px-6 py-5 space-y-2">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Bill To</p>
            <p className="text-sm">
              <span className="text-muted-foreground w-16 inline-block">Address</span>
              {RECEIPT.billTo.address}
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground w-16 inline-block">Email</span>
              {RECEIPT.billTo.email}
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground w-16 inline-block">SIREN</span>
              {RECEIPT.billTo.siren}
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground w-16 inline-block">VAT</span>
              {RECEIPT.billTo.vat}
            </p>
          </div>
          <div className="px-6 py-5 space-y-2">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Ship To</p>
            <p className="text-sm">{RECEIPT.shipTo.address}</p>
          </div>
        </div>

        <Separator />

        {/* Invoice table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                {["Issue Date", "Invoice No.", "Due Date", "Due Amount", "Payment Value"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {RECEIPT.invoices.map((inv, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3.5 tabular-nums text-muted-foreground whitespace-nowrap">{inv.issueDate}</td>
                  <td className="px-4 py-3.5 font-medium">{inv.invoiceNo}</td>
                  <td className="px-4 py-3.5 tabular-nums text-muted-foreground whitespace-nowrap">{inv.dueDate}</td>
                  <td className="px-4 py-3.5 tabular-nums">${inv.dueAmount.toLocaleString()}</td>
                  <td className="px-4 py-3.5 tabular-nums">${inv.paymentValue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end px-6 py-4">
          <div className="w-72 rounded-lg bg-muted/50 p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Payment Amount :</span>
              <span className="tabular-nums font-medium">${RECEIPT.totalPayment.toLocaleString()}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-sm font-semibold">
              <span>Total Due Amount :</span>
              <span className="tabular-nums text-primary">${RECEIPT.totalDue.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Notes */}
        <div className="px-6 py-5 flex flex-wrap justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">Notes</p>
            <p className="text-sm text-muted-foreground max-w-md">{RECEIPT.notes}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">Have Question?</p>
            <p className="text-sm text-muted-foreground">{RECEIPT.supportEmail}</p>
          </div>
        </div>

      </CardContent>
    </Card>
  </div>
)

export default PaymentDetailsPage

"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

// ─── Mock data ────────────────────────────────────────────────────────────────

const CLIENTS = [
  { id: "1", name: "Sophia Hale"   },
  { id: "2", name: "Marcus Webb"   },
  { id: "3", name: "Elena Vasquez" },
  { id: "4", name: "David Okafor"  },
]

const UNPAID_INVOICES = [
  { issueDate: "7/15/2022",  invoiceNo: "#8795646525452", dueDate: "2/15/2022",  dueAmount: 2030, paymentValue: 2030 },
  { issueDate: "05/01/2022", invoiceNo: "#8795646525451", dueDate: "06/02/2022", dueAmount: 1000, paymentValue: 1000 },
  { issueDate: "7/6/2022",   invoiceNo: "#8795646525453", dueDate: "7/8/2022",   dueAmount: 3000, paymentValue: 3000 },
  { issueDate: "5/5/2022",   invoiceNo: "#8795646525455", dueDate: "7/11/2022",  dueAmount: 3000, paymentValue: 3000 },
  { issueDate: "2/8/2022",   invoiceNo: "#8795646525454", dueDate: "3/30/2022",  dueAmount: 2000, paymentValue: 1623 },
]

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"]

// ─── Page ─────────────────────────────────────────────────────────────────────

const PaymentCreatePage = () => {
  const [selectedClient, setSelectedClient] = useState("")
  const [note, setNote] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/invoice/payment"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Create Payment</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Add a new payment receipt.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Payment Received</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Client selector */}
          <div className="flex items-center gap-3 rounded-lg bg-muted/40 border px-4 py-3">
            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger className="w-52">
                <SelectValue placeholder="Select Client" />
              </SelectTrigger>
              <SelectContent>
                {CLIENTS.map(c => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="link" className="text-primary gap-1 p-0 h-auto" asChild>
              <Link href="/invoice/client/create">+ New Client</Link>
            </Button>
          </div>

          {/* Form fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="receiptId">Payment Receipt ID</Label>
              <Input id="receiptId" placeholder="Payment Receipt ID" className="mt-1.5" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="method">Payment Method</Label>
                <Select>
                  <SelectTrigger id="method" className="mt-1.5">
                    <SelectValue placeholder="Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Cash", "Bank Transfer", "PayPal", "Credit Card", "UPI"].map(m => (
                      <SelectItem key={m} value={m.toLowerCase().replace(/ /g, "-")}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="amount">Received Amount</Label>
                <Input id="amount" type="number" placeholder="Received Amount" className="mt-1.5" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reference">Reference</Label>
                <Input id="reference" placeholder="Reference" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="createDate">Create Date</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="createDate"
                    type="date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    className="pr-10"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Unpaid Invoice */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">Unpaid Invoice</h3>
              <Select>
                <SelectTrigger className="w-36 h-8 text-xs">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map(m => (
                    <SelectItem key={m} value={m.toLowerCase()} className="text-xs">{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/40">
                    {["Issue Date", "Invoice No.", "Due Date", "Due Amount", "Payment Value"].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {selectedClient ? UNPAID_INVOICES.map((inv, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 tabular-nums text-muted-foreground whitespace-nowrap">{inv.issueDate}</td>
                      <td className="px-4 py-3 font-medium">{inv.invoiceNo}</td>
                      <td className="px-4 py-3 tabular-nums text-muted-foreground whitespace-nowrap">{inv.dueDate}</td>
                      <td className="px-4 py-3 tabular-nums">${inv.dueAmount.toLocaleString()}</td>
                      <td className="px-4 py-3 tabular-nums">${inv.paymentValue.toLocaleString()}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground">
                        No Invoice / Select Client
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <Separator />

          {/* Notes */}
          <div>
            <Label htmlFor="note">Note</Label>
            <Textarea
              id="note"
              placeholder="Add Note"
              className="mt-1.5 min-h-24"
              value={note}
              onChange={e => setNote(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" asChild>
              <Link href="/invoice/payment">Cancel</Link>
            </Button>
            <Button variant="outline">Save</Button>
            <Button asChild>
              <Link href="/invoice/payment/details">Save &amp; View Receipt</Link>
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}

export default PaymentCreatePage

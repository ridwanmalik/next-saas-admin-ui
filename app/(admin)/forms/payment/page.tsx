"use client"

import { Check, CreditCard, Lock, Package, ShieldCheck, Truck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

function Variant({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <h3 className="text-sm font-semibold">{label}</h3>
        <div className="h-px flex-1 bg-border" />
      </div>
      {children}
    </section>
  )
}

const ORDER_ITEMS = [
  { name: "Pro Plan · Monthly", qty: 1, price: "$29.00" },
  { name: "Team seats (×5)", qty: 5, price: "$45.00" },
]

export default function PaymentFormsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-14">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Payment Forms</h2>
        <p className="text-muted-foreground">Checkout layouts — simple card payment, full checkout, and subscription upgrade.</p>
      </div>

      {/* ── Variant 1: Simple Card Payment ───────────────────────────────── */}
      <Variant label="Simple Card Payment">
        <Card className="mx-auto max-w-md shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Payment details</CardTitle>
                <CardDescription>Enter your card information to complete your purchase.</CardDescription>
              </div>
              <div className="flex gap-1">
                {["VISA", "MC", "AMEX"].map((b) => (
                  <div key={b} className="flex h-6 items-center justify-center rounded border px-1.5 text-[9px] font-bold text-muted-foreground">{b}</div>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sc-num">Card number</Label>
              <div className="relative">
                <Input id="sc-num" placeholder="4242 4242 4242 4242" className="pr-10" maxLength={19} />
                <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sc-name">Name on card</Label>
              <Input id="sc-name" placeholder="Jane Doe" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="sc-exp">Expiry date</Label>
                <Input id="sc-exp" placeholder="MM / YY" maxLength={7} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sc-cvc">Security code</Label>
                <Input id="sc-cvc" placeholder="CVC" maxLength={4} />
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
              <Lock className="size-3.5 shrink-0" />
              Your payment info is encrypted and stored securely.
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-3 border-t pt-6">
            <div className="flex w-full items-center justify-between text-sm">
              <span className="text-muted-foreground">Total due today</span>
              <span className="font-semibold">$74.00</span>
            </div>
            <Button className="w-full"><Lock className="size-4" />Pay $74.00</Button>
          </CardFooter>
        </Card>
      </Variant>

      {/* ── Variant 2: Full Checkout ──────────────────────────────────────── */}
      <Variant label="Full Checkout">
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Left: order summary */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Order summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {ORDER_ITEMS.map((item) => (
                  <div key={item.name} className="flex items-start justify-between text-sm">
                    <div>
                      <p className="font-medium">{item.name}</p>
                    </div>
                    <span className="font-medium tabular-nums">{item.price}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>$74.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span>$5.92</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>$79.92</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2 text-xs text-muted-foreground">
              {[
                { icon: ShieldCheck, text: "256-bit SSL encryption" },
                { icon: Truck, text: "Instant delivery to your email" },
                { icon: Package, text: "30-day money-back guarantee" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="size-3.5 shrink-0 text-green-600" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Right: checkout form */}
          <div className="lg:col-span-3 space-y-4">
            {/* Contact */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="fc-email">Email</Label>
                  <Input id="fc-email" type="email" placeholder="jane@example.com" />
                </div>
              </CardContent>
            </Card>

            {/* Billing address */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Billing address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="ba-fn">First name</Label>
                    <Input id="ba-fn" placeholder="Jane" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ba-ln">Last name</Label>
                    <Input id="ba-ln" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ba-addr">Address</Label>
                  <Input id="ba-addr" placeholder="123 Market Street" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2 col-span-1">
                    <Label htmlFor="ba-city">City</Label>
                    <Input id="ba-city" placeholder="San Francisco" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ba-state">State</Label>
                    <Input id="ba-state" placeholder="CA" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ba-zip">ZIP</Label>
                    <Input id="ba-zip" placeholder="94105" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ba-country">Country</Label>
                  <NativeSelect id="ba-country">
                    <NativeSelectOption>United States</NativeSelectOption>
                    <NativeSelectOption>United Kingdom</NativeSelectOption>
                    <NativeSelectOption>Canada</NativeSelectOption>
                    <NativeSelectOption>Australia</NativeSelectOption>
                  </NativeSelect>
                </div>
              </CardContent>
            </Card>

            {/* Payment method */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Payment method</CardTitle>
                  <div className="flex gap-1">
                    {["VISA", "MC"].map((b) => (
                      <div key={b} className="flex h-5 items-center justify-center rounded border px-1 text-[8px] font-bold text-muted-foreground">{b}</div>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="pm-num">Card number</Label>
                  <div className="relative">
                    <Input id="pm-num" placeholder="4242 4242 4242 4242" className="pr-10" />
                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="pm-exp">Expiry</Label>
                    <Input id="pm-exp" placeholder="MM / YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pm-cvc">CVC</Label>
                    <Input id="pm-cvc" placeholder="•••" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button className="w-full"><Lock className="size-4" />Pay $79.92</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </Variant>

      {/* ── Variant 3: Subscription Upgrade ──────────────────────────────── */}
      <Variant label="Subscription Upgrade">
        <Card className="mx-auto max-w-md shadow-sm overflow-hidden">
          {/* Plan header */}
          <div className="bg-gradient-to-r from-violet-600 to-primary p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <Badge className="bg-white/20 text-white hover:bg-white/30 mb-2">Most popular</Badge>
                <h3 className="text-xl font-bold">Pro Plan</h3>
                <p className="text-white/70 text-sm mt-0.5">Everything you need to scale.</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">$29</p>
                <p className="text-sm text-white/70">/ month</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5">
              {["Unlimited projects", "10 team members", "Advanced analytics", "Priority support", "Custom domains", "API access"].map((f) => (
                <div key={f} className="flex items-center gap-1.5 text-xs text-white/80">
                  <Check className="size-3 shrink-0 text-white" />{f}
                </div>
              ))}
            </div>
          </div>

          {/* Billing toggle + payment */}
          <CardContent className="space-y-4 pt-5">
            <div className="space-y-2">
              <Label>Billing cycle</Label>
              <RadioGroup defaultValue="monthly" className="grid grid-cols-2 gap-2">
                {[
                  { value: "monthly", label: "Monthly", price: "$29/mo" },
                  { value: "annual", label: "Annual", price: "$22/mo", badge: "Save 24%" },
                ].map(({ value, label, price, badge }) => (
                  <div key={value} className="relative">
                    <RadioGroupItem value={value} id={`rc-${value}`} className="peer sr-only" />
                    <Label
                      htmlFor={`rc-${value}`}
                      className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-muted p-3 text-center peer-data-[state=checked]:border-primary hover:border-muted-foreground/30 transition-colors"
                    >
                      <span className="text-sm font-medium">{label}</span>
                      <span className="text-xs text-muted-foreground">{price}</span>
                      {badge && <span className="mt-1 rounded-full bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 px-2 py-0.5 text-[10px] font-medium">{badge}</span>}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="su-num">Card number</Label>
              <div className="relative">
                <Input id="su-num" placeholder="4242 4242 4242 4242" className="pr-10" />
                <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="su-exp">Expiry</Label>
                <Input id="su-exp" placeholder="MM / YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="su-cvc">CVC</Label>
                <Input id="su-cvc" placeholder="•••" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2 border-t pt-4">
            <Button className="w-full bg-gradient-to-r from-violet-600 to-primary hover:opacity-90 transition-opacity">
              Upgrade to Pro
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              <Lock className="inline size-3 mr-1" />Secured by Stripe · Cancel anytime
            </p>
          </CardFooter>
        </Card>
      </Variant>
    </div>
  )
}

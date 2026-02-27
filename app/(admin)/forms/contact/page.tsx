"use client"

import { Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Textarea } from "@/components/ui/textarea"

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

export default function ContactFormsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-14">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Contact Forms</h2>
        <p className="text-muted-foreground">Contact layouts — simple card, split with info panel, gradient hero, and newsletter.</p>
      </div>

      {/* ── Variant 1: Simple Card ───────────────────────────────────────── */}
      <Variant label="Simple">
        <Card className="mx-auto max-w-lg shadow-sm">
          <CardHeader>
            <CardTitle>Get in touch</CardTitle>
            <CardDescription>Fill out the form and we&apos;ll get back to you within 24 hours.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="sc-name">Name</Label>
                <Input id="sc-name" placeholder="Jane Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sc-email">Email</Label>
                <Input id="sc-email" type="email" placeholder="jane@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sc-subject">Subject</Label>
              <NativeSelect id="sc-subject">
                <NativeSelectOption value="">Select a topic...</NativeSelectOption>
                <NativeSelectOption value="general">General enquiry</NativeSelectOption>
                <NativeSelectOption value="support">Technical support</NativeSelectOption>
                <NativeSelectOption value="billing">Billing question</NativeSelectOption>
                <NativeSelectOption value="partnership">Partnership</NativeSelectOption>
              </NativeSelect>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sc-msg">Message</Label>
              <Textarea id="sc-msg" placeholder="Tell us how we can help..." rows={4} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full sm:w-auto"><Send className="size-4" />Send message</Button>
          </CardFooter>
        </Card>
      </Variant>

      {/* ── Variant 2: Split with Info Panel ─────────────────────────────── */}
      <Variant label="With Info Panel">
        <div className="overflow-hidden rounded-xl border shadow-sm md:grid md:grid-cols-5">
          {/* Left: contact info */}
          <div className="bg-primary p-8 text-primary-foreground md:col-span-2 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold">Contact us</h3>
                <p className="mt-1 text-sm text-primary-foreground/70">
                  We&apos;re here to help. Reach out through any channel.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: "hello@nextsaas.com" },
                  { icon: Phone, label: "Phone", value: "+1 (555) 000-0000" },
                  { icon: MapPin, label: "Office", value: "123 Market St, SF CA 94105" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-foreground/10">
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs text-primary-foreground/60">{label}</p>
                      <p className="text-sm font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              {["𝕏", "in", "gh"].map((s) => (
                <div key={s} className="flex size-8 items-center justify-center rounded-full bg-primary-foreground/10 text-xs font-bold cursor-pointer hover:bg-primary-foreground/20 transition-colors">
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="p-8 bg-card md:col-span-3 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="ip-fn">First name</Label>
                <Input id="ip-fn" placeholder="Jane" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ip-ln">Last name</Label>
                <Input id="ip-ln" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ip-email">Email</Label>
              <Input id="ip-email" type="email" placeholder="jane@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ip-phone">Phone <span className="text-muted-foreground">(optional)</span></Label>
              <Input id="ip-phone" type="tel" placeholder="+1 (555) 000-0000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ip-msg">Message</Label>
              <Textarea id="ip-msg" placeholder="How can we help you?" rows={4} />
            </div>
            <Button className="w-full"><Send className="size-4" />Send message</Button>
          </div>
        </div>
      </Variant>

      {/* ── Variant 3: Gradient Hero + Floating Card ─────────────────────── */}
      <Variant label="Gradient Hero">
        <div className="overflow-hidden rounded-xl border shadow-sm">
          {/* Hero banner */}
          <div className="relative bg-gradient-to-br from-violet-600 via-primary to-blue-600 px-8 py-12 text-center text-white overflow-hidden">
            <div className="pointer-events-none absolute inset-0 opacity-20"
              style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }}
            />
            <MessageSquare className="mx-auto mb-3 size-10 text-white/80" />
            <h3 className="text-2xl font-bold">We&apos;d love to hear from you</h3>
            <p className="mt-1 text-white/70">Share your thoughts, questions, or feedback.</p>
          </div>

          {/* Form card */}
          <div className="bg-card p-8 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="gh-name">Your name</Label>
                <Input id="gh-name" placeholder="Jane Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gh-email">Email</Label>
                <Input id="gh-email" type="email" placeholder="jane@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gh-msg">Message</Label>
              <Textarea id="gh-msg" placeholder="Your message..." rows={4} />
            </div>
            <Button className="w-full bg-gradient-to-r from-violet-600 to-primary hover:opacity-90 transition-opacity">
              <Send className="size-4" />Send message
            </Button>
          </div>
        </div>
      </Variant>

      {/* ── Variant 4: Newsletter / Minimal ──────────────────────────────── */}
      <Variant label="Newsletter / Inline">
        <div className="overflow-hidden rounded-xl border bg-muted/40">
          <div className="p-8 text-center space-y-4">
            <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-primary/10">
              <Mail className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Stay in the loop</h3>
              <p className="text-sm text-muted-foreground mt-1">Get product updates, tips, and resources straight to your inbox.</p>
            </div>
            <div className="mx-auto flex max-w-sm gap-2">
              <Input type="email" placeholder="Enter your email..." className="flex-1 bg-background" />
              <Button>Subscribe</Button>
            </div>
            <p className="text-xs text-muted-foreground">No spam. Unsubscribe at any time.</p>
          </div>
        </div>
      </Variant>
    </div>
  )
}

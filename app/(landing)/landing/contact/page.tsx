"use client"

import { useState } from "react"
import { Mail, MapPin, Phone, Clock, MessageSquare, Building2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

const CONTACT_ITEMS = [
  { icon: Mail,     label: "Email",   value: "hello@nextsaas.com",       sub: "We reply within 4 hours"    },
  { icon: Phone,    label: "Phone",   value: "+1 (555) 000-1234",        sub: "Mon–Fri, 9am–6pm PT"        },
  { icon: MapPin,   label: "Office",  value: "340 Pine St, San Francisco", sub: "CA 94104, United States"  },
  { icon: Clock,    label: "Hours",   value: "Monday – Friday",          sub: "9:00 AM – 6:00 PM PT"      },
]

const SUBJECTS = ["General inquiry", "Sales & pricing", "Technical support", "Partnership", "Press & media", "Other"]

const LandingContactPage = () => {
  const [submitted, setSubmitted] = useState(false)
  const [subject, setSubject] = useState("")

  if (submitted) {
    return (
      <div className="mx-auto w-full max-w-md py-24 text-center space-y-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 mx-auto">
          <CheckCircle2 className="h-7 w-7 text-emerald-500" />
        </div>
        <h2 className="text-xl font-semibold">Message sent!</h2>
        <p className="text-muted-foreground text-sm">Thanks for reaching out. We'll get back to you within 4 hours.</p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>Send another message</Button>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-12 pb-16">

      {/* Header */}
      <section className="pt-10 space-y-3">
        <Badge variant="secondary" className="rounded-full px-4 py-1 text-xs">Contact us</Badge>
        <h1 className="text-4xl font-bold tracking-tight">Get in touch</h1>
        <p className="text-muted-foreground max-w-md">
          Have a question or just want to say hello? We&apos;d love to hear from you.
          Our team typically responds within 4 hours.
        </p>
      </section>

      <div className="grid gap-10 lg:grid-cols-5">

        {/* Contact info */}
        <div className="lg:col-span-2 space-y-4">
          {CONTACT_ITEMS.map(({ icon: Icon, label, value, sub }) => (
            <div key={label} className="flex gap-4 rounded-xl border bg-card p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium">{value}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            </div>
          ))}

          <div className="rounded-xl border bg-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Live chat</span>
            </div>
            <p className="text-xs text-muted-foreground">Start a live chat with our support team directly from your dashboard.</p>
            <Button variant="outline" size="sm" className="w-full">Open live chat</Button>
          </div>

          <div className="rounded-xl border bg-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Enterprise sales</span>
            </div>
            <p className="text-xs text-muted-foreground">Need a custom plan or dedicated support? Talk to our enterprise team.</p>
            <Button variant="outline" size="sm" className="w-full">Book a call</Button>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-3 rounded-2xl border bg-card p-6 space-y-5">
          <h2 className="font-semibold">Send a message</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>First name</Label>
              <Input placeholder="John" />
            </div>
            <div className="space-y-1.5">
              <Label>Last name</Label>
              <Input placeholder="Doe" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input type="email" placeholder="john@example.com" />
          </div>

          <div className="space-y-1.5">
            <Label>Company (optional)</Label>
            <Input placeholder="Acme Inc." />
          </div>

          <div className="space-y-1.5">
            <Label>Subject</Label>
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSubject(s)}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    subject === s
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent text-muted-foreground hover:border-foreground/30"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Message</Label>
            <Textarea placeholder="Tell us how we can help…" rows={5} className="resize-none" />
          </div>

          <Button className="w-full" onClick={() => setSubmitted(true)}>Send message</Button>
        </div>

      </div>
    </div>
  )
}

export default LandingContactPage

"use client"

import { ScrollText } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using our service, you agree to be bound by these Terms and Conditions. If you do not agree to all the terms and conditions of this agreement, you may not access the website or use any services.",
  },
  {
    title: "2. Use of Service",
    body: "You agree to use the service only for lawful purposes and in a way that does not infringe the rights of others. You must not misuse our service by knowingly introducing viruses or other malicious content.",
  },
  {
    title: "3. Intellectual Property",
    body: "The service and its original content, features, and functionality are and will remain the exclusive property of the company and its licensors. Our trademarks and trade dress may not be used without prior written consent.",
  },
  {
    title: "4. Limitation of Liability",
    body: "In no event shall the company, its directors, employees, or agents be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the service.",
  },
  {
    title: "5. Changes to Terms",
    body: "We reserve the right to modify or replace these terms at any time. Your continued use of the service after any changes constitutes acceptance of the new terms. We will provide notice of any significant changes.",
  },
  {
    title: "6. Contact",
    body: "If you have any questions about these Terms, please contact us at legal@example.com.",
  },
]

const LandingTermsPage = () => {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-10 py-16">

      {/* Header */}
      <div className="space-y-4 text-center">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border bg-card">
            <ScrollText className="h-7 w-7 text-muted-foreground" />
          </div>
        </div>
        <Badge variant="outline" className="rounded-full px-4 py-1 text-xs">
          Legal
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight">Terms &amp; Conditions</h1>
        <p className="text-muted-foreground">
          Please read these terms carefully before using our service.
        </p>
        <p className="text-xs text-muted-foreground">Last updated: March 20, 2026</p>
      </div>

      {/* Sections */}
      <div className="rounded-xl border bg-card divide-y">
        {SECTIONS.map(({ title, body }) => (
          <div key={title} className="px-6 py-5 space-y-1.5">
            <h2 className="text-sm font-semibold">{title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default LandingTermsPage

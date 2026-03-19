"use client"

import { ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const SECTIONS = [
  {
    title: "1. Information We Collect",
    body: "We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include your name, email address, payment information, and any other information you choose to provide.",
  },
  {
    title: "2. How We Use Your Information",
    body: "We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and respond to your comments and questions.",
  },
  {
    title: "3. Information Sharing",
    body: "We do not share your personal information with third parties except as described in this policy. We may share your information with vendors and service providers who perform services on our behalf, such as payment processing and data analytics.",
  },
  {
    title: "4. Data Retention",
    body: "We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law.",
  },
  {
    title: "5. Cookies",
    body: "We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.",
  },
  {
    title: "6. Your Rights",
    body: "You have the right to access, update, or delete your personal information at any time. You may also have the right to data portability and to object to or restrict certain processing of your data, depending on your jurisdiction.",
  },
  {
    title: "7. Contact",
    body: "If you have any questions about this Privacy Policy, please contact us at privacy@example.com.",
  },
]

const LandingPrivacyPage = () => {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-10 py-16">

      {/* Header */}
      <div className="space-y-4 text-center">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border bg-card">
            <ShieldCheck className="h-7 w-7 text-muted-foreground" />
          </div>
        </div>
        <Badge variant="outline" className="rounded-full px-4 py-1 text-xs">
          Legal
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-muted-foreground">
          Your privacy matters to us. Here&apos;s how we handle your data.
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

export default LandingPrivacyPage

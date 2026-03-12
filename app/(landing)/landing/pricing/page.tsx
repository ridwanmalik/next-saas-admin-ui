import { Check, Minus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PlanCards } from "@/components/shared/plan-cards"

const COMPARISON = [
  { feature: "Users",             starter: "3",      pro: "Unlimited", enterprise: "Unlimited" },
  { feature: "Projects",          starter: "5",      pro: "Unlimited", enterprise: "Unlimited" },
  { feature: "Storage",           starter: "1 GB",   pro: "50 GB",     enterprise: "Custom"    },
  { feature: "API calls / mo",    starter: "10K",    pro: "100K",      enterprise: "Unlimited" },
  { feature: "API access",        starter: false,    pro: true,        enterprise: true        },
  { feature: "Custom domains",    starter: false,    pro: true,        enterprise: true        },
  { feature: "Advanced analytics",starter: false,    pro: true,        enterprise: true        },
  { feature: "Priority support",  starter: false,    pro: true,        enterprise: true        },
  { feature: "SSO / SAML",        starter: false,    pro: false,       enterprise: true        },
  { feature: "Audit logs",        starter: false,    pro: false,       enterprise: true        },
  { feature: "SLA guarantee",     starter: false,    pro: false,       enterprise: true        },
  { feature: "Dedicated CSM",     starter: false,    pro: false,       enterprise: true        },
]

const Cell = ({ value }: { value: string | boolean }) => {
  if (value === true)  return <Check className="h-4 w-4 text-emerald-500 mx-auto" />
  if (value === false) return <Minus className="h-4 w-4 text-muted-foreground/30 mx-auto" />
  return <span className="text-sm text-muted-foreground">{value}</span>
}

const FAQ = [
  {
    q: "Can I change plans later?",
    a: "Yes, you can upgrade or downgrade at any time. Changes take effect immediately and we'll prorate any difference on your next invoice.",
  },
  {
    q: "Is there a free trial on paid plans?",
    a: "Every paid plan includes a 14-day free trial. No credit card required to start — you'll only be charged if you decide to continue after the trial.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, and bank transfers for annual enterprise contracts.",
  },
  {
    q: "Can I cancel at any time?",
    a: "Absolutely. There are no long-term contracts or cancellation fees. Cancel from your account settings and your plan remains active until the end of the billing period.",
  },
  {
    q: "Do you offer discounts for non-profits or education?",
    a: "Yes — we offer 50% off for eligible non-profit organisations and educational institutions. Contact our support team with proof of status to apply.",
  },
  {
    q: "What happens to my data if I downgrade?",
    a: "Your data is always safe. If you exceed the limits of your new plan (e.g. storage or seats), you'll have 30 days to make adjustments before anything is restricted.",
  },
  {
    q: "Is there a limit on API calls?",
    a: "Each plan has a monthly API call limit. If you exceed your limit, requests are rate-limited rather than blocked. You can upgrade your plan or purchase add-on credits at any time.",
  },
  {
    q: "Do you offer enterprise contracts and custom SLAs?",
    a: "Yes. Our Enterprise plan includes custom contracts, dedicated SLAs, and a named Customer Success Manager. Contact our sales team to discuss your requirements.",
  },
]

const LandingPricingPage = () => (
  <div className="mx-auto w-full max-w-5xl space-y-8 pb-16">

    {/* Header */}
    <section className="pt-6 text-center space-y-3">
      <Badge variant="secondary" className="rounded-full px-4 py-1 text-xs">Simple pricing</Badge>
      <h1 className="text-4xl font-bold tracking-tight">Pay for what you use</h1>
      <p className="mx-auto max-w-md text-muted-foreground">
        No hidden fees. No surprises. Start free and scale as you grow.
        Cancel or change plans at any time.
      </p>
    </section>

    {/* Shared plan cards */}
    <PlanCards />

    {/* Comparison table */}
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Compare plans</h2>
      <div className="rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Feature</th>
              <th className="px-4 py-3 font-semibold text-center">Starter</th>
              <th className="px-4 py-3 font-semibold text-center">Pro</th>
              <th className="px-4 py-3 font-semibold text-center">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map(({ feature, starter, pro, enterprise }, i) => (
              <tr key={feature} className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                <td className="px-4 py-3 text-muted-foreground">{feature}</td>
                <td className="px-4 py-3 text-center"><Cell value={starter} /></td>
                <td className="px-4 py-3 text-center"><Cell value={pro} /></td>
                <td className="px-4 py-3 text-center"><Cell value={enterprise} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    {/* FAQ */}
    <section className="space-y-5 max-w-2xl mx-auto pt-4">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-semibold">Frequently asked questions</h2>
        <p className="text-sm text-muted-foreground">Everything you need to know about our pricing.</p>
      </div>
      <Accordion type="single" collapsible className="rounded-xl border bg-card divide-y overflow-hidden">
        {FAQ.map(({ q, a }, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-0 px-5">
            <AccordionTrigger className="text-sm font-medium text-left hover:no-underline py-4">
              {q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
              {a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>

  </div>
)

export default LandingPricingPage

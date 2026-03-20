import Link from "next/link"
import { Check, Minus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PlanCards } from "@/components/shared/plan-cards"
import { FAQ_CATEGORIES } from "@/lib/faq-data"

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
    <section className="space-y-8 pt-4">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-semibold">Frequently asked questions</h2>
        <p className="text-sm text-muted-foreground">Everything you need to know about our plans and product.</p>
      </div>

      {FAQ_CATEGORIES.map(({ id, label, icon: Icon, items }) => (
        <div key={id} className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-3.5 w-3.5" />
            </div>
            <h3 className="text-base font-semibold">{label}</h3>
          </div>
          <Accordion type="single" collapsible className="rounded-xl border bg-card divide-y overflow-hidden">
            {items.map(({ q, a }, i) => (
              <AccordionItem key={i} value={`${id}-${i}`} className="border-0 px-5">
                <AccordionTrigger className="text-sm font-medium text-left hover:no-underline py-4">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}

      <div className="text-center pt-2">
        <Button asChild variant="outline" size="sm">
          <Link href="/landing/contact">Still have questions? Contact support →</Link>
        </Button>
      </div>
    </section>

  </div>
)

export default LandingPricingPage

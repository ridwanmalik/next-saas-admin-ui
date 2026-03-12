"use client"

import { useState } from "react"
import { Check, Minus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// ─── Data ──────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "individual", label: "Individual"       },
  { id: "team",       label: "Team & Enterprise" },
] as const

type TabId = (typeof TABS)[number]["id"]

interface Plan {
  name: string
  badge?: string
  monthlyPrice: number | null
  yearlyPrice: number | null
  description: string
  features: { text: string; included: boolean }[]
  cta: string
  current: boolean
}

const PLANS: Record<TabId, Plan[]> = {
  individual: [
    {
      name: "Free",
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: "For individuals and side projects just getting started.",
      features: [
        { text: "3 projects",            included: true  },
        { text: "1 GB storage",          included: true  },
        { text: "10K API calls / mo",    included: true  },
        { text: "Community support",     included: true  },
        { text: "Advanced analytics",    included: false },
        { text: "Custom domains",        included: false },
        { text: "API access",            included: false },
      ],
      cta: "Get started free",
      popular: false,
      current: false,
    },
    {
      name: "Pro",
      badge: "Most popular",
      monthlyPrice: 29,
      yearlyPrice: 23,
      description: "For power users who need more speed and flexibility.",
      features: [
        { text: "Unlimited projects",    included: true  },
        { text: "20 GB storage",         included: true  },
        { text: "100K API calls / mo",   included: true  },
        { text: "Priority support",      included: true  },
        { text: "Advanced analytics",    included: true  },
        { text: "Custom domains",        included: true  },
        { text: "API access",            included: false },
      ],
      cta: "Current Plan",
      current: true,
    },
    {
      name: "Max",
      monthlyPrice: 79,
      yearlyPrice: 63,
      description: "For professionals who need the full power of the platform.",
      features: [
        { text: "Unlimited projects",    included: true  },
        { text: "100 GB storage",        included: true  },
        { text: "1M API calls / mo",     included: true  },
        { text: "Dedicated support",     included: true  },
        { text: "Advanced analytics",    included: true  },
        { text: "Custom domains",        included: true  },
        { text: "API access",            included: true  },
      ],
      cta: "Upgrade to Max",
      current: false,
    },
  ],
  team: [
    {
      name: "Team",
      monthlyPrice: 49,
      yearlyPrice: 39,
      description: "For small teams collaborating and shipping products together.",
      features: [
        { text: "Up to 10 seats",        included: true  },
        { text: "50 GB storage",         included: true  },
        { text: "500K API calls / mo",   included: true  },
        { text: "Priority support",      included: true  },
        { text: "Advanced analytics",    included: true  },
        { text: "Custom domains",        included: true  },
        { text: "SSO & SAML",            included: false },
        { text: "Audit logs",            included: false },
      ],
      cta: "Start team trial",
      current: false,
    },
    {
      name: "Business",
      badge: "Best value",
      monthlyPrice: 99,
      yearlyPrice: 79,
      description: "For growing teams that need full control and advanced security.",
      features: [
        { text: "Up to 50 seats",        included: true  },
        { text: "200 GB storage",        included: true  },
        { text: "2M API calls / mo",     included: true  },
        { text: "Dedicated support",     included: true  },
        { text: "Advanced analytics",    included: true  },
        { text: "Custom domains",        included: true  },
        { text: "SSO & SAML",            included: true  },
        { text: "Audit logs",            included: true  },
      ],
      cta: "Start business trial",
      current: false,
    },
    {
      name: "Enterprise",
      monthlyPrice: null,
      yearlyPrice: null,
      description: "Tailored for large-scale organisations with custom needs.",
      features: [
        { text: "Unlimited seats",       included: true  },
        { text: "Unlimited storage",     included: true  },
        { text: "Unlimited API calls",   included: true  },
        { text: "24/7 dedicated support",included: true  },
        { text: "Custom contracts & SLA",included: true  },
        { text: "On-premise deployment", included: true  },
        { text: "SSO & SAML",            included: true  },
        { text: "Audit logs",            included: true  },
      ],
      cta: "Contact Sales",
      current: false,
    },
  ],
}

// ─── Component ─────────────────────────────────────────────────────────────────

export const PlanCards = () => {
  const [activeTab, setActiveTab] = useState<TabId>("individual")

  const plans = PLANS[activeTab]

  return (
    <div className="space-y-10">

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-xl border bg-muted/40 p-1 gap-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "rounded-lg px-5 py-2 text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Plan cards */}
      <div className={cn(
        "grid gap-6 mx-auto",
        activeTab === "individual" ? "max-w-5xl sm:grid-cols-3" : "max-w-5xl sm:grid-cols-3",
      )}>
        {plans.map(plan => (
          <div
            key={plan.name}
            className="relative flex flex-col rounded-2xl border p-6 transition-shadow bg-card hover:shadow-md"
          >
            {/* Name & badge */}
            <div className="flex items-center gap-2.5 mb-2">
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              {plan.badge && (
                <Badge className="px-2.5 py-0.5 text-[11px] shadow-sm">{plan.badge}</Badge>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-5">{plan.description}</p>

            {/* Price */}
            <div className="mb-6 min-h-16">
              {plan.monthlyPrice === null ? (
                <>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold">Custom</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Tailored to your organisation</p>
                </>
              ) : plan.monthlyPrice === 0 ? (
                <>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold">Free</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">No credit card required</p>
                </>
              ) : (
                <>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold">${plan.monthlyPrice}</span>
                    <span className="text-sm text-muted-foreground mb-1.5">/mo</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    or{" "}
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                      ${plan.yearlyPrice}/mo
                    </span>
                    {" "}· save 20% billed yearly
                  </p>
                </>
              )}
            </div>

            {/* CTA */}
            <Button
              variant="outline"
              className="w-full mb-6"
              disabled={plan.current}
            >
              {plan.cta}
            </Button>

            <div className="border-t mb-5" />

            {/* Features */}
            <ul className="space-y-3 flex-1">
              {plan.features.map(f => (
                <li key={f.text} className={cn("flex items-center gap-2.5 text-sm", !f.included && "opacity-40")}>
                  {f.included
                    ? <Check className="h-4 w-4 text-primary shrink-0" />
                    : <Minus className="h-4 w-4 shrink-0" />
                  }
                  {f.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </div>
  )
}

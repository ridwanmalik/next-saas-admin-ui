"use client"

import { Fragment, useState, type ReactNode } from "react"
import { Check, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

// ─── Static data ───────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, title: "Account",   desc: "Create your account to get started." },
  { id: 2, title: "Workspace", desc: "Set up your workspace for your team." },
  { id: 3, title: "Plan",      desc: "Choose the plan that fits your needs." },
  { id: 4, title: "Review",    desc: "Review your details before launching." },
]

const SETUP_STEPS = [
  { id: 1, title: "Basic info",    desc: "Name and email" },
  { id: 2, title: "Preferences",   desc: "Language & timezone" },
  { id: 3, title: "Integrations",  desc: "Connect your tools" },
  { id: 4, title: "Done",          desc: "All set!" },
]

const PLANS = [
  { value: "free",       label: "Free",       price: "$0/mo",   desc: "Up to 3 projects, 1 seat" },
  { value: "pro",        label: "Pro",        price: "$29/mo",  desc: "Unlimited projects, 10 seats", popular: true },
  { value: "enterprise", label: "Enterprise", price: "Custom",  desc: "SSO, audit logs, SLA" },
]

const REVIEW_ROWS = [
  { label: "Name",      value: "Jane Doe" },
  { label: "Email",     value: "jane@acme.com" },
  { label: "Workspace", value: "acme.nextsaas.com" },
  { label: "Team size", value: "11–50 people" },
  { label: "Plan",      value: "Pro — $29/mo" },
]

const INTEGRATIONS = ["Slack", "GitHub", "Jira", "Figma"]

// ─── Step Indicator ───────────────────────────────────────────────────────────
// Title is position:absolute so it never pushes the connector line out of
// alignment with the circles, regardless of text length.

const StepIndicator = ({ current, steps }: { current: number; steps: typeof STEPS }) => (
  <nav aria-label="Progress" className="flex w-full items-center pb-6">
    {steps.map((step, i) => (
      <Fragment key={step.id}>
        {i > 0 && (
          <div
            className={cn(
              "h-px flex-1 transition-colors",
              step.id <= current ? "bg-primary" : "bg-muted-foreground/20"
            )}
          />
        )}
        <div className="relative flex shrink-0 flex-col items-center">
          <div
            className={cn(
              "flex size-8 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors",
              step.id < current
                ? "border-primary bg-primary text-primary-foreground"
                : step.id === current
                ? "border-primary bg-background text-primary"
                : "border-muted-foreground/30 bg-background text-muted-foreground/50"
            )}
          >
            {step.id < current ? <Check className="size-4" /> : step.id}
          </div>
          <span
            className={cn(
              "absolute top-full mt-1.5 text-xs whitespace-nowrap",
              step.id === current ? "font-medium text-foreground" : "text-muted-foreground"
            )}
          >
            {step.title}
          </span>
        </div>
      </Fragment>
    ))}
  </nav>
)

// ─── Individual step forms ─────────────────────────────────────────────────────

const Step1 = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-2">
        <Label htmlFor="ms1-fn">First name</Label>
        <Input id="ms1-fn" placeholder="Jane" defaultValue="Jane" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="ms1-ln">Last name</Label>
        <Input id="ms1-ln" placeholder="Doe" defaultValue="Doe" />
      </div>
    </div>
    <div className="space-y-2">
      <Label htmlFor="ms1-email">Work email</Label>
      <Input id="ms1-email" type="email" placeholder="jane@company.com" defaultValue="jane@acme.com" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="ms1-pass">Password</Label>
      <Input id="ms1-pass" type="password" placeholder="Min. 8 characters" defaultValue="password123" />
    </div>
    <div className="flex items-start gap-2">
      <Checkbox id="ms1-terms" className="mt-0.5" defaultChecked />
      <Label htmlFor="ms1-terms" className="text-sm font-normal leading-snug">
        I agree to the{" "}
        <a href="#" className="underline underline-offset-4 hover:text-foreground">Terms</a>
        {" & "}
        <a href="#" className="underline underline-offset-4 hover:text-foreground">Privacy Policy</a>
      </Label>
    </div>
  </div>
)

const Step2 = () => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="ms2-org">Organisation name</Label>
      <Input id="ms2-org" placeholder="Acme Inc." defaultValue="Acme Inc." />
    </div>
    <div className="space-y-2">
      <Label htmlFor="ms2-slug">Workspace URL</Label>
      <div className="flex">
        <span className="flex items-center rounded-l-md border border-r-0 bg-muted px-3 text-sm text-muted-foreground">
          app.nextsaas.com/
        </span>
        <Input id="ms2-slug" placeholder="acme" defaultValue="acme" className="rounded-l-none" />
      </div>
      <p className="text-xs text-muted-foreground">Only letters, numbers and hyphens.</p>
    </div>
    <div className="space-y-2">
      <Label htmlFor="ms2-size">Team size</Label>
      <NativeSelect id="ms2-size" defaultValue="11-50">
        <NativeSelectOption value="1">Just me</NativeSelectOption>
        <NativeSelectOption value="2-10">2–10 people</NativeSelectOption>
        <NativeSelectOption value="11-50">11–50 people</NativeSelectOption>
        <NativeSelectOption value="51-200">51–200 people</NativeSelectOption>
        <NativeSelectOption value="200+">200+ people</NativeSelectOption>
      </NativeSelect>
    </div>
    <div className="space-y-2">
      <Label htmlFor="ms2-role">Your role</Label>
      <NativeSelect id="ms2-role" defaultValue="pm">
        <NativeSelectOption value="ceo">Founder / CEO</NativeSelectOption>
        <NativeSelectOption value="pm">Product Manager</NativeSelectOption>
        <NativeSelectOption value="eng">Engineer</NativeSelectOption>
        <NativeSelectOption value="design">Designer</NativeSelectOption>
        <NativeSelectOption value="other">Other</NativeSelectOption>
      </NativeSelect>
    </div>
  </div>
)

const Step3 = () => (
  <div className="space-y-3">
    <RadioGroup defaultValue="pro" className="space-y-2">
      {PLANS.map(({ value, label, price, desc, popular }) => (
        <div key={value} className="relative">
          <RadioGroupItem value={value} id={`plan-${value}`} className="peer sr-only" />
          <Label
            htmlFor={`plan-${value}`}
            className="flex cursor-pointer items-center justify-between rounded-lg border-2 border-muted p-4 transition-colors hover:border-muted-foreground/30 peer-data-[state=checked]:border-primary"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{label}</span>
                {popular && <Badge className="h-4 text-[10px]">Popular</Badge>}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
            </div>
            <span className="text-sm font-semibold tabular-nums">{price}</span>
          </Label>
        </div>
      ))}
    </RadioGroup>
    <p className="pt-1 text-xs text-muted-foreground">
      All plans include a 14-day free trial. No credit card required.
    </p>
  </div>
)

const Step4 = () => (
  <div className="space-y-4">
    <div className="divide-y rounded-lg border">
      {REVIEW_ROWS.map(({ label, value }) => (
        <div key={label} className="flex items-center justify-between px-4 py-2.5 text-sm">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-medium">{value}</span>
        </div>
      ))}
    </div>
    <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
      <Check className="size-4 shrink-0 text-green-600" />
      Free trial starts today — no charges for 14 days.
    </div>
  </div>
)

// ─── Card Wizard ───────────────────────────────────────────────────────────────

const Wizard = () => {
  const [step, setStep] = useState(1)
  const isFirst = step === 1
  const isLast = step === STEPS.length
  const currentStep = STEPS[step - 1]
  const stepContent = [<Step1 key={1} />, <Step2 key={2} />, <Step3 key={3} />, <Step4 key={4} />]

  return (
    <Card className="mx-auto max-w-lg shadow-sm">
      <CardHeader className="pb-4">
        <StepIndicator current={step} steps={STEPS} />
        <Separator className="mt-2" />
        <div className="pt-2">
          <CardTitle className="text-lg">{currentStep.title}</CardTitle>
          <CardDescription>{currentStep.desc}</CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <div className="min-h-[270px]">{stepContent[step - 1]}</div>
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-5">
        <Button
          variant="outline"
          onClick={() => setStep((s) => Math.max(s - 1, 1))}
          disabled={isFirst}
        >
          Back
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{step} / {STEPS.length}</span>
          {isLast ? (
            <Button onClick={() => setStep(1)}>
              <Check className="size-4" /> Launch workspace
            </Button>
          ) : (
            <Button onClick={() => setStep((s) => Math.min(s + 1, STEPS.length))}>
              Continue <ChevronRight className="size-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

// ─── Horizontal Rail Stepper ───────────────────────────────────────────────────

const HorizontalStepper = () => {
  const [active, setActive] = useState(2)

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-0">
        <div className="grid grid-cols-4">
          {SETUP_STEPS.map((s, i) => {
            const done = s.id < active
            const current = s.id === active
            return (
              <div key={s.id} className="relative flex flex-col items-center">
                {i > 0 && (
                  <div
                    className={cn(
                      "absolute left-0 top-3 h-0.5 w-full -translate-x-1/2",
                      done || current ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
                <button
                  onClick={() => setActive(s.id)}
                  className={cn(
                    "relative z-10 flex size-6 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors",
                    done
                      ? "border-primary bg-primary text-primary-foreground"
                      : current
                      ? "border-primary bg-background text-primary"
                      : "border-muted bg-background text-muted-foreground"
                  )}
                >
                  {done ? <Check className="size-3" /> : s.id}
                </button>
                <p className={cn("mt-1.5 hidden text-xs font-medium sm:block", current ? "text-foreground" : "text-muted-foreground")}>
                  {s.title}
                </p>
                <p className="hidden text-[10px] text-muted-foreground sm:block">{s.desc}</p>
              </div>
            )
          })}
        </div>
      </CardHeader>

      <Separator className="mt-6" />

      <CardContent className="space-y-3 pt-5">
        {active === 1 && (
          <>
            <div className="space-y-2">
              <Label htmlFor="hs-name">Full name</Label>
              <Input id="hs-name" placeholder="Jane Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hs-email">Email</Label>
              <Input id="hs-email" type="email" placeholder="jane@example.com" />
            </div>
          </>
        )}
        {active === 2 && (
          <>
            <div className="space-y-2">
              <Label>Language</Label>
              <NativeSelect>
                <NativeSelectOption>English (US)</NativeSelectOption>
                <NativeSelectOption>French</NativeSelectOption>
                <NativeSelectOption>German</NativeSelectOption>
              </NativeSelect>
            </div>
            <div className="space-y-2">
              <Label>Timezone</Label>
              <NativeSelect defaultValue="la">
                <NativeSelectOption value="ny">America/New_York (UTC-5)</NativeSelectOption>
                <NativeSelectOption value="la">America/Los_Angeles (UTC-8)</NativeSelectOption>
                <NativeSelectOption value="lon">Europe/London (UTC+0)</NativeSelectOption>
              </NativeSelect>
            </div>
          </>
        )}
        {active === 3 && (
          <div className="space-y-2">
            {INTEGRATIONS.map((tool) => (
              <div key={tool} className="flex items-center justify-between rounded-lg border px-4 py-3">
                <span className="text-sm font-medium">{tool}</span>
                <Button size="sm" variant="outline">Connect</Button>
              </div>
            ))}
          </div>
        )}
        {active === 4 && (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-green-50 dark:bg-green-950">
              <Check className="size-7 text-green-600" />
            </div>
            <div>
              <p className="font-semibold">You&apos;re all set!</p>
              <p className="mt-1 text-sm text-muted-foreground">Your workspace is ready. Start building.</p>
            </div>
            <Button className="mt-2">Go to dashboard</Button>
          </div>
        )}
      </CardContent>

      {active < 4 && (
        <CardFooter className="justify-between border-t pt-4">
          <Button variant="ghost" size="sm" onClick={() => setActive((v) => Math.max(v - 1, 1))} disabled={active === 1}>
            Back
          </Button>
          <Button size="sm" onClick={() => setActive((v) => Math.min(v + 1, 4))}>
            {active === 3 ? "Finish" : "Next"} <ChevronRight className="size-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

// ─── Page layout helper ────────────────────────────────────────────────────────

const Variant = ({ label, children }: { label: string; children: ReactNode }) => (
  <section className="space-y-4">
    <div className="flex items-center gap-3">
      <h3 className="text-sm font-semibold">{label}</h3>
      <div className="h-px flex-1 bg-border" />
    </div>
    {children}
  </section>
)

// ─── Page ──────────────────────────────────────────────────────────────────────

const MultiStepFormsPage = () => (
  <div className="mx-auto max-w-4xl space-y-14">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Multi Step Forms</h2>
      <p className="text-muted-foreground">Wizard patterns — card-based stepper and horizontal rail stepper.</p>
    </div>

    <Variant label="Card Wizard (4 steps — Account → Workspace → Plan → Review)">
      <Wizard />
    </Variant>

    <Variant label="Horizontal Rail Stepper (click steps to navigate)">
      <HorizontalStepper />
    </Variant>
  </div>
)

export default MultiStepFormsPage

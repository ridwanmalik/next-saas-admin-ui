"use client"

import { useState, type ReactNode } from "react"
import { Check, Eye, EyeOff, Sparkles, UserPlus } from "lucide-react"
import { siGithub, siGoogle } from "simple-icons"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { SimpleIconSvg } from "@/components/ui/simple-icon"

// ─── Shared helpers ────────────────────────────────────────────────────────────

const Variant = ({ label, children }: { label: string; children: ReactNode }) => (
  <section className="space-y-4">
    <div className="flex items-center gap-3">
      <h3 className="text-sm font-semibold">{label}</h3>
      <div className="h-px flex-1 bg-border" />
    </div>
    {children}
  </section>
)

const PasswordStrength = ({ password }: { password: string }) => {
  const score = Math.min(
    [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((r) => r.test(password)).length * 25,
    100
  )
  const label = score === 0 ? "" : score <= 25 ? "Weak" : score <= 50 ? "Fair" : score <= 75 ? "Good" : "Strong"
  const color = score <= 25 ? "bg-destructive" : score <= 50 ? "bg-amber-500" : score <= 75 ? "bg-blue-500" : "bg-green-500"
  return password ? (
    <div className="space-y-1">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${score}%` }} />
      </div>
      <p className="text-xs text-muted-foreground">Strength: {label}</p>
    </div>
  ) : null
}

// ─── Static data ───────────────────────────────────────────────────────────────

const FEATURES = [
  { icon: "📊", label: "Real-time analytics" },
  { icon: "🔒", label: "Enterprise security" },
  { icon: "🤝", label: "Team collaboration" },
  { icon: "⚡", label: "Instant setup" },
]

const TRIAL_PERKS = ["14-day free trial", "No credit card", "Cancel anytime"]

// ─── Page ──────────────────────────────────────────────────────────────────────

const RegisterFormsPage = () => {
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)

  return (
    <div className="mx-auto max-w-4xl space-y-14">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Register Forms</h2>
        <p className="text-muted-foreground">Sign-up layouts — simple card, gradient-accent, and social-first.</p>
      </div>

      {/* ── Variant 1: Simple Card ───────────────────────────────────────── */}
      <Variant label="Simple">
        <Card className="mx-auto max-w-md shadow-sm">
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
            <CardDescription>Fill in the details below to get started.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="s-fn">First name</Label>
                <Input id="s-fn" placeholder="Jane" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="s-ln">Last name</Label>
                <Input id="s-ln" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-email">Email</Label>
              <Input id="s-email" type="email" placeholder="jane@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-pass">Password</Label>
              <div className="relative">
                <Input
                  id="s-pass"
                  type={showPw ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              <PasswordStrength password={password} />
            </div>
            <div className="flex items-start gap-2">
              <Checkbox id="s-terms" className="mt-0.5" />
              <Label htmlFor="s-terms" className="text-sm font-normal leading-snug">
                I agree to the{" "}
                <a href="#" className="underline underline-offset-4 hover:text-foreground">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="underline underline-offset-4 hover:text-foreground">Privacy Policy</a>
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-3">
            <Button className="w-full"><UserPlus className="size-4" />Create account</Button>
            <p className="text-center text-xs text-muted-foreground">
              Already have an account?{" "}
              <a href="#" className="font-medium text-foreground hover:underline">Sign in</a>
            </p>
          </CardFooter>
        </Card>
      </Variant>

      {/* ── Variant 2: Gradient Accent ───────────────────────────────────── */}
      <Variant label="Gradient Accent">
        <div className="mx-auto max-w-md overflow-hidden rounded-xl border shadow-sm">
          <div className="bg-gradient-to-r from-violet-600 via-primary to-blue-600 p-6 text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="size-5" />
              <span className="font-bold text-lg">Get started for free</span>
            </div>
            <p className="mt-1 text-sm text-white/80">Join thousands of teams already using Next SaaS.</p>
            <div className="mt-4 flex gap-4 text-xs text-white/70">
              {TRIAL_PERKS.map((f) => (
                <div key={f} className="flex items-center gap-1">
                  <Check className="size-3" />{f}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card p-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="g-fn">First name</Label>
                <Input id="g-fn" placeholder="Jane" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="g-ln">Last name</Label>
                <Input id="g-ln" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="g-email">Work email</Label>
              <Input id="g-email" type="email" placeholder="jane@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="g-pass">Password</Label>
              <Input id="g-pass" type="password" placeholder="Min. 8 characters" />
            </div>
            <Button className="w-full bg-gradient-to-r from-violet-600 to-primary hover:from-violet-700 hover:to-primary/90">
              Start free trial
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Already have an account?{" "}
              <a href="#" className="font-medium text-foreground hover:underline">Sign in</a>
            </p>
          </div>
        </div>
      </Variant>

      {/* ── Variant 3: Social First ──────────────────────────────────────── */}
      <Variant label="Social First">
        <div className="mx-auto max-w-md overflow-hidden rounded-xl border shadow-sm md:grid md:grid-cols-2">
          {/* Left: benefits */}
          <div className="bg-muted p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Everything you need</h3>
              {FEATURES.map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-sm">
                  <span className="text-base">{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-6">Join 10,000+ teams worldwide.</p>
          </div>

          {/* Right: form */}
          <div className="p-6 space-y-4 bg-card">
            <div className="space-y-2">
              <Button variant="outline" className="w-full gap-2">
                <SimpleIconSvg icon={siGithub} className="size-4" />
                Sign up with GitHub
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <SimpleIconSvg icon={siGoogle} className="size-4" />
                Sign up with Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><Separator /></div>
              <div className="relative flex justify-center">
                <span className="bg-card px-2 text-xs text-muted-foreground">or email</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="sf-email">Email</Label>
                <Input id="sf-email" type="email" placeholder="jane@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sf-pass">Password</Label>
                <Input id="sf-pass" type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full">Create account</Button>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Have an account?{" "}
              <a href="#" className="font-medium text-foreground hover:underline">Sign in</a>
            </p>
          </div>
        </div>
      </Variant>
    </div>
  )
}

export default RegisterFormsPage

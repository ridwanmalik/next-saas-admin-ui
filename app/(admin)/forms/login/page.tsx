"use client"

import { useState, type ReactNode } from "react"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
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

const PasswordInput = ({ id, placeholder }: { id: string; placeholder?: string }) => {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <Input id={id} type={show ? "text" : "password"} placeholder={placeholder ?? "••••••••"} className="pr-10" />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        aria-label="Toggle password"
      >
        {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

const LoginFormsPage = () => (
  <div className="mx-auto max-w-4xl space-y-14">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Login Forms</h2>
      <p className="text-muted-foreground">Sign-in form layouts — minimal, split-screen, dark glass, and social auth.</p>
    </div>

    {/* ── Variant 1: Minimal ───────────────────────────────────────────── */}
    <Variant label="Minimal">
      <Card className="mx-auto max-w-sm shadow-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">N</div>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Sign in to your account to continue.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="m-email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input id="m-email" type="email" placeholder="you@example.com" className="pl-9" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="m-pass">Password</Label>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground underline-offset-4 hover:underline">Forgot password?</a>
            </div>
            <PasswordInput id="m-pass" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="m-remember" />
            <Label htmlFor="m-remember" className="text-sm font-normal">Remember me for 30 days</Label>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <Button className="w-full">Sign in</Button>
          <p className="text-center text-xs text-muted-foreground">
            Don&apos;t have an account?{" "}
            <a href="#" className="font-medium text-foreground hover:underline">Sign up</a>
          </p>
        </CardFooter>
      </Card>
    </Variant>

    {/* ── Variant 2: Split Screen ──────────────────────────────────────── */}
    <Variant label="Split Screen">
      <div className="overflow-hidden rounded-xl border shadow-sm md:grid md:grid-cols-2">
        {/* Left — branded panel */}
        <div className="flex flex-col justify-between bg-primary p-10 text-primary-foreground">
          <div className="text-lg font-bold tracking-tight">Next SaaS</div>
          <div className="space-y-3">
            <blockquote className="text-xl font-medium leading-snug">
              &ldquo;This platform cut our onboarding time by 60% in the first month.&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-xs font-bold">JD</div>
              <div>
                <p className="text-sm font-medium">Jane Doe</p>
                <p className="text-xs text-primary-foreground/70">CTO, TechCorp</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-primary-foreground/50">© 2026 Next SaaS. All rights reserved.</p>
        </div>

        {/* Right — form */}
        <div className="flex items-center justify-center p-10 bg-card">
          <div className="w-full max-w-sm space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Sign in</h2>
              <p className="text-sm text-muted-foreground">Enter your email and password below.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sp-email">Email</Label>
                <Input id="sp-email" type="email" placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sp-pass">Password</Label>
                  <a href="#" className="text-xs text-muted-foreground hover:text-foreground underline-offset-4 hover:underline">Forgot?</a>
                </div>
                <PasswordInput id="sp-pass" />
              </div>
            </div>
            <Button className="w-full">Sign in</Button>
            <p className="text-center text-xs text-muted-foreground">
              No account?{" "}
              <a href="#" className="font-medium text-foreground hover:underline">Create one</a>
            </p>
          </div>
        </div>
      </div>
    </Variant>

    {/* ── Variant 3: Dark Glass ────────────────────────────────────────── */}
    <Variant label="Dark Glass">
      <div className="relative overflow-hidden rounded-xl bg-zinc-950 p-10">
        <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-violet-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-sm space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Sign in</h2>
            <p className="text-sm text-zinc-400">Welcome back to Next SaaS</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-zinc-300">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="border-white/10 bg-white/5 pl-9 text-white placeholder:text-zinc-600 focus-visible:border-primary/50 focus-visible:ring-primary/20"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-zinc-300">Password</Label>
                <a href="#" className="text-xs text-zinc-500 hover:text-zinc-300">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="border-white/10 bg-white/5 pl-9 text-white placeholder:text-zinc-600 focus-visible:border-primary/50 focus-visible:ring-primary/20"
                />
              </div>
            </div>
          </div>

          <Button className="w-full">Sign in</Button>

          <p className="text-center text-xs text-zinc-500">
            New here?{" "}
            <a href="#" className="text-zinc-300 hover:text-white">Create account</a>
          </p>
        </div>
      </div>
    </Variant>

    {/* ── Variant 4: Social + Email ────────────────────────────────────── */}
    <Variant label="Social + Email">
      <Card className="mx-auto max-w-sm shadow-sm">
        <CardHeader className="text-center">
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Sign in with your preferred method.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="gap-2">
              <SimpleIconSvg icon={siGithub} className="size-4" />
              GitHub
            </Button>
            <Button variant="outline" className="gap-2">
              <SimpleIconSvg icon={siGoogle} className="size-4" />
              Google
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card px-2 text-xs text-muted-foreground">or continue with email</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="s-email">Email</Label>
              <Input id="s-email" type="email" placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="s-pass">Password</Label>
                <a href="#" className="text-xs text-muted-foreground hover:text-foreground underline-offset-4 hover:underline">Forgot password?</a>
              </div>
              <PasswordInput id="s-pass" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <Button className="w-full">Continue</Button>
          <p className="text-center text-xs text-muted-foreground">
            By signing in you agree to our{" "}
            <a href="#" className="underline underline-offset-4 hover:text-foreground">Terms</a>
            {" & "}
            <a href="#" className="underline underline-offset-4 hover:text-foreground">Privacy Policy</a>
          </p>
        </CardFooter>
      </Card>
    </Variant>
  </div>
)

export default LoginFormsPage

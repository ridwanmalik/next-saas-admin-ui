"use client"

import { useState } from "react"
import { ArrowLeft, CheckCircle2, Eye, EyeOff, KeyRound, Mail, RefreshCw, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"

function Variant({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <h3 className="text-sm font-semibold">{label}</h3>
        <div className="h-px flex-1 bg-border" />
      </div>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {children}
    </section>
  )
}

function PasswordStrength({ password }: { password: string }) {
  const score = Math.min(
    [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((r) => r.test(password)).length * 25,
    100
  )
  const label = score === 0 ? "" : score <= 25 ? "Weak" : score <= 50 ? "Fair" : score <= 75 ? "Good" : "Strong"
  const color = score <= 25 ? "bg-destructive" : score <= 50 ? "bg-amber-500" : score <= 75 ? "bg-blue-500" : "bg-green-500"
  return password ? (
    <div className="space-y-1">
      <div className="flex gap-1">
        {[25, 50, 75, 100].map((s) => (
          <div key={s} className={`h-1 flex-1 rounded-full ${score >= s ? color : "bg-muted"} transition-colors`} />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  ) : null
}

export default function ForgotPasswordPage() {
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [newPw, setNewPw] = useState("")

  return (
    <div className="mx-auto max-w-4xl space-y-14">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Forgot Password</h2>
        <p className="text-muted-foreground">Three-stage password reset flow — email request, OTP verification, and new password.</p>
      </div>

      {/* ── Step 1: Email Request ─────────────────────────────────────────── */}
      <Variant label="Step 1 — Request Reset Link" description="User enters their email to receive a reset link.">
        <Card className="mx-auto max-w-sm shadow-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10">
              <Mail className="size-6 text-primary" />
            </div>
            <CardTitle>Forgot your password?</CardTitle>
            <CardDescription>Enter the email associated with your account and we&apos;ll send you a reset link.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rq-email">Email address</Label>
              <Input id="rq-email" type="email" placeholder="you@example.com" />
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-3">
            <Button className="w-full">Send reset link</Button>
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
              <ArrowLeft className="size-3.5" />Back to sign in
            </Button>
          </CardFooter>
        </Card>
      </Variant>

      {/* ── Step 2: OTP Verification ─────────────────────────────────────── */}
      <Variant label="Step 2 — Verify Code" description="User enters the 6-digit code sent to their email.">
        <Card className="mx-auto max-w-sm shadow-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10">
              <ShieldCheck className="size-6 text-primary" />
            </div>
            <CardTitle>Check your email</CardTitle>
            <CardDescription>
              We sent a 6-digit code to{" "}
              <span className="font-medium text-foreground">you@example.com</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Didn&apos;t receive a code?{" "}
              <button className="font-medium text-foreground hover:underline inline-flex items-center gap-1">
                <RefreshCw className="size-3" />Resend
              </button>
            </p>
          </CardContent>
          <CardFooter className="flex-col gap-3">
            <Button className="w-full">Verify code</Button>
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
              <ArrowLeft className="size-3.5" />Back
            </Button>
          </CardFooter>
        </Card>
      </Variant>

      {/* ── Step 3: New Password ──────────────────────────────────────────── */}
      <Variant label="Step 3 — Set New Password" description="User creates and confirms their new password.">
        <Card className="mx-auto max-w-sm shadow-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10">
              <KeyRound className="size-6 text-primary" />
            </div>
            <CardTitle>Set new password</CardTitle>
            <CardDescription>Your new password must be at least 8 characters.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="np-new">New password</Label>
              <div className="relative">
                <Input
                  id="np-new"
                  type={showNew ? "text" : "password"}
                  placeholder="••••••••"
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNew((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              <PasswordStrength password={newPw} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="np-confirm">Confirm password</Label>
              <div className="relative">
                <Input
                  id="np-confirm"
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <ul className="space-y-1.5 text-xs text-muted-foreground">
              {[
                { rule: /.{8,}/, label: "At least 8 characters" },
                { rule: /[A-Z]/, label: "One uppercase letter" },
                { rule: /[0-9]/, label: "One number" },
                { rule: /[^A-Za-z0-9]/, label: "One special character" },
              ].map(({ rule, label }) => (
                <li key={label} className={`flex items-center gap-2 ${rule.test(newPw) ? "text-green-600 dark:text-green-400" : ""}`}>
                  <CheckCircle2 className="size-3.5 shrink-0" />
                  {label}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Update password</Button>
          </CardFooter>
        </Card>
      </Variant>
    </div>
  )
}

"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CheckCircle2, X } from "lucide-react"
import { useState } from "react"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

// ─── Schemas ──────────────────────────────────────────────────────────────────

const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username must be at most 20 characters").regex(/^[a-z0-9_]+$/, "Only lowercase letters, numbers, and underscores"),
  email:    z.email("Please enter a valid email address"),
  terms:    z.boolean().refine(v => v, "You must accept the terms"),
})

const passwordSchema = z.object({
  password:        z.string().min(8, "Password must be at least 8 characters").regex(/[A-Z]/, "Must contain at least one uppercase letter").regex(/[a-z]/, "Must contain at least one lowercase letter").regex(/[0-9]/, "Must contain at least one number").regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName:  z.string().min(1, "Last name is required"),
  bio:       z.string().max(160, "Bio must be 160 characters or less").optional(),
  website:   z.url("Please enter a valid URL").optional().or(z.literal("")),
  role:      z.enum(["admin", "editor", "viewer"], { error: "Please select a role" }),
})

const paymentSchema = z.object({
  cardName:   z.string().min(2, "Cardholder name is required"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  expiry:     z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format"),
  cvv:        z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
})

type SignUpValues      = z.infer<typeof signUpSchema>
type PasswordValues   = z.infer<typeof passwordSchema>
type ProfileValues  = z.infer<typeof profileSchema>
type PaymentValues  = z.infer<typeof paymentSchema>

// ─── Password rules ────────────────────────────────────────────────────────────

const PASSWORD_RULES = [
  { label: "At least 8 characters",      test: (p: string) => p.length >= 8           },
  { label: "One uppercase letter (A–Z)",  test: (p: string) => /[A-Z]/.test(p)        },
  { label: "One lowercase letter (a–z)",  test: (p: string) => /[a-z]/.test(p)        },
  { label: "One number (0–9)",            test: (p: string) => /[0-9]/.test(p)        },
  { label: "One special character (!@#…)", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
]

const PasswordRules = ({ value }: { value: string }) => (
  <ul className="mt-2 space-y-1.5">
    {PASSWORD_RULES.map(({ label, test }) => {
      const pass = value.length > 0 && test(value)
      const fail = value.length > 0 && !test(value)
      return (
        <li key={label} className="flex items-center gap-2 text-xs">
          {pass ? (
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
          ) : fail ? (
            <X className="h-3.5 w-3.5 shrink-0 text-destructive" />
          ) : (
            <span className="h-3.5 w-3.5 shrink-0 rounded-full border border-muted-foreground/40 inline-block" />
          )}
          <span className={pass ? "text-emerald-600 dark:text-emerald-400" : fail ? "text-destructive" : "text-muted-foreground"}>
            {label}
          </span>
        </li>
      )
    })}
  </ul>
)

// ─── Success banner ───────────────────────────────────────────────────────────

const SuccessBanner = ({ message }: { message: string }) => (
  <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">
    <CheckCircle2 className="h-4 w-4 shrink-0" />
    {message}
  </div>
)

// ─── Sign Up Form ─────────────────────────────────────────────────────────────

const SignUpForm = () => {
  const [submitted, setSubmitted] = useState(false)
  const form = useForm<SignUpValues>({ resolver: zodResolver(signUpSchema), defaultValues: { username: "", email: "", terms: false } })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => setSubmitted(true))} className="space-y-4">
        {submitted && <SuccessBanner message="Account created successfully!" />}

        <FormField control={form.control} name="username" render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl><Input placeholder="john_doe" {...field} /></FormControl>
            <FormDescription>Lowercase letters, numbers, and underscores only.</FormDescription>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl><Input type="email" placeholder="john@example.com" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="terms" render={({ field }) => (
          <FormItem className="flex items-start gap-3 space-y-0">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <div>
              <FormLabel className="font-normal">I agree to the Terms of Service and Privacy Policy</FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )} />

        <Button type="submit" className="w-full">Create Account</Button>
      </form>
    </Form>
  )
}

// ─── Password Form ─────────────────────────────────────────────────────────────

const PasswordForm = () => {
  const [submitted, setSubmitted] = useState(false)
  const form = useForm<PasswordValues>({ resolver: zodResolver(passwordSchema), defaultValues: { password: "", confirmPassword: "" } })
  const passwordValue = form.watch("password") ?? ""

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => setSubmitted(true))} className="space-y-4 max-w-sm">
        {submitted && <SuccessBanner message="Password set successfully!" />}

        <FormField control={form.control} name="password" render={({ field }) => (
          <FormItem>
            <FormLabel>New Password</FormLabel>
            <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
            <PasswordRules value={passwordValue} />
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="confirmPassword" render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit">Set Password</Button>
      </form>
    </Form>
  )
}

// ─── Profile Form ─────────────────────────────────────────────────────────────

const ProfileForm = () => {
  const [submitted, setSubmitted] = useState(false)
  const form = useForm<ProfileValues>({ resolver: zodResolver(profileSchema), defaultValues: { firstName: "", lastName: "", bio: "", website: "", role: undefined } })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => setSubmitted(true))} className="space-y-4">
        {submitted && <SuccessBanner message="Profile updated successfully!" />}

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField control={form.control} name="firstName" render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl><Input placeholder="John" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="lastName" render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl><Input placeholder="Doe" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="role" render={({ field }) => (
          <FormItem>
            <FormLabel>Role</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger><SelectValue placeholder="Select a role" /></SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="website" render={({ field }) => (
          <FormItem>
            <FormLabel>Website</FormLabel>
            <FormControl><Input placeholder="https://example.com" {...field} /></FormControl>
            <FormDescription>Optional — must be a valid URL.</FormDescription>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="bio" render={({ field }) => (
          <FormItem>
            <FormLabel>Bio</FormLabel>
            <FormControl><Textarea placeholder="Tell us a little about yourself…" className="resize-none" rows={3} {...field} /></FormControl>
            <FormDescription>{(field.value ?? "").length} / 160</FormDescription>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit">Save Profile</Button>
      </form>
    </Form>
  )
}

// ─── Payment Form ─────────────────────────────────────────────────────────────

const PaymentForm = () => {
  const [submitted, setSubmitted] = useState(false)
  const form = useForm<PaymentValues>({ resolver: zodResolver(paymentSchema), defaultValues: { cardName: "", cardNumber: "", expiry: "", cvv: "" } })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => setSubmitted(true))} className="space-y-4">
        {submitted && <SuccessBanner message="Payment method saved!" />}

        <FormField control={form.control} name="cardName" render={({ field }) => (
          <FormItem>
            <FormLabel>Cardholder Name</FormLabel>
            <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="cardNumber" render={({ field }) => (
          <FormItem>
            <FormLabel>Card Number</FormLabel>
            <FormControl>
              <Input
                placeholder="1234567812345678"
                maxLength={16}
                {...field}
                onChange={e => field.onChange(e.target.value.replace(/\D/g, ""))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField control={form.control} name="expiry" render={({ field }) => (
            <FormItem>
              <FormLabel>Expiry</FormLabel>
              <FormControl>
                <Input
                  placeholder="MM/YY"
                  maxLength={5}
                  {...field}
                  onChange={e => {
                    const v = e.target.value.replace(/\D/g, "")
                    field.onChange(v.length >= 2 ? `${v.slice(0, 2)}/${v.slice(2)}` : v)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="cvv" render={({ field }) => (
            <FormItem>
              <FormLabel>CVV</FormLabel>
              <FormControl>
                <Input
                  placeholder="123"
                  maxLength={4}
                  {...field}
                  onChange={e => field.onChange(e.target.value.replace(/\D/g, ""))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <Button type="submit" className="w-full">Save Card</Button>
      </form>
    </Form>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const FormValidationPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-10">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Form Validation</h2>
      <p className="text-muted-foreground">Real-time validation powered by React Hook Form and Zod.</p>
    </div>

    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold">Sign Up</h3>
        <p className="text-sm text-muted-foreground">Username, email, and checkbox validation.</p>
      </div>
      <div className="rounded-xl border bg-card p-6">
        <SignUpForm />
      </div>
    </div>

    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold">Password</h3>
        <p className="text-sm text-muted-foreground">Live password strength rules with confirm match validation.</p>
      </div>
      <div className="rounded-xl border bg-card p-6">
        <PasswordForm />
      </div>
    </div>

    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold">Profile</h3>
        <p className="text-sm text-muted-foreground">Required fields, URL format, character limit, and select validation.</p>
      </div>
      <div className="rounded-xl border bg-card p-6">
        <ProfileForm />
      </div>
    </div>

    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold">Payment</h3>
        <p className="text-sm text-muted-foreground">Card number, expiry format, and CVV pattern validation.</p>
      </div>
      <div className="rounded-xl border bg-card p-6">
        <PaymentForm />
      </div>
    </div>
  </div>
)

export default FormValidationPage

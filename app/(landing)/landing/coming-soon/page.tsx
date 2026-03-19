"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Twitter, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const LAUNCH_DATE = new Date("2025-06-01T00:00:00Z")

const pad = (n: number) => String(n).padStart(2, "0")

const useCountdown = (target: Date) => {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now())
    return {
      days:    Math.floor(diff / 86_400_000),
      hours:   Math.floor((diff % 86_400_000) / 3_600_000),
      minutes: Math.floor((diff % 3_600_000)  / 60_000),
      seconds: Math.floor((diff % 60_000)      / 1_000),
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

const FEATURES = [
  "Advanced AI-powered analytics",
  "Real-time collaboration tools",
  "Native mobile apps",
  "Two-way API integrations",
  "Automated workflow builder",
  "Global edge deployment",
]

const LandingComingSoonPage = () => {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE)
  const [email, setEmail] = useState("")
  const [joined, setJoined] = useState(false)

  return (
    <div className="mx-auto w-full max-w-2xl space-y-12 py-12 text-center">

      <div className="space-y-4">
        <Badge variant="secondary" className="rounded-full px-4 py-1 text-xs">
          Something big is coming
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
          We&apos;re launching soon
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          We&apos;re putting the finishing touches on something we think you&apos;re going to love.
          Be the first to know when we go live.
        </p>
      </div>

      {/* Countdown */}
      <div className="flex items-end justify-center gap-4">
        {[
          { value: days,    label: "Days"    },
          { value: hours,   label: "Hours"   },
          { value: minutes, label: "Minutes" },
          { value: seconds, label: "Seconds" },
        ].map(({ value, label }, i) => (
          <div key={label} className="flex items-end gap-4">
            <div className="flex flex-col items-center gap-1">
              <div className="rounded-xl border bg-card px-5 py-4 min-w-16">
                <span className="text-3xl font-bold tabular-nums">{pad(value)}</span>
              </div>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
            {i < 3 && <span className="text-2xl font-bold text-muted-foreground mb-6">:</span>}
          </div>
        ))}
      </div>

      {/* Sign up */}
      {joined ? (
        <div className="rounded-xl border bg-emerald-500/10 border-emerald-500/20 p-5 space-y-1">
          <p className="font-medium text-emerald-600 dark:text-emerald-400">You&apos;re on the list!</p>
          <p className="text-sm text-muted-foreground">We&apos;ll send you an email the moment we launch.</p>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Join 3,200+ people already on the waitlist</p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Button onClick={() => setJoined(true)} className="gap-1.5 shrink-0">
              Notify me <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">No spam. Unsubscribe at any time.</p>
        </div>
      )}

      {/* What's coming */}
      <div className="rounded-2xl border bg-card p-6 space-y-4 text-left">
        <h2 className="font-semibold text-center">What&apos;s coming</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {FEATURES.map(f => (
            <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Social */}
      <div className="flex items-center justify-center gap-3">
        <span className="text-sm text-muted-foreground">Follow the journey</span>
        {[
          { icon: Twitter,  label: "Twitter"  },
          { icon: Github,   label: "GitHub"   },
          { icon: Linkedin, label: "LinkedIn" },
        ].map(({ icon: Icon, label }) => (
          <Button key={label} variant="outline" size="icon" className="h-8 w-8" aria-label={label}>
            <Icon className="h-3.5 w-3.5" />
          </Button>
        ))}
      </div>

    </div>
  )
}

export default LandingComingSoonPage

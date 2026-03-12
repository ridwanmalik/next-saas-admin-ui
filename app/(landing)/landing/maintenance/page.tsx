"use client"

import { useState } from "react"
import { Wrench, ArrowRight, Twitter, Github, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const UPDATES = [
  { time: "10 min ago", status: "in-progress", message: "Database migration running — 68% complete"  },
  { time: "25 min ago", status: "done",        message: "Load balancer failover completed successfully" },
  { time: "42 min ago", status: "done",        message: "Maintenance window started — services paused" },
]

const LandingMaintenancePage = () => {
  const [email, setEmail] = useState("")
  const [notified, setNotified] = useState(false)

  return (
    <div className="mx-auto w-full max-w-xl space-y-10 py-16 text-center">

      {/* Icon */}
      <div className="flex justify-center">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border bg-card">
          <Wrench className="h-9 w-9 text-muted-foreground" />
          <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
            <span className="relative inline-flex h-5 w-5 rounded-full bg-amber-400" />
          </span>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-3">
        <Badge variant="outline" className="rounded-full px-4 py-1 text-xs border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/5">
          Scheduled maintenance
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight">We&apos;ll be right back</h1>
        <p className="text-muted-foreground leading-relaxed">
          We&apos;re performing scheduled maintenance to improve performance and reliability.
          Everything will be back online shortly — estimated downtime is <strong className="text-foreground">45 minutes</strong>.
        </p>
      </div>

      {/* Status updates */}
      <div className="rounded-xl border bg-card p-5 space-y-4 text-left">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Live updates</h2>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            In progress
          </span>
        </div>
        <ul className="space-y-3">
          {UPDATES.map(({ time, status, message }) => (
            <li key={message} className="flex items-start gap-3">
              <div className={`mt-0.5 h-4 w-4 shrink-0 rounded-full flex items-center justify-center ${
                status === "done" ? "bg-emerald-500/15" : "bg-amber-500/15"
              }`}>
                {status === "done"
                  ? <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  : <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                }
              </div>
              <div className="flex-1 space-y-0.5">
                <p className="text-sm">{message}</p>
                <p className="text-xs text-muted-foreground">{time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Notify */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold">Get notified when we&apos;re back</h2>
        {notified ? (
          <div className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            We&apos;ll email you as soon as we&apos;re back online.
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Button onClick={() => setNotified(true)} className="gap-1.5 shrink-0">
              Notify me <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </div>

      {/* Links */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm text-muted-foreground">Follow for real-time updates</p>
        <div className="flex gap-2">
          {[
            { icon: Twitter, label: "Twitter" },
            { icon: Github,  label: "GitHub"  },
          ].map(({ icon: Icon, label }) => (
            <Button key={label} variant="outline" size="sm" className="gap-2">
              <Icon className="h-3.5 w-3.5" /> {label}
            </Button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Need urgent help?{" "}
          <a href="mailto:support@nextsaas.com" className="text-primary underline underline-offset-2">
            Contact support
          </a>
        </p>
      </div>

    </div>
  )
}

export default LandingMaintenancePage

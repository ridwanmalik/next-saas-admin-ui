"use client"

import Link from "next/link"
import { Home, RefreshCw } from "lucide-react"
import { ErrorState } from "@/components/ui/error-state"

const Error500Page = () => (
  <div className="flex flex-col items-center">
    <ErrorState
      code={500}
      title="Internal server error"
      description="Something went wrong on our end. Our team has been notified and is working to fix the issue. Please try again in a few minutes."
      actions={[
        { label: "Try again", icon: RefreshCw, onClick: () => window.location.reload() },
        { label: "Go home",   icon: Home,      href: "/landing/home" },
      ]}
      className="min-h-0 py-0"
    />

    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-4 w-full max-w-sm text-left space-y-1 mt-6">
      <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">Incident reported</p>
      <p className="text-xs text-muted-foreground">
        Our on-call team has been automatically paged. Estimated resolution time is under 30 minutes.
      </p>
    </div>

    <p className="text-xs text-muted-foreground mt-4">
      Error ID: <code className="font-mono bg-muted px-1.5 py-0.5 rounded">ERR_500_9f3a21bc</code>
    </p>
  </div>
)

export default Error500Page

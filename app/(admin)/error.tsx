"use client"

import { useEffect } from "react"
import { Home, RefreshCw } from "lucide-react"

import { ErrorState } from "@/components/ui/error-state"

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <ErrorState
      code={500}
      title="Something went wrong"
      description="An unexpected error occurred. Try refreshing the page — if it keeps happening, contact support."
      actions={[
        { label: "Try again",       icon: RefreshCw, onClick: reset,        variant: "default"  },
        { label: "Go to dashboard", icon: Home,      href: "/dashboard",    variant: "outline"  },
      ]}
    />
  )
}

import Link from "next/link"
import { Home, MoveLeft, LogIn } from "lucide-react"
import { ErrorState } from "@/components/ui/error-state"

const Error401Page = () => (
  <div className="flex flex-col items-center">
    <ErrorState
      code={401}
      title="Authentication required"
      description="You need to be signed in to view this page. Please log in with your credentials to continue."
      actions={[
        { label: "Sign in",  icon: LogIn,    href: "/dashboard"    },
        { label: "Go home",  icon: Home,     href: "/landing/home" },
      ]}
      className="min-h-0 py-0"
    />

    <div className="rounded-xl border bg-card p-4 w-full max-w-sm text-left space-y-2 mt-6">
      <p className="text-xs font-medium text-muted-foreground">Why am I seeing this?</p>
      <ul className="space-y-1.5">
        {[
          "Your session may have expired — try signing in again.",
          "You followed a link that requires authentication.",
          "You may have been logged out due to inactivity.",
        ].map((reason) => (
          <li key={reason} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/40 shrink-0" />
            {reason}
          </li>
        ))}
      </ul>
    </div>
  </div>
)

export default Error401Page

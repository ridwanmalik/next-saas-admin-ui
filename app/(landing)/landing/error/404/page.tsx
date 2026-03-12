import Link from "next/link"
import { Home, MoveLeft, Search } from "lucide-react"
import { ErrorState } from "@/components/ui/error-state"
import { Button } from "@/components/ui/button"

const Error404Page = () => (
  <div className="flex flex-col items-center">
    <ErrorState
      code={404}
      title="Page not found"
      description="The page you're looking for doesn't exist or may have been moved. Double-check the URL or head back home."
      actions={[
        { label: "Go home", icon: Home,     href: "/landing/home" },
        { label: "Go back", icon: MoveLeft, href: "/dashboard"    },
      ]}
      className="min-h-0 py-0"
    />

    <div className="rounded-xl border bg-card p-4 w-full max-w-sm text-left space-y-2 mt-6">
      <p className="text-xs font-medium text-muted-foreground">You might be looking for:</p>
      <ul className="space-y-1">
        {[
          { label: "Home",     href: "/landing/home"    },
          { label: "Pricing",  href: "/landing/pricing" },
          { label: "About us", href: "/landing/about"   },
          { label: "Contact",  href: "/landing/contact" },
        ].map(({ label, href }) => (
          <li key={href}>
            <Link href={href} className="flex items-center gap-2 text-sm text-primary hover:underline underline-offset-2">
              <Search className="h-3 w-3" />{label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

export default Error404Page

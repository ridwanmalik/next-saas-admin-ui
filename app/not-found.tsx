import { Home, MoveLeft } from "lucide-react"

import { ErrorState } from "@/components/ui/error-state"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <ErrorState
        code={404}
        title="Page not found"
        description="The page you're looking for doesn't exist or may have been moved. Double-check the URL or head back home."
        actions={[
          { label: "Go home",  icon: Home,     href: "/dashboard" },
          { label: "Go back",  icon: MoveLeft, href: "javascript:history.back()" },
        ]}
        className="min-h-0 py-0"
      />
    </div>
  )
}

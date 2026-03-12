import { cn } from "@/lib/utils"

const PageContainer = ({ children, className, wide }: { children: React.ReactNode; className?: string; wide?: boolean }) => (
  <div className={cn("mx-auto w-full space-y-6", wide ? "max-w-6xl" : "max-w-3xl", className)}>
    {children}
  </div>
)

export { PageContainer }

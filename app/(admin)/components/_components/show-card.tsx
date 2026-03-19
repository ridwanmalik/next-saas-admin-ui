import { cn } from "@/lib/utils"

const ShowCard = ({
  title, description, children, className,
}: {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
}) => (
  <div className="space-y-3">
    {(title || description) && (
      <div>
        {title && <h3 className="text-sm font-semibold">{title}</h3>}
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
    )}
    <div className={cn(
      "relative flex min-h-75 w-full items-center justify-center rounded-xl border p-10",
      "*:data-[slot=accordion]:w-full *:data-[slot=accordion]:max-w-sm",
      className
    )}>
      {children}
    </div>
  </div>
)

export default ShowCard

import { cn } from "@/lib/utils"

const Kbd = ({ className, ...props }: React.ComponentProps<"kbd">) => (
  <kbd
    className={cn(
      "inline-flex items-center rounded border border-primary-foreground/30 bg-primary-foreground/15 px-1.5 py-0.5 font-mono text-[10px] leading-none shadow-[0_1px_0_1px] shadow-primary-foreground/20",
      className
    )}
    {...props}
  />
)

const KbdGroup = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    className={cn("flex items-center gap-0.5", className)}
    {...props}
  />
)

export { Kbd, KbdGroup }

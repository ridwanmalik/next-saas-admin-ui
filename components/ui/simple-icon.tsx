import type { SimpleIcon } from "simple-icons"
import { cn } from "@/lib/utils"

interface SimpleIconProps {
  icon: SimpleIcon
  className?: string
}

export const SimpleIconSvg = ({ icon, className }: SimpleIconProps) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    aria-label={icon.title}
    className={cn("fill-current", className)}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d={icon.path} />
  </svg>
)

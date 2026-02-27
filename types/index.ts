import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

export type LayoutProps = { children: ReactNode }

export interface NavChild {
  icon?: LucideIcon
  title: string
  href: string
}

export interface NavItem {
  icon: LucideIcon
  title: string
  href?: string
  badge?: string
  children?: NavChild[]
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

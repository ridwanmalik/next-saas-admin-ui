import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  CreditCard,
  FileText,
  Bell,
  Shield,
} from "lucide-react"
import type { NavGroup } from "@/types"

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { icon: LayoutDashboard, title: "Dashboard", href: "/dashboard" },
      { icon: BarChart3, title: "Analytics", href: "/analytics" },
    ],
  },
  {
    label: "Management",
    items: [
      { icon: Users, title: "Users", href: "/users", badge: "24" },
      { icon: FileText, title: "Reports", href: "/reports" },
      { icon: Bell, title: "Notifications", href: "/notifications" },
    ],
  },
  {
    label: "Account",
    items: [
      { icon: CreditCard, title: "Billing", href: "/billing" },
      { icon: Shield, title: "Security", href: "/security" },
      { icon: Settings, title: "Settings", href: "/settings" },
    ],
  },
]

export const APP_NAME = "Next SaaS"

import { AdminLayout } from "@/components/layout"
import type { LayoutProps } from "@/types"

export default function Layout({ children }: LayoutProps) {
  return <AdminLayout>{children}</AdminLayout>
}

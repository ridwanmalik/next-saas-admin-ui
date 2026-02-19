"use client"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "./admin-sidebar"
import { Topbar } from "./topbar"
import type { LayoutProps } from "@/types"

export const AdminLayout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <Topbar />
        <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

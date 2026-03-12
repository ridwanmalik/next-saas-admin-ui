"use client"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { AdminSidebar } from "./admin-sidebar"
import { Topbar } from "./topbar"
import { ThemeFab } from "./theme-fab"
import type { LayoutProps } from "@/types"

export const AdminLayout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="h-svh overflow-hidden">
        <Topbar />
        <main className="flex flex-1 flex-col gap-4 p-4 md:p-6 overflow-auto min-h-0">
          {children}
        </main>
      </SidebarInset>
      <ThemeFab />
      <Toaster />
    </SidebarProvider>
  )
}

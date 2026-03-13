"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, HardDrive, LayoutDashboard, Zap } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { NAV_GROUPS, APP_NAME } from "@/lib/constants"

export const AdminSidebar = () => {
  const pathname = usePathname()
  const { state } = useSidebar()

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <LayoutDashboard className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">{APP_NAME}</span>
                  <span className="text-xs text-muted-foreground">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {NAV_GROUPS.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) =>
                item.children ? (
                  <Collapsible
                    key={item.title}
                    defaultOpen={item.children.some((child) => isActive(child.href))}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                          <item.icon />
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.children.map((child) => (
                            <SidebarMenuSubItem key={child.href}>
                              <SidebarMenuSubButton asChild isActive={isActive(child.href)}>
                                <Link href={child.href}>
                                  {child.icon && <child.icon />}
                                  <span>{child.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.href!)}
                      tooltip={item.title}
                    >
                      <Link href={item.href!}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge>
                        <Badge variant="secondary" className="h-5 min-w-5 px-1 text-xs">
                          {item.badge}
                        </Badge>
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroup>
        ))}

        {/* Usage card */}
        {state === "expanded" && (
          <SidebarGroup>
            <div className="rounded-xl border border-white/15 bg-white/10 p-3 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-sidebar-foreground">Storage</p>
                <span className="text-xs text-sidebar-foreground/60">4.2 / 20 GB</span>
              </div>
              <div className="space-y-2">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-sidebar-foreground/60">
                    <span className="flex items-center gap-1"><HardDrive className="h-3 w-3" />Files</span>
                    <span>21%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/20 overflow-hidden">
                    <div className="h-full w-[21%] rounded-full bg-sidebar-primary" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-sidebar-foreground/60">
                    <span className="flex items-center gap-1"><Zap className="h-3 w-3" />API calls</span>
                    <span className="text-amber-400">81%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/20 overflow-hidden">
                    <div className="h-full w-[81%] rounded-full bg-amber-400" />
                  </div>
                </div>
              </div>
              <a href="/pricing" className="block w-full rounded-lg bg-white/15 hover:bg-white/25 transition-colors px-3 py-1.5 text-center text-[11px] font-medium text-sidebar-foreground">
                Upgrade Plan
              </a>
            </div>
          </SidebarGroup>
        )}
      </SidebarContent>

      {state === "expanded" && (
        <SidebarFooter>
          <div className="px-2 pb-1 text-xs text-muted-foreground">
            © 2026 {APP_NAME}
          </div>
        </SidebarFooter>
      )}

      <SidebarRail />
    </Sidebar>
  )
}

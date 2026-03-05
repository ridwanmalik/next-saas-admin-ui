"use client"

import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import ShowCard from "../_components/show-card"

const NavigationMenuPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Navigation Menu</h2>
      <p className="text-muted-foreground">A collection of links for navigating websites.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="With Dropdown" description="NavigationMenuTrigger + NavigationMenuContent for expandable sections.">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-2 p-4 w-64">
                  <NavigationMenuLink href="#" className="block rounded-md p-2 hover:bg-muted text-sm">
                    <p className="font-medium">Introduction</p>
                    <p className="text-muted-foreground text-xs">Re-usable components built using Radix UI.</p>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="#" className="block rounded-md p-2 hover:bg-muted text-sm">
                    <p className="font-medium">Installation</p>
                    <p className="text-muted-foreground text-xs">How to install dependencies and structure your app.</p>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </ShowCard>
      <ShowCard title="Plain Links" description="navigationMenuTriggerStyle() for links without a dropdown.">
        <NavigationMenu>
          <NavigationMenuList>
            {["Docs", "Components", "Blog", "GitHub"].map((label) => (
              <NavigationMenuItem key={label}>
                <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
                  {label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </ShowCard>
    </div>
  </div>
)

export default NavigationMenuPage

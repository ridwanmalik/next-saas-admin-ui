"use client"

import { useState } from "react"
import { User, CreditCard, Settings, LogOut, Users, Mail, Plus } from "lucide-react"
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent,
  DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem,
  DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuSeparator, DropdownMenuShortcut,
  DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import ShowCard from "../_components/show-card"

const DropdownMenuPage = () => {
  const [bookmarks, setBookmarks] = useState(true)
  const [urls, setUrls] = useState(false)
  const [position, setPosition] = useState("bottom")
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dropdown Menu</h2>
        <p className="text-muted-foreground">Displays a menu to the user triggered by a button.</p>
      </div>
      <div className="space-y-4">
        <ShowCard title="Default with Shortcuts">
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="outline">Open Menu</Button></DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem><User className="size-4" />Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut></DropdownMenuItem>
                <DropdownMenuItem><CreditCard className="size-4" />Billing <DropdownMenuShortcut>⌘B</DropdownMenuShortcut></DropdownMenuItem>
                <DropdownMenuItem><Settings className="size-4" />Settings <DropdownMenuShortcut>⌘,</DropdownMenuShortcut></DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive"><LogOut className="size-4" />Log out <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ShowCard>

        <ShowCard title="Checkbox Items">
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="outline">View options</Button></DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={bookmarks} onCheckedChange={setBookmarks}>
                Show Bookmarks
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={urls} onCheckedChange={setUrls}>
                Show Full URLs
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ShowCard>

        <ShowCard title="Radio Group">
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="outline">Position: {position}</Button></DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </ShowCard>

        <ShowCard title="Submenu">
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="outline">With Submenu</Button></DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem><User className="size-4" />Profile</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger><Users className="size-4" />Invite users</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem><Mail className="size-4" />Email</DropdownMenuItem>
                  <DropdownMenuItem><Plus className="size-4" />More...</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive"><LogOut className="size-4" />Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ShowCard>
      </div>
    </div>
  )
}

export default DropdownMenuPage

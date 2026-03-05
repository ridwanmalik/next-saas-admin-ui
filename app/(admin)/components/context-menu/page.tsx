"use client"

import { useState } from "react"
import {
  ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup,
  ContextMenuItem, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem,
  ContextMenuSeparator, ContextMenuShortcut,
  ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger,
} from "@/components/ui/context-menu"
import ShowCard from "../_components/show-card"

const ContextMenuPage = () => {
  const [showBookmarks, setShowBookmarks] = useState(true)
  const [showUrls, setShowUrls] = useState(false)
  const [person, setPerson] = useState("pedro")
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Context Menu</h2>
        <p className="text-muted-foreground">Displays a menu triggered by a right-click.</p>
      </div>
      <div className="space-y-4">
        <ShowCard title="Default" description="Items, separators, shortcuts, submenu, and destructive variant.">
          <ContextMenu>
            <ContextMenuTrigger className="flex h-36 w-full items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground select-none">
              Right click here
            </ContextMenuTrigger>
            <ContextMenuContent className="w-52">
              <ContextMenuGroup>
                <ContextMenuItem>Back <ContextMenuShortcut>⌘[</ContextMenuShortcut></ContextMenuItem>
                <ContextMenuItem disabled>Forward <ContextMenuShortcut>⌘]</ContextMenuShortcut></ContextMenuItem>
                <ContextMenuItem>Reload <ContextMenuShortcut>⌘R</ContextMenuShortcut></ContextMenuItem>
                <ContextMenuSub>
                  <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
                  <ContextMenuSubContent className="w-44">
                    <ContextMenuItem>Save Page...</ContextMenuItem>
                    <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuSub>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuItem variant="destructive">Remove</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </ShowCard>

        <ShowCard title="Checkbox Items" description="ContextMenuCheckboxItem for toggleable boolean options.">
          <ContextMenu>
            <ContextMenuTrigger className="flex h-28 w-full items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground select-none">
              Right click here
            </ContextMenuTrigger>
            <ContextMenuContent className="w-52">
              <ContextMenuLabel>View Options</ContextMenuLabel>
              <ContextMenuSeparator />
              <ContextMenuCheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
                Show Bookmarks Bar
              </ContextMenuCheckboxItem>
              <ContextMenuCheckboxItem checked={showUrls} onCheckedChange={setShowUrls}>
                Show Full URLs
              </ContextMenuCheckboxItem>
            </ContextMenuContent>
          </ContextMenu>
        </ShowCard>

        <ShowCard title="Radio Group" description="ContextMenuRadioGroup for mutually exclusive selection.">
          <ContextMenu>
            <ContextMenuTrigger className="flex h-28 w-full items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground select-none">
              Right click here
            </ContextMenuTrigger>
            <ContextMenuContent className="w-44">
              <ContextMenuLabel>People</ContextMenuLabel>
              <ContextMenuSeparator />
              <ContextMenuRadioGroup value={person} onValueChange={setPerson}>
                <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
                <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
                <ContextMenuRadioItem value="shadcn">shadcn</ContextMenuRadioItem>
              </ContextMenuRadioGroup>
            </ContextMenuContent>
          </ContextMenu>
        </ShowCard>
      </div>
    </div>
  )
}

export default ContextMenuPage

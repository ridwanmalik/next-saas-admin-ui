"use client"

import { useState } from "react"
import {
  Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem,
  MenubarMenu, MenubarRadioGroup, MenubarRadioItem,
  MenubarSeparator, MenubarShortcut,
  MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger,
} from "@/components/ui/menubar"
import ShowCard from "../_components/show-card"

const MenubarPage = () => {
  const [showBookmarks, setShowBookmarks] = useState(true)
  const [browser, setBrowser] = useState("chrome")
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Menubar</h2>
        <p className="text-muted-foreground">A visually persistent menu common in desktop applications.</p>
      </div>
      <div className="space-y-4">
        <ShowCard title="Default with Shortcuts">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New Tab <MenubarShortcut>⌘T</MenubarShortcut></MenubarItem>
                <MenubarItem>New Window <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Print <MenubarShortcut>⌘P</MenubarShortcut></MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Undo <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
                <MenubarItem>Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Cut <MenubarShortcut>⌘X</MenubarShortcut></MenubarItem>
                <MenubarItem>Copy <MenubarShortcut>⌘C</MenubarShortcut></MenubarItem>
                <MenubarItem>Paste <MenubarShortcut>⌘V</MenubarShortcut></MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Zoom In <MenubarShortcut>⌘+</MenubarShortcut></MenubarItem>
                <MenubarItem>Zoom Out <MenubarShortcut>⌘-</MenubarShortcut></MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>More Tools</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Extensions</MenubarItem>
                    <MenubarItem>Developer Tools</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </ShowCard>

        <ShowCard title="Checkbox + Radio Items">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>Settings</MenubarTrigger>
              <MenubarContent>
                <MenubarCheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
                  Show Bookmarks
                </MenubarCheckboxItem>
                <MenubarSeparator />
                <MenubarRadioGroup value={browser} onValueChange={setBrowser}>
                  <MenubarRadioItem value="chrome">Chrome</MenubarRadioItem>
                  <MenubarRadioItem value="firefox">Firefox</MenubarRadioItem>
                  <MenubarRadioItem value="safari">Safari</MenubarRadioItem>
                </MenubarRadioGroup>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </ShowCard>
      </div>
    </div>
  )
}

export default MenubarPage

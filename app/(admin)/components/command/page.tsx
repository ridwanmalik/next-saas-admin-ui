"use client"

import { useState } from "react"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  CreditCardIcon,
  SettingsIcon,
  UserIcon,
  CalculatorIcon,
  CalendarIcon,
  SmileIcon,
  BellIcon,
  ClipboardPasteIcon,
  CodeIcon,
  CopyIcon,
  FileTextIcon,
  FolderIcon,
  FolderPlusIcon,
  HelpCircleIcon,
  HomeIcon,
  ImageIcon,
  InboxIcon,
  LayoutGridIcon,
  ListIcon,
  PlusIcon,
  ScissorsIcon,
  TrashIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import ShowCard from "../_components/show-card"

const CommandPage = () => {
  const [openBasic, setOpenBasic] = useState(false)
  const [openShortcuts, setOpenShortcuts] = useState(false)
  const [openGroups, setOpenGroups] = useState(false)
  const [openScrollable, setOpenScrollable] = useState(false)

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Command</h2>
        <p className="text-muted-foreground">Command menu for search and quick actions.</p>
      </div>
      <div className="space-y-4">
        <ShowCard title="Hero">
          <Command className="max-w-sm rounded-lg border">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <Calendar />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <Smile />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem disabled>
                  <Calculator />
                  <span>Calculator</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>
                  <User />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <CreditCard />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Settings />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </ShowCard>

        <ShowCard title="Basic" description="A simple command menu in a dialog.">
          <div className="flex flex-col gap-4">
            <Button onClick={() => setOpenBasic(true)} variant="outline" className="w-fit">
              Open Menu
            </Button>
            <CommandDialog open={openBasic} onOpenChange={setOpenBasic}>
              <Command>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem>Calendar</CommandItem>
                    <CommandItem>Search Emoji</CommandItem>
                    <CommandItem>Calculator</CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </CommandDialog>
          </div>
        </ShowCard>

        <ShowCard title="Shortcuts">
          <div className="flex flex-col gap-4">
            <Button onClick={() => setOpenShortcuts(true)} variant="outline" className="w-fit">
              Open Menu
            </Button>
            <CommandDialog open={openShortcuts} onOpenChange={setOpenShortcuts}>
              <Command>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Settings">
                    <CommandItem>
                      <UserIcon />
                      <span>Profile</span>
                      <CommandShortcut>⌘P</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      <CreditCardIcon />
                      <span>Billing</span>
                      <CommandShortcut>⌘B</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      <SettingsIcon />
                      <span>Settings</span>
                      <CommandShortcut>⌘S</CommandShortcut>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </CommandDialog>
          </div>
        </ShowCard>

        <ShowCard title="Groups" description="A command menu with groups, icons and separators.">
          <div className="flex flex-col gap-4">
            <Button onClick={() => setOpenGroups(true)} variant="outline" className="w-fit">
              Open Menu
            </Button>
            <CommandDialog open={openGroups} onOpenChange={setOpenGroups}>
              <Command>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem>
                      <CalendarIcon />
                      <span>Calendar</span>
                    </CommandItem>
                    <CommandItem>
                      <SmileIcon />
                      <span>Search Emoji</span>
                    </CommandItem>
                    <CommandItem>
                      <CalculatorIcon />
                      <span>Calculator</span>
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Settings">
                    <CommandItem>
                      <UserIcon />
                      <span>Profile</span>
                      <CommandShortcut>⌘P</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      <CreditCardIcon />
                      <span>Billing</span>
                      <CommandShortcut>⌘B</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      <SettingsIcon />
                      <span>Settings</span>
                      <CommandShortcut>⌘S</CommandShortcut>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </CommandDialog>
          </div>
        </ShowCard>

        <ShowCard title="Scrollable" description="Scrollable command menu with multiple items.">
          <div className="flex flex-col gap-4">
            <Button onClick={() => setOpenScrollable(true)} variant="outline" className="w-fit">
              Open Menu
            </Button>
            <CommandDialog open={openScrollable} onOpenChange={setOpenScrollable}>
              <Command>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Navigation">
                    <CommandItem>
                      <HomeIcon />
                      <span>Home</span>
                      <CommandShortcut>⌘H</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      <InboxIcon />
                      <span>Inbox</span>
                      <CommandShortcut>⌘I</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      <FileTextIcon />
                      <span>Documents</span>
                      <CommandShortcut>⌘D</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      <FolderIcon />
                      <span>Folders</span>
                      <CommandShortcut>⌘F</CommandShortcut>
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Actions">
                    <CommandItem>
                      <PlusIcon />
                      <span>New File</span>
                      <CommandShortcut>⌘N</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      <FolderPlusIcon />
                      <span>New Folder</span>
                      <CommandShortcut>⇧⌘N</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      <CopyIcon />
                      <span>Copy</span>
                      <CommandShortcut>⌘C</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      <ScissorsIcon />
                      <span>Cut</span>
                      <CommandShortcut>⌘X</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      <ClipboardPasteIcon />
                      <span>Paste</span>
                      <CommandShortcut>⌘V</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      <TrashIcon />
                      <span>Delete</span>
                      <CommandShortcut>⌫</CommandShortcut>
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="View">
                    <CommandItem>
                      <LayoutGridIcon />
                      <span>Grid View</span>
                    </CommandItem>
                    <CommandItem>
                      <ListIcon />
                      <span>List View</span>
                    </CommandItem>
                    <CommandItem>
                      <ZoomInIcon />
                      <span>Zoom In</span>
                      <CommandShortcut>⌘+</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      <ZoomOutIcon />
                      <span>Zoom Out</span>
                      <CommandShortcut>⌘-</CommandShortcut>
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Account">
                    <CommandItem>
                      <UserIcon />
                      <span>Profile</span>
                      <CommandShortcut>⌘P</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      <CreditCardIcon />
                      <span>Billing</span>
                      <CommandShortcut>⌘B</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      <SettingsIcon />
                      <span>Settings</span>
                      <CommandShortcut>⌘S</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      <BellIcon />
                      <span>Notifications</span>
                    </CommandItem>
                    <CommandItem>
                      <HelpCircleIcon />
                      <span>Help & Support</span>
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Tools">
                    <CommandItem>
                      <CalculatorIcon />
                      <span>Calculator</span>
                    </CommandItem>
                    <CommandItem>
                      <CalendarIcon />
                      <span>Calendar</span>
                    </CommandItem>
                    <CommandItem>
                      <ImageIcon />
                      <span>Image Editor</span>
                    </CommandItem>
                    <CommandItem>
                      <CodeIcon />
                      <span>Code Editor</span>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </CommandDialog>
          </div>
        </ShowCard>
      </div>
    </div>
  )
}

export default CommandPage

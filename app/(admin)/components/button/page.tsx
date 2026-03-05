"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowUpRight, CircleFadingArrowUp, GitBranch, ArrowUp, ArrowLeft, MoreHorizontal,
  MailCheck, Archive, Clock, CalendarPlus, ListFilter, Tag, Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Spinner } from "@/components/ui/spinner"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator,
  DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ShowCard from "../_components/show-card"

const ButtonPage = () => {
  const [label, setLabel] = useState("personal")
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Button</h2>
        <p className="text-muted-foreground">Displays a button or a component that looks like a button.</p>
      </div>
      <div className="space-y-4">
        <ShowCard>
          <div className="flex flex-wrap items-center gap-2 md:flex-row">
            <Button variant="outline">Button</Button>
            <Button variant="outline" size="icon" aria-label="Submit">
              <ArrowUp />
            </Button>
          </div>
        </ShowCard>
        <ShowCard title="Size" description="Use the size prop to change the size of the button.">
          <div className="flex flex-col items-start gap-8 sm:flex-row">
            <div className="flex items-start gap-2">
              <Button size="xs" variant="outline">Extra Small</Button>
              <Button size="icon-xs" aria-label="Submit" variant="outline"><ArrowUpRight /></Button>
            </div>
            <div className="flex items-start gap-2">
              <Button size="sm" variant="outline">Small</Button>
              <Button size="icon-sm" aria-label="Submit" variant="outline"><ArrowUpRight /></Button>
            </div>
            <div className="flex items-start gap-2">
              <Button variant="outline">Default</Button>
              <Button size="icon" aria-label="Submit" variant="outline"><ArrowUpRight /></Button>
            </div>
            <div className="flex items-start gap-2">
              <Button variant="outline" size="lg">Large</Button>
              <Button size="icon-lg" aria-label="Submit" variant="outline"><ArrowUpRight /></Button>
            </div>
          </div>
        </ShowCard>

        <ShowCard title="Default"><Button>Button</Button></ShowCard>

        <ShowCard title="Outline"><Button variant="outline">Outline</Button></ShowCard>

        <ShowCard title="Secondary"><Button variant="secondary">Secondary</Button></ShowCard>

        <ShowCard title="Ghost"><Button variant="ghost">Ghost</Button></ShowCard>

        <ShowCard title="Destructive"><Button variant="destructive">Destructive</Button></ShowCard>

        <ShowCard title="Link"><Button variant="link">Link</Button></ShowCard>

        <ShowCard title="Icon">
          <Button variant="outline" size="icon">
            <CircleFadingArrowUp />
          </Button>
        </ShowCard>

        <ShowCard title="With Icon" description='Remember to add the data-icon="inline-start" or data-icon="inline-end" attribute to the icon for the correct spacing.'>
          <Button variant="outline" size="sm">
            <GitBranch /> New Branch
          </Button>
        </ShowCard>

        <ShowCard title="Rounded" description="Use the rounded-full class to make the button rounded.">
          <div className="flex flex-col gap-8">
            <Button variant="outline" size="icon" className="rounded-full">
              <ArrowUp />
            </Button>
          </div>
        </ShowCard>

        <ShowCard title="Spinner" description='Render a Spinner component inside the button to show a loading state. Remember to add the data-icon="inline-start" or data-icon="inline-end" attribute to the spinner for the correct spacing.'>
          <div className="flex gap-2">
            <Button variant="outline" disabled>
              <Spinner data-icon="inline-start" />
              Generating
            </Button>
            <Button variant="secondary" disabled>
              Downloading
              <Spinner data-icon="inline-start" />
            </Button>
          </div>
        </ShowCard>

        <ShowCard title="Button Group" description="To create a button group, use the ButtonGroup component. See the Button Group documentation for more details.">
          <ButtonGroup>
            <ButtonGroup className="hidden sm:flex">
              <Button variant="outline" size="icon" aria-label="Go Back">
                <ArrowLeft />
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="outline">Archive</Button>
              <Button variant="outline">Report</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="outline">Snooze</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="More Options">
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuGroup>
                    <DropdownMenuItem><MailCheck />Mark as Read</DropdownMenuItem>
                    <DropdownMenuItem><Archive />Archive</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem><Clock />Snooze</DropdownMenuItem>
                    <DropdownMenuItem><CalendarPlus />Add to Calendar</DropdownMenuItem>
                    <DropdownMenuItem><ListFilter />Add to List</DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger><Tag />Label As...</DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup value={label} onValueChange={setLabel}>
                          <DropdownMenuRadioItem value="personal">Personal</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="work">Work</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="other">Other</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive"><Trash2 />Trash</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
          </ButtonGroup>
        </ShowCard>

        <ShowCard title="Link" description="You can use the asChild prop on Button to make another component look like a button. Here is an example of a link that looks like a button.">
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </ShowCard>
      </div>
    </div>
  )
}

export default ButtonPage

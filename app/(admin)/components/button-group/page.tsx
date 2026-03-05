"use client"

import { useState } from "react"
import {
  Plus, Minus, AudioLines, ChevronDown, VolumeOff, Check, AlertTriangle,
  UserRoundX, Share, Copy, Trash, ArrowRight, Bot,
  ArrowLeft, MoreHorizontal, MailCheck, Archive, Clock, CalendarPlus, ListFilter, Tag, Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator,
  DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription, PopoverTrigger,
} from "@/components/ui/popover"
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectTrigger,
} from "@/components/ui/select"
import ShowCard from "../_components/show-card"

const ButtonGroupPage = () => {
  const [label, setLabel] = useState("personal")
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [currency, setCurrency] = useState("$")
  const CURRENCIES = [
    { value: "$", label: "US Dollar" },
    { value: "€", label: "Euro" },
    { value: "£", label: "British Pound" },
  ]
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Button Group</h2>
        <p className="text-muted-foreground">A container that groups related buttons together with consistent styling.</p>
      </div>
      <div className="space-y-4">
        <ShowCard>
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
        <ShowCard title="Orientation" description="Set the orientation prop to change the button group layout.">
          <ButtonGroup
            orientation="vertical"
            aria-label="Media controls"
            className="h-fit"
          >
            <Button variant="outline" size="icon">
              <Plus />
            </Button>
            <Button variant="outline" size="icon">
              <Minus />
            </Button>
          </ButtonGroup>
        </ShowCard>

        <ShowCard title="Size" description="Control the size of buttons using the size prop on individual buttons.">
          <div className="flex flex-col items-start gap-8">
            <ButtonGroup>
              <Button variant="outline" size="sm">Small</Button>
              <Button variant="outline" size="sm">Button</Button>
              <Button variant="outline" size="sm">Group</Button>
              <Button variant="outline" size="icon-sm">
                <Plus />
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="outline">Default</Button>
              <Button variant="outline">Button</Button>
              <Button variant="outline">Group</Button>
              <Button variant="outline" size="icon">
                <Plus />
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="outline" size="lg">Large</Button>
              <Button variant="outline" size="lg">Button</Button>
              <Button variant="outline" size="lg">Group</Button>
              <Button variant="outline" size="icon-lg">
                <Plus />
              </Button>
            </ButtonGroup>
          </div>
        </ShowCard>

        <ShowCard title="Nested" description="Nest ButtonGroup components to create button groups with spacing.">
          <ButtonGroup>
            <ButtonGroup>
              <Button variant="outline" size="icon">
                <Plus />
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <InputGroup>
                <InputGroupInput placeholder="Send a message..." />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InputGroupAddon align="inline-end">
                      <AudioLines />
                    </InputGroupAddon>
                  </TooltipTrigger>
                  <TooltipContent>Voice Mode</TooltipContent>
                </Tooltip>
              </InputGroup>
            </ButtonGroup>
          </ButtonGroup>
        </ShowCard>

        <ShowCard title="Separator" description="The ButtonGroupSeparator component visually divides buttons within a group. Buttons with variant outline do not need a separator since they have a border. For other variants, a separator is recommended to improve the visual hierarchy.">
          <ButtonGroup>
            <Button variant="secondary" size="sm">Copy</Button>
            <ButtonGroupSeparator />
            <Button variant="secondary" size="sm">Paste</Button>
          </ButtonGroup>
        </ShowCard>

        <ShowCard title="Split" description="Create a split button group by adding two buttons separated by a ButtonGroupSeparator.">
          <ButtonGroup>
            <Button variant="secondary">Button</Button>
            <ButtonGroupSeparator />
            <Button size="icon" variant="secondary">
              <Plus />
            </Button>
          </ButtonGroup>
        </ShowCard>

        <ShowCard title="Input" description="Wrap an Input component with buttons.">
          <ButtonGroup>
            <Input placeholder="Search..." />
            <Button variant="outline" aria-label="Search">
              <Plus />
            </Button>
          </ButtonGroup>
        </ShowCard>

        <ShowCard title="Input Group" description="Wrap an InputGroup component to create complex input layouts.">
          <ButtonGroup className="[--radius:9999rem]">
            <ButtonGroup>
              <Button variant="outline" size="icon">
                <Plus />
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <InputGroup>
                <InputGroupInput
                  placeholder={voiceEnabled ? "Record and send audio..." : "Send a message..."}
                  disabled={voiceEnabled}
                />
                <InputGroupAddon align="inline-end">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InputGroupButton
                        onClick={() => setVoiceEnabled(!voiceEnabled)}
                        size="icon-xs"
                        data-active={voiceEnabled}
                        className="data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700 dark:data-[active=true]:bg-orange-800 dark:data-[active=true]:text-orange-100"
                        aria-pressed={voiceEnabled}
                      >
                        <AudioLines />
                      </InputGroupButton>
                    </TooltipTrigger>
                    <TooltipContent>Voice Mode</TooltipContent>
                  </Tooltip>
                </InputGroupAddon>
              </InputGroup>
            </ButtonGroup>
          </ButtonGroup>
        </ShowCard>

        <ShowCard title="Dropdown Menu" description="Create a split button group with a DropdownMenu component.">
          <ButtonGroup>
            <Button variant="outline">Follow</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="pl-2!">
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuGroup>
                  <DropdownMenuItem><VolumeOff />Mute Conversation</DropdownMenuItem>
                  <DropdownMenuItem><Check />Mark as Read</DropdownMenuItem>
                  <DropdownMenuItem><AlertTriangle />Report Conversation</DropdownMenuItem>
                  <DropdownMenuItem><UserRoundX />Block User</DropdownMenuItem>
                  <DropdownMenuItem><Share />Share Conversation</DropdownMenuItem>
                  <DropdownMenuItem><Copy />Copy Conversation</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem variant="destructive"><Trash />Delete Conversation</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
        </ShowCard>

        <ShowCard title="Select" description="Pair with a Select component.">
          <ButtonGroup>
            <ButtonGroup>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="font-mono">{currency}</SelectTrigger>
                <SelectContent className="min-w-24">
                  <SelectGroup>
                    {CURRENCIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.value} <span className="text-muted-foreground">{c.label}</span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input placeholder="10.00" pattern="[0-9]*" />
            </ButtonGroup>
            <ButtonGroup>
              <Button aria-label="Send" size="icon" variant="outline">
                <ArrowRight />
              </Button>
            </ButtonGroup>
          </ButtonGroup>
        </ShowCard>

        <ShowCard title="Popover" description="Use with a Popover component.">
          <ButtonGroup>
            <Button variant="outline">
              <Bot /> Copilot
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open Popover">
                  <ChevronDown />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="rounded-xl text-sm">
                <PopoverHeader>
                  <PopoverTitle>Start a new task with Copilot</PopoverTitle>
                  <PopoverDescription>
                    Describe your task in natural language.
                  </PopoverDescription>
                </PopoverHeader>
                <Field>
                  <FieldLabel htmlFor="task" className="sr-only">
                    Task Description
                  </FieldLabel>
                  <Textarea
                    id="task"
                    placeholder="I need to..."
                    className="resize-none"
                  />
                  <FieldDescription>
                    Copilot will open a pull request for review.
                  </FieldDescription>
                </Field>
              </PopoverContent>
            </Popover>
          </ButtonGroup>
        </ShowCard>
      </div>
    </div>
  )
}

export default ButtonGroupPage

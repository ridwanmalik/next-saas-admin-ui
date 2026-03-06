"use client"

import {
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  CreditCardIcon,
  FileCodeIcon,
  InfoIcon,
  LoaderIcon,
  MailIcon,
  MoreHorizontal,
  RefreshCwIcon,
  SearchIcon,
  StarIcon,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Spinner } from "@/components/ui/spinner"
import ShowCard from "../_components/show-card"

const InputGroupPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Input Group</h2>
      <p className="text-muted-foreground">
        Combine inputs with addons, buttons, and icons in a unified control.
      </p>
    </div>
    <div className="space-y-4">
      <ShowCard>
        <InputGroup className="max-w-xs">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
        </InputGroup>
      </ShowCard>

      <ShowCard title="inline-start">
        <Field className="max-w-sm">
          <FieldLabel htmlFor="inline-start-input">Input</FieldLabel>
          <InputGroup>
            <InputGroupInput id="inline-start-input" placeholder="Search..." />
            <InputGroupAddon align="inline-start">
              <SearchIcon className="text-muted-foreground" />
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>Icon positioned at the start.</FieldDescription>
        </Field>
      </ShowCard>

      <ShowCard title="inline-end">
        <Field className="max-w-sm">
          <FieldLabel htmlFor="inline-end-input">Input</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="inline-end-input"
              type="password"
              placeholder="Enter password"
            />
            <InputGroupAddon align="inline-end">
              <InfoIcon />
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>Icon positioned at the end.</FieldDescription>
        </Field>
      </ShowCard>

      <ShowCard title="block-start">
        <FieldGroup className="max-w-sm">
          <Field>
            <FieldLabel htmlFor="block-start-input">Input</FieldLabel>
            <InputGroup className="h-auto">
              <InputGroupInput
                id="block-start-input"
                placeholder="Enter your name"
              />
              <InputGroupAddon align="block-start">
                <InputGroupText>Full Name</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription>Header positioned above the input.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="block-start-textarea">Textarea</FieldLabel>
            <InputGroup>
              <InputGroupTextarea
                id="block-start-textarea"
                placeholder="console.log('Hello, world!');"
                className="font-mono text-sm"
              />
              <InputGroupAddon align="block-start">
                <FileCodeIcon className="text-muted-foreground" />
                <InputGroupText className="font-mono">script.js</InputGroupText>
                <InputGroupButton size="icon-xs" className="ml-auto">
                  <CopyIcon />
                  <span className="sr-only">Copy</span>
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription>Header positioned above the textarea.</FieldDescription>
          </Field>
        </FieldGroup>
      </ShowCard>

      <ShowCard title="block-end">
        <FieldGroup className="max-w-sm">
          <Field>
            <FieldLabel htmlFor="block-end-input">Input</FieldLabel>
            <InputGroup className="h-auto">
              <InputGroupInput id="block-end-input" placeholder="Enter amount" />
              <InputGroupAddon align="block-end">
                <InputGroupText>USD</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription>Footer positioned below the input.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="block-end-textarea">Textarea</FieldLabel>
            <InputGroup>
              <InputGroupTextarea
                id="block-end-textarea"
                placeholder="Write a comment..."
              />
              <InputGroupAddon align="block-end">
                <InputGroupText>0/280</InputGroupText>
                <InputGroupButton variant="default" size="sm" className="ml-auto">
                  Post
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription>Footer positioned below the textarea.</FieldDescription>
          </Field>
        </FieldGroup>
      </ShowCard>

      <ShowCard title="Icon">
        <div className="grid w-full max-w-sm gap-6">
          <InputGroup>
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupInput type="email" placeholder="Enter your email" />
            <InputGroupAddon>
              <MailIcon />
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupInput placeholder="Card number" />
            <InputGroupAddon>
              <CreditCardIcon />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <CheckIcon />
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupInput placeholder="Card number" />
            <InputGroupAddon align="inline-end">
              <StarIcon />
              <InfoIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </ShowCard>

      <ShowCard title="Text">
        <div className="grid w-full max-w-sm gap-6">
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>$</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="0.00" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>USD</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>https://</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="example.com" className="pl-0.5!" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>.com</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupInput placeholder="Enter your username" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>@company.com</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupTextarea placeholder="Enter your message" />
            <InputGroupAddon align="block-end">
              <InputGroupText className="text-xs text-muted-foreground">
                120 characters left
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </ShowCard>

      <ShowCard title="Button">
        <div className="grid w-full max-w-sm gap-4">
          <InputGroup>
            <InputGroupInput placeholder="https://x.com/shadcn" readOnly />
            <InputGroupAddon align="inline-end">
              <InputGroupButton aria-label="Copy" title="Copy" size="icon-xs">
                <CopyIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup className="[--radius:9999px]">
            <Popover>
              <PopoverTrigger asChild>
                <InputGroupAddon>
                  <InputGroupButton variant="secondary" size="icon-xs">
                    <InfoIcon />
                  </InputGroupButton>
                </InputGroupAddon>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="flex flex-col gap-1 rounded-xl text-sm"
              >
                <p className="font-medium">Your connection is not secure.</p>
                <p>You should not enter any sensitive information on this site.</p>
              </PopoverContent>
            </Popover>
            <InputGroupAddon className="pl-1.5 text-muted-foreground">
              https://
            </InputGroupAddon>
            <InputGroupInput id="input-secure-19" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="icon-xs">
                <StarIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupInput placeholder="Type to search..." />
            <InputGroupAddon align="inline-end">
              <InputGroupButton variant="secondary">Search</InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </ShowCard>

      <ShowCard title="Kbd">
        <InputGroup className="max-w-sm">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <SearchIcon className="text-muted-foreground" />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Kbd>⌘K</Kbd>
          </InputGroupAddon>
        </InputGroup>
      </ShowCard>

      <ShowCard title="Dropdown">
        <div className="grid w-full max-w-sm gap-4">
          <InputGroup>
            <InputGroupInput placeholder="Enter file name" />
            <InputGroupAddon align="inline-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <InputGroupButton
                    variant="ghost"
                    aria-label="More"
                    size="icon-xs"
                  >
                    <MoreHorizontal />
                  </InputGroupButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Copy path</DropdownMenuItem>
                    <DropdownMenuItem>Open location</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup className="[--radius:1rem]">
            <InputGroupInput placeholder="Enter search query" />
            <InputGroupAddon align="inline-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <InputGroupButton variant="ghost" className="pr-1.5! text-xs">
                    Search In... <ChevronDownIcon className="size-3" />
                  </InputGroupButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="[--radius:0.95rem]">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Documentation</DropdownMenuItem>
                    <DropdownMenuItem>Blog Posts</DropdownMenuItem>
                    <DropdownMenuItem>Changelog</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </ShowCard>

      <ShowCard title="Spinner">
        <div className="grid w-full max-w-sm gap-4">
          <InputGroup>
            <InputGroupInput placeholder="Searching..." />
            <InputGroupAddon align="inline-end">
              <Spinner />
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupInput placeholder="Processing..." />
            <InputGroupAddon>
              <Spinner />
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupInput placeholder="Saving changes..." />
            <InputGroupAddon align="inline-end">
              <InputGroupText>Saving...</InputGroupText>
              <Spinner />
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupInput placeholder="Refreshing data..." />
            <InputGroupAddon>
              <LoaderIcon className="animate-spin" />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <InputGroupText className="text-muted-foreground">
                Please wait...
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </ShowCard>

      <ShowCard title="Textarea">
        <div className="grid w-full max-w-md gap-4">
          <InputGroup>
            <InputGroupTextarea
              id="textarea-code-32"
              placeholder="console.log('Hello, world!');"
              className="min-h-[200px]"
            />
            <InputGroupAddon align="block-end" className="border-t">
              <InputGroupText>Line 1, Column 1</InputGroupText>
              <InputGroupButton size="sm" className="ml-auto" variant="default">
                Run
              </InputGroupButton>
            </InputGroupAddon>
            <InputGroupAddon align="block-start" className="border-b">
              <InputGroupText className="font-mono font-medium">
                script.js
              </InputGroupText>
              <InputGroupButton className="ml-auto" size="icon-xs">
                <RefreshCwIcon />
              </InputGroupButton>
              <InputGroupButton variant="ghost" size="icon-xs">
                <CopyIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </ShowCard>
    </div>
  </div>
)

export default InputGroupPage

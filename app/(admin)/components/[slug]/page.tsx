"use client"

import { use, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Bold, Italic, Underline,
  AlignLeft, AlignCenter, AlignRight,
  Plus, Loader2, Search, Mail, Download,
  Check, User, Terminal, Info, CalendarIcon,
  ChevronRight, Home, Settings, LogOut,
  CreditCard, Cloud, Github, Keyboard,
  Users, LifeBuoy, Bluetooth, Trash2, Bell, BadgeCheck, ArrowUpRight, Dot,
  ArrowUp, ArrowLeft, MoreHorizontal, Archive, Clock, Tag,
  Minus, AudioLines, ChevronDown, VolumeX, Share2, Copy,
  UserX, AlertTriangle, Bot, MailCheck, CalendarPlus, ListFilter,
} from "lucide-react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import type { DateRange } from "react-day-picker"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import {
  Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { addDays } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Combobox, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput,
  ComboboxItem, ComboboxLabel, ComboboxList, ComboboxSeparator,
  ComboboxChips, ComboboxChip, ComboboxChipsInput,
} from "@/components/ui/combobox"
import {
  Command, CommandDialog, CommandEmpty, CommandGroup,
  CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut,
} from "@/components/ui/command"
import {
  ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup,
  ContextMenuItem, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem,
  ContextMenuSeparator, ContextMenuShortcut,
  ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer, DrawerClose, DrawerContent, DrawerDescription,
  DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent,
  DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem,
  DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuSeparator, DropdownMenuShortcut,
  DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import {
  Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia,
} from "@/components/ui/empty"
import {
  Field, FieldLabel, FieldDescription, FieldError, FieldGroup,
  FieldSet, FieldContent, FieldTitle,
} from "@/components/ui/field"
import {
  Item, ItemMedia, ItemContent, ItemActions, ItemGroup,
  ItemSeparator, ItemTitle, ItemDescription, ItemHeader,
} from "@/components/ui/item"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { NativeSelect, NativeSelectOption, NativeSelectOptGroup } from "@/components/ui/native-select"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"
import {
  Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem,
  MenubarMenu, MenubarRadioGroup, MenubarRadioItem,
  MenubarSeparator, MenubarShortcut,
  MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger,
} from "@/components/ui/menubar"
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Pagination, PaginationContent, PaginationEllipsis,
  PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverTrigger, PopoverHeader, PopoverTitle, PopoverDescription } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Select, SelectContent, SelectGroup, SelectItem,
  SelectLabel, SelectSeparator, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Sheet, SheetClose, SheetContent, SheetDescription,
  SheetFooter, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  Table, TableBody, TableCaption, TableCell,
  TableFooter, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import type { ChartConfig } from "@/components/ui/chart"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

// ─── Helper ───────────────────────────────────────────────────────────────────

function ShowCard({
  title, description, children, className,
}: {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className={cn(
        "relative flex min-h-[300px] w-full items-center justify-center rounded-xl border p-10",
        "*:data-[slot=accordion]:w-full *:data-[slot=accordion]:max-w-sm",
        className
      )}>
        {children}
      </div>
    </div>
  )
}

// ─── Calendar Timezone helper (uses useEffect — must be a real component) ─────
function CalendarWithTimezone({
  date, setDate,
}: { date: Date | undefined; setDate: (d: Date | undefined) => void }) {
  const [timeZone, setTimeZone] = useState<string | undefined>(undefined)
  useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }, [])
  return (
    <Calendar mode="single" selected={date} onSelect={setDate} timeZone={timeZone} className="rounded-lg border w-fit" />
  )
}

// ─── Showcases ────────────────────────────────────────────────────────────────

const SHOWCASES: Record<string, {
  title: string
  description: string
  Content: React.ComponentType
}> = {

  // ── Accordion ──────────────────────────────────────────────────────────────
  accordion: {
    title: "Accordion",
    description: "A vertically stacked set of interactive headings that each reveal a section of content.",
    Content: () => {
      const items = [
        { value: "q1", trigger: "Is it accessible?", content: "Yes. It adheres to the WAI-ARIA design pattern." },
        { value: "q2", trigger: "Is it styled?", content: "Yes. It comes with default styles that match the other components." },
        { value: "q3", trigger: "Is it animated?", content: "Yes. It's animated by default, but you can disable it if you prefer." },
      ]
      return (
        <div className="space-y-4">
          <ShowCard title="Basic" description="type='single' — only one item open at a time.">
            <Accordion type="single" collapsible defaultValue="q1" className="w-full">
              {items.map((i) => (
                <AccordionItem key={i.value} value={i.value}>
                  <AccordionTrigger>{i.trigger}</AccordionTrigger>
                  <AccordionContent>{i.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ShowCard>

          <ShowCard title="Multiple" description="type='multiple' — many items can be open simultaneously.">
            <Accordion type="multiple" defaultValue={["q1", "q2"]} className="w-full">
              {items.map((i) => (
                <AccordionItem key={i.value} value={i.value}>
                  <AccordionTrigger>{i.trigger}</AccordionTrigger>
                  <AccordionContent>{i.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ShowCard>

          <ShowCard title="Disabled" description="Individual items can be disabled.">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="q1">
                <AccordionTrigger>Available item</AccordionTrigger>
                <AccordionContent>This item can be opened and closed.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2" disabled>
                <AccordionTrigger>Disabled item</AccordionTrigger>
                <AccordionContent>This is not reachable.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger>Another available item</AccordionTrigger>
                <AccordionContent>This item can be opened and closed.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </ShowCard>

          <ShowCard title="Borders" description="Add a border around the entire accordion.">
            <Accordion type="single" collapsible className="w-full rounded-lg border">
              {items.map((i) => (
                <AccordionItem key={i.value} value={i.value} className="px-4">
                  <AccordionTrigger>{i.trigger}</AccordionTrigger>
                  <AccordionContent>{i.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ShowCard>

          <ShowCard title="Card" description="Wrap the accordion inside a Card component.">
            <Card className="w-full max-w-sm border-dashed shadow-none">
              <CardHeader>
                <CardTitle>FAQ</CardTitle>
                <CardDescription>Frequently asked questions.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                  {items.map((i) => (
                    <AccordionItem key={i.value} value={i.value} className="px-6">
                      <AccordionTrigger>{i.trigger}</AccordionTrigger>
                      <AccordionContent>{i.content}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </ShowCard>
        </div>
      )
    },
  },

  // ── Alert ─────────────────────────────────────────────────────────────────
  alert: {
    title: "Alert",
    description: "Displays a callout for user attention.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Basic">
          <Alert>
            <Info className="size-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
          </Alert>
        </ShowCard>
        <ShowCard title="Destructive">
          <Alert variant="destructive">
            <Terminal className="size-4" />
            <AlertTitle>Payment failed</AlertTitle>
            <AlertDescription>Your payment could not be processed. Please check your payment method and try again.</AlertDescription>
          </Alert>
        </ShowCard>
        <ShowCard title="Action">
          <Alert className="relative">
            <Info className="size-4" />
            <AlertTitle>Dark mode is now available</AlertTitle>
            <AlertDescription>Enable it under your profile settings to get started.</AlertDescription>
            <AlertAction>
              <Button size="sm" variant="outline">Enable</Button>
            </AlertAction>
          </Alert>
        </ShowCard>
        <ShowCard title="Custom Colors">
          <Alert className="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
            <Info className="size-4" />
            <AlertTitle>Your subscription will expire in 3 days.</AlertTitle>
            <AlertDescription>Renew now to avoid service interruption or upgrade to a paid plan.</AlertDescription>
          </Alert>
        </ShowCard>
      </div>
    ),
  },

  // ── Alert Dialog ──────────────────────────────────────────────────────────
  "alert-dialog": {
    title: "Alert Dialog",
    description: "A modal dialog that interrupts the user with important content and expects a response.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Basic">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </ShowCard>

        <ShowCard title="Small" description='size="sm" on AlertDialogContent.'>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </ShowCard>

        <ShowCard title="Media" description="AlertDialogMedia renders an icon area inside the header.">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogMedia>
                  <Bluetooth />
                </AlertDialogMedia>
                <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
                <AlertDialogDescription>
                  Do you want to allow the USB accessory to connect to this device?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
                <AlertDialogAction>Allow</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </ShowCard>

        <ShowCard title="Small with Media">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogMedia>
                  <Bluetooth />
                </AlertDialogMedia>
                <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
                <AlertDialogDescription>
                  Do you want to allow the USB accessory to connect to this device?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
                <AlertDialogAction>Allow</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </ShowCard>

        <ShowCard title="Destructive" description="AlertDialogMedia + AlertDialogAction with destructive variant.">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Chat</Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20">
                  <Trash2 />
                </AlertDialogMedia>
                <AlertDialogTitle>Delete chat?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete this chat conversation. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </ShowCard>
      </div>
    ),
  },

  // ── Aspect Ratio ──────────────────────────────────────────────────────────
  "aspect-ratio": {
    title: "Aspect Ratio",
    description: "Displays content within a desired ratio.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="16 / 9" description="Standard widescreen ratio.">
          <div className="max-w-sm">
            <AspectRatio ratio={16 / 9}>
              <div className="size-full rounded-md bg-muted flex items-center justify-center text-muted-foreground text-sm font-medium">16 / 9</div>
            </AspectRatio>
          </div>
        </ShowCard>
        <ShowCard title="1 / 1 — Square" description="Equal width and height, great for thumbnails.">
          <div className="max-w-[200px]">
            <AspectRatio ratio={1 / 1}>
              <div className="size-full rounded-md bg-primary/10 flex items-center justify-center text-muted-foreground text-sm font-medium">1 / 1</div>
            </AspectRatio>
          </div>
        </ShowCard>
        <ShowCard title="9 / 16 — Portrait" description="Vertical orientation for mobile screenshots.">
          <div className="max-w-[120px]">
            <AspectRatio ratio={9 / 16}>
              <div className="size-full rounded-md bg-secondary flex items-center justify-center text-muted-foreground text-sm font-medium">9 / 16</div>
            </AspectRatio>
          </div>
        </ShowCard>
      </div>
    ),
  },

  // ── Avatar ────────────────────────────────────────────────────────────────
  avatar: {
    title: "Avatar",
    description: "An image element with a fallback for representing a user or entity.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Basic" description="With image and fallback (shown when image fails to load).">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="grayscale" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="/broken.jpg" alt="broken" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </ShowCard>

        <ShowCard title="Badge" description="AvatarBadge for online/status indicators.">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
          </Avatar>
        </ShowCard>

        <ShowCard title="Badge with Icon" description="Embed an icon inside AvatarBadge.">
          <Avatar className="grayscale">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
            <AvatarBadge><Plus /></AvatarBadge>
          </Avatar>
        </ShowCard>

        <ShowCard title="Avatar Group" description="Stacked avatars with ring overlap.">
          <AvatarGroup className="grayscale">
            {[
              { src: "https://github.com/shadcn.png", alt: "@shadcn", fb: "CN" },
              { src: "https://github.com/maxleiter.png", alt: "@maxleiter", fb: "LR" },
              { src: "https://github.com/evilrabbit.png", alt: "@evilrabbit", fb: "ER" },
            ].map((a) => (
              <Avatar key={a.alt}>
                <AvatarImage src={a.src} alt={a.alt} />
                <AvatarFallback>{a.fb}</AvatarFallback>
              </Avatar>
            ))}
          </AvatarGroup>
        </ShowCard>

        <ShowCard title="Avatar Group Count" description="AvatarGroupCount shows the overflow number.">
          <AvatarGroup className="grayscale">
            {[
              { src: "https://github.com/shadcn.png", alt: "@shadcn", fb: "CN" },
              { src: "https://github.com/maxleiter.png", alt: "@maxleiter", fb: "LR" },
              { src: "https://github.com/evilrabbit.png", alt: "@evilrabbit", fb: "ER" },
            ].map((a) => (
              <Avatar key={a.alt}>
                <AvatarImage src={a.src} alt={a.alt} />
                <AvatarFallback>{a.fb}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount>+3</AvatarGroupCount>
          </AvatarGroup>
        </ShowCard>

        <ShowCard title="Avatar Group with Icon" description="AvatarGroupCount with an icon instead of text.">
          <AvatarGroup className="grayscale">
            {[
              { src: "https://github.com/shadcn.png", alt: "@shadcn", fb: "CN" },
              { src: "https://github.com/maxleiter.png", alt: "@maxleiter", fb: "LR" },
              { src: "https://github.com/evilrabbit.png", alt: "@evilrabbit", fb: "ER" },
            ].map((a) => (
              <Avatar key={a.alt}>
                <AvatarImage src={a.src} alt={a.alt} />
                <AvatarFallback>{a.fb}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount><Plus /></AvatarGroupCount>
          </AvatarGroup>
        </ShowCard>

        <ShowCard title="Sizes" description="sm, default, lg via the size prop.">
          <div className="flex items-end gap-6">
            {(["sm", "default", "lg"] as const).map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Avatar size={size} className="grayscale">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">{size}</span>
              </div>
            ))}
          </div>
        </ShowCard>

        <ShowCard title="Dropdown" description="Avatar as a DropdownMenu trigger.">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Avatar className="grayscale">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem><BadgeCheck className="size-4" />Account</DropdownMenuItem>
                <DropdownMenuItem><CreditCard className="size-4" />Billing</DropdownMenuItem>
                <DropdownMenuItem><Bell className="size-4" />Notifications</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem><LogOut className="size-4" />Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ShowCard>
      </div>
    ),
  },

  // ── Badge ─────────────────────────────────────────────────────────────────
  badge: {
    title: "Badge",
    description: "Displays a small status descriptor or count.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Variants">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="ghost">Ghost</Badge>
            <Badge variant="link">Link</Badge>
          </div>
        </ShowCard>

        <ShowCard title="With Icon">
          <div className="flex flex-wrap items-center gap-3">
            <Badge><Check />Verified</Badge>
            <Badge variant="secondary"><User />Member</Badge>
            <Badge variant="destructive"><Trash2 />Suspended</Badge>
            <Badge variant="outline"><Bell />Notifications</Badge>
          </div>
        </ShowCard>

        <ShowCard title="With Spinner" description="Spinner inside Badge for loading/processing states.">
          <div className="flex flex-wrap items-center gap-3">
            <Badge><Spinner data-icon="inline-start" />Syncing</Badge>
            <Badge variant="secondary"><Spinner data-icon="inline-start" />Updating</Badge>
            <Badge variant="outline"><Spinner data-icon="inline-start" />Processing</Badge>
            <Badge variant="destructive"><Spinner data-icon="inline-start" />Deleting</Badge>
          </div>
        </ShowCard>

        <ShowCard title="Link" description="Badge rendered as an anchor using asChild.">
          <Badge asChild>
            <a href="#">Open Link <ArrowUpRight data-icon="inline-end" /></a>
          </Badge>
        </ShowCard>

        <ShowCard title="Custom Colors" description="Override colors via className with Tailwind.">
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">Blue</Badge>
            <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">Green</Badge>
            <Badge className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">Sky</Badge>
            <Badge className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">Purple</Badge>
            <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">Red</Badge>
          </div>
        </ShowCard>
      </div>
    ),
  },

  // ── Breadcrumb ────────────────────────────────────────────────────────────
  breadcrumb: {
    title: "Breadcrumb",
    description: "Displays the path to the current resource using a hierarchy of links.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Basic">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </ShowCard>

        <ShowCard title="Custom Separator" description="Pass any element as children of BreadcrumbSeparator.">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator><Dot /></BreadcrumbSeparator>
              <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator><Dot /></BreadcrumbSeparator>
              <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </ShowCard>

        <ShowCard title="Dropdown" description="DropdownMenu inside a BreadcrumbItem for sibling-level navigation.">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon-sm" variant="ghost">
                      <BreadcrumbEllipsis />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Documentation</DropdownMenuItem>
                      <DropdownMenuItem>Themes</DropdownMenuItem>
                      <DropdownMenuItem>GitHub</DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </ShowCard>

        <ShowCard title="Collapsed" description="BreadcrumbEllipsis collapses a long navigation trail.">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </ShowCard>

        <ShowCard title="Link Component" description="BreadcrumbLink asChild with Next.js Link for client-side routing.">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link href="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link href="/components">Components</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </ShowCard>
      </div>
    ),
  },

  // ── Button ────────────────────────────────────────────────────────────────
  button: {
    title: "Button",
    description: "Triggers an action or event, such as submitting a form or opening a dialog.",
    Content: () => {
      const [label, setLabel] = useState("personal")
      return (
        <div className="space-y-4">
          <ShowCard title="Size" description="xs, sm, default, lg — each with an icon-only counterpart.">
            <div className="flex flex-wrap items-start gap-6">
              {([
                { size: "xs" as const, icon: "icon-xs" as const, label: "Extra Small" },
                { size: "sm" as const, icon: "icon-sm" as const, label: "Small" },
                { size: "default" as const, icon: "icon" as const, label: "Default" },
                { size: "lg" as const, icon: "icon-lg" as const, label: "Large" },
              ]).map(({ size, icon, label }) => (
                <div key={size} className="flex items-start gap-2">
                  <Button size={size} variant="outline">{label}</Button>
                  <Button size={icon} variant="outline" aria-label={icon}><ArrowUpRight /></Button>
                </div>
              ))}
            </div>
          </ShowCard>

          <ShowCard title="Default"><Button>Default</Button></ShowCard>

          <ShowCard title="Outline"><Button variant="outline">Outline</Button></ShowCard>

          <ShowCard title="Secondary"><Button variant="secondary">Secondary</Button></ShowCard>

          <ShowCard title="Ghost"><Button variant="ghost">Ghost</Button></ShowCard>

          <ShowCard title="Destructive"><Button variant="destructive">Destructive</Button></ShowCard>

          <ShowCard title="Link"><Button variant="link">Link</Button></ShowCard>

          <ShowCard title="Icon" description="Square icon-only button using size='icon'.">
            <div className="flex flex-wrap items-center gap-3">
              <Button size="icon" aria-label="search"><Search /></Button>
              <Button size="icon" variant="outline" aria-label="mail"><Mail /></Button>
              <Button size="icon" variant="ghost" aria-label="plus"><Plus /></Button>
              <Button size="icon" variant="secondary" aria-label="download"><Download /></Button>
            </div>
          </ShowCard>

          <ShowCard title="With Icon">
            <div className="flex flex-wrap items-center gap-3">
              <Button><Plus />Add Item</Button>
              <Button variant="outline"><Mail />Send Email</Button>
              <Button variant="secondary"><Download />Export</Button>
              <Button variant="destructive"><Trash2 />Delete</Button>
            </div>
          </ShowCard>

          <ShowCard title="Rounded" description="rounded-full via className.">
            <div className="flex flex-wrap items-center gap-3">
              <Button className="rounded-full">Get Started</Button>
              <Button variant="outline" size="icon" className="rounded-full" aria-label="up"><ArrowUp /></Button>
            </div>
          </ShowCard>

          <ShowCard title="Spinner" description="Spinner inside a disabled button for loading states.">
            <div className="flex flex-wrap items-center gap-3">
              <Button disabled size="sm"><Spinner data-icon="inline-start" />Loading...</Button>
              <Button variant="outline" disabled size="sm"><Spinner data-icon="inline-start" />Please wait</Button>
              <Button variant="secondary" disabled size="sm"><Spinner data-icon="inline-start" />Processing</Button>
            </div>
          </ShowCard>

          <ShowCard title="Button Group" description="ButtonGroup clusters buttons with shared borders.">
            <ButtonGroup>
              <Button variant="outline" size="icon" aria-label="Go Back"><ArrowLeft /></Button>
              <Button variant="outline">Archive</Button>
              <Button variant="outline">Report</Button>
              <Button variant="outline">Snooze</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="More"><MoreHorizontal /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuGroup>
                    <DropdownMenuItem><Archive className="size-4" />Archive</DropdownMenuItem>
                    <DropdownMenuItem><Clock className="size-4" />Snooze</DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger><Tag className="size-4" />Label As...</DropdownMenuSubTrigger>
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
                  <DropdownMenuItem variant="destructive"><Trash2 className="size-4" />Trash</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
          </ShowCard>

          <ShowCard title="Link" description="asChild with Next.js Link — button styling on a real anchor.">
            <Button asChild>
              <Link href="#">Login</Link>
            </Button>
          </ShowCard>
        </div>
      )
    },
  },

  // ── Button Group ──────────────────────────────────────────────────────────
  "button-group": {
    title: "Button Group",
    description: "Clusters buttons together with shared borders and consistent sizing.",
    Content: () => {
      const [voiceEnabled, setVoiceEnabled] = useState(false)
      const [currency, setCurrency] = useState("$")
      const [bgLabel, setBgLabel] = useState("personal")
      const CURRENCIES = [
        { value: "$", label: "US Dollar" },
        { value: "€", label: "Euro" },
        { value: "£", label: "British Pound" },
      ]
      return (
        <div className="space-y-4">
          <ShowCard title="Orientation" description="horizontal (default) and vertical via orientation prop.">
            <div className="flex items-start gap-6">
              <ButtonGroup>
                <Button variant="outline">Left</Button>
                <Button variant="outline">Center</Button>
                <Button variant="outline">Right</Button>
              </ButtonGroup>
              <ButtonGroup orientation="vertical" className="h-fit">
                <Button variant="outline" size="icon" aria-label="plus"><Plus /></Button>
                <Button variant="outline" size="icon" aria-label="minus"><Minus /></Button>
              </ButtonGroup>
            </div>
          </ShowCard>

          <ShowCard title="Size" description="Control size via size prop on individual buttons.">
            <div className="flex flex-col items-start gap-4">
              <ButtonGroup>
                <Button variant="outline" size="sm">Small</Button>
                <Button variant="outline" size="sm">Button</Button>
                <Button variant="outline" size="sm">Group</Button>
                <Button variant="outline" size="icon-sm" aria-label="plus"><Plus /></Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button variant="outline">Default</Button>
                <Button variant="outline">Button</Button>
                <Button variant="outline">Group</Button>
                <Button variant="outline" size="icon" aria-label="plus"><Plus /></Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button variant="outline" size="lg">Large</Button>
                <Button variant="outline" size="lg">Button</Button>
                <Button variant="outline" size="lg">Group</Button>
                <Button variant="outline" size="icon-lg" aria-label="plus"><Plus /></Button>
              </ButtonGroup>
            </div>
          </ShowCard>

          <ShowCard title="Nested" description="ButtonGroups can be nested for complex layouts.">
            <ButtonGroup className="[--radius:9999rem]">
              <ButtonGroup>
                <Button variant="outline" size="icon" aria-label="plus"><Plus /></Button>
              </ButtonGroup>
              <ButtonGroup>
                <InputGroup>
                  <InputGroupInput placeholder={voiceEnabled ? "Record and send audio..." : "Send a message..."} disabled={voiceEnabled} />
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

          <ShowCard title="Separator" description="ButtonGroupSeparator adds a visual divider inside the group.">
            <ButtonGroup>
              <Button variant="secondary">Publish</Button>
              <ButtonGroupSeparator />
              <Button size="icon" variant="secondary" aria-label="options"><ChevronDown /></Button>
            </ButtonGroup>
          </ShowCard>

          <ShowCard title="Split" description="Primary action + dropdown split with ButtonGroupSeparator.">
            <ButtonGroup>
              <Button variant="outline">Follow</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="px-2" aria-label="more options"><ChevronDown /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuGroup>
                    <DropdownMenuItem><VolumeX className="size-4" />Mute</DropdownMenuItem>
                    <DropdownMenuItem><Check className="size-4" />Mark as Read</DropdownMenuItem>
                    <DropdownMenuItem><Share2 className="size-4" />Share</DropdownMenuItem>
                    <DropdownMenuItem><Copy className="size-4" />Copy</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive"><Trash2 className="size-4" />Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
          </ShowCard>

          <ShowCard title="Input" description="Input and Button side by side in a ButtonGroup.">
            <ButtonGroup>
              <Input placeholder="Search..." />
              <Button variant="outline" aria-label="search"><Search /></Button>
            </ButtonGroup>
          </ShowCard>

          <ShowCard title="Input Group" description="InputGroup nested inside a ButtonGroup with addons.">
            <ButtonGroup>
              <ButtonGroup>
                <Button variant="outline" size="icon" aria-label="attach"><Plus /></Button>
              </ButtonGroup>
              <ButtonGroup>
                <InputGroup>
                  <InputGroupInput placeholder="Send a message..." />
                  <InputGroupAddon align="inline-end">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InputGroupButton size="icon-xs" aria-label="voice"><AudioLines /></InputGroupButton>
                      </TooltipTrigger>
                      <TooltipContent>Voice Mode</TooltipContent>
                    </Tooltip>
                  </InputGroupAddon>
                </InputGroup>
              </ButtonGroup>
            </ButtonGroup>
          </ShowCard>

          <ShowCard title="Dropdown Menu" description="ButtonGroup with nested DropdownMenu trigger.">
            <ButtonGroup>
              <ButtonGroup>
                <Button variant="outline" size="icon" aria-label="back"><ArrowLeft /></Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button variant="outline">Archive</Button>
                <Button variant="outline">Report</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button variant="outline">Snooze</Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" aria-label="more"><MoreHorizontal /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuGroup>
                      <DropdownMenuItem><MailCheck className="size-4" />Mark as Read</DropdownMenuItem>
                      <DropdownMenuItem><Archive className="size-4" />Archive</DropdownMenuItem>
                      <DropdownMenuItem><Clock className="size-4" />Snooze</DropdownMenuItem>
                      <DropdownMenuItem><CalendarPlus className="size-4" />Add to Calendar</DropdownMenuItem>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger><Tag className="size-4" />Label As...</DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          <DropdownMenuRadioGroup value={bgLabel} onValueChange={setBgLabel}>
                            <DropdownMenuRadioItem value="personal">Personal</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="work">Work</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="other">Other</DropdownMenuRadioItem>
                          </DropdownMenuRadioGroup>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive"><Trash2 className="size-4" />Trash</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ButtonGroup>
            </ButtonGroup>
          </ShowCard>

          <ShowCard title="Select" description="Select + Input + Button in a ButtonGroup for currency input.">
            <ButtonGroup>
              <ButtonGroup>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="font-mono">{currency}</SelectTrigger>
                  <SelectContent className="min-w-24">
                    {CURRENCIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.value} <span className="text-muted-foreground">{c.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input placeholder="10.00" pattern="[0-9]*" />
              </ButtonGroup>
              <ButtonGroup>
                <Button variant="outline" size="icon" aria-label="send"><ArrowUpRight /></Button>
              </ButtonGroup>
            </ButtonGroup>
          </ShowCard>

          <ShowCard title="Popover" description="ButtonGroup trigger opening a Popover panel.">
            <ButtonGroup>
              <Button variant="outline"><Bot className="size-4" />Copilot</Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="open popover"><ChevronDown /></Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-72">
                  <PopoverHeader>
                    <PopoverTitle>Start a new task with Copilot</PopoverTitle>
                    <PopoverDescription>Describe your task in natural language.</PopoverDescription>
                  </PopoverHeader>
                  <Textarea placeholder="I need to..." className="resize-none mt-3" rows={3} />
                </PopoverContent>
              </Popover>
            </ButtonGroup>
          </ShowCard>
        </div>
      )
    },
  },

  // ── Calendar ──────────────────────────────────────────────────────────────
  calendar: {
    title: "Calendar",
    description: "A date field component that allows users to enter and edit date.",
    Content: () => {
      const [date, setDate] = useState<Date | undefined>(new Date())
      const [rangeDate, setRangeDate] = useState<DateRange | undefined>({
        from: new Date(new Date().getFullYear(), 0, 12),
        to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
      })
      const [presetDate, setPresetDate] = useState<Date | undefined>(new Date())
      const [presetMonth, setPresetMonth] = useState<Date>(new Date())
      const [weekDate, setWeekDate] = useState<Date | undefined>(new Date())
      const [tzDate, setTzDate] = useState<Date | undefined>(undefined)
      return (
        <div className="space-y-4">
          <ShowCard title="Single" description="Basic single-date picker with dropdown caption layout.">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              captionLayout="dropdown"
              className="rounded-lg border w-fit"
            />
          </ShowCard>
          <ShowCard title="Range" description="Select a date range across two months.">
            <Calendar
              mode="range"
              defaultMonth={rangeDate?.from}
              selected={rangeDate}
              onSelect={setRangeDate}
              numberOfMonths={2}
              className="rounded-lg border w-fit"
            />
          </ShowCard>
          <ShowCard title="With Date Presets" description="Quick-select buttons synced with the calendar month.">
            <Card className="w-fit max-w-[300px] gap-0">
              <CardContent>
                <Calendar
                  mode="single"
                  selected={presetDate}
                  onSelect={setPresetDate}
                  month={presetMonth}
                  onMonthChange={setPresetMonth}
                  fixedWeeks
                  className="p-0 [--cell-size:--spacing(9.5)]"
                />
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2 border-t">
                {[
                  { label: "Today", value: 0 },
                  { label: "Tomorrow", value: 1 },
                  { label: "In 3 days", value: 3 },
                  { label: "In a week", value: 7 },
                  { label: "In 2 weeks", value: 14 },
                ].map((preset) => (
                  <Button
                    key={preset.value}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      const newDate = addDays(new Date(), preset.value)
                      setPresetDate(newDate)
                      setPresetMonth(new Date(newDate.getFullYear(), newDate.getMonth(), 1))
                    }}
                  >
                    {preset.label}
                  </Button>
                ))}
              </CardFooter>
            </Card>
          </ShowCard>
          <ShowCard title="With Week Numbers" description="Shows ISO week numbers alongside the date grid.">
            <Calendar
              mode="single"
              selected={weekDate}
              onSelect={setWeekDate}
              showWeekNumber
              className="rounded-lg border w-fit"
            />
          </ShowCard>
          <ShowCard title="With Timezone" description="Timezone-aware picker using the user's local timezone.">
            <CalendarWithTimezone date={tzDate} setDate={setTzDate} />
          </ShowCard>
        </div>
      )
    },
  },

  // ── Card ──────────────────────────────────────────────────────────────────
  card: {
    title: "Card",
    description: "Displays a card with header, content, and footer.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Anatomy" description="Header · Title · Description · CardAction · Content · Footer">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-dashed shadow-none">
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Optional description text.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Card content — any content goes here.</p>
              </CardContent>
            </Card>
            <Card className="border-dashed shadow-none">
              <CardHeader>
                <CardTitle>With Footer</CardTitle>
                <CardDescription>Includes action buttons below.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Card body with supporting text.</p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button size="sm">Confirm</Button>
                <Button size="sm" variant="outline">Cancel</Button>
              </CardFooter>
            </Card>
          </div>
        </ShowCard>
        <ShowCard title="With Form" description="Common pattern for settings or login cards.">
          <Card className="border-dashed shadow-none max-w-sm">
            <CardHeader>
              <CardTitle>Create account</CardTitle>
              <CardDescription>Enter your details below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-2">
                <Label htmlFor="card-name">Name</Label>
                <Input id="card-name" placeholder="John Doe" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="card-email">Email</Label>
                <Input id="card-email" type="email" placeholder="john@example.com" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Sign up</Button>
            </CardFooter>
          </Card>
        </ShowCard>
      </div>
    ),
  },

  // ── Carousel ──────────────────────────────────────────────────────────────
  carousel: {
    title: "Carousel",
    description: "A carousel with motion and swipe built using Embla.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Horizontal (Default)">
          <Carousel className="w-full max-w-sm mx-auto">
            <CarouselContent>
              {Array.from({ length: 5 }, (_, i) => (
                <CarouselItem key={i}>
                  <Card className="border-dashed shadow-none">
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-semibold">{i + 1}</span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </ShowCard>
        <ShowCard title="Vertical">
          <Carousel orientation="vertical" className="w-full max-w-xs mx-auto">
            <CarouselContent className="h-48">
              {Array.from({ length: 5 }, (_, i) => (
                <CarouselItem key={i}>
                  <Card className="border-dashed shadow-none">
                    <CardContent className="flex items-center justify-center p-6">
                      <span className="text-2xl font-semibold">{i + 1}</span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </ShowCard>
        <ShowCard title="Multiple Items (basis-1/3)" description="Show 3 items at a time.">
          <Carousel className="w-full max-w-sm mx-auto">
            <CarouselContent>
              {Array.from({ length: 6 }, (_, i) => (
                <CarouselItem key={i} className="basis-1/3">
                  <Card className="border-dashed shadow-none">
                    <CardContent className="flex aspect-square items-center justify-center p-2">
                      <span className="font-semibold">{i + 1}</span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </ShowCard>
      </div>
    ),
  },

  // ── Chart ─────────────────────────────────────────────────────────────────
  chart: {
    title: "Chart",
    description: "Beautiful charts built using Recharts. Supports bar, line, area, pie, radar, radial, and more.",
    Content: () => {
      const monthlyData = [
        { month: "Jan", desktop: 186, mobile: 80 },
        { month: "Feb", desktop: 305, mobile: 200 },
        { month: "Mar", desktop: 237, mobile: 120 },
        { month: "Apr", desktop: 73, mobile: 190 },
        { month: "May", desktop: 209, mobile: 130 },
        { month: "Jun", desktop: 214, mobile: 140 },
      ]
      const barConfig = {
        desktop: { label: "Desktop", color: "var(--chart-1)" },
      } satisfies ChartConfig
      const lineConfig = {
        desktop: { label: "Desktop", color: "var(--chart-1)" },
        mobile: { label: "Mobile", color: "var(--chart-2)" },
      } satisfies ChartConfig
      const areaConfig = {
        desktop: { label: "Desktop", color: "var(--chart-1)" },
        mobile: { label: "Mobile", color: "var(--chart-2)" },
      } satisfies ChartConfig
      return (
        <div className="space-y-4">
          <ShowCard title="Bar Chart" description="Wrap Recharts in ChartContainer and pass a ChartConfig for theming.">
            <ChartContainer config={barConfig} className="h-[200px] w-full">
              <BarChart data={monthlyData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              </BarChart>
            </ChartContainer>
          </ShowCard>

          <ShowCard title="Line Chart" description="Multiple series with ChartTooltipContent.">
            <ChartContainer config={lineConfig} className="h-[200px] w-full">
              <LineChart data={monthlyData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
                <Line dataKey="mobile" type="monotone" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </ShowCard>

          <ShowCard title="Area Chart" description="Stacked area chart with fill opacity.">
            <ChartContainer config={areaConfig} className="h-[200px] w-full">
              <AreaChart data={monthlyData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area dataKey="mobile" type="natural" fill="var(--color-mobile)" fillOpacity={0.4} stroke="var(--color-mobile)" stackId="a" />
                <Area dataKey="desktop" type="natural" fill="var(--color-desktop)" fillOpacity={0.4} stroke="var(--color-desktop)" stackId="a" />
              </AreaChart>
            </ChartContainer>
          </ShowCard>
        </div>
      )
    },
  },

  // ── Checkbox ──────────────────────────────────────────────────────────────
  checkbox: {
    title: "Checkbox",
    description: "A control that allows the user to toggle between checked and not checked.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="States">
          <div className="flex flex-col gap-3">
            {[
              { id: "cb-u", label: "Unchecked", checked: false as const, disabled: false },
              { id: "cb-c", label: "Checked", checked: true as const, disabled: false },
              { id: "cb-d", label: "Disabled", checked: false as const, disabled: true },
              { id: "cb-dc", label: "Checked + Disabled", checked: true as const, disabled: true },
            ].map(({ id, label, checked, disabled }) => (
              <div key={id} className="flex items-center gap-2">
                <Checkbox id={id} defaultChecked={checked} disabled={disabled} />
                <Label htmlFor={id} className={disabled ? "text-muted-foreground" : ""}>{label}</Label>
              </div>
            ))}
          </div>
        </ShowCard>
        <ShowCard title="Indeterminate" description="Used in select-all table row patterns.">
          <div className="flex items-center gap-2">
            <Checkbox id="cb-indet" checked="indeterminate" />
            <Label htmlFor="cb-indet">Select all</Label>
          </div>
        </ShowCard>
        <ShowCard title="With Description">
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-2">
              <Checkbox id="terms" className="mt-0.5" defaultChecked />
              <div>
                <Label htmlFor="terms">Accept terms and conditions</Label>
                <p className="text-xs text-muted-foreground">You agree to our Terms of Service and Privacy Policy.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Checkbox id="marketing" className="mt-0.5" />
              <div>
                <Label htmlFor="marketing">Marketing emails</Label>
                <p className="text-xs text-muted-foreground">Receive emails about new products and features.</p>
              </div>
            </div>
          </div>
        </ShowCard>
      </div>
    ),
  },

  // ── Collapsible ───────────────────────────────────────────────────────────
  collapsible: {
    title: "Collapsible",
    description: "An interactive component which expands/collapses a panel.",
    Content: () => {
      const [open, setOpen] = useState(false)
      return (
        <div className="space-y-4">
          <ShowCard title="Basic" description="Uncontrolled — state managed internally.">
            <Collapsible className="w-full space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Details</p>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="icon-sm"><ChevronRight className="size-4 transition-transform data-[state=open]:rotate-90" /></Button>
                </CollapsibleTrigger>
              </div>
              <div className="rounded-md border px-4 py-3 text-sm">This item is always visible.</div>
              <CollapsibleContent className="space-y-2">
                <div className="rounded-md border px-4 py-3 text-sm text-muted-foreground">Hidden item 1 — revealed on expand.</div>
                <div className="rounded-md border px-4 py-3 text-sm text-muted-foreground">Hidden item 2 — revealed on expand.</div>
              </CollapsibleContent>
            </Collapsible>
          </ShowCard>
          <ShowCard title="Controlled" description="open + onOpenChange for external state.">
            <Collapsible open={open} onOpenChange={setOpen} className="w-full space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Starred repositories (3)</p>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="icon-sm">
                    <ChevronRight className={`size-4 transition-transform ${open ? "rotate-90" : ""}`} />
                  </Button>
                </CollapsibleTrigger>
              </div>
              <div className="rounded-md border px-4 py-3 text-sm font-mono">@radix-ui/primitives</div>
              <CollapsibleContent className="space-y-2">
                <div className="rounded-md border px-4 py-3 text-sm font-mono">@radix-ui/colors</div>
                <div className="rounded-md border px-4 py-3 text-sm font-mono">@stitches/react</div>
              </CollapsibleContent>
            </Collapsible>
          </ShowCard>
        </div>
      )
    },
  },

  // ── Combobox ──────────────────────────────────────────────────────────────
  combobox: {
    title: "Combobox",
    description: "Autocomplete input with a filterable list of suggestions.",
    Content: () => {
      const FRAMEWORKS = [
        { value: "next", label: "Next.js" },
        { value: "react", label: "React" },
        { value: "vue", label: "Vue" },
        { value: "nuxt", label: "Nuxt.js" },
        { value: "svelte", label: "SvelteKit" },
        { value: "astro", label: "Astro" },
      ]
      return (
        <div className="space-y-4">
          <ShowCard title="Basic">
            <Combobox>
              <ComboboxInput placeholder="Select framework..." className="w-52" />
              <ComboboxContent>
                <ComboboxList>
                  {FRAMEWORKS.map((f) => (
                    <ComboboxItem key={f.value} value={f.value}>{f.label}</ComboboxItem>
                  ))}
                  <ComboboxEmpty>No framework found.</ComboboxEmpty>
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </ShowCard>
          <ShowCard title="Groups">
            <Combobox>
              <ComboboxInput placeholder="Select technology..." className="w-52" />
              <ComboboxContent>
                <ComboboxList>
                  <ComboboxGroup>
                    <ComboboxLabel>Frontend</ComboboxLabel>
                    <ComboboxItem value="react">React</ComboboxItem>
                    <ComboboxItem value="vue">Vue</ComboboxItem>
                    <ComboboxItem value="svelte">Svelte</ComboboxItem>
                  </ComboboxGroup>
                  <ComboboxSeparator />
                  <ComboboxGroup>
                    <ComboboxLabel>Backend</ComboboxLabel>
                    <ComboboxItem value="node">Node.js</ComboboxItem>
                    <ComboboxItem value="django">Django</ComboboxItem>
                    <ComboboxItem value="rails">Rails</ComboboxItem>
                  </ComboboxGroup>
                  <ComboboxEmpty>No results found.</ComboboxEmpty>
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </ShowCard>
          <ShowCard title="Multiple">
            <Combobox multiple>
              <ComboboxInput placeholder="Select frameworks..." showClear className="w-64" />
              <ComboboxContent>
                <ComboboxList>
                  {FRAMEWORKS.map((f) => (
                    <ComboboxItem key={f.value} value={f.value}>{f.label}</ComboboxItem>
                  ))}
                  <ComboboxEmpty>No framework found.</ComboboxEmpty>
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </ShowCard>
          <ShowCard title="Disabled">
            <Combobox disabled>
              <ComboboxInput placeholder="Disabled combobox" className="w-52" />
              <ComboboxContent>
                <ComboboxList>
                  <ComboboxItem value="a">Option A</ComboboxItem>
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </ShowCard>
        </div>
      )
    },
  },

  // ── Command ───────────────────────────────────────────────────────────────
  command: {
    title: "Command",
    description: "Fast, composable command menu for React.",
    Content: () => {
      const [open, setOpen] = useState(false)
      return (
        <div className="space-y-4">
          <ShowCard title="Basic">
            <Command className="rounded-lg border shadow-md max-w-sm">
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem><CalendarIcon className="size-4" />Calendar</CommandItem>
                  <CommandItem><Search className="size-4" />Search</CommandItem>
                  <CommandItem><Settings className="size-4" />Settings</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                  <CommandItem><User className="size-4" />Profile</CommandItem>
                  <CommandItem><Mail className="size-4" />Notifications</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </ShowCard>
          <ShowCard title="With Shortcuts">
            <Command className="rounded-lg border shadow-md max-w-sm">
              <CommandInput placeholder="Search..." />
              <CommandList>
                <CommandGroup heading="Actions">
                  <CommandItem><Plus className="size-4" />New File <CommandShortcut>⌘N</CommandShortcut></CommandItem>
                  <CommandItem><Search className="size-4" />Find <CommandShortcut>⌘F</CommandShortcut></CommandItem>
                  <CommandItem><Settings className="size-4" />Settings <CommandShortcut>⌘,</CommandShortcut></CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </ShowCard>
          <ShowCard title="Dialog" description="Opens as a keyboard-accessible palette via ⌘K.">
            <>
              <Button variant="outline" onClick={() => setOpen(true)}>
                <Keyboard className="size-4" />Open Command Dialog
                <CommandShortcut>⌘K</CommandShortcut>
              </Button>
              <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem onSelect={() => setOpen(false)}><CalendarIcon className="size-4" />Calendar</CommandItem>
                    <CommandItem onSelect={() => setOpen(false)}><Search className="size-4" />Search</CommandItem>
                    <CommandItem onSelect={() => setOpen(false)}><Settings className="size-4" />Settings</CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Settings">
                    <CommandItem onSelect={() => setOpen(false)}><User className="size-4" />Profile <CommandShortcut>⌘P</CommandShortcut></CommandItem>
                    <CommandItem onSelect={() => setOpen(false)}><Mail className="size-4" />Notifications</CommandItem>
                  </CommandGroup>
                </CommandList>
              </CommandDialog>
            </>
          </ShowCard>
        </div>
      )
    },
  },

  // ── Context Menu ──────────────────────────────────────────────────────────
  "context-menu": {
    title: "Context Menu",
    description: "Displays a menu triggered by a right-click.",
    Content: () => {
      const [showBookmarks, setShowBookmarks] = useState(true)
      const [showUrls, setShowUrls] = useState(false)
      const [person, setPerson] = useState("pedro")
      return (
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
      )
    },
  },

  // ── Date Picker ───────────────────────────────────────────────────────────
  "date-picker": {
    title: "Date Picker",
    description: "A date picker composed from Popover and Calendar.",
    Content: () => {
      const [date, setDate] = useState<Date | undefined>()
      const [range, setRange] = useState<DateRange | undefined>()
      const [presetDate, setPresetDate] = useState<Date | undefined>()
      const PRESETS = [
        { label: "Today", days: 0 },
        { label: "Yesterday", days: -1 },
        { label: "Last 7 days", days: -7 },
        { label: "Last 30 days", days: -30 },
      ]
      return (
        <div className="space-y-4">
          <ShowCard title="Basic">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 size-4" />
                  {date ? date.toLocaleDateString() : <span className="text-muted-foreground">Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
            </Popover>
          </ShowCard>
          <ShowCard title="Range Picker">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[300px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 size-4" />
                  {range?.from ? (
                    range.to
                      ? <>{range.from.toLocaleDateString()} – {range.to.toLocaleDateString()}</>
                      : range.from.toLocaleDateString()
                  ) : <span className="text-muted-foreground">Pick a date range</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />
              </PopoverContent>
            </Popover>
          </ShowCard>
          <ShowCard title="With Presets" description="Combine Select quick-picks with a Calendar for manual selection.">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 size-4" />
                  {presetDate ? presetDate.toLocaleDateString() : <span className="text-muted-foreground">Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="flex flex-col gap-0">
                  <div className="flex flex-wrap gap-1 p-3 pb-0">
                    {PRESETS.map(({ label, days }) => (
                      <Button
                        key={label}
                        variant={presetDate?.toDateString() === addDays(new Date(), days).toDateString() ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPresetDate(addDays(new Date(), days))}
                        className="text-xs h-7"
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                  <Calendar mode="single" selected={presetDate} onSelect={setPresetDate} />
                </div>
              </PopoverContent>
            </Popover>
          </ShowCard>
        </div>
      )
    },
  },

  // ── Dialog ────────────────────────────────────────────────────────────────
  dialog: {
    title: "Dialog",
    description: "A window overlaid on either the primary window or another dialog window.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Default">
          <Dialog>
            <DialogTrigger asChild><Button variant="outline">Open Dialog</Button></DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-2">
                <div className="grid gap-2"><Label htmlFor="d-name">Name</Label><Input id="d-name" defaultValue="John Doe" /></div>
                <div className="grid gap-2"><Label htmlFor="d-email">Email</Label><Input id="d-email" type="email" defaultValue="john@example.com" /></div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </ShowCard>

        <ShowCard title="Share Link" description="Copy-to-clipboard pattern inside a Dialog.">
          <Dialog>
            <DialogTrigger asChild><Button variant="outline"><Share2 />Share</Button></DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share link</DialogTitle>
                <DialogDescription>Anyone with the link can view this resource.</DialogDescription>
              </DialogHeader>
              <div className="flex items-center gap-2">
                <Input defaultValue="https://ui.shadcn.com/docs/installation" readOnly className="flex-1" />
                <Button size="icon" variant="outline" aria-label="Copy"><Copy className="size-4" /></Button>
              </div>
              <DialogFooter>
                <DialogClose asChild><Button variant="outline">Done</Button></DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </ShowCard>

        <ShowCard title="Scrollable Content" description="Long content scrolls inside the dialog body.">
          <Dialog>
            <DialogTrigger asChild><Button variant="outline">Open Scrollable</Button></DialogTrigger>
            <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Terms of Service</DialogTitle>
                <DialogDescription>Please read our terms carefully.</DialogDescription>
              </DialogHeader>
              <div className="space-y-3 py-2 text-sm text-muted-foreground">
                {Array.from({ length: 8 }, (_, i) => (
                  <p key={i}>Section {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                ))}
              </div>
              <DialogFooter>
                <DialogClose asChild><Button variant="outline">Decline</Button></DialogClose>
                <Button>Accept</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </ShowCard>
      </div>
    ),
  },

  // ── Drawer ────────────────────────────────────────────────────────────────
  drawer: {
    title: "Drawer",
    description: "A drawer component for React, built on top of Vaul.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Directions" description="Supports top, right, bottom (default), and left.">
          <div className="flex flex-wrap gap-3">
            {(["bottom", "top", "left", "right"] as const).map((dir) => (
              <Drawer key={dir} direction={dir}>
                <DrawerTrigger asChild>
                  <Button variant="outline" className="capitalize">{dir}</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                      <DrawerTitle>Drawer ({dir})</DrawerTitle>
                      <DrawerDescription>This drawer slides in from the {dir}.</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                      <Button>Submit</Button>
                      <DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
            ))}
          </div>
        </ShowCard>
      </div>
    ),
  },

  // ── Dropdown Menu ─────────────────────────────────────────────────────────
  "dropdown-menu": {
    title: "Dropdown Menu",
    description: "Displays a menu to the user triggered by a button.",
    Content: () => {
      const [bookmarks, setBookmarks] = useState(true)
      const [urls, setUrls] = useState(false)
      const [position, setPosition] = useState("bottom")
      return (
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
      )
    },
  },

  // ── Empty ─────────────────────────────────────────────────────────────────
  empty: {
    title: "Empty",
    description: "A structured placeholder shown when there is no data to display.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Basic">
          <Empty className="w-full max-w-sm rounded-xl border p-8">
            <EmptyHeader>
              <EmptyMedia><Search className="size-6 text-muted-foreground" /></EmptyMedia>
              <EmptyTitle>No results found</EmptyTitle>
              <EmptyDescription>Try adjusting your search or filters.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button size="sm" variant="outline">Clear filters</Button>
            </EmptyContent>
          </Empty>
        </ShowCard>
        <ShowCard title="With Avatar">
          <Empty className="w-full max-w-sm rounded-xl border p-8">
            <EmptyHeader>
              <EmptyMedia>
                <Avatar className="size-12">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </EmptyMedia>
              <EmptyTitle>No team members</EmptyTitle>
              <EmptyDescription>Invite people to collaborate on this project.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button size="sm"><Plus />Invite member</Button>
            </EmptyContent>
          </Empty>
        </ShowCard>
        <ShowCard title="Minimal">
          <Empty className="w-full max-w-sm p-8">
            <EmptyHeader>
              <EmptyTitle>No notifications</EmptyTitle>
              <EmptyDescription>You're all caught up! Check back later.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        </ShowCard>
      </div>
    ),
  },

  // ── Field ─────────────────────────────────────────────────────────────────
  field: {
    title: "Field",
    description: "Combines labels, controls, and help text to compose accessible form fields.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Input">
          <Field className="w-full max-w-sm">
            <FieldLabel>Email address</FieldLabel>
            <FieldContent>
              <Input type="email" placeholder="you@example.com" />
            </FieldContent>
            <FieldDescription>We'll never share your email.</FieldDescription>
          </Field>
        </ShowCard>
        <ShowCard title="With Error">
          <Field className="w-full max-w-sm">
            <FieldLabel>Username</FieldLabel>
            <FieldContent>
              <Input placeholder="johndoe" aria-invalid />
            </FieldContent>
            <FieldError>Username is already taken.</FieldError>
          </Field>
        </ShowCard>
        <ShowCard title="Checkbox & Switch">
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <Field orientation="horizontal">
              <FieldContent>
                <Checkbox id="field-cb" />
              </FieldContent>
              <FieldLabel htmlFor="field-cb">Accept terms and conditions</FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <FieldContent>
                <Switch id="field-sw" />
              </FieldContent>
              <FieldLabel htmlFor="field-sw">Enable notifications</FieldLabel>
            </Field>
          </div>
        </ShowCard>
        <ShowCard title="Fieldset">
          <FieldSet className="w-full max-w-sm rounded-lg border p-4">
            <FieldTitle>Notifications</FieldTitle>
            <FieldDescription className="mb-3">Choose how you want to be notified.</FieldDescription>
            <FieldGroup>
              <Field orientation="horizontal">
                <FieldContent><Checkbox id="fs-email" defaultChecked /></FieldContent>
                <FieldLabel htmlFor="fs-email">Email</FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <FieldContent><Checkbox id="fs-push" /></FieldContent>
                <FieldLabel htmlFor="fs-push">Push notifications</FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
        </ShowCard>
      </div>
    ),
  },

  // ── Form ──────────────────────────────────────────────────────────────────
  form: {
    title: "Form",
    description: "Building forms with react-hook-form and field composition.",
    Content: () => {
      const form = useForm({ defaultValues: { username: "", email: "" } })
      return (
        <ShowCard title="Field Composition">
          <Form {...form}>
            <form className="space-y-4 max-w-sm">
              <FormField control={form.control} name="username" render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl><Input placeholder="johndoe" {...field} /></FormControl>
                  <FormDescription>Your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </ShowCard>
      )
    },
  },

  // ── Hover Card ────────────────────────────────────────────────────────────
  "hover-card": {
    title: "Hover Card",
    description: "For sighted users to preview content available behind a link.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Default">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link">@shadcn</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-72">
              <div className="flex gap-3">
                <Avatar><AvatarFallback>SC</AvatarFallback></Avatar>
                <div>
                  <p className="text-sm font-semibold">@shadcn</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Building accessible component systems for the web.</p>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <CalendarIcon className="size-3" />Joined December 2021
                  </p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </ShowCard>
        <ShowCard title="Positions" description="side prop: top, right, bottom, left.">
          <div className="flex flex-wrap gap-3">
            {(["top", "right", "bottom", "left"] as const).map((side) => (
              <HoverCard key={side} openDelay={100} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <Button variant="outline" size="sm" className="capitalize">{side}</Button>
                </HoverCardTrigger>
                <HoverCardContent side={side} className="w-40 text-sm">
                  Appears on the <strong>{side}</strong>.
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </ShowCard>
      </div>
    ),
  },

  // ── Input ─────────────────────────────────────────────────────────────────
  input: {
    title: "Input",
    description: "Displays a form input field or a component that looks like an input field.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Types">
          <div className="grid max-w-sm gap-3">
            <Input type="text" placeholder="Text" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Input type="number" placeholder="Number" />
            <Input type="file" />
          </div>
        </ShowCard>
        <ShowCard title="States">
          <div className="grid max-w-sm gap-3">
            <Input placeholder="Default" />
            <Input placeholder="Disabled" disabled />
            <Input placeholder="Invalid" aria-invalid="true" />
          </div>
        </ShowCard>
        <ShowCard title="With Label">
          <div className="grid max-w-sm gap-2">
            <Label htmlFor="i-email">Email address</Label>
            <Input id="i-email" type="email" placeholder="you@example.com" />
          </div>
        </ShowCard>
        <ShowCard title="With Button" description="Common search or subscribe pattern.">
          <div className="flex max-w-sm gap-2">
            <Input placeholder="Search..." />
            <Button type="submit"><Search /></Button>
          </div>
        </ShowCard>
      </div>
    ),
  },

  // ── Input Group ───────────────────────────────────────────────────────────
  "input-group": {
    title: "Input Group",
    description: "Combine inputs with addons, buttons, and icons in a unified control.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Addon">
          <div className="flex flex-col gap-3">
            <InputGroup className="w-64">
              <InputGroupAddon>https://</InputGroupAddon>
              <InputGroupInput placeholder="example.com" />
            </InputGroup>
            <InputGroup className="w-64">
              <InputGroupInput placeholder="username" />
              <InputGroupAddon>@example.com</InputGroupAddon>
            </InputGroup>
          </div>
        </ShowCard>
        <ShowCard title="Icon Addon">
          <div className="flex flex-col gap-3">
            <InputGroup className="w-64">
              <InputGroupAddon><Search className="size-4 text-muted-foreground" /></InputGroupAddon>
              <InputGroupInput placeholder="Search..." />
            </InputGroup>
            <InputGroup className="w-64">
              <InputGroupAddon><Mail className="size-4 text-muted-foreground" /></InputGroupAddon>
              <InputGroupInput type="email" placeholder="Email address" />
            </InputGroup>
          </div>
        </ShowCard>
        <ShowCard title="Button">
          <div className="flex flex-col gap-3">
            <InputGroup className="w-64">
              <InputGroupInput placeholder="Search..." />
              <InputGroupButton variant="default">Search</InputGroupButton>
            </InputGroup>
            <InputGroup className="w-64">
              <InputGroupInput placeholder="Enter URL" />
              <InputGroupButton variant="outline"><Copy className="size-4" /></InputGroupButton>
            </InputGroup>
          </div>
        </ShowCard>
      </div>
    ),
  },

  // ── Input OTP ─────────────────────────────────────────────────────────────
  "input-otp": {
    title: "Input OTP",
    description: "Accessible one-time password component with copy/paste support.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="6-digit (with separator)">
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} /><InputOTPSlot index={1} /><InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} /><InputOTPSlot index={4} /><InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </ShowCard>
        <ShowCard title="4-digit">
          <InputOTP maxLength={4}>
            <InputOTPGroup>
              <InputOTPSlot index={0} /><InputOTPSlot index={1} />
              <InputOTPSlot index={2} /><InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </ShowCard>
        <ShowCard title="Alphanumeric pattern" description="Restricts to digits and chars via pattern.">
          <InputOTP maxLength={6} pattern="^[a-zA-Z0-9]+$">
            <InputOTPGroup>
              <InputOTPSlot index={0} /><InputOTPSlot index={1} /><InputOTPSlot index={2} />
              <InputOTPSlot index={3} /><InputOTPSlot index={4} /><InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </ShowCard>
      </div>
    ),
  },

  // ── Item ──────────────────────────────────────────────────────────────────
  item: {
    title: "Item",
    description: "A flex-container for displaying content with media, title, description, and actions.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Icon">
          <Item className="w-full max-w-sm">
            <ItemMedia><Settings className="size-4" /></ItemMedia>
            <ItemContent>
              <ItemTitle>Settings</ItemTitle>
              <ItemDescription>Manage your account preferences.</ItemDescription>
            </ItemContent>
          </Item>
        </ShowCard>
        <ShowCard title="Group">
          <ItemGroup className="w-full max-w-sm rounded-lg border divide-y">
            <Item className="px-4 py-3">
              <ItemMedia><User className="size-4" /></ItemMedia>
              <ItemContent><ItemTitle>Profile</ItemTitle></ItemContent>
              <ItemActions><ChevronRight className="size-4 text-muted-foreground" /></ItemActions>
            </Item>
            <ItemSeparator />
            <Item className="px-4 py-3">
              <ItemMedia><Bell className="size-4" /></ItemMedia>
              <ItemContent><ItemTitle>Notifications</ItemTitle></ItemContent>
              <ItemActions><ChevronRight className="size-4 text-muted-foreground" /></ItemActions>
            </Item>
            <ItemSeparator />
            <Item className="px-4 py-3">
              <ItemMedia><CreditCard className="size-4" /></ItemMedia>
              <ItemContent><ItemTitle>Billing</ItemTitle></ItemContent>
              <ItemActions><ChevronRight className="size-4 text-muted-foreground" /></ItemActions>
            </Item>
          </ItemGroup>
        </ShowCard>
        <ShowCard title="With Header">
          <ItemGroup className="w-full max-w-sm rounded-lg border">
            <ItemHeader className="px-4 pt-3 pb-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Account</p>
            </ItemHeader>
            <Item className="px-4 py-3">
              <ItemMedia><User className="size-4" /></ItemMedia>
              <ItemContent>
                <ItemTitle>Jane Doe</ItemTitle>
                <ItemDescription>jane@example.com</ItemDescription>
              </ItemContent>
            </Item>
          </ItemGroup>
        </ShowCard>
      </div>
    ),
  },

  // ── Kbd ────────────────────────────────────────────────────────────────────
  kbd: {
    title: "Kbd",
    description: "Displays keyboard key input, individually or grouped.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Basic">
          <div className="flex flex-col items-center gap-4">
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>⇧</Kbd>
              <Kbd>⌥</Kbd>
              <Kbd>⌃</Kbd>
            </KbdGroup>
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <span>+</span>
              <Kbd>B</Kbd>
            </KbdGroup>
          </div>
        </ShowCard>
        <ShowCard title="Group" description="Use KbdGroup to group keyboard keys together.">
          <p className="text-muted-foreground text-sm">
            Use{" "}
            <KbdGroup>
              <Kbd>Ctrl + B</Kbd>
              <Kbd>Ctrl + K</Kbd>
            </KbdGroup>{" "}
            to open the command palette
          </p>
        </ShowCard>
        <ShowCard title="Button" description="Use Kbd inside a Button to display a keyboard shortcut.">
          <Button variant="outline">
            Accept{" "}
            <Kbd data-icon="inline-end" className="translate-x-0.5">⏎</Kbd>
          </Button>
        </ShowCard>
        <ShowCard title="Tooltip" description="Use Kbd inside a Tooltip to display keyboard shortcuts.">
          <div className="flex flex-wrap gap-4">
            <ButtonGroup>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Save</Button>
                </TooltipTrigger>
                <TooltipContent className="pr-1.5">
                  <div className="flex items-center gap-2">
                    Save Changes <Kbd>S</Kbd>
                  </div>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Print</Button>
                </TooltipTrigger>
                <TooltipContent className="pr-1.5">
                  <div className="flex items-center gap-2">
                    Print Document{" "}
                    <KbdGroup>
                      <Kbd>Ctrl</Kbd>
                      <Kbd>P</Kbd>
                    </KbdGroup>
                  </div>
                </TooltipContent>
              </Tooltip>
            </ButtonGroup>
          </div>
        </ShowCard>
        <ShowCard title="Input Group" description="Use Kbd inside an InputGroupAddon to display a keyboard shortcut.">
          <div className="flex w-full max-w-xs flex-col gap-6">
            <InputGroup>
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </ShowCard>
      </div>
    ),
  },

  // ── Label ─────────────────────────────────────────────────────────────────
  label: {
    title: "Label",
    description: "Renders an accessible label associated with controls.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="With Input">
          <div className="grid max-w-sm gap-2">
            <Label htmlFor="l-name">Full name</Label>
            <Input id="l-name" placeholder="John Doe" />
          </div>
        </ShowCard>
        <ShowCard title="With Checkbox">
          <div className="flex items-center gap-2">
            <Checkbox id="l-agree" defaultChecked />
            <Label htmlFor="l-agree">I agree to the terms and conditions</Label>
          </div>
        </ShowCard>
        <ShowCard title="Disabled">
          <div className="grid max-w-sm gap-2">
            <Label htmlFor="l-dis" className="text-muted-foreground">Disabled field</Label>
            <Input id="l-dis" disabled placeholder="Not editable" />
          </div>
        </ShowCard>
      </div>
    ),
  },

  // ── Menubar ───────────────────────────────────────────────────────────────
  menubar: {
    title: "Menubar",
    description: "A visually persistent menu common in desktop applications.",
    Content: () => {
      const [showBookmarks, setShowBookmarks] = useState(true)
      const [browser, setBrowser] = useState("chrome")
      return (
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
      )
    },
  },

  // ── Navigation Menu ───────────────────────────────────────────────────────
  "navigation-menu": {
    title: "Navigation Menu",
    description: "A collection of links for navigating websites.",
    Content: () => (
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
    ),
  },

  // ── Native Select ─────────────────────────────────────────────────────────
  "native-select": {
    title: "Native Select",
    description: "A styled native HTML select element — ideal for mobile and simple use cases.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Basic">
          <NativeSelect className="w-52">
            <NativeSelectOption value="">Select a fruit...</NativeSelectOption>
            <NativeSelectOption value="apple">Apple</NativeSelectOption>
            <NativeSelectOption value="banana">Banana</NativeSelectOption>
            <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
          </NativeSelect>
        </ShowCard>
        <ShowCard title="Groups">
          <NativeSelect className="w-52">
            <NativeSelectOption value="">Select a pet...</NativeSelectOption>
            <NativeSelectOptGroup label="Dogs">
              <NativeSelectOption value="labrador">Labrador</NativeSelectOption>
              <NativeSelectOption value="poodle">Poodle</NativeSelectOption>
            </NativeSelectOptGroup>
            <NativeSelectOptGroup label="Cats">
              <NativeSelectOption value="persian">Persian</NativeSelectOption>
              <NativeSelectOption value="siamese">Siamese</NativeSelectOption>
            </NativeSelectOptGroup>
          </NativeSelect>
        </ShowCard>
        <ShowCard title="Disabled">
          <div className="flex flex-col gap-3 w-52">
            <NativeSelect disabled>
              <NativeSelectOption>Disabled select</NativeSelectOption>
            </NativeSelect>
            <NativeSelect>
              <NativeSelectOption value="a">Option A</NativeSelectOption>
              <NativeSelectOption value="b" disabled>Option B (disabled)</NativeSelectOption>
              <NativeSelectOption value="c">Option C</NativeSelectOption>
            </NativeSelect>
          </div>
        </ShowCard>
        <ShowCard title="Invalid">
          <NativeSelect aria-invalid className="w-52">
            <NativeSelectOption value="">Select a country...</NativeSelectOption>
            <NativeSelectOption value="us">United States</NativeSelectOption>
            <NativeSelectOption value="uk">United Kingdom</NativeSelectOption>
          </NativeSelect>
        </ShowCard>
      </div>
    ),
  },

  // ── Pagination ────────────────────────────────────────────────────────────
  pagination: {
    title: "Pagination",
    description: "Pagination with page navigation, next and previous links.",
    Content: () => (
      <ShowCard title="Default">
        <Pagination>
          <PaginationContent>
            <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
            <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
            <PaginationItem><PaginationEllipsis /></PaginationItem>
            <PaginationItem><PaginationLink href="#">10</PaginationLink></PaginationItem>
            <PaginationItem><PaginationNext href="#" /></PaginationItem>
          </PaginationContent>
        </Pagination>
      </ShowCard>
    ),
  },

  // ── Popover ───────────────────────────────────────────────────────────────
  popover: {
    title: "Popover",
    description: "Displays rich content in a portal, triggered by a button.",
    Content: () => (
      <ShowCard title="Default">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <div className="grid gap-3">
              <div>
                <p className="font-medium text-sm">Dimensions</p>
                <p className="text-xs text-muted-foreground">Set the dimensions for the layer.</p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label>Width</Label>
                  <Input defaultValue="100%" className="col-span-2 h-8" />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label>Max width</Label>
                  <Input defaultValue="300px" className="col-span-2 h-8" />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label>Height</Label>
                  <Input defaultValue="auto" className="col-span-2 h-8" />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </ShowCard>
    ),
  },

  // ── Progress ──────────────────────────────────────────────────────────────
  progress: {
    title: "Progress",
    description: "Displays an indicator showing the completion progress of a task.",
    Content: () => (
      <ShowCard title="Values">
        <div className="space-y-4">
          {[0, 25, 50, 75, 100].map((v) => (
            <div key={v} className="flex items-center gap-4">
              <span className="w-8 text-right text-xs tabular-nums text-muted-foreground">{v}%</span>
              <Progress value={v} className="flex-1" />
            </div>
          ))}
        </div>
      </ShowCard>
    ),
  },

  // ── Radio Group ───────────────────────────────────────────────────────────
  "radio-group": {
    title: "Radio Group",
    description: "A set of checkable buttons where no more than one can be checked at a time.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Default">
          <RadioGroup defaultValue="comfortable">
            {["Default", "Comfortable", "Compact"].map((label) => (
              <div key={label} className="flex items-center gap-2">
                <RadioGroupItem value={label.toLowerCase()} id={`rg-${label}`} />
                <Label htmlFor={`rg-${label}`}>{label}</Label>
              </div>
            ))}
          </RadioGroup>
        </ShowCard>
        <ShowCard title="With Description">
          <RadioGroup defaultValue="card">
            {[
              { value: "card", label: "Card", desc: "Pay with your saved card." },
              { value: "paypal", label: "PayPal", desc: "Pay via your PayPal account." },
              { value: "apple", label: "Apple Pay", desc: "Pay using Apple Pay." },
            ].map(({ value, label, desc }) => (
              <div key={value} className="flex items-start gap-2">
                <RadioGroupItem value={value} id={`pay-${value}`} className="mt-0.5" />
                <div>
                  <Label htmlFor={`pay-${value}`}>{label}</Label>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </ShowCard>
      </div>
    ),
  },

  // ── Resizable ─────────────────────────────────────────────────────────────
  resizable: {
    title: "Resizable",
    description: "Accessible resizable panel groups and layouts with keyboard support.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Horizontal">
          <ResizablePanelGroup {...({ direction: "horizontal" } as any)} className="max-w-md rounded-lg border h-32">
            <ResizablePanel defaultSize={30}>
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Sidebar</div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Content</div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ShowCard>
        <ShowCard title="Vertical">
          <ResizablePanelGroup {...({ direction: "vertical" } as any)} className="max-w-md rounded-lg border h-40">
            <ResizablePanel defaultSize={40}>
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Header</div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Body</div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ShowCard>
        <ShowCard title="With Visible Handle" description="Pass withHandle to show a drag grip indicator.">
          <ResizablePanelGroup {...({ direction: "horizontal" } as any)} className="max-w-md rounded-lg border h-32">
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Left</div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel>
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Right</div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ShowCard>
      </div>
    ),
  },

  // ── Scroll Area ───────────────────────────────────────────────────────────
  "scroll-area": {
    title: "Scroll Area",
    description: "Augments native scroll functionality for custom, cross-browser styling.",
    Content: () => {
      const tags = Array.from({ length: 20 }, (_, i) => `Tag ${i + 1}`)
      const cols = ["React", "Vue", "Angular", "Svelte", "Solid", "Qwik", "Astro", "Remix"]
      return (
        <div className="space-y-4">
          <ShowCard title="Vertical">
            <ScrollArea className="h-56 w-48 rounded-md border">
              <div className="p-4">
                <p className="text-sm font-medium mb-2">Tags</p>
                {tags.map((tag) => (
                  <div key={tag} className="text-sm py-1 border-b last:border-b-0">{tag}</div>
                ))}
              </div>
            </ScrollArea>
          </ShowCard>
          <ShowCard title="Horizontal" description="Add ScrollBar orientation='horizontal' inside.">
            <ScrollArea className="w-80 rounded-md border whitespace-nowrap">
              <div className="flex gap-3 p-4">
                {cols.map((c) => (
                  <div key={c} className="shrink-0 rounded-md border bg-muted px-4 py-2 text-sm">{c}</div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </ShowCard>
        </div>
      )
    },
  },

  // ── Select ────────────────────────────────────────────────────────────────
  select: {
    title: "Select",
    description: "Displays a list of options for the user to pick from.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Sizes">
          <div className="flex flex-wrap items-center gap-4">
            <Select>
              <SelectTrigger className="w-44"><SelectValue placeholder="Default size" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="one">Option One</SelectItem>
                <SelectItem value="two">Option Two</SelectItem>
                <SelectItem value="three">Option Three</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger size="sm" className="w-36"><SelectValue placeholder="Small size" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="one">Option One</SelectItem>
                <SelectItem value="two">Option Two</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </ShowCard>
        <ShowCard title="Grouped" description="Use SelectGroup + SelectLabel + SelectSeparator.">
          <Select>
            <SelectTrigger className="w-52"><SelectValue placeholder="Select a fruit" /></SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="mango">Mango</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Vegetables</SelectLabel>
                <SelectItem value="carrot">Carrot</SelectItem>
                <SelectItem value="broccoli">Broccoli</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </ShowCard>
        <ShowCard title="States">
          <div className="flex flex-wrap items-center gap-4">
            <Select disabled>
              <SelectTrigger className="w-44"><SelectValue placeholder="Disabled" /></SelectTrigger>
            </Select>
          </div>
        </ShowCard>
      </div>
    ),
  },

  // ── Separator ─────────────────────────────────────────────────────────────
  separator: {
    title: "Separator",
    description: "Visually or semantically separates content.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Horizontal">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Section above</p>
            <Separator />
            <p className="text-sm text-muted-foreground">Section below</p>
          </div>
        </ShowCard>
        <ShowCard title="Vertical">
          <div className="flex h-6 items-center gap-4 text-sm">
            <span>Profile</span><Separator orientation="vertical" />
            <span>Settings</span><Separator orientation="vertical" />
            <span>Sign out</span>
          </div>
        </ShowCard>
        <ShowCard title="With Label">
          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">OR</span>
            <Separator className="flex-1" />
          </div>
        </ShowCard>
      </div>
    ),
  },

  // ── Sheet ─────────────────────────────────────────────────────────────────
  sheet: {
    title: "Sheet",
    description: "Extends Dialog to display content from any edge of the screen.",
    Content: () => (
      <ShowCard title="Sides">
        <div className="flex flex-wrap gap-3">
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <Sheet key={side}>
              <SheetTrigger asChild>
                <Button variant="outline" className="capitalize">{side}</Button>
              </SheetTrigger>
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle>Edit profile</SheetTitle>
                  <SheetDescription>Make changes to your profile here.</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4 px-4">
                  <div className="grid gap-2">
                    <Label htmlFor={`sn-${side}`}>Name</Label>
                    <Input id={`sn-${side}`} defaultValue="John Doe" />
                  </div>
                </div>
                <SheetFooter className="px-4">
                  <SheetClose asChild><Button>Save changes</Button></SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </ShowCard>
    ),
  },

  // ── Skeleton ──────────────────────────────────────────────────────────────
  skeleton: {
    title: "Skeleton",
    description: "Use to show a placeholder while content is loading.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Text Lines">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </ShowCard>
        <ShowCard title="User Row">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="size-10 rounded-full" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </ShowCard>
        <ShowCard title="Card">
          <div className="space-y-3">
            <Skeleton className="h-40 w-full rounded-lg" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </ShowCard>
      </div>
    ),
  },

  // ── Slider ────────────────────────────────────────────────────────────────
  slider: {
    title: "Slider",
    description: "An input where the user selects a value from within a given range.",
    Content: () => {
      const [single, setSingle] = useState([50])
      const [range, setRange] = useState([20, 80])
      return (
        <div className="space-y-4">
          <ShowCard title="Single Value">
            <div className="space-y-3 max-w-sm">
              <Slider value={single} onValueChange={setSingle} max={100} step={1} />
              <p className="text-xs text-muted-foreground tabular-nums">Value: {single[0]}</p>
            </div>
          </ShowCard>
          <ShowCard title="Range (Multi-thumb)">
            <div className="space-y-3 max-w-sm">
              <Slider value={range} onValueChange={setRange} max={100} step={1} />
              <p className="text-xs text-muted-foreground tabular-nums">Range: {range[0]} – {range[1]}</p>
            </div>
          </ShowCard>
          <ShowCard title="Disabled">
            <Slider defaultValue={[40]} max={100} disabled className="max-w-sm" />
          </ShowCard>
        </div>
      )
    },
  },

  // ── Sonner ────────────────────────────────────────────────────────────────
  sonner: {
    title: "Sonner",
    description: "An opinionated toast component for React. Toaster is mounted in the admin layout.",
    Content: () => (
      <ShowCard title="Toast Types">
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => toast("Event has been created")}>Default</Button>
          <Button variant="outline" onClick={() => toast.success("Profile updated successfully")}>Success</Button>
          <Button variant="outline" onClick={() => toast.error("Something went wrong")}>Error</Button>
          <Button variant="outline" onClick={() => toast.warning("Your session is expiring soon")}>Warning</Button>
          <Button variant="outline" onClick={() => toast.info("A new version is available")}>Info</Button>
          <Button variant="outline" onClick={() => toast.loading("Uploading file...")}>Loading</Button>
          <Button variant="outline" onClick={() => toast("Event created", { description: "Monday, January 1st at 6:00pm" })}>With Description</Button>
        </div>
      </ShowCard>
    ),
  },

  // ── Spinner ───────────────────────────────────────────────────────────────
  spinner: {
    title: "Spinner",
    description: "An animated indicator used to show a loading state.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Sizes">
          <div className="flex items-center gap-6">
            {([["size-3", "XS"], ["size-4", "SM"], ["size-5", "MD"], ["size-6", "LG"], ["size-8", "XL"]] as const).map(([cls, label]) => (
              <div key={cls} className="flex flex-col items-center gap-2">
                <Spinner className={cls} />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </ShowCard>
        <ShowCard title="Button">
          <div className="flex gap-3">
            <Button disabled><Spinner className="size-4" />Loading</Button>
            <Button variant="outline" disabled><Spinner className="size-4" />Saving</Button>
          </div>
        </ShowCard>
        <ShowCard title="Badge">
          <div className="flex gap-3">
            <Badge variant="outline"><Spinner className="size-3" />Processing</Badge>
            <Badge><Spinner className="size-3" />Syncing</Badge>
          </div>
        </ShowCard>
      </div>
    ),
  },

  // ── Switch ────────────────────────────────────────────────────────────────
  switch: {
    title: "Switch",
    description: "A toggle control for switching between two states.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Sizes">
          <div className="flex items-center gap-8">
            {(["sm", "default"] as const).map((size) => (
              <div key={size} className="flex flex-col items-start gap-2">
                <Switch size={size} />
                <span className="text-xs text-muted-foreground">{size}</span>
              </div>
            ))}
          </div>
        </ShowCard>
        <ShowCard title="States">
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-2"><Switch id="sw-off" /><Label htmlFor="sw-off">Off</Label></div>
            <div className="flex items-center gap-2"><Switch id="sw-on" defaultChecked /><Label htmlFor="sw-on">On</Label></div>
            <div className="flex items-center gap-2"><Switch id="sw-dis" disabled /><Label htmlFor="sw-dis" className="text-muted-foreground">Disabled</Label></div>
          </div>
        </ShowCard>
        <ShowCard title="Settings List">
          <div className="divide-y -mx-6">
            {[
              { id: "notif", label: "Push notifications", desc: "Get notified about activity", on: true },
              { id: "emails", label: "Email digest", desc: "Weekly summary of activity", on: false },
              { id: "sounds", label: "Sound effects", desc: "Play sounds on actions", on: false },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between px-6 py-3">
                <div>
                  <Label htmlFor={item.id}>{item.label}</Label>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch id={item.id} defaultChecked={item.on} />
              </div>
            ))}
          </div>
        </ShowCard>
      </div>
    ),
  },

  // ── Table ─────────────────────────────────────────────────────────────────
  table: {
    title: "Table",
    description: "A responsive table component.",
    Content: () => {
      const invoices = [
        { id: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
        { id: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
        { id: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
        { id: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
        { id: "INV005", status: "Paid", method: "PayPal", amount: "$550.00" },
      ]
      return (
        <div className="space-y-4">
          <ShowCard title="Default">
            <Table>
              <TableCaption>A list of recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-medium">{inv.id}</TableCell>
                    <TableCell>{inv.status}</TableCell>
                    <TableCell>{inv.method}</TableCell>
                    <TableCell className="text-right">{inv.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ShowCard>
          <ShowCard title="With Footer">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.slice(0, 3).map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-medium">{inv.id}</TableCell>
                    <TableCell>{inv.method}</TableCell>
                    <TableCell className="text-right">{inv.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2} className="font-medium">Total</TableCell>
                  <TableCell className="text-right font-medium">$750.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </ShowCard>
        </div>
      )
    },
  },

  // ── Tabs ──────────────────────────────────────────────────────────────────
  tabs: {
    title: "Tabs",
    description: "A set of layered sections of content, known as tab panels.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Default Variant">
          <Tabs defaultValue="account" className="max-w-sm">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="p-3 border rounded-md mt-2 text-sm text-muted-foreground">
              Manage your account settings and preferences.
            </TabsContent>
            <TabsContent value="password" className="p-3 border rounded-md mt-2 text-sm text-muted-foreground">
              Change your password. You'll be logged out after saving.
            </TabsContent>
            <TabsContent value="team" className="p-3 border rounded-md mt-2 text-sm text-muted-foreground">
              Invite team members and manage permissions.
            </TabsContent>
          </Tabs>
        </ShowCard>
        <ShowCard title="Line Variant">
          <Tabs defaultValue="overview">
            <TabsList variant="line">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
          </Tabs>
        </ShowCard>
        <ShowCard title="Vertical Orientation">
          <Tabs defaultValue="account" orientation="vertical" className="max-w-xs">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="p-3 border rounded-md text-sm text-muted-foreground">
              Account settings content.
            </TabsContent>
            <TabsContent value="password" className="p-3 border rounded-md text-sm text-muted-foreground">
              Password settings content.
            </TabsContent>
            <TabsContent value="notifications" className="p-3 border rounded-md text-sm text-muted-foreground">
              Notification preferences.
            </TabsContent>
          </Tabs>
        </ShowCard>
      </div>
    ),
  },

  // ── Textarea ──────────────────────────────────────────────────────────────
  textarea: {
    title: "Textarea",
    description: "A multi-line text input control.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Default">
          <Textarea className="max-w-sm" placeholder="Type your message here." />
        </ShowCard>
        <ShowCard title="States">
          <div className="grid max-w-sm gap-3">
            <Textarea placeholder="Default" />
            <Textarea placeholder="Disabled" disabled />
            <Textarea placeholder="Invalid" aria-invalid="true" />
          </div>
        </ShowCard>
        <ShowCard title="With Label">
          <div className="grid max-w-sm gap-2">
            <Label htmlFor="ta-msg">Message</Label>
            <Textarea id="ta-msg" placeholder="Write your message here..." rows={4} />
          </div>
        </ShowCard>
        <ShowCard title="With Button">
          <div className="grid max-w-sm gap-2">
            <Textarea placeholder="Write your feedback..." rows={3} />
            <Button>Submit feedback</Button>
          </div>
        </ShowCard>
      </div>
    ),
  },

  // ── Toggle ────────────────────────────────────────────────────────────────
  toggle: {
    title: "Toggle",
    description: "A two-state button that can be either on or off.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Variants">
          <div className="flex flex-wrap gap-3">
            <Toggle aria-label="Bold"><Bold />Default</Toggle>
            <Toggle variant="outline" aria-label="Italic"><Italic />Outline</Toggle>
          </div>
        </ShowCard>
        <ShowCard title="Sizes">
          <div className="flex flex-wrap items-center gap-3">
            <Toggle size="sm" aria-label="sm"><Bold /></Toggle>
            <Toggle aria-label="default"><Bold /></Toggle>
            <Toggle size="lg" aria-label="lg"><Bold /></Toggle>
          </div>
        </ShowCard>
        <ShowCard title="With Text">
          <div className="flex flex-wrap gap-3">
            <Toggle aria-label="Bold"><Bold />Bold</Toggle>
            <Toggle aria-label="Italic"><Italic />Italic</Toggle>
            <Toggle defaultPressed aria-label="Underline"><Underline />Underline</Toggle>
          </div>
        </ShowCard>
        <ShowCard title="States">
          <div className="flex flex-wrap gap-3">
            <Toggle aria-label="off">Off</Toggle>
            <Toggle defaultPressed aria-label="on">On</Toggle>
            <Toggle disabled aria-label="disabled">Disabled</Toggle>
          </div>
        </ShowCard>
      </div>
    ),
  },

  // ── Toggle Group ──────────────────────────────────────────────────────────
  "toggle-group": {
    title: "Toggle Group",
    description: "A set of two-state buttons that can be toggled on or off.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Single" description="Only one item active at a time.">
          <ToggleGroup type="single" defaultValue="center">
            <ToggleGroupItem value="left" aria-label="Left"><AlignLeft /></ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Center"><AlignCenter /></ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Right"><AlignRight /></ToggleGroupItem>
          </ToggleGroup>
        </ShowCard>
        <ShowCard title="Multiple" description="Multiple items can be active simultaneously.">
          <ToggleGroup type="multiple" defaultValue={["bold", "italic"]}>
            <ToggleGroupItem value="bold" aria-label="Bold"><Bold /></ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic"><Italic /></ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline"><Underline /></ToggleGroupItem>
          </ToggleGroup>
        </ShowCard>
        <ShowCard title="Outline Variant">
          <ToggleGroup type="single" variant="outline" defaultValue="left">
            <ToggleGroupItem value="left">Left</ToggleGroupItem>
            <ToggleGroupItem value="center">Center</ToggleGroupItem>
            <ToggleGroupItem value="right">Right</ToggleGroupItem>
          </ToggleGroup>
        </ShowCard>
        <ShowCard title="Sizes">
          <div className="space-y-3">
            {(["sm", "default", "lg"] as const).map((size) => (
              <div key={size} className="flex items-center gap-4">
                <span className="w-14 text-xs text-muted-foreground">{size}</span>
                <ToggleGroup type="single" size={size} defaultValue="b">
                  <ToggleGroupItem value="b"><Bold /></ToggleGroupItem>
                  <ToggleGroupItem value="i"><Italic /></ToggleGroupItem>
                  <ToggleGroupItem value="u"><Underline /></ToggleGroupItem>
                </ToggleGroup>
              </div>
            ))}
          </div>
        </ShowCard>
      </div>
    ),
  },

  // ── Tooltip ───────────────────────────────────────────────────────────────
  tooltip: {
    title: "Tooltip",
    description: "A popup that displays information related to an element on hover or focus.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Default">
          <div className="flex flex-wrap gap-3">
            <Tooltip>
              <TooltipTrigger asChild><Button variant="outline">Hover me</Button></TooltipTrigger>
              <TooltipContent>This is a tooltip</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild><Button size="icon" variant="outline"><Search /></Button></TooltipTrigger>
              <TooltipContent>Search</TooltipContent>
            </Tooltip>
          </div>
        </ShowCard>
        <ShowCard title="Positions">
          <div className="flex flex-wrap gap-3">
            {(["top", "right", "bottom", "left"] as const).map((side) => (
              <Tooltip key={side}>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="capitalize">{side}</Button>
                </TooltipTrigger>
                <TooltipContent side={side}>Tooltip on {side}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </ShowCard>
      </div>
    ),
  },

  // ── Typography ────────────────────────────────────────────────────────────
  typography: {
    title: "Typography",
    description: "Styles for headings, paragraphs, lists, and inline elements.",
    Content: () => (
      <div className="space-y-4">
        <ShowCard title="Headings">
          <div className="flex flex-col gap-2 w-full">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Heading 1</h1>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Heading 2</h2>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Heading 3</h3>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Heading 4</h4>
          </div>
        </ShowCard>
        <ShowCard title="Paragraph & Lead">
          <div className="flex flex-col gap-3 max-w-prose">
            <p className="text-xl text-muted-foreground">A lead paragraph introduces the main content with a slightly larger, muted style.</p>
            <p className="leading-7">The king, seeing how much happier his subjects were, realised the tax was causing unnecessary burden. He rescinded the joke tax, and all was well again.</p>
          </div>
        </ShowCard>
        <ShowCard title="Blockquote & Inline">
          <div className="flex flex-col gap-4 max-w-prose">
            <blockquote className="mt-6 border-l-2 pl-6 italic">"After all, the best way to predict the future is to create it."</blockquote>
            <p className="leading-7">Use the <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">shadcn add</code> command to install components.</p>
          </div>
        </ShowCard>
        <ShowCard title="List">
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>1st level of puns: 5 gold coins</li>
            <li>2nd level of jokes: 10 gold coins</li>
            <li>3rd level of one-liners: 20 gold coins</li>
          </ul>
        </ShowCard>
        <ShowCard title="Large / Small / Muted">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">Large — Are you absolutely sure?</p>
            <p className="text-sm font-medium leading-none">Small — Email address</p>
            <p className="text-sm text-muted-foreground">Muted — Enter your email address.</p>
          </div>
        </ShowCard>
      </div>
    ),
  },
}

// ─── Page ──────────────────────────────────────────────────────────────────────

type Props = { params: Promise<{ slug: string }> }

export default function ComponentShowcasePage({ params }: Props) {
  const { slug } = use(params)
  const showcase = SHOWCASES[slug]
  if (!showcase) notFound()
  const { title, description, Content } = showcase
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Content />
    </div>
  )
}

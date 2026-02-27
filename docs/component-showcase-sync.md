# Component Showcase Sync with shadcn/ui Docs

## What This Is

The component showcase at `app/(admin)/components/[slug]/page.tsx` displays live examples
for every UI component. Each example is wrapped in a `ShowCard` with a title and optional
description, rendered inside a centered preview area.

The goal of this sync effort is to make every example match the official
[shadcn/ui docs](https://ui.shadcn.com/docs/components/radix/) exactly — same titles,
same descriptions, same content, same icons.

---

## What Was Done (Alert as reference)

### Source
`https://ui.shadcn.com/docs/components/radix/alert`

### Process
1. Navigate to the shadcn docs page for the component using Playwright MCP.
2. For each **Examples** section heading, copy the **section title** and **paragraph description** beneath it → use as `ShowCard title` and `ShowCard description`.
3. Click **"View Code"** on each example to get the exact JSX: icons, alert text, classNames, button variants, etc.
4. Update the showcase to match — same icon, same `AlertTitle`, same `AlertDescription`, same props.
5. Add `max-w-md` (or equivalent constraint) to any component that shadcn renders with `max-w-md` in their example, so all ShowCards display at a consistent width.

### Result for Alert

| ShowCard title | ShowCard description | Icon | AlertTitle |
|---|---|---|---|
| Basic | A basic alert with an icon, title and description. | `CheckCircle2` | Account updated successfully |
| Destructive | Use `variant="destructive"` to create a destructive alert. | `AlertCircle` | Payment failed |
| Action | Use `AlertAction` to add a button or other action element to the alert. | *(none)* | Dark mode is now available |
| Custom Colors | You can customize the alert colors by adding custom classes such as `bg-amber-50 dark:bg-amber-950` to the `Alert` component. | `AlertTriangle` | Your subscription will expire in 3 days. |

---

## Rules to Follow for Every Component

### ShowCard `title`
Copy the `### Heading` text from the Examples section of the shadcn docs page exactly.

### ShowCard `description`
Copy the paragraph text that appears directly below the heading, exactly as written.
If the paragraph contains inline code (e.g. `variant="destructive"`), keep it as a plain
string — do not add JSX inline code elements.

### Content (icons, text, classNames)
Click "View Code" on each example. Use:
- The exact icon component name from lucide-react (e.g. `CheckCircle2`, not `CheckCircle2Icon` — drop the `Icon` suffix as lucide-react exports both but our codebase uses the short form)
- The exact `AlertTitle` / `AlertDescription` / button text as shown
- The exact `className` values (e.g. `border-amber-200 bg-amber-50 ...`)
- The exact prop values (`variant`, `size`, `type`, etc.)

### Width consistency
shadcn wraps examples in a constrained container. Our `ShowCard` uses `flex justify-center`.
- If shadcn adds `max-w-md` / `max-w-sm` / `max-w-xs` to the component itself, keep it.
- If shadcn renders the component full-width but our `ShowCard` has a specific child constraint (e.g. `*:data-[slot=accordion]:max-w-sm`), make sure wrapper elements (like `Card`) also get `w-full max-w-sm` explicitly.

### Icons — size class
The shadcn docs no longer add `className="size-4"` to icons passed to Alert/similar components
because the component CSS handles icon sizing via `*:[svg]:size-4`. Do not add `className="size-4"`
to icons inside these components.

---

## Components To Sync

Work through these in order, one page at a time:

- [ ] Accordion — `https://ui.shadcn.com/docs/components/radix/accordion`
- [ ] Alert — ✅ done
- [ ] Alert Dialog — `https://ui.shadcn.com/docs/components/radix/alert-dialog`
- [ ] Aspect Ratio — `https://ui.shadcn.com/docs/components/radix/aspect-ratio`
- [ ] Avatar — `https://ui.shadcn.com/docs/components/radix/avatar`
- [ ] Badge — `https://ui.shadcn.com/docs/components/radix/badge`
- [ ] Breadcrumb — `https://ui.shadcn.com/docs/components/radix/breadcrumb`
- [ ] Button — `https://ui.shadcn.com/docs/components/radix/button`
- [ ] Button Group — `https://ui.shadcn.com/docs/components/radix/button-group`
- [ ] Calendar — `https://ui.shadcn.com/docs/components/radix/calendar`
- [ ] Card — `https://ui.shadcn.com/docs/components/radix/card`
- [ ] Carousel — `https://ui.shadcn.com/docs/components/radix/carousel`
- [ ] Chart — `https://ui.shadcn.com/docs/components/radix/chart`
- [ ] Checkbox — `https://ui.shadcn.com/docs/components/radix/checkbox`
- [ ] Collapsible — `https://ui.shadcn.com/docs/components/radix/collapsible`
- [ ] Combobox — `https://ui.shadcn.com/docs/components/radix/combobox`
- [ ] Command — `https://ui.shadcn.com/docs/components/radix/command`
- [ ] Context Menu — `https://ui.shadcn.com/docs/components/radix/context-menu`
- [ ] Dialog — `https://ui.shadcn.com/docs/components/radix/dialog`
- [ ] Drawer — `https://ui.shadcn.com/docs/components/radix/drawer`
- [ ] Dropdown Menu — `https://ui.shadcn.com/docs/components/radix/dropdown-menu`
- [ ] Empty — `https://ui.shadcn.com/docs/components/radix/empty`
- [ ] Field — `https://ui.shadcn.com/docs/components/radix/field`
- [ ] Hover Card — `https://ui.shadcn.com/docs/components/radix/hover-card`
- [ ] Input — `https://ui.shadcn.com/docs/components/radix/input`
- [ ] Input Group — `https://ui.shadcn.com/docs/components/radix/input-group`
- [ ] Input OTP — `https://ui.shadcn.com/docs/components/radix/input-otp`
- [ ] Item — `https://ui.shadcn.com/docs/components/radix/item`
- [ ] Kbd — ✅ done
- [ ] Label — `https://ui.shadcn.com/docs/components/radix/label`
- [ ] Menubar — `https://ui.shadcn.com/docs/components/radix/menubar`
- [ ] Native Select — `https://ui.shadcn.com/docs/components/radix/native-select`
- [ ] Navigation Menu — `https://ui.shadcn.com/docs/components/radix/navigation-menu`
- [ ] Pagination — `https://ui.shadcn.com/docs/components/radix/pagination`
- [ ] Popover — `https://ui.shadcn.com/docs/components/radix/popover`
- [ ] Progress — `https://ui.shadcn.com/docs/components/radix/progress`
- [ ] Radio Group — `https://ui.shadcn.com/docs/components/radix/radio-group`
- [ ] Resizable — `https://ui.shadcn.com/docs/components/radix/resizable`
- [ ] Scroll Area — `https://ui.shadcn.com/docs/components/radix/scroll-area`
- [ ] Select — `https://ui.shadcn.com/docs/components/radix/select`
- [ ] Separator — `https://ui.shadcn.com/docs/components/radix/separator`
- [ ] Sheet — `https://ui.shadcn.com/docs/components/radix/sheet`
- [ ] Skeleton — `https://ui.shadcn.com/docs/components/radix/skeleton`
- [ ] Slider — `https://ui.shadcn.com/docs/components/radix/slider`
- [ ] Sonner — `https://ui.shadcn.com/docs/components/radix/sonner`
- [ ] Spinner — `https://ui.shadcn.com/docs/components/radix/spinner`
- [ ] Switch — `https://ui.shadcn.com/docs/components/radix/switch`
- [ ] Table — `https://ui.shadcn.com/docs/components/radix/table`
- [ ] Tabs — `https://ui.shadcn.com/docs/components/radix/tabs`
- [ ] Textarea — `https://ui.shadcn.com/docs/components/radix/textarea`
- [ ] Toggle — `https://ui.shadcn.com/docs/components/radix/toggle`
- [ ] Toggle Group — `https://ui.shadcn.com/docs/components/radix/toggle-group`
- [ ] Tooltip — `https://ui.shadcn.com/docs/components/radix/tooltip`
- [ ] Typography — `https://ui.shadcn.com/docs/components/radix/typography`

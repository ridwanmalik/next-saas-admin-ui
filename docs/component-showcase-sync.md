# Component Showcase Sync — Runbook

## Purpose

Sync every component example in `app/(admin)/components/[slug]/page.tsx` to match the
official shadcn/ui docs exactly: same ShowCard titles, same ShowCard descriptions, same
JSX content (icons, text, classNames, props).

Run this prompt in a future session to continue where the checklist left off.

---

## Context

### What is the showcase page?

`app/(admin)/components/[slug]/page.tsx` contains a large `SHOWCASES` object. Each key is
a component slug (e.g. `"alert"`, `"accordion"`). Each value has:

```ts
{
  title: string // page heading
  description: string // page subheading
  Content: React.ComponentType // renders the examples
}
```

Each example inside `Content` is wrapped in a `ShowCard`:

```tsx
const ShowCard = ({ title, description, className, children }) => (
  <div className="space-y-3">
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
    <div className="relative flex min-h-[300px] w-full items-center justify-center rounded-xl border p-10 ...">
      {children}
    </div>
  </div>
)
```

### What is the sync target?

Each component's shadcn docs page at:
`https://ui.shadcn.com/docs/components/radix/<slug>`

The **Examples** section of each page has:

- `### Heading` → becomes `ShowCard title`
- Paragraph below the heading → becomes `ShowCard description`
- "View Code" button → reveals the exact JSX to use inside `ShowCard`

---

## Exact Steps Per Component

### 1. Navigate to the docs page

Use Playwright MCP:

```
navigate to https://ui.shadcn.com/docs/components/radix/<component-slug>
```

### 2. Capture example titles and descriptions

From the page snapshot, under the **Examples** heading, find each `### SubHeading` and the
paragraph below it. These map directly to `ShowCard title` and `ShowCard description`.

### 3. Click every "View Code" button

Each example has a collapsed code preview. Click "View Code" to expand it and read the
exact JSX. Capture:

- Icon component name (e.g. `CheckCircle2`, `AlertCircle`, `AlertTriangle`)
- Component children text (titles, descriptions, button labels)
- `className` values
- Props (`variant`, `size`, `type`, `collapsible`, etc.)

### 4. Update the showcase

In `app/(admin)/components/[slug]/page.tsx`, find the matching component section and
replace the `ShowCard` blocks to match the docs exactly.

---

## Rules Discovered

### ShowCard title

Copy the `### Heading` text verbatim. E.g. `"Basic"`, `"Destructive"`, `"Custom Colors"`.

### ShowCard description

Copy the paragraph text verbatim. If it contains inline code in the docs (e.g.
`variant="destructive"`), write it as a plain JS string — no JSX `<code>` elements needed
since it renders as `text-muted-foreground` prose.

### Icons — no size-4 class

shadcn component CSS handles icon sizing internally (e.g. `*:[svg]:size-4`). Do NOT add
`className="size-4"` to icons passed directly into Alert, AlertDialog, etc.

```tsx
// ✅ correct
<Alert><CheckCircle2 /><AlertTitle>...</AlertTitle></Alert>

// ❌ wrong
<Alert><CheckCircle2 className="size-4" /><AlertTitle>...</AlertTitle></Alert>
```

### Width consistency

shadcn wraps showcase examples in a constrained container. Our `ShowCard` uses
`flex justify-center` with no automatic width constraint on non-accordion children.

- If shadcn's example code has `className="max-w-md"` on the component → keep it.
- If a component (e.g. Alert) has `w-full` by default and shadcn adds `max-w-md` in the
  example, add `max-w-md` to all variants of that component in our showcase so they're
  consistent with each other.
- If a wrapper element (e.g. `Card` wrapping an `Accordion`) bypasses the ShowCard's
  `*:data-[slot=accordion]:max-w-sm` selector, add `w-full max-w-sm` directly to the
  wrapper element.

### Icon imports

lucide-react exports both `CheckCircle2` and `CheckCircle2Icon`. Our codebase uses the
short form (no `Icon` suffix). Drop the suffix when copying from shadcn source code.

```tsx
// shadcn source shows:       import { CheckCircle2Icon } from "lucide-react"
// use in our codebase:       CheckCircle2
```

If a new icon is needed that isn't already imported at the top of page.tsx, add it to the
existing lucide-react import block. Do NOT create a separate import line.

### Multiple data arrays per component

When a component's examples each use different content (different FAQ questions, etc.),
define a **separate named array per example** inside the `Content` function. Do NOT share
one array across examples that have different data.

```tsx
// ✅ correct — each example has its own data
const basicItems = [{ value: "item-1", trigger: "...", content: "..." }, ...]
const multipleItems = [{ value: "notifications", trigger: "...", content: "..." }, ...]
const bordersItems = [{ value: "billing", trigger: "...", content: "..." }, ...]
const cardItems = [{ value: "plans", trigger: "...", content: "..." }, ...]
```

### next/image for Aspect Ratio (and similar)

shadcn Aspect Ratio examples use `next/image` with a real image URL. To replicate:

1. Add `import Image from "next/image"` to page.tsx (already added).
2. Add the domain to `next.config.ts` remotePatterns (already added `avatar.vercel.sh`).
3. Use `fill` prop on `<Image>` inside `<AspectRatio>`.

```tsx
<AspectRatio ratio={1 / 1} className="bg-muted rounded-lg">
  <Image
    src="https://avatar.vercel.sh/shadcn1"
    alt="Photo"
    fill
    className="rounded-lg object-cover grayscale dark:brightness-20"
  />
</AspectRatio>
```

---

## Completed

- [x] **Alert** — `https://ui.shadcn.com/docs/components/radix/alert`
  - Updated: icons (CheckCircle2, AlertCircle, AlertTriangle), titles, descriptions, button variant
  - Added `max-w-md` to all 4 variants for width consistency

- [x] **Kbd** — `https://ui.shadcn.com/docs/components/radix/kbd`
  - Updated: component classes to exact shadcn source (`bg-muted`, `in-data-[slot=tooltip-content]` variant, `data-slot` attrs)
  - Added Basic example (⌘⇧⌥⌃ group + Ctrl+B group)
  - Updated Group, Button, Tooltip, Input Group examples to match docs exactly

- [x] **Accordion** — `https://ui.shadcn.com/docs/components/radix/accordion`
  - 5 examples: Basic, Multiple, Disabled, Borders, Card
  - Each example uses its own items array (basicItems, multipleItems, bordersItems, cardItems)
  - Basic/Multiple: `className="max-w-lg"` on Accordion
  - Borders: `className="max-w-lg rounded-lg border"` on Accordion, `className="border-b px-4 last:border-b-0"` on AccordionItem
  - Card: `<Card className="w-full max-w-sm">` wrapping plain `<Accordion>` (no className on Accordion)
  - Removed old Card's `border-dashed shadow-none p-0` — match shadcn exactly

- [x] **Alert Dialog** — `https://ui.shadcn.com/docs/components/radix/alert-dialog`
  - 5 examples: Basic, Small, Media, Small with Media, Destructive
  - Added `CircleFadingPlus` to lucide-react imports (Media example uses it)
  - Media: trigger "Share Project", icon `CircleFadingPlus`, title "Share this project?"
  - Small with Media: trigger "Show Dialog", icon `Bluetooth`, same content as Small
  - Destructive: `AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive"`, description includes `<a href="#">Settings</a>` link, `AlertDialogCancel variant="outline"` explicitly set

- [x] **Aspect Ratio** — `https://ui.shadcn.com/docs/components/radix/aspect-ratio`
  - 2 examples only: Square (`ratio={1/1}`, `max-w-[12rem]`) and Portrait (`ratio={9/16}`, `max-w-[10rem]`)
  - Removed old 16/9 example (not in shadcn docs)
  - Uses `next/image` with `src="https://avatar.vercel.sh/shadcn1"` and `fill` prop
  - Added `Image` import and `avatar.vercel.sh` to `next.config.ts` remotePatterns

- [x] **Breadcrumb** — `https://ui.shadcn.com/docs/components/radix/breadcrumb`
  - Basic: added description, expanded inline items to multi-line
  - Custom separator: fixed title case ("separator" lowercase), updated description, changed links to asChild+Link pattern with real hrefs
  - Dropdown: updated description, replaced Button/BreadcrumbEllipsis trigger with plain `<button className="flex items-center gap-1">` + ChevronDown, added dot separators
  - Collapsed: updated description, changed Home/Components links to asChild+Link with real hrefs (`/`, `/docs/components`)
  - Link component: fixed title case ("component" lowercase), updated description, expanded inline items

- [x] **Badge** — `https://ui.shadcn.com/docs/components/radix/badge`
  - Updated page description to match docs verbatim
  - Variants: added description, changed `gap-3` to `gap-2`, removed Link variant (not in docs)
  - With Icon: added description, replaced 4 badges with 2 (secondary BadgeCheck+Verified, outline Bookmark+Bookmark icon); added `Bookmark` to lucide imports
  - With Spinner: updated description, replaced 4 badges with 2 (destructive Deleting inline-start, secondary Generating inline-end)
  - Link: updated description, fixed `href="#"` to `href="#link"`
  - Custom Colors: updated description to match docs verbatim

- [x] **Avatar** — `https://ui.shadcn.com/docs/components/radix/avatar`
  - Updated page description to match docs verbatim
  - Basic: removed broken-image second avatar, fixed description
  - Badge: updated description to docs verbatim
  - Badge with Icon: updated src/alt/fallback to `pranathip.png` / `@pranathip` / `PP`, fixed description
  - Avatar Group / Group Count / Group with Icon: expanded map to individual Avatar elements, fixed descriptions
  - Sizes: replaced labeled grid with `flex flex-wrap items-center gap-2 grayscale` wrapper, no label spans
  - Dropdown: replaced plain `<button>` with `<Button variant="ghost" size="icon" className="rounded-full">`, items are Profile/Billing/Settings + Log out (destructive), no icons on items

---

## Remaining (work top to bottom)

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

---

## How to Run This in a New Session

Paste this into the prompt:

> Read `docs/component-showcase-sync.md`. Pick up from the first unchecked item in
> the Remaining list. For each component:
>
> 1. Use Playwright MCP to navigate to its shadcn docs URL.
> 2. From the snapshot, read the Examples section: each `### Heading` = ShowCard title,
>    paragraph below = ShowCard description (copy verbatim as plain string).
> 3. Click every "View Code" button to get the exact JSX.
> 4. Read the current matching section in `app/(admin)/components/[slug]/page.tsx`
>    (use Read with offset+limit, or Grep for the component name).
> 5. Replace only what differs — titles, descriptions, JSX content, classNames, props.
>    Follow all Rules Discovered in the doc (no icon size classes, use short icon names,
>    separate data arrays per example, match className exactly from docs).
> 6. If new lucide icons are needed, add them to the existing import block in page.tsx.
> 7. Mark the item `[x]` in the Completed section of this doc with a 2-line summary
>    of what changed.
> 8. Commit after every 3–5 components with message "sync: accordion, alert-dialog, ...".
>
> Do NOT do more than what's asked — only update ShowCard titles, descriptions, and
> JSX content to match the docs. Do not refactor surrounding code.

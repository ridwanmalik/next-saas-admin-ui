# next-saas-admin-ui
Next.js 16 App Router, Tailwind v4, shadcn/ui v4 (new-york), TypeScript strict, Yarn 4.

## Routes
- `app/(admin)/` — authenticated pages (sidebar+topbar via layout.tsx)
- `app/(auth)/login/` — public, no sidebar
- Add page: `app/(admin)/your-page/page.tsx` | Add nav: edit `lib/constants.ts` NAV_GROUPS
- Pages: dashboard, users, analytics, billing, reports, notifications, security, settings, forms/*, components/*

## Key files
- `lib/constants.ts` — NAV_GROUPS, APP_NAME
- `lib/themes.ts` — COLOR_THEMES (6 OKLCH presets)
- `lib/utils.ts` — `cn()` always import from here
- `app/globals.css` — CSS vars, `html[data-color-theme]` blocks
- `app/layout.tsx` — fonts, ThemeProvider, TooltipProvider, FOUC script
- `hooks/use-color-theme.ts` — localStorage + data-color-theme on `<html>`
- `types/index.ts` — NavGroup, NavItem, LayoutProps
- `components/layout/user-dropdown.tsx` — MOCK_USER (replace with real auth)

## Custom UI components (components/ui/)
| Component | File | Key props |
|---|---|---|
| DataTable | `data-table.tsx` | columns, data, toolbarFilters, toolbarActions |
| MultiSelectFilter | `data-table.tsx` | label, options[], value: Set\<string\>, onChange |
| Sparkline | `sparkline.tsx` | data: number[], positive? |
| StatCard | `stat-card.tsx` | label, value, change, positive, period?, sparkline?, icon? |
| EmptyState | `empty-state.tsx` | icon, title, description, actions[], size: sm/md/lg |
| ErrorState | `error-state.tsx` | code, title, description, actions[] |

## Code style
- Always use arrow functions (`const Foo = () =>`) — never `function` declarations. This applies to **every** named function: page components, helper components, utility functions (`formatDate`, `PasswordStrength`, etc.), and sub-components (`Variant`, `SectionDivider`, etc.)
- `export default function Foo()` is also banned — correct pattern: `const Foo = () => { ... }` then `export default Foo` on a separate line
- **Never use template literals for className** — always use `cn()` from `lib/utils`. ❌ `` className={`text-sm ${active ? "text-primary" : "text-muted"}`} `` → ✅ `className={cn("text-sm", active && "text-primary")}`
- Use Tailwind v4 canonical classes — avoid arbitrary values when a scale equivalent exists (e.g. `max-w-45` not `max-w-[180px]`); if no equivalent exists, add the token to `@theme inline` in `app/globals.css`
- Replace all `style={{ ... }}` hardcoded values with Tailwind: pixel sizes → scale class (`min-h-50` = 200px), animation timing → `[animation-duration:0.6s]`; exception: complex decorative CSS that has no Tailwind equivalent (e.g. `radial-gradient` dot patterns)

## Button component rules
- Use `<Button>` (shadcn) — never raw `<button>` HTML elements
- Icon-only square buttons: use `size="icon"`, optionally override size with `className="h-7 w-7"` — **never combine `size="sm"` with explicit `h-*/w-*`** (they conflict)
- Password show/hide toggle: `<Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7">`
- Inline text link buttons: `<Button variant="link" className="h-auto p-0 text-xs">`

## Select component rules
- Always use shadcn `<Select>` — never raw `<select>` HTML elements
- Controlled: `<Select value={val} onValueChange={setVal}>` (not `onChange={e => setVal(e.target.value)}`)
- Uncontrolled: `<Select defaultValue="initial">`
- Structure: `<Select><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{items.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent></Select>`

## Page-level sub-components
- Co-located inner components live in `app/(admin)/<page>/_components/`
- Example: `app/(admin)/components/_components/MyChart.tsx`
- Use this for components that are only used by one page (charts, cards, sections)
- Shared across multiple pages → move to `components/ui/` instead

## Patterns
- Filters → `<MultiSelectFilter>` passed to `toolbarFilters`
- Table actions → `toolbarActions` (far right after Columns toggle)
- KPI cards → `<StatCard>` | Sparklines → `<Sparkline>` | Empty → `<EmptyState size="sm/md">`
- `"use client"` required for: hooks, DataTable render fns, toolbar state, error.tsx

## New table page
1. `"use client"` · 2. `DataTableColumn<T>[]` · 3. `MultiSelectFilter` for enums · 4. `toolbarActions` for CTA · 5. `EmptyState` for zero-data

## Color themes
- 6 presets: Zinc (default/absent), Blue, Violet, Rose, Orange, Emerald
- Only `--primary --ring --sidebar-primary --sidebar-ring` change; backgrounds stay neutral
- `html[data-color-theme="x"]` (0,1,1) beats `:root` (0,1,0)

## Component gotchas
- `Card` has `flex flex-col gap-6` by default — this gap sits between `CardHeader` and `CardContent`. Padding tweaks on those children won't fix it; override on the `Card` itself: `<Card className="gap-2">` or `gap-3` etc.

## Workarounds
- Radix DropdownMenu typeahead: `e.stopPropagation()` on non-arrow keys inside any input in DropdownMenuContent
- DropdownMenuContent focus on open: `open` state + `useEffect` + `setTimeout(() => ref.current?.focus(), 0)` (`onOpenAutoFocus` doesn't exist)
- Dropdown keyboard nav with input: `activeIndex` for visual highlight, keep DOM focus on input — never move focus to items

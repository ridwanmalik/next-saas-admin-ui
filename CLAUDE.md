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
- Always use arrow functions (`const Foo = () =>`) — never `function` declarations

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

## Workarounds
- Radix DropdownMenu typeahead: `e.stopPropagation()` on non-arrow keys inside any input in DropdownMenuContent
- DropdownMenuContent focus on open: `open` state + `useEffect` + `setTimeout(() => ref.current?.focus(), 0)` (`onOpenAutoFocus` doesn't exist)
- Dropdown keyboard nav with input: `activeIndex` for visual highlight, keep DOM focus on input — never move focus to items

# Project: next-saas-admin-ui

Next.js 16 SaaS admin template. Tailwind CSS v4, shadcn/ui v4 (new-york), TypeScript strict.
Stack: Next.js App Router, Tailwind v4, shadcn/ui, lucide-react, next-themes, Yarn 4.

## Route structure
- `app/(admin)/` — all authenticated pages, sidebar + topbar auto-applied via layout.tsx
- `app/(auth)/login/` — public pages, no sidebar
- `app/not-found.tsx` — 404 (no sidebar, full screen)
- `app/(admin)/error.tsx` — 500 boundary (`"use client"`, receives `error` + `reset` props)
- Add a page: create `app/(admin)/your-page/page.tsx` — layout applied automatically
- Add nav item: edit NAV_GROUPS in `lib/constants.ts`

## Existing pages
dashboard, users, analytics, billing, reports, notifications, security, settings

## Key files
- `lib/constants.ts` — NAV_GROUPS (sidebar nav config), APP_NAME
- `lib/themes.ts` — COLOR_THEMES array (6 accent presets with OKLCH swatches)
- `lib/utils.ts` — `cn()` (clsx + tailwind-merge). Always import cn from here.
- `hooks/use-color-theme.ts` — reads/writes localStorage + sets data-color-theme on <html>
- `app/globals.css` — CSS variables, `html[data-color-theme]` blocks for accent themes
- `app/layout.tsx` — root layout: fonts, ThemeProvider, TooltipProvider, FOUC script
- `components/layout/user-dropdown.tsx` — hardcoded MOCK_USER (replace with real auth)
- `types/index.ts` — NavGroup, NavItem, LayoutProps shared types
- `config/index.ts` — reads NEXT_PUBLIC_APP_NAME env var (separate from lib/constants APP_NAME)

## Reusable UI components (components/ui/)
Custom components (not shadcn primitives):

| Component | File | Props summary |
|---|---|---|
| DataTable | `data-table.tsx` | columns, data, toolbarFilters, toolbarActions |
| MultiSelectFilter | `data-table.tsx` | label, options[], value: Set<string>, onChange |
| Sparkline | `sparkline.tsx` | data: number[], positive?: boolean |
| StatCard | `stat-card.tsx` | label, value, change, positive, period?, sparkline?, icon? |
| EmptyState | `empty-state.tsx` | icon, title, description, actions[], size: sm/md/lg |
| ErrorState | `error-state.tsx` | code, title, description, actions[] |

## Patterns — always follow these
- **New filter chip** → `<MultiSelectFilter>` from `data-table.tsx` → pass to `toolbarFilters`
- **Table action buttons** → pass to `toolbarActions` (renders after Columns toggle, far right)
- **Toolbar layout**: `[Search 52px] [toolbarFilters] [ml-auto → [Columns] [toolbarActions]]`
- **KPI/stat cards** → `<StatCard>` — never duplicate the card+sparkline pattern inline
- **Sparklines** → `<Sparkline>` — never inline the SVG polyline again
- **Empty states** → `<EmptyState size="sm">` inside cards, `"md"` for page sections
- **"use client"** → required when: using hooks, render functions passed to DataTable, toolbar components with state, error.tsx

## Adding a new table page (recipe)
1. `"use client"` at top (needed for DataTable render fns)
2. Define columns as `DataTableColumn<YourType>[]`
3. Use `MultiSelectFilter` for any enum/status filters
4. Pass `toolbarActions` for the primary action button (e.g. Add)
5. Use `EmptyState` for zero-data case (DataTable handles it automatically via its empty row)

## Color theme system
- 6 presets: Zinc (default), Blue, Violet, Rose, Orange, Emerald
- Only `--primary`, `--ring`, `--sidebar-primary`, `--sidebar-ring` change per theme
- Backgrounds/surfaces stay neutral (60-30-10 rule — never change bg per theme)
- CSS specificity: `html[data-color-theme="x"]` (0,1,1) beats `:root` (0,1,0)
- Zinc default = `data-color-theme` attribute ABSENT (not set to "zinc")
- FOUC prevention: inline script in <head> applies theme before React hydrates
- Settings page already has the color picker wired up

## Known workarounds
- Radix DropdownMenu intercepts keydown for typeahead → `e.stopPropagation()` on all non-arrow keys in any input inside a DropdownMenuContent
- `onOpenAutoFocus` does NOT exist on shadcn's DropdownMenuContent → use `open` state + `useEffect` + `setTimeout(() => ref.current?.focus(), 0)` instead
- Keyboard nav in dropdowns with an input: use `activeIndex` state for visual highlight, keep DOM focus on the input — never move DOM focus to items

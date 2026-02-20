# Customization Guide

Common tasks you'll need when building your product on top of this template.

---

## 1. Add a New Page

1. Create a folder under `app/(admin)/your-page/`
2. Add a `page.tsx` file:

```tsx
// app/(admin)/your-page/page.tsx
export default function YourPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Your Page</h2>
      {/* content */}
    </div>
  )
}
```

The sidebar and topbar are applied automatically by `app/(admin)/layout.tsx`.

---

## 2. Add a Sidebar Nav Item

Open `lib/constants.ts` and add your item to the relevant group:

```ts
import { YourIcon } from "lucide-react"

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Management",
    items: [
      { icon: YourIcon, title: "Your Page", href: "/your-page" },
      // optional badge:
      { icon: YourIcon, title: "Your Page", href: "/your-page", badge: "5" },
    ],
  },
]
```

Browse available icons at [lucide.dev](https://lucide.dev).

---

## 3. Add a New Nav Group

```ts
{
  label: "Your Group",
  items: [
    { icon: SomeIcon, title: "Item One", href: "/item-one" },
    { icon: AnotherIcon, title: "Item Two", href: "/item-two" },
  ],
}
```

---

## 4. Change the Accent Color Theme

The template ships with 6 accent presets: **Zinc** (default), **Blue**, **Violet**, **Rose**, **Orange**, **Emerald**. Users pick a theme in the Settings → Appearance page; it persists to `localStorage`.

### How it works

- `lib/themes.ts` defines the preset list with OKLCH swatch values.
- `hooks/use-color-theme.ts` reads/writes `localStorage` and sets the `data-color-theme` attribute on `<html>`.
- `app/globals.css` contains `html[data-color-theme="blue"] { ... }` blocks that override only `--primary`, `--ring`, and `--sidebar-primary` — backgrounds and surfaces stay neutral (60-30-10 rule).
- `app/layout.tsx` includes an inline `<script>` in `<head>` to apply the saved theme before first paint, preventing a flash of the wrong color.

### Add a new preset

1. Add a CSS block in `app/globals.css`:

```css
html[data-color-theme="teal"] {
  --primary:            oklch(0.53 0.18 185);
  --primary-foreground: oklch(0.98 0.01 185);
  --ring:               oklch(0.53 0.18 185);
  --sidebar-primary:    oklch(0.53 0.18 185);
  --sidebar-ring:       oklch(0.53 0.18 185);
}
html.dark[data-color-theme="teal"] {
  --primary:            oklch(0.62 0.16 185);
  --primary-foreground: oklch(0.15 0.03 185);
  --ring:               oklch(0.62 0.16 185);
  --sidebar-primary:    oklch(0.62 0.16 185);
  --sidebar-ring:       oklch(0.62 0.16 185);
}
```

2. Add an entry to `lib/themes.ts`:

```ts
{ id: "teal", label: "Teal", swatch: "oklch(0.53 0.18 185)" }
```

Use [oklch.com](https://oklch.com) to pick colors.

### Change the raw CSS variables directly

If you don't need the multi-theme picker, just edit `:root` and `.dark` in `app/globals.css`:

```css
:root  { --primary: oklch(0.53 0.18 185); }
.dark  { --primary: oklch(0.62 0.16 185); }
```

---

## 5. Change the App Name

Edit `lib/constants.ts`:

```ts
export const APP_NAME = "Your App Name"
```

And update `app/layout.tsx` metadata:

```ts
export const metadata: Metadata = {
  title: "Your App Name",
  description: "Your description",
}
```

---

## 6. Add a shadcn Component

```bash
yarn shadcn add <component-name>
```

Examples: `table`, `dialog`, `tabs`, `select`, `calendar`, `chart`

The component will be placed in `components/ui/` and is ready to import.

---

## 7. Add a Public (No Sidebar) Page

Create a route **outside** the `(admin)` group:

```
app/
└── your-public-page/
    └── page.tsx
```

Or add it to `(auth)/` if it's login/signup/reset-password.

---

## 8. Use the DataTable Component

`components/ui/data-table.tsx` is a custom reusable table with sorting, pagination, global search, and column visibility built in.

```tsx
import { DataTable, type DataTableColumn } from "@/components/ui/data-table"

type Item = { id: string; name: string; status: string }

const columns: DataTableColumn<Item>[] = [
  {
    key: "name",
    header: "Name",
    sortable: true,
    hideable: false,          // cannot be hidden via the Columns toggle
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    hideBelow: "md",          // hidden on screens below md breakpoint
    render: row => <span>{row.status}</span>,
  },
]

<DataTable
  columns={columns}
  data={items}
  defaultPageSize={10}
  pageSizeOptions={[5, 10, 25]}
  searchPlaceholder="Search items..."
  toolbarFilters={<YourFilterChip />}   // rendered left of the spacer (after search)
  toolbarActions={<Button>Add</Button>} // rendered right of the Columns toggle
/>
```

**Column options:**

| Prop | Type | Description |
|---|---|---|
| `key` | `string` | Property name on the data object |
| `header` | `string` | Column heading text |
| `sortable` | `boolean` | Enable click-to-sort |
| `align` | `"left" \| "center" \| "right"` | Cell alignment |
| `hideBelow` | `"sm" \| "md" \| "lg"` | Responsive hiding breakpoint |
| `hideable` | `boolean` | Show in the Columns visibility toggle (default `true`) |
| `render` | `(row) => ReactNode` | Custom cell renderer |

**Toolbar slots:**

| Prop | Rendered position |
|---|---|
| `toolbarFilters` | After the search input, before the spacer |
| `toolbarActions` | After the Columns toggle (far right) |

> Pages using custom `render` functions or toolbar components must include `"use client"` at the top.

---

## 9. Use the EmptyState Component

```tsx
import { EmptyState } from "@/components/ui/empty-state"
import { Users } from "lucide-react"

<EmptyState
  icon={Users}
  title="No users yet"
  description="Invite your first team member to get started."
  actions={[
    { label: "Invite user", onClick: () => {} },
    { label: "Learn more",  href: "/docs/users", variant: "outline" },
  ]}
  size="md"   // "sm" (inside cards) | "md" (page sections) | "lg" (full page)
/>
```

---

## 10. Use the ErrorState Component

Used automatically by `app/not-found.tsx` (404) and `app/(admin)/error.tsx` (500). You can also use it directly:

```tsx
import { ErrorState } from "@/components/ui/error-state"
import { RefreshCw } from "lucide-react"

<ErrorState
  code={503}
  title="Service unavailable"
  description="We're having trouble connecting. Please try again shortly."
  actions={[
    { label: "Retry", icon: RefreshCw, onClick: () => location.reload() },
  ]}
/>
```

---

## 11. Replace Mock User Data

`components/layout/user-dropdown.tsx` uses a hardcoded `MOCK_USER` object. Replace it with your actual auth session:

```tsx
// Example with a session hook
const { data: session } = useSession()
const user = session?.user
```

Connect to NextAuth, Clerk, Supabase Auth, or whichever provider you choose.

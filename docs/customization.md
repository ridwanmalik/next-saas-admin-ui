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

## 4. Customize Colors / Theme

Colors are defined as CSS variables in `app/globals.css`. Edit the `:root` block for light mode and `.dark` block for dark mode.

```css
:root {
  --primary: oklch(0.208 0.042 265.755);  /* change this */
  --background: oklch(1 0 0);
}

.dark {
  --primary: oklch(0.488 0.243 264.376);  /* and this */
  --background: oklch(0.165 0.042 264.695);
}
```

Use [oklch.com](https://oklch.com) to pick colors in the OKLCH format used by shadcn v4.

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

> Pages using custom `render` functions must include `"use client"` at the top.

---

## 9. Replace Mock User Data

`components/layout/user-dropdown.tsx` uses a hardcoded `MOCK_USER` object. Replace it with your actual auth session:

```tsx
// Example with a session hook
const { data: session } = useSession()
const user = session?.user
```

Connect to NextAuth, Clerk, Supabase Auth, or whichever provider you choose.

# Reusability Audit

**Goal:** Go through every page in the project and verify it is fully reusable for someone who purchases this SaaS admin template — meaning no hardcoded business logic, all data is mock/prop-driven, and UI is broken into reusable components where appropriate.

**Fix strategy:**
- Page-specific sub-components → `app/(admin)/<page>/_components/`
- Shared across 2+ pages → `components/ui/`

**Legend:**
- `[ ]` Not reviewed
- `[~]` Reviewed — needs work (notes inline)
- `[x]` Reviewed & reusable ✓

---

## Auth

| Status | Page | Route file |
|--------|------|------------|
| `[x]` | Login | `app/(auth)/login/page.tsx` |

---

## Dashboard

| Status | Page | Route file |
|--------|------|------------|
| `[x]` | Default | `app/(admin)/dashboard/page.tsx` |
| `[x]` | Analytics | `app/(admin)/dashboard/analytics/page.tsx` |
| `[x]` | CRM | `app/(admin)/dashboard/crm/page.tsx` |
| `[x]` | Blog | `app/(admin)/dashboard/blog/page.tsx` |

---

## Users

| Status | Page | Route file |
|--------|------|------------|
| `[x]` | List | `app/(admin)/users/list/page.tsx` |
| `[x]` | Cards | `app/(admin)/users/cards/page.tsx` |
| `[x]` | Details | `app/(admin)/users/details/page.tsx` |
| `[x]` | Profile | `app/(admin)/users/profile/page.tsx` |

---

## Kanban

| Status | Page | Route file |
|--------|------|------------|
| `[x]` | Board | `app/(admin)/kanban/board/page.tsx` |
| `[x]` | Backlog | `app/(admin)/kanban/backlog/page.tsx` |
| `[x]` | List | `app/(admin)/kanban/list/page.tsx` |

---

## Contact

| Status | Page | Route file |
|--------|------|------------|
| `[x]` | List | `app/(admin)/contact/list/page.tsx` |
| `[x]` | Card | `app/(admin)/contact/card/page.tsx` |

---

## Chat

| Status | Page | Route file |
|--------|------|------------|
| `[x]` | Chat | `app/(admin)/chat/page.tsx` |

---

## Calendar

| Status | Page | Route file |
|--------|------|------------|
| `[x]` | Calendar | `app/(admin)/calendar/page.tsx` |

---

## Map

| Status | Page | Route file |
|--------|------|------------|
| `[x]` | Locations | `app/(admin)/map/locations/page.tsx` |
| `[x]` | Components | `app/(admin)/map/components/page.tsx` |

---

## Mail

| Status | Page | Route file |
|--------|------|------------|
| `[x]` | Inbox | `app/(admin)/mail/inbox/page.tsx` |
| `[x]` | List | `app/(admin)/mail/list/page.tsx` |

---

## Blog

| Status | Page | Route file |
|--------|------|------------|
| `[x]` | Add New | `app/(admin)/blog/new/page.tsx` |
| `[x]` | Edit | `app/(admin)/blog/edit/page.tsx` |
| `[x]` | Blog List | `app/(admin)/blog/list/page.tsx` |
| `[x]` | Blog Details | `app/(admin)/blog/details/page.tsx` |

---

## E-Commerce

| Status | Page | Route file |
|--------|------|------------|
| `[x]` | Products | `app/(admin)/ecommerce/products/page.tsx` |
| `[x]` | Product Details | `app/(admin)/ecommerce/product-details/page.tsx` |
| `[x]` | Product List | `app/(admin)/ecommerce/product-list/page.tsx` |
| `[x]` | Checkout | `app/(admin)/ecommerce/checkout/page.tsx` |

---

## Invoice

| Status | Page | Route file |
|--------|------|------------|
| `[x]` | Create | `app/(admin)/invoice/create/page.tsx` |
| `[x]` | List | `app/(admin)/invoice/list/page.tsx` |
| `[x]` | Edit | `app/(admin)/invoice/edit/page.tsx` |
| `[x]` | Details | `app/(admin)/invoice/details/page.tsx` |
| `[x]` | Client List | `app/(admin)/invoice/client/page.tsx` |
| `[x]` | Client Create | `app/(admin)/invoice/client/create/page.tsx` |
| `[x]` | Items List | `app/(admin)/invoice/items/page.tsx` |
| `[x]` | Items Add | `app/(admin)/invoice/items/add-item/page.tsx` |
| `[x]` | Payment List | `app/(admin)/invoice/payment/page.tsx` |
| `[x]` | Payment Create | `app/(admin)/invoice/payment/create/page.tsx` |
| `[x]` | Payment Details | `app/(admin)/invoice/payment/details/page.tsx` |

---

## Account

| Status | Page | Route file |
|--------|------|------------|
| `[x]` | Pricing | `app/(admin)/pricing/page.tsx` |
| `[x]` | Activity | `app/(admin)/activity/page.tsx` |
| `[x]` | Security | `app/(admin)/security/page.tsx` |
| `[x]` | Settings | `app/(admin)/settings/page.tsx` |
| `[x]` | Reports | `app/(admin)/reports/page.tsx` |
| `[x]` | Notifications | `app/(admin)/notifications/page.tsx` |

---

## Basic (UI Elements)

| Status | Page | Route file |
|--------|------|------------|
| `[x]` | Typography | `app/(admin)/basic/typography/page.tsx` |
| `[x]` | Colors | `app/(admin)/basic/colors/page.tsx` |
| `[x]` | Table | `app/(admin)/basic/table/page.tsx` |
| `[x]` | List | `app/(admin)/basic/list/page.tsx` |
| `[x]` | Images | `app/(admin)/basic/images/page.tsx` |
| `[x]` | Blockquote | `app/(admin)/basic/blockquote/page.tsx` |

---

## Components (UI Showcase)

| Status | Page | Route file |
|--------|------|------------|
| `[x]` | Accordion | `app/(admin)/components/accordion/page.tsx` |
| `[x]` | Alert | `app/(admin)/components/alert/page.tsx` |
| `[x]` | Alert Dialog | `app/(admin)/components/alert-dialog/page.tsx` |
| `[x]` | Aspect Ratio | `app/(admin)/components/aspect-ratio/page.tsx` |
| `[x]` | Avatar | `app/(admin)/components/avatar/page.tsx` |
| `[x]` | Badge | `app/(admin)/components/badge/page.tsx` |
| `[x]` | Breadcrumb | `app/(admin)/components/breadcrumb/page.tsx` |
| `[x]` | Button | `app/(admin)/components/button/page.tsx` |
| `[x]` | Button Group | `app/(admin)/components/button-group/page.tsx` |
| `[x]` | Calendar | `app/(admin)/components/calendar/page.tsx` |
| `[x]` | Card | `app/(admin)/components/card/page.tsx` |
| `[x]` | Carousel | `app/(admin)/components/carousel/page.tsx` |
| `[x]` | Chart | `app/(admin)/components/chart/page.tsx` |
| `[x]` | Checkbox | `app/(admin)/components/checkbox/page.tsx` |
| `[x]` | Collapsible | `app/(admin)/components/collapsible/page.tsx` |
| `[x]` | Combobox | `app/(admin)/components/combobox/page.tsx` |
| `[x]` | Command | `app/(admin)/components/command/page.tsx` |
| `[x]` | Context Menu | `app/(admin)/components/context-menu/page.tsx` |
| `[x]` | Data Table | `app/(admin)/components/data-table/page.tsx` |
| `[x]` | Date Picker | `app/(admin)/components/date-picker/page.tsx` |
| `[x]` | Dialog | `app/(admin)/components/dialog/page.tsx` |
| `[x]` | Drawer | `app/(admin)/components/drawer/page.tsx` |
| `[x]` | Dropdown Menu | `app/(admin)/components/dropdown-menu/page.tsx` |
| `[x]` | Empty | `app/(admin)/components/empty/page.tsx` |
| `[x]` | Field | `app/(admin)/components/field/page.tsx` |
| `[x]` | Form | `app/(admin)/components/form/page.tsx` |
| `[x]` | Hover Card | `app/(admin)/components/hover-card/page.tsx` |
| `[x]` | Input | `app/(admin)/components/input/page.tsx` |
| `[x]` | Input Group | `app/(admin)/components/input-group/page.tsx` |
| `[x]` | Input OTP | `app/(admin)/components/input-otp/page.tsx` |
| `[x]` | Item | `app/(admin)/components/item/page.tsx` |
| `[x]` | Kbd | `app/(admin)/components/kbd/page.tsx` |
| `[x]` | Label | `app/(admin)/components/label/page.tsx` |
| `[x]` | Menubar | `app/(admin)/components/menubar/page.tsx` |
| `[x]` | Navigation Menu | `app/(admin)/components/navigation-menu/page.tsx` |
| `[x]` | Native Select | `app/(admin)/components/native-select/page.tsx` |
| `[x]` | Pagination | `app/(admin)/components/pagination/page.tsx` |
| `[x]` | Popover | `app/(admin)/components/popover/page.tsx` |
| `[x]` | Progress | `app/(admin)/components/progress/page.tsx` |
| `[x]` | Radio Group | `app/(admin)/components/radio-group/page.tsx` |
| `[x]` | Resizable | `app/(admin)/components/resizable/page.tsx` |
| `[x]` | Scroll Area | `app/(admin)/components/scroll-area/page.tsx` |
| `[x]` | Select | `app/(admin)/components/select/page.tsx` |
| `[x]` | Separator | `app/(admin)/components/separator/page.tsx` |
| `[x]` | Sheet | `app/(admin)/components/sheet/page.tsx` |
| `[x]` | Skeleton | `app/(admin)/components/skeleton/page.tsx` |
| `[x]` | Slider | `app/(admin)/components/slider/page.tsx` |
| `[x]` | Sonner | `app/(admin)/components/sonner/page.tsx` |
| `[x]` | Spinner | `app/(admin)/components/spinner/page.tsx` |
| `[x]` | Switch | `app/(admin)/components/switch/page.tsx` |
| `[x]` | Table | `app/(admin)/components/table/page.tsx` |
| `[x]` | Tabs | `app/(admin)/components/tabs/page.tsx` |
| `[x]` | Textarea | `app/(admin)/components/textarea/page.tsx` |
| `[x]` | Toggle | `app/(admin)/components/toggle/page.tsx` |
| `[x]` | Toggle Group | `app/(admin)/components/toggle-group/page.tsx` |
| `[x]` | Tooltip | `app/(admin)/components/tooltip/page.tsx` |
| `[x]` | Typography | `app/(admin)/components/typography/page.tsx` |

---

## Advanced (UI Elements)

| Status | Page | Route file |
|--------|------|------------|
| `[x]` | Autocomplete | `app/(admin)/advanced/autocomplete/page.tsx` |
| `[x]` | Editor | `app/(admin)/advanced/editor/page.tsx` |
| `[x]` | File Uploader | `app/(admin)/advanced/file-uploader/page.tsx` |
| `[x]` | Image Cropper | `app/(admin)/advanced/image-cropper/page.tsx` |
| `[x]` | FAB Button | `app/(admin)/advanced/speed-dial/page.tsx` |

---

## Forms

| Status | Page | Route file |
|--------|------|------------|
| `[x]` | Login | `app/(admin)/forms/login/page.tsx` |
| `[x]` | Register | `app/(admin)/forms/register/page.tsx` |
| `[x]` | Forgot Password | `app/(admin)/forms/forgot-password/page.tsx` |
| `[x]` | Contact | `app/(admin)/forms/contact/page.tsx` |
| `[x]` | Profile | `app/(admin)/forms/profile/page.tsx` |
| `[x]` | Payment | `app/(admin)/forms/payment/page.tsx` |
| `[x]` | Multi Step | `app/(admin)/forms/multi-step/page.tsx` |
| `[x]` | Validation | `app/(admin)/forms/validation/page.tsx` |
| `[x]` | Clipboard | `app/(admin)/forms/clipboard/page.tsx` |

---

## Icons

| Status | Page | Route file |
|--------|------|------------|
| `[x]` | Default | `app/(admin)/icons/default/page.tsx` |
| `[x]` | Brands | `app/(admin)/icons/brands/page.tsx` |

---

## Charts & Loaders

| Status | Page | Route file |
|--------|------|------------|
| `[x]` | Charts | `app/(admin)/charts/page.tsx` |
| `[x]` | Loaders | `app/(admin)/loaders/page.tsx` |

---

## Landing Pages

| Status | Page | Route file |
|--------|------|------------|
| `[x]` | Home | `app/(landing)/landing/home/page.tsx` |
| `[x]` | About | `app/(landing)/landing/about/page.tsx` |
| `[x]` | Pricing | `app/(landing)/landing/pricing/page.tsx` |
| `[x]` | Contact | `app/(landing)/landing/contact/page.tsx` |
| `[x]` | Coming Soon | `app/(landing)/landing/coming-soon/page.tsx` |
| `[x]` | Maintenance | `app/(landing)/landing/maintenance/page.tsx` |
| `[x]` | Terms & Conditions | `app/(landing)/landing/terms/page.tsx` |
| `[x]` | Privacy Policy | `app/(landing)/landing/privacy/page.tsx` |
| `[x]` | Error 404 | `app/(landing)/landing/error/404/page.tsx` |
| `[x]` | Error 500 | `app/(landing)/landing/error/500/page.tsx` |
| `[x]` | Error 401 | `app/(landing)/landing/error/401/page.tsx` |

---

## Review checklist (per page)

When reviewing each page, ask:

- [ ] All data is mock / hardcoded sample data — no real API calls or secrets
- [ ] No hardcoded brand names, company names, or personal details
- [ ] Large inline JSX blocks are extracted into named components in `_components/`
- [ ] Repeated patterns across the page use a local reusable component
- [ ] Patterns shared with other pages live in `components/ui/` (not duplicated)
- [ ] No TODOs or debug code left in the file
- [ ] `"use client"` is present only where genuinely needed (hooks, event handlers)
- [ ] Page renders correctly with an empty / zero-data state (`<EmptyState>`)
- [ ] No hardcoded pixel sizes — uses Tailwind scale or `@theme inline` tokens
- [ ] Consistent code style: arrow functions, `cn()` from `lib/utils`, no inline styles

---

## Progress summary

| Group | Total | Done |
|-------|-------|------|
| Auth | 1 | 1 |
| Dashboard | 4 | 4 |
| Users | 4 | 4 |
| Kanban | 3 | 3 |
| Contact | 2 | 2 |
| Chat | 1 | 1 |
| Calendar | 1 | 1 |
| Map | 2 | 2 |
| Mail | 2 | 2 |
| Blog | 4 | 4 |
| E-Commerce | 4 | 4 |
| Invoice | 11 | 11 |
| Account | 6 | 6 |
| Basic | 6 | 6 |
| Components | 54 | 54 |
| Advanced | 5 | 5 |
| Forms | 9 | 9 |
| Icons | 2 | 2 |
| Charts & Loaders | 2 | 2 |
| Landing Pages | 11 | 11 |
| **Total** | **134** | **134** |

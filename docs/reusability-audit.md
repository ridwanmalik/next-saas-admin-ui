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
| `[ ]` | Login | `app/(auth)/login/page.tsx` |

---

## Dashboard

| Status | Page | Route file |
|--------|------|------------|
| `[ ]` | Default | `app/(admin)/dashboard/page.tsx` |
| `[ ]` | Analytics | `app/(admin)/dashboard/analytics/page.tsx` |
| `[ ]` | CRM | `app/(admin)/dashboard/crm/page.tsx` |
| `[ ]` | Blog | `app/(admin)/dashboard/blog/page.tsx` |

---

## Users

| Status | Page | Route file |
|--------|------|------------|
| `[ ]` | List | `app/(admin)/users/list/page.tsx` |
| `[ ]` | Cards | `app/(admin)/users/cards/page.tsx` |
| `[ ]` | Details | `app/(admin)/users/details/page.tsx` |
| `[ ]` | Profile | `app/(admin)/users/profile/page.tsx` |

---

## Kanban

| Status | Page | Route file |
|--------|------|------------|
| `[ ]` | Board | `app/(admin)/kanban/board/page.tsx` |
| `[ ]` | Backlog | `app/(admin)/kanban/backlog/page.tsx` |
| `[ ]` | List | `app/(admin)/kanban/list/page.tsx` |

---

## Contact

| Status | Page | Route file |
|--------|------|------------|
| `[ ]` | List | `app/(admin)/contact/list/page.tsx` |
| `[ ]` | Card | `app/(admin)/contact/card/page.tsx` |

---

## Chat

| Status | Page | Route file |
|--------|------|------------|
| `[ ]` | Chat | `app/(admin)/chat/page.tsx` |

---

## Calendar

| Status | Page | Route file |
|--------|------|------------|
| `[ ]` | Calendar | `app/(admin)/calendar/page.tsx` |

---

## Map

| Status | Page | Route file |
|--------|------|------------|
| `[ ]` | Locations | `app/(admin)/map/locations/page.tsx` |
| `[ ]` | Components | `app/(admin)/map/components/page.tsx` |

---

## Mail

| Status | Page | Route file |
|--------|------|------------|
| `[ ]` | Inbox | `app/(admin)/mail/inbox/page.tsx` |
| `[ ]` | List | `app/(admin)/mail/list/page.tsx` |

---

## Blog

| Status | Page | Route file |
|--------|------|------------|
| `[ ]` | Add New | `app/(admin)/blog/new/page.tsx` |
| `[ ]` | Edit | `app/(admin)/blog/edit/page.tsx` |
| `[ ]` | Blog List | `app/(admin)/blog/list/page.tsx` |
| `[ ]` | Blog Details | `app/(admin)/blog/details/page.tsx` |

---

## E-Commerce

| Status | Page | Route file |
|--------|------|------------|
| `[ ]` | Products | `app/(admin)/ecommerce/products/page.tsx` |
| `[ ]` | Product Details | `app/(admin)/ecommerce/product-details/page.tsx` |
| `[ ]` | Product List | `app/(admin)/ecommerce/product-list/page.tsx` |
| `[ ]` | Checkout | `app/(admin)/ecommerce/checkout/page.tsx` |

---

## Invoice

| Status | Page | Route file |
|--------|------|------------|
| `[ ]` | Create | `app/(admin)/invoice/create/page.tsx` |
| `[ ]` | List | `app/(admin)/invoice/list/page.tsx` |
| `[ ]` | Edit | `app/(admin)/invoice/edit/page.tsx` |
| `[ ]` | Details | `app/(admin)/invoice/details/page.tsx` |
| `[ ]` | Client List | `app/(admin)/invoice/client/page.tsx` |
| `[ ]` | Client Create | `app/(admin)/invoice/client/create/page.tsx` |
| `[ ]` | Items List | `app/(admin)/invoice/items/page.tsx` |
| `[ ]` | Items Add | `app/(admin)/invoice/items/add-item/page.tsx` |
| `[ ]` | Payment List | `app/(admin)/invoice/payment/page.tsx` |
| `[ ]` | Payment Create | `app/(admin)/invoice/payment/create/page.tsx` |
| `[ ]` | Payment Details | `app/(admin)/invoice/payment/details/page.tsx` |

---

## Account

| Status | Page | Route file |
|--------|------|------------|
| `[ ]` | Pricing | `app/(admin)/pricing/page.tsx` |
| `[ ]` | Activity | `app/(admin)/activity/page.tsx` |
| `[ ]` | Security | `app/(admin)/security/page.tsx` |
| `[ ]` | Settings | `app/(admin)/settings/page.tsx` |
| `[ ]` | Reports | `app/(admin)/reports/page.tsx` |
| `[ ]` | Notifications | `app/(admin)/notifications/page.tsx` |

---

## Basic (UI Elements)

| Status | Page | Route file |
|--------|------|------------|
| `[ ]` | Typography | `app/(admin)/basic/typography/page.tsx` |
| `[ ]` | Colors | `app/(admin)/basic/colors/page.tsx` |
| `[ ]` | Table | `app/(admin)/basic/table/page.tsx` |
| `[ ]` | List | `app/(admin)/basic/list/page.tsx` |
| `[ ]` | Images | `app/(admin)/basic/images/page.tsx` |
| `[ ]` | Blockquote | `app/(admin)/basic/blockquote/page.tsx` |

---

## Components (UI Showcase)

| Status | Page | Route file |
|--------|------|------------|
| `[ ]` | Accordion | `app/(admin)/components/accordion/page.tsx` |
| `[ ]` | Alert | `app/(admin)/components/alert/page.tsx` |
| `[ ]` | Alert Dialog | `app/(admin)/components/alert-dialog/page.tsx` |
| `[ ]` | Aspect Ratio | `app/(admin)/components/aspect-ratio/page.tsx` |
| `[ ]` | Avatar | `app/(admin)/components/avatar/page.tsx` |
| `[ ]` | Badge | `app/(admin)/components/badge/page.tsx` |
| `[ ]` | Breadcrumb | `app/(admin)/components/breadcrumb/page.tsx` |
| `[ ]` | Button | `app/(admin)/components/button/page.tsx` |
| `[ ]` | Button Group | `app/(admin)/components/button-group/page.tsx` |
| `[ ]` | Calendar | `app/(admin)/components/calendar/page.tsx` |
| `[ ]` | Card | `app/(admin)/components/card/page.tsx` |
| `[ ]` | Carousel | `app/(admin)/components/carousel/page.tsx` |
| `[ ]` | Chart | `app/(admin)/components/chart/page.tsx` |
| `[ ]` | Checkbox | `app/(admin)/components/checkbox/page.tsx` |
| `[ ]` | Collapsible | `app/(admin)/components/collapsible/page.tsx` |
| `[ ]` | Combobox | `app/(admin)/components/combobox/page.tsx` |
| `[ ]` | Command | `app/(admin)/components/command/page.tsx` |
| `[ ]` | Context Menu | `app/(admin)/components/context-menu/page.tsx` |
| `[ ]` | Data Table | `app/(admin)/components/data-table/page.tsx` |
| `[ ]` | Date Picker | `app/(admin)/components/date-picker/page.tsx` |
| `[ ]` | Dialog | `app/(admin)/components/dialog/page.tsx` |
| `[ ]` | Drawer | `app/(admin)/components/drawer/page.tsx` |
| `[ ]` | Dropdown Menu | `app/(admin)/components/dropdown-menu/page.tsx` |
| `[ ]` | Empty | `app/(admin)/components/empty/page.tsx` |
| `[ ]` | Field | `app/(admin)/components/field/page.tsx` |
| `[ ]` | Form | `app/(admin)/components/form/page.tsx` |
| `[ ]` | Hover Card | `app/(admin)/components/hover-card/page.tsx` |
| `[ ]` | Input | `app/(admin)/components/input/page.tsx` |
| `[ ]` | Input Group | `app/(admin)/components/input-group/page.tsx` |
| `[ ]` | Input OTP | `app/(admin)/components/input-otp/page.tsx` |
| `[ ]` | Item | `app/(admin)/components/item/page.tsx` |
| `[ ]` | Kbd | `app/(admin)/components/kbd/page.tsx` |
| `[ ]` | Label | `app/(admin)/components/label/page.tsx` |
| `[ ]` | Menubar | `app/(admin)/components/menubar/page.tsx` |
| `[ ]` | Navigation Menu | `app/(admin)/components/navigation-menu/page.tsx` |
| `[ ]` | Native Select | `app/(admin)/components/native-select/page.tsx` |
| `[ ]` | Pagination | `app/(admin)/components/pagination/page.tsx` |
| `[ ]` | Popover | `app/(admin)/components/popover/page.tsx` |
| `[ ]` | Progress | `app/(admin)/components/progress/page.tsx` |
| `[ ]` | Radio Group | `app/(admin)/components/radio-group/page.tsx` |
| `[ ]` | Resizable | `app/(admin)/components/resizable/page.tsx` |
| `[ ]` | Scroll Area | `app/(admin)/components/scroll-area/page.tsx` |
| `[ ]` | Select | `app/(admin)/components/select/page.tsx` |
| `[ ]` | Separator | `app/(admin)/components/separator/page.tsx` |
| `[ ]` | Sheet | `app/(admin)/components/sheet/page.tsx` |
| `[ ]` | Skeleton | `app/(admin)/components/skeleton/page.tsx` |
| `[ ]` | Slider | `app/(admin)/components/slider/page.tsx` |
| `[ ]` | Sonner | `app/(admin)/components/sonner/page.tsx` |
| `[ ]` | Spinner | `app/(admin)/components/spinner/page.tsx` |
| `[ ]` | Switch | `app/(admin)/components/switch/page.tsx` |
| `[ ]` | Table | `app/(admin)/components/table/page.tsx` |
| `[ ]` | Tabs | `app/(admin)/components/tabs/page.tsx` |
| `[ ]` | Textarea | `app/(admin)/components/textarea/page.tsx` |
| `[ ]` | Toggle | `app/(admin)/components/toggle/page.tsx` |
| `[ ]` | Toggle Group | `app/(admin)/components/toggle-group/page.tsx` |
| `[ ]` | Tooltip | `app/(admin)/components/tooltip/page.tsx` |
| `[ ]` | Typography | `app/(admin)/components/typography/page.tsx` |

---

## Advanced (UI Elements)

| Status | Page | Route file |
|--------|------|------------|
| `[ ]` | Autocomplete | `app/(admin)/advanced/autocomplete/page.tsx` |
| `[ ]` | Editor | `app/(admin)/advanced/editor/page.tsx` |
| `[ ]` | File Uploader | `app/(admin)/advanced/file-uploader/page.tsx` |
| `[ ]` | Image Cropper | `app/(admin)/advanced/image-cropper/page.tsx` |
| `[ ]` | FAB Button | `app/(admin)/advanced/speed-dial/page.tsx` |

---

## Forms

| Status | Page | Route file |
|--------|------|------------|
| `[ ]` | Login | `app/(admin)/forms/login/page.tsx` |
| `[ ]` | Register | `app/(admin)/forms/register/page.tsx` |
| `[ ]` | Forgot Password | `app/(admin)/forms/forgot-password/page.tsx` |
| `[ ]` | Contact | `app/(admin)/forms/contact/page.tsx` |
| `[ ]` | Profile | `app/(admin)/forms/profile/page.tsx` |
| `[ ]` | Payment | `app/(admin)/forms/payment/page.tsx` |
| `[ ]` | Multi Step | `app/(admin)/forms/multi-step/page.tsx` |
| `[ ]` | Validation | `app/(admin)/forms/validation/page.tsx` |
| `[ ]` | Clipboard | `app/(admin)/forms/clipboard/page.tsx` |

---

## Icons

| Status | Page | Route file |
|--------|------|------------|
| `[ ]` | Default | `app/(admin)/icons/default/page.tsx` |
| `[ ]` | Brands | `app/(admin)/icons/brands/page.tsx` |

---

## Charts & Loaders

| Status | Page | Route file |
|--------|------|------------|
| `[ ]` | Charts | `app/(admin)/charts/page.tsx` |
| `[ ]` | Loaders | `app/(admin)/loaders/page.tsx` |

---

## Landing Pages

| Status | Page | Route file |
|--------|------|------------|
| `[ ]` | Home | `app/(landing)/landing/home/page.tsx` |
| `[ ]` | About | `app/(landing)/landing/about/page.tsx` |
| `[ ]` | Pricing | `app/(landing)/landing/pricing/page.tsx` |
| `[ ]` | Contact | `app/(landing)/landing/contact/page.tsx` |
| `[ ]` | Coming Soon | `app/(landing)/landing/coming-soon/page.tsx` |
| `[ ]` | Maintenance | `app/(landing)/landing/maintenance/page.tsx` |
| `[ ]` | Terms & Conditions | `app/(landing)/landing/terms/page.tsx` |
| `[ ]` | Privacy Policy | `app/(landing)/landing/privacy/page.tsx` |
| `[ ]` | Error 404 | `app/(landing)/landing/error/404/page.tsx` |
| `[ ]` | Error 500 | `app/(landing)/landing/error/500/page.tsx` |
| `[ ]` | Error 401 | `app/(landing)/landing/error/401/page.tsx` |

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
| Auth | 1 | 0 |
| Dashboard | 4 | 0 |
| Users | 4 | 0 |
| Kanban | 3 | 0 |
| Contact | 2 | 0 |
| Chat | 1 | 0 |
| Calendar | 1 | 0 |
| Map | 2 | 0 |
| Mail | 2 | 0 |
| Blog | 4 | 0 |
| E-Commerce | 4 | 0 |
| Invoice | 11 | 0 |
| Account | 6 | 0 |
| Basic | 6 | 0 |
| Components | 54 | 0 |
| Advanced | 5 | 0 |
| Forms | 9 | 0 |
| Icons | 2 | 0 |
| Charts & Loaders | 2 | 0 |
| Landing Pages | 11 | 0 |
| **Total** | **134** | **0** |

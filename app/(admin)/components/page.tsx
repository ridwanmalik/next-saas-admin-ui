import Link from "next/link"

const COMPONENTS = [
  { title: "Accordion", href: "/components/accordion" },
  { title: "Alert", href: "/components/alert" },
  { title: "Alert Dialog", href: "/components/alert-dialog" },
  { title: "Aspect Ratio", href: "/components/aspect-ratio" },
  { title: "Avatar", href: "/components/avatar" },
  { title: "Badge", href: "/components/badge" },
  { title: "Breadcrumb", href: "/components/breadcrumb" },
  { title: "Button", href: "/components/button" },
  { title: "Button Group", href: "/components/button-group" },
  { title: "Calendar", href: "/components/calendar" },
  { title: "Card", href: "/components/card" },
  { title: "Carousel", href: "/components/carousel" },
  { title: "Chart", href: "/components/chart" },
  { title: "Checkbox", href: "/components/checkbox" },
  { title: "Collapsible", href: "/components/collapsible" },
  { title: "Combobox", href: "/components/combobox" },
  { title: "Command", href: "/components/command" },
  { title: "Context Menu", href: "/components/context-menu" },
  { title: "Date Picker", href: "/components/date-picker" },
  { title: "Dialog", href: "/components/dialog" },
  { title: "Drawer", href: "/components/drawer" },
  { title: "Dropdown Menu", href: "/components/dropdown-menu" },
  { title: "Empty", href: "/components/empty" },
  { title: "Field", href: "/components/field" },
  { title: "Form", href: "/components/form" },
  { title: "Hover Card", href: "/components/hover-card" },
  { title: "Input", href: "/components/input" },
  { title: "Input Group", href: "/components/input-group" },
  { title: "Input OTP", href: "/components/input-otp" },
  { title: "Item", href: "/components/item" },
  { title: "Kbd", href: "/components/kbd" },
  { title: "Label", href: "/components/label" },
  { title: "Menubar", href: "/components/menubar" },
  { title: "Native Select", href: "/components/native-select" },
  { title: "Navigation Menu", href: "/components/navigation-menu" },
  { title: "Pagination", href: "/components/pagination" },
  { title: "Popover", href: "/components/popover" },
  { title: "Progress", href: "/components/progress" },
  { title: "Radio Group", href: "/components/radio-group" },
  { title: "Resizable", href: "/components/resizable" },
  { title: "Scroll Area", href: "/components/scroll-area" },
  { title: "Select", href: "/components/select" },
  { title: "Separator", href: "/components/separator" },
  { title: "Sheet", href: "/components/sheet" },
  { title: "Skeleton", href: "/components/skeleton" },
  { title: "Slider", href: "/components/slider" },
  { title: "Sonner", href: "/components/sonner" },
  { title: "Spinner", href: "/components/spinner" },
  { title: "Switch", href: "/components/switch" },
  { title: "Table", href: "/components/table" },
  { title: "Tabs", href: "/components/tabs" },
  { title: "Textarea", href: "/components/textarea" },
  { title: "Toggle", href: "/components/toggle" },
  { title: "Toggle Group", href: "/components/toggle-group" },
  { title: "Tooltip", href: "/components/tooltip" },
  { title: "Typography", href: "/components/typography" },
]

const ComponentsPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Components</h2>
      <p className="text-muted-foreground">
        Browse all {COMPONENTS.length} UI components built with shadcn/ui.
      </p>
    </div>
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {COMPONENTS.map((c) => (
        <Link
          key={c.href}
          href={c.href}
          className="rounded-lg border px-4 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          {c.title}
        </Link>
      ))}
    </div>
  </div>
)

export default ComponentsPage

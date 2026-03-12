import { Badge } from "@/components/ui/badge"

const Section = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <div className="rounded-xl border bg-card overflow-hidden">{children}</div>
  </div>
)

const USERS = [
  { name: "Sarah Chen",   email: "sarah@example.com",  role: "Admin",   status: "Active",   joined: "Jan 12, 2025" },
  { name: "James Park",   email: "james@example.com",  role: "Editor",  status: "Active",   joined: "Feb 3, 2025"  },
  { name: "Priya Nair",   email: "priya@example.com",  role: "Viewer",  status: "Inactive", joined: "Feb 28, 2025" },
  { name: "Tom Rivera",   email: "tom@example.com",    role: "Editor",  status: "Active",   joined: "Mar 5, 2025"  },
  { name: "Leila Hassan", email: "leila@example.com",  role: "Viewer",  status: "Pending",  joined: "Mar 18, 2025" },
]

const statusVariant = (s: string) =>
  s === "Active" ? "default" : s === "Inactive" ? "secondary" : "outline"

const TablePage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-10">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Table</h2>
      <p className="text-muted-foreground">Basic HTML table patterns and style variants.</p>
    </div>

    {/* Basic */}
    <Section title="Basic table" description="Clean bordered table with a header row.">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40">
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Role</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Joined</th>
          </tr>
        </thead>
        <tbody>
          {USERS.map(({ name, email, role, joined }) => (
            <tr key={name} className="border-b last:border-0">
              <td className="px-4 py-3 font-medium">{name}</td>
              <td className="px-4 py-3 text-muted-foreground">{email}</td>
              <td className="px-4 py-3 text-muted-foreground">{role}</td>
              <td className="px-4 py-3 text-muted-foreground">{joined}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>

    {/* Striped */}
    <Section title="Striped rows" description="Alternating row background for easier scanning.">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40">
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Role</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
          </tr>
        </thead>
        <tbody>
          {USERS.map(({ name, email, role, status }, i) => (
            <tr key={name} className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}>
              <td className="px-4 py-3 font-medium">{name}</td>
              <td className="px-4 py-3 text-muted-foreground">{email}</td>
              <td className="px-4 py-3 text-muted-foreground">{role}</td>
              <td className="px-4 py-3">
                <Badge variant={statusVariant(status)} className="text-[10px]">{status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>

    {/* Hoverable */}
    <Section title="Hoverable rows" description="Row highlight on hover for interactive tables.">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40">
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Role</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
            <th className="px-4 py-3 text-right font-medium text-muted-foreground">Joined</th>
          </tr>
        </thead>
        <tbody>
          {USERS.map(({ name, role, status, joined }) => (
            <tr key={name} className="border-b last:border-0 hover:bg-muted/40 cursor-pointer transition-colors">
              <td className="px-4 py-3 font-medium">{name}</td>
              <td className="px-4 py-3 text-muted-foreground">{role}</td>
              <td className="px-4 py-3">
                <Badge variant={statusVariant(status)} className="text-[10px]">{status}</Badge>
              </td>
              <td className="px-4 py-3 text-right text-muted-foreground">{joined}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>

    {/* With footer */}
    <Section title="Table with footer" description="Summary row at the bottom using tfoot.">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40">
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Item</th>
            <th className="px-4 py-3 text-right font-medium text-muted-foreground">Qty</th>
            <th className="px-4 py-3 text-right font-medium text-muted-foreground">Unit price</th>
            <th className="px-4 py-3 text-right font-medium text-muted-foreground">Total</th>
          </tr>
        </thead>
        <tbody>
          {[
            { item: "Pro seats × 12",   qty: 12, price: 29,  total: 348  },
            { item: "Add-on: Analytics", qty: 1,  price: 49,  total: 49   },
            { item: "Add-on: Storage",   qty: 1,  price: 19,  total: 19   },
          ].map(({ item, qty, price, total }) => (
            <tr key={item} className="border-b">
              <td className="px-4 py-3">{item}</td>
              <td className="px-4 py-3 text-right text-muted-foreground">{qty}</td>
              <td className="px-4 py-3 text-right text-muted-foreground">${price}</td>
              <td className="px-4 py-3 text-right font-medium">${total}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-muted/40">
            <td colSpan={3} className="px-4 py-3 font-semibold">Total</td>
            <td className="px-4 py-3 text-right font-bold">$416</td>
          </tr>
        </tfoot>
      </table>
    </Section>
  </div>
)

export default TablePage

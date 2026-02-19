import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const USERS = [
  { name: "Alice Johnson", email: "alice@example.com", plan: "Pro", status: "Active", joined: "Jan 12, 2025" },
  { name: "Bob Smith", email: "bob@example.com", plan: "Free", status: "Active", joined: "Feb 3, 2025" },
  { name: "Carol White", email: "carol@example.com", plan: "Enterprise", status: "Active", joined: "Mar 18, 2025" },
  { name: "David Lee", email: "david@example.com", plan: "Pro", status: "Inactive", joined: "Apr 7, 2025" },
  { name: "Eva Martinez", email: "eva@example.com", plan: "Free", status: "Active", joined: "May 22, 2025" },
]

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Users</h2>
        <p className="text-muted-foreground">Manage your platform users.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>A list of all registered users on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">Name</th>
                  <th className="pb-3 pr-4 font-medium">Email</th>
                  <th className="pb-3 pr-4 font-medium">Plan</th>
                  <th className="pb-3 pr-4 font-medium">Status</th>
                  <th className="pb-3 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {USERS.map((user) => (
                  <tr key={user.email} className="py-3">
                    <td className="py-3 pr-4 font-medium">{user.name}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{user.email}</td>
                    <td className="py-3 pr-4">
                      <Badge variant="outline">{user.plan}</Badge>
                    </td>
                    <td className="py-3 pr-4">
                      <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-muted-foreground">{user.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

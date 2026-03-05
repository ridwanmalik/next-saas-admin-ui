"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ShowCard from "../_components/show-card"

const TabsPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Tabs</h2>
      <p className="text-muted-foreground">A set of layered sections of content, known as tab panels.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="Default Variant">
        <Tabs defaultValue="account" className="max-w-sm">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="p-3 border rounded-md mt-2 text-sm text-muted-foreground">
            Manage your account settings and preferences.
          </TabsContent>
          <TabsContent value="password" className="p-3 border rounded-md mt-2 text-sm text-muted-foreground">
            Change your password. You'll be logged out after saving.
          </TabsContent>
          <TabsContent value="team" className="p-3 border rounded-md mt-2 text-sm text-muted-foreground">
            Invite team members and manage permissions.
          </TabsContent>
        </Tabs>
      </ShowCard>
      <ShowCard title="Line Variant">
        <Tabs defaultValue="overview">
          <TabsList variant="line">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
        </Tabs>
      </ShowCard>
      <ShowCard title="Vertical Orientation">
        <Tabs defaultValue="account" orientation="vertical" className="max-w-xs">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="p-3 border rounded-md text-sm text-muted-foreground">
            Account settings content.
          </TabsContent>
          <TabsContent value="password" className="p-3 border rounded-md text-sm text-muted-foreground">
            Password settings content.
          </TabsContent>
          <TabsContent value="notifications" className="p-3 border rounded-md text-sm text-muted-foreground">
            Notification preferences.
          </TabsContent>
        </Tabs>
      </ShowCard>
    </div>
  </div>
)

export default TabsPage

"use client"

import { Settings, User, Bell, CreditCard, ChevronRight } from "lucide-react"
import {
  Item, ItemMedia, ItemContent, ItemActions, ItemGroup,
  ItemSeparator, ItemTitle, ItemDescription, ItemHeader,
} from "@/components/ui/item"
import ShowCard from "../_components/show-card"

const ItemPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Item</h2>
      <p className="text-muted-foreground">A flex-container for displaying content with media, title, description, and actions.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="Icon">
        <Item className="w-full max-w-sm">
          <ItemMedia><Settings className="size-4" /></ItemMedia>
          <ItemContent>
            <ItemTitle>Settings</ItemTitle>
            <ItemDescription>Manage your account preferences.</ItemDescription>
          </ItemContent>
        </Item>
      </ShowCard>
      <ShowCard title="Group">
        <ItemGroup className="w-full max-w-sm rounded-lg border divide-y">
          <Item className="px-4 py-3">
            <ItemMedia><User className="size-4" /></ItemMedia>
            <ItemContent><ItemTitle>Profile</ItemTitle></ItemContent>
            <ItemActions><ChevronRight className="size-4 text-muted-foreground" /></ItemActions>
          </Item>
          <ItemSeparator />
          <Item className="px-4 py-3">
            <ItemMedia><Bell className="size-4" /></ItemMedia>
            <ItemContent><ItemTitle>Notifications</ItemTitle></ItemContent>
            <ItemActions><ChevronRight className="size-4 text-muted-foreground" /></ItemActions>
          </Item>
          <ItemSeparator />
          <Item className="px-4 py-3">
            <ItemMedia><CreditCard className="size-4" /></ItemMedia>
            <ItemContent><ItemTitle>Billing</ItemTitle></ItemContent>
            <ItemActions><ChevronRight className="size-4 text-muted-foreground" /></ItemActions>
          </Item>
        </ItemGroup>
      </ShowCard>
      <ShowCard title="With Header">
        <ItemGroup className="w-full max-w-sm rounded-lg border">
          <ItemHeader className="px-4 pt-3 pb-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Account</p>
          </ItemHeader>
          <Item className="px-4 py-3">
            <ItemMedia><User className="size-4" /></ItemMedia>
            <ItemContent>
              <ItemTitle>Jane Doe</ItemTitle>
              <ItemDescription>jane@example.com</ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      </ShowCard>
    </div>
  </div>
)

export default ItemPage

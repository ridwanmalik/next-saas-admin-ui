"use client"

import { Search, Plus } from "lucide-react"
import {
  Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia,
} from "@/components/ui/empty"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import ShowCard from "../_components/show-card"

const EmptyPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Empty</h2>
      <p className="text-muted-foreground">A structured placeholder shown when there is no data to display.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="Basic">
        <Empty className="w-full max-w-sm rounded-xl border p-8">
          <EmptyHeader>
            <EmptyMedia><Search className="size-6 text-muted-foreground" /></EmptyMedia>
            <EmptyTitle>No results found</EmptyTitle>
            <EmptyDescription>Try adjusting your search or filters.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm" variant="outline">Clear filters</Button>
          </EmptyContent>
        </Empty>
      </ShowCard>
      <ShowCard title="With Avatar">
        <Empty className="w-full max-w-sm rounded-xl border p-8">
          <EmptyHeader>
            <EmptyMedia>
              <Avatar className="size-12">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </EmptyMedia>
            <EmptyTitle>No team members</EmptyTitle>
            <EmptyDescription>Invite people to collaborate on this project.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm"><Plus />Invite member</Button>
          </EmptyContent>
        </Empty>
      </ShowCard>
      <ShowCard title="Minimal">
        <Empty className="w-full max-w-sm p-8">
          <EmptyHeader>
            <EmptyTitle>No notifications</EmptyTitle>
            <EmptyDescription>You're all caught up! Check back later.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </ShowCard>
    </div>
  </div>
)

export default EmptyPage

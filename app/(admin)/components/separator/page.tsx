"use client"

import { Separator } from "@/components/ui/separator"
import ShowCard from "../_components/show-card"

const SeparatorPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Separator</h2>
      <p className="text-muted-foreground">Visually or semantically separates content.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="Horizontal">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Section above</p>
          <Separator />
          <p className="text-sm text-muted-foreground">Section below</p>
        </div>
      </ShowCard>
      <ShowCard title="Vertical">
        <div className="flex h-6 items-center gap-4 text-sm">
          <span>Profile</span><Separator orientation="vertical" />
          <span>Settings</span><Separator orientation="vertical" />
          <span>Sign out</span>
        </div>
      </ShowCard>
      <ShowCard title="With Label">
        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">OR</span>
          <Separator className="flex-1" />
        </div>
      </ShowCard>
    </div>
  </div>
)

export default SeparatorPage

"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import ShowCard from "../_components/show-card"

const LabelPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Label</h2>
      <p className="text-muted-foreground">Renders an accessible label associated with controls.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="With Input">
        <div className="grid max-w-sm gap-2">
          <Label htmlFor="l-name">Full name</Label>
          <Input id="l-name" placeholder="John Doe" />
        </div>
      </ShowCard>
      <ShowCard title="With Checkbox">
        <div className="flex items-center gap-2">
          <Checkbox id="l-agree" defaultChecked />
          <Label htmlFor="l-agree">I agree to the terms and conditions</Label>
        </div>
      </ShowCard>
      <ShowCard title="Disabled">
        <div className="grid max-w-sm gap-2">
          <Label htmlFor="l-dis" className="text-muted-foreground">Disabled field</Label>
          <Input id="l-dis" disabled placeholder="Not editable" />
        </div>
      </ShowCard>
    </div>
  </div>
)

export default LabelPage

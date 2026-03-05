"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import ShowCard from "../_components/show-card"

const TextareaPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Textarea</h2>
      <p className="text-muted-foreground">A multi-line text input control.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="Default">
        <Textarea className="max-w-sm" placeholder="Type your message here." />
      </ShowCard>
      <ShowCard title="States">
        <div className="grid max-w-sm gap-3">
          <Textarea placeholder="Default" />
          <Textarea placeholder="Disabled" disabled />
          <Textarea placeholder="Invalid" aria-invalid="true" />
        </div>
      </ShowCard>
      <ShowCard title="With Label">
        <div className="grid max-w-sm gap-2">
          <Label htmlFor="ta-msg">Message</Label>
          <Textarea id="ta-msg" placeholder="Write your message here..." rows={4} />
        </div>
      </ShowCard>
      <ShowCard title="With Button">
        <div className="grid max-w-sm gap-2">
          <Textarea placeholder="Write your feedback..." rows={3} />
          <Button>Submit feedback</Button>
        </div>
      </ShowCard>
    </div>
  </div>
)

export default TextareaPage

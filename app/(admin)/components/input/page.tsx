"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import ShowCard from "../_components/show-card"

const InputPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Input</h2>
      <p className="text-muted-foreground">Displays a form input field or a component that looks like an input field.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="Types">
        <div className="grid max-w-sm gap-3">
          <Input type="text" placeholder="Text" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Input type="number" placeholder="Number" />
          <Input type="file" />
        </div>
      </ShowCard>
      <ShowCard title="States">
        <div className="grid max-w-sm gap-3">
          <Input placeholder="Default" />
          <Input placeholder="Disabled" disabled />
          <Input placeholder="Invalid" aria-invalid="true" />
        </div>
      </ShowCard>
      <ShowCard title="With Label">
        <div className="grid max-w-sm gap-2">
          <Label htmlFor="i-email">Email address</Label>
          <Input id="i-email" type="email" placeholder="you@example.com" />
        </div>
      </ShowCard>
      <ShowCard title="With Button" description="Common search or subscribe pattern.">
        <div className="flex max-w-sm gap-2">
          <Input placeholder="Search..." />
          <Button type="submit"><Search /></Button>
        </div>
      </ShowCard>
    </div>
  </div>
)

export default InputPage

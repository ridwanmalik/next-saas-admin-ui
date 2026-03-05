"use client"

import { Search, Mail, Copy } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import ShowCard from "../_components/show-card"

const InputGroupPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Input Group</h2>
      <p className="text-muted-foreground">Combine inputs with addons, buttons, and icons in a unified control.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="Addon">
        <div className="flex flex-col gap-3">
          <InputGroup className="w-64">
            <InputGroupAddon>https://</InputGroupAddon>
            <InputGroupInput placeholder="example.com" />
          </InputGroup>
          <InputGroup className="w-64">
            <InputGroupInput placeholder="username" />
            <InputGroupAddon>@example.com</InputGroupAddon>
          </InputGroup>
        </div>
      </ShowCard>
      <ShowCard title="Icon Addon">
        <div className="flex flex-col gap-3">
          <InputGroup className="w-64">
            <InputGroupAddon><Search className="size-4 text-muted-foreground" /></InputGroupAddon>
            <InputGroupInput placeholder="Search..." />
          </InputGroup>
          <InputGroup className="w-64">
            <InputGroupAddon><Mail className="size-4 text-muted-foreground" /></InputGroupAddon>
            <InputGroupInput type="email" placeholder="Email address" />
          </InputGroup>
        </div>
      </ShowCard>
      <ShowCard title="Button">
        <div className="flex flex-col gap-3">
          <InputGroup className="w-64">
            <InputGroupInput placeholder="Search..." />
            <InputGroupButton variant="default">Search</InputGroupButton>
          </InputGroup>
          <InputGroup className="w-64">
            <InputGroupInput placeholder="Enter URL" />
            <InputGroupButton variant="outline"><Copy className="size-4" /></InputGroupButton>
          </InputGroup>
        </div>
      </ShowCard>
    </div>
  </div>
)

export default InputGroupPage

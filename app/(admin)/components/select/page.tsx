"use client"

import {
  Select, SelectContent, SelectGroup, SelectItem,
  SelectLabel, SelectSeparator, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import ShowCard from "../_components/show-card"

const SelectPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Select</h2>
      <p className="text-muted-foreground">Displays a list of options for the user to pick from.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="Sizes">
        <div className="flex flex-wrap items-center gap-4">
          <Select>
            <SelectTrigger className="w-44"><SelectValue placeholder="Default size" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="one">Option One</SelectItem>
              <SelectItem value="two">Option Two</SelectItem>
              <SelectItem value="three">Option Three</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger size="sm" className="w-36"><SelectValue placeholder="Small size" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="one">Option One</SelectItem>
              <SelectItem value="two">Option Two</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </ShowCard>
      <ShowCard title="Grouped" description="Use SelectGroup + SelectLabel + SelectSeparator.">
        <Select>
          <SelectTrigger className="w-52"><SelectValue placeholder="Select a fruit" /></SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="mango">Mango</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Vegetables</SelectLabel>
              <SelectItem value="carrot">Carrot</SelectItem>
              <SelectItem value="broccoli">Broccoli</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </ShowCard>
      <ShowCard title="States">
        <div className="flex flex-wrap items-center gap-4">
          <Select disabled>
            <SelectTrigger className="w-44"><SelectValue placeholder="Disabled" /></SelectTrigger>
          </Select>
        </div>
      </ShowCard>
    </div>
  </div>
)

export default SelectPage

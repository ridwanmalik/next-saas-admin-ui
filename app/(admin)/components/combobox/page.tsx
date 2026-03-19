"use client"

import * as React from "react"
import { GlobeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"
import { InputGroupAddon } from "@/components/ui/input-group"
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import ShowCard from "../_components/show-card"

const FRAMEWORKS = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"] as const

const TIMEZONES = [
  {
    value: "Americas",
    items: [
      "(GMT-5) New York",
      "(GMT-8) Los Angeles",
      "(GMT-6) Chicago",
      "(GMT-5) Toronto",
      "(GMT-8) Vancouver",
      "(GMT-3) São Paulo",
    ],
  },
  {
    value: "Europe",
    items: [
      "(GMT+0) London",
      "(GMT+1) Paris",
      "(GMT+1) Berlin",
      "(GMT+1) Rome",
      "(GMT+1) Madrid",
      "(GMT+1) Amsterdam",
    ],
  },
  {
    value: "Asia/Pacific",
    items: [
      "(GMT+9) Tokyo",
      "(GMT+8) Shanghai",
      "(GMT+8) Singapore",
      "(GMT+4) Dubai",
      "(GMT+11) Sydney",
      "(GMT+9) Seoul",
    ],
  },
] as const

const COUNTRIES = [
  { code: "", value: "", continent: "", label: "Select country" },
  { code: "ar", value: "argentina", label: "Argentina", continent: "South America" },
  { code: "au", value: "australia", label: "Australia", continent: "Oceania" },
  { code: "br", value: "brazil", label: "Brazil", continent: "South America" },
  { code: "ca", value: "canada", label: "Canada", continent: "North America" },
  { code: "cn", value: "china", label: "China", continent: "Asia" },
  { code: "co", value: "colombia", label: "Colombia", continent: "South America" },
  { code: "eg", value: "egypt", label: "Egypt", continent: "Africa" },
  { code: "fr", value: "france", label: "France", continent: "Europe" },
  { code: "de", value: "germany", label: "Germany", continent: "Europe" },
  { code: "it", value: "italy", label: "Italy", continent: "Europe" },
  { code: "jp", value: "japan", label: "Japan", continent: "Asia" },
  { code: "ke", value: "kenya", label: "Kenya", continent: "Africa" },
  { code: "mx", value: "mexico", label: "Mexico", continent: "North America" },
  { code: "nz", value: "new-zealand", label: "New Zealand", continent: "Oceania" },
  { code: "ng", value: "nigeria", label: "Nigeria", continent: "Africa" },
  { code: "za", value: "south-africa", label: "South Africa", continent: "Africa" },
  { code: "kr", value: "south-korea", label: "South Korea", continent: "Asia" },
  { code: "gb", value: "united-kingdom", label: "United Kingdom", continent: "Europe" },
  { code: "us", value: "united-states", label: "United States", continent: "North America" },
]

const ComboboxPage = () => {
  const anchor = useComboboxAnchor()

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Combobox</h2>
        <p className="text-muted-foreground">Autocomplete input with a list of suggestions.</p>
      </div>
      <div className="space-y-4">
        <ShowCard>
          <Combobox items={FRAMEWORKS}>
            <ComboboxInput placeholder="Select a framework" />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </ShowCard>

        <ShowCard title="Basic" description="A simple combobox with a list of frameworks.">
          <Combobox items={FRAMEWORKS}>
            <ComboboxInput placeholder="Select a framework" />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </ShowCard>

        <ShowCard title="Multiple" description="A combobox with multiple selection using multiple and ComboboxChips.">
          <Combobox multiple autoHighlight items={FRAMEWORKS} defaultValue={[FRAMEWORKS[0]]}>
            <ComboboxChips ref={anchor} className="w-full max-w-xs">
              <ComboboxValue>
                {(values) => (
                  <React.Fragment>
                    {values.map((value: string) => (
                      <ComboboxChip key={value}>{value}</ComboboxChip>
                    ))}
                    <ComboboxChipsInput />
                  </React.Fragment>
                )}
              </ComboboxValue>
            </ComboboxChips>
            <ComboboxContent anchor={anchor}>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </ShowCard>

        <ShowCard title="Clear Button" description="Use the showClear prop to show a clear button.">
          <Combobox items={FRAMEWORKS} defaultValue={FRAMEWORKS[0]}>
            <ComboboxInput placeholder="Select a framework" showClear />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </ShowCard>

        <ShowCard title="Groups" description="Use ComboboxGroup and ComboboxSeparator to group items.">
          <Combobox items={TIMEZONES}>
            <ComboboxInput placeholder="Select a timezone" />
            <ComboboxContent>
              <ComboboxEmpty>No timezones found.</ComboboxEmpty>
              <ComboboxList>
                {(group, index) => (
                  <ComboboxGroup key={group.value} items={group.items}>
                    <ComboboxLabel>{group.value}</ComboboxLabel>
                    <ComboboxCollection>
                      {(item) => (
                        <ComboboxItem key={item} value={item}>
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxCollection>
                    {index < TIMEZONES.length - 1 && <ComboboxSeparator />}
                  </ComboboxGroup>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </ShowCard>

        <ShowCard title="Custom Items" description="You can render custom component inside ComboboxItem.">
          <Combobox
            items={COUNTRIES.filter((country) => country.code !== "")}
            itemToStringValue={(country: (typeof COUNTRIES)[number]) => country.label}
          >
            <ComboboxInput placeholder="Search countries..." />
            <ComboboxContent>
              <ComboboxEmpty>No countries found.</ComboboxEmpty>
              <ComboboxList>
                {(country) => (
                  <ComboboxItem key={country.code} value={country}>
                    <Item size="sm" className="p-0">
                      <ItemContent>
                        <ItemTitle className="whitespace-nowrap">{country.label}</ItemTitle>
                        <ItemDescription>
                          {country.continent} ({country.code})
                        </ItemDescription>
                      </ItemContent>
                    </Item>
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </ShowCard>

        <ShowCard title="Invalid" description="Use the aria-invalid prop to make the combobox invalid.">
          <Combobox items={FRAMEWORKS}>
            <ComboboxInput placeholder="Select a framework" aria-invalid="true" />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </ShowCard>

        <ShowCard title="Disabled" description="Use the disabled prop to disable the combobox.">
          <Combobox items={FRAMEWORKS}>
            <ComboboxInput placeholder="Select a framework" disabled />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </ShowCard>

        <ShowCard title="Auto Highlight" description="Use the autoHighlight prop to automatically highlight the first item on filter.">
          <Combobox items={FRAMEWORKS} autoHighlight>
            <ComboboxInput placeholder="Select a framework" />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </ShowCard>

        <ShowCard title="Popup" description="Trigger the combobox from a button using the render prop. Move ComboboxInput inside ComboboxContent.">
          <Combobox items={COUNTRIES} defaultValue={COUNTRIES[0]}>
            <ComboboxTrigger
              render={
                <Button variant="outline" className="w-64 justify-between font-normal">
                  <ComboboxValue />
                </Button>
              }
            />
            <ComboboxContent>
              <ComboboxInput showTrigger={false} placeholder="Search" />
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item.code} value={item}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </ShowCard>

        <ShowCard title="Input Group" description="Add an addon using InputGroupAddon inside ComboboxInput.">
          <Combobox items={TIMEZONES}>
            <ComboboxInput placeholder="Select a timezone">
              <InputGroupAddon>
                <GlobeIcon />
              </InputGroupAddon>
            </ComboboxInput>
            <ComboboxContent alignOffset={-28} className="w-60">
              <ComboboxEmpty>No timezones found.</ComboboxEmpty>
              <ComboboxList>
                {(group) => (
                  <ComboboxGroup key={group.value} items={group.items}>
                    <ComboboxLabel>{group.value}</ComboboxLabel>
                    <ComboboxCollection>
                      {(item) => (
                        <ComboboxItem key={item} value={item}>
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxCollection>
                  </ComboboxGroup>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </ShowCard>
      </div>
    </div>
  )
}

export default ComboboxPage

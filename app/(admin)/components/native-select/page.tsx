"use client"

import { NativeSelect, NativeSelectOption, NativeSelectOptGroup } from "@/components/ui/native-select"
import ShowCard from "../_components/show-card"

const NativeSelectPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Native Select</h2>
      <p className="text-muted-foreground">A styled native HTML select element — ideal for mobile and simple use cases.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="Basic">
        <NativeSelect className="w-52">
          <NativeSelectOption value="">Select a fruit...</NativeSelectOption>
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
          <NativeSelectOption value="banana">Banana</NativeSelectOption>
          <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
        </NativeSelect>
      </ShowCard>
      <ShowCard title="Groups">
        <NativeSelect className="w-52">
          <NativeSelectOption value="">Select a pet...</NativeSelectOption>
          <NativeSelectOptGroup label="Dogs">
            <NativeSelectOption value="labrador">Labrador</NativeSelectOption>
            <NativeSelectOption value="poodle">Poodle</NativeSelectOption>
          </NativeSelectOptGroup>
          <NativeSelectOptGroup label="Cats">
            <NativeSelectOption value="persian">Persian</NativeSelectOption>
            <NativeSelectOption value="siamese">Siamese</NativeSelectOption>
          </NativeSelectOptGroup>
        </NativeSelect>
      </ShowCard>
      <ShowCard title="Disabled">
        <div className="flex flex-col gap-3 w-52">
          <NativeSelect disabled>
            <NativeSelectOption>Disabled select</NativeSelectOption>
          </NativeSelect>
          <NativeSelect>
            <NativeSelectOption value="a">Option A</NativeSelectOption>
            <NativeSelectOption value="b" disabled>Option B (disabled)</NativeSelectOption>
            <NativeSelectOption value="c">Option C</NativeSelectOption>
          </NativeSelect>
        </div>
      </ShowCard>
      <ShowCard title="Invalid">
        <NativeSelect aria-invalid className="w-52">
          <NativeSelectOption value="">Select a country...</NativeSelectOption>
          <NativeSelectOption value="us">United States</NativeSelectOption>
          <NativeSelectOption value="uk">United Kingdom</NativeSelectOption>
        </NativeSelect>
      </ShowCard>
    </div>
  </div>
)

export default NativeSelectPage

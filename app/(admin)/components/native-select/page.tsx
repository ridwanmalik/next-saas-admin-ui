"use client"

import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"
import ShowCard from "../_components/show-card"

const NativeSelectPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Native Select</h2>
      <p className="text-muted-foreground">A styled native HTML select element with consistent design system integration.</p>
    </div>
    <div className="space-y-4">
      <ShowCard>
        <NativeSelect>
          <NativeSelectOption value="">Select status</NativeSelectOption>
          <NativeSelectOption value="todo">Todo</NativeSelectOption>
          <NativeSelectOption value="in-progress">In Progress</NativeSelectOption>
          <NativeSelectOption value="done">Done</NativeSelectOption>
          <NativeSelectOption value="cancelled">Cancelled</NativeSelectOption>
        </NativeSelect>
      </ShowCard>

      <ShowCard title="Groups">
        <NativeSelect>
          <NativeSelectOption value="">Select department</NativeSelectOption>
          <NativeSelectOptGroup label="Engineering">
            <NativeSelectOption value="frontend">Frontend</NativeSelectOption>
            <NativeSelectOption value="backend">Backend</NativeSelectOption>
            <NativeSelectOption value="devops">DevOps</NativeSelectOption>
          </NativeSelectOptGroup>
          <NativeSelectOptGroup label="Sales">
            <NativeSelectOption value="sales-rep">Sales Rep</NativeSelectOption>
            <NativeSelectOption value="account-manager">
              Account Manager
            </NativeSelectOption>
            <NativeSelectOption value="sales-director">
              Sales Director
            </NativeSelectOption>
          </NativeSelectOptGroup>
          <NativeSelectOptGroup label="Operations">
            <NativeSelectOption value="support">
              Customer Support
            </NativeSelectOption>
            <NativeSelectOption value="product-manager">
              Product Manager
            </NativeSelectOption>
            <NativeSelectOption value="ops-manager">
              Operations Manager
            </NativeSelectOption>
          </NativeSelectOptGroup>
        </NativeSelect>
      </ShowCard>

      <ShowCard title="Disabled">
        <NativeSelect disabled>
          <NativeSelectOption value="">Disabled</NativeSelectOption>
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
          <NativeSelectOption value="banana">Banana</NativeSelectOption>
          <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
        </NativeSelect>
      </ShowCard>

      <ShowCard title="Invalid">
        <NativeSelect aria-invalid="true">
          <NativeSelectOption value="">Error state</NativeSelectOption>
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
          <NativeSelectOption value="banana">Banana</NativeSelectOption>
          <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
        </NativeSelect>
      </ShowCard>
    </div>
  </div>
)

export default NativeSelectPage

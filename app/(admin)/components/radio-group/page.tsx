"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import ShowCard from "../_components/show-card"

const RadioGroupPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Radio Group</h2>
      <p className="text-muted-foreground">A set of checkable buttons where no more than one can be checked at a time.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="Default">
        <RadioGroup defaultValue="comfortable">
          {["Default", "Comfortable", "Compact"].map((label) => (
            <div key={label} className="flex items-center gap-2">
              <RadioGroupItem value={label.toLowerCase()} id={`rg-${label}`} />
              <Label htmlFor={`rg-${label}`}>{label}</Label>
            </div>
          ))}
        </RadioGroup>
      </ShowCard>
      <ShowCard title="With Description">
        <RadioGroup defaultValue="card">
          {[
            { value: "card", label: "Card", desc: "Pay with your saved card." },
            { value: "paypal", label: "PayPal", desc: "Pay via your PayPal account." },
            { value: "apple", label: "Apple Pay", desc: "Pay using Apple Pay." },
          ].map(({ value, label, desc }) => (
            <div key={value} className="flex items-start gap-2">
              <RadioGroupItem value={value} id={`pay-${value}`} className="mt-0.5" />
              <div>
                <Label htmlFor={`pay-${value}`}>{label}</Label>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </ShowCard>
    </div>
  </div>
)

export default RadioGroupPage

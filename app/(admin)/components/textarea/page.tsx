"use client"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import ShowCard from "../_components/show-card"

const TextareaPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Textarea</h2>
      <p className="text-muted-foreground">Displays a form textarea or a component that looks like a textarea.</p>
    </div>
    <div className="space-y-4">
      <ShowCard>
        <Textarea placeholder="Type your message here." />
      </ShowCard>

      <ShowCard title="Field">
        <Field>
          <FieldLabel htmlFor="textarea-message">Message</FieldLabel>
          <FieldDescription>Enter your message below.</FieldDescription>
          <Textarea id="textarea-message" placeholder="Type your message here." />
        </Field>
      </ShowCard>

      <ShowCard title="Disabled">
        <Field data-disabled>
          <FieldLabel htmlFor="textarea-disabled">Message</FieldLabel>
          <Textarea
            id="textarea-disabled"
            placeholder="Type your message here."
            disabled
          />
        </Field>
      </ShowCard>

      <ShowCard title="Invalid">
        <Field data-invalid>
          <FieldLabel htmlFor="textarea-invalid">Message</FieldLabel>
          <Textarea
            id="textarea-invalid"
            placeholder="Type your message here."
            aria-invalid
          />
          <FieldDescription>Please enter a valid message.</FieldDescription>
        </Field>
      </ShowCard>

      <ShowCard title="Button">
        <div className="grid w-full gap-2">
          <Textarea placeholder="Type your message here." />
          <Button>Send message</Button>
        </div>
      </ShowCard>
    </div>
  </div>
)

export default TextareaPage

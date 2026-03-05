"use client"

import {
  Field, FieldLabel, FieldDescription, FieldError, FieldGroup,
  FieldSet, FieldContent, FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import ShowCard from "../_components/show-card"

const FieldPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Field</h2>
      <p className="text-muted-foreground">Combines labels, controls, and help text to compose accessible form fields.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="Input">
        <Field className="w-full max-w-sm">
          <FieldLabel>Email address</FieldLabel>
          <FieldContent>
            <Input type="email" placeholder="you@example.com" />
          </FieldContent>
          <FieldDescription>We'll never share your email.</FieldDescription>
        </Field>
      </ShowCard>
      <ShowCard title="With Error">
        <Field className="w-full max-w-sm">
          <FieldLabel>Username</FieldLabel>
          <FieldContent>
            <Input placeholder="johndoe" aria-invalid />
          </FieldContent>
          <FieldError>Username is already taken.</FieldError>
        </Field>
      </ShowCard>
      <ShowCard title="Checkbox & Switch">
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <Field orientation="horizontal">
            <FieldContent>
              <Checkbox id="field-cb" />
            </FieldContent>
            <FieldLabel htmlFor="field-cb">Accept terms and conditions</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <FieldContent>
              <Switch id="field-sw" />
            </FieldContent>
            <FieldLabel htmlFor="field-sw">Enable notifications</FieldLabel>
          </Field>
        </div>
      </ShowCard>
      <ShowCard title="Fieldset">
        <FieldSet className="w-full max-w-sm rounded-lg border p-4">
          <FieldTitle>Notifications</FieldTitle>
          <FieldDescription className="mb-3">Choose how you want to be notified.</FieldDescription>
          <FieldGroup>
            <Field orientation="horizontal">
              <FieldContent><Checkbox id="fs-email" defaultChecked /></FieldContent>
              <FieldLabel htmlFor="fs-email">Email</FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <FieldContent><Checkbox id="fs-push" /></FieldContent>
              <FieldLabel htmlFor="fs-push">Push notifications</FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
      </ShowCard>
    </div>
  </div>
)

export default FieldPage

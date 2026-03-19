"use client"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import ShowCard from "../_components/show-card"

const SwitchPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Switch</h2>
      <p className="text-muted-foreground">A control that allows the user to toggle between checked and not checked.</p>
    </div>
    <div className="space-y-4">
      <ShowCard>
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
      </ShowCard>

      <ShowCard title="Description">
        <Field orientation="horizontal" className="max-w-sm">
          <FieldContent>
            <FieldLabel htmlFor="switch-focus-mode">Share across devices</FieldLabel>
            <FieldDescription>Focus is shared across devices, and turns off when you leave the app.</FieldDescription>
          </FieldContent>
          <Switch id="switch-focus-mode" />
        </Field>
      </ShowCard>

      <ShowCard title="Choice Card">
        <FieldGroup className="w-full max-w-sm">
          <FieldLabel htmlFor="switch-share">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Share across devices</FieldTitle>
                <FieldDescription>Focus is shared across devices...</FieldDescription>
              </FieldContent>
              <Switch id="switch-share" />
            </Field>
          </FieldLabel>
          <FieldLabel htmlFor="switch-notifications">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Enable notifications</FieldTitle>
                <FieldDescription>Receive notifications when focus mode is enabled or disabled.</FieldDescription>
              </FieldContent>
              <Switch id="switch-notifications" defaultChecked />
            </Field>
          </FieldLabel>
        </FieldGroup>
      </ShowCard>

      <ShowCard title="Disabled">
        <Field orientation="horizontal" data-disabled className="w-fit">
          <Switch id="switch-disabled-unchecked" disabled />
          <FieldLabel htmlFor="switch-disabled-unchecked">Disabled</FieldLabel>
        </Field>
      </ShowCard>

      <ShowCard title="Invalid">
        <Field orientation="horizontal" className="max-w-sm" data-invalid>
          <FieldContent>
            <FieldLabel htmlFor="switch-terms">
              Accept terms and conditions
            </FieldLabel>
            <FieldDescription>
              You must accept the terms and conditions to continue.
            </FieldDescription>
          </FieldContent>
          <Switch id="switch-terms" aria-invalid />
        </Field>
      </ShowCard>

      <ShowCard title="Size">
        <FieldGroup className="w-full max-w-40">
          <Field orientation="horizontal">
            <Switch id="switch-size-sm" size="sm" />
            <FieldLabel htmlFor="switch-size-sm">Small</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Switch id="switch-size-default" size="default" />
            <FieldLabel htmlFor="switch-size-default">Default</FieldLabel>
          </Field>
        </FieldGroup>
      </ShowCard>
    </div>
  </div>
)

export default SwitchPage

"use client"

import { InfoIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ShowCard from "../_components/show-card"

const InputPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Input</h2>
      <p className="text-muted-foreground">
        A text input component for forms and user data entry with built-in styling and accessibility features.
      </p>
    </div>
    <div className="space-y-4">
      <ShowCard>
        <Field>
          <FieldLabel htmlFor="input-demo-api-key">API Key</FieldLabel>
          <Input id="input-demo-api-key" type="password" placeholder="sk-..." />
          <FieldDescription>
            Your API key is encrypted and stored securely.
          </FieldDescription>
        </Field>
      </ShowCard>

      <ShowCard title="Basic">
        <Input placeholder="Enter text" />
      </ShowCard>

      <ShowCard title="Field">
        <Field>
          <FieldLabel htmlFor="input-field-username">Username</FieldLabel>
          <Input
            id="input-field-username"
            type="text"
            placeholder="Enter your username"
          />
          <FieldDescription>
            Choose a unique username for your account.
          </FieldDescription>
        </Field>
      </ShowCard>

      <ShowCard title="Field Group">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
            <Input id="fieldgroup-name" placeholder="Jordan Lee" />
          </Field>
          <Field>
            <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
            <Input
              id="fieldgroup-email"
              type="email"
              placeholder="name@example.com"
            />
            <FieldDescription>
              We&apos;ll send updates to this address.
            </FieldDescription>
          </Field>
          <Field orientation="horizontal">
            <Button type="reset" variant="outline">
              Reset
            </Button>
            <Button type="submit">Submit</Button>
          </Field>
        </FieldGroup>
      </ShowCard>

      <ShowCard title="Disabled">
        <Field data-disabled>
          <FieldLabel htmlFor="input-demo-disabled">Email</FieldLabel>
          <Input
            id="input-demo-disabled"
            type="email"
            placeholder="Email"
            disabled
          />
          <FieldDescription>This field is currently disabled.</FieldDescription>
        </Field>
      </ShowCard>

      <ShowCard title="Invalid">
        <Field data-invalid>
          <FieldLabel htmlFor="input-invalid">Invalid Input</FieldLabel>
          <Input id="input-invalid" placeholder="Error" aria-invalid />
          <FieldDescription>
            This field contains validation errors.
          </FieldDescription>
        </Field>
      </ShowCard>

      <ShowCard title="File">
        <Field>
          <FieldLabel htmlFor="picture">Picture</FieldLabel>
          <Input id="picture" type="file" />
          <FieldDescription>Select a picture to upload.</FieldDescription>
        </Field>
      </ShowCard>

      <ShowCard title="Inline">
        <Field orientation="horizontal">
          <Input type="search" placeholder="Search..." />
          <Button>Search</Button>
        </Field>
      </ShowCard>

      <ShowCard title="Grid">
        <FieldGroup className="grid max-w-sm grid-cols-2">
          <Field>
            <FieldLabel htmlFor="first-name">First Name</FieldLabel>
            <Input id="first-name" placeholder="Jordan" />
          </Field>
          <Field>
            <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
            <Input id="last-name" placeholder="Lee" />
          </Field>
        </FieldGroup>
      </ShowCard>

      <ShowCard title="Required">
        <Field>
          <FieldLabel htmlFor="input-required">
            Required Field <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            id="input-required"
            placeholder="This field is required"
            required
          />
          <FieldDescription>This field must be filled out.</FieldDescription>
        </Field>
      </ShowCard>

      <ShowCard title="Badge">
        <Field>
          <FieldLabel htmlFor="input-badge">
            Webhook URL{" "}
            <Badge variant="secondary" className="ml-auto">
              Beta
            </Badge>
          </FieldLabel>
          <Input
            id="input-badge"
            type="url"
            placeholder="https://api.example.com/webhook"
          />
        </Field>
      </ShowCard>

      <ShowCard title="Input Group">
        <Field>
          <FieldLabel htmlFor="input-group-url">Website URL</FieldLabel>
          <InputGroup>
            <InputGroupInput id="input-group-url" placeholder="example.com" />
            <InputGroupAddon>
              <InputGroupText>https://</InputGroupText>
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <InfoIcon />
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </ShowCard>

      <ShowCard title="Button Group">
        <Field>
          <FieldLabel htmlFor="input-button-group">Search</FieldLabel>
          <ButtonGroup>
            <Input id="input-button-group" placeholder="Type to search..." />
            <Button variant="outline">Search</Button>
          </ButtonGroup>
        </Field>
      </ShowCard>

      <ShowCard title="Form">
        <form className="w-full max-w-sm">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="form-name">Name</FieldLabel>
              <Input
                id="form-name"
                type="text"
                placeholder="Evil Rabbit"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="form-email">Email</FieldLabel>
              <Input
                id="form-email"
                type="email"
                placeholder="john@example.com"
              />
              <FieldDescription>
                We&apos;ll never share your email with anyone.
              </FieldDescription>
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="form-phone">Phone</FieldLabel>
                <Input id="form-phone" type="tel" placeholder="+1 (555) 123-4567" />
              </Field>
              <Field>
                <FieldLabel htmlFor="form-country">Country</FieldLabel>
                <Select defaultValue="us">
                  <SelectTrigger id="form-country">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="form-address">Address</FieldLabel>
              <Input id="form-address" type="text" placeholder="123 Main St" />
            </Field>
            <Field orientation="horizontal">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </Field>
          </FieldGroup>
        </form>
      </ShowCard>
    </div>
  </div>
)

export default InputPage

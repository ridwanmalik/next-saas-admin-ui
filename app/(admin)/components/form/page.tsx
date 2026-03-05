"use client"

import { useForm } from "react-hook-form"
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import ShowCard from "../_components/show-card"

const FormPage = () => {
  const form = useForm({ defaultValues: { username: "", email: "" } })
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Form</h2>
        <p className="text-muted-foreground">Building forms with react-hook-form and field composition.</p>
      </div>
      <div className="space-y-4">
        <ShowCard title="Field Composition">
          <Form {...form}>
            <form className="space-y-4 max-w-sm">
              <FormField control={form.control} name="username" render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl><Input placeholder="johndoe" {...field} /></FormControl>
                  <FormDescription>Your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </ShowCard>
      </div>
    </div>
  )
}

export default FormPage

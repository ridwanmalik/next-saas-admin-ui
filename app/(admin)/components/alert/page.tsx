"use client"

import { CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react"
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import ShowCard from "../_components/show-card"

const AlertPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Alert</h2>
      <p className="text-muted-foreground">Displays a callout for user attention.</p>
    </div>
    <div className="space-y-4">
      <ShowCard>
        <div className="grid w-full max-w-md items-start gap-4">
          <Alert>
            <CheckCircle2 />
            <AlertTitle>Payment successful</AlertTitle>
            <AlertDescription>
              Your payment of $29.99 has been processed. A receipt has been sent to your email address.
            </AlertDescription>
          </Alert>
          <Alert>
            <Info />
            <AlertTitle>New feature available</AlertTitle>
            <AlertDescription>
              We&apos;ve added dark mode support. You can enable it in your account settings.
            </AlertDescription>
          </Alert>
        </div>
      </ShowCard>
      <ShowCard title="Basic" description="A basic alert with an icon, title and description.">
        <Alert className="max-w-md">
          <CheckCircle2 />
          <AlertTitle>Account updated successfully</AlertTitle>
          <AlertDescription>Your profile information has been saved. Changes will be reflected immediately.</AlertDescription>
        </Alert>
      </ShowCard>
      <ShowCard title="Destructive" description='Use variant="destructive" to create a destructive alert.'>
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle />
          <AlertTitle>Payment failed</AlertTitle>
          <AlertDescription>Your payment could not be processed. Please check your payment method and try again.</AlertDescription>
        </Alert>
      </ShowCard>
      <ShowCard title="Action" description="Use AlertAction to add a button or other action element to the alert.">
        <Alert className="max-w-md">
          <AlertTitle>Dark mode is now available</AlertTitle>
          <AlertDescription>Enable it under your profile settings to get started.</AlertDescription>
          <AlertAction>
            <Button size="sm" variant="default">Enable</Button>
          </AlertAction>
        </Alert>
      </ShowCard>
      <ShowCard title="Custom Colors" description="You can customize the alert colors by adding custom classes such as bg-amber-50 dark:bg-amber-950 to the Alert component.">
        <Alert className="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
          <AlertTriangle />
          <AlertTitle>Your subscription will expire in 3 days.</AlertTitle>
          <AlertDescription>Renew now to avoid service interruption or upgrade to a paid plan to continue using the service.</AlertDescription>
        </Alert>
      </ShowCard>
    </div>
  </div>
)

export default AlertPage

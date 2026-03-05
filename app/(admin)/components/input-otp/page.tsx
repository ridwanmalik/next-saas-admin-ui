"use client"

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import ShowCard from "../_components/show-card"

const InputOTPPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Input OTP</h2>
      <p className="text-muted-foreground">Accessible one-time password component with copy/paste support.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="6-digit (with separator)">
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} /><InputOTPSlot index={1} /><InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} /><InputOTPSlot index={4} /><InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </ShowCard>
      <ShowCard title="4-digit">
        <InputOTP maxLength={4}>
          <InputOTPGroup>
            <InputOTPSlot index={0} /><InputOTPSlot index={1} />
            <InputOTPSlot index={2} /><InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </ShowCard>
      <ShowCard title="Alphanumeric pattern" description="Restricts to digits and chars via pattern.">
        <InputOTP maxLength={6} pattern="^[a-zA-Z0-9]+$">
          <InputOTPGroup>
            <InputOTPSlot index={0} /><InputOTPSlot index={1} /><InputOTPSlot index={2} />
            <InputOTPSlot index={3} /><InputOTPSlot index={4} /><InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </ShowCard>
    </div>
  </div>
)

export default InputOTPPage

"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import ShowCard from "../_components/show-card"

const SwitchPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Switch</h2>
      <p className="text-muted-foreground">A toggle control for switching between two states.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="Sizes">
        <div className="flex items-center gap-8">
          {(["sm", "default"] as const).map((size) => (
            <div key={size} className="flex flex-col items-start gap-2">
              <Switch size={size} />
              <span className="text-xs text-muted-foreground">{size}</span>
            </div>
          ))}
        </div>
      </ShowCard>
      <ShowCard title="States">
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex items-center gap-2"><Switch id="sw-off" /><Label htmlFor="sw-off">Off</Label></div>
          <div className="flex items-center gap-2"><Switch id="sw-on" defaultChecked /><Label htmlFor="sw-on">On</Label></div>
          <div className="flex items-center gap-2"><Switch id="sw-dis" disabled /><Label htmlFor="sw-dis" className="text-muted-foreground">Disabled</Label></div>
        </div>
      </ShowCard>
      <ShowCard title="Settings List">
        <div className="divide-y -mx-6">
          {[
            { id: "notif", label: "Push notifications", desc: "Get notified about activity", on: true },
            { id: "emails", label: "Email digest", desc: "Weekly summary of activity", on: false },
            { id: "sounds", label: "Sound effects", desc: "Play sounds on actions", on: false },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between px-6 py-3">
              <div>
                <Label htmlFor={item.id}>{item.label}</Label>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch id={item.id} defaultChecked={item.on} />
            </div>
          ))}
        </div>
      </ShowCard>
    </div>
  </div>
)

export default SwitchPage

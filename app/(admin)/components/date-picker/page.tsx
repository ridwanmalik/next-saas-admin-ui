"use client"

import { useState } from "react"
import { addDays } from "date-fns"
import type { DateRange } from "react-day-picker"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import ShowCard from "../_components/show-card"

const DatePickerPage = () => {
  const [date, setDate] = useState<Date | undefined>()
  const [range, setRange] = useState<DateRange | undefined>()
  const [presetDate, setPresetDate] = useState<Date | undefined>()
  const PRESETS = [
    { label: "Today", days: 0 },
    { label: "Yesterday", days: -1 },
    { label: "Last 7 days", days: -7 },
    { label: "Last 30 days", days: -30 },
  ]
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Date Picker</h2>
        <p className="text-muted-foreground">A date picker composed from Popover and Calendar.</p>
      </div>
      <div className="space-y-4">
        <ShowCard title="Basic">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 size-4" />
                {date ? date.toLocaleDateString() : <span className="text-muted-foreground">Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </PopoverContent>
          </Popover>
        </ShowCard>
        <ShowCard title="Range Picker">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[300px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 size-4" />
                {range?.from ? (
                  range.to
                    ? <>{range.from.toLocaleDateString()} – {range.to.toLocaleDateString()}</>
                    : range.from.toLocaleDateString()
                ) : <span className="text-muted-foreground">Pick a date range</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />
            </PopoverContent>
          </Popover>
        </ShowCard>
        <ShowCard title="With Presets" description="Combine Select quick-picks with a Calendar for manual selection.">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 size-4" />
                {presetDate ? presetDate.toLocaleDateString() : <span className="text-muted-foreground">Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="flex flex-col gap-0">
                <div className="flex flex-wrap gap-1 p-3 pb-0">
                  {PRESETS.map(({ label, days }) => (
                    <Button
                      key={label}
                      variant={presetDate?.toDateString() === addDays(new Date(), days).toDateString() ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPresetDate(addDays(new Date(), days))}
                      className="text-xs h-7"
                    >
                      {label}
                    </Button>
                  ))}
                </div>
                <Calendar mode="single" selected={presetDate} onSelect={setPresetDate} />
              </div>
            </PopoverContent>
          </Popover>
        </ShowCard>
      </div>
    </div>
  )
}

export default DatePickerPage

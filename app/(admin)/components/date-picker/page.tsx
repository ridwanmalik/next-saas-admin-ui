"use client"

import { useState } from "react"
import { format, addDays } from "date-fns"
import type { DateRange } from "react-day-picker"
import { CalendarIcon, ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import ShowCard from "../_components/show-card"

function formatDate(date: Date | undefined) {
  if (!date) return ""
  return date.toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" })
}

function isValidDate(date: Date | undefined) {
  return !!date && !isNaN(date.getTime())
}

const DatePickerPage = () => {
  const [date, setDate] = useState<Date | undefined>()
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  })
  const [dobOpen, setDobOpen] = useState(false)
  const [dob, setDob] = useState<Date | undefined>()
  const [inputOpen, setInputOpen] = useState(false)
  const [inputDate, setInputDate] = useState<Date | undefined>(new Date("2025-06-01"))
  const [inputMonth, setInputMonth] = useState<Date | undefined>(new Date("2025-06-01"))
  const [inputValue, setInputValue] = useState(formatDate(new Date("2025-06-01")))
  const [timeOpen, setTimeOpen] = useState(false)
  const [timeDate, setTimeDate] = useState<Date | undefined>()

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Date Picker</h2>
        <p className="text-muted-foreground">A date picker component with range and presets.</p>
      </div>
      <div className="space-y-4">
        <ShowCard>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!date}
                className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
              >
                {date ? format(date, "PPP") : <span>Pick a date</span>}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={setDate} defaultMonth={date} />
            </PopoverContent>
          </Popover>
        </ShowCard>

        <ShowCard title="Basic" description="A basic date picker component.">
          <Field className="mx-auto w-44">
            <FieldLabel htmlFor="date-basic">Date</FieldLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" id="date-basic" className="justify-start font-normal">
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} defaultMonth={date} />
              </PopoverContent>
            </Popover>
          </Field>
        </ShowCard>

        <ShowCard title="Range Picker" description="A date picker component for selecting a range of dates.">
          <Field className="mx-auto w-60">
            <FieldLabel htmlFor="date-range">Date Picker Range</FieldLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" id="date-range" className="justify-start px-2.5 font-normal">
                  <CalendarIcon />
                  {range?.from ? (
                    range.to ? (
                      <>{format(range.from, "LLL dd, y")} – {format(range.to, "LLL dd, y")}</>
                    ) : (
                      format(range.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  defaultMonth={range?.from}
                  selected={range}
                  onSelect={setRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </Field>
        </ShowCard>

        <ShowCard title="Date of Birth" description="A date picker with dropdown caption layout for date and month selection.">
          <Field className="mx-auto w-44">
            <FieldLabel htmlFor="dob">Date of birth</FieldLabel>
            <Popover open={dobOpen} onOpenChange={setDobOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" id="dob" className="justify-start font-normal">
                  {dob ? dob.toLocaleDateString() : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dob}
                  defaultMonth={dob}
                  captionLayout="dropdown"
                  onSelect={(d) => { setDob(d); setDobOpen(false) }}
                />
              </PopoverContent>
            </Popover>
          </Field>
        </ShowCard>

        <ShowCard title="Input" description="A date picker with an input field for selecting a date.">
          <Field className="mx-auto w-48">
            <FieldLabel htmlFor="date-input">Subscription Date</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="date-input"
                value={inputValue}
                placeholder="June 01, 2025"
                onChange={(e) => {
                  const d = new Date(e.target.value)
                  setInputValue(e.target.value)
                  if (isValidDate(d)) { setInputDate(d); setInputMonth(d) }
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") { e.preventDefault(); setInputOpen(true) }
                }}
              />
              <InputGroupAddon align="inline-end">
                <Popover open={inputOpen} onOpenChange={setInputOpen}>
                  <PopoverTrigger asChild>
                    <InputGroupButton variant="ghost" size="icon-xs" aria-label="Select date">
                      <CalendarIcon />
                      <span className="sr-only">Select date</span>
                    </InputGroupButton>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="end" alignOffset={-8} sideOffset={10}>
                    <Calendar
                      mode="single"
                      selected={inputDate}
                      month={inputMonth}
                      onMonthChange={setInputMonth}
                      onSelect={(d) => { setInputDate(d); setInputValue(formatDate(d)); setInputOpen(false) }}
                    />
                  </PopoverContent>
                </Popover>
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </ShowCard>

        <ShowCard title="Time Picker" description="A date picker with a time input field for selecting a time.">
          <FieldGroup className="mx-auto max-w-xs flex-row">
            <Field>
              <FieldLabel htmlFor="time-date">Date</FieldLabel>
              <Popover open={timeOpen} onOpenChange={setTimeOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" id="time-date" className="w-32 justify-between font-normal">
                    {timeDate ? format(timeDate, "PPP") : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={timeDate}
                    captionLayout="dropdown"
                    defaultMonth={timeDate}
                    onSelect={(d) => { setTimeDate(d); setTimeOpen(false) }}
                  />
                </PopoverContent>
              </Popover>
            </Field>
            <Field className="w-32">
              <FieldLabel htmlFor="time-input">Time</FieldLabel>
              <Input
                type="time"
                id="time-input"
                step="1"
                defaultValue="10:30:00"
                className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </Field>
          </FieldGroup>
        </ShowCard>
      </div>
    </div>
  )
}

export default DatePickerPage

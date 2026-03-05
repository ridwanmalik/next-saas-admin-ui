"use client"

import { useState } from "react"
import { addDays } from "date-fns"
import type { DateRange } from "react-day-picker"
import { Calendar, CalendarDayButton } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Clock2 } from "lucide-react"
import ShowCard from "../_components/show-card"

const CalendarPage = () => {
  const [heroDate, setHeroDate] = useState<Date | undefined>(new Date())
  const [rangeDate, setRangeDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  })
  const [presetDate, setPresetDate] = useState<Date | undefined>(
    new Date(new Date().getFullYear(), 1, 12)
  )
  const [currentMonth, setCurrentMonth] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  )
  const [timeDate, setTimeDate] = useState<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12)
  )
  const [bookedDate, setBookedDate] = useState<Date | undefined>(
    new Date(new Date().getFullYear(), 1, 3)
  )
  const [rangeCustom, setRangeCustom] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 11, 8),
    to: addDays(new Date(new Date().getFullYear(), 11, 8), 10),
  })
  const [weekDate, setWeekDate] = useState<Date | undefined>(
    new Date(new Date().getFullYear(), 1, 3)
  )

  const bookedDates = Array.from(
    { length: 15 },
    (_, i) => new Date(new Date().getFullYear(), 1, 12 + i)
  )

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Calendar</h2>
        <p className="text-muted-foreground">A date field component that allows users to enter and edit date.</p>
      </div>
      <div className="space-y-4">
        <ShowCard>
          <Calendar
            mode="single"
            selected={heroDate}
            onSelect={setHeroDate}
            className="rounded-lg border"
            captionLayout="dropdown"
          />
        </ShowCard>
        <ShowCard title="Basic" description='A basic calendar component. We used className="rounded-lg border" to style the calendar.'>
          <Calendar mode="single" className="rounded-lg border" />
        </ShowCard>

        <ShowCard title="Range Calendar" description='Use the mode="range" prop to enable range selection.'>
          <Card className="mx-auto w-fit p-0">
            <CardContent className="p-0">
              <Calendar
                mode="range"
                defaultMonth={rangeDate?.from}
                selected={rangeDate}
                onSelect={setRangeDate}
                numberOfMonths={2}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
              />
            </CardContent>
          </Card>
        </ShowCard>

        <ShowCard title="Month and Year Selector" description='Use captionLayout="dropdown" to show month and year dropdowns.'>
          <Calendar mode="single" captionLayout="dropdown" className="rounded-lg border" />
        </ShowCard>

        <ShowCard title="Presets">
          <Card size="sm" className="mx-auto w-fit max-w-[300px]">
            <CardContent>
              <Calendar
                mode="single"
                selected={presetDate}
                onSelect={setPresetDate}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                fixedWeeks
                className="p-0 [--cell-size:--spacing(9.5)]"
              />
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2 border-t">
              {[
                { label: "Today", value: 0 },
                { label: "Tomorrow", value: 1 },
                { label: "In 3 days", value: 3 },
                { label: "In a week", value: 7 },
                { label: "In 2 weeks", value: 14 },
              ].map((preset) => (
                <Button
                  key={preset.value}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    const newDate = addDays(new Date(), preset.value)
                    setPresetDate(newDate)
                    setCurrentMonth(
                      new Date(newDate.getFullYear(), newDate.getMonth(), 1)
                    )
                  }}
                >
                  {preset.label}
                </Button>
              ))}
            </CardFooter>
          </Card>
        </ShowCard>

        <ShowCard title="Date and Time Picker">
          <Card size="sm" className="mx-auto w-fit">
            <CardContent>
              <Calendar
                mode="single"
                selected={timeDate}
                onSelect={setTimeDate}
                className="p-0"
              />
            </CardContent>
            <CardFooter className="border-t bg-card">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="time-from">Start Time</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="time-from"
                      type="time"
                      step="1"
                      defaultValue="10:30:00"
                      className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                    <InputGroupAddon>
                      <Clock2 className="text-muted-foreground" />
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
                <Field>
                  <FieldLabel htmlFor="time-to">End Time</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="time-to"
                      type="time"
                      step="1"
                      defaultValue="12:30:00"
                      className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                    <InputGroupAddon>
                      <Clock2 className="text-muted-foreground" />
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
              </FieldGroup>
            </CardFooter>
          </Card>
        </ShowCard>

        <ShowCard title="Booked dates">
          <Card className="mx-auto w-fit p-0">
            <CardContent className="p-0">
              <Calendar
                mode="single"
                defaultMonth={bookedDate}
                selected={bookedDate}
                onSelect={setBookedDate}
                disabled={bookedDates}
                modifiers={{ booked: bookedDates }}
                modifiersClassNames={{ booked: "[&>button]:line-through opacity-100" }}
              />
            </CardContent>
          </Card>
        </ShowCard>

        <ShowCard title="Custom Cell Size" description="You can customize the size of calendar cells using the --cell-size CSS variable. You can also make it responsive by using breakpoint-specific values:">
          <Card className="mx-auto w-fit p-0">
            <CardContent className="p-0">
              <Calendar
                mode="range"
                defaultMonth={rangeCustom?.from}
                selected={rangeCustom}
                onSelect={setRangeCustom}
                numberOfMonths={1}
                captionLayout="dropdown"
                className="[--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
                formatters={{
                  formatMonthDropdown: (date) =>
                    date.toLocaleString("default", { month: "long" }),
                }}
                components={{
                  DayButton: ({ children, modifiers, day, ...props }) => {
                    const isWeekend =
                      day.date.getDay() === 0 || day.date.getDay() === 6
                    return (
                      <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                        {children}
                        {!modifiers.outside && (
                          <span>{isWeekend ? "$120" : "$100"}</span>
                        )}
                      </CalendarDayButton>
                    )
                  },
                }}
              />
            </CardContent>
          </Card>
        </ShowCard>

        <ShowCard title="Week Numbers" description="Use showWeekNumber to show week numbers.">
          <Card className="mx-auto w-fit p-0">
            <CardContent className="p-0">
              <Calendar
                mode="single"
                defaultMonth={weekDate}
                selected={weekDate}
                onSelect={setWeekDate}
                showWeekNumber
              />
            </CardContent>
          </Card>
        </ShowCard>
      </div>
    </div>
  )
}

export default CalendarPage

"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"

const CalendarWithTimezone = ({
  date, setDate,
}: { date: Date | undefined; setDate: (d: Date | undefined) => void }) => {
  const [timeZone, setTimeZone] = useState<string | undefined>(undefined)
  useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }, [])
  return (
    <Calendar mode="single" selected={date} onSelect={setDate} timeZone={timeZone} className="rounded-lg border w-fit" />
  )
}

export default CalendarWithTimezone

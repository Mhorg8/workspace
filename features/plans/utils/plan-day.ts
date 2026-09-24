export function startOfLocalDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function toCalendarDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function utcDateToCalendarDate(date: Date) {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, "0")
  const day = String(date.getUTCDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function calendarDateToLocal(value: string) {
  const date = calendarDateToUtc(value)
  if (!date) {
    return null
  }

  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
}

export function planDayStatus(day: string, today = startOfLocalDay(new Date())) {
  if (day === toCalendarDate(today)) {
    return "Today" as const
  }

  const date = calendarDateToLocal(day)
  if (!date || date > today) {
    return "Upcoming" as const
  }

  return "Past" as const
}

export function calendarDateToUtc(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) {
    return null
  }

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(Date.UTC(year, month - 1, day))

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null
  }

  return date
}

import { PlanDetail } from "@/features/plans/api/get-plan-action"
import { calendarDateToLocal } from "@/features/plans/utils/plan-day"
import { CalendarIcon } from "lucide-react"

interface Props {
  when: string
  day: string
  title: string
  description: string
  plan: PlanDetail
}

const dayFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: "long",
  month: "long",
  day: "numeric",
})

function formatDay(day: string) {
  const date = calendarDateToLocal(day)
  if (!date) return day
  return dayFormatter.format(date)
}

const PlanInformation = ({ when, day, title, description, plan }: Props) => {
  const formattedDay = formatDay(plan.day)

  return (
    <div className="relative flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <p className="inline-flex items-center rounded-full bg-background/80 px-3 py-1 text-sm font-medium text-primary shadow-sm ring-1 ring-border">
          {when}
        </p>
        <p className="inline-flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-sm text-muted-foreground ring-1 ring-border">
          <CalendarIcon
            className="size-3.5 shrink-0"
            aria-hidden="true"
          />
          <time dateTime={plan.day}>{formattedDay}</time>
        </p>
      </div>

      <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl sm:leading-tight">
        <span className="bg-linear-to-r from-primary via-[#db2777] to-accent bg-clip-text text-transparent">
          {plan.title}
        </span>
      </h1>

      {plan.description ? (
        <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          {plan.description}
        </p>
      ) : (
        <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          No description for this day. Keep the work visible in the list below.
        </p>
      )}
    </div>
  )
}

export default PlanInformation

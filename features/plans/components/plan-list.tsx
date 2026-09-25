import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

import type { PlanSummary } from "../api/list-plans.action"
import { calendarDateToLocal, planDayStatus } from "../utils/plan-day"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

const dayFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: "long",
  month: "long",
  day: "numeric",
})

type PlanListProps = {
  plans: PlanSummary[]
  status: "loading" | "ready" | "error"
  error: string | null
  onRetry: () => void
}

function formatDay(day: string) {
  const date = calendarDateToLocal(day)
  if (!date) {
    return day
  }

  return dayFormatter.format(date)
}

export function PlanList({ plans, status, error, onRetry }: PlanListProps) {
  return (
    <section
      id="plan"
      aria-labelledby="plans-heading"
      className="flex flex-col gap-4"
    >
      <h2
        id="plans-heading"
        className="font-heading text-2xl font-semibold tracking-tight"
      >
        Your plans
      </h2>

      {status === "loading" ? (
        <div
          aria-busy="true"
          aria-live="polite"
        >
          <p className="sr-only">Loading plans</p>
          <ul className="grid list-none gap-3 sm:grid-cols-2">
            <Skeleton className="h-24 rounded-3xl motion-safe:animate-pulse" />
            <Skeleton className="h-24 rounded-3xl motion-safe:animate-pulse" />
          </ul>
        </div>
      ) : null}

      {status === "error" && error ? (
        <div
          className="rounded-3xl bg-card p-6 ring-1 ring-foreground/5"
          role="alert"
        >
          <p className="text-base leading-6 font-medium">Plans could not be loaded</p>
          <p className="mt-1 text-sm leading-5 text-muted-foreground">{error}</p>
          <Button
            type="button"
            className="mt-4 h-11 min-h-11 cursor-pointer"
            onClick={onRetry}
          >
            Try again
          </Button>
        </div>
      ) : null}

      {status === "ready" && plans.length === 0 ? (
        <div className="rounded-3xl bg-card p-6 ring-1 ring-foreground/5">
          <p className="text-base leading-6 font-medium">No plans yet</p>
          <p className="mt-1 max-w-xl text-sm leading-5 text-muted-foreground">
            Create a plan for today or a later day. It will show up here.
          </p>
        </div>
      ) : null}

      {status === "ready" && plans.length > 0 ? (
        <ul className="grid list-none gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {plans.map((plan) => {
            const when = planDayStatus(plan.day)

            return (
              <li
                key={plan.id}
                className="rounded-3xl bg-card p-4 shadow-sm ring-1 ring-foreground/5"
              >
                <Link href={`/plan/${plan.id}`}>
                  <p className="flex items-center gap-2 text-sm leading-5 text-muted-foreground">
                    <CalendarIcon
                      className="size-4 shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      {when}
                      <span aria-hidden="true"> · </span>
                      <span className="sr-only">, </span>
                      {formatDay(plan.day)}
                    </span>
                  </p>
                  <p className="mt-2 text-base leading-6 font-medium text-foreground">
                    {plan.title}
                  </p>
                </Link>
              </li>
            )
          })}
        </ul>
      ) : null}
    </section>
  )
}

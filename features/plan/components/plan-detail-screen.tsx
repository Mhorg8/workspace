import Link from "next/link"
import { ArrowLeft, CalendarIcon, CheckCircle2, Circle, ListTodo, PlusIcon } from "lucide-react"

import Blobs from "@/components/blobs"
import { ToolHeader } from "@/components/tool-header"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import type { PlanDetail } from "@/features/plans/api/get-plan-action"
import { calendarDateToLocal, planDayStatus } from "@/features/plans/utils/plan-day"

const dayFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: "long",
  month: "long",
  day: "numeric",
})

type PlanDetailScreenProps = {
  plan: PlanDetail
}

function formatDay(day: string) {
  const date = calendarDateToLocal(day)
  if (!date) return day
  return dayFormatter.format(date)
}

export default function PlanDetailScreen({ plan }: PlanDetailScreenProps) {
  const when = planDayStatus(plan.day)
  const formattedDay = formatDay(plan.day)
  const items = [...plan.items].sort((a, b) => a.sortOrder - b.sortOrder)
  const doneCount = items.filter((item) => item.done).length
  const totalCount = items.length
  const openCount = totalCount - doneCount
  const progress = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100)

  return (
    <div className="relative isolate overflow-x-clip">
      <a
        href="#plan-detail"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-primary-foreground focus:outline-none"
      >
        Skip to plan
      </a>

      <Blobs />
      <ToolHeader />

      <main
        id="plan-detail"
        className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6 sm:py-12 lg:gap-14"
      >
        <div>
          <Button
            render={<Link href="/plan" />}
            variant="ghost"
            className="h-11 min-h-11 cursor-pointer gap-2 rounded-full px-3 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to plans
          </Button>
        </div>

        <section className="grid gap-5 lg:grid-cols-12 lg:items-start">
          <div className="flex flex-col gap-5 lg:col-span-8">
            <header className="relative overflow-hidden rounded-[2rem] bg-card p-5 shadow-lg ring-1 ring-foreground/5 sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-[#fb7185]/30 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-16 -left-10 size-48 rounded-full bg-[#60a5fa]/30 blur-3xl"
              />

              <div className="relative flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="inline-flex items-center rounded-full bg-background/80 px-3 py-1 text-sm font-medium text-primary shadow-sm ring-1 ring-border">
                    {when}
                  </p>
                  <p className="inline-flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-sm text-muted-foreground ring-1 ring-border">
                    <CalendarIcon className="size-3.5 shrink-0" aria-hidden="true" />
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
            </header>

            <section
              aria-labelledby="todo-heading"
              className="relative overflow-hidden rounded-[2rem] bg-card p-5 shadow-lg ring-1 ring-foreground/5 sm:p-8"
            >
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-primary">To-do</p>
                  <h2
                    id="todo-heading"
                    className="font-heading text-2xl font-semibold tracking-tight"
                  >
                    Work for this day
                  </h2>
                </div>
                <p className="text-sm leading-5 text-muted-foreground tabular-nums">
                  {totalCount === 0
                    ? "Nothing queued yet"
                    : `${doneCount} of ${totalCount} done`}
                </p>
              </div>

              {totalCount === 0 ? (
                <div className="flex min-h-44 flex-col items-center justify-center gap-3 rounded-[1.6rem] bg-background/80 px-6 py-10 text-center ring-1 ring-border">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-muted text-primary">
                    <ListTodo className="size-5" aria-hidden="true" />
                  </span>
                  <p className="font-heading text-lg font-semibold">No items yet</p>
                  <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                    This plan is ready. Add pieces of work when you know what belongs on this day.
                  </p>
                  <Button>
                    <PlusIcon className="size-4" aria-hidden="true" />
                    Add item
                  </Button>
                </div>
              ) : (
                <ul className="flex list-none flex-col gap-3">
                  {items.map((item) => {
                    const itemId = item.id.toString()

                    return (
                      <li
                        key={itemId}
                        className={cn(
                          "rounded-[1.5rem] p-4 ring-1 transition-[background-color,box-shadow] duration-200",
                          item.done
                            ? "bg-muted/50 ring-border/70"
                            : "bg-background/80 ring-border hover:ring-primary/40",
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={cn(
                              "mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full",
                              item.done
                                ? "bg-primary/15 text-primary"
                                : "bg-muted text-muted-foreground",
                            )}
                            aria-hidden="true"
                          >
                            {item.done ? (
                              <CheckCircle2 className="size-5" />
                            ) : (
                              <Circle className="size-5" />
                            )}
                          </span>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3
                                className={cn(
                                  "font-heading text-base font-semibold leading-6 sm:text-lg",
                                  item.done && "text-muted-foreground line-through",
                                )}
                              >
                                {item.title}
                              </h3>
                              <span
                                className={cn(
                                  "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                                  item.done
                                    ? "bg-[#dcfce7] text-[#166534]"
                                    : "bg-[#dbeafe] text-[#1e3a8a]",
                                )}
                              >
                                {item.done ? "Done" : "Open"}
                              </span>
                            </div>
                            {item.notes ? (
                              <p
                                className={cn(
                                  "mt-1.5 text-sm leading-6 text-muted-foreground",
                                  item.done && "line-through opacity-80",
                                )}
                              >
                                {item.notes}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </section>
          </div>

          <aside className="flex flex-col gap-5 lg:col-span-4">
            <div className="flex flex-col gap-5 lg:sticky lg:top-24">
              <section
                aria-live="polite"
                className="rounded-[2rem] bg-[linear-gradient(160deg,#2563eb_0%,#7c3aed_55%,#e11d48_100%)] p-5 text-white shadow-lg sm:p-6"
              >
                <p className="text-sm font-medium text-white/80">Progress</p>
                <p className="font-heading mt-1 text-3xl font-semibold tabular-nums">
                  {progress}%
                </p>
                <p className="mt-2 text-sm leading-6 text-white/85">
                  {totalCount === 0
                    ? "Add items to track how the day moves."
                    : openCount === 0
                      ? "Everything on this plan is done."
                      : `${openCount} still open · ${doneCount} finished.`}
                </p>

                <div
                  className="mt-5 h-2 overflow-hidden rounded-full bg-white/25"
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Plan completion"
                >
                  <div
                    className="h-full rounded-full bg-white transition-[width] duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </section>

              <section className="rounded-[2rem] bg-card p-5 shadow-lg ring-1 ring-foreground/5 sm:p-6">
                <h2 className="font-heading text-lg font-semibold">At a glance</h2>
                <dl className="mt-4 grid gap-3">
                  <div className="flex items-center justify-between gap-3 rounded-2xl bg-background/80 px-3.5 py-3 ring-1 ring-border">
                    <dt className="text-sm text-muted-foreground">Status</dt>
                    <dd className="text-sm font-semibold text-foreground">{when}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-2xl bg-background/80 px-3.5 py-3 ring-1 ring-border">
                    <dt className="text-sm text-muted-foreground">Open</dt>
                    <dd className="text-sm font-semibold tabular-nums text-foreground">
                      {openCount}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-2xl bg-background/80 px-3.5 py-3 ring-1 ring-border">
                    <dt className="text-sm text-muted-foreground">Done</dt>
                    <dd className="text-sm font-semibold tabular-nums text-foreground">
                      {doneCount}
                    </dd>
                  </div>
                </dl>
              </section>
            </div>
          </aside>
        </section>
      </main>

      <footer className="border-t border-border/80 bg-card/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>Plan detail — work stays on this day.</p>
          <p>Check items off as you finish them.</p>
        </div>
      </footer>
    </div>
  )
}

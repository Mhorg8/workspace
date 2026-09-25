import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Blobs from "@/components/blobs"
import { ToolHeader } from "@/components/tool-header"
import { Button } from "@/components/ui/button"
import type { PlanDetail } from "@/features/plans/api/get-plan-action"
import { planDayStatus } from "@/features/plans/utils/plan-day"
import ListOfPlanItems from "./list-of-plan-items"
import PlanSummary from "./plan-summary"
import PlanEmptyState from "./plan-empty-state"
import PlanInformation from "./plan-information"
import PlanProgress from "./plan-progress"

type PlanDetailScreenProps = {
  plan: PlanDetail
}

export default function PlanDetailScreen({ plan }: PlanDetailScreenProps) {
  const when = planDayStatus(plan.day)
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
            <ArrowLeft
              className="size-4"
              aria-hidden="true"
            />
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

              <PlanInformation
                when={when}
                day={plan.day}
                title={plan.title}
                description={plan.description ?? ""}
                plan={plan}
              />
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
                  {totalCount === 0 ? "Nothing queued yet" : `${doneCount} of ${totalCount} done`}
                </p>
              </div>

              {totalCount === 0 ? <PlanEmptyState /> : <ListOfPlanItems items={items} />}
            </section>
          </div>

          <aside className="flex flex-col gap-5 lg:col-span-4">
            <div className="flex flex-col gap-5 lg:sticky lg:top-24">
              <PlanProgress
                progress={progress}
                totalCount={totalCount}
                openCount={openCount}
                doneCount={doneCount}
              />

              <PlanSummary
                when={when}
                openCount={openCount}
                doneCount={doneCount}
              />
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

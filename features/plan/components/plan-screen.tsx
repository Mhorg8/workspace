"use client"
import Blobs from "@/components/blobs"
import { ToolHeader } from "@/components/tool-header"
import CreatePlanDrawer from "./create-plan-drawer"
import { PlanList } from "./plan-list"
import { usePlans } from "../hooks/use-plans"

const PlanScreen = () => {
  const { plans, status, error, refresh } = usePlans()

  return (
    <div className="relative isolate overflow-x-hidden">
      <a
        href="#plan"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-primary-foreground focus:outline-none"
      >
        Skip to plan
      </a>

      <Blobs />
      <ToolHeader />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6 sm:py-12 lg:gap-14 min-h-dvh">
        <section className="max-w-3xl">
          <p className="inline-flex items-center rounded-full bg-card px-3 py-1 text-sm font-medium text-primary shadow-sm ring-1 ring-border">
            Plan your Day.
          </p>
          <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl sm:leading-tight">
            <span className="bg-gradient-to-r from-primary via-[#db2777] to-accent bg-clip-text text-transparent">
              Plan your Day with ease and get things done.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Plan your Day with ease and get things done. It's simple and easy to use.
          </p>

          <CreatePlanDrawer hasPlans={plans.length > 0} onCreated={() => void refresh()} />
        </section>

        <PlanList plans={plans} status={status} error={error} onRetry={() => void refresh()} />
      </main>
    </div>
  )
}

export default PlanScreen

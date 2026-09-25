import React from "react"

interface Props {
  when: string
  openCount: number
  doneCount: number
}

const PlanSummary = ({ when, openCount, doneCount }: Props) => {
  return (
    <section className="rounded-[2rem] bg-card p-5 shadow-lg ring-1 ring-foreground/5 sm:p-6">
      <h2 className="font-heading text-lg font-semibold">At a glance</h2>
      <dl className="mt-4 grid gap-3">
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-background/80 px-3.5 py-3 ring-1 ring-border">
          <dt className="text-sm text-muted-foreground">Status</dt>
          <dd className="text-sm font-semibold text-foreground">{when}</dd>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-background/80 px-3.5 py-3 ring-1 ring-border">
          <dt className="text-sm text-muted-foreground">Open</dt>
          <dd className="text-sm font-semibold tabular-nums text-foreground">{openCount}</dd>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-background/80 px-3.5 py-3 ring-1 ring-border">
          <dt className="text-sm text-muted-foreground">Done</dt>
          <dd className="text-sm font-semibold tabular-nums text-foreground">{doneCount}</dd>
        </div>
      </dl>
    </section>
  )
}

export default PlanSummary

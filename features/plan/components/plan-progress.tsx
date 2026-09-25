import React from "react"

interface Props {
  progress: number
  totalCount: number
  openCount: number
  doneCount: number
}

const PlanProgress = ({ progress, totalCount, openCount, doneCount }: Props) => {
  return (
    <section
      aria-live="polite"
      className="rounded-[2rem] bg-[linear-gradient(160deg,#2563eb_0%,#7c3aed_55%,#e11d48_100%)] p-5 text-white shadow-lg sm:p-6"
    >
      <p className="text-sm font-medium text-white/80">Progress</p>
      <p className="font-heading mt-1 text-3xl font-semibold tabular-nums">{progress}%</p>
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
  )
}

export default PlanProgress

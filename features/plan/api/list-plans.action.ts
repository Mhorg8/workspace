"use server"

import { utcDateToCalendarDate } from "../utils/plan-day"
import { listPlans } from "./plan.repository"

export type PlanSummary = {
  id: string
  title: string
  day: string
}

type ListPlansActionResult = { ok: true; plans: PlanSummary[] } | { ok: false; error: string }

export async function listPlansAction(): Promise<ListPlansActionResult> {
  try {
    const plans = await listPlans()

    return {
      ok: true,
      plans: plans.map((plan) => ({
        id: plan.id.toString(),
        title: plan.title,
        day: utcDateToCalendarDate(plan.day),
      })),
    }
  } catch {
    return {
      ok: false,
      error: "Could not load your plans. Check your connection and try again.",
    }
  }
}

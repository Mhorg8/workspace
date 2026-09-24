import { getPlanById as getPlanByIdFromDb } from "./plan.repository"
import { utcDateToCalendarDate } from "../utils/plan-day"
import { PlanItem } from "@/generated/prisma/client"

export type PlanDetail = {
  id: string
  title: string
  description: string | null
  day: string
  items: PlanItem[]
  createdAt: Date
  updatedAt: Date
}

type GetPlanByIdResult = { ok: true; plan: PlanDetail } | { ok: false; error: string }

/** Server-side read — not a Server Action. Call from Server Components only. */
export async function getPlanById(id: string): Promise<GetPlanByIdResult> {
  const planId = Number.parseInt(id, 10)
  if (!Number.isFinite(planId) || planId <= 0) {
    return { ok: false, error: "Plan not found" }
  }

  try {
    const plan = await getPlanByIdFromDb(BigInt(planId))

    if (!plan) {
      return { ok: false, error: "Plan not found" }
    }

    return {
      ok: true,
      plan: {
        id: plan.id.toString(),
        title: plan.title,
        description: plan.description,
        day: utcDateToCalendarDate(plan.day),
        items: plan.items,
        createdAt: plan.createdAt,
        updatedAt: plan.updatedAt,
      },
    }
  } catch {
    return {
      ok: false,
      error: "Could not load this plan. Check your connection and try again.",
    }
  }
}

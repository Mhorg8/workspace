"use server"

import { Prisma } from "@/generated/prisma/client"

import { createPlanSchema } from "../schema"
import { calendarDateToUtc } from "../utils/plan-day"
import { createPlan } from "./plan.repository"

type CreatePlanActionInput = {
  title: string
  description?: string
  day: string
}

type CreatePlanActionResult = { ok: true } | { ok: false; error: string }

export async function createPlanAction(
  input: CreatePlanActionInput,
): Promise<CreatePlanActionResult> {
  const day = calendarDateToUtc(input.day)
  if (!day) {
    return { ok: false, error: "Choose a valid day, then try again." }
  }

  const parsed = createPlanSchema.safeParse({
    title: input.title.trim(),
    description: (input.description ?? "").trim(),
    day: new Date(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate()),
  })

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Check the title and day, then try again."
    return { ok: false, error: message }
  }

  try {
    await createPlan({
      title: parsed.data.title,
      description: parsed.data.description || undefined,
      day,
    })
    return { ok: true }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return {
        ok: false,
        error: "You already have a plan for this day. Pick another day.",
      }
    }

    return {
      ok: false,
      error: "Could not save this plan. Check your connection and try again.",
    }
  }
}

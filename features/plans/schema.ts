import { z } from "zod"

import { startOfLocalDay } from "./utils/plan-day"

export const createPlanSchema = z.object({
  title: z.string().min(1, "Add a title so you can recognize this plan."),
  description: z.string().max(500, "Keep the description under 500 characters."),
  day: z.date().refine((value) => startOfLocalDay(value) >= startOfLocalDay(new Date()), {
    message: "Choose today or a later day.",
  }),
})

export type CreatePlanSchema = z.infer<typeof createPlanSchema>

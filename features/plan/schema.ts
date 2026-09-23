import { z } from "zod"

import { startOfLocalDay } from "./utils/plan-day"

export const createPlanSchema = z.object({
  title: z.string().trim().min(1, "Add a title so you can recognize this plan."),
  day: z.date().refine((value) => startOfLocalDay(value) >= startOfLocalDay(new Date()), {
    message: "Choose today or a later day.",
  }),
})

export type CreatePlanSchema = z.infer<typeof createPlanSchema>

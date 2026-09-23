import prisma from "@/lib/prisma"

type CreatePlanInput = {
  title: string
  day: Date
}

export function listPlans() {
  return prisma.plan.findMany({
    orderBy: { day: "asc" },
    select: {
      id: true,
      title: true,
      day: true,
    },
  })
}

export function createPlan(input: CreatePlanInput) {
  return prisma.plan.create({
    data: {
      title: input.title,
      day: input.day,
    },
    select: {
      id: true,
    },
  })
}

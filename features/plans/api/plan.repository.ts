import prisma from "@/lib/prisma"

type CreatePlanInput = {
  title: string
  description?: string
  day: Date
}

export function listPlans() {
  return prisma.plan.findMany({
    orderBy: { day: "asc" },
    select: {
      id: true,
      title: true,
      description: true,
      day: true,
    },
  })
}

export function getPlanById(id: bigint) {
  return prisma.plan.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      day: true,
      createdAt: true,
      updatedAt: true,
      items: true,
    }
  })
}

export function createPlan(input: CreatePlanInput) {
  return prisma.plan.create({
    data: {
      title: input.title,
      description: input.description,
      day: input.day,
    },
    select: {
      id: true,
    },
  })
}

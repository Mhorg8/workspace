import { getPlanById } from "@/features/plans/api/get-plan-action"
import PlanDetailScreen from "@/features/plan/components/plan-detail-screen"

interface Props {
  params: Promise<{ id: string }>
}

const PlanPage = async ({ params }: Props) => {
  const { id } = await params

  const plan = await getPlanById(id)
  if (!plan.ok) {
    return <div>{plan.error}</div>
  }

  console.log(plan.plan)

  return <PlanDetailScreen plan={plan.plan} />
}

export default PlanPage

import PlanScreen from "@/features/plan/components/plan-screen"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tools — Plan your Day",
  description: "Plan your Day with ease and get things done. It's simple and easy to use.",
}

const Page = () => {
  return <PlanScreen />
}

export default Page

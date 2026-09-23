import { useCallback, useEffect, useState } from "react"

import { listPlansAction, type PlanSummary } from "../api/list-plans.action"

type PlansStatus = "loading" | "ready" | "error"

export function usePlans() {
  const [plans, setPlans] = useState<PlanSummary[]>([])
  const [status, setStatus] = useState<PlansStatus>("loading")
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    const result = await listPlansAction()

    if (!result.ok) {
      setStatus("error")
      setError(result.error)
      return
    }

    setPlans(result.plans)
    setStatus("ready")
    setError(null)
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return {
    plans,
    status,
    error,
    refresh,
  }
}

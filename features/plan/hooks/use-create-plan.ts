import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { createPlanAction } from "../api/create-plan.action"
import { createPlanSchema, type CreatePlanSchema } from "../schema"
import { startOfLocalDay, toCalendarDate } from "../utils/plan-day"

type UseCreatePlanOptions = {
  onCreated?: () => void
}

export const useCreatePlan = ({ onCreated }: UseCreatePlanOptions = {}) => {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [savedTitle, setSavedTitle] = useState<string | null>(null)

  const form = useForm<CreatePlanSchema>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      day: startOfLocalDay(new Date()),
      title: "",
    },
    resolver: zodResolver(createPlanSchema),
  })

  async function onSubmit(data: CreatePlanSchema) {
    setSubmitError(null)
    setSavedTitle(null)

    const result = await createPlanAction({
      title: data.title,
      day: toCalendarDate(data.day),
    })

    if (!result.ok) {
      setSubmitError(result.error)
      return
    }

    setSavedTitle(data.title)
    onCreated?.()
    form.reset({
      title: "",
      day: startOfLocalDay(new Date()),
    })
  }

  return {
    form,
    onSubmit,
    submitError,
    savedTitle,
  }
}

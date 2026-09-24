"use client"

import { CalendarIcon } from "lucide-react"
import { useState } from "react"
import { Controller } from "react-hook-form"

import ResponsiveDialog from "@/components/responsive-dialog"
import { toolSkinClassName } from "@/components/tool-skin"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

import { useCreatePlan } from "../hooks/use-create-plan"
import { startOfLocalDay } from "../utils/plan-day"
import DayCalender from "./day-calender"
import GetPlanInformation from "./get-plan-information"


type CreatePlanDrawerProps = {
  hasPlans?: boolean
  onCreated?: () => void
}

type Step = 1 | 2

const CreatePlanDrawer = ({ hasPlans = false, onCreated }: CreatePlanDrawerProps) => {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>(1)
  const { form, onSubmit, submitError, savedTitle } = useCreatePlan({
    onCreated: () => {
      setStep(1)
      onCreated?.()
    },
  })
  const {
    register,
    control,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = form

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    if (!nextOpen) {
      setStep(1)
    }
  }

  async function goToDateStep() {
    const valid = await trigger(["title", "description"])
    if (valid) {
      setStep(2)
    }
  }

  return (
    <ResponsiveDialog.Root open={open} onOpenChange={handleOpenChange}>
      <ResponsiveDialog.Trigger
        render={<Button variant="default" className="mt-4 h-11 min-h-11 cursor-pointer px-4" />}
      >
        {hasPlans ? "Create a plan" : "Create First Plan"}
      </ResponsiveDialog.Trigger>
      <ResponsiveDialog.Content className={toolSkinClassName}>
        <ResponsiveDialog.Header>
          <ResponsiveDialog.Title>
            {step === 1 ? "Name your plan" : "Choose a day"}
          </ResponsiveDialog.Title>
          <ResponsiveDialog.Description>
            {step === 1
              ? "Add a title and optional description first."
              : "Pick today or a later day for this plan."}
          </ResponsiveDialog.Description>
          <p className="text-sm leading-5 text-muted-foreground" aria-live="polite">
            Step {step} of 2
          </p>
        </ResponsiveDialog.Header>

        <form
          className="flex flex-col gap-5 px-4 md:px-0"
          noValidate
          onSubmit={(event) => {
            if (step !== 2) {
              event.preventDefault()
              void goToDateStep()
              return
            }

            void handleSubmit(onSubmit)(event)
          }}
        >
          {step === 1 ? (
            <GetPlanInformation errors={errors} register={register} />
          ) : (
            <DayCalender control={control} errors={errors} />
          )}

          {savedTitle ? (
            <p role="status" className="text-sm leading-5 text-foreground">
              Saved “{savedTitle}”. Add another day, or close this panel.
            </p>
          ) : null}
          {submitError ? (
            <p role="alert" className="text-sm leading-5 text-destructive">
              {submitError}
            </p>
          ) : null}

          <ResponsiveDialog.Footer className="px-0">
            {step === 1 ? (
              <>
                <ResponsiveDialog.Close
                  render={
                    <Button type="button" variant="outline" className="h-11 min-h-11 cursor-pointer" />
                  }
                >
                  Close
                </ResponsiveDialog.Close>
                <Button
                  type="button"
                  className="h-11 min-h-11 cursor-pointer"
                  onClick={() => void goToDateStep()}
                >
                  Continue
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 min-h-11 cursor-pointer"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button type="submit" className="h-11 min-h-11 cursor-pointer" disabled={isSubmitting}>
                  {isSubmitting ? "Creating…" : "Create plan"}
                </Button>
              </>
            )}
          </ResponsiveDialog.Footer>
        </form>
      </ResponsiveDialog.Content>
    </ResponsiveDialog.Root>
  )
}

export default CreatePlanDrawer

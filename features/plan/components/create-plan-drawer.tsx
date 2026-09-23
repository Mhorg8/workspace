"use client"

import { CalendarIcon } from "lucide-react"
import { Controller } from "react-hook-form"

import ResponsiveDialog from "@/components/responsive-dialog"
import { toolSkinClassName } from "@/components/tool-skin"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useCreatePlan } from "../hooks/use-create-plan"
import { startOfLocalDay } from "../utils/plan-day"

const dayFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: "long",
  month: "long",
  day: "numeric",
})

type CreatePlanDrawerProps = {
  hasPlans?: boolean
  onCreated?: () => void
}

const CreatePlanDrawer = ({ hasPlans = false, onCreated }: CreatePlanDrawerProps) => {
  const { form, onSubmit, submitError, savedTitle } = useCreatePlan({ onCreated })
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form

  return (
    <ResponsiveDialog.Root>
      <ResponsiveDialog.Trigger
        render={<Button variant="default" className="mt-4 h-11 min-h-11 cursor-pointer px-4" />}
      >
        {hasPlans ? "Create a plan" : "Create First Plan"}
      </ResponsiveDialog.Trigger>
      <ResponsiveDialog.Content className={toolSkinClassName}>
        <ResponsiveDialog.Header>
          <ResponsiveDialog.Title>Create a plan</ResponsiveDialog.Title>
          <ResponsiveDialog.Description>
            Name the work, then choose today or a later day.
          </ResponsiveDialog.Description>
        </ResponsiveDialog.Header>

        <form
          className="flex flex-col gap-5 px-4 md:px-0"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="plan-title">
              Title <span className="font-normal text-muted-foreground">(required)</span>
            </Label>
            <Input
              id="plan-title"
              className="h-11 min-h-11 text-base"
              autoComplete="off"
              aria-invalid={errors.title ? true : undefined}
              aria-describedby={errors.title ? "plan-title-error" : "plan-title-hint"}
              {...register("title")}
            />
            <p id="plan-title-hint" className="text-sm leading-5 text-muted-foreground">
              A short name for what you want to finish.
            </p>
            {errors.title?.message ? (
              <p id="plan-title-error" role="alert" className="text-sm leading-5 text-destructive">
                {errors.title.message}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <p id="plan-day-label" className="text-sm leading-none font-medium">
              Day <span className="font-normal text-muted-foreground">(required)</span>
            </p>
            <Controller
              control={control}
              name="day"
              render={({ field }) => (
                <div role="group" aria-labelledby="plan-day-label">
                  <p className="mb-2 flex items-center gap-2 text-sm leading-5 text-foreground">
                    <CalendarIcon className="size-4 shrink-0" aria-hidden="true" />
                    <span>{dayFormatter.format(field.value)}</span>
                  </p>
                  <Calendar
                    mode="single"
                    required
                    selected={field.value}
                    onSelect={(day) => {
                      if (day) {
                        field.onChange(startOfLocalDay(day))
                      }
                    }}
                    disabled={{ before: startOfLocalDay(new Date()) }}
                    className="w-full rounded-3xl bg-card p-2 ring-1 ring-foreground/5 [--cell-size:2.75rem]"
                  />
                </div>
              )}
            />
            <p id="plan-day-hint" className="text-sm leading-5 text-muted-foreground">
              Past days stay unavailable.
            </p>
            {errors.day?.message ? (
              <p id="plan-day-error" role="alert" className="text-sm leading-5 text-destructive">
                {errors.day.message}
              </p>
            ) : null}
          </div>

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
            <ResponsiveDialog.Close
              render={<Button type="button" variant="outline" className="h-11 min-h-11 cursor-pointer" />}
            >
              Close
            </ResponsiveDialog.Close>
            <Button type="submit" className="h-11 min-h-11 cursor-pointer" disabled={isSubmitting}>
              {isSubmitting ? "Creating…" : "Create plan"}
            </Button>
          </ResponsiveDialog.Footer>
        </form>
      </ResponsiveDialog.Content>
    </ResponsiveDialog.Root>
  )
}

export default CreatePlanDrawer

import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { Control, Controller, FieldErrors } from "react-hook-form"
import { type CreatePlanSchema } from "../schema"
import { startOfLocalDay } from "../utils/plan-day"

type DayCalenderProps = {
  control: Control<CreatePlanSchema>
  errors: FieldErrors<CreatePlanSchema>
}

const dayFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: "long",
  month: "long",
  day: "numeric",
})

const DayCalender = ({ control, errors }: DayCalenderProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p
        id="plan-day-label"
        className="text-sm leading-none font-medium"
      >
        Day <span className="font-normal text-muted-foreground">(required)</span>
      </p>
      <Controller
        control={control}
        name="day"
        render={({ field }) => (
          <div
            role="group"
            aria-labelledby="plan-day-label"
          >
            <p className="mb-2 flex items-center gap-2 text-sm leading-5 text-foreground">
              <CalendarIcon
                className="size-4 shrink-0"
                aria-hidden="true"
              />
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
              className="mx-auto rounded-2xl bg-card p-1.5 ring-1 ring-foreground/5 [--cell-size:2rem]"
            />
          </div>
        )}
      />
      <p
        id="plan-day-hint"
        className="text-sm leading-5 text-muted-foreground"
      >
        Past days stay unavailable.
      </p>
      {errors.day?.message ? (
        <p
          id="plan-day-error"
          role="alert"
          className="text-sm leading-5 text-destructive"
        >
          {errors.day.message}
        </p>
      ) : null}
    </div>
  )
}

export default DayCalender

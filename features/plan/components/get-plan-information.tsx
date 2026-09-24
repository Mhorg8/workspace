import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { CreatePlanSchema } from '../schema'

type GetPlanInformationProps = {
    errors: FieldErrors<CreatePlanSchema>
    register: UseFormRegister<CreatePlanSchema>
}

const GetPlanInformation = ({ errors, register }: GetPlanInformationProps) => {
    return (
        <>
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
                    <p
                        id="plan-title-error"
                        role="alert"
                        className="text-sm leading-5 text-destructive"
                    >
                        {errors.title.message}
                    </p>
                ) : null}
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="plan-description">
                    Description{" "}
                    <span className="font-normal text-muted-foreground">(optional)</span>
                </Label>
                <textarea
                    id="plan-description"
                    rows={4}
                    autoComplete="off"
                    aria-invalid={errors.description ? true : undefined}
                    aria-describedby={
                        errors.description ? "plan-description-error" : "plan-description-hint"
                    }
                    className={cn(
                        "w-full min-w-0 resize-y rounded-3xl border border-transparent bg-input/50 px-3 py-3 text-base transition-[color,box-shadow,background-color] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm",
                    )}
                    {...register("description")}
                />
                <p id="plan-description-hint" className="text-sm leading-5 text-muted-foreground">
                    A little more context, if you need it.
                </p>
                {errors.description?.message ? (
                    <p
                        id="plan-description-error"
                        role="alert"
                        className="text-sm leading-5 text-destructive"
                    >
                        {errors.description.message}
                    </p>
                ) : null}
            </div>
        </>
    )
}

export default GetPlanInformation
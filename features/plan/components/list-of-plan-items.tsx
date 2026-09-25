import { PlanItem } from "@/generated/prisma/client"
import { cn } from "@/lib/utils"
import { CheckCircle2, Circle } from "lucide-react"
import React from "react"

interface Props {
  items: PlanItem[]
}

const ListOfPlanItems = ({ items }: Props) => {
  return (
    <ul className="flex list-none flex-col gap-3">
      {items.map((item) => {
        const itemId = item.id.toString()

        return (
          <li
            key={itemId}
            className={cn(
              "rounded-[1.5rem] p-4 ring-1 transition-[background-color,box-shadow] duration-200",
              item.done
                ? "bg-muted/50 ring-border/70"
                : "bg-background/80 ring-border hover:ring-primary/40",
            )}
          >
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  "mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full",
                  item.done ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground",
                )}
                aria-hidden="true"
              >
                {item.done ? <CheckCircle2 className="size-5" /> : <Circle className="size-5" />}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3
                    className={cn(
                      "font-heading text-base font-semibold leading-6 sm:text-lg",
                      item.done && "text-muted-foreground line-through",
                    )}
                  >
                    {item.title}
                  </h3>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                      item.done ? "bg-[#dcfce7] text-[#166534]" : "bg-[#dbeafe] text-[#1e3a8a]",
                    )}
                  >
                    {item.done ? "Done" : "Open"}
                  </span>
                </div>
                {item.notes ? (
                  <p
                    className={cn(
                      "mt-1.5 text-sm leading-6 text-muted-foreground",
                      item.done && "line-through opacity-80",
                    )}
                  >
                    {item.notes}
                  </p>
                ) : null}
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default ListOfPlanItems

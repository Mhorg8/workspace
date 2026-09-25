import { Button } from "@/components/ui/button"
import { ListTodo, PlusIcon } from "lucide-react"

const PlanEmptyState = () => {
  return (
    <div className="flex min-h-44 flex-col items-center justify-center gap-3 rounded-[1.6rem] bg-background/80 px-6 py-10 text-center ring-1 ring-border">
      <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-muted text-primary">
        <ListTodo
          className="size-5"
          aria-hidden="true"
        />
      </span>
      <p className="font-heading text-lg font-semibold">No items yet</p>
      <p className="max-w-sm text-sm leading-6 text-muted-foreground">
        This plan is ready. Add pieces of work when you know what belongs on this day.
      </p>
      <Button>
        <PlusIcon
          className="size-4"
          aria-hidden="true"
        />
        Add item
      </Button>
    </div>
  )
}

export default PlanEmptyState

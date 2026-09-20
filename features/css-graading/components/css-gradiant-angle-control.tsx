import { MAX_ANGLE, MIN_ANGLE } from "../constants"

type CssGradiantAngleControlProps = {
  angleId: string
  angle: number
  onAngleChange: (angle: number) => void
}

export function CssGradiantAngleControl({
  angleId,
  angle,
  onAngleChange,
}: CssGradiantAngleControlProps) {
  return (
    <div className="grid gap-3 rounded-[1.6rem] border-2 border-border bg-background/80 p-4 sm:p-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <label htmlFor={angleId} className="text-sm font-medium">
            Angle
          </label>
          <p id={`${angleId}-help`} className="mt-1 text-xs leading-5 text-muted-foreground">
            Rotate the blend from 0° to 360°.
          </p>
        </div>
        <p className="font-heading text-2xl font-semibold tabular-nums text-primary">{angle}°</p>
      </div>

      <input
        id={angleId}
        type="range"
        min={MIN_ANGLE}
        max={MAX_ANGLE}
        step={1}
        value={angle}
        aria-describedby={`${angleId}-help`}
        aria-valuetext={`${angle} degrees`}
        onChange={(event) => onAngleChange(Number(event.target.value))}
        className="quality-slider w-full"
      />
    </div>
  )
}

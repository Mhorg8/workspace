import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { ColorFormatOption } from './color-convertor-format'

interface Props {
  selected: ColorFormatOption
}

const ColorConvertorSession = ({ selected }: Props) => {
  return (
    <section
      aria-live="polite"
      className="h-fit rounded-[2rem] bg-[linear-gradient(160deg,#2563eb_0%,#7c3aed_55%,#e11d48_100%)] p-5 text-white shadow-lg sm:p-6"
    >
      <p className="text-sm font-medium text-white/80">Session</p>
      <p className="font-heading mt-1 text-2xl font-semibold">Ready to convert</p>
      <p className="mt-2 text-sm leading-6 text-white/85">
        Enter a source color to generate a {selected.label} value you can copy.
      </p>
      <Button
        size="lg"
        className="mt-5 h-12 w-full cursor-pointer rounded-full bg-white text-primary hover:bg-white/90 disabled:bg-white/70"
        disabled
      >
        <Copy className="size-4" aria-hidden="true" />
        Copy {selected.label}
      </Button>
    </section>
  )
}

export default ColorConvertorSession
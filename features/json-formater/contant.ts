import { AlignLeft, Braces, CheckCircle2, ShieldCheck } from "lucide-react";

export const highlights = [
  {
    title: "Parse first",
    body: "Invalid JSON is rejected. Only a real parsed value is shown.",
    icon: Braces,
    tint: "bg-[#ffe4e6] text-[#9f1239]",
  },
  {
    title: "Pretty and precise",
    body: "2-space indent, original key order, and no rewritten values.",
    icon: AlignLeft,
    tint: "bg-[#dbeafe] text-[#1e3a8a]",
  },
  {
    title: "Nested stays nested",
    body: "Objects and arrays keep their shape after formatting.",
    icon: CheckCircle2,
    tint: "bg-[#fef3c7] text-[#92400e]",
  },
  {
    title: "Nothing is stored",
    body: "JSON stays in this tab. Formatting happens in the browser.",
    icon: ShieldCheck,
    tint: "bg-[#ede9fe] text-[#5b21b6]",
  },
]
    
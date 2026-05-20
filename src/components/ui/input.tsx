/**
 * Cater Input — shadcn input (@base-ui/react/input), skinned with Cater tokens.
 *
 * Figma: https://www.figma.com/design/tK5SjqGRgeVr5w5tmxuLDa/Cater-Design-System?node-id=99-960
 *
 * This is the raw <input> primitive. Use <InputField> for the full compound
 * component with label, hint text, and error handling.
 *
 * Tokens used
 * ───────────
 * bg:            White (#ffffff)
 * border:        Color/Border/Default (#d9dde4)
 * radius:        Spacing/8 (8px)
 * shadow:        Shadow/xs — 0 1px 1px rgba(16,24,40,0.05)
 * text:          Subtitle/Regular — Inter 16px/500, Color/Text/Subtitle (#68707c), tracking -0.16px
 * placeholder:   Color/Text/Subtitle (#68707c)
 * focus ring:    Input/Highlight/Focus — 0 0 0 2px Salem/100 (#ceecda)
 * error border:  Color/Error/Border (#e89a9a)   [via aria-invalid]
 * error ring:    Input/Error/Focus — 0 0 0 2px #ffdcdc  [via aria-invalid]
 * disabled bg:   Color/Surface/Disabled (#f1f2f5)
 * disabled text: Color/Text/Disabled (#b2b8c1)
 */

import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "@/lib/utils"

export type InputVariant = "default" | "ghost"

export interface InputProps extends React.ComponentProps<"input"> {
  /** ghost = no border, no shadow, transparent bg */
  variant?: InputVariant
}

function Input({ className, variant = "default", type, ...props }: InputProps) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        // ── Layout ──
        "w-full min-w-0 flex-1",
        // ── Typography — Subtitle/Regular ──
        "font-[family-name:var(--font-body)]",
        "text-[16px] font-medium leading-[1.5] tracking-[-0.16px]",
        // ── Colours — use @theme utilities so CSS vars resolve reliably ──
        // Default / placeholder: Color/Text/Subtitle #68707c
        "text-muted-foreground",
        "placeholder:text-muted-foreground",
        // ── Shape & spacing (set on wrapper, not here) ──
        "bg-transparent outline-none border-0 p-0",
        // ── Disabled — Color/Text/Disabled #b2b8c1 ──
        "disabled:pointer-events-none disabled:cursor-not-allowed",
        "disabled:text-[#b2b8c1]",
        "disabled:placeholder:text-[#b2b8c1]",
        // ── Filled state — Color/Text/Body #29344a ──
        "[&:not(:placeholder-shown)]:text-[#29344a]",
        className
      )}
      {...props}
    />
  )
}

export { Input }

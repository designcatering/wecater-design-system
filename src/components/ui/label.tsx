/**
 * Cater Label — shadcn label primitive, skinned with Cater tokens.
 *
 * Figma token: Subtitle2/Regular — Inter 14px/500, Color/Text/Subtitle (#68707c)
 */

"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        // Subtitle2/Regular — Inter 14px/500
        "font-[family-name:var(--font-body)] text-[14px] font-medium leading-[1.5]",
        // Color/Text/Subtitle (#68707c) — use @theme utility so CSS var resolves reliably
        "text-muted-foreground",
        // shadcn disabled peer pattern
        "select-none",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }

/**
 * Cater StatusBadge — inline status indicator for orders, reservations, and bookings.
 *
 * Figma: https://www.figma.com/design/tK5SjqGRgeVr5w5tmxuLDa/Cater-Design-System?node-id=5441-14991
 *
 * ─── Anatomy ──────────────────────────────────────────────────────────────────
 * <div> pill container h-[19px] rounded-[4px]
 *   ├── <span> 5.25px filled dot   (rounded-full, colour per status)
 *   └── <span> label text          (12px semibold Inter, colour per status)
 *
 * ─── Statuses ─────────────────────────────────────────────────────────────────
 * confirmed  bg: --cater-green-50  (#d4f5ed)   text: --cater-green-800 (#073d30)
 * preparing  bg: --cater-blush-50  (#fff1fd)   text: --cater-blush-900 (#8e2e84)
 * completed  bg: --cater-mirage-100 (#f1f2f5)  text: --cater-mirage-800 (#29344a)
 * pending    bg: --cater-orange-50 (#fff2e5)   text: --cater-orange-800 (#984900)
 */

"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export type BadgeStatus = "confirmed" | "preparing" | "completed" | "pending"

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: BadgeStatus
}

// ─── Token map ────────────────────────────────────────────────────────────────
// Inline styles used for colours — guarantees rendering independent of Tailwind scan.

const STATUS_CONFIG: Record<
  BadgeStatus,
  { bg: string; dot: string; text: string; label: string }
> = {
  confirmed: {
    bg:    "#d4f5ed",
    dot:   "#073d30",
    text:  "#073d30",
    label: "Confirmed",
  },
  preparing: {
    bg:    "#fff1fd",
    dot:   "#8e2e84",
    text:  "#8e2e84",
    label: "Preparing",
  },
  completed: {
    bg:    "#f1f2f5",
    dot:   "#68707c",
    text:  "#29344a",
    label: "Completed",
  },
  pending: {
    bg:    "#fff2e5",
    dot:   "#984900",
    text:  "#984900",
    label: "Pending",
  },
}

// ─── CVA — structural classes only ───────────────────────────────────────────

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center",
    "overflow-hidden",
    "font-[family-name:var(--font-body)]",
    "whitespace-nowrap select-none",
  ]
)

// ─── Component ────────────────────────────────────────────────────────────────

const StatusBadge = React.forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ status = "confirmed", className, style, ...props }, ref) => {
    const config = STATUS_CONFIG[status]

    return (
      <div
        ref={ref}
        role="status"
        aria-label={config.label}
        className={cn(badgeVariants(), className)}
        style={{ backgroundColor: config.bg, gap: "6px", borderRadius: "4px", padding: "2px 7px", ...style }}
        {...props}
      >
        {/* Status dot */}
        <span
          aria-hidden="true"
          className="shrink-0 rounded-full"
          style={{
            width:           "6.8px",
            height:          "6.8px",
            backgroundColor: config.dot,
          }}
        />

        {/* Label */}
        <span
          className="text-[12px] font-semibold leading-[1.44] not-italic"
          style={{ color: config.text }}
        >
          {config.label}
        </span>
      </div>
    )
  }
)

StatusBadge.displayName = "StatusBadge"

export { StatusBadge, badgeVariants }

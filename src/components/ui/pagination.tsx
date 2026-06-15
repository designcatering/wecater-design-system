/**
 * Cater Pagination — page controls for data tables.
 *
 * Figma: https://www.figma.com/design/tK5SjqGRgeVr5w5tmxuLDa/Cater-Design-System?node-id=5460-21107
 *
 * ─── Anatomy ──────────────────────────────────────────────────────────────────
 * [1 - 20 of 161]   [|<]  [<]  [>]  [>|]
 *
 * Range label  — 13px/600 Inter · #68707c / muted #b2b8c1 for "of"
 * Control pill — 4 buttons × 42px wide × 28px tall
 *                First + Last buttons: 24px radius on outer corners
 *                Inner buttons: square
 *                Disabled border: rgba(217,221,228,0.5)
 *                Enabled border:  #d9dde4
 *
 * ─── Design tokens ────────────────────────────────────────────────────────────
 * --color-text-subtitle  #68707c   label text
 * --color-text-disabled  #b2b8c1   "of" muted
 * --color-border-default #d9dde4   enabled button border
 * --color-dialogue-outline rgba(217,221,228,0.5)  disabled border
 */

"use client"

import * as React from "react"
import {
  RiSkipBackLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiSkipForwardLine,
} from "@remixicon/react"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  page:         number
  pageSize?:    number
  total:        number
  onPageChange: (page: number) => void
}

// ─── PaginationButton ─────────────────────────────────────────────────────────

interface PaginationButtonProps {
  onClick:    () => void
  disabled:   boolean
  isFirst?:   boolean
  isLast?:    boolean
  ariaLabel:  string
  children:   React.ReactNode
}

function PaginationButton({
  onClick,
  disabled,
  isFirst = false,
  isLast  = false,
  ariaLabel,
  children,
}: PaginationButtonProps) {
  const [hovered, setHovered] = React.useState(false)

  const borderColor  = disabled ? "rgba(217,221,228,0.5)" : "#d9dde4"
  const bgColor      = hovered && !disabled ? "#f4f6f8" : "#ffffff"

  const borderRadius: React.CSSProperties = isFirst
    ? { borderRadius: "24px 0 0 24px" }
    : isLast
    ? { borderRadius: "0 24px 24px 0" }
    : { borderRadius: 0 }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width:           "42px",
        height:          "28px",
        border:          `1px solid ${borderColor}`,
        marginRight:     "-1px",
        background:      bgColor,
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        cursor:          disabled ? "not-allowed" : "pointer",
        transition:      "background 150ms ease",
        overflow:        "hidden",
        flexShrink:      0,
        ...borderRadius,
      }}
    >
      {children}
    </button>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({ page, pageSize = 20, total, onPageChange, className, style, ...props }, ref) => {
    const totalPages = Math.max(1, Math.ceil(total / pageSize))
    const start      = total === 0 ? 0 : (page - 1) * pageSize + 1
    const end        = Math.min(page * pageSize, total)

    const isFirst = page <= 1
    const isLast  = page >= totalPages

    const iconStyle: React.CSSProperties = { width: 16, height: 16, color: "#68707c" }

    return (
      <div
        ref={ref}
        className={cn("flex items-center", className)}
        style={{ gap: "17px", ...style }}
        {...props}
      >
        {/* ── Range label ──────────────────────────────────────────────── */}
        <p
          style={{
            fontSize:   "13px",
            fontWeight: 600,
            lineHeight: 1.44,
            whiteSpace: "nowrap",
            color:      "#68707c",
            fontFamily: "var(--font-body)",
          }}
        >
          <span>{start} - {end} </span>
          <span style={{ color: "#b2b8c1" }}>of</span>
          <span> {total}</span>
        </p>

        {/* ── Control pill ─────────────────────────────────────────────── */}
        <div
          style={{
            display:    "flex",
            alignItems: "center",
            boxShadow:  "0px 1px 1px rgba(16,24,40,0.05)",
          }}
        >
          {/* First */}
          <PaginationButton
            onClick={() => onPageChange(1)}
            disabled={isFirst}
            isFirst
            ariaLabel="First page"
          >
            <RiSkipBackLine style={iconStyle} aria-hidden="true" />
          </PaginationButton>

          {/* Previous */}
          <PaginationButton
            onClick={() => onPageChange(page - 1)}
            disabled={isFirst}
            ariaLabel="Previous page"
          >
            <RiArrowLeftSLine style={iconStyle} aria-hidden="true" />
          </PaginationButton>

          {/* Next */}
          <PaginationButton
            onClick={() => onPageChange(page + 1)}
            disabled={isLast}
            ariaLabel="Next page"
          >
            <RiArrowRightSLine style={iconStyle} aria-hidden="true" />
          </PaginationButton>

          {/* Last */}
          <PaginationButton
            onClick={() => onPageChange(totalPages)}
            disabled={isLast}
            isLast
            ariaLabel="Last page"
          >
            <RiSkipForwardLine style={iconStyle} aria-hidden="true" />
          </PaginationButton>
        </div>
      </div>
    )
  }
)

Pagination.displayName = "Pagination"

export { Pagination }

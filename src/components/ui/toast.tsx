/**
 * Cater Toast — compound notification primitive.
 *
 * Figma: https://www.figma.com/design/tK5SjqGRgeVr5w5tmxuLDa/Cater-Design-System?node-id=4810-11345
 *
 * ─── Variants ─────────────────────────────────────────────────────────────────
 * default  →  dark (#101828 Mirage/900) bg · white text · Gossip-green action
 * success  →  Salem/50 (#e6f5ed) bg · Salem/900 text · green icon
 * info     →  purple-50 bg · purple-900 text · info icon
 * warning  →  amber-50 bg · amber-900 text · warning icon
 * error    →  Error/Bg-subtle (#ffdcdc) bg · Error/Text-subtle text · error icon
 *
 * ─── Anatomy ──────────────────────────────────────────────────────────────────
 * [icon?]  [message · description?]  [action?]  [×]
 *
 * ─── Figma tokens (default / dark variant) ────────────────────────────────────
 * bg        #101828
 * text      #ffffff
 * action    #ccf8b9  (Gossip)
 * radius    10px
 * padding   12px
 * shadow    0 4px 4px rgba(16,24,40,.10), 0 2px 2px rgba(16,24,40,.06)
 */

"use client"

import * as React from "react"
import {
  RiCheckboxCircleLine,
  RiInformationLine,
  RiAlertLine,
  RiErrorWarningLine,
  RiCloseLine,
} from "@remixicon/react"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastVariant = "default" | "success" | "info" | "warning" | "error"

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ToastVariant
  message: React.ReactNode
  description?: React.ReactNode
  action?: { label: string; onClick: () => void }
  showDismiss?: boolean
  onDismiss?: () => void
  hideIcon?: boolean
}

// ─── Per-variant design tokens ────────────────────────────────────────────────
// Inline styles are used for backgrounds/borders so Tailwind scanning order
// can never hide these values.

const VARIANT_CONFIG: Record<
  ToastVariant,
  {
    containerStyle: React.CSSProperties
    textClass: string
    actionClass: string
    iconClass: string
    Icon: React.ElementType | null
  }
> = {
  default: {
    containerStyle: {
      backgroundColor: "#101828",
      boxShadow: "0 4px 4px rgba(16,24,40,.10), 0 2px 2px rgba(16,24,40,.06)",
    },
    textClass:   "text-white",
    actionClass: "text-[#ccf8b9]",   // Gossip
    iconClass:   "text-white",
    Icon: null,
  },
  success: {
    containerStyle: {
      backgroundColor: "#e6f5ed",    // cater-salem-50
      border: "1px solid #9cd8b5",   // cater-salem-300
      boxShadow: "0 1px 2px rgba(16,24,40,.06)",
    },
    textClass:   "text-[#033f1c]",   // cater-salem-900
    actionClass: "text-[#067e39] underline underline-offset-2",
    iconClass:   "text-[#067e39]",   // cater-salem-700
    Icon: RiCheckboxCircleLine,
  },
  info: {
    containerStyle: {
      backgroundColor: "#f3e8ff",
      border: "1px solid #c084fc",
      boxShadow: "0 1px 2px rgba(16,24,40,.06)",
    },
    textClass:   "text-[#4a0080]",
    actionClass: "text-[#7c3aed] underline underline-offset-2",
    iconClass:   "text-[#7c3aed]",
    Icon: RiInformationLine,
  },
  warning: {
    containerStyle: {
      backgroundColor: "#fffbeb",
      border: "1px solid #fcd34d",
      boxShadow: "0 1px 2px rgba(16,24,40,.06)",
    },
    textClass:   "text-[#78350f]",
    actionClass: "text-[#d97706] underline underline-offset-2",
    iconClass:   "text-[#d97706]",
    Icon: RiAlertLine,
  },
  error: {
    containerStyle: {
      backgroundColor: "#ffdcdc",    // color-error-bg-subtle
      border: "1px solid #e89a9a",   // color-error-border
      boxShadow: "0 1px 2px rgba(16,24,40,.06)",
    },
    textClass:   "text-[#6b0100]",   // color-error-text-subtle
    actionClass: "text-[#6b0100] underline underline-offset-2",
    iconClass:   "text-[#c22d2c]",
    Icon: RiErrorWarningLine,
  },
}

// ─── Component ────────────────────────────────────────────────────────────────

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      variant = "default",
      message,
      description,
      action,
      showDismiss = true,
      onDismiss,
      hideIcon = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const cfg = VARIANT_CONFIG[variant]
    const { Icon } = cfg

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={cn(
          // ── layout ──
          "relative flex w-full items-center gap-[12px] rounded-[10px] p-[12px]",
          // ── typography base ──
          "font-[family-name:var(--font-body)] text-[14px] leading-[1.5]",
          className
        )}
        style={{ ...cfg.containerStyle, ...style }}
        {...props}
      >
        {/* Status icon (alert variants only) */}
        {Icon && !hideIcon && (
          <Icon
            className={cn("size-[20px] shrink-0 self-start mt-[1px]", cfg.iconClass)}
            aria-hidden="true"
          />
        )}

        {/* Message + description */}
        <div className={cn("flex min-w-0 flex-1 flex-col gap-[2px]", cfg.textClass)}>
          <div className="font-normal break-words">{message}</div>
          {description && (
            <div className="text-[13px] opacity-75">{description}</div>
          )}
        </div>

        {/* Inline action link */}
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className={cn(
              "shrink-0 cursor-pointer whitespace-nowrap font-semibold text-[14px]",
              "transition-opacity duration-150 hover:opacity-70",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
              cfg.actionClass
            )}
          >
            {action.label}
          </button>
        )}

        {/* Dismiss × */}
        {showDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss notification"
            className={cn(
              "shrink-0 cursor-pointer rounded-md p-[2px]",
              "transition-opacity duration-150 hover:opacity-60",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
              cfg.textClass
            )}
          >
            <RiCloseLine className="size-[20px]" aria-hidden="true" />
          </button>
        )}
      </div>
    )
  }
)
Toast.displayName = "Toast"

export { Toast }

/**
 * Cater InputField — compound component combining Label + Input + hint text.
 *
 * Figma: https://www.figma.com/design/tK5SjqGRgeVr5w5tmxuLDa/Cater-Design-System?node-id=99-960
 *
 * ─── Types ────────────────────────────────────────────────────────────────────
 * name     → label → [input  ↓]  → hint   (optional trailing chevron)
 * company  → label → [🔍 input ×] → hint
 * amount   → label → [input | USD ↓] → hint
 * date     → label → [input 📅]  → hint
 * copy     → label → [input | 📋 Copy] → hint
 *
 * ─── Sizes ────────────────────────────────────────────────────────────────────
 * sm  →  px-[12px] py-[10px]   (≈ 44px tall)
 * md  →  p-[12px]              (≈ 48px tall)   ← default
 *
 * ─── States & exact Figma colors ─────────────────────────────────────────────
 * default  border: #d9dde4  bg: #ffffff  text: #68707c  shadow: Shadow/xs
 * filled   border: #d9dde4  bg: #ffffff  text: #29344a  shadow: Shadow/xs
 * focus    border: #9cd8b5 (Salem/300)   ring: 0 0 0 2px #ceecda (Salem/100)
 * error    border: #e89a9a  bg: #ffffff  hint: #6b0100
 * ghost    border: #d0d5dd (Border/Darker)  bg: #fafbfc (Surface/Subtle)  text: #b2b8c1
 * disabled bg: #f1f2f5 (Surface/Disabled)  text: #b2b8c1  shadow: none
 *
 * ─── Tokens ───────────────────────────────────────────────────────────────────
 * --color-border-default  #d9dde4   default border
 * --color-border-darker   #d0d5dd   ghost border
 * --cater-salem-300       #9cd8b5   focus border
 * --cater-salem-100 / #ceecda       focus ring
 * --color-error-border    #e89a9a   error border
 * --color-error-bg-subtle #ffdcdc   error focus ring
 * --color-error-text-subtle #6b0100 error hint
 * --color-surface-subtle  #fafbfc   ghost bg · copy-panel bg
 * --color-surface-disabled #f1f2f5  disabled bg · amount-panel bg
 * --color-text-subtitle   #68707c   label · placeholder · icon · hint
 * --color-text-body       #29344a   filled text · copy button text
 * --color-text-disabled   #b2b8c1   ghost/disabled text
 */

"use client"

import * as React from "react"
import { Search, X, Calendar, Copy, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input, type InputProps } from "@/components/ui/input"

// ─── Types ────────────────────────────────────────────────────────────────────

export type InputFieldType = "name" | "company" | "amount" | "date" | "copy"
export type InputFieldSize = "sm" | "md"

export interface InputFieldProps extends Omit<InputProps, "type"> {
  // ── Content ──────────────────────────────────────────────────────────────
  label?: string
  hint?: string

  // ── Type (Figma "Type" prop) ─────────────────────────────────────────────
  fieldType?: InputFieldType

  // ── HTML input type ───────────────────────────────────────────────────────
  type?: string

  // ── Size ──────────────────────────────────────────────────────────────────
  fieldSize?: InputFieldSize

  // ── Error ─────────────────────────────────────────────────────────────────
  error?: boolean
  errorMessage?: string

  // ── Ghost state (Figma: bg-surface-subtle, border-darker, text-disabled) ──
  ghost?: boolean

  // ── name type ─────────────────────────────────────────────────────────────
  /** Show the trailing ChevronDown icon (Figma name type with dropdown) */
  showChevron?: boolean

  // ── amount type ───────────────────────────────────────────────────────────
  currency?: string
  onCurrencyChange?: () => void

  // ── copy type ─────────────────────────────────────────────────────────────
  copyLabel?: string
  onCopy?: () => void

  // ── company type ──────────────────────────────────────────────────────────
  showClear?: boolean
  onClear?: () => void

  // ── date type ─────────────────────────────────────────────────────────────
  onCalendarClick?: () => void

  // ── Class overrides ───────────────────────────────────────────────────────
  wrapperClassName?: string
  containerClassName?: string
}

// ─── Padding map ──────────────────────────────────────────────────────────────

const PADDING: Record<InputFieldSize, string> = {
  sm: "px-[12px] py-[10px]",   // Figma: --spacing/12, --spacing/10
  md: "p-[12px]",              // Figma: --spacing/12 all sides
}

// ─── Outer container class builder ───────────────────────────────────────────
// `hasBorder` = false only for "copy" type (children own their borders)

function outerCn({
  isError,
  ghost,
  disabled,
  hasBorder,
  containerClassName,
}: {
  isError: boolean
  ghost?: boolean
  disabled?: boolean
  hasBorder: boolean
  containerClassName?: string
}) {
  return cn(
    "flex items-stretch w-full rounded-[6px]",
    // overflow-hidden clips inner panels to the outer radius for single-border types.
    // copy type owns its own child borders — do NOT clip or it masks the right panel.
    hasBorder && "overflow-hidden",
    // Smooth border-color + ring transition on focus / error state change
    "transition-[border-color,box-shadow] duration-150 ease-in-out",

    // ── Ghost state (Figma: bg-surface-subtle + border-darker + Shadow/xs) ──
    ghost && [
      "bg-[--color-surface-subtle]",
      "border border-[--color-border-darker]",
      "shadow-[0_1px_2px_0_#1018280d]",
    ],

    // ── Default (non-ghost, with full outer border) ───────────────────────
    !ghost && hasBorder && [
      "bg-white",
      "border border-[--color-border-default]",
      "shadow-[0_1px_2px_0_#1018280d]",
      // Focus: Salem/300 border + Salem/100 ring
      "focus-within:border-[--cater-salem-300]",
      "focus-within:shadow-[0_0_0_2px_#ceecda]",
    ],

    // ── Default (non-ghost, no outer border — copy type) ─────────────────
    !ghost && !hasBorder && [
      "shadow-[0_1px_2px_0_#1018280d]",
      "focus-within:shadow-[0_0_0_2px_#ceecda]",
    ],

    // ── Error override (border + focus ring) ─────────────────────────────
    isError && !ghost && hasBorder && [
      "border-[--color-error-border]",
      "focus-within:border-[--color-error-border]",
      "focus-within:shadow-[0_0_0_2px_#ffdcdc]",
    ],
    isError && !ghost && !hasBorder && "focus-within:shadow-[0_0_0_2px_#ffdcdc]",

    // ── Disabled ─────────────────────────────────────────────────────────
    disabled && !ghost && hasBorder && [
      "bg-[--color-surface-disabled]",
      "border-[--color-border-disabled]",
      "shadow-none cursor-not-allowed",
    ],

    containerClassName
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

function InputField({
  label,
  hint,
  fieldType = "name",
  type,
  fieldSize = "md",
  error = false,
  errorMessage,
  ghost = false,
  // name
  showChevron = false,
  // amount
  currency = "USD",
  onCurrencyChange,
  // copy
  copyLabel = "Copy",
  onCopy,
  // company
  showClear = false,
  onClear,
  // date
  onCalendarClick,
  // overrides
  wrapperClassName,
  containerClassName,
  className,
  id,
  disabled,
  ...inputProps
}: InputFieldProps) {
  const inputId = id ?? React.useId()
  const hintId  = `${inputId}-hint`
  const isError = error || !!errorMessage
  const displayHint = isError ? (errorMessage ?? hint) : hint
  const padding = PADDING[fieldSize]

  // ── Icon colour ─────────────────────────────────────────────────────────
  // Normal:         text-muted-foreground  = #68707c  (Color/Text/Subtitle)
  // Ghost/Disabled: #b2b8c1               = Color/Text/Disabled
  // Using text-muted-foreground (shadcn @theme utility) for normal state so
  // SVG currentColor resolves reliably — avoids CSS-var shorthand on SVGs.
  const iconCn = cn(
    "shrink-0 size-[20px]",
    ghost || disabled ? "text-[#b2b8c1]" : "text-muted-foreground"
  )

  // ── Input extra className for ghost (force disabled text colour) ─────────
  const inputCn = cn(
    className,
    ghost && "text-[#b2b8c1] placeholder:text-[#b2b8c1] [&:not(:placeholder-shown)]:text-[#b2b8c1]"
  )

  // ── Shared input props ───────────────────────────────────────────────────
  const sharedInput = {
    id: inputId,
    disabled,
    type,
    "aria-invalid": isError || undefined,
    "aria-describedby": displayHint ? hintId : undefined,
    className: inputCn,
    ...inputProps,
  } as const

  // ─── Container per type ─────────────────────────────────────────────────

  let container: React.ReactNode

  // ── name ─────────────────────────────────────────────────────────────────
  if (fieldType === "name") {
    container = (
      <div className={outerCn({ isError, ghost, disabled, hasBorder: true, containerClassName })}>
        <div className={cn("flex flex-1 items-center gap-[8px]", padding)}>
          <Input {...sharedInput} />
          {showChevron && <ChevronDown className={iconCn} />}
        </div>
      </div>
    )
  }

  // ── company — 🔍 search icon + input + × clear ────────────────────────
  else if (fieldType === "company") {
    container = (
      <div className={outerCn({ isError, ghost, disabled, hasBorder: true, containerClassName })}>
        <div className={cn("flex flex-1 items-center gap-[8px]", padding)}>
          <Search className={iconCn} />
          <Input {...sharedInput} />
          {showClear && (
            <button
              type="button"
              onClick={onClear}
              disabled={disabled}
              aria-label="Clear"
              className="shrink-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X className={iconCn} />
            </button>
          )}
        </div>
      </div>
    )
  }

  // ── date — input + 📅 calendar ───────────────────────────────────────────
  else if (fieldType === "date") {
    container = (
      <div className={outerCn({ isError, ghost, disabled, hasBorder: true, containerClassName })}>
        <div className={cn("flex flex-1 items-center gap-[8px]", padding)}>
          <Input {...sharedInput} />
          <button
            type="button"
            onClick={onCalendarClick}
            disabled={disabled}
            aria-label="Open calendar"
            className="shrink-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Calendar className={iconCn} />
          </button>
        </div>
      </div>
    )
  }

  // ── amount — input | currency selector ───────────────────────────────────
  // Outer border wraps both panels; right panel = Surface/Disabled bg
  else if (fieldType === "amount") {
    container = (
      <div className={outerCn({ isError, ghost, disabled, hasBorder: true, containerClassName })}>
        {/* Left: amount input */}
        <div className={cn("flex flex-1 items-center min-w-0", padding)}>
          <Input {...sharedInput} inputMode="decimal" />
        </div>
        {/* Right: currency selector — Surface/Disabled bg (#f1f2f5) */}
        <button
          type="button"
          onClick={onCurrencyChange}
          disabled={disabled}
          aria-label="Change currency"
          className={cn(
            "flex items-center gap-[8px] shrink-0",
            "border-l border-[--color-border-default]",
            ghost
              ? "bg-[--color-surface-subtle]"
              : "bg-[--color-surface-disabled]",
            disabled && "cursor-not-allowed opacity-50",
            padding
          )}
        >
          <span className={cn(
            "font-[family-name:var(--font-body)] text-[16px] font-semibold leading-[1.5] whitespace-nowrap",
            ghost || disabled ? "text-[#b2b8c1]" : "text-muted-foreground"
          )}>
            {currency}
          </span>
          <ChevronDown className={iconCn} />
        </button>
      </div>
    )
  }

  // ── copy — input | 📋 Copy button ────────────────────────────────────────
  // Each section owns its own border (no single outer border)
  else if (fieldType === "copy") {
    // Left section border: error or default
    const leftBorder = isError && !ghost
      ? "border-l border-t border-b border-[--color-error-border]"
      : "border-l border-t border-b border-[--color-border-default]"

    // Right section border: error or default
    const rightBorder = isError && !ghost
      ? "border border-[--color-error-border]"
      : "border border-[--color-border-default]"

    container = (
      <div className={cn(outerCn({ isError, ghost, disabled, hasBorder: false, containerClassName }), "isolate")}>
        {/* Left: input with 3-sided border */}
        <div className={cn(
          "flex flex-1 items-center min-w-0 z-[2]",
          !ghost && ["bg-white", leftBorder, "rounded-l-[3px]"],
          ghost && "bg-[--color-surface-subtle]",
          disabled && !ghost && "bg-[--color-surface-disabled] border-[--color-border-disabled]",
          padding
        )}>
          <Input {...sharedInput} />
        </div>
        {/* Right: copy button — Surface/Subtle bg (#fafbfc) */}
        <button
          type="button"
          onClick={onCopy}
          disabled={disabled}
          className={cn(
            "flex items-center gap-[8px] shrink-0 z-[1]",
            !ghost && ["bg-[--color-surface-subtle]", rightBorder, "rounded-r-[3px]"],
            ghost && "bg-[--color-surface-subtle]",
            disabled && "cursor-not-allowed opacity-50",
            padding
          )}
        >
          <Copy className={cn(
            "shrink-0 size-[20px]",
            // Copy button uses Color/Text/Body (#29344a) per Figma — darker than subtitle
            ghost || disabled ? "text-[#b2b8c1]" : "text-[#29344a]"
          )} />
          <span className={cn(
            "font-[family-name:var(--font-body)] text-[16px] font-semibold leading-[1.5] whitespace-nowrap",
            ghost || disabled ? "text-[#b2b8c1]" : "text-[#29344a]"
          )}>
            {copyLabel}
          </span>
        </button>
      </div>
    )
  }

  // ─── Final render ────────────────────────────────────────────────────────

  return (
    <div className={cn("flex flex-col gap-[8px] w-full", wrapperClassName)}>
      {/* Label — Subtitle2/Regular: Inter 14px/500, #68707c */}
      {label && <Label htmlFor={inputId}>{label}</Label>}

      {/* Input container */}
      {container}

      {/* Hint / Error text — Subtitle2/Light: Inter 14px/400 */}
      {displayHint && (
        <p
          id={hintId}
          className={cn(
            "font-[family-name:var(--font-body)] text-[14px] font-normal leading-[1.5]",
            isError
              ? "text-[#6b0100]"         // Color/Error/Text-subtle
              : "text-muted-foreground"  // Color/Text/Subtitle #68707c
          )}
        >
          {displayHint}
        </p>
      )}
    </div>
  )
}

export { InputField }

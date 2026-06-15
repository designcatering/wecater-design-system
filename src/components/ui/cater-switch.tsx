/**
 * Cater Switch — two-state toggle control.
 *
 * Figma: https://www.figma.com/design/tK5SjqGRgeVr5w5tmxuLDa/Cater-Design-System?node-id=129-357
 *
 * ─── Anatomy ──────────────────────────────────────────────────────────────────
 * [track  ○ ]   off  — thumb left, grey track
 * [ ●✓ track]   on   — thumb right, green track, tick icon in thumb
 *
 * ─── Sizes ────────────────────────────────────────────────────────────────────
 * sm   32 × 20 px   thumb 16 px   padding 2 px
 * md   38 × 24 px   thumb 19 px   padding 2.4 px
 *
 * ─── States ───────────────────────────────────────────────────────────────────
 * Default   interactive <button>
 * Hover     slightly darker track
 * Pressed   focus ring (#ceecda Salem-100)
 * Disabled  rendered as <div>, muted grey track, no pointer
 *
 * ─── Design tokens ────────────────────────────────────────────────────────────
 * Track Off Default   #d9dde4
 * Track Off Hover     #d0d5dd
 * Track On  Default   #073d30  (Sherwood Green)
 * Track On  Hover     #067e39  (Salem 700)
 * Track Disabled      #f1f2f5
 * Thumb               #ffffff
 * Tick (enabled)      #073d30
 * Tick (disabled)     #b2b8c1
 * Focus ring          #ceecda  (Salem 100)
 */

"use client"

import * as React from "react"
import { RiCheckLine } from "@remixicon/react"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export type SwitchSize = "sm" | "md"

export interface CaterSwitchProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  checked?:         boolean
  defaultChecked?:  boolean
  onCheckedChange?: (checked: boolean) => void
  size?:            SwitchSize
  disabled?:        boolean
}

// ─── Size config ──────────────────────────────────────────────────────────────

const SIZE_CONFIG: Record<SwitchSize, {
  trackW:      number
  trackH:      number
  pad:         number
  thumb:       number
  icon:        number
  focusSpread: number
  travel:      number
}> = {
  sm: { trackW: 32,   trackH: 20,  pad: 2,   thumb: 16,   icon: 10, focusSpread: 2,   travel: 12   },
  md: { trackW: 38.4, trackH: 24,  pad: 2.4, thumb: 19.2, icon: 12, focusSpread: 2.4, travel: 14.4 },
}

// ─── Track colors ─────────────────────────────────────────────────────────────

const TRACK: Record<"off" | "on", Record<"default" | "hover" | "pressed" | "disabled", string>> = {
  off: { default: "#d9dde4", hover: "#d0d5dd", pressed: "#d9dde4", disabled: "#f1f2f5" },
  on:  { default: "#073d30", hover: "#067e39", pressed: "#073d30", disabled: "#f1f2f5" },
}

// ─── Component ────────────────────────────────────────────────────────────────

const CaterSwitch = React.forwardRef<HTMLElement, CaterSwitchProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      size = "sm",
      disabled = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked)
    const checked = controlledChecked !== undefined ? controlledChecked : internalChecked

    const [hovered, setHovered] = React.useState(false)
    const [pressed, setPressed] = React.useState(false)

    const s = SIZE_CONFIG[size]
    const key = checked ? "on" : "off"

    const trackColor = (() => {
      if (disabled) return TRACK[key].disabled
      if (pressed)  return TRACK[key].pressed
      if (hovered)  return TRACK[key].hover
      return TRACK[key].default
    })()

    const focusRing = pressed && !disabled
      ? `0 0 0 ${s.focusSpread}px #ceecda`
      : undefined

    const handleClick = () => {
      if (disabled) return
      const next = !checked
      setInternalChecked(next)
      onCheckedChange?.(next)
    }

    const Tag = disabled ? "div" : "button"

    return (
      <Tag
        ref={ref as React.Ref<HTMLButtonElement> & React.Ref<HTMLDivElement>}
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (!disabled && (e.key === " " || e.key === "Enter")) {
            e.preventDefault()
            handleClick()
          }
        }}
        onMouseEnter={() => !disabled && setHovered(true)}
        onMouseLeave={() => { setHovered(false); setPressed(false) }}
        onMouseDown={() => !disabled && setPressed(true)}
        onMouseUp={() => setPressed(false)}
        className={cn("flex items-center overflow-hidden relative shrink-0", className)}
        style={{
          width:           s.trackW,
          height:          s.trackH,
          borderRadius:    999,
          padding:         s.pad,
          backgroundColor: trackColor,
          boxShadow:       focusRing,
          border:          "none",
          cursor:          disabled ? "not-allowed" : "pointer",
          transition:      "background-color 150ms ease, box-shadow 150ms ease",
          outline:         "none",
          ...style,
        }}
        {...props}
      >
        {/* Thumb — slides via marginLeft transition */}
        <div
          style={{
            width:           s.thumb,
            height:          s.thumb,
            borderRadius:    "50%",
            backgroundColor: "#ffffff",
            flexShrink:      0,
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            overflow:        "hidden",
            marginLeft:      checked ? s.travel : 0,
            transition:      "margin-left 150ms ease",
          }}
        >
          {checked && (
            <RiCheckLine
              aria-hidden="true"
              style={{
                width:    s.icon,
                height:   s.icon,
                color:    disabled ? "#b2b8c1" : "#073d30",
                flexShrink: 0,
              }}
            />
          )}
        </div>
      </Tag>
    )
  }
)

CaterSwitch.displayName = "CaterSwitch"

export { CaterSwitch }

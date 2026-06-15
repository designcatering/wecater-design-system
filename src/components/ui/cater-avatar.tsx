/**
 * Cater Avatar — circular user identity element for the WeCater marketplace.
 *
 * Figma: https://www.figma.com/design/tK5SjqGRgeVr5w5tmxuLDa/Cater-Design-System?node-id=5428-14868
 *
 * ─── Anatomy ──────────────────────────────────────────────────────────────────
 * <div> circular container, overflow-hidden, rounded-full
 *   ├── type="icon"     → user silhouette icon, shifted down to crop shoulders
 *   └── type="initials" → centered uppercase letter(s), Inter font
 *
 * ─── Props ────────────────────────────────────────────────────────────────────
 * size     16 | 24 | 32 | 40 | 48 | 64   (px, default 40)
 * color    "no-color" | "withcolor"        (default "no-color")
 * type     "icon" | "initials"            (default "icon")
 * initials string                         (shown when type="initials")
 *
 * ─── Color tokens ─────────────────────────────────────────────────────────────
 * no-color  bg: #d9dde4 (--color-border-default)   text/icon: #68707c (subtitle)
 * withcolor bg: #ccf8b9 (--cater-gossip)            text/icon: #073d30 (Sherwood)
 *
 * ─── Initials font scale (Figma) ──────────────────────────────────────────────
 * 16px → 10px · 24px → 13px · 32px → 16px · 40px → 20px · 48px → 28px · 64px → 36px
 */

"use client"

import * as React from "react"
import { RiUser3Fill } from "@remixicon/react"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export type AvatarSize    = "16" | "24" | "32" | "40" | "48" | "64"
export type AvatarColor   = "no-color" | "withcolor"
export type AvatarType    = "icon" | "initials"

export interface CaterAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?:     AvatarSize
  color?:    AvatarColor
  type?:     AvatarType
  /** Uppercase initials rendered when type="initials" (1–2 characters recommended) */
  initials?: string
}

// ─── Static lookup tables ─────────────────────────────────────────────────────

/** Container px dimensions */
const CONTAINER_SIZE: Record<AvatarSize, string> = {
  "16": "size-[16px]",
  "24": "size-[24px]",
  "32": "size-[32px]",
  "40": "size-[40px]",
  "48": "size-[48px]",
  "64": "size-[64px]",
}

/**
 * Initials typography — matches Figma's per-size font scale.
 * 16 → Footnote/Light, 24 → Caption/Light, 32+ → Subtitle/Light scaled.
 */
const INITIALS_TEXT: Record<AvatarSize, string> = {
  "16": "text-[10px] tracking-[0.3px]  leading-[1.2]",
  "24": "text-[13px] tracking-[-0.13px] leading-[1.5]",
  "32": "text-[16px] tracking-[0.16px]  leading-[1.5]",
  "40": "text-[20px] tracking-[0.2px]   leading-[1.5]",
  "48": "text-[28px] tracking-[0.28px]  leading-[1.5]",
  "64": "text-[36px] tracking-[0.36px]  leading-[1.5]",
}

/**
 * Icon sizing — inner icon is ~90% of container, shifted down so the
 * shoulders clip at the circle edge (Figma's profile-picture crop).
 */
const ICON_CONFIG: Record<AvatarSize, { size: string; top: string }> = {
  "16": { size: "size-[15px]",  top: "top-[3px]"  },
  "24": { size: "size-[22px]",  top: "top-[6px]"  },
  "32": { size: "size-[29px]",  top: "top-[8px]"  },
  "40": { size: "size-[38px]",  top: "top-[11px]" },
  "48": { size: "size-[46px]",  top: "top-[13px]" },
  "64": { size: "size-[62px]",  top: "top-[16px]" },
}

/** Background colours — inline styles bypass Tailwind scan unreliability */
const BG_COLOR: Record<AvatarColor, string> = {
  "no-color":  "#d9dde4",
  "withcolor": "#ccf8b9",
}

/** Text / icon foreground colours */
const FG_COLOR: Record<AvatarColor, string> = {
  "no-color":  "#68707c",
  "withcolor": "#073d30",
}

// ─── Component ───────────────────────────────────────────────────────────────

const CaterAvatar = React.forwardRef<HTMLDivElement, CaterAvatarProps>(
  (
    {
      size     = "40",
      color    = "no-color",
      type     = "icon",
      initials = "M",
      className,
      style,
      ...props
    },
    ref
  ) => {
    const icon   = ICON_CONFIG[size]
    const fgColor = FG_COLOR[color]

    return (
      <div
        ref={ref}
        aria-label={type === "initials" ? initials : "User avatar"}
        className={cn(
          "relative overflow-hidden rounded-full shrink-0 select-none",
          CONTAINER_SIZE[size],
          className
        )}
        style={{ backgroundColor: BG_COLOR[color], ...style }}
        {...props}
      >
        {/* ── Icon type ─────────────────────────────────────────────────── */}
        {type === "icon" && (
          <RiUser3Fill
            aria-hidden="true"
            className={cn(
              "absolute left-1/2 -translate-x-1/2",
              icon.size,
              icon.top
            )}
            style={{ color: fgColor }}
          />
        )}

        {/* ── Initials type ─────────────────────────────────────────────── */}
        {type === "initials" && (
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              "font-[family-name:var(--font-body)] font-normal not-italic uppercase",
              INITIALS_TEXT[size]
            )}
            style={{ color: fgColor }}
          >
            {initials}
          </span>
        )}
      </div>
    )
  }
)

CaterAvatar.displayName = "CaterAvatar"

export { CaterAvatar }

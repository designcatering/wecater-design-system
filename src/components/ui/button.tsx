/**
 * Cater Button — shadcn component, skinned with Cater design tokens.
 *
 * This is the OFFICIAL shadcn button (@base-ui/react/button + cva).
 * Cater tokens are applied by overriding the styles inside each variant.
 * `tertiary-grey` and `iconPosition` are Cater-specific extensions.
 *
 * Figma: https://www.figma.com/design/tK5SjqGRgeVr5w5tmxuLDa/Cater-Design-System?node-id=20-3394
 *
 * shadcn variant  →  Figma Type
 * ──────────────────────────────
 * default         →  Primary        (#073d30 Sherwood Green)
 * destructive     →  Destructive    (#c22d2c Brand Red E)
 * outline         →  Outline        (transparent + border)
 * secondary       →  Secondary Color (#e6f5ed Salem/50)
 * ghost           →  Ghost          (transparent, no border)
 * tertiary-grey   →  Tertiary Grey  (#f1f2f5 Mirage/100) ← Cater extension
 *
 * shadcn size  →  Figma Size  →  Height
 * ────────────────────────────────────────
 * sm           →  Small        →  35px
 * default      →  Medium       →  42px
 * lg           →  Large        →  58px
 * icon-sm      →  alone/Small  →  35×35px
 * icon         →  alone/Medium →  42×42px
 * icon-lg      →  alone/Large  →  52×52px
 */

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ─── shadcn buttonVariants — Cater-skinned ───────────────────────────────────

const buttonVariants = cva(
  // ── Base (shadcn pattern, Cater values) ──
  [
    "inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap",
    // Shape: Figma uses Spacing/999 (9999px) = full pill
    "rounded-full",
    "border border-transparent",
    // Typography: Inter Semi Bold (Subtitle2/Medium & Subtitle/Medium)
    "font-semibold font-[family-name:var(--font-body)]",
    "transition-all duration-150 ease-in-out",
    "outline-none select-none cursor-pointer",
    // Focus ring — Figma: Button/pressed/shadow
    // 2px white inner + 4px Salem/100 (#ceecda) outer
    "focus-visible:shadow-[0_0_0_2px_#ffffff,0_0_0_4px_#ceecda]",
    // Disabled — uniform across all types per Figma spec
    "disabled:pointer-events-none disabled:bg-[#f1f2f5] disabled:text-[#b2b8c1] disabled:border-transparent disabled:shadow-none",
    // Icons
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        // Primary — Sherwood Green, hover: Chelsea Gem 700
        default: [
          "bg-primary text-primary-foreground",
          "hover:bg-[--cater-green-700]",
          "active:bg-[--cater-green-900]",
        ],
        // Destructive — Brand Red E
        destructive: [
          "bg-destructive text-white",
          "hover:bg-[#a82524]",
          "active:bg-[#8c1c1b]",
        ],
        // Outline — transparent + Border/Default
        outline: [
          "bg-transparent text-foreground border-border",
          "hover:bg-muted hover:border-[--color-border-darker]",
          "active:bg-[#e8eaed]",
        ],
        // Secondary Color — Salem/50 bg, Color/Text/Title text
        // Figma: bg var(--salem/salem-50, #e6f5ed) · text #1d2532 (≈ Color/Text/Title) · Shadow/xs
        secondary: [
          "bg-[--cater-salem-50] text-[--color-text-title]",
          "shadow-[0px_1px_1px_rgba(16,24,40,0.05)]",
          "hover:bg-[--cater-salem-100]",
          "active:bg-[#baf1d6]",
        ],
        // Ghost — no bg, no border
        ghost: [
          "bg-transparent text-foreground",
          "hover:bg-muted",
          "active:bg-[#e8eaed]",
        ],
        // Tertiary Grey — Color/Surface/Disabled bg, Color/Text/Title text
        // Figma: bg var(--color/surface/disabled, #f1f2f5) · text var(--color/text/title, #101828) · Shadow/xs
        "tertiary-grey": [
          "bg-[--color-surface-disabled] text-[--color-text-title]",
          "shadow-[0px_1px_1px_rgba(16,24,40,0.05)]",
          "hover:bg-[--cater-mirage-300]",
          "active:bg-[--cater-mirage-400]",
        ],
      },

      size: {
        // Small — 35px, Inter 14px
        sm: "h-[35px] px-3 text-[14px] leading-[1.5]",
        // Medium (default) — 42px, Inter 14px
        default: "h-[42px] px-4 text-[14px] leading-[1.5]",
        // Large — 58px, Inter 16px (Subtitle/Medium)
        lg: "h-[58px] px-5 text-[16px] leading-[1.5]",
        // Icon-only sizes — Figma "alone"
        "icon-sm": "size-[35px] p-0",
        icon:      "size-[42px] p-0",
        "icon-lg": "size-[52px] p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// ─── Cater icon-position extension ───────────────────────────────────────────

/** Figma "Icon" prop — controls where the icon renders relative to the label */
export type IconPosition = "none" | "left" | "right" | "alone"

export interface ButtonProps
  extends Omit<ButtonPrimitive.Props, "children">,
    VariantProps<typeof buttonVariants> {
  /** Figma "Icon" — none | left | right | alone */
  iconPosition?: IconPosition
  /** Icon element (required when iconPosition !== "none") */
  icon?: React.ReactNode
  children?: React.ReactNode
}

// ─── Component ────────────────────────────────────────────────────────────────

function Button({
  className,
  variant,
  size,
  iconPosition = "none",
  icon,
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {iconPosition === "left"  && icon && <span className="shrink-0">{icon}</span>}
      {iconPosition !== "alone" && children && <span>{children}</span>}
      {iconPosition === "right" && icon && <span className="shrink-0">{icon}</span>}
      {iconPosition === "alone" && icon && <span className="shrink-0">{icon}</span>}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }

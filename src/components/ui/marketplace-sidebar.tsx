/**
 * Cater MarketplaceSidebar — left navigation sidebar for the WeCater marketplace.
 *
 * Figma: https://www.figma.com/design/tK5SjqGRgeVr5w5tmxuLDa/Cater-Design-System?node-id=3969-7373
 *
 * ─── Anatomy ──────────────────────────────────────────────────────────────────
 * <aside> 206px wide, full height, bg #fafbfc, border-right 1px #f1f2f5
 *   ┌─ Top section (scrollable, p-[16px], gap-[4px]) ─────────────────────────┐
 *   │  Explore / Restaurants / Favorite / Cart / Orders / Messages / See more  │
 *   └─────────────────────────────────────────────────────────────────────────┘
 *   ┌─ Bottom section (pinned, p-[16px], gap-[4px]) ──────────────────────────┐
 *   │  Rewards / Account                                                        │
 *   └─────────────────────────────────────────────────────────────────────────┘
 *
 * ─── Nav item states (CVA) ────────────────────────────────────────────────────
 * default  →  transparent bg · rounded-full · line icon · #101828 text
 *             hover: --color-surface-disabled (#f1f2f5) — token-mapped
 *
 * active   →  #ccf8b9 (cater-gossip) bg · fill icon · #063126 text
 * muted    →  rgba(217,221,228,0.5) bg · fill icon · #101828 text
 *             Used for "See more" + "Account" when active
 *
 * ─── Animation ────────────────────────────────────────────────────────────────
 * Per-item background-color + color transition: 200ms ease-in-out.
 * Background sits directly on each item — perfect icon/text alignment always.
 *
 * ─── Design tokens ────────────────────────────────────────────────────────────
 * --color-surface-subtle    #fafbfc  sidebar bg
 * --color-border-disabled   #f1f2f5  right border
 * --color-surface-disabled  #f1f2f5  hover bg  ← token-mapped
 * cater-gossip              #ccf8b9  active bg
 * cater-green-900           #063126  active text
 * cater-mirage-900          #101828  default / muted text
 * rgba(217,221,228,0.5)             muted active bg
 */

"use client"

import * as React from "react"
import {
  RiHomeSmile2Line,
  RiHomeSmile2Fill,
  RiRestaurantLine,
  RiRestaurantFill,
  RiHeart2Line,
  RiHeart2Fill,
  RiShoppingBasket2Line,
  RiShoppingBasket2Fill,
  RiServiceBellLine,
  RiServiceBellFill,
  RiChat1Line,
  RiChat1Fill,
  RiGiftLine,
  RiGiftFill,
  RiUserHeartLine,
  RiUserHeartFill,
  RiArrowDownSLine,
} from "@remixicon/react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export type SidebarSection =
  | "Explore"
  | "Restaurants"
  | "Favorite"
  | "Cart"
  | "Orders"
  | "Messages"
  | "See more"
  | "Rewards"
  | "Account"

export interface MarketplaceSidebarProps extends React.HTMLAttributes<HTMLElement> {
  activeSection?: SidebarSection
  onSectionChange?: (section: SidebarSection) => void
  onSeeMoreToggle?: () => void
}

// ─── CVA — navItemVariants ────────────────────────────────────────────────────
// rounded-full in the BASE — always a pill, no shape change between states.
// background-color and color animate smoothly at 200ms ease-in-out.

const navItemVariants = cva(
  [
    "flex w-full items-center rounded-full",
    "px-[20px] py-[10px]",
    "text-[14px] font-medium leading-[1.5]",
    "font-[family-name:var(--font-body)]",
    // Per-item colour transition — background sits directly on icon + text
    "transition-[background-color,color] duration-200 ease-in-out",
    "outline-none select-none",
    "focus-visible:ring-2 focus-visible:ring-[#ceecda] focus-visible:ring-offset-1",
  ],
  {
    variants: {
      state: {
        // DEFAULT — no bg · hover uses token --color-surface-disabled (#f1f2f5)
        default: [
          "bg-transparent text-[#101828] cursor-pointer",
          "hover:bg-[--color-surface-disabled]",
        ],
        // ACTIVE — gossip green bg · deep green text  (bg via inline style)
        active: [
          "text-[#063126] cursor-default",
        ],
        // MUTED ACTIVE — grey bg · dark text  (bg via inline style)
        // "See more" and "Account" active states
        muted: [
          "text-[#101828] cursor-default",
        ],
      },
    },
    defaultVariants: { state: "default" },
  }
)

// ─── Inline background styles ─────────────────────────────────────────────────
// Inline styles guarantee rendering regardless of Tailwind scan order.

const STATE_BG: Record<string, React.CSSProperties> = {
  default: {},
  active:  { backgroundColor: "#ccf8b9" },
  muted:   { backgroundColor: "rgba(217,221,228,0.5)" },
}

// ─── NavItem ──────────────────────────────────────────────────────────────────

interface NavItemProps extends VariantProps<typeof navItemVariants> {
  section: SidebarSection
  active?: boolean
  activeVariant?: "active" | "muted"
  onClick?: () => void
  iconLine?: React.ElementType
  iconFill?: React.ElementType
  showChevron?: boolean
  className?: string
}

function NavItem({
  section,
  active = false,
  activeVariant = "active",
  onClick,
  iconLine: IconLine,
  iconFill: IconFill,
  showChevron = false,
  className,
}: NavItemProps) {
  const resolvedState = active ? activeVariant : "default"
  const Icon = active && IconFill ? IconFill : IconLine

  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      className={cn(navItemVariants({ state: resolvedState }), className)}
      style={STATE_BG[resolvedState]}
    >
      {/* Standard item: [icon] [label] */}
      {!showChevron && (
        <>
          {Icon && (
            <Icon className="size-[24px] shrink-0" aria-hidden="true" />
          )}
          <span className={cn("min-w-0 flex-1 text-left", Icon ? "ml-[10px]" : "")}>
            {section}
          </span>
        </>
      )}

      {/* See more: [label] [chevron] — no left icon */}
      {showChevron && (
        <>
          <span className="min-w-0 flex-1 text-left">{section}</span>
          <RiArrowDownSLine
            className="ml-[4px] size-[20px] shrink-0"
            aria-hidden="true"
          />
        </>
      )}
    </button>
  )
}

// ─── Navigation config ────────────────────────────────────────────────────────

interface NavConfigItem {
  section: SidebarSection
  iconLine?: React.ElementType
  iconFill?: React.ElementType
  showChevron?: boolean
  activeVariant?: "active" | "muted"
}

const TOP_NAV: NavConfigItem[] = [
  { section: "Explore",     iconLine: RiHomeSmile2Line,      iconFill: RiHomeSmile2Fill },
  { section: "Restaurants", iconLine: RiRestaurantLine,      iconFill: RiRestaurantFill },
  { section: "Favorite",    iconLine: RiHeart2Line,          iconFill: RiHeart2Fill },
  { section: "Cart",        iconLine: RiShoppingBasket2Line, iconFill: RiShoppingBasket2Fill },
  { section: "Orders",      iconLine: RiServiceBellLine,     iconFill: RiServiceBellFill },
  { section: "Messages",    iconLine: RiChat1Line,           iconFill: RiChat1Fill },
  { section: "See more",    showChevron: true,               activeVariant: "muted" },
]

const BOTTOM_NAV: NavConfigItem[] = [
  { section: "Rewards", iconLine: RiGiftLine,      iconFill: RiGiftFill },
  { section: "Account", iconLine: RiUserHeartLine, iconFill: RiUserHeartFill, activeVariant: "muted" },
]

// ─── MarketplaceSidebar ───────────────────────────────────────────────────────

const MarketplaceSidebar = React.forwardRef<HTMLElement, MarketplaceSidebarProps>(
  (
    { activeSection, onSectionChange, onSeeMoreToggle, className, style, ...props },
    ref
  ) => {
    function handleChange(section: SidebarSection) {
      if (section === "See more") onSeeMoreToggle?.()
      onSectionChange?.(section)
    }

    const renderItems = (items: NavConfigItem[]) =>
      items.map((item) => (
        <NavItem
          key={item.section}
          section={item.section}
          active={activeSection === item.section}
          activeVariant={item.activeVariant ?? "active"}
          onClick={() => handleChange(item.section)}
          iconLine={item.iconLine}
          iconFill={item.iconFill}
          showChevron={item.showChevron}
        />
      ))

    return (
      <aside
        ref={ref}
        aria-label="Marketplace navigation"
        className={cn(
          "flex h-full w-[206px] shrink-0 flex-col",
          "font-[family-name:var(--font-body)]",
          className
        )}
        style={{
          backgroundColor: "#fafbfc",
          borderRight: "1px solid #f1f2f5",
          ...style,
        }}
        {...props}
      >
        {/* Top section — scrollable */}
        <nav
          className="flex flex-1 flex-col gap-[4px] overflow-y-auto p-[16px]"
          aria-label="Main navigation"
        >
          {renderItems(TOP_NAV)}
        </nav>

        {/* Bottom section — pinned */}
        <nav
          className="flex flex-col gap-[4px] p-[16px]"
          aria-label="Account navigation"
        >
          {renderItems(BOTTOM_NAV)}
        </nav>
      </aside>
    )
  }
)

MarketplaceSidebar.displayName = "MarketplaceSidebar"

export { MarketplaceSidebar }

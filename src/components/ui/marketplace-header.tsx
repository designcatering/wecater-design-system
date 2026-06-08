/**
 * Cater MarketplaceHeader — top navigation bar for the WeCater marketplace.
 *
 * Figma: https://www.figma.com/design/tK5SjqGRgeVr5w5tmxuLDa/Cater-Design-System?node-id=4772-34232
 *
 * ─── States ───────────────────────────────────────────────────────────────────
 * signed-out            →  No auth; heart + cart (empty/gossip); Login button
 * signed-in             →  Auth; chat + bell (no badge); heart; cart (filled/sherwood); avatar
 * signed-in-notified    →  Auth; chat + bell (red badge); heart; cart (filled/sherwood); avatar
 * signed-in-empty-cart  →  Auth; chat + bell (red badge); heart; cart (empty/gossip); avatar
 *
 * ─── Anatomy ──────────────────────────────────────────────────────────────────
 * [Logo] [Location pill · Search bar]   [Browse | Cater AI]   [Icons] [Auth]
 *
 * ─── Toggle animation ─────────────────────────────────────────────────────────
 * Sliding white pill — CSS translateX(87px), 200ms cubic-bezier ease.
 * Each tab is a fixed w-[87px], so the slide distance is exact and needs no
 * JS measurement.
 *
 * ─── Key Figma measurements ───────────────────────────────────────────────────
 * Header:          h-[60px]  px-[23px] (≈ px-6)
 * Logo → group:    gap-[32px]
 * Location → search: gap-[20px]
 * Location pill:   w-[197px] h-[36px] px-[12px] gap-[8px]  no border
 * Search bar:      w-[297px] h-[36px] px-[12px] gap-[8px]  (Figma 495px × 60 %)
 * Toggle tab:      w-[87px]  px-[8px] py-[4px]
 * Icon buttons:    size-[35px] p-[8px]  gap-[8px] between each
 * Cart:            h-[35px]  p-[8px]   gap-[2px]  count px-[4px]
 * Avatar:          size-[40px]  gap-[11px] from Button Group
 *
 * ─── Design tokens ────────────────────────────────────────────────────────────
 * #073d30  cater-green-800  Sherwood Green  (filled cart bg, avatar text, login btn)
 * #ccf8b9  cater-gossip     Gossip Green    (empty cart bg, login text)
 * #101828  cater-mirage-900 Dark / active-tab text
 * #68707c  cater-mirage-600 Subtitle / icons / placeholder
 * #f1f2f5  cater-mirage-100 Toggle bg / header border
 * #d9dde4  color-border-default  Search border
 * #c22d2c  cater-red-500    Notification badge
 *
 * ─── Responsive ───────────────────────────────────────────────────────────────
 * Desktop-only layout for now. Mobile/tablet responsiveness will be added in a
 * future iteration.
 */

"use client"

import * as React from "react"
import {
  RiMapPin2Line,
  RiArrowDownSLine,
  RiSearchLine,
  RiChat1Line,
  RiNotification3Line,
  RiHeartLine,
  RiShoppingBasket2Line,
  RiUserLine,
} from "@remixicon/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"

// ─── Types ────────────────────────────────────────────────────────────────────

export type MarketplaceHeaderState =
  | "signed-out"
  | "signed-in"
  | "signed-in-notified"
  | "signed-in-empty-cart"

export interface MarketplaceHeaderProps
  extends React.HTMLAttributes<HTMLElement> {
  state?: MarketplaceHeaderState
  location?: string
  searchPlaceholder?: string
  /**
   * Item count on the filled cart.
   * Ignored (shown as 0) when cart is in an empty visual state.
   */
  cartCount?: number
  notificationCount?: number
  userInitials?: string
  activeTab?: "browse" | "cater-ai"
  onTabChange?: (tab: "browse" | "cater-ai") => void
  onLocationClick?: () => void
  /** When provided the search input is read-only (acts as an overlay trigger). */
  onSearchClick?: () => void
  onChatClick?: () => void
  onNotificationsClick?: () => void
  onWishlistClick?: () => void
  onCartClick?: () => void
  onLoginClick?: () => void
  onProfileClick?: () => void
}

// ─── NavToggle ────────────────────────────────────────────────────────────────
// Animated sliding-pill segmented control.
// Both tabs are fixed w-[87px] so translateX(87px) is always an exact one-tab
// slide — no JS measurement needed.

function NavToggle({
  activeTab,
  onTabChange,
  className,
}: {
  activeTab: "browse" | "cater-ai"
  onTabChange?: (tab: "browse" | "cater-ai") => void
  className?: string
}) {
  return (
    <div
      role="tablist"
      aria-label="Navigation mode"
      className={cn(
        // Total width: 87 + 87 + 2 + 2 (padding) = 178px
        "relative inline-flex shrink-0 rounded-full p-[2px]",
        className
      )}
      style={{ backgroundColor: "#f1f2f5" }}
    >
      {/* Sliding white pill — starts at left=2px, width=87px */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute bottom-[2px] left-[2px] top-[2px]",
          "w-[87px] rounded-full bg-white",
          "shadow-[0_1px_2px_0_rgba(16,24,40,0.06)]",
          "transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]"
        )}
        style={{
          transform: activeTab === "cater-ai" ? "translateX(87px)" : "translateX(0)",
        }}
      />

      {/* Browse */}
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === "browse"}
        onClick={() => onTabChange?.("browse")}
        className={cn(
          "relative z-10 w-[87px] rounded-full text-center",
          "px-[8px] py-[4px] text-[14px] font-medium leading-[1.5] whitespace-nowrap",
          "cursor-pointer transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ceecda] focus-visible:ring-offset-1"
        )}
        style={{ color: activeTab === "browse" ? "#101828" : "#68707c" }}
      >
        Browse
      </button>

      {/* Cater AI */}
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === "cater-ai"}
        onClick={() => onTabChange?.("cater-ai")}
        className={cn(
          "relative z-10 w-[87px] rounded-full text-center",
          "px-[8px] py-[4px] text-[14px] font-medium leading-[1.5] whitespace-nowrap",
          "cursor-pointer transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ceecda] focus-visible:ring-offset-1"
        )}
        style={{ color: activeTab === "cater-ai" ? "#101828" : "#68707c" }}
      >
        Cater AI
      </button>
    </div>
  )
}

// ─── IconBtn ──────────────────────────────────────────────────────────────────
// 35×35px circular icon button. Figma: p-[8px] rounded-full bg-white.

function IconBtn({
  onClick,
  children,
  label,
  className,
  badge,
}: {
  onClick?: () => void
  children: React.ReactNode
  label: string
  className?: string
  badge?: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "relative inline-flex size-[35px] shrink-0 items-center justify-center rounded-full",
        "cursor-pointer transition-opacity duration-150 hover:opacity-70",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ceecda] focus-visible:ring-offset-1",
        className
      )}
      style={{ backgroundColor: "#ffffff" }}
    >
      {children}
      {badge}
    </button>
  )
}

// ─── MarketplaceHeader ────────────────────────────────────────────────────────

const MarketplaceHeader = React.forwardRef<HTMLElement, MarketplaceHeaderProps>(
  (
    {
      state = "signed-out",
      location = "San Francisco, CA",
      searchPlaceholder = "Search by name, cuisine, restaurants, or area etc",
      cartCount = 0,
      notificationCount = 2,
      userInitials = "PS",
      activeTab = "browse",
      onTabChange,
      onLocationClick,
      onSearchClick,
      onChatClick,
      onNotificationsClick,
      onWishlistClick,
      onCartClick,
      onLoginClick,
      onProfileClick,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const isSignedIn    = state !== "signed-out"
    const hasNotif      = state === "signed-in-notified" || state === "signed-in-empty-cart"
    const cartIsEmpty   = state === "signed-out" || state === "signed-in-empty-cart"
    const cartBg        = cartIsEmpty ? "#ccf8b9" : "#073d30"
    const cartIconColor = cartIsEmpty ? "#073d30" : "#ccf8b9"
    const cartTextColor = cartIsEmpty ? "#073d30" : "#ccf8b9"
    const displayCount  = cartIsEmpty ? 0 : cartCount

    const notifBadge = hasNotif ? (
      <span
        className="absolute -right-0.5 -top-0.5 inline-flex min-w-[16px] items-center justify-center rounded-full px-[3px] text-[10px] font-semibold leading-[16px] text-white"
        style={{ backgroundColor: "#c22d2c" }}
        aria-label={`${notificationCount} notifications`}
      >
        {notificationCount}
      </span>
    ) : null

    return (
      <header
        ref={ref}
        className={cn(
          // Figma: h-[60px], px-[23px] ≈ px-6
          // No justify-between — left section is flex-1 so it fills remaining
          // space, which naturally pushes the toggle and right section to the right.
          "flex h-[60px] w-full shrink-0 items-center px-6",
          "font-[family-name:var(--font-body)]",
          className
        )}
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #f1f2f5",
          ...style,
        }}
        {...props}
      >
        {/* ══ LEFT — Logo + Location pill + Search bar ══════════════════════ */}
        {/* flex-1 fills all remaining space, pushing toggle + right rightward  */}
        <div className="flex flex-1 items-center gap-[32px]">
          <Logo size="sm" variant="default" className="shrink-0" />

          {/* Location + Search group — flex-1 + min-w-0 lets this group claim all
              remaining space after the logo, allowing the search to grow/shrink */}
          <div className="flex flex-1 min-w-0 items-center gap-[10px]">

            {/* Location pill — Figma: w-[197px] h-[36px] px-[12px] gap-[8px] no border */}
            <button
              type="button"
              aria-label="Change location"
              onClick={onLocationClick}
              className={cn(
                "inline-flex h-[36px] w-[197px] shrink-0 items-center gap-[8px] rounded-full px-[12px]",
                "whitespace-nowrap cursor-pointer transition-opacity duration-150 hover:opacity-70",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ceecda] focus-visible:ring-offset-1"
              )}
              style={{ backgroundColor: "#ffffff" }}
            >
              <RiMapPin2Line className="size-4 shrink-0" style={{ color: "#68707c" }} aria-hidden="true" />
              <span
                className="min-w-0 flex-1 truncate text-[14px] font-medium leading-[1.5]"
                style={{ color: "#68707c" }}
              >
                {location}
              </span>
              <RiArrowDownSLine className="size-4 shrink-0" style={{ color: "#68707c" }} aria-hidden="true" />
            </button>

            {/* Search bar — exact Figma spec
                h-[36px] px-[12px] gap-[8px] rounded-full
                border #d9dde4  shadow 0px_1px_1px rgba(16,24,40,0.05)
                Width: Figma 495px × 60% = 297px (user requested reduction) */}
            <div
              className={cn(
                // flex-1 grows into available space; max-w caps at Figma spec (297px);
                // min-w ensures the bar never collapses below 140px before truncating.
                "inline-flex h-[36px] flex-1 min-w-[140px] max-w-[297px] items-center gap-[8px]",
                "overflow-hidden rounded-full px-[12px]",
                // Focus ring matching design-system tokens
                "transition-[border-color,box-shadow] duration-150",
                "focus-within:border-[#9cd8b5] focus-within:shadow-[0_0_0_2px_#ceecda]"
              )}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #d9dde4",
                boxShadow: "0 1px 1px 0 rgba(16,24,40,0.05)",
              }}
            >
              <RiSearchLine
                className="size-4 shrink-0"
                style={{ color: "#68707c" }}
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder={searchPlaceholder}
                onClick={onSearchClick}
                readOnly={!!onSearchClick}
                className={cn(
                  "min-w-0 flex-1 truncate bg-transparent",
                  "text-[14px] font-medium leading-[1.5]",
                  "outline-none placeholder:font-medium placeholder:text-[#68707c]",
                  "focus:outline-none"
                )}
                style={{ color: "#101828" }}
                aria-label="Search"
              />
            </div>
          </div>
        </div>

        {/* ══ CENTRE — Browse / Cater AI animated toggle ════════════════════ */}
        <NavToggle activeTab={activeTab} onTabChange={onTabChange} className="ml-[15px]" />

        {/* ══ RIGHT — Icon buttons + Auth ═══════════════════════════════════ */}
        {/* ml-[40px] = exactly 40px gap from toggle right edge to here        */}
        {/* gap-[8px] between each icon button; avatar has extra ml-[3px]      */}
        <div className="ml-[40px] flex shrink-0 items-center gap-[8px]">

          {/* Chat — signed-in only */}
          {isSignedIn && (
            <IconBtn label="Chat" onClick={onChatClick}>
              <RiChat1Line className="size-[18px]" style={{ color: "#68707c" }} aria-hidden="true" />
            </IconBtn>
          )}

          {/* Bell — signed-in only, optional red notification badge */}
          {isSignedIn && (
            <IconBtn label="Notifications" onClick={onNotificationsClick} badge={notifBadge}>
              <RiNotification3Line className="size-[18px]" style={{ color: "#68707c" }} aria-hidden="true" />
            </IconBtn>
          )}

          {/* Wishlist / Heart — signed-out only */}
          {!isSignedIn && (
            <IconBtn label="Wishlist" onClick={onWishlistClick}>
              <RiHeartLine className="size-[18px]" style={{ color: "#68707c" }} aria-hidden="true" />
            </IconBtn>
          )}

          {/* Cart — Figma: h-[35px] p-[8px] gap-[2px], count text px-[4px] */}
          <button
            type="button"
            aria-label={`Cart, ${displayCount} item${displayCount !== 1 ? "s" : ""}`}
            onClick={onCartClick}
            className={cn(
              "inline-flex h-[35px] shrink-0 items-center gap-[2px] rounded-full p-[8px]",
              "cursor-pointer transition-opacity duration-150 hover:opacity-80",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ceecda] focus-visible:ring-offset-1"
            )}
            style={{ backgroundColor: cartBg }}
          >
            <RiShoppingBasket2Line className="size-[18px] shrink-0" style={{ color: cartIconColor }} aria-hidden="true" />
            <span className="px-[4px] text-[14px] font-semibold leading-[1.5]" style={{ color: cartTextColor }}>
              {displayCount}
            </span>
          </button>

          {/* Auth — Login button (signed-out) or Profile avatar (signed-in) */}
          {!isSignedIn ? (
            // variant="default" is already Sherwood green bg + Gossip text
            <Button
              variant="default"
              size="sm"
              iconPosition="left"
              icon={<RiUserLine aria-hidden="true" />}
              onClick={onLoginClick}
            >
              Login
            </Button>
          ) : (
            // ml-[3px]: gap-[8px] + 3px = 11px total gap, matching Figma spec
            <button
              type="button"
              aria-label={`Profile: ${userInitials}`}
              onClick={onProfileClick}
              className={cn(
                "ml-[3px] inline-flex size-[40px] shrink-0 items-center justify-center rounded-full",
                "text-[14px] font-semibold leading-[1]",
                "cursor-pointer transition-opacity duration-150 hover:opacity-80",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ceecda] focus-visible:ring-offset-1"
              )}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid rgba(217,221,228,0.5)",
                color: "#073d30",
              }}
            >
              {userInitials}
            </button>
          )}
        </div>
      </header>
    )
  }
)

MarketplaceHeader.displayName = "MarketplaceHeader"

export { MarketplaceHeader }

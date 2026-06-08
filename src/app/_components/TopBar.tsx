"use client"

import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"
import {
  RiMapPin2Line,
  RiArrowDownSLine,
  RiSearchLine,
  RiHeartLine,
  RiShoppingBag2Line,
  RiUserLine,
  RiGridLine,
  RiChat3Line,
  RiFileListLine,
} from "@remixicon/react"
import type { ViewMode } from "../page"

interface TopBarProps {
  view: ViewMode
  onViewChange: (v: ViewMode) => void
  cartCount?: number
  activeOrderCount?: number
  onCartOpen?: () => void
  onOrdersOpen?: () => void
}

export default function TopBar({ view, onViewChange, cartCount = 0, activeOrderCount = 0, onCartOpen, onOrdersOpen }: TopBarProps) {
  return (
    <header className="h-[60px] w-full bg-white border-b border-[#F1F2F5] shrink-0 z-50">
      <div className="h-full px-6 flex items-center justify-between gap-4">
        {/* Left: Logo + Location + Search */}
        <div className="flex items-center gap-8 min-w-0">
          <Logo size="sm" className="shrink-0" />

          <button className="flex items-center gap-1.5 text-sm text-[#68707C] hover:text-[#29344A] transition-colors whitespace-nowrap shrink-0">
            <RiMapPin2Line className="size-4" />
            <span>San Francisco, CA</span>
            <RiArrowDownSLine className="size-4" />
          </button>

          <div className="flex items-center gap-2 h-9 w-[440px] shrink-0 rounded-full border border-[#D9DDE4] bg-white px-3">
            <RiSearchLine className="size-4 text-[#68707C] shrink-0" />
            <input
              type="text"
              placeholder="Search by name, cuisine, restaurants, or area"
              className="flex-1 min-w-0 text-sm text-[#29344A] placeholder:text-[#68707C] bg-transparent outline-none"
            />
          </div>
        </div>

        {/* Right: View toggle + Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* View mode segmented control */}
          <div className="flex items-center p-0.5 bg-[#F1F2F5] rounded-full mr-1">
            {[
              { id: "browse"  as ViewMode, icon: RiGridLine,    label: "Browse" },
              { id: "chat"    as ViewMode, icon: RiChat3Line,   label: "Chat with AI" },
              { id: "orders"  as ViewMode, icon: RiFileListLine, label: "Orders", badge: activeOrderCount },
            ].map(({ id, icon: Icon, label, badge }) => (
              <button
                key={id}
                onClick={() => onViewChange(id)}
                className={[
                  "relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200",
                  view === id || (id === "orders" && view === "tracking")
                    ? "bg-white text-[#073D30] shadow-sm"
                    : "text-[#68707C] hover:text-[#29344A]",
                ].join(" ")}
              >
                <Icon className="size-3.5" />
                {label}
                {badge != null && badge > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 size-4 rounded-full bg-[#CA6100] text-white text-[9px] font-bold flex items-center justify-center">
                    {badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <Button variant="ghost" size="icon-sm">
            <RiHeartLine className="size-[18px]" />
          </Button>

          <div className="relative">
            <Button variant="secondary" size="icon-sm" onClick={onCartOpen}>
              <RiShoppingBag2Line className="size-[18px]" />
            </Button>
            <span
              className={[
                "absolute -top-1 -right-1 min-w-[16px] h-4 px-0.5 bg-[#073D30] text-[#CCF8B9] text-[10px] font-bold rounded-full flex items-center justify-center leading-none pointer-events-none transition-all duration-300",
                cartCount > 0 ? "scale-100 opacity-100" : "scale-75 opacity-60",
              ].join(" ")}
            >
              {cartCount}
            </span>
          </div>

          <Button size="sm" iconPosition="left" icon={<RiUserLine className="size-4" />}>
            Login
          </Button>
        </div>
      </div>
    </header>
  )
}

"use client"

import { useState, useRef, useEffect } from "react"
import {
  RiMicLine,
  RiSendPlaneFill,
  RiChat3Line,
  RiCloseLine,
  RiMagicLine,
  RiCoinLine,
  RiLayoutColumnLine,
  RiHome2Line,
  RiStore2Line,
  RiHeartLine,
  RiShoppingBag2Line,
  RiFileListLine,
  RiMessage2Line,
  RiGiftLine,
  RiUserHeartLine,
  RiArrowDownSLine,
  RiDeleteBinLine,
  RiAddLine,
  RiSubtractLine,
  RiGroupLine,
  RiCheckLine,
  RiSparklingLine,
} from "@remixicon/react"
import { Button } from "@/components/ui/button"
import type { CartItem } from "../page"
import QuoteModal from "./QuoteModal"

/* ─────────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────────── */

interface Customization {
  label: string
  value: string
}

interface MealItem {
  id: string
  name: string
  description: string
  priceEach: number
  quantity: number
  emoji: string
  bgColor: string
  customizations: Customization[]
  dietary: string
  bitesPer: number
}

type ChatMessage =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "ai"; type: "text"; text: string }
  | {
      id: string
      role: "ai"
      type: "meal-recommendation"
      intro: string
      sources: string[]
      forCount: number
    }
  | {
      id: string
      role: "ai"
      type: "restaurant-listing"
      intro: string
    }
  | {
      id: string
      role: "ai"
      type: "order-history"
      intro: string
    }

interface ChatViewProps {
  initialQuery?: string
  onCartAdd?: (item: CartItem) => void
  onRestaurantClick?: (name: string) => void
}

/* ─────────────────────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────────────────────── */

const PROMPT_CHIPS: { text: string; icon: string }[] = [
  { text: "Plan lunch for 50 people",       icon: "🍽️" },
  { text: "Show me restaurants near me",    icon: "🏪" },
  { text: "View my past orders",            icon: "📋" },
  { text: "Find vegetarian options",        icon: "🥗" },
  { text: "Dinner for 30 under $400",       icon: "💰" },
  { text: "Corporate breakfast for 100",    icon: "☕" },
]

const DEFAULT_MEAL_ITEMS: MealItem[] = [
  {
    id: "m1",
    name: "Power Bowl",
    description: "Build-your-own bowl with protein, base, and sauce",
    priceEach: 14.5,
    quantity: 8,
    emoji: "🥗",
    bgColor: "#073D30",
    customizations: [
      { label: "BASE", value: "Quinoa" },
      { label: "PROTEIN", value: "Chicken" },
      { label: "SAUCE", value: "Tzatziki" },
      { label: "TOPPINGS", value: "Cucumber +2" },
    ],
    dietary: "8 omnivores",
    bitesPer: 232,
  },
  {
    id: "m2",
    name: "Mediterranean Feast",
    description: "Slow-roasted lamb with fresh pita and mezze dips",
    priceEach: 23,
    quantity: 4,
    emoji: "🫓",
    bgColor: "#5a3000",
    customizations: [
      { label: "PROTEIN", value: "Lamb" },
      { label: "SAUCE", value: "Hummus" },
      { label: "SIDES", value: "Fattoush +1" },
    ],
    dietary: "3 vegetarians",
    bitesPer: 296,
  },
  {
    id: "m3",
    name: "Classic Caesar Salad",
    description: "Crisp romaine, housemade dressing, and herb croutons",
    priceEach: 12,
    quantity: 2,
    emoji: "🥬",
    bgColor: "#067E39",
    customizations: [
      { label: "PROTEIN", value: "None" },
      { label: "DRESSING", value: "Caesar" },
      { label: "TOPPINGS", value: "Croutons" },
    ],
    dietary: "2 vegans",
    bitesPer: 154,
  },
]

const DIETARY_TAGS = [
  { label: "1 vegan",       bg: "#CCF8B9", fg: "#063126" },
  { label: "3 vegetarian",  bg: "#D4F5ED", fg: "#073D30" },
  { label: "1 Organic",     bg: "#ceecda", fg: "#067e39" },
  { label: "2 Gluten free", bg: "#FFE4CC", fg: "#653000" },
  { label: "2 Nut free",    bg: "#FEE3FC", fg: "#8E2E84" },
]

/** Restaurant options shown only when the user asks for a listing */
const RESTAURANT_LISTING = [
  {
    name: "Barrio Queen", sub: "Upscale Mexican", location: "Downtown, LA · 20min",
    rating: 4.6, bites: "2x bites", bg: "#FED68D",
    action: "Add to Cart" as const, listed: true,
  },
  {
    name: "Assemble & Bake", sub: "Chilli Churros", location: "E Shea Blvd · 15min",
    rating: 4.6, bites: "2x bites", bg: "#D4F5ED",
    action: "Send Quote" as const, listed: false,
  },
]

/** Mock past orders for the order history view */
const PAST_ORDERS = [
  {
    ref: "WC-2026-1234",
    restaurant: "Barrio Queen",
    restaurantSub: "Upscale Mexican",
    restaurantBg: "#FED68D",
    date: "April 15, 2026",
    summary: ["Power Bowl ×8", "Caesar Salad ×4"],
    total: 186.5,
    bites: 2390,
    forCount: 12,
  },
  {
    ref: "WC-2026-1133",
    restaurant: "Urban Plates",
    restaurantSub: "California Cuisine",
    restaurantBg: "#D4F5ED",
    date: "March 28, 2026",
    summary: ["Mediterranean Feast ×6", "Garden Salad ×4"],
    total: 312.0,
    bites: 4004,
    forCount: 10,
  },
  {
    ref: "WC-2026-1089",
    restaurant: "Casa Latina",
    restaurantSub: "Latin Fusion",
    restaurantBg: "#fee3fc",
    date: "March 15, 2026",
    summary: ["Taco Bar ×10", "Churros Platter ×2"],
    total: 224.75,
    bites: 2889,
    forCount: 10,
  },
]

/** Contextual follow-up suggestions shown after a meal recommendation */
const FOLLOW_UP_SUGGESTIONS: {
  id: string
  text: string
  /** "insight" = AI-proactive (mint tint); "action" = quick command (plain) */
  kind: "insight" | "action"
}[] = [
  {
    id: "f1",
    text: "I noticed Marketing Team usually orders dessert. Add Baklava platter for $24?",
    kind: "insight",
  },
  {
    id: "f2",
    text: "Stay under $300 total",
    kind: "action",
  },
  {
    id: "f3",
    text: "Show me restaurant options",
    kind: "action",
  },
  {
    id: "f4",
    text: "Add a vegan option for the 2 vegans",
    kind: "insight",
  },
  {
    id: "f5",
    text: "Schedule delivery for 12:30 PM",
    kind: "action",
  },
]

/** Available choices per customisation label */
const CUSTOMIZATION_OPTIONS: Record<string, string[]> = {
  BASE:     ["Quinoa", "Brown Rice", "White Rice", "Mixed Greens", "Cauliflower Rice"],
  PROTEIN:  ["Chicken", "Beef", "Salmon", "Tofu", "Falafel", "None"],
  SAUCE:    ["Tzatziki", "Hummus", "Tahini", "Pesto", "Caesar"],
  TOPPINGS: ["Cucumber +2", "Tomato +1", "Olives +1", "Feta +1", "Avocado", "Roasted Peppers"],
  SIDES:    ["Fattoush +1", "Tabbouleh", "Pita Bread", "Greek Salad"],
  DRESSING: ["Caesar", "Ranch", "Balsamic", "Lemon Vinaigrette"],
}

/* ─────────────────────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────────────────── */

function getWelcomeDate() {
  const now = new Date()
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  const d = now.getDate()
  const suffix = d === 1 || d === 21 || d === 31 ? "st" : d === 2 || d === 22 ? "nd" : d === 3 || d === 23 ? "rd" : "th"
  return `It's ${days[now.getDay()]}, ${months[now.getMonth()]} ${d}${suffix}.`
}

function fmt(n: number) {
  return "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function buildDemoConversation(query: string): ChatMessage[] {
  return [
    { id: "u1", role: "user", text: query },
    {
      id: "a1",
      role: "ai",
      type: "text",
      text: "It looks like your current headcount is set for 14. To proceed with planning lunch for 50 people, I'd need to update the headcount.\n\nWould you like to adjust the headcount to 50? If so, please confirm and we can move forward with meal selection and other details!",
    },
    { id: "u2", role: "user", text: "No, 14 is good" },
    {
      id: "a2",
      role: "ai",
      type: "meal-recommendation",
      intro: "Here are the top catering options for your team lunch, considering your dietary needs and budget.",
      sources: ["Biscuit Belly breakfast", "Urban Plates Lunch", "+24 more"],
      forCount: 14,
    },
  ]
}

/* ─────────────────────────────────────────────────────────────────────────────
   Sidebar
───────────────────────────────────────────────────────────────────────────── */

function Sidebar() {
  const NAV = [
    { Icon: RiHome2Line,       label: "Explore",      active: false },
    { Icon: RiStore2Line,      label: "Restaurants",  active: false },
    { Icon: RiHeartLine,       label: "Favourite",    active: false },
    { Icon: RiShoppingBag2Line,label: "Cart",         active: false },
    { Icon: RiFileListLine,    label: "Orders",       active: false },
    { Icon: RiMessage2Line,    label: "Messages",     active: true  },
  ]
  return (
    <aside className="w-[206px] shrink-0 flex flex-col bg-[#FAFBFC] border-r border-[#F1F2F5]">
      <nav className="flex-1 p-4 space-y-0.5">
        {NAV.map(({ Icon, label, active }) => (
          <button
            key={label}
            className={[
              "w-full flex items-center gap-3 px-3 h-11 rounded-xl text-sm font-medium transition-colors",
              active
                ? "bg-[#073D30] text-white"
                : "text-[#29344A] hover:bg-[#F1F2F5]",
            ].join(" ")}
          >
            <Icon className="size-[18px] shrink-0" />
            {label}
          </button>
        ))}
        <button className="w-full flex items-center gap-2 px-3 h-11 rounded-xl text-sm font-medium text-[#68707C] hover:bg-[#F1F2F5] transition-colors">
          <span className="size-5 shrink-0 rounded-full bg-[#E8EAED] flex items-center justify-center">
            <RiArrowDownSLine className="size-3.5 text-[#68707C]" />
          </span>
          See more
        </button>
      </nav>
      <div className="p-4 border-t border-[#F1F2F5] space-y-0.5">
        {[
          { Icon: RiGiftLine,      label: "Rewards" },
          { Icon: RiUserHeartLine, label: "Account" },
        ].map(({ Icon, label }) => (
          <button
            key={label}
            className="w-full flex items-center gap-3 px-3 h-11 rounded-xl text-sm font-medium text-[#29344A] hover:bg-[#F1F2F5] transition-colors"
          >
            <Icon className="size-[18px] shrink-0" />
            {label}
          </button>
        ))}
      </div>
    </aside>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   CustomizationDropdown — pill that opens a selectable list on click
───────────────────────────────────────────────────────────────────────────── */

function CustomizationDropdown({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const options = CUSTOMIZATION_OPTIONS[label] ?? [value]

  // Close when clicking outside
  useEffect(() => {
    if (!open) return
    function onOutsideClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onOutsideClick)
    return () => document.removeEventListener("mousedown", onOutsideClick)
  }, [open])

  return (
    <div ref={wrapperRef} className="relative">
      {/* Trigger pill */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={[
          "flex items-center gap-1.5 h-8 rounded-full border px-3 text-[12px] bg-white transition-colors",
          open
            ? "border-[#9CD8B5] bg-[#F9FAFB] shadow-[0_0_0_2px_#CEECDA]"
            : "border-[#D9DDE4] hover:border-[#9CD8B5] hover:bg-[#F9FAFB]",
        ].join(" ")}
      >
        <span className="font-bold text-[#68707C] tracking-wide uppercase text-[10px]">
          {label}
        </span>
        <span className="text-[#101828] font-medium">{value}</span>
        <RiArrowDownSLine
          className={[
            "size-3.5 text-[#68707C] transition-transform duration-150",
            open ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute top-full left-0 mt-1.5 z-50 bg-white border border-[#D9DDE4] rounded-xl shadow-[0_8px_24px_rgba(16,24,40,0.10)] py-1 min-w-[160px]">
          {options.map((opt) => {
            const selected = opt === value
            return (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false) }}
                className={[
                  "w-full text-left flex items-center justify-between gap-3 px-3 py-2 text-[13px] transition-colors",
                  selected
                    ? "bg-[#F9FAFB] font-semibold text-[#073D30]"
                    : "text-[#101828] hover:bg-[#F9FAFB]",
                ].join(" ")}
              >
                {opt}
                {selected && <RiCheckLine className="size-3.5 text-[#073D30] shrink-0" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   MealItemRow — the enhanced card matching your screenshot
───────────────────────────────────────────────────────────────────────────── */

function MealItemRow({
  item,
  onQuantityChange,
  onDelete,
  onCustomizationChange,
}: {
  item: MealItem
  onQuantityChange: (id: string, q: number) => void
  onDelete: (id: string) => void
  onCustomizationChange: (itemId: string, label: string, value: string) => void
}) {
  const total = item.priceEach * item.quantity
  const bites = item.bitesPer * item.quantity

  return (
    <div className="py-5">
      <div className="flex gap-4">
        {/* Food image */}
        <div
          className="size-[88px] shrink-0 rounded-xl flex items-center justify-center text-3xl select-none"
          style={{ backgroundColor: item.bgColor }}
        >
          {item.emoji}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Row 1: name + price ea | total price + bites + delete */}
          <div className="flex items-start justify-between gap-3">
            {/* Left: name + description */}
            <div className="min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-[15px] font-semibold text-[#101828] leading-snug">{item.name}</span>
                <span className="text-[13px] text-[#68707C]">{fmt(item.priceEach)} ea</span>
              </div>
              <p className="text-[13px] text-[#68707C] mt-0.5 leading-snug">{item.description}</p>
            </div>
            {/* Right: total + bites + trash */}
            <div className="shrink-0 flex flex-col items-end gap-0.5">
              <span className="text-[18px] font-bold text-[#101828] leading-none">{fmt(total)}</span>
              <span className="text-[13px] font-semibold text-[#CA6100] leading-none mt-1">
                {bites.toLocaleString()} Bites
              </span>
              <button
                onClick={() => onDelete(item.id)}
                className="mt-1.5 text-[#D0D5DD] hover:text-[#C22D2C] transition-colors"
                aria-label={`Remove ${item.name}`}
              >
                <RiDeleteBinLine className="size-[18px]" />
              </button>
            </div>
          </div>

          {/* Row 2: Customisation dropdowns — each opens a real option list */}
          <div className="flex flex-wrap gap-2 mt-3">
            {item.customizations.map((c) => (
              <CustomizationDropdown
                key={c.label}
                label={c.label}
                value={c.value}
                onChange={(v) => onCustomizationChange(item.id, c.label, v)}
              />
            ))}
          </div>

          {/* Row 3: Quantity stepper + dietary label */}
          <div className="flex items-center gap-4 mt-3">
            {/* Stepper */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                className="size-[30px] rounded-full border border-[#D9DDE4] flex items-center justify-center text-[#68707C] hover:border-[#9CD8B5] hover:bg-[#F9FAFB] transition-colors"
                aria-label="Decrease quantity"
              >
                <RiSubtractLine className="size-3.5" />
              </button>
              <span className="w-5 text-center text-[15px] font-semibold text-[#101828]">
                {item.quantity}
              </span>
              <button
                onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                className="size-[30px] rounded-full border border-[#D9DDE4] flex items-center justify-center text-[#68707C] hover:border-[#9CD8B5] hover:bg-[#F9FAFB] transition-colors"
                aria-label="Increase quantity"
              >
                <RiAddLine className="size-3.5" />
              </button>
            </div>
            {/* Dietary label */}
            <span className="flex items-center gap-1.5 text-[13px] text-[#68707C]">
              <RiGroupLine className="size-3.5 text-[#537CF6]" />
              {item.dietary}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Order Summary
───────────────────────────────────────────────────────────────────────────── */

function OrderSummary({ items }: { items: MealItem[] }) {
  const subtotal = items.reduce((s, i) => s + i.priceEach * i.quantity, 0)
  const tax      = subtotal * 0.086
  const cashback = Math.round(subtotal * 0.055 * 100) / 100
  const total    = subtotal + tax          // cashback is earned after — not deducted

  const rows = [
    { label: "Subtotal",    value: fmt(subtotal) },
    { label: "Tax",         value: fmt(tax)      },
    { label: "Order Total", value: fmt(total),   bold: true },
  ]

  return (
    <div className="border-t border-[#F1F2F5] pt-4 space-y-2.5">
      {rows.map((r) => (
        <div key={r.label} className="flex justify-between items-center">
          <span className={["text-sm", r.bold ? "font-semibold text-[#101828]" : "text-[#68707C]"].join(" ")}>
            {r.label}
          </span>
          <span className={["text-sm", r.bold ? "font-bold text-[#101828]" : "font-medium text-[#29344A]"].join(" ")}>
            {r.value}
          </span>
        </div>
      ))}

      {/* Cashback — earned on completion, not a deduction */}
      <div className="flex items-center justify-between pt-2 border-t border-[#F1F2F5]">
        <span className="text-[13px] text-[#39B16C] font-medium">
          Cashback reward on completion
        </span>
        <span className="text-[13px] font-bold text-[#39B16C]">
          +{fmt(cashback)}
        </span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Meal Recommendation Card
───────────────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────────────
   RestaurantCard — with animated Add to Cart button
───────────────────────────────────────────────────────────────────────────── */

type AddState = "idle" | "adding" | "added"

function RestaurantCard({
  name,
  sub,
  location,
  rating,
  bites,
  bg,
  action,
  listed,
  mealItems,
  forCount,
  onCartAdd,
  onRestaurantClick,
}: {
  name: string
  sub: string
  location: string
  rating: number
  bites: string
  bg: string
  action: "Add to Cart" | "Send Quote"
  listed: boolean
  mealItems: MealItem[]
  forCount: number
  onCartAdd?: (item: CartItem) => void
  onRestaurantClick?: (name: string) => void
}) {
  // ── Add to Cart state ──
  const [addState, setAddState] = useState<AddState>("idle")

  // ── Send Quote state ──
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [quoteSent, setQuoteSent] = useState(false)

  function handleAddToCart() {
    if (addState !== "idle") return
    setAddState("adding")
    setTimeout(() => {
      const cartItem: CartItem = {
        id: `${name}-${Date.now()}`,
        restaurantName: name,
        restaurantSub: sub,
        restaurantBg: bg,
        mealItems: mealItems.map((m) => ({
          name: m.name,
          emoji: m.emoji,
          bgColor: m.bgColor,
          quantity: m.quantity,
          priceEach: m.priceEach,
        })),
        forCount,
        bites: mealItems.reduce((s, m) => s + m.bitesPer * m.quantity, 0),
      }
      onCartAdd?.(cartItem)
      setAddState("added")
    }, 500)
    setTimeout(() => setAddState("idle"), 2800)
  }

  return (
    <>
      <div className="rounded-2xl border border-[#F1F2F5] overflow-hidden bg-white hover:shadow-md transition-shadow">
        <button
          onClick={() => onRestaurantClick?.(name)}
          className="w-full h-[140px] flex items-center justify-center text-5xl hover:opacity-90 transition-opacity"
          style={{ backgroundColor: bg }}
          aria-label={`View ${name}`}
        >
          🍽️
        </button>
        <div className="p-3.5">
          <div className="flex items-start justify-between gap-2 mb-0.5">
            <div>
              <p className="text-[13px] font-semibold text-[#101828] leading-snug">{name}</p>
              <p className="text-[12px] text-[#68707C]">{sub}</p>
            </div>
            {/* Listed / unlisted badge */}
            {listed ? (
              <span className="shrink-0 flex items-center gap-1 text-[10px] font-bold text-[#033F1C] bg-[#ceecda] rounded-full px-2 py-0.5">
                <RiCheckLine className="size-2.5" /> WeCater
              </span>
            ) : (
              <span className="shrink-0 text-[10px] font-bold text-[#68707C] bg-[#F1F2F5] rounded-full px-2 py-0.5">
                External
              </span>
            )}
          </div>

          <p className="text-[12px] text-[#68707C] mb-2">{location}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-[#FDBC2A] text-[13px]">★</span>
              <span className="text-[12px] font-semibold text-[#101828]">{rating}</span>
              <span className="text-[12px] text-[#68707C]">(1,500+)</span>
            </div>
            {listed ? (
              <span className="text-[11px] font-semibold text-[#033F1C] bg-[#ceecda] rounded-full px-2 py-0.5">
                {bites}
              </span>
            ) : (
              <span className="text-[11px] text-[#B2B8C1]">No Bites</span>
            )}
          </div>

          <div className="flex gap-2 mt-3">
            {listed ? (
              <>
                <button className="flex-1 h-8 rounded-full border border-[#D9DDE4] text-[12px] font-semibold text-[#101828] hover:bg-[#F9FAFB] transition-colors">
                  Favourite
                </button>
                {action === "Add to Cart" ? (
                  <button
                    onClick={handleAddToCart}
                    disabled={addState !== "idle"}
                    className={[
                      "flex-1 h-8 rounded-full text-[12px] font-semibold transition-all duration-300 flex items-center justify-center gap-1.5",
                      addState === "idle"    ? "bg-[#073D30] text-[#CCF8B9] hover:bg-[#1e6151]"
                      : addState === "adding" ? "bg-[#1e6151] text-[#CCF8B9] opacity-80"
                      :                         "bg-[#39B16C] text-white",
                    ].join(" ")}
                  >
                    {addState === "idle"   && "Add to Cart"}
                    {addState === "adding" && (<><span className="size-3 rounded-full border-2 border-white/40 border-t-white animate-spin" />Adding…</>)}
                    {addState === "added"  && (<><RiCheckLine className="size-3.5" />Added!</>)}
                  </button>
                ) : (
                  <button
                    onClick={() => !quoteSent && setShowQuoteModal(true)}
                    className={[
                      "flex-1 h-8 rounded-full text-[12px] font-semibold transition-all duration-200 flex items-center justify-center gap-1.5",
                      quoteSent ? "bg-[#CA6100] text-white cursor-default"
                      : "border border-[#073D30] text-[#073D30] hover:bg-[#073D30] hover:text-[#CCF8B9]",
                    ].join(" ")}
                  >
                    {quoteSent ? (<><RiCheckLine className="size-3.5" />Quote Sent</>) : "Send Quote"}
                  </button>
                )}
              </>
            ) : (
              /* ── Unlisted restaurant — quote only ── */
              <button
                onClick={() => !quoteSent && setShowQuoteModal(true)}
                className={[
                  "w-full h-8 rounded-full text-[12px] font-semibold transition-all duration-200 flex items-center justify-center gap-1.5",
                  quoteSent ? "bg-[#CA6100] text-white cursor-default"
                  : "border border-[#D9DDE4] text-[#29344A] hover:border-[#9CD8B5] hover:bg-[#F9FAFB]",
                ].join(" ")}
              >
                {quoteSent ? (<><RiCheckLine className="size-3.5" />Quote Sent</>) : "Send Quote Request"}
              </button>
            )}
          </div>

          {/* Unlisted note */}
          {!listed && (
            <p className="text-[11px] text-[#B2B8C1] mt-2 leading-snug">
              Not on the WeCater marketplace · Bites not applicable
            </p>
          )}
        </div>
      </div>

      {/* Quote modal — rendered inline, portals to body via fixed positioning */}
      <QuoteModal
        open={showQuoteModal}
        restaurantName={name}
        restaurantSub={sub}
        restaurantBg={bg}
        items={mealItems.map((m) => ({
          name: m.name,
          emoji: m.emoji,
          bgColor: m.bgColor,
          quantity: m.quantity,
          priceEach: m.priceEach,
        }))}
        forCount={forCount}
        onClose={() => setShowQuoteModal(false)}
        onSuccess={() => {
          setQuoteSent(true)
          // Keep modal open to show success state; user closes it manually
        }}
      />
    </>
  )
}

function MealRecommendationCard({
  intro,
  sources,
  forCount,
  items,
  onQuantityChange,
  onDelete,
  onCustomizationChange,
  onCartAdd,
}: {
  intro: string
  sources: string[]
  forCount: number
  items: MealItem[]
  onQuantityChange: (id: string, q: number) => void
  onDelete: (id: string) => void
  onCustomizationChange: (itemId: string, label: string, value: string) => void
  onCartAdd?: (item: CartItem) => void
}) {
  const [addState, setAddState] = useState<AddState>("idle")

  function handleAddToCart() {
    if (addState !== "idle" || items.length === 0) return
    setAddState("adding")
    setTimeout(() => {
      onCartAdd?.({
        id: `ai-${Date.now()}`,
        restaurantName: "CaterAI Selection",
        restaurantSub: "From your AI recommendations",
        restaurantBg: "#D4F5ED",
        mealItems: items.map((m) => ({
          name: m.name,
          emoji: m.emoji,
          bgColor: m.bgColor,
          quantity: m.quantity,
          priceEach: m.priceEach,
        })),
        forCount,
        bites: items.reduce((s, m) => s + m.bitesPer * m.quantity, 0),
      })
      setAddState("added")
    }, 600)
    setTimeout(() => setAddState("idle"), 3200)
  }

  return (
    <div>
      <p className="text-sm text-[#101828] leading-relaxed mb-4">{intro}</p>

      {/* Card */}
      <div className="rounded-2xl border border-[#D9DDE4]/70 shadow-[0_2px_16px_rgba(16,24,40,0.07)]">
        {/* Restaurant sources bar */}
        <div className="flex items-center gap-2.5 px-5 pt-4 pb-3 border-b border-[#F1F2F5]">
          <span className="text-[12px] font-bold text-[#063126] whitespace-nowrap uppercase tracking-wide">
            Restaurant Sources
          </span>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {sources.map((s) => (
              <button
                key={s}
                className="flex items-center gap-1.5 shrink-0 h-7 rounded-full bg-[#F1F2F5] px-3 text-[12px] font-medium text-[#29344A] hover:bg-[#E8EAED] transition-colors"
              >
                <span className="size-3.5 rounded-full bg-[#073D30] shrink-0" />
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Section heading */}
        <div className="px-5 pt-4 pb-1">
          <h4 className="text-[15px] font-bold text-[#101828]">
            For {forCount} people, you could choose:
          </h4>
        </div>

        {/* Meal items — separated by dividers */}
        <div className="px-5 divide-y divide-[#F1F2F5]">
          {items.map((item) => (
            <MealItemRow
              key={item.id}
              item={item}
              onQuantityChange={onQuantityChange}
              onDelete={onDelete}
              onCustomizationChange={onCustomizationChange}
            />
          ))}
        </div>

        {/* Order summary */}
        <div className="px-5 pb-4">
          <OrderSummary items={items} />
        </div>

        {/* Add to Cart CTA */}
        <div className="px-5 pb-5">
          <button
            onClick={handleAddToCart}
            disabled={addState !== "idle" || items.length === 0}
            className={[
              "w-full h-[46px] rounded-full text-[14px] font-semibold flex items-center justify-center gap-2 transition-all duration-300",
              addState === "idle"
                ? "bg-[#073D30] text-[#CCF8B9] hover:bg-[#1e6151]"
                : addState === "adding"
                ? "bg-[#1e6151] text-[#CCF8B9] opacity-80"
                : "bg-[#39B16C] text-white",
            ].join(" ")}
          >
            {addState === "idle"   && (<><RiShoppingBag2Line className="size-4" />Add to Cart</>)}
            {addState === "adding" && (<><span className="size-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />Adding…</>)}
            {addState === "added"  && (<><RiCheckLine className="size-4" />Added to Cart!</>)}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   OrderHistory — rendered when user asks to view past orders
───────────────────────────────────────────────────────────────────────────── */

function OrderHistory({ intro }: { intro: string }) {
  return (
    <div>
      <p className="text-[14px] text-[#101828] leading-relaxed mb-4">{intro}</p>
      <div className="space-y-3">
        {PAST_ORDERS.map((order) => (
          <div
            key={order.ref}
            className="rounded-2xl border border-[#F1F2F5] overflow-hidden bg-white"
          >
            {/* Restaurant header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b border-[#F1F2F5]"
              style={{ backgroundColor: order.restaurantBg + "28" }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="size-8 rounded-xl shrink-0"
                  style={{ backgroundColor: order.restaurantBg }}
                />
                <div>
                  <p className="text-[13px] font-bold text-[#101828] leading-none">{order.restaurant}</p>
                  <p className="text-[11px] text-[#68707C] mt-0.5">{order.restaurantSub}</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-[#067E39] bg-[#E6F5ED] rounded-full px-2.5 py-1">
                <span className="size-1.5 rounded-full bg-[#39B16C] inline-block" />
                Delivered
              </span>
            </div>

            {/* Order details */}
            <div className="px-4 py-3 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[12px] text-[#68707C] mb-1">
                  {order.date} · Ref {order.ref} · {order.forCount} people
                </p>
                <p className="text-[13px] text-[#101828] truncate">
                  {order.summary.join(", ")}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[14px] font-bold text-[#101828]">{fmt(order.total)}</p>
                <p className="text-[12px] font-semibold text-[#CA6100]">
                  {order.bites.toLocaleString()} Bites earned
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 pb-3 flex gap-2">
              <button className="flex-1 h-8 rounded-full border border-[#D9DDE4] text-[12px] font-semibold text-[#101828] hover:bg-[#F9FAFB] transition-colors">
                View Details
              </button>
              <button className="flex-1 h-8 rounded-full bg-[#073D30] text-[12px] font-semibold text-[#CCF8B9] hover:bg-[#1e6151] transition-colors">
                Reorder
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   RestaurantListing — rendered only when user asks for restaurant options
───────────────────────────────────────────────────────────────────────────── */

function RestaurantListing({
  intro,
  mealItems,
  forCount,
  onCartAdd,
  onRestaurantClick,
}: {
  intro: string
  mealItems: MealItem[]
  forCount: number
  onCartAdd?: (item: CartItem) => void
  onRestaurantClick?: (name: string) => void
}) {
  return (
    <div>
      <p className="text-[14px] text-[#101828] leading-relaxed mb-4">{intro}</p>
      <div className="grid grid-cols-2 gap-3">
        {RESTAURANT_LISTING.map((r) => (
          <RestaurantCard
            key={r.name}
            {...r}
            listed={r.listed}
            mealItems={mealItems}
            forCount={forCount}
            onCartAdd={onCartAdd}
            onRestaurantClick={onRestaurantClick}
          />
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Right Context Panel ("Ask CaterAI")
───────────────────────────────────────────────────────────────────────────── */

function ContextPanel({ items }: { items: MealItem[] }) {
  const totalBitesToEarn = items.reduce((s, i) => s + i.bitesPer * i.quantity, 0)

  return (
    <aside className="w-[260px] shrink-0 flex flex-col border-l border-[#F1F2F5] overflow-y-auto bg-white">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 pt-5 pb-4 border-b border-[#F1F2F5] shrink-0">
        <span className="text-[15px] font-semibold text-[#101828]">Ask CaterAI</span>
        <span className="text-[11px] font-semibold text-[#68707C] border border-[#D9DDE4] rounded-full px-2 py-0.5 bg-white">
          Beta
        </span>
      </div>

      <div className="flex-1 px-5 py-4 space-y-5 overflow-y-auto text-sm">
        {/* Chat context collapsible */}
        <section>
          <button className="flex items-center justify-between w-full text-[13px] font-semibold text-[#29344A]">
            Chat context
            <RiArrowDownSLine className="size-4 text-[#68707C]" />
          </button>
        </section>

        {/* Live context */}
        <section>
          <h4 className="text-[13px] font-semibold text-[#29344A] mb-3">Live Context</h4>

          {/* Profile selector */}
          <div className="mb-4">
            <p className="text-[12px] text-[#68707C] mb-1.5">Change profile? Select here:</p>
            <button className="flex items-center justify-between w-full h-9 rounded-lg border border-[#D9DDE4] px-3 text-[13px] font-medium text-[#101828] bg-white hover:border-[#9CD8B5] transition-colors">
              Dr. Patel Green
              <RiArrowDownSLine className="size-4 text-[#68707C]" />
            </button>
          </div>

          {/* Profile fields */}
          <div className="space-y-3">
            {[
              { label: "Name",            value: "Dr. Patel Green" },
              { label: "Headcount",       value: "14 people" },
              { label: "Primary contact", value: "Alex Hermana" },
              { label: "Address",         value: "4540 E Shea Blvd, Suite 220, Phoenix AZ 86383" },
            ].map((f) => (
              <div key={f.label}>
                <p className="text-[10px] font-bold text-[#68707C] uppercase tracking-widest mb-0.5">
                  {f.label}
                </p>
                <p className="text-[13px] text-[#101828] leading-snug">{f.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dietary restrictions */}
        <section>
          <h4 className="text-[13px] font-semibold text-[#29344A] mb-2">Dietary restrictions</h4>
          <div className="flex flex-wrap gap-1.5">
            {DIETARY_TAGS.map((t) => (
              <span
                key={t.label}
                className="text-[12px] font-semibold rounded-full px-2.5 py-1 leading-none"
                style={{ backgroundColor: t.bg, color: t.fg }}
              >
                {t.label}
              </span>
            ))}
          </div>
        </section>

        {/* Bites wallet */}
        <section>
          <h4 className="text-[13px] font-semibold text-[#29344A] mb-1.5">Your Bites wallet</h4>
          <div className="flex items-center gap-2">
            <RiCoinLine className="size-4 text-[#CA6100]" />
            <span className="text-[13px] font-semibold text-[#101828]">
              {totalBitesToEarn > 0
                ? `${totalBitesToEarn.toLocaleString()} bites to earn`
                : "0 bites"}
            </span>
          </div>
        </section>

        {/* Special instructions */}
        <section>
          <h4 className="text-[13px] font-semibold text-[#29344A] mb-2">Special instructions</h4>
          <textarea
            placeholder="Add any notes for the team..."
            rows={3}
            className="w-full rounded-xl border border-[#D9DDE4] px-3 py-2 text-[13px] text-[#101828] placeholder:text-[#B2B8C1] resize-none outline-none focus:border-[#9CD8B5] focus:shadow-[0_0_0_2px_#CEECDA] transition-all bg-white"
          />
        </section>

        {/* Order history */}
        <section>
          <button className="flex items-center justify-between w-full text-[13px] font-semibold text-[#29344A]">
            Order history
            <RiArrowDownSLine className="size-4 text-[#68707C]" />
          </button>
        </section>
      </div>
    </aside>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   FollowUpSuggestions — sticky chips between thread and input
───────────────────────────────────────────────────────────────────────────── */

function FollowUpSuggestions({
  onSelect,
  onDismiss,
}: {
  onSelect: (text: string, id: string) => void
  onDismiss: () => void
}) {
  return (
    <div className="shrink-0 bg-white border-t border-[#F1F2F5]">
      <div className="px-6 py-2.5 flex items-center gap-3">
        {/* Scrollable chip row */}
        <div className="flex-1 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {FOLLOW_UP_SUGGESTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelect(s.text, s.id)}
              className={[
                "shrink-0 flex items-center gap-2 h-[34px] rounded-full px-3.5 text-[13px] font-medium whitespace-nowrap transition-colors",
                s.kind === "insight"
                  ? "bg-[#E6F5ED] border border-[#9CD8B5] text-[#063126] hover:bg-[#D4F5ED]"
                  : "bg-white border border-[#D9DDE4] text-[#29344A] hover:border-[#9CD8B5] hover:bg-[#F9FAFB]",
              ].join(" ")}
            >
              {s.kind === "insight" && (
                <RiSparklingLine className="size-3.5 text-[#39B16C] shrink-0" />
              )}
              {s.text}
            </button>
          ))}
        </div>

        {/* Dismiss */}
        <button
          onClick={onDismiss}
          className="shrink-0 size-7 rounded-full flex items-center justify-center text-[#B2B8C1] hover:text-[#68707C] hover:bg-[#F1F2F5] transition-colors"
          aria-label="Dismiss suggestions"
        >
          <RiCloseLine className="size-3.5" />
        </button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Chat Input Bar + Bottom Action Bar (shared)
───────────────────────────────────────────────────────────────────────────── */

function ChatInputArea({
  input,
  onInputChange,
  onSubmit,
  onKeyDown,
  textareaRef,
  showContext,
  onToggleContext,
}: {
  input: string
  onInputChange: (v: string) => void
  onSubmit: () => void
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  showContext: boolean
  onToggleContext: () => void
}) {
  return (
    <div className="shrink-0 border-t border-[#F1F2F5] px-6 pt-4 pb-4">
      {/* Input */}
      <div className="flex items-end gap-3 bg-white border border-[#D9DDE4] rounded-2xl px-4 py-3 focus-within:border-[#9CD8B5] focus-within:shadow-[0_0_0_2px_#CEECDA] transition-all">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          placeholder="Enter a response"
          className="flex-1 min-w-0 resize-none text-sm text-[#29344A] placeholder:text-[#68707C] bg-transparent outline-none leading-relaxed max-h-32"
          style={{ fieldSizing: "content" } as React.CSSProperties}
        />
        <div className="flex items-center gap-2 shrink-0 pb-0.5">
          <Button variant="ghost" size="icon-sm">
            <RiMicLine className="size-4" />
          </Button>
          <Button
            variant={input.trim() ? "default" : "tertiary-grey"}
            size="icon-sm"
            onClick={onSubmit}
            disabled={!input.trim()}
          >
            <RiSendPlaneFill className="size-4" />
          </Button>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="flex items-center justify-between gap-3 mt-3">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 group">
            <span className="size-7 rounded-full bg-[#073D30] flex items-center justify-center shrink-0">
              <RiSparklingLine className="size-3.5 text-[#7DE993]" />
            </span>
            <span className="text-sm font-semibold text-[#101828]">Ask CaterAI</span>
          </button>
          <span className="text-[11px] font-medium text-[#68707C] border border-[#D9DDE4] rounded-full px-2 py-0.5">
            Beta
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="sm" iconPosition="left" icon={<RiCoinLine className="size-4" />}>
            0 bites
          </Button>
          <Button
            variant={showContext ? "secondary" : "tertiary-grey"}
            size="sm"
            iconPosition="left"
            icon={<RiLayoutColumnLine className="size-4" />}
            onClick={onToggleContext}
          >
            Chat context
          </Button>
          <Button variant="ghost" size="icon-sm">
            <RiChat3Line className="size-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={() => onInputChange("")}>
            <RiCloseLine className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Chat Thread — scrollable message list
───────────────────────────────────────────────────────────────────────────── */

function ChatThread({
  messages,
  mealItems,
  onQuantityChange,
  onDeleteItem,
  onCustomizationChange,
  onCartAdd,
  onRestaurantClick,
  bottomRef,
}: {
  messages: ChatMessage[]
  mealItems: MealItem[]
  onQuantityChange: (id: string, q: number) => void
  onDeleteItem: (id: string) => void
  onCustomizationChange: (itemId: string, label: string, value: string) => void
  onCartAdd?: (item: CartItem) => void
  onRestaurantClick?: (name: string) => void
  bottomRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
      {messages.map((msg) => {
        if (msg.role === "user") {
          return (
            <div key={msg.id} className="flex items-start gap-3">
              {/* User avatar */}
              <div className="size-9 shrink-0 rounded-full bg-[#F1F2F5] border border-[#D9DDE4] flex items-center justify-center text-[12px] font-bold text-[#29344A]">
                PS
              </div>
              <div className="flex-1 pt-1">
                <p className="text-[14px] text-[#101828] leading-relaxed">{msg.text}</p>
              </div>
            </div>
          )
        }

        if (msg.type === "text") {
          return (
            <div key={msg.id} className="flex items-start gap-3">
              {/* AI avatar */}
              <div className="size-9 shrink-0 rounded-full bg-[#073D30] flex items-center justify-center relative">
                <RiSparklingLine className="size-4 text-[#7DE993]" />
                <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-[#39B16C] border-2 border-white" />
              </div>
              <div className="flex-1 pt-1">
                {msg.text.split("\n\n").map((para, i) => (
                  <p key={i} className={["text-[14px] text-[#101828] leading-relaxed", i > 0 ? "mt-3" : ""].join(" ")}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          )
        }

        if (msg.type === "meal-recommendation") {
          return (
            <div key={msg.id} className="flex items-start gap-3">
              <div className="size-9 shrink-0 rounded-full bg-[#073D30] flex items-center justify-center relative">
                <RiSparklingLine className="size-4 text-[#7DE993]" />
                <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-[#39B16C] border-2 border-white" />
              </div>
              <div className="flex-1 min-w-0">
                <MealRecommendationCard
                  intro={msg.intro}
                  sources={msg.sources}
                  forCount={msg.forCount}
                  items={mealItems}
                  onQuantityChange={onQuantityChange}
                  onDelete={onDeleteItem}
                  onCustomizationChange={onCustomizationChange}
                  onCartAdd={onCartAdd}
                />
              </div>
            </div>
          )
        }

        if (msg.type === "order-history") {
          return (
            <div key={msg.id} className="flex items-start gap-3">
              <div className="size-9 shrink-0 rounded-full bg-[#073D30] flex items-center justify-center relative">
                <RiSparklingLine className="size-4 text-[#7DE993]" />
                <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-[#39B16C] border-2 border-white" />
              </div>
              <div className="flex-1 min-w-0">
                <OrderHistory intro={msg.intro} />
              </div>
            </div>
          )
        }

        if (msg.type === "restaurant-listing") {
          return (
            <div key={msg.id} className="flex items-start gap-3">
              <div className="size-9 shrink-0 rounded-full bg-[#073D30] flex items-center justify-center relative">
                <RiSparklingLine className="size-4 text-[#7DE993]" />
                <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-[#39B16C] border-2 border-white" />
              </div>
              <div className="flex-1 min-w-0">
                <RestaurantListing
                  intro={msg.intro}
                  mealItems={mealItems}
                  forCount={14}
                  onCartAdd={onCartAdd}
                  onRestaurantClick={onRestaurantClick}
                />
              </div>
            </div>
          )
        }

        return null
      })}
      <div ref={bottomRef} />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Empty State — welcome screen before any messages
───────────────────────────────────────────────────────────────────────────── */

function EmptyState({
  input,
  onInputChange,
  onSubmit,
  onKeyDown,
  textareaRef,
  showContext,
  onToggleContext,
  onChipClick,
}: {
  input: string
  onInputChange: (v: string) => void
  onSubmit: () => void
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  showContext: boolean
  onToggleContext: () => void
  onChipClick: (chip: string) => void
}) {
  const dateLabel = getWelcomeDate()

  return (
    <div className="h-full flex overflow-hidden">
      {/* Left: empty chat */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 flex flex-col justify-center px-10 overflow-y-auto">
          <div className="max-w-xl">
            <p className="text-[#68707C] text-sm mb-2">{dateLabel}</p>
            <h2
              className="text-[30px] font-bold text-[#101828] leading-tight mb-8"
              style={{ fontFamily: "var(--font-title)" }}
            >
              Welcome! Got an order
              <br />for an event?
            </h2>
            <p className="text-xs font-bold text-[#29344A] uppercase tracking-widest mb-3">
              Order ideas
            </p>
            <div className="flex flex-wrap gap-2">
              {PROMPT_CHIPS.map((chip) => (
                <button
                  key={chip.text}
                  onClick={() => onChipClick(chip.text)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4F5ED] text-[#073D30] text-sm font-medium hover:bg-[#CEECDA] transition-colors"
                >
                  <span>{chip.icon}</span>
                  {chip.text}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ChatInputArea
          input={input}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          onKeyDown={onKeyDown}
          textareaRef={textareaRef}
          showContext={showContext}
          onToggleContext={onToggleContext}
        />
      </div>

      {/* Right: Live Context placeholder */}
      {showContext && (
        <aside className="w-[260px] shrink-0 flex flex-col border-l border-[#F1F2F5] p-6 bg-white">
          <h3 className="text-[15px] font-semibold text-[#29344A] mb-3" style={{ fontFamily: "var(--font-title)" }}>
            Live Context
          </h3>
          <p className="text-sm text-[#B2B8C1] leading-relaxed mb-6">
            Context cards appear here as you chat. Tell me who the order is for.
          </p>
          <div className="flex flex-col gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#FAFBFC] border border-[#F1F2F5]">
                <div className="size-12 rounded-lg bg-[#F1F2F5] flex items-center justify-center shrink-0">
                  <div className="size-6 rounded bg-[#D0D5DD]" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="h-2.5 rounded-full bg-[#F1F2F5] w-3/4" />
                  <div className="h-2 rounded-full bg-[#F1F2F5] w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </aside>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Active Chat — 3-column layout (sidebar + thread + context panel)
───────────────────────────────────────────────────────────────────────────── */

function ActiveChat({
  messages,
  mealItems,
  input,
  onInputChange,
  onSubmit,
  onKeyDown,
  textareaRef,
  showContext,
  onToggleContext,
  onQuantityChange,
  onDeleteItem,
  onCustomizationChange,
  showFollowUps,
  onFollowUpSelect,
  onFollowUpDismiss,
  onCartAdd,
  onRestaurantClick,
  bottomRef,
}: {
  messages: ChatMessage[]
  mealItems: MealItem[]
  input: string
  onInputChange: (v: string) => void
  onSubmit: () => void
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  showContext: boolean
  onToggleContext: () => void
  onQuantityChange: (id: string, q: number) => void
  onDeleteItem: (id: string) => void
  onCustomizationChange: (itemId: string, label: string, value: string) => void
  showFollowUps: boolean
  onFollowUpSelect: (text: string, id: string) => void
  onFollowUpDismiss: () => void
  onCartAdd?: (item: CartItem) => void
  onRestaurantClick?: (name: string) => void
  bottomRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div className="h-full flex overflow-hidden">
      <Sidebar />

      {/* Center: chat thread + input */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-[#F1F2F5]">
        <ChatThread
          messages={messages}
          mealItems={mealItems}
          onQuantityChange={onQuantityChange}
          onDeleteItem={onDeleteItem}
          onCustomizationChange={onCustomizationChange}
          onCartAdd={onCartAdd}
          onRestaurantClick={onRestaurantClick}
          bottomRef={bottomRef}
        />
        {showFollowUps && (
          <FollowUpSuggestions
            onSelect={onFollowUpSelect}
            onDismiss={onFollowUpDismiss}
          />
        )}
        <ChatInputArea
          input={input}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          onKeyDown={onKeyDown}
          textareaRef={textareaRef}
          showContext={showContext}
          onToggleContext={onToggleContext}
        />
      </div>

      {/* Right: context panel */}
      {showContext && <ContextPanel items={mealItems} />}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   ChatView — main export
───────────────────────────────────────────────────────────────────────────── */

export default function ChatView({ initialQuery = "", onCartAdd, onRestaurantClick }: ChatViewProps) {
  const [messages, setMessages]      = useState<ChatMessage[]>([])
  const [mealItems, setMealItems]    = useState<MealItem[]>(DEFAULT_MEAL_ITEMS)
  const [input, setInput]            = useState(initialQuery)
  const [showContext, setShowContext] = useState(true)
  const [showFollowUps, setShowFollowUps] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const bottomRef   = useRef<HTMLDivElement>(null)

  const hasMessages = messages.length > 0

  // If a query was passed in from the hero search, auto-start the conversation
  useEffect(() => {
    if (initialQuery.trim()) {
      triggerConversation(initialQuery)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function triggerConversation(query: string) {
    setInput("")
    const q = query.toLowerCase()

    if (q.includes("restaurant")) {
      setMessages([
        { id: "u1", role: "user", text: query },
        {
          id: "a1",
          role: "ai",
          type: "restaurant-listing",
          intro:
            "Here are the top catering restaurants near San Francisco, CA. Add directly to cart or request a formal quote.",
        },
      ])
      setShowFollowUps(false)
    } else if (q.includes("order") || q.includes("past") || q.includes("history")) {
      setMessages([
        { id: "u1", role: "user", text: query },
        {
          id: "a1",
          role: "ai",
          type: "order-history",
          intro: "Here are your recent orders. You can reorder any of them or view the full details.",
        },
      ])
      setShowFollowUps(false)
    } else {
      setMessages(buildDemoConversation(query))
      setMealItems(DEFAULT_MEAL_ITEMS)
      setShowFollowUps(true)
    }
  }

  function handleFollowUpSelect(text: string, id: string) {
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: "user", text }

    switch (id) {
      // ── f1: Add Baklava Platter ──────────────────────────────────────────
      case "f1": {
        const baklava: MealItem = {
          id: `baklava-${Date.now()}`,
          name: "Baklava Platter",
          description: "House-made baklava with honey, pistachios, and rose water",
          priceEach: 24,
          quantity: 1,
          emoji: "🍯",
          bgColor: "#CA6100",
          customizations: [
            { label: "SIZE", value: "Large (serves 8)" },
            { label: "NUT",  value: "Pistachios" },
          ],
          dietary: "8 omnivores",
          bitesPer: 308,
        }
        setMealItems((prev) => [...prev, baklava])
        setMessages((prev) => [
          ...prev,
          userMsg,
          {
            id: `a-${Date.now()}`,
            role: "ai",
            type: "text",
            text: "Done! I've added a Baklava Platter ($24) to the order — serves 8 and earns 308 Bites. A perfect dessert touch for the team.",
          },
        ])
        break
      }

      // ── f2: Stay under $300 ──────────────────────────────────────────────
      case "f2": {
        const BUDGET = 300
        const currentSubtotal = mealItems.reduce((s, m) => s + m.priceEach * m.quantity, 0)
        const currentTotal = currentSubtotal * 1.086

        if (currentTotal <= BUDGET) {
          setMessages((prev) => [
            ...prev,
            userMsg,
            {
              id: `a-${Date.now()}`,
              role: "ai",
              type: "text",
              text: `Your order is already under $300 — current total is ${fmt(currentTotal)}. No changes needed!`,
            },
          ])
          break
        }

        const targetSubtotal = BUDGET / 1.086
        const scaleFactor = targetSubtotal / currentSubtotal
        const scaled = mealItems.map((m) => ({
          ...m,
          quantity: Math.max(1, Math.round(m.quantity * scaleFactor)),
        }))
        const newTotal = scaled.reduce((s, m) => s + m.priceEach * m.quantity, 0) * 1.086

        setMealItems(scaled)
        setMessages((prev) => [
          ...prev,
          userMsg,
          {
            id: `a-${Date.now()}`,
            role: "ai",
            type: "text",
            text: `I've scaled the quantities down to fit within $300. New total: ${fmt(newTotal)}. Bump any item back up if you need more.`,
          },
        ])
        break
      }

      // ── f3: Show restaurant options ──────────────────────────────────────
      case "f3": {
        setMessages((prev) => [
          ...prev,
          userMsg,
          {
            id: `a-${Date.now()}`,
            role: "ai",
            type: "restaurant-listing",
            intro:
              "Here are the top restaurant options for your order. Add directly to cart or request a formal quote.",
          },
        ])
        break
      }

      // ── f4: Add vegan option ─────────────────────────────────────────────
      case "f4": {
        const veganBowl: MealItem = {
          id: `vegan-${Date.now()}`,
          name: "Garden Vegan Bowl",
          description: "Seasonal vegetables, quinoa, and tahini dressing",
          priceEach: 13,
          quantity: 2,
          emoji: "🥙",
          bgColor: "#39B16C",
          customizations: [
            { label: "BASE",    value: "Quinoa" },
            { label: "PROTEIN", value: "Tofu" },
            { label: "SAUCE",   value: "Tahini" },
          ],
          dietary: "2 vegans",
          bitesPer: 167,
        }
        setMealItems((prev) => [...prev, veganBowl])
        setMessages((prev) => [
          ...prev,
          userMsg,
          {
            id: `a-${Date.now()}`,
            role: "ai",
            type: "text",
            text: "Added! 2 Garden Vegan Bowls ($26) are now in the order — quinoa base, tofu, and tahini — one for each of the vegans on the team.",
          },
        ])
        break
      }

      // ── f5: Schedule delivery ────────────────────────────────────────────
      case "f5": {
        setMessages((prev) => [
          ...prev,
          userMsg,
          {
            id: `a-${Date.now()}`,
            role: "ai",
            type: "text",
            text: "Got it — delivery locked in for 12:30 PM. This will be included in the order details when you proceed to checkout.",
          },
        ])
        break
      }

      default: {
        setMessages((prev) => [...prev, userMsg])
      }
    }
  }

  function handleFollowUpDismiss() {
    setShowFollowUps(false)
  }

  function handleSubmit() {
    const text = input.trim()
    if (!text) return
    if (!hasMessages) {
      // First message → bootstrap the demo conversation
      triggerConversation(text)
    } else {
      // Already in conversation → append user message only (prototype)
      setMessages((prev) => [
        ...prev,
        { id: `u-${Date.now()}`, role: "user", text },
      ])
      setInput("")
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  function handleQuantityChange(id: string, q: number) {
    setMealItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: q } : item))
    )
  }

  function handleDeleteItem(id: string) {
    setMealItems((prev) => prev.filter((item) => item.id !== id))
  }

  function handleCustomizationChange(itemId: string, label: string, value: string) {
    setMealItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              customizations: item.customizations.map((c) =>
                c.label === label ? { ...c, value } : c
              ),
            }
          : item
      )
    )
  }

  const sharedInputProps = {
    input,
    onInputChange: setInput,
    onSubmit: handleSubmit,
    onKeyDown: handleKeyDown,
    textareaRef,
    showContext,
    onToggleContext: () => setShowContext((v) => !v),
  }

  if (!hasMessages) {
    return (
      <EmptyState
        {...sharedInputProps}
        onChipClick={(chip) => triggerConversation(chip)}
      />
    )
  }

  return (
    <ActiveChat
      {...sharedInputProps}
      messages={messages}
      mealItems={mealItems}
      onQuantityChange={handleQuantityChange}
      onDeleteItem={handleDeleteItem}
      onCustomizationChange={handleCustomizationChange}
      showFollowUps={showFollowUps}
      onFollowUpSelect={handleFollowUpSelect}
      onFollowUpDismiss={handleFollowUpDismiss}
      onCartAdd={onCartAdd}
      onRestaurantClick={onRestaurantClick}
      bottomRef={bottomRef}
    />
  )
}

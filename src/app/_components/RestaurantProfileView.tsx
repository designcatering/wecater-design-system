"use client"

import { useState, useEffect, useRef } from "react"
import {
  RiArrowLeftSLine,
  RiStarFill,
  RiHeartLine,
  RiHeartFill,
  RiMapPin2Line,
  RiTimeLine,
  RiAddLine,
  RiSubtractLine,
  RiCheckLine,
  RiShoppingBag2Line,
  RiLeafLine,
  RiFireLine,
  RiArrowDownSLine,
  RiCloseLine,
  RiGroupLine,
  RiEditLine,
  RiInformationLine,
  RiPhoneLine,
  RiGlobalLine,
  RiAlertLine,
} from "@remixicon/react"
import type { CartItem } from "../page"

/* ─────────────────────────────────────────────────────────────────────────────
   Data types
───────────────────────────────────────────────────────────────────────────── */

interface MenuCustomization {
  label: string
  options: string[]
}

interface MenuItem {
  id: string
  name: string
  description: string
  priceEach: number
  emoji: string
  bgColor: string
  category: string
  customizations?: MenuCustomization[]
  dietary?: string[]
  popular?: boolean
}

interface RestaurantData {
  id: string
  name: string
  sub: string
  bg: string
  listed: boolean
  rating: number
  reviews: string
  location: string
  distance: string
  deliveryTime: string
  minOrder: number
  bites?: string
  description: string
  categories: string[]
  menu: MenuItem[]
  hours: string
  phone: string
  website: string
}

/** One "split" of an item — e.g. 10× Chicken or 4× Veggie */
interface ItemVariant {
  id: string
  label: string     // option name (Chicken, Tofu, etc.)
  quantity: number
}

/** An item in the catering order */
interface OrderItem {
  menuItem: MenuItem
  variants: ItemVariant[]           // quantity splits per protein/variant
  sharedCustomizations: { label: string; value: string }[]  // non-split customizations
  servingStyle: "individual" | "buffet" | "platter"
  notes: string
}

/* ─────────────────────────────────────────────────────────────────────────────
   Restaurant database
───────────────────────────────────────────────────────────────────────────── */

const RESTAURANT_DB: Record<string, RestaurantData> = {
  "Barrio Queen": {
    id: "barrio-queen", name: "Barrio Queen", sub: "Upscale Mexican", bg: "#FED68D",
    listed: true, rating: 4.6, reviews: "1,500+", location: "Downtown, LA", distance: "20 min",
    deliveryTime: "45–60 min", minOrder: 150, bites: "2× Bites",
    description: "Authentic Mexican cuisine elevated for corporate catering. From build-your-own taco bars to plated enchilada platters — we bring the flavours of Mexico to your event.",
    categories: ["Starters", "Mains", "Sides", "Desserts"],
    hours: "Mon–Fri  10:00 AM – 9:00 PM", phone: "+1 (213) 555-0147", website: "barrioqueen.com",
    menu: [
      { id: "gua",   name: "Guacamole & Chips",   description: "Fresh avocado, lime, cilantro, house tortilla chips",                  priceEach: 8,    emoji: "🥑", bgColor: "#39B16C", category: "Starters", dietary: ["vegan","gluten-free"] },
      { id: "qfun",  name: "Queso Fundido",        description: "Melted Oaxacan cheese with chorizo and roasted peppers",              priceEach: 9,    emoji: "🧀", bgColor: "#CA6100", category: "Starters", dietary: ["vegetarian"] },
      { id: "corn",  name: "Street Corn",          description: "Elote-style corn with cotija, lime, and chilli powder",               priceEach: 7,    emoji: "🌽", bgColor: "#FDBC2A", category: "Starters", dietary: ["vegetarian"], popular: true },
      { id: "bowl",  name: "Power Bowl",           description: "Build-your-own bowl with protein, base, and sauce",                   priceEach: 14.5, emoji: "🥗", bgColor: "#073D30", category: "Mains",    popular: true,
        customizations: [
          { label: "PROTEIN", options: ["Chicken", "Beef", "Salmon", "Tofu", "Falafel"] },
          { label: "BASE",    options: ["Quinoa", "Brown Rice", "Mixed Greens", "Cauliflower Rice"] },
          { label: "SAUCE",   options: ["Tzatziki", "Salsa Verde", "Chipotle", "Caesar"] },
        ] },
      { id: "taco",  name: "Carne Asada Tacos",    description: "Grilled steak, onions, cilantro, house-made tortillas (3 per person)", priceEach: 18,   emoji: "🌮", bgColor: "#E5A46C", category: "Mains",    popular: true,
        customizations: [{ label: "PROTEIN", options: ["Carne Asada", "Pollo Asado", "Al Pastor", "Veggie"] }] },
      { id: "ench",  name: "Enchilada Platter",    description: "Red and green enchiladas with rice and beans",                        priceEach: 16,   emoji: "🍽️", bgColor: "#C22D2C", category: "Mains",
        customizations: [{ label: "FILLING", options: ["Chicken", "Cheese & Peppers", "Beef"] }] },
      { id: "faj",   name: "Fajita Bar",           description: "Sizzling peppers and onions, tortillas, salsas and all the fixings",  priceEach: 22,   emoji: "🫕", bgColor: "#CA6100", category: "Mains",    popular: true,
        customizations: [{ label: "PROTEIN", options: ["Chicken", "Steak", "Shrimp", "Veggie"] }] },
      { id: "rice",  name: "Mexican Rice",         description: "Saffron rice with tomato and vegetables",                             priceEach: 5,    emoji: "🍚", bgColor: "#FDBC2A", category: "Sides",    dietary: ["vegan","gluten-free"] },
      { id: "beans", name: "Refried Beans",        description: "Slow-cooked pinto beans with epazote",                               priceEach: 5,    emoji: "🫘", bgColor: "#5a3000", category: "Sides",    dietary: ["vegetarian"] },
      { id: "sal",   name: "House Salad",          description: "Mixed greens, pepitas, queso fresco, lime vinaigrette",               priceEach: 6,    emoji: "🥗", bgColor: "#39B16C", category: "Sides",    dietary: ["vegetarian","gluten-free"] },
      { id: "chur",  name: "Churros Basket",       description: "Fried dough, cinnamon sugar, chocolate dipping sauce (4 per person)", priceEach: 8,    emoji: "🍩", bgColor: "#653000", category: "Desserts", popular: true },
      { id: "tres",  name: "Tres Leches",          description: "Classic three-milk cake with fresh cream and strawberry",             priceEach: 9,    emoji: "🎂", bgColor: "#E7C8AA", category: "Desserts" },
    ],
  },
  "Assemble & Bake": {
    id: "assemble-bake", name: "Assemble & Bake", sub: "Chilli Churros & Latin Bites", bg: "#D4F5ED",
    listed: false, rating: 4.6, reviews: "800+", location: "E Shea Blvd", distance: "15 min",
    deliveryTime: "30–45 min", minOrder: 100,
    description: "Gourmet churros and Latin-inspired small plates perfect for team celebrations and casual catering events.",
    categories: ["Churros", "Savoury", "Drinks"],
    hours: "Tue–Sun  9:00 AM – 7:00 PM", phone: "+1 (602) 555-0293", website: "assembleandbake.com",
    menu: [
      { id: "chilli-chur", name: "Chilli Churros",            description: "Crispy churros dusted with chilli-lime sugar, served with salted caramel dip", priceEach: 10, emoji: "🍡", bgColor: "#CA6100", category: "Churros", popular: true,
        customizations: [{ label: "DIP", options: ["Salted Caramel", "Chocolate", "Dulce de Leche"] }] },
      { id: "clas-chur",  name: "Classic Churros",            description: "Golden fried dough, cinnamon sugar, choice of dip (5 per person)",              priceEach: 8,  emoji: "🍩", bgColor: "#FDBC2A", category: "Churros" },
      { id: "stuf-chur",  name: "Stuffed Churros",            description: "Filled with Nutella or cream cheese (3 per person)",                             priceEach: 12, emoji: "🎋", bgColor: "#E5A46C", category: "Churros",
        customizations: [{ label: "FILLING", options: ["Nutella", "Cream Cheese", "Strawberry Jam"] }] },
      { id: "empa",       name: "Beef Empanadas",             description: "Flaky pastry filled with spiced beef, olives, and egg (3 per person)",            priceEach: 11, emoji: "🥟", bgColor: "#5a3000", category: "Savoury", popular: true },
      { id: "veg-empa",   name: "Spinach & Cheese Empanadas", description: "Vegetarian, spinach, ricotta and roasted peppers",                               priceEach: 10, emoji: "🥬", bgColor: "#39B16C", category: "Savoury", dietary: ["vegetarian"] },
      { id: "horchata",   name: "Horchata Jug",               description: "Cinnamon rice milk, serves 8",                                                   priceEach: 24, emoji: "🥛", bgColor: "#E7C8AA", category: "Drinks",  dietary: ["vegan","gluten-free"] },
      { id: "agua",       name: "Agua Fresca Jug",            description: "Seasonal fruit agua fresca, serves 8",                                            priceEach: 20, emoji: "🍹", bgColor: "#D4F5ED", category: "Drinks",  dietary: ["vegan","gluten-free"] },
    ],
  },
}

function makeGenericRestaurant(name: string): RestaurantData {
  return {
    id: name.toLowerCase().replace(/\s+/g, "-"), name, sub: "Catering", bg: "#F1F2F5", listed: false,
    rating: 4.5, reviews: "500+", location: "San Francisco, CA", distance: "30 min",
    deliveryTime: "45–60 min", minOrder: 100, description: "A local catering favourite.",
    categories: ["Mains", "Sides"],
    hours: "Mon–Fri  10:00 AM – 8:00 PM", phone: "", website: "",
    menu: [
      { id: "main1", name: "Chef's Special",  description: "Ask for today's catering special", priceEach: 18, emoji: "🍽️", bgColor: "#D4F5ED", category: "Mains" },
      { id: "side1", name: "Seasonal Salad",  description: "Fresh seasonal greens",            priceEach: 8,  emoji: "🥗",  bgColor: "#39B16C", category: "Sides", dietary: ["vegan"] },
    ],
  }
}

export function getRestaurant(name: string): RestaurantData {
  return RESTAURANT_DB[name] ?? makeGenericRestaurant(name)
}

/* ─────────────────────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────────────────── */

function fmt(n: number) {
  return "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const DIETARY_COLORS: Record<string, { bg: string; fg: string; label: string }> = {
  vegan:         { bg: "#CCF8B9", fg: "#063126", label: "Vegan" },
  vegetarian:    { bg: "#D4F5ED", fg: "#073D30", label: "Veg" },
  "gluten-free": { bg: "#FFE4CC", fg: "#653000", label: "GF" },
  "nut-free":    { bg: "#FEE3FC", fg: "#8E2E84", label: "Nut-free" },
}

const SERVING_STYLES = [
  { id: "individual" as const, label: "Individual boxes", note: "Separate portion per person" },
  { id: "buffet"     as const, label: "Buffet-style",     note: "Self-serve from shared trays" },
  { id: "platter"    as const, label: "Shared platters",  note: "Large platters for the table" },
]

/** The customization that drives variant splits — PROTEIN first, else first one. */
function getSplitCustomization(item: MenuItem): MenuCustomization | null {
  if (!item.customizations?.length) return null
  return item.customizations.find((c) => c.label === "PROTEIN" || c.label === "FILLING") ?? item.customizations[0]
}

/** Customizations that are NOT the split — applied to all portions uniformly. */
function getSharedCustomizations(item: MenuItem): MenuCustomization[] {
  const split = getSplitCustomization(item)
  return item.customizations?.filter((c) => c !== split) ?? []
}

function totalVariantQty(variants: ItemVariant[]) {
  return variants.reduce((s, v) => s + v.quantity, 0)
}

/* ─────────────────────────────────────────────────────────────────────────────
   SimpleSelect — shared dropdown primitive
───────────────────────────────────────────────────────────────────────────── */

function SimpleSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((v) => !v)} className={["flex items-center gap-1 h-7 rounded-full border px-2.5 text-[11px] bg-white transition-colors", open ? "border-[#9CD8B5] shadow-[0_0_0_2px_#CEECDA]" : "border-[#D9DDE4] hover:border-[#9CD8B5]"].join(" ")}>
        <span className="font-bold text-[#68707C] uppercase text-[9px]">{label}</span>
        <span className="font-medium text-[#101828]">{value}</span>
        <RiArrowDownSLine className={["size-3 text-[#68707C] transition-transform", open ? "rotate-180" : ""].join(" ")} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-30 bg-white border border-[#D9DDE4] rounded-xl shadow-lg py-1 min-w-[130px]">
          {options.map((opt) => (
            <button key={opt} onClick={() => { onChange(opt); setOpen(false) }} className={["w-full text-left flex items-center justify-between px-3 py-1.5 text-[12px] hover:bg-[#F9FAFB]", opt === value ? "font-semibold text-[#073D30]" : "text-[#101828]"].join(" ")}>
              {opt}{opt === value && <RiCheckLine className="size-3 text-[#073D30]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   ItemCustomizationDrawer — the rich modal that opens on "Configure"
───────────────────────────────────────────────────────────────────────────── */

interface DrawerProps {
  item: MenuItem | null
  headcount: number
  existingOrder?: OrderItem
  onConfirm: (orderItem: OrderItem) => void
  onCancel: () => void
}

function ItemCustomizationDrawer({ item, headcount, existingOrder, onConfirm, onCancel }: DrawerProps) {
  const splitCustom = item ? getSplitCustomization(item) : null
  const sharedCustomDefs = item ? getSharedCustomizations(item) : []

  /* ── State ── */
  const [servingStyle, setServingStyle] = useState<"individual" | "buffet" | "platter">("individual")
  const [variants, setVariants]         = useState<ItemVariant[]>([])
  const [sharedCustoms, setSharedCustoms] = useState<{ label: string; value: string }[]>([])
  const [notes, setNotes]               = useState("")

  /* ── Initialise when item changes ── */
  useEffect(() => {
    if (!item) return
    if (existingOrder) {
      setServingStyle(existingOrder.servingStyle)
      setVariants(existingOrder.variants)
      setSharedCustoms(existingOrder.sharedCustomizations)
      setNotes(existingOrder.notes)
    } else {
      // Initialise split variants
      if (splitCustom) {
        setVariants(splitCustom.options.map((opt, i) => ({
          id: `v-${i}`, label: opt, quantity: i === 0 ? headcount : 0,
        })))
      } else {
        setVariants([{ id: "v-0", label: item.name, quantity: headcount }])
      }
      setSharedCustoms(sharedCustomDefs.map((c) => ({ label: c.label, value: c.options[0] })))
      setServingStyle("individual")
      setNotes("")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  if (!item) return null

  const totalQty   = totalVariantQty(variants)
  const totalPrice = item.priceEach * totalQty
  const covered    = totalQty >= headcount
  const hasSplit   = !!splitCustom

  function setVariantQty(id: string, qty: number) {
    setVariants((prev) => prev.map((v) => v.id === id ? { ...v, quantity: Math.max(0, qty) } : v))
  }

  function handleConfirm() {
    if (!item) return
    onConfirm({ menuItem: item!, variants, sharedCustomizations: sharedCustoms, servingStyle, notes })
  }

  function updateSharedCustom(label: string, value: string) {
    setSharedCustoms((prev) => prev.map((c) => c.label === label ? { ...c, value } : c))
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px] flex items-center justify-center p-4" onClick={onCancel}>
      <div className="w-full max-w-[540px] max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="shrink-0 flex items-start gap-4 px-6 pt-6 pb-4 border-b border-[#F1F2F5]">
          <div className="size-14 rounded-xl shrink-0 flex items-center justify-center text-3xl" style={{ backgroundColor: item.bgColor }}>
            {item.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[16px] font-bold text-[#101828] leading-snug">{item.name}</p>
            <p className="text-[12px] text-[#68707C] leading-snug mt-0.5">{item.description}</p>
            <p className="text-[13px] font-semibold text-[#073D30] mt-1">{fmt(item.priceEach)} per person</p>
          </div>
          <button onClick={onCancel} className="size-8 rounded-full flex items-center justify-center text-[#68707C] hover:bg-[#F1F2F5] transition-colors shrink-0">
            <RiCloseLine className="size-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">

          {/* 1. Serving format */}
          <div className="px-6 py-5 border-b border-[#F1F2F5]">
            <p className="text-[12px] font-bold text-[#29344A] uppercase tracking-widest mb-3">Serving format</p>
            <div className="grid grid-cols-3 gap-2">
              {SERVING_STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setServingStyle(s.id)}
                  className={["rounded-xl border-2 px-3 py-2.5 text-left transition-all", servingStyle === s.id ? "border-[#073D30] bg-[#E6F5ED]" : "border-[#F1F2F5] hover:border-[#D9DDE4]"].join(" ")}
                >
                  <p className={["text-[12px] font-semibold", servingStyle === s.id ? "text-[#073D30]" : "text-[#101828]"].join(" ")}>{s.label}</p>
                  <p className="text-[10px] text-[#68707C] mt-0.5 leading-snug">{s.note}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Quantity splits */}
          <div className="px-6 py-5 border-b border-[#F1F2F5]">
            {hasSplit ? (
              <>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[12px] font-bold text-[#29344A] uppercase tracking-widest">
                    Split by {splitCustom!.label.toLowerCase()}
                  </p>
                  <span className={["text-[11px] font-semibold rounded-full px-2 py-0.5", covered ? "bg-[#E6F5ED] text-[#067E39]" : "bg-[#FFE4CC] text-[#CA6100]"].join(" ")}>
                    {totalQty}/{headcount} {covered ? "✓ Covered" : "⚠ Partial"}
                  </span>
                </div>
                <p className="text-[11px] text-[#68707C] mb-4">
                  Allocate {headcount} portions across the options below. Mix and match to cover all dietary needs.
                </p>
                <div className="space-y-3">
                  {variants.map((v) => {
                    const lineTotal = item.priceEach * v.quantity
                    return (
                      <div key={v.id} className="flex items-center gap-3">
                        <span className="flex-1 text-[13px] font-medium text-[#101828]">{v.label}</span>
                        {/* Stepper */}
                        <div className="flex items-center gap-2">
                          <button onClick={() => setVariantQty(v.id, v.quantity - 1)} className="size-8 rounded-full border border-[#D9DDE4] flex items-center justify-center hover:border-[#9CD8B5] transition-colors text-[#68707C]">
                            <RiSubtractLine className="size-3.5" />
                          </button>
                          <span className="w-6 text-center text-[14px] font-bold text-[#101828]">{v.quantity}</span>
                          <button onClick={() => setVariantQty(v.id, v.quantity + 1)} className="size-8 rounded-full border border-[#D9DDE4] flex items-center justify-center hover:border-[#9CD8B5] transition-colors text-[#68707C]">
                            <RiAddLine className="size-3.5" />
                          </button>
                        </div>
                        <span className={["text-[12px] font-semibold w-16 text-right", v.quantity > 0 ? "text-[#29344A]" : "text-[#D0D5DD]"].join(" ")}>
                          {v.quantity > 0 ? fmt(lineTotal) : "—"}
                        </span>
                      </div>
                    )
                  })}
                </div>
                {/* Coverage bar */}
                <div className="mt-4">
                  <div className="h-1.5 rounded-full bg-[#F1F2F5] overflow-hidden">
                    <div
                      className={["h-full rounded-full transition-all", covered ? "bg-[#39B16C]" : "bg-[#CA6100]"].join(" ")}
                      style={{ width: `${Math.min(100, (totalQty / headcount) * 100)}%` }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="text-[12px] font-bold text-[#29344A] uppercase tracking-widest mb-3">Quantity</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setVariants([{ ...variants[0], quantity: Math.max(1, (variants[0]?.quantity ?? 1) - 1) }])} className="size-9 rounded-full border border-[#D9DDE4] flex items-center justify-center hover:border-[#9CD8B5] transition-colors text-[#68707C]">
                      <RiSubtractLine className="size-4" />
                    </button>
                    <span className="text-[20px] font-bold text-[#101828] w-8 text-center">{variants[0]?.quantity ?? headcount}</span>
                    <button onClick={() => setVariants([{ ...variants[0], quantity: (variants[0]?.quantity ?? headcount) + 1 }])} className="size-9 rounded-full border border-[#D9DDE4] flex items-center justify-center hover:border-[#9CD8B5] transition-colors text-[#68707C]">
                      <RiAddLine className="size-4" />
                    </button>
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-[#101828]">{variants[0]?.quantity ?? headcount} people</p>
                    <p className={["text-[11px] font-semibold", covered ? "text-[#39B16C]" : "text-[#CA6100]"].join(" ")}>
                      {covered ? "✓ Covers all guests" : `⚠ ${headcount - (variants[0]?.quantity ?? 0)} guests uncovered`}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 3. Shared customizations (applied to all portions) */}
          {sharedCustomDefs.length > 0 && (
            <div className="px-6 py-5 border-b border-[#F1F2F5]">
              <p className="text-[12px] font-bold text-[#29344A] uppercase tracking-widest mb-3">
                Options — applied to all portions
              </p>
              <div className="flex flex-wrap gap-2">
                {sharedCustomDefs.map((c) => {
                  const val = sharedCustoms.find((sc) => sc.label === c.label)?.value ?? c.options[0]
                  return <SimpleSelect key={c.label} label={c.label} value={val} options={c.options} onChange={(v) => updateSharedCustom(c.label, v)} />
                })}
              </div>
            </div>
          )}

          {/* 4. Kitchen notes */}
          <div className="px-6 py-5">
            <p className="text-[12px] font-bold text-[#29344A] uppercase tracking-widest mb-2">Kitchen notes</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Allergies, preferences, or setup instructions for this dish…"
              rows={2}
              className="w-full rounded-xl border border-[#D9DDE4] px-3 py-2.5 text-[13px] text-[#101828] placeholder:text-[#B2B8C1] resize-none outline-none focus:border-[#9CD8B5] focus:shadow-[0_0_0_2px_#CEECDA] bg-white"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 px-6 pb-6 pt-4 border-t border-[#F1F2F5]">
          <div className="flex items-center justify-between text-[13px] mb-3">
            <span className="text-[#68707C]">{totalQty} portions · {fmt(item.priceEach)} each</span>
            <span className="text-[16px] font-bold text-[#101828]">{fmt(totalPrice)}</span>
          </div>
          <div className="flex gap-3">
            <button onClick={onCancel} className="flex-1 h-11 rounded-full border border-[#D9DDE4] text-[13px] font-semibold text-[#101828] hover:bg-[#F9FAFB] transition-colors">
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={totalQty === 0}
              className="flex-1 h-11 rounded-full bg-[#073D30] text-[13px] font-semibold text-[#CCF8B9] hover:bg-[#1e6151] disabled:bg-[#F1F2F5] disabled:text-[#B2B8C1] transition-colors"
            >
              {existingOrder ? "Update order" : "Add to order"} · {fmt(totalPrice)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   MenuItemRow — left panel
───────────────────────────────────────────────────────────────────────────── */

function MenuItemRow({ item, orderItem, onConfigure }: {
  item: MenuItem
  orderItem?: OrderItem
  onConfigure: () => void
}) {
  const totalQty = orderItem ? totalVariantQty(orderItem.variants) : 0
  const isAdded  = totalQty > 0

  return (
    <div className="flex gap-4 py-4 border-b border-[#F1F2F5] last:border-0">
      <div className="size-[72px] shrink-0 rounded-xl flex items-center justify-center text-2xl select-none" style={{ backgroundColor: item.bgColor }}>
        {item.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <span className="text-[14px] font-semibold text-[#101828]">{item.name}</span>
          {item.popular && <span className="flex items-center gap-1 text-[10px] font-bold text-[#CA6100] bg-[#FFE4CC] rounded-full px-2 py-0.5"><RiFireLine className="size-2.5" />Popular</span>}
        </div>
        <p className="text-[12px] text-[#68707C] leading-snug mb-1.5">{item.description}</p>
        <div className="flex items-center gap-1.5 flex-wrap">
          {item.dietary?.map((d) => {
            const cfg = DIETARY_COLORS[d]; if (!cfg) return null
            return <span key={d} className="text-[10px] font-bold rounded-full px-2 py-0.5" style={{ backgroundColor: cfg.bg, color: cfg.fg }}>{cfg.label}</span>
          })}
        </div>
      </div>
      <div className="shrink-0 flex flex-col items-end justify-between gap-2">
        <span className="text-[13px] font-bold text-[#101828]">{fmt(item.priceEach)}<span className="text-[11px] font-normal text-[#68707C]"> ea</span></span>
        {isAdded ? (
          <button onClick={onConfigure} className="flex items-center gap-1.5 h-8 px-3 rounded-full border-2 border-[#073D30] bg-[#E6F5ED] text-[#073D30] text-[12px] font-semibold hover:bg-[#D4F5ED] transition-colors">
            <RiEditLine className="size-3.5" /> {totalQty} added
          </button>
        ) : (
          <button onClick={onConfigure} className="flex items-center gap-1.5 h-8 px-3 rounded-full bg-[#073D30] text-[#CCF8B9] text-[12px] font-semibold hover:bg-[#1e6151] transition-colors">
            <RiAddLine className="size-3.5" /> Configure
          </button>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   OrderItemCard — right panel
───────────────────────────────────────────────────────────────────────────── */

function OrderItemCard({ orderItem, onEdit, onRemove }: {
  orderItem: OrderItem
  onEdit: () => void
  onRemove: () => void
}) {
  const { menuItem, variants, sharedCustomizations, servingStyle, notes } = orderItem
  const totalQty   = totalVariantQty(variants)
  const lineTotal  = menuItem.priceEach * totalQty
  const hasVariants = variants.length > 1 || variants[0]?.label !== menuItem.name

  return (
    <div className="py-3 border-b border-[#F1F2F5] last:border-0">
      {/* Row 1: name + total + remove */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="size-6 rounded-lg shrink-0 flex items-center justify-center text-sm leading-none" style={{ backgroundColor: menuItem.bgColor }}>{menuItem.emoji}</div>
          <span className="text-[13px] font-semibold text-[#101828] truncate">{menuItem.name}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[13px] font-bold text-[#101828]">{fmt(lineTotal)}</span>
          <button onClick={onRemove} className="text-[#D0D5DD] hover:text-[#C22D2C] transition-colors text-lg leading-none px-0.5">×</button>
        </div>
      </div>

      {/* Serving style chip */}
      <div className="flex flex-wrap gap-1.5 mb-2">
        <span className="text-[10px] font-semibold text-[#68707C] bg-[#F1F2F5] rounded-full px-2 py-0.5 capitalize">
          {servingStyle === "individual" ? "Individual boxes" : servingStyle === "buffet" ? "Buffet-style" : "Shared platters"}
        </span>
        {sharedCustomizations.map((c) => (
          <span key={c.label} className="text-[10px] font-semibold text-[#68707C] bg-[#F1F2F5] rounded-full px-2 py-0.5">
            {c.label}: {c.value}
          </span>
        ))}
      </div>

      {/* Variant breakdown */}
      {hasVariants ? (
        <div className="space-y-0.5 mb-2">
          {variants.filter((v) => v.quantity > 0).map((v) => (
            <div key={v.id} className="flex items-center gap-1.5 text-[12px] text-[#68707C]">
              <span className="size-1.5 rounded-full bg-[#D0D5DD] shrink-0" />
              {v.label} <span className="font-semibold text-[#29344A]">×{v.quantity}</span>
              <span className="text-[#B2B8C1]">· {fmt(menuItem.priceEach * v.quantity)}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[12px] text-[#68707C] mb-2">{totalQty} portions</p>
      )}

      {/* Notes */}
      {notes && (
        <p className="text-[11px] text-[#68707C] italic mb-2 line-clamp-1">"{notes}"</p>
      )}

      {/* Edit button */}
      <button onClick={onEdit} className="flex items-center gap-1 text-[11px] font-semibold text-[#073D30] hover:opacity-80 transition-opacity">
        <RiEditLine className="size-3" /> Edit configuration
      </button>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   CoverageTracker — top of order panel
───────────────────────────────────────────────────────────────────────────── */

function CoverageTracker({ categories, orderItems, headcount }: {
  categories: string[]
  orderItems: OrderItem[]
  headcount: number
}) {
  if (orderItems.length === 0) return null
  return (
    <div className="px-5 py-3 border-b border-[#F1F2F5] bg-[#FAFBFC] space-y-2">
      <p className="text-[10px] font-bold text-[#68707C] uppercase tracking-widest">Course coverage</p>
      {categories.map((cat) => {
        const qty = orderItems
          .filter((oi) => oi.menuItem.category === cat)
          .reduce((s, oi) => s + totalVariantQty(oi.variants), 0)
        const pct = headcount > 0 ? Math.min(1, qty / headcount) : 0
        const covered = qty >= headcount
        const partial = qty > 0 && !covered
        return (
          <div key={cat} className="flex items-center gap-2">
            <span className="text-[11px] text-[#68707C] w-16 shrink-0 truncate">{cat}</span>
            <div className="flex-1 h-1.5 rounded-full bg-[#F1F2F5] overflow-hidden">
              <div className={["h-full rounded-full transition-all", covered ? "bg-[#39B16C]" : partial ? "bg-[#CA6100]" : "bg-[#F1F2F5]"].join(" ")} style={{ width: `${pct * 100}%` }} />
            </div>
            <span className={["text-[10px] font-bold w-12 text-right", covered ? "text-[#39B16C]" : partial ? "text-[#CA6100]" : "text-[#B2B8C1]"].join(" ")}>
              {qty === 0 ? "—" : covered ? "✓" : `${qty}/${headcount}`}
            </span>
          </div>
        )
      })}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   OrderPanel — right sidebar
───────────────────────────────────────────────────────────────────────────── */

function OrderPanel({ restaurant, orderItems, headcount, onSetHeadcount, onEditItem, onRemoveItem, onAddToCart }: {
  restaurant: RestaurantData
  orderItems: OrderItem[]
  headcount: number
  onSetHeadcount: (n: number) => void
  onEditItem: (id: string) => void
  onRemoveItem: (id: string) => void
  onAddToCart: () => void
}) {
  const [adding, setAdding] = useState(false)
  const subtotal  = orderItems.reduce((s, oi) => s + oi.menuItem.priceEach * totalVariantQty(oi.variants), 0)
  const tax       = subtotal * 0.086
  const cashback  = Math.round(subtotal * 0.055 * 100) / 100
  const total     = subtotal + tax
  const isEmpty   = orderItems.length === 0

  function handleAdd() {
    if (isEmpty) return
    setAdding(true)
    setTimeout(() => { setAdding(false); onAddToCart() }, 700)
  }

  return (
    <aside className="w-[300px] shrink-0 flex flex-col border-l border-[#F1F2F5] bg-white overflow-hidden">
      {/* Header + headcount */}
      <div className="shrink-0 px-5 py-4 border-b border-[#F1F2F5]">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[14px] font-bold text-[#101828]">Catering Order</p>
          {!isEmpty && <span className="text-[11px] text-[#68707C]">{orderItems.length} item{orderItems.length > 1 ? "s" : ""}</span>}
        </div>
        {/* Headcount input */}
        <div className="flex items-center gap-3 bg-[#FAFBFC] rounded-xl border border-[#F1F2F5] px-3 py-2">
          <RiGroupLine className="size-4 text-[#073D30] shrink-0" />
          <span className="text-[12px] text-[#68707C] flex-1">Headcount</span>
          <div className="flex items-center gap-2">
            <button onClick={() => onSetHeadcount(Math.max(1, headcount - 1))} className="size-6 rounded-full border border-[#D9DDE4] flex items-center justify-center hover:border-[#9CD8B5] transition-colors">
              <RiSubtractLine className="size-3 text-[#68707C]" />
            </button>
            <span className="text-[13px] font-bold text-[#101828] w-6 text-center">{headcount}</span>
            <button onClick={() => onSetHeadcount(headcount + 1)} className="size-6 rounded-full border border-[#D9DDE4] flex items-center justify-center hover:border-[#9CD8B5] transition-colors">
              <RiAddLine className="size-3 text-[#68707C]" />
            </button>
          </div>
        </div>
      </div>

      {/* Coverage tracker */}
      <CoverageTracker categories={restaurant.categories} orderItems={orderItems} headcount={headcount} />

      {/* Items */}
      <div className="flex-1 overflow-y-auto px-5">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-10">
            <div className="size-12 rounded-full bg-[#F1F2F5] flex items-center justify-center mb-3">
              <RiShoppingBag2Line className="size-5 text-[#D0D5DD]" />
            </div>
            <p className="text-[13px] font-semibold text-[#29344A] mb-1">Build your menu</p>
            <p className="text-[11px] text-[#B2B8C1] leading-snug">Click <strong>Configure</strong> on any dish to customise portions and splits</p>
          </div>
        ) : (
          orderItems.map((oi) => (
            <OrderItemCard
              key={oi.menuItem.id}
              orderItem={oi}
              onEdit={() => onEditItem(oi.menuItem.id)}
              onRemove={() => onRemoveItem(oi.menuItem.id)}
            />
          ))
        )}
      </div>

      {/* Summary + CTA */}
      {!isEmpty && (
        <div className="shrink-0 border-t border-[#F1F2F5] px-5 pt-4 pb-5 space-y-3">
          <div className="space-y-1.5">
            {[["Subtotal", fmt(subtotal)], ["Tax (8.6%)", fmt(tax)]].map(([l, v]) => (
              <div key={l} className="flex justify-between text-[12px]">
                <span className="text-[#68707C]">{l}</span>
                <span className="font-medium text-[#29344A]">{v}</span>
              </div>
            ))}
            <div className="flex justify-between text-[13px] pt-1 border-t border-[#F1F2F5]">
              <span className="font-bold text-[#101828]">Order Total</span>
              <span className="font-bold text-[#101828]">{fmt(total)}</span>
            </div>
            <div className="flex justify-between text-[12px]">
              <span className="text-[#39B16C] font-medium">Cashback on completion</span>
              <span className="font-bold text-[#39B16C]">+{fmt(cashback)}</span>
            </div>
          </div>
          <button onClick={handleAdd} disabled={adding} className={["w-full h-[44px] rounded-full text-[13px] font-semibold flex items-center justify-center gap-2 transition-all duration-300", adding ? "bg-[#1e6151] text-[#CCF8B9] opacity-80" : "bg-[#073D30] text-[#CCF8B9] hover:bg-[#1e6151]"].join(" ")}>
            {adding ? <><span className="size-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />Adding…</> : <><RiShoppingBag2Line className="size-4" />Add to Cart</>}
          </button>
          {restaurant.listed && <p className="text-[11px] text-[#B2B8C1] text-center">Earns {Math.round(subtotal * 16).toLocaleString()} Bites</p>}
        </div>
      )}
    </aside>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   About + Reviews tabs (unchanged)
───────────────────────────────────────────────────────────────────────────── */

function AboutTab({ restaurant }: { restaurant: RestaurantData }) {
  return (
    <div className="max-w-[600px] space-y-6 py-6 px-1">
      <div>
        <h3 className="text-[14px] font-bold text-[#101828] mb-2">About</h3>
        <p className="text-[14px] text-[#68707C] leading-relaxed">{restaurant.description}</p>
      </div>
      <div className="space-y-3">
        {[
          { icon: RiTimeLine,    label: "Hours",    value: restaurant.hours },
          { icon: RiMapPin2Line, label: "Location", value: `${restaurant.location} · ${restaurant.distance}` },
          { icon: RiPhoneLine,   label: "Phone",    value: restaurant.phone || "—" },
          { icon: RiGlobalLine,  label: "Website",  value: restaurant.website || "—" },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-3">
            <Icon className="size-4 text-[#B2B8C1] shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-bold text-[#68707C] uppercase tracking-wide">{label}</p>
              <p className="text-[13px] text-[#101828]">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const MOCK_REVIEWS = [
  { name: "Sarah M.", rating: 5, date: "March 2026", text: "Absolutely fantastic. The fajita bar was a huge hit at our company all-hands. Setup was seamless and food was served hot." },
  { name: "James K.", rating: 5, date: "February 2026", text: "Ordered the Power Bowl for 40 people — the protein split feature made it easy to cater to all dietary needs. Will definitely use again." },
  { name: "Priya L.", rating: 4, date: "January 2026", text: "Great food and reliable delivery. The enchilada platter was excellent. Slight delay but team was communicative throughout." },
]

function ReviewsTab({ restaurant }: { restaurant: RestaurantData }) {
  return (
    <div className="py-6 space-y-4 max-w-[600px]">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-[40px] font-bold text-[#101828]">{restaurant.rating}</span>
        <div>
          <div className="flex gap-0.5">{[1,2,3,4,5].map((s) => <RiStarFill key={s} className={s <= Math.round(restaurant.rating) ? "size-4 text-[#FDBC2A]" : "size-4 text-[#F1F2F5]"} />)}</div>
          <p className="text-[12px] text-[#68707C]">{restaurant.reviews} reviews</p>
        </div>
      </div>
      {MOCK_REVIEWS.map((r) => (
        <div key={r.name} className="rounded-2xl border border-[#F1F2F5] p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-[#073D30] flex items-center justify-center text-[11px] font-bold text-[#CCF8B9]">{r.name[0]}</div>
              <div><p className="text-[13px] font-semibold text-[#101828]">{r.name}</p><p className="text-[11px] text-[#68707C]">{r.date}</p></div>
            </div>
            <div className="flex gap-0.5">{[1,2,3,4,5].map((s) => <RiStarFill key={s} className={s <= r.rating ? "size-3.5 text-[#FDBC2A]" : "size-3.5 text-[#F1F2F5]"} />)}</div>
          </div>
          <p className="text-[13px] text-[#68707C] leading-relaxed">{r.text}</p>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   RestaurantProfileView — main export
───────────────────────────────────────────────────────────────────────────── */

export default function RestaurantProfileView({ restaurantName, onBack, onAddToCart }: {
  restaurantName: string
  onBack: () => void
  onAddToCart: (item: CartItem) => void
}) {
  const restaurant = getRestaurant(restaurantName)

  const [tab,             setTab]             = useState<"menu" | "about" | "reviews">("menu")
  const [activeCategory,  setActiveCategory]  = useState("All")
  const [orderItems,      setOrderItems]      = useState<OrderItem[]>([])
  const [headcount,       setHeadcount]       = useState(14)
  const [favourited,      setFavourited]      = useState(false)
  const [configuringItem, setConfiguringItem] = useState<MenuItem | null>(null)
  const [editingItemId,   setEditingItemId]   = useState<string | null>(null)

  const existingOrder = editingItemId ? orderItems.find((oi) => oi.menuItem.id === editingItemId) : undefined

  function handleConfigureItem(item: MenuItem) {
    setConfiguringItem(item)
    setEditingItemId(null)
  }

  function handleEditItem(id: string) {
    const oi = orderItems.find((o) => o.menuItem.id === id)
    if (oi) { setConfiguringItem(oi.menuItem); setEditingItemId(id) }
  }

  function handleConfirmCustomization(orderItem: OrderItem) {
    setOrderItems((prev) => {
      const existing = prev.findIndex((oi) => oi.menuItem.id === orderItem.menuItem.id)
      if (existing >= 0) {
        const updated = [...prev]
        updated[existing] = orderItem
        return updated
      }
      return [...prev, orderItem]
    })
    setConfiguringItem(null)
    setEditingItemId(null)
  }

  function handleRemoveItem(id: string) {
    setOrderItems((prev) => prev.filter((oi) => oi.menuItem.id !== id))
  }

  function handleAddToCart() {
    const subtotal = orderItems.reduce((s, oi) => s + oi.menuItem.priceEach * totalVariantQty(oi.variants), 0)
    const forCount = orderItems.reduce((max, oi) => Math.max(max, totalVariantQty(oi.variants)), 0)
    onAddToCart({
      id: `${restaurant.id}-${Date.now()}`,
      restaurantName: restaurant.name,
      restaurantSub: restaurant.sub,
      restaurantBg: restaurant.bg,
      mealItems: orderItems.flatMap((oi) =>
        oi.variants
          .filter((v) => v.quantity > 0)
          .map((v) => ({
            name: oi.variants.length > 1 ? `${oi.menuItem.name} (${v.label})` : oi.menuItem.name,
            emoji: oi.menuItem.emoji,
            bgColor: oi.menuItem.bgColor,
            quantity: v.quantity,
            priceEach: oi.menuItem.priceEach,
          }))
      ),
      forCount,
      bites: Math.round(subtotal * 16),
    })
    setOrderItems([])
  }

  const categories   = ["All", ...restaurant.categories]
  const filteredItems = activeCategory === "All" ? restaurant.menu : restaurant.menu.filter((m) => m.category === activeCategory)
  const grouped = restaurant.categories.reduce<Record<string, MenuItem[]>>((acc, cat) => {
    const items = filteredItems.filter((m) => m.category === cat)
    if (items.length) acc[cat] = items
    return acc
  }, {})

  return (
    <div className="h-full flex flex-col overflow-hidden bg-white">
      {/* Hero header */}
      <div className="shrink-0 relative">
        <div className="h-[140px] w-full relative overflow-hidden" style={{ backgroundColor: restaurant.bg }}>
          <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-20 select-none">{restaurant.menu[0]?.emoji ?? "🍽️"}</div>
          <button onClick={onBack} className="absolute top-4 left-4 size-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors">
            <RiArrowLeftSLine className="size-5 text-[#101828]" />
          </button>
          <button onClick={() => setFavourited((v) => !v)} className="absolute top-4 right-4 size-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors">
            {favourited ? <RiHeartFill className="size-5 text-[#C22D2C]" /> : <RiHeartLine className="size-5 text-[#68707C]" />}
          </button>
        </div>

        <div className="px-6 pt-4 pb-0 border-b border-[#F1F2F5]">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <h1 className="text-[20px] font-bold text-[#101828]" style={{ fontFamily: "var(--font-title)" }}>{restaurant.name}</h1>
                {restaurant.listed ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-[#033F1C] bg-[#ceecda] rounded-full px-2 py-0.5"><RiCheckLine className="size-2.5" />WeCater</span>
                ) : (
                  <span className="text-[10px] font-bold text-[#68707C] bg-[#F1F2F5] rounded-full px-2 py-0.5">External</span>
                )}
              </div>
              <p className="text-[13px] text-[#68707C]">{restaurant.sub}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <RiStarFill className="size-4 text-[#FDBC2A]" />
              <span className="text-[14px] font-bold text-[#101828]">{restaurant.rating}</span>
              <span className="text-[12px] text-[#68707C]">({restaurant.reviews})</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[12px] text-[#68707C] mb-3 flex-wrap">
            <span className="flex items-center gap-1"><RiMapPin2Line className="size-3.5" />{restaurant.location} · {restaurant.distance}</span>
            <span className="flex items-center gap-1"><RiTimeLine className="size-3.5" />{restaurant.deliveryTime}</span>
            <span>Min. {fmt(restaurant.minOrder)}</span>
            {restaurant.listed && restaurant.bites && <span className="font-semibold text-[#033F1C] bg-[#ceecda] rounded-full px-2 py-0.5">{restaurant.bites}</span>}
          </div>
          <div className="flex gap-0">
            {(["menu", "about", "reviews"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={["px-4 py-2.5 text-[13px] font-semibold capitalize border-b-2 transition-colors", tab === t ? "border-[#073D30] text-[#073D30]" : "border-transparent text-[#68707C] hover:text-[#29344A]"].join(" ")}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex overflow-hidden">
        {tab === "menu" ? (
          <>
            {/* Left: menu browser */}
            <div className="flex-1 overflow-y-auto">
              <div className="sticky top-0 z-10 bg-white border-b border-[#F1F2F5] px-6 py-3">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {categories.map((cat) => (
                    <button key={cat} onClick={() => setActiveCategory(cat)} className={["shrink-0 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-colors", activeCategory === cat ? "bg-[#073D30] text-[#CCF8B9]" : "bg-[#F1F2F5] text-[#68707C] hover:bg-[#E8EAED]"].join(" ")}>{cat}</button>
                  ))}
                </div>
              </div>
              <div className="px-6">
                {Object.entries(grouped).map(([cat, items]) => (
                  <div key={cat}>
                    <h3 className="text-[15px] font-bold text-[#101828] pt-5 pb-1">{cat}</h3>
                    {items.map((item) => (
                      <MenuItemRow
                        key={item.id}
                        item={item}
                        orderItem={orderItems.find((oi) => oi.menuItem.id === item.id)}
                        onConfigure={() => handleConfigureItem(item)}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: order panel */}
            <OrderPanel
              restaurant={restaurant}
              orderItems={orderItems}
              headcount={headcount}
              onSetHeadcount={setHeadcount}
              onEditItem={handleEditItem}
              onRemoveItem={handleRemoveItem}
              onAddToCart={handleAddToCart}
            />
          </>
        ) : tab === "about" ? (
          <div className="flex-1 overflow-y-auto px-6"><AboutTab restaurant={restaurant} /></div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6"><ReviewsTab restaurant={restaurant} /></div>
        )}
      </div>

      {/* Customization drawer */}
      <ItemCustomizationDrawer
        item={configuringItem}
        headcount={headcount}
        existingOrder={existingOrder}
        onConfirm={handleConfirmCustomization}
        onCancel={() => { setConfiguringItem(null); setEditingItemId(null) }}
      />
    </div>
  )
}

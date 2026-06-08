"use client"

import { useState } from "react"
import {
  RiCloseLine,
  RiCheckLine,
  RiCheckboxCircleFill,
  RiArrowRightSLine,
  RiArrowLeftSLine,
  RiBankCardLine,
  RiReceiptLine,
  RiMapPin2Line,
  RiCalendarEventLine,
  RiTimeLine,
  RiUserLine,
  RiPhoneLine,
  RiFileTextLine,
  RiTruckLine,
  RiShieldCheckLine,
} from "@remixicon/react"
import type { CartItem, PlacedOrder } from "../page"

/* ─────────────────────────────────────────────────────────────────────────────
   Types & helpers
───────────────────────────────────────────────────────────────────────────── */

function fmt(n: number) {
  return "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

type Step = 1 | 2 | 3 | "success"
type PayMethod = "card" | "invoice"

interface Props {
  open: boolean
  cartItems: CartItem[]
  onClose: () => void
  onOrderPlaced: (order: PlacedOrder) => void
  onTrackOrder: (orderId: string) => void
}

/* ─────────────────────────────────────────────────────────────────────────────
   Shared sub-components
───────────────────────────────────────────────────────────────────────────── */

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[11px] font-bold text-[#68707C] uppercase tracking-widest mb-1.5">
      {children}
    </label>
  )
}

const inputCls = (icon = true) =>
  [
    "w-full h-10 rounded-xl border border-[#D9DDE4] text-[13px] text-[#101828]",
    "placeholder:text-[#B2B8C1] bg-white outline-none transition-all",
    "focus:border-[#9CD8B5] focus:shadow-[0_0_0_2px_#CEECDA]",
    icon ? "pl-9 pr-3" : "px-3",
  ].join(" ")

function IconField({
  label,
  icon: Icon,
  children,
}: {
  label: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#B2B8C1] pointer-events-none" />
        {children}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Step progress indicator
───────────────────────────────────────────────────────────────────────────── */

function StepBar({ current }: { current: number }) {
  const labels = ["Review", "Delivery", "Payment"]
  return (
    <div className="flex items-center px-6 pt-5 pb-4 border-b border-[#F1F2F5]">
      {labels.map((label, i) => (
        <div key={label} className="flex items-center" style={{ flex: i < 2 ? "1" : "none" }}>
          <div className="flex items-center gap-2 shrink-0">
            <div
              className={[
                "size-7 rounded-full flex items-center justify-center text-[12px] font-bold transition-colors",
                current === i + 1 ? "bg-[#073D30] text-[#CCF8B9]"
                  : current > i + 1 ? "bg-[#39B16C] text-white"
                  : "bg-[#F1F2F5] text-[#B2B8C1]",
              ].join(" ")}
            >
              {current > i + 1 ? <RiCheckLine className="size-3.5" /> : i + 1}
            </div>
            <span
              className={[
                "text-[13px] font-semibold",
                current === i + 1 ? "text-[#101828]" : current > i + 1 ? "text-[#39B16C]" : "text-[#B2B8C1]",
              ].join(" ")}
            >
              {label}
            </span>
          </div>
          {i < 2 && (
            <div
              className={[
                "flex-1 h-px mx-4",
                current > i + 1 ? "bg-[#39B16C]" : "bg-[#F1F2F5]",
              ].join(" ")}
            />
          )}
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Step 1 — Review
───────────────────────────────────────────────────────────────────────────── */

function ReviewStep({
  cartItems,
  onNext,
}: {
  cartItems: CartItem[]
  onNext: () => void
}) {
  const subtotal = cartItems.reduce((s, ci) => s + ci.mealItems.reduce((ms, m) => ms + m.quantity * m.priceEach, 0), 0)
  const tax = subtotal * 0.086
  const cashback = Math.round(subtotal * 0.055 * 100) / 100
  const total = subtotal + tax

  return (
    <>
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
        {cartItems.map((ci) => (
          <div key={ci.id} className="rounded-2xl border border-[#F1F2F5] overflow-hidden">
            <div
              className="flex items-center gap-2.5 px-4 py-3 border-b border-[#F1F2F5]"
              style={{ backgroundColor: ci.restaurantBg + "28" }}
            >
              <div className="size-6 rounded-lg shrink-0" style={{ backgroundColor: ci.restaurantBg }} />
              <span className="text-[13px] font-bold text-[#101828]">{ci.restaurantName}</span>
              <span className="text-[12px] text-[#68707C]">— {ci.restaurantSub}</span>
            </div>
            <div className="px-4 py-3 space-y-2">
              {ci.mealItems.map((m) => (
                <div key={m.name} className="flex items-center gap-2.5">
                  <div className="size-7 rounded-lg flex items-center justify-center text-sm leading-none shrink-0" style={{ backgroundColor: m.bgColor }}>
                    {m.emoji}
                  </div>
                  <span className="flex-1 text-[13px] text-[#101828]">{m.name} <span className="text-[#68707C]">×{m.quantity}</span></span>
                  <span className="text-[13px] font-semibold text-[#29344A]">{fmt(m.quantity * m.priceEach)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Totals */}
        <div className="rounded-2xl border border-[#F1F2F5] px-4 py-4 space-y-2">
          {[
            { label: "Subtotal", value: fmt(subtotal) },
            { label: "Tax (8.6%)", value: fmt(tax) },
          ].map((r) => (
            <div key={r.label} className="flex justify-between text-[13px]">
              <span className="text-[#68707C]">{r.label}</span>
              <span className="font-medium text-[#29344A]">{r.value}</span>
            </div>
          ))}
          <div className="flex justify-between text-[14px] pt-2 border-t border-[#F1F2F5]">
            <span className="font-bold text-[#101828]">Order Total</span>
            <span className="font-bold text-[#101828]">{fmt(total)}</span>
          </div>
          <div className="flex justify-between text-[13px] pt-1">
            <span className="text-[#39B16C] font-medium">Cashback on completion</span>
            <span className="font-bold text-[#39B16C]">+{fmt(cashback)}</span>
          </div>
        </div>
      </div>

      <div className="shrink-0 px-6 py-4 border-t border-[#F1F2F5]">
        <button onClick={onNext} className="w-full h-[46px] rounded-full bg-[#073D30] text-[14px] font-semibold text-[#CCF8B9] hover:bg-[#1e6151] transition-colors flex items-center justify-center gap-2">
          Next: Delivery <RiArrowRightSLine className="size-5" />
        </button>
      </div>
    </>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Step 2 — Delivery
───────────────────────────────────────────────────────────────────────────── */

function DeliveryStep({
  form,
  onUpdate,
  onBack,
  onNext,
}: {
  form: Record<string, string>
  onUpdate: (k: string, v: string) => void
  onBack: () => void
  onNext: () => void
}) {
  return (
    <>
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
        <IconField label="Delivery address" icon={RiMapPin2Line}>
          <input value={form.address} onChange={(e) => onUpdate("address", e.target.value)} className={inputCls()} />
        </IconField>

        <div className="grid grid-cols-2 gap-3">
          <IconField label="Date" icon={RiCalendarEventLine}>
            <input type="date" value={form.date} onChange={(e) => onUpdate("date", e.target.value)} className={inputCls()} />
          </IconField>
          <IconField label="Time" icon={RiTimeLine}>
            <input value={form.time} onChange={(e) => onUpdate("time", e.target.value)} className={inputCls()} placeholder="12:30 PM" />
          </IconField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <IconField label="Contact name" icon={RiUserLine}>
            <input value={form.contactName} onChange={(e) => onUpdate("contactName", e.target.value)} className={inputCls()} />
          </IconField>
          <IconField label="Phone" icon={RiPhoneLine}>
            <input value={form.contactPhone} onChange={(e) => onUpdate("contactPhone", e.target.value)} className={inputCls()} />
          </IconField>
        </div>

        <div>
          <FieldLabel>Special instructions</FieldLabel>
          <textarea
            value={form.notes}
            onChange={(e) => onUpdate("notes", e.target.value)}
            placeholder="Setup preferences, access instructions, dietary notes…"
            rows={3}
            className="w-full rounded-xl border border-[#D9DDE4] px-3 py-2.5 text-[13px] text-[#101828] placeholder:text-[#B2B8C1] resize-none outline-none focus:border-[#9CD8B5] focus:shadow-[0_0_0_2px_#CEECDA] bg-white"
          />
        </div>
      </div>

      <div className="shrink-0 px-6 py-4 border-t border-[#F1F2F5] flex gap-3">
        <button onClick={onBack} className="h-[46px] px-5 rounded-full border border-[#D9DDE4] text-[14px] font-semibold text-[#101828] hover:bg-[#F9FAFB] transition-colors flex items-center gap-1.5">
          <RiArrowLeftSLine className="size-5" /> Back
        </button>
        <button onClick={onNext} className="flex-1 h-[46px] rounded-full bg-[#073D30] text-[14px] font-semibold text-[#CCF8B9] hover:bg-[#1e6151] transition-colors flex items-center justify-center gap-2">
          Next: Payment <RiArrowRightSLine className="size-5" />
        </button>
      </div>
    </>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Step 3 — Payment
───────────────────────────────────────────────────────────────────────────── */

function PaymentStep({
  form,
  onUpdate,
  total,
  placing,
  onBack,
  onPlace,
}: {
  form: Record<string, string>
  onUpdate: (k: string, v: string) => void
  total: number
  placing: boolean
  onBack: () => void
  onPlace: () => void
}) {
  const method = form.payMethod as PayMethod

  return (
    <>
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
        {/* Method toggle */}
        <div>
          <FieldLabel>Payment method</FieldLabel>
          <div className="flex gap-3">
            {(["card", "invoice"] as const).map((m) => (
              <button
                key={m}
                onClick={() => onUpdate("payMethod", m)}
                className={[
                  "flex-1 h-[52px] rounded-2xl border-2 flex items-center justify-center gap-2 text-[13px] font-semibold transition-all",
                  method === m
                    ? "border-[#073D30] bg-[#E6F5ED] text-[#073D30]"
                    : "border-[#F1F2F5] text-[#68707C] hover:border-[#D9DDE4]",
                ].join(" ")}
              >
                {m === "card" ? <RiBankCardLine className="size-4" /> : <RiReceiptLine className="size-4" />}
                {m === "card" ? "Pay by Card" : "Invoice (Net 30)"}
              </button>
            ))}
          </div>
        </div>

        {method === "card" ? (
          <div className="space-y-3">
            <div>
              <FieldLabel>Card number</FieldLabel>
              <div className="relative">
                <RiBankCardLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#B2B8C1]" />
                <input
                  value={form.cardNumber}
                  onChange={(e) => onUpdate("cardNumber", e.target.value)}
                  placeholder="•••• •••• •••• ••••"
                  className={inputCls()}
                  maxLength={19}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel>Expiry</FieldLabel>
                <input value={form.expiry} onChange={(e) => onUpdate("expiry", e.target.value)} placeholder="MM / YY" className={inputCls(false)} maxLength={7} />
              </div>
              <div>
                <FieldLabel>CVV</FieldLabel>
                <input value={form.cvv} onChange={(e) => onUpdate("cvv", e.target.value)} placeholder="•••" className={inputCls(false)} maxLength={4} />
              </div>
            </div>
            <IconField label="Name on card" icon={RiUserLine}>
              <input value={form.cardName} onChange={(e) => onUpdate("cardName", e.target.value)} className={inputCls()} />
            </IconField>
          </div>
        ) : (
          <div className="rounded-2xl bg-[#FAFBFC] border border-[#F1F2F5] px-5 py-4 space-y-2.5 text-[13px]">
            <p className="font-semibold text-[#101828]">Invoice payment</p>
            <p className="text-[#68707C] leading-relaxed">An invoice for <span className="font-semibold text-[#101828]">{fmt(total)}</span> will be sent to <span className="font-semibold text-[#101828]">alex@patelmedical.com</span> within 24 hours of delivery.</p>
            <div className="pt-2 space-y-1.5">
              {[["Company", "Patel Medical Group"], ["Terms", "Net 30"], ["Billing", "Same as delivery address"]].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-[#68707C]">{k}</span>
                  <span className="font-medium text-[#101828]">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security note */}
        <div className="flex items-center gap-2 text-[12px] text-[#68707C]">
          <RiShieldCheckLine className="size-4 text-[#39B16C] shrink-0" />
          Secured with 256-bit TLS encryption
        </div>
      </div>

      <div className="shrink-0 px-6 py-4 border-t border-[#F1F2F5] flex gap-3">
        <button onClick={onBack} className="h-[46px] px-5 rounded-full border border-[#D9DDE4] text-[14px] font-semibold text-[#101828] hover:bg-[#F9FAFB] transition-colors flex items-center gap-1.5">
          <RiArrowLeftSLine className="size-5" /> Back
        </button>
        <button
          onClick={onPlace}
          disabled={placing}
          className={[
            "flex-1 h-[46px] rounded-full text-[14px] font-semibold flex items-center justify-center gap-2 transition-all",
            placing ? "bg-[#1e6151] text-[#CCF8B9] opacity-80" : "bg-[#073D30] text-[#CCF8B9] hover:bg-[#1e6151]",
          ].join(" ")}
        >
          {placing ? (
            <><span className="size-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />Placing order…</>
          ) : (
            <>Place Order · {fmt(total)}</>
          )}
        </button>
      </div>
    </>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Success state
───────────────────────────────────────────────────────────────────────────── */

function SuccessState({
  orderRef,
  orderId,
  deliveryTime,
  restaurantName,
  onTrack,
  onDone,
}: {
  orderRef: string
  orderId: string
  deliveryTime: string
  restaurantName: string
  onTrack: (id: string) => void
  onDone: () => void
}) {
  return (
    <div className="flex flex-col items-center text-center px-8 py-12">
      <div className="size-20 rounded-full bg-[#E6F5ED] flex items-center justify-center mb-5">
        <RiCheckboxCircleFill className="size-10 text-[#39B16C]" />
      </div>
      <h2 className="text-[22px] font-bold text-[#101828] mb-2" style={{ fontFamily: "var(--font-title)" }}>Order Placed!</h2>
      <p className="text-[14px] text-[#68707C] leading-relaxed max-w-[300px]">
        <span className="font-semibold text-[#29344A]">{restaurantName}</span> has been notified and will confirm your order shortly.
      </p>

      <div className="mt-6 w-full max-w-[320px] rounded-2xl border border-[#F1F2F5] bg-[#FAFBFC] px-5 py-4 text-left space-y-2.5">
        {[
          { label: "Order reference", value: orderRef, mono: true },
          { label: "Estimated delivery", value: deliveryTime },
          { label: "Status", value: "Confirmed", green: true },
        ].map((r) => (
          <div key={r.label} className="flex justify-between items-center text-[13px]">
            <span className="text-[#68707C]">{r.label}</span>
            <span className={["font-semibold", r.mono ? "font-mono text-[#101828]" : r.green ? "text-[#067E39]" : "text-[#101828]"].join(" ")}>{r.value}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-8 w-full max-w-[320px]">
        <button onClick={onDone} className="flex-1 h-10 rounded-xl border border-[#D9DDE4] text-[13px] font-semibold text-[#101828] hover:bg-[#F9FAFB] transition-colors">
          Done
        </button>
        <button onClick={() => onTrack(orderId)} className="flex-1 h-10 rounded-xl bg-[#073D30] text-[13px] font-semibold text-[#CCF8B9] hover:bg-[#1e6151] transition-colors flex items-center justify-center gap-1.5">
          <RiTruckLine className="size-4" /> Track Order
        </button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   CheckoutModal (main export)
───────────────────────────────────────────────────────────────────────────── */

export default function CheckoutModal({ open, cartItems, onClose, onOrderPlaced, onTrackOrder }: Props) {
  const [step, setStep] = useState<Step>(1)
  const [placing, setPlacing] = useState(false)
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null)
  const [form, setForm] = useState({
    address: "4540 E Shea Blvd, Suite 220, Phoenix AZ 86383",
    date: "",
    time: "12:30 PM",
    contactName: "Alex Hermana",
    contactPhone: "+1 (602) 555-0182",
    notes: "",
    payMethod: "card",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "Dr. Patel Green",
  })
  const [orderRef] = useState(() => "WC-2026-" + String(Math.floor(1000 + Math.random() * 9000)))

  const subtotal = cartItems.reduce((s, ci) => s + ci.mealItems.reduce((ms, m) => ms + m.quantity * m.priceEach, 0), 0)
  const tax = subtotal * 0.086
  const cashback = Math.round(subtotal * 0.055 * 100) / 100
  const total = subtotal + tax

  function update(k: string, v: string) {
    setForm((prev) => ({ ...prev, [k]: v }))
  }

  function handlePlace() {
    setPlacing(true)
    setTimeout(() => {
      const primary = cartItems[0]
      const order: PlacedOrder = {
        id: orderRef,
        ref: orderRef,
        restaurantName: primary?.restaurantName ?? "Restaurant",
        restaurantSub: primary?.restaurantSub ?? "",
        restaurantBg: primary?.restaurantBg ?? "#D4F5ED",
        mealItems: primary?.mealItems ?? [],
        forCount: primary?.forCount ?? 0,
        bites: cartItems.reduce((s, ci) => s + ci.bites, 0),
        subtotal,
        tax,
        total,
        cashback,
        deliveryDate: form.date || "Today",
        deliveryTime: form.time,
        deliveryAddress: form.address,
        contactName: form.contactName,
        contactPhone: form.contactPhone,
        notes: form.notes,
        status: "preparing",
        placedAt: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      }
      setPlacedOrder(order)
      onOrderPlaced(order)
      setPlacing(false)
      setStep("success")
    }, 1800)
  }

  function handleClose() {
    setStep(1)
    setPlacing(false)
    setPlacedOrder(null)
    onClose()
  }

  function handleTrack(id: string) {
    handleClose()
    onTrackOrder(id)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px] flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-[560px] max-h-[92vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {step !== "success" && (
          <div className="shrink-0">
            <div className="flex items-center justify-between px-6 pt-5 pb-3">
              <h2 className="text-[16px] font-bold text-[#101828]">Checkout</h2>
              <button onClick={handleClose} className="size-8 rounded-full flex items-center justify-center text-[#68707C] hover:bg-[#F1F2F5] transition-colors">
                <RiCloseLine className="size-5" />
              </button>
            </div>
            <StepBar current={step as number} />
          </div>
        )}

        {/* Body */}
        {step === 1 && <ReviewStep cartItems={cartItems} onNext={() => setStep(2)} />}
        {step === 2 && <DeliveryStep form={form} onUpdate={update} onBack={() => setStep(1)} onNext={() => setStep(3)} />}
        {step === 3 && (
          <PaymentStep form={form} onUpdate={update} total={total} placing={placing} onBack={() => setStep(2)} onPlace={handlePlace} />
        )}
        {step === "success" && placedOrder && (
          <SuccessState
            orderRef={placedOrder.ref}
            orderId={placedOrder.id}
            deliveryTime={`${placedOrder.deliveryDate} at ${placedOrder.deliveryTime}`}
            restaurantName={placedOrder.restaurantName}
            onTrack={handleTrack}
            onDone={handleClose}
          />
        )}
      </div>
    </div>
  )
}

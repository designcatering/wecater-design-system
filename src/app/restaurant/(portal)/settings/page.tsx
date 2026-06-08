"use client"

import { useState, useRef } from "react"
import { Camera, Upload, ChevronDown, Eye, EyeOff } from "lucide-react"
import {
  RiUser3Line,
  RiMapPinLine,
  RiBellLine,
  RiShieldLine,
  RiCheckLine,
  RiAlertLine,
  RiRestaurantLine,
  RiGlobalLine,
  RiInstagramLine,
  RiLoader4Line,
} from "@remixicon/react"
import { InputField } from "@/components/ui/input-field"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/* ─── Shared primitives ──────────────────────────────────────────────── */

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[14px] font-medium text-[#68707c]">{label}</label>
      {children}
      {hint && <p className="text-[12px] text-[#b2b8c1]">{hint}</p>}
    </div>
  )
}

function Textarea({ value, onChange, placeholder, rows = 4, maxLength }: {
  value: string; onChange: (v: string) => void
  placeholder?: string; rows?: number; maxLength?: number
}) {
  return (
    <div className="w-full bg-white border border-[#d9dde4] rounded-2xl shadow-[0_1px_2px_0_#1018280d] px-4 py-3 focus-within:border-[#9cd8b5] focus-within:shadow-[0_0_0_2px_#ceecda] transition-all">
      <textarea
        value={value} rows={rows} maxLength={maxLength}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none resize-none text-[15px] font-medium text-[#29344a] placeholder:text-[#68707c] leading-relaxed"
      />
      {maxLength && (
        <p className={cn("text-right text-[11px] mt-1", value.length >= maxLength ? "text-[#c22d2c]" : "text-[#b2b8c1]")}>
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  )
}

function Select({ value, onChange, options, placeholder }: {
  value: string; onChange: (v: string) => void
  options: { value: string; label: string }[]; placeholder?: string
}) {
  return (
    <div className="flex items-center w-full bg-white border border-[#d9dde4] rounded-full shadow-[0_1px_2px_0_#1018280d] px-4 py-[11px] focus-within:border-[#9cd8b5] focus-within:shadow-[0_0_0_2px_#ceecda] transition-all">
      <select
        value={value} onChange={e => onChange(e.target.value)}
        className="flex-1 bg-transparent outline-none appearance-none text-[15px] font-medium cursor-pointer text-[#29344a]"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown className="size-4 text-[#68707c] shrink-0 pointer-events-none" />
    </div>
  )
}

function Toggle({ checked, onChange, label, description }: {
  checked: boolean; onChange: (v: boolean) => void; label: string; description?: string
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <div
        role="switch" aria-checked={checked} onClick={() => onChange(!checked)}
        className={cn("relative shrink-0 w-[44px] h-[24px] rounded-full transition-colors duration-200 mt-0.5",
          checked ? "bg-[#073d30]" : "bg-[#d9dde4]")}
      >
        <div className={cn("absolute top-[2px] size-[20px] rounded-full bg-white shadow-sm transition-transform duration-200",
          checked ? "translate-x-[20px]" : "translate-x-[2px]")} />
      </div>
      <div>
        <p className="text-[14px] font-semibold text-[#101828]">{label}</p>
        {description && <p className="text-[13px] text-[#68707c] mt-0.5">{description}</p>}
      </div>
    </label>
  )
}

function TagPicker({ options, selected, onChange }: {
  options: string[]; selected: string[]; onChange: (v: string[]) => void
}) {
  const toggle = (t: string) =>
    onChange(selected.includes(t) ? selected.filter(s => s !== t) : [...selected, t])
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(tag => (
        <button key={tag} type="button" onClick={() => toggle(tag)}
          className={cn(
            "px-3 py-1.5 rounded-full text-[13px] font-semibold border transition-all",
            selected.includes(tag)
              ? "bg-[#073d30] text-white border-[#073d30]"
              : "bg-white text-[#68707c] border-[#d9dde4] hover:border-[#073d30] hover:text-[#073d30]"
          )}>
          {tag}
        </button>
      ))}
    </div>
  )
}

/* ─── Section wrapper ────────────────────────────────────────────────── */

function Section({ title, description, children }: {
  title: string; description?: string; children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-[240px_1fr] gap-8 py-8 border-b border-[#f1f2f5] last:border-0">
      <div>
        <p className="text-[15px] font-bold text-[#101828]">{title}</p>
        {description && <p className="text-[13px] text-[#68707c] mt-1 leading-relaxed">{description}</p>}
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  )
}

/* ─── Save button with states ────────────────────────────────────────── */

type SaveState = "idle" | "saving" | "saved"

function SaveBar({ state, onSave }: { state: SaveState; onSave: () => void }) {
  return (
    <div className="flex items-center justify-between pt-6 mt-2">
      {state === "saved" ? (
        <p className="flex items-center gap-1.5 text-[13px] font-semibold text-[#39b16c]">
          <RiCheckLine className="size-4" /> Changes saved
        </p>
      ) : (
        <p className="text-[13px] text-[#b2b8c1]">Unsaved changes</p>
      )}
      <Button onClick={onSave} disabled={state === "saving"}>
        {state === "saving"
          ? <span className="flex items-center gap-2"><RiLoader4Line className="size-4 animate-spin" />Saving…</span>
          : "Save changes"}
      </Button>
    </div>
  )
}

/* ─── Hours grid (reused from onboarding) ────────────────────────────── */

type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"
interface DayHours { open: string; close: string; closed: boolean }
const DAYS: { key: DayKey; label: string }[] = [
  { key: "mon", label: "Monday" },    { key: "tue", label: "Tuesday" },
  { key: "wed", label: "Wednesday" }, { key: "thu", label: "Thursday" },
  { key: "fri", label: "Friday" },    { key: "sat", label: "Saturday" },
  { key: "sun", label: "Sunday" },
]

/* ─── Initial data ───────────────────────────────────────────────────── */

const CUISINE_OPTIONS = [
  "American","Italian","Mexican","Asian","Mediterranean","BBQ & Grills",
  "Indian","Japanese","Greek","Middle Eastern","Latin American","Seafood",
  "Vegan & Plant-Based","Breakfast & Brunch","Sandwiches & Wraps","Pizza","Fusion",
]

const DEFAULT_HOURS = DAYS.reduce((acc, { key }) => ({
  ...acc, [key]: { open: "09:00", close: "18:00", closed: key === "sun" },
}), {} as Record<DayKey, DayHours>)

/* ─── Page ───────────────────────────────────────────────────────────── */

type Tab = "profile" | "location" | "notifications" | "account"

const TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: "profile",       label: "Restaurant profile", icon: RiRestaurantLine },
  { key: "location",      label: "Location & hours",   icon: RiMapPinLine     },
  { key: "notifications", label: "Notifications",      icon: RiBellLine       },
  { key: "account",       label: "Account",            icon: RiUser3Line      },
]

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("profile")

  /* ── Profile state ─────────────────────────────────────────────── */
  const [profile, setProfile] = useState({
    restaurantName: "La Cocina Catering",
    tagline:        "Authentic Mexican & Latin flavors for every occasion",
    cuisineTypes:   ["Mexican", "Latin American"],
    description:    "La Cocina Catering brings the vibrant flavors of Mexico and Latin America to your corporate events, team lunches, and celebrations. Founded in 2018, we've served over 500 events across the Chicago metro area — from intimate team lunches to 200-person galas. Every dish is made from scratch using sourced-local produce and traditional recipes passed down through generations.",
    website:        "https://lacocinacatering.com",
    instagram:      "@lacocinacatering",
    yearsInOperation: "6-10",
    avgOrderMin:    "13",
    avgOrderMax:    "22",
  })
  const [profileSave, setProfileSave] = useState<SaveState>("idle")

  /* ── Location state ────────────────────────────────────────────── */
  const [location, setLocation] = useState({
    street: "1234 W Randolph St", unit: "Suite 12", city: "Chicago",
    state: "IL", zip: "60607",
    deliveryAvailable: true, deliveryRadius: "25",
    pickupAvailable: true,
    advanceNoticeHours: "48", minHeadcount: "10", maxHeadcount: "200",
    serviceNotes: "We serve the greater Chicago metro area including Evanston, Oak Park, and Naperville.",
    hours: DEFAULT_HOURS,
  })
  const [locationSave, setLocationSave] = useState<SaveState>("idle")

  /* ── Notifications state ───────────────────────────────────────── */
  const [notifs, setNotifs] = useState({
    newOrderSMS:      true,  newOrderEmail:     true,
    orderReminderSMS: true,  orderReminderEmail: false,
    messageSMS:       true,  messageEmail:      true,
    weeklySummary:    true,  marketingTips:     false,
  })
  const [notifSave, setNotifSave] = useState<SaveState>("idle")

  /* ── Account state ─────────────────────────────────────────────── */
  const [account, setAccount] = useState({
    firstName: "Maria", lastName: "Rodriguez",
    email: "maria@lacocinacatering.com", phone: "(312) 555-0192",
    currentPassword: "", newPassword: "", confirmPassword: "",
  })
  const [accountSave, setAccountSave] = useState<SaveState>("idle")
  const [showPw, setShowPw] = useState(false)

  /* ── Save helper ───────────────────────────────────────────────── */
  const save = (setter: (s: SaveState) => void) => {
    setter("saving")
    setTimeout(() => { setter("saved"); setTimeout(() => setter("idle"), 3000) }, 900)
  }

  const updateHours = (day: DayKey, patch: Partial<DayHours>) =>
    setLocation(l => ({ ...l, hours: { ...l.hours, [day]: { ...l.hours[day], ...patch } } }))

  /* ── Render ────────────────────────────────────────────────────── */
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#d9dde4] px-8 py-4">
        <h1 className="text-[18px] font-bold text-[#101828] font-[family-name:var(--font-title)]">Settings</h1>
        <p className="text-[13px] text-[#68707c]">Manage your restaurant profile, hours, and account preferences</p>
      </div>

      <div className="flex">
        {/* Left tab nav */}
        <nav className="w-[220px] shrink-0 px-4 py-6 border-r border-[#f1f2f5] min-h-[calc(100vh-65px)] sticky top-[65px] self-start">
          <ul className="space-y-0.5">
            {TABS.map(({ key, label, icon: Icon }) => (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => setTab(key)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium text-left transition-colors",
                    tab === key
                      ? "bg-[#f0faf5] text-[#073d30] font-semibold"
                      : "text-[#68707c] hover:bg-[#fafbfc] hover:text-[#101828]"
                  )}
                >
                  <Icon className={cn("size-4 shrink-0", tab === key ? "text-[#073d30]" : "text-[#68707c]")} />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right content */}
        <div className="flex-1 px-10 py-6 max-w-[820px]">

          {/* ── PROFILE TAB ─────────────────────────────────────── */}
          {tab === "profile" && (
            <div>
              {/* Cover + Logo */}
              <Section title="Brand visuals" description="Your logo and cover image appear on your public listing.">
                <div className="space-y-3">
                  {/* Cover photo */}
                  <div>
                    <p className="text-[13px] font-semibold text-[#29344a] mb-2">Cover photo</p>
                    <div className="relative h-[140px] bg-gradient-to-br from-[#073d30] to-[#1e6151] rounded-2xl overflow-hidden flex items-center justify-center group cursor-pointer hover:opacity-90 transition-opacity">
                      <div className="text-center">
                        <Camera className="size-6 text-white/60 mx-auto mb-1" />
                        <p className="text-white/70 text-[12px] font-medium">Click to change cover photo</p>
                      </div>
                      <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full text-white text-[11px] font-semibold">
                        Recommended: 1200×630px
                      </div>
                    </div>
                  </div>
                  {/* Logo */}
                  <div className="flex items-center gap-4">
                    <div className="relative size-[72px] rounded-2xl bg-[#073d30] flex items-center justify-center text-white font-bold text-[22px] cursor-pointer hover:opacity-80 transition-opacity group shrink-0">
                      LC
                      <div className="absolute inset-0 bg-black/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Upload className="size-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-[#101828]">Restaurant logo</p>
                      <p className="text-[12px] text-[#68707c] mt-0.5">Click to upload · PNG or JPG · Min 400×400px</p>
                      <button type="button" className="text-[12px] font-semibold text-[#073d30] hover:underline mt-1">
                        Upload new logo
                      </button>
                    </div>
                  </div>
                </div>
              </Section>

              {/* Core identity */}
              <Section title="Restaurant identity" description="This is how you appear in search results and on your listing page.">
                <InputField
                  label="Restaurant name"
                  value={profile.restaurantName}
                  onChange={e => setProfile(p => ({ ...p, restaurantName: e.target.value }))}
                />
                <InputField
                  label="Tagline"
                  placeholder="A short, catchy phrase shown below your name"
                  value={profile.tagline}
                  onChange={e => setProfile(p => ({ ...p, tagline: e.target.value }))}
                  hint="Max 80 characters · shown in search results"
                />
                <Field label="Cuisine types" hint="Select all that apply — used for search filters">
                  <TagPicker
                    options={CUISINE_OPTIONS}
                    selected={profile.cuisineTypes}
                    onChange={v => setProfile(p => ({ ...p, cuisineTypes: v }))}
                  />
                </Field>
                <Field label="About your restaurant" hint="Minimum 80 characters · This is the first thing clients read">
                  <Textarea
                    value={profile.description}
                    onChange={v => setProfile(p => ({ ...p, description: v }))}
                    placeholder="Tell corporate clients what makes your catering exceptional…"
                    rows={5}
                    maxLength={600}
                  />
                </Field>
              </Section>

              {/* Capacity & pricing */}
              <Section title="Experience & capacity" description="Helps match you with the right clients and set accurate expectations.">
                <Field label="Years in operation">
                  <Select
                    value={profile.yearsInOperation}
                    onChange={v => setProfile(p => ({ ...p, yearsInOperation: v }))}
                    options={[
                      { value: "less-than-1", label: "Less than 1 year" },
                      { value: "1-2",  label: "1–2 years" },
                      { value: "3-5",  label: "3–5 years" },
                      { value: "6-10", label: "6–10 years" },
                      { value: "11-20",label: "11–20 years" },
                      { value: "20+",  label: "20+ years"  },
                    ]}
                  />
                </Field>
                <div>
                  <p className="text-[14px] font-medium text-[#68707c] mb-2">Average order size (price per person)</p>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Minimum ($)" type="number" value={profile.avgOrderMin}
                      onChange={e => setProfile(p => ({ ...p, avgOrderMin: e.target.value }))} />
                    <InputField label="Maximum ($)" type="number" value={profile.avgOrderMax}
                      onChange={e => setProfile(p => ({ ...p, avgOrderMax: e.target.value }))} />
                  </div>
                </div>
              </Section>

              {/* Online presence */}
              <Section title="Online presence" description="Optional — boosts client trust and listing performance.">
                <div className="flex items-center gap-3 px-4 py-[11px] bg-white border border-[#d9dde4] rounded-full shadow-[0_1px_2px_0_#1018280d] focus-within:border-[#9cd8b5] focus-within:shadow-[0_0_0_2px_#ceecda] transition-all">
                  <RiGlobalLine className="size-5 text-[#68707c] shrink-0" />
                  <input
                    value={profile.website} type="url"
                    onChange={e => setProfile(p => ({ ...p, website: e.target.value }))}
                    placeholder="https://yourrestaurant.com"
                    className="flex-1 bg-transparent outline-none text-[15px] font-medium text-[#29344a] placeholder:text-[#68707c]"
                  />
                </div>
                <div className="flex items-center gap-3 px-4 py-[11px] bg-white border border-[#d9dde4] rounded-full shadow-[0_1px_2px_0_#1018280d] focus-within:border-[#9cd8b5] focus-within:shadow-[0_0_0_2px_#ceecda] transition-all">
                  <RiInstagramLine className="size-5 text-[#68707c] shrink-0" />
                  <input
                    value={profile.instagram}
                    onChange={e => setProfile(p => ({ ...p, instagram: e.target.value }))}
                    placeholder="@yourhandle"
                    className="flex-1 bg-transparent outline-none text-[15px] font-medium text-[#29344a] placeholder:text-[#68707c]"
                  />
                </div>
              </Section>

              <SaveBar state={profileSave} onSave={() => save(setProfileSave)} />
            </div>
          )}

          {/* ── LOCATION TAB ────────────────────────────────────── */}
          {tab === "location" && (
            <div>
              <Section title="Kitchen address" description="Your food preparation location. Not shown publicly — used for delivery range calculations.">
                <div className="grid grid-cols-[1fr_130px] gap-4">
                  <InputField label="Street address" value={location.street}
                    onChange={e => setLocation(l => ({ ...l, street: e.target.value }))} />
                  <InputField label="Unit / Suite" value={location.unit}
                    onChange={e => setLocation(l => ({ ...l, unit: e.target.value }))} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <InputField label="City" value={location.city}
                    onChange={e => setLocation(l => ({ ...l, city: e.target.value }))} />
                  <Field label="State">
                    <Select value={location.state}
                      onChange={v => setLocation(l => ({ ...l, state: v }))}
                      options={["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA"].map(s => ({ value: s, label: s }))}
                    />
                  </Field>
                  <InputField label="ZIP code" value={location.zip}
                    onChange={e => setLocation(l => ({ ...l, zip: e.target.value }))} />
                </div>
              </Section>

              <Section title="Service types" description="You can turn delivery or pickup on/off at any time.">
                <Toggle checked={location.deliveryAvailable} label="Delivery available"
                  description="You deliver catering orders to client locations"
                  onChange={v => setLocation(l => ({ ...l, deliveryAvailable: v }))} />
                {location.deliveryAvailable && (
                  <div className="ml-[56px]">
                    <Field label="Delivery radius" hint="Maximum distance you'll travel">
                      <Select value={location.deliveryRadius}
                        onChange={v => setLocation(l => ({ ...l, deliveryRadius: v }))}
                        options={[
                          { value: "10", label: "10 miles" }, { value: "15", label: "15 miles" },
                          { value: "25", label: "25 miles" }, { value: "35", label: "35 miles" },
                          { value: "50", label: "50 miles" }, { value: "100", label: "100 miles" },
                        ]}
                      />
                    </Field>
                  </div>
                )}
                <Toggle checked={location.pickupAvailable} label="Client pickup available"
                  description="Clients can collect their order from your location"
                  onChange={v => setLocation(l => ({ ...l, pickupAvailable: v }))} />
              </Section>

              <Section title="Operating hours" description="The days and times you accept catering orders.">
                <div className="rounded-2xl border border-[#d9dde4] overflow-hidden">
                  <div className="grid grid-cols-[140px_1fr_1fr_90px] px-4 py-2.5 bg-[#fafbfc] border-b border-[#d9dde4]">
                    {["Day","Opens","Closes","Status"].map(h => (
                      <p key={h} className="text-[11px] font-bold text-[#b2b8c1] uppercase tracking-wide">{h}</p>
                    ))}
                  </div>
                  {DAYS.map(({ key, label }, idx) => {
                    const h = location.hours[key]
                    return (
                      <div key={key} className={cn(
                        "grid grid-cols-[140px_1fr_1fr_90px] px-4 py-3 items-center",
                        idx < 6 && "border-b border-[#f1f2f5]",
                        h.closed && "bg-[#fafbfc] opacity-60"
                      )}>
                        <span className={cn("text-[14px] font-semibold", h.closed ? "text-[#b2b8c1]" : "text-[#29344a]")}>{label}</span>
                        <input type="time" value={h.open} disabled={h.closed}
                          onChange={e => updateHours(key, { open: e.target.value })}
                          className={cn("text-[14px] bg-transparent outline-none font-medium w-fit", h.closed ? "text-[#b2b8c1]" : "text-[#29344a]")} />
                        <input type="time" value={h.close} disabled={h.closed}
                          onChange={e => updateHours(key, { close: e.target.value })}
                          className={cn("text-[14px] bg-transparent outline-none font-medium w-fit", h.closed ? "text-[#b2b8c1]" : "text-[#29344a]")} />
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <div role="switch" aria-checked={!h.closed}
                            onClick={() => updateHours(key, { closed: !h.closed })}
                            className={cn("relative w-[34px] h-[18px] rounded-full transition-colors cursor-pointer",
                              !h.closed ? "bg-[#073d30]" : "bg-[#d9dde4]")}>
                            <div className={cn("absolute top-[2px] size-[14px] rounded-full bg-white shadow-sm transition-transform",
                              !h.closed ? "translate-x-[16px]" : "translate-x-[2px]")} />
                          </div>
                          <span className={cn("text-[12px] font-medium", h.closed ? "text-[#b2b8c1]" : "text-[#39b16c]")}>
                            {h.closed ? "Closed" : "Open"}
                          </span>
                        </label>
                      </div>
                    )
                  })}
                </div>
              </Section>

              <Section title="Order requirements" description="Limits visible to clients when browsing your listing.">
                <Field label="Advance order notice required">
                  <Select value={location.advanceNoticeHours}
                    onChange={v => setLocation(l => ({ ...l, advanceNoticeHours: v }))}
                    options={[
                      { value: "12",  label: "12 hours"           },
                      { value: "24",  label: "24 hours (1 day)"   },
                      { value: "48",  label: "48 hours (2 days)"  },
                      { value: "72",  label: "72 hours (3 days)"  },
                      { value: "168", label: "1 week"             },
                    ]}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Minimum headcount" type="number" value={location.minHeadcount}
                    onChange={e => setLocation(l => ({ ...l, minHeadcount: e.target.value }))}
                    hint="Smallest group you'll cater" />
                  <InputField label="Maximum headcount" type="number" value={location.maxHeadcount}
                    onChange={e => setLocation(l => ({ ...l, maxHeadcount: e.target.value }))}
                    hint="Largest group you can accommodate" />
                </div>
                <Field label="Service area notes" hint="Optional — helps clients understand your coverage">
                  <Textarea value={location.serviceNotes} rows={2}
                    onChange={v => setLocation(l => ({ ...l, serviceNotes: v }))}
                    placeholder="e.g. We serve Chicago and all suburbs within 25 miles…" />
                </Field>
              </Section>

              <SaveBar state={locationSave} onSave={() => save(setLocationSave)} />
            </div>
          )}

          {/* ── NOTIFICATIONS TAB ───────────────────────────────── */}
          {tab === "notifications" && (
            <div>
              <Section title="Order alerts" description="Get notified the moment a new order comes in or changes status.">
                <div className="space-y-5">
                  <div className="grid grid-cols-[1fr_auto_auto] gap-x-8 gap-y-4 items-center">
                    <span className="text-[11px] font-bold text-[#b2b8c1] uppercase tracking-widest"></span>
                    <span className="text-[12px] font-bold text-[#68707c] text-center">SMS</span>
                    <span className="text-[12px] font-bold text-[#68707c] text-center">Email</span>

                    {[
                      { label: "New order received",     desc: "When a customer places an order",              sms: "newOrderSMS" as const,      email: "newOrderEmail" as const      },
                      { label: "Order reminder",         desc: "24 hours before a scheduled delivery",         sms: "orderReminderSMS" as const,  email: "orderReminderEmail" as const  },
                    ].map(row => (
                      <>
                        <div key={row.label}>
                          <p className="text-[14px] font-semibold text-[#101828]">{row.label}</p>
                          <p className="text-[12px] text-[#68707c]">{row.desc}</p>
                        </div>
                        <div className="flex justify-center">
                          <div role="switch" aria-checked={notifs[row.sms]}
                            onClick={() => setNotifs(n => ({ ...n, [row.sms]: !n[row.sms] }))}
                            className={cn("relative w-[44px] h-[24px] rounded-full transition-colors cursor-pointer",
                              notifs[row.sms] ? "bg-[#073d30]" : "bg-[#d9dde4]")}>
                            <div className={cn("absolute top-[2px] size-[20px] rounded-full bg-white shadow-sm transition-transform",
                              notifs[row.sms] ? "translate-x-[20px]" : "translate-x-[2px]")} />
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <div role="switch" aria-checked={notifs[row.email]}
                            onClick={() => setNotifs(n => ({ ...n, [row.email]: !n[row.email] }))}
                            className={cn("relative w-[44px] h-[24px] rounded-full transition-colors cursor-pointer",
                              notifs[row.email] ? "bg-[#073d30]" : "bg-[#d9dde4]")}>
                            <div className={cn("absolute top-[2px] size-[20px] rounded-full bg-white shadow-sm transition-transform",
                              notifs[row.email] ? "translate-x-[20px]" : "translate-x-[2px]")} />
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </Section>

              <Section title="Messages" description="Notifications for customer messages and replies.">
                <Toggle checked={notifs.messageSMS} label="SMS notifications for new messages"
                  onChange={v => setNotifs(n => ({ ...n, messageSMS: v }))} />
                <Toggle checked={notifs.messageEmail} label="Email notifications for new messages"
                  onChange={v => setNotifs(n => ({ ...n, messageEmail: v }))} />
              </Section>

              <Section title="Reports & tips" description="Periodic summaries and platform tips.">
                <Toggle checked={notifs.weeklySummary} label="Weekly performance summary"
                  description="Revenue, orders, and review highlights every Monday morning"
                  onChange={v => setNotifs(n => ({ ...n, weeklySummary: v }))} />
                <Toggle checked={notifs.marketingTips} label="Marketing tips & platform updates"
                  description="Best practices for getting more orders on weCater"
                  onChange={v => setNotifs(n => ({ ...n, marketingTips: v }))} />
              </Section>

              <SaveBar state={notifSave} onSave={() => save(setNotifSave)} />
            </div>
          )}

          {/* ── ACCOUNT TAB ─────────────────────────────────────── */}
          {tab === "account" && (
            <div>
              <Section title="Personal information" description="Your name and contact details as the account owner.">
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="First name" value={account.firstName}
                    onChange={e => setAccount(a => ({ ...a, firstName: e.target.value }))} />
                  <InputField label="Last name" value={account.lastName}
                    onChange={e => setAccount(a => ({ ...a, lastName: e.target.value }))} />
                </div>
                <InputField label="Email address" type="email" value={account.email}
                  onChange={e => setAccount(a => ({ ...a, email: e.target.value }))}
                  hint="Used for login and account notifications" />
                <InputField label="Phone number" type="tel" value={account.phone}
                  onChange={e => setAccount(a => ({ ...a, phone: e.target.value }))}
                  hint="Used for order SMS alerts" />
              </Section>

              <Section title="Change password" description="Use a strong password with uppercase, numbers and symbols.">
                <div className="relative">
                  <InputField label="Current password" type={showPw ? "text" : "password"}
                    value={account.currentPassword} placeholder="Enter current password"
                    onChange={e => setAccount(a => ({ ...a, currentPassword: e.target.value }))} />
                  <button type="button" onClick={() => setShowPw(v => !v)}
                    className="absolute right-4 bottom-[13px] text-[#68707c] hover:text-[#101828] transition-colors">
                    {showPw ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
                <InputField label="New password" type="password" value={account.newPassword}
                  placeholder="Min. 8 characters"
                  onChange={e => setAccount(a => ({ ...a, newPassword: e.target.value }))} />
                <InputField label="Confirm new password" type="password" value={account.confirmPassword}
                  placeholder="Re-enter new password"
                  onChange={e => setAccount(a => ({ ...a, confirmPassword: e.target.value }))}
                  error={!!(account.confirmPassword && account.confirmPassword !== account.newPassword)}
                  errorMessage={account.confirmPassword && account.confirmPassword !== account.newPassword
                    ? "Passwords do not match" : undefined} />
              </Section>

              <SaveBar state={accountSave} onSave={() => save(setAccountSave)} />

              {/* Danger zone */}
              <div className="mt-8 p-5 border border-[#e89a9a] rounded-2xl bg-[#ffdcdc]/30">
                <div className="flex items-start gap-3">
                  <RiAlertLine className="size-5 text-[#c22d2c] mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-[14px] font-bold text-[#c22d2c]">Danger zone</p>
                    <p className="text-[13px] text-[#68707c] mt-1 mb-4">
                      Pausing your listing hides it from all search results. You can reactivate at any time from this page.
                    </p>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm"
                        className="border-[#e89a9a] text-[#c22d2c] hover:bg-[#ffdcdc]">
                        Pause listing
                      </Button>
                      <Button variant="destructive" size="sm">
                        Deactivate account
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

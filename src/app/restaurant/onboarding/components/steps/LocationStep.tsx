"use client"

import { InputField } from "@/components/ui/input-field"
import { type LocationData, type DayKey, US_STATES } from "../../types"
import { StepLayout, SectionHeading, Divider } from "../StepLayout"
import { StepHeader, Toggle, SelectField, TextareaField } from "../FormFields"
import { cn } from "@/lib/utils"

const DAYS: { key: DayKey; label: string; short: string }[] = [
  { key: "mon", label: "Monday",    short: "Mon" },
  { key: "tue", label: "Tuesday",   short: "Tue" },
  { key: "wed", label: "Wednesday", short: "Wed" },
  { key: "thu", label: "Thursday",  short: "Thu" },
  { key: "fri", label: "Friday",    short: "Fri" },
  { key: "sat", label: "Saturday",  short: "Sat" },
  { key: "sun", label: "Sunday",    short: "Sun" },
]

const ADVANCE_OPTIONS = [
  { value: "12",  label: "12 hours" },
  { value: "24",  label: "24 hours (1 day)" },
  { value: "48",  label: "48 hours (2 days)" },
  { value: "72",  label: "72 hours (3 days)" },
  { value: "120", label: "5 business days" },
  { value: "168", label: "1 week" },
]

const RADIUS_OPTIONS = [
  { value: "10",   label: "10 miles" },
  { value: "15",   label: "15 miles" },
  { value: "25",   label: "25 miles" },
  { value: "35",   label: "35 miles" },
  { value: "50",   label: "50 miles" },
  { value: "100",  label: "100 miles" },
]

const STATE_OPTIONS = US_STATES.map(s => ({ value: s, label: s }))

interface LocationStepProps {
  data: LocationData
  onChange: (patch: Partial<LocationData>) => void
  onNext: () => void
  onBack: () => void
}

export function LocationStep({ data, onChange, onNext, onBack }: LocationStepProps) {
  const updateHours = (day: DayKey, patch: Partial<typeof data.hours.mon>) => {
    onChange({ hours: { ...data.hours, [day]: { ...data.hours[day], ...patch } } })
  }

  return (
    <StepLayout step={3} onNext={onNext} onBack={onBack}>
      <StepHeader
        step={3}
        title="Location & operations"
        subtitle="Your kitchen address, service area, and operating hours. Clients use this to check availability and delivery range."
      />

      {/* Kitchen address */}
      <SectionHeading
        title="Kitchen / preparation address"
        description="This is where food is prepared. It won't be shown publicly — only used for delivery range calculations."
      />

      <div className="space-y-4">
        <div className="grid grid-cols-[1fr_auto] gap-4">
          <InputField
            label="Street address"
            placeholder="1234 W Randolph St"
            value={data.street}
            onChange={e => onChange({ street: e.target.value })}
          />
          <InputField
            label="Unit / Suite"
            placeholder="Suite 2B"
            value={data.unit}
            onChange={e => onChange({ unit: e.target.value })}
            wrapperClassName="w-[120px]"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <InputField
              label="City"
              placeholder="Chicago"
              value={data.city}
              onChange={e => onChange({ city: e.target.value })}
            />
          </div>
          <SelectField
            label="State"
            value={data.state}
            onChange={state => onChange({ state })}
            options={STATE_OPTIONS}
            placeholder="State"
          />
          <InputField
            label="ZIP code"
            placeholder="60607"
            value={data.zip}
            onChange={e => onChange({ zip: e.target.value })}
          />
        </div>
      </div>

      <Divider />

      {/* Service types */}
      <SectionHeading
        title="Service types"
        description="Select at least one. You can update these at any time from your dashboard."
      />

      <div className="space-y-5 mb-6">
        <Toggle
          checked={data.deliveryAvailable}
          onChange={deliveryAvailable => onChange({ deliveryAvailable })}
          label="Delivery available"
          description="You deliver catering orders to client locations"
        />
        {data.deliveryAvailable && (
          <div className="ml-[56px]">
            <SelectField
              label="Delivery radius"
              value={data.deliveryRadius}
              onChange={deliveryRadius => onChange({ deliveryRadius })}
              options={RADIUS_OPTIONS}
              hint="Maximum distance you'll travel for delivery"
            />
          </div>
        )}

        <Toggle
          checked={data.pickupAvailable}
          onChange={pickupAvailable => onChange({ pickupAvailable })}
          label="Client pickup available"
          description="Clients can pick up their order from your location"
        />
      </div>

      <Divider />

      {/* Operating hours */}
      <SectionHeading
        title="Operating hours"
        description="The days and times you're available to fulfill catering orders."
      />

      <div className="rounded-2xl border border-[#d9dde4] overflow-hidden">
        {/* Header row */}
        <div className="grid grid-cols-[120px_1fr_1fr_80px] gap-0 px-4 py-2.5 bg-[#fafbfc] border-b border-[#d9dde4]">
          <span className="text-[11px] font-bold text-[#b2b8c1] uppercase tracking-wide">Day</span>
          <span className="text-[11px] font-bold text-[#b2b8c1] uppercase tracking-wide">Opens</span>
          <span className="text-[11px] font-bold text-[#b2b8c1] uppercase tracking-wide">Closes</span>
          <span className="text-[11px] font-bold text-[#b2b8c1] uppercase tracking-wide">Status</span>
        </div>

        {DAYS.map(({ key, label }, idx) => {
          const h = data.hours[key]
          return (
            <div
              key={key}
              className={cn(
                "grid grid-cols-[120px_1fr_1fr_80px] gap-0 px-4 py-3 items-center",
                idx < DAYS.length - 1 && "border-b border-[#f1f2f5]",
                h.closed && "bg-[#fafbfc] opacity-60"
              )}
            >
              <span className={cn(
                "text-[14px] font-semibold",
                h.closed ? "text-[#b2b8c1]" : "text-[#29344a]"
              )}>
                {label}
              </span>

              <input
                type="time"
                value={h.open}
                disabled={h.closed}
                onChange={e => updateHours(key, { open: e.target.value })}
                className={cn(
                  "text-[14px] bg-transparent outline-none font-medium",
                  h.closed ? "text-[#b2b8c1]" : "text-[#29344a]"
                )}
              />

              <input
                type="time"
                value={h.close}
                disabled={h.closed}
                onChange={e => updateHours(key, { close: e.target.value })}
                className={cn(
                  "text-[14px] bg-transparent outline-none font-medium",
                  h.closed ? "text-[#b2b8c1]" : "text-[#29344a]"
                )}
              />

              <label className="flex items-center gap-1.5 cursor-pointer">
                <div
                  role="switch"
                  aria-checked={!h.closed}
                  onClick={() => updateHours(key, { closed: !h.closed })}
                  className={cn(
                    "relative w-[34px] h-[18px] rounded-full transition-colors duration-200 cursor-pointer",
                    !h.closed ? "bg-[#073d30]" : "bg-[#d9dde4]"
                  )}
                >
                  <div className={cn(
                    "absolute top-[2px] size-[14px] rounded-full bg-white shadow-sm transition-transform duration-200",
                    !h.closed ? "translate-x-[16px]" : "translate-x-[2px]"
                  )} />
                </div>
                <span className={cn(
                  "text-[12px] font-medium",
                  h.closed ? "text-[#b2b8c1]" : "text-[#39b16c]"
                )}>
                  {h.closed ? "Closed" : "Open"}
                </span>
              </label>
            </div>
          )
        })}
      </div>

      <Divider />

      {/* Order requirements */}
      <SectionHeading
        title="Order requirements"
        description="These limits help clients understand your capacity before they request a quote."
      />

      <div className="space-y-5">
        <SelectField
          label="Advance order notice required"
          value={data.advanceNoticeHours}
          onChange={advanceNoticeHours => onChange({ advanceNoticeHours })}
          options={ADVANCE_OPTIONS}
          hint="How far in advance must clients place their order?"
        />

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Minimum headcount"
            type="number"
            placeholder="10"
            value={data.minHeadcount}
            onChange={e => onChange({ minHeadcount: e.target.value })}
            hint="Smallest group you cater to"
          />
          <InputField
            label="Maximum headcount"
            type="number"
            placeholder="200"
            value={data.maxHeadcount}
            onChange={e => onChange({ maxHeadcount: e.target.value })}
            hint="Largest group you can accommodate"
          />
        </div>

        <TextareaField
          label="Service area notes"
          placeholder="e.g. We serve the greater Chicago metro area including Evanston, Oak Park, and Naperville. Additional mileage fees apply beyond 30 miles."
          value={data.serviceNotes}
          onChange={serviceNotes => onChange({ serviceNotes })}
          rows={3}
          hint="Optional — helps clients understand coverage nuances"
        />
      </div>
    </StepLayout>
  )
}

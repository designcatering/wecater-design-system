"use client"

import { Camera, ImageIcon } from "lucide-react"
import { InputField } from "@/components/ui/input-field"
import { type ProfileData, CUISINE_OPTIONS } from "../../types"
import { StepLayout, SectionHeading, Divider } from "../StepLayout"
import { StepHeader, TextareaField, TagSelector, SelectField } from "../FormFields"

const YEAR_OPTIONS = [
  { value: "less-than-1", label: "Less than 1 year" },
  { value: "1-2",         label: "1–2 years" },
  { value: "3-5",         label: "3–5 years" },
  { value: "6-10",        label: "6–10 years" },
  { value: "11-20",       label: "11–20 years" },
  { value: "20+",         label: "20+ years" },
]

function PhotoUploadZone({
  label,
  subtitle,
  icon: Icon,
}: {
  label: string
  subtitle: string
  icon: React.ElementType
}) {
  return (
    <label className="flex flex-col items-center justify-center gap-2 bg-[#fafbfc] border-2 border-dashed border-[#d9dde4] rounded-2xl p-6 cursor-pointer hover:border-[#9cd8b5] hover:bg-[#f0faf5] transition-colors group">
      <div className="size-12 rounded-full bg-[#f1f2f5] flex items-center justify-center group-hover:bg-[#e6f5ed] transition-colors">
        <Icon className="size-6 text-[#68707c] group-hover:text-[#073d30] transition-colors" />
      </div>
      <div className="text-center">
        <p className="text-[13px] font-semibold text-[#29344a]">
          {label} <span className="text-[#073d30]">Browse</span>
        </p>
        <p className="text-[12px] text-[#b2b8c1] mt-0.5">{subtitle}</p>
      </div>
      <input type="file" accept=".jpg,.jpeg,.png,.webp" className="sr-only" />
    </label>
  )
}

interface ProfileStepProps {
  data: ProfileData
  onChange: (patch: Partial<ProfileData>) => void
  onNext: () => void
  onBack: () => void
}

export function ProfileStep({ data, onChange, onNext, onBack }: ProfileStepProps) {
  return (
    <StepLayout step={2} onNext={onNext} onBack={onBack}>
      <StepHeader
        step={2}
        title="Your restaurant profile"
        subtitle="This is your public listing on weCater. Make it compelling — clients browse profiles before placing orders."
      />

      {/* Brand visuals */}
      <SectionHeading
        title="Brand visuals"
        description="A logo and cover photo significantly increase booking rates. Recommended: 1:1 logo, 16:9 cover."
      />
      <div className="grid grid-cols-2 gap-4 mb-8">
        <PhotoUploadZone
          label="Upload logo ·"
          subtitle="PNG, JPG · 400×400px min"
          icon={Camera}
        />
        <PhotoUploadZone
          label="Upload cover ·"
          subtitle="PNG, JPG · 1200×630px min"
          icon={ImageIcon}
        />
      </div>

      <Divider />

      {/* Core identity */}
      <SectionHeading
        title="Restaurant identity"
        description="How your restaurant will appear to corporate clients searching for catering."
      />

      <div className="space-y-5">
        <InputField
          label="Restaurant name"
          placeholder="La Cocina Catering"
          value={data.restaurantName}
          onChange={e => onChange({ restaurantName: e.target.value })}
          hint="Use your official trading name as it appears on your business registration"
        />

        <InputField
          label="Tagline"
          placeholder="Authentic Mexican flavors for every occasion"
          value={data.tagline}
          onChange={e => onChange({ tagline: e.target.value })}
          hint="Shown below your restaurant name in search results · Max 80 characters"
        />

        <TagSelector
          label="Cuisine types"
          options={CUISINE_OPTIONS}
          selected={data.cuisineTypes}
          onChange={cuisineTypes => onChange({ cuisineTypes })}
          hint="Select all that apply. This powers search filters for clients."
          maxSelect={6}
        />

        <TextareaField
          label="About your restaurant"
          placeholder="Tell corporate clients what makes your catering exceptional — your story, specialties, sourcing practices, or signature dishes. The more detail the better."
          value={data.description}
          onChange={description => onChange({ description })}
          rows={5}
          maxLength={600}
          hint="Minimum 80 characters. This is the first thing clients read."
        />
      </div>

      <Divider />

      {/* Experience & capacity */}
      <SectionHeading
        title="Experience & order capacity"
        description="Helps us match you with the right clients and set accurate expectations."
      />

      <div className="space-y-5">
        <SelectField
          label="Years in operation"
          value={data.yearsInOperation}
          onChange={yearsInOperation => onChange({ yearsInOperation })}
          options={YEAR_OPTIONS}
          placeholder="Select experience"
        />

        <div>
          <p className="text-[14px] font-medium text-[#68707c] mb-2">
            Average order size (price per person)
          </p>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Minimum"
              type="number"
              placeholder="$8"
              value={data.avgOrderMin}
              onChange={e => onChange({ avgOrderMin: e.target.value })}
              hint="Lowest price per person"
            />
            <InputField
              label="Maximum"
              type="number"
              placeholder="$25"
              value={data.avgOrderMax}
              onChange={e => onChange({ avgOrderMax: e.target.value })}
              hint="Highest price per person"
            />
          </div>
        </div>
      </div>

      <Divider />

      {/* Online presence (optional) */}
      <SectionHeading
        title="Online presence"
        description="Optional — adding links increases trust and bookings by up to 34%."
      />

      <div className="space-y-5">
        <InputField
          label="Website URL"
          type="url"
          placeholder="https://lacocinacatering.com"
          value={data.website}
          onChange={e => onChange({ website: e.target.value })}
          hint="Optional"
        />
      </div>
    </StepLayout>
  )
}

"use client"

import { RiShieldCheckLine, RiLockLine } from "@remixicon/react"
import { InputField } from "@/components/ui/input-field"
import { type VerificationData, US_STATES } from "../../types"
import { StepLayout, SectionHeading, Divider } from "../StepLayout"
import { StepHeader, SelectField, FileUploadZone, InfoBanner } from "../FormFields"
import { useState } from "react"

const BUSINESS_TYPES = [
  { value: "sole-proprietor",  label: "Sole Proprietor / Individual" },
  { value: "llc",              label: "Limited Liability Company (LLC)" },
  { value: "s-corp",           label: "S Corporation" },
  { value: "c-corp",           label: "C Corporation" },
  { value: "partnership",      label: "General Partnership" },
  { value: "nonprofit",        label: "Non-Profit Organization" },
]

const STATE_OPTIONS = US_STATES.map(s => ({ value: s, label: s }))

interface DocumentState {
  businessLicense: string | null
  foodPermit: string | null
  insurance: string | null
  w9: string | null
}

interface VerificationStepProps {
  data: VerificationData
  onChange: (patch: Partial<VerificationData>) => void
  onNext: () => void
  onBack: () => void
}

export function VerificationStep({ data, onChange, onNext, onBack }: VerificationStepProps) {
  const [docs, setDocs] = useState<DocumentState>({
    businessLicense: null,
    foodPermit: null,
    insurance: null,
    w9: null,
  })

  const setDoc = (key: keyof DocumentState, val: string | null) =>
    setDocs(d => ({ ...d, [key]: val }))

  return (
    <StepLayout step={4} onNext={onNext} onBack={onBack}>
      <StepHeader
        step={4}
        title="Legal & compliance"
        subtitle="weCater is required to verify all restaurant partners before activating their listing. Your information is encrypted and handled securely."
      />

      {/* Security assurance */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 flex gap-3 items-start p-4 bg-[#fafbfc] border border-[#d9dde4] rounded-2xl">
          <RiShieldCheckLine className="size-5 text-[#39b16c] mt-0.5 shrink-0" />
          <div>
            <p className="text-[13px] font-semibold text-[#101828]">256-bit encryption</p>
            <p className="text-[12px] text-[#68707c] mt-0.5">All documents stored on encrypted servers</p>
          </div>
        </div>
        <div className="flex-1 flex gap-3 items-start p-4 bg-[#fafbfc] border border-[#d9dde4] rounded-2xl">
          <RiLockLine className="size-5 text-[#39b16c] mt-0.5 shrink-0" />
          <div>
            <p className="text-[13px] font-semibold text-[#101828]">Access-controlled</p>
            <p className="text-[12px] text-[#68707c] mt-0.5">Only reviewed by our compliance team</p>
          </div>
        </div>
      </div>

      {/* Business entity */}
      <SectionHeading
        title="Business entity"
        description="Enter information exactly as it appears on your official business registration."
      />

      <div className="space-y-5">
        <SelectField
          label="Business structure"
          value={data.businessType}
          onChange={businessType => onChange({ businessType })}
          options={BUSINESS_TYPES}
          placeholder="Select your business type"
          hint="This affects your tax classification on weCater"
        />

        <InputField
          label="Legal business name"
          placeholder="La Cocina Catering LLC"
          value={data.legalName}
          onChange={e => onChange({ legalName: e.target.value })}
          hint="Must match your EIN/tax documentation exactly"
        />

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="EIN / Tax ID number"
            placeholder="XX-XXXXXXX"
            value={data.ein}
            onChange={e => onChange({
              ein: e.target.value
                .replace(/[^0-9]/g, "")
                .replace(/^(\d{2})(\d)/, "$1-$2")
                .slice(0, 10)
            })}
            hint="9-digit Employer Identification Number"
          />
          <SelectField
            label="State of registration"
            value={data.stateOfRegistration}
            onChange={stateOfRegistration => onChange({ stateOfRegistration })}
            options={STATE_OPTIONS}
            placeholder="State"
          />
        </div>
      </div>

      <Divider />

      {/* Licenses */}
      <SectionHeading
        title="Licenses & permits"
        description="All catering partners must hold a valid business license and food handler permit in their operating state."
      />

      <InfoBanner>
        Expired licenses will delay your application. If your license is pending renewal, upload the current one and note the renewal date.
      </InfoBanner>

      <div className="space-y-5">
        {/* Business license */}
        <div className="p-5 bg-[#fafbfc] border border-[#d9dde4] rounded-2xl space-y-4">
          <p className="text-[14px] font-bold text-[#101828]">Business License</p>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="License number"
              placeholder="BL-2024-XXXXXXX"
              value={data.licenseNumber}
              onChange={e => onChange({ licenseNumber: e.target.value })}
            />
            <InputField
              label="Expiration date"
              type="date"
              value={data.licenseExpiry}
              onChange={e => onChange({ licenseExpiry: e.target.value })}
            />
          </div>
          <FileUploadZone
            label="Upload business license"
            accept=".pdf,.jpg,.jpeg,.png"
            fileName={docs.businessLicense}
            onFileChange={v => setDoc("businessLicense", v)}
            required
          />
        </div>

        {/* Food handler permit */}
        <div className="p-5 bg-[#fafbfc] border border-[#d9dde4] rounded-2xl space-y-4">
          <p className="text-[14px] font-bold text-[#101828]">Food Handler Permit / Food Safety Certificate</p>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Permit number"
              placeholder="FH-XXXXXXX"
              value={data.foodPermitNumber}
              onChange={e => onChange({ foodPermitNumber: e.target.value })}
            />
            <InputField
              label="Expiration date"
              type="date"
              value={data.foodPermitExpiry}
              onChange={e => onChange({ foodPermitExpiry: e.target.value })}
            />
          </div>
          <FileUploadZone
            label="Upload food handler permit"
            accept=".pdf,.jpg,.jpeg,.png"
            fileName={docs.foodPermit}
            onFileChange={v => setDoc("foodPermit", v)}
            required
          />
        </div>

        {/* Insurance */}
        <div className="p-5 bg-[#fafbfc] border border-[#d9dde4] rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-bold text-[#101828]">General Liability Insurance</p>
            <span className="text-[11px] font-semibold text-[#68707c] bg-[#f1f2f5] px-2 py-1 rounded-full">
              Recommended
            </span>
          </div>
          <p className="text-[13px] text-[#68707c]">
            Not required for approval, but required for orders over 50 people or at corporate venues.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Policy number"
              placeholder="GL-XXXXXXXXXX"
              value={data.insurancePolicyNumber}
              onChange={e => onChange({ insurancePolicyNumber: e.target.value })}
            />
            <InputField
              label="Policy expiration"
              type="date"
              value={data.insuranceExpiry}
              onChange={e => onChange({ insuranceExpiry: e.target.value })}
            />
          </div>
          <FileUploadZone
            label="Upload certificate of insurance (COI)"
            accept=".pdf"
            fileName={docs.insurance}
            onFileChange={v => setDoc("insurance", v)}
          />
        </div>

        {/* W-9 */}
        <div className="p-5 bg-[#fafbfc] border border-[#d9dde4] rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-bold text-[#101828]">W-9 Form</p>
            <span className="text-[11px] font-semibold text-[#ca6100] bg-[#ffe4cc] px-2 py-1 rounded-full">
              Required before first payout
            </span>
          </div>
          <p className="text-[13px] text-[#68707c]">
            Required for IRS reporting. You can submit this after your listing is approved — we&apos;ll remind you before your first order ships.
          </p>
          <FileUploadZone
            label="Upload W-9"
            accept=".pdf"
            fileName={docs.w9}
            onFileChange={v => setDoc("w9", v)}
          />
        </div>
      </div>
    </StepLayout>
  )
}

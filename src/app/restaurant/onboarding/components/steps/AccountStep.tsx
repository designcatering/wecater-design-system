"use client"

import { useState } from "react"
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react"
import { InputField } from "@/components/ui/input-field"
import { cn } from "@/lib/utils"
import { type AccountData } from "../../types"
import { StepLayout, SectionHeading } from "../StepLayout"
import { StepHeader, InfoBanner } from "../FormFields"

interface AccountStepProps {
  data: AccountData
  onChange: (patch: Partial<AccountData>) => void
  onNext: () => void
  onBack: () => void
}

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+ chars",   pass: password.length >= 8 },
    { label: "Uppercase",  pass: /[A-Z]/.test(password) },
    { label: "Number",     pass: /\d/.test(password) },
    { label: "Symbol",     pass: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) },
  ]
  const score = checks.filter(c => c.pass).length
  const [label, color] = [
    ["", "#d9dde4"],
    ["Weak",   "#c22d2c"],
    ["Fair",   "#ca6100"],
    ["Good",   "#39b16c"],
    ["Strong", "#073d30"],
  ][score]

  return (
    <div className="space-y-2 -mt-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="flex-1 h-1.5 rounded-full transition-colors duration-300"
            style={{ backgroundColor: i <= score ? color : "#f1f2f5" }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-3 flex-wrap">
          {checks.map(c => (
            <span
              key={c.label}
              className={cn(
                "text-[11px] font-medium flex items-center gap-1",
                c.pass ? "text-[#39b16c]" : "text-[#b2b8c1]"
              )}
            >
              <span className="font-bold">{c.pass ? "✓" : "○"}</span>
              {c.label}
            </span>
          ))}
        </div>
        {label && (
          <span className="text-[12px] font-bold" style={{ color }}>{label}</span>
        )}
      </div>
    </div>
  )
}

export function AccountStep({ data, onChange, onNext, onBack }: AccountStepProps) {
  const [showPw,  setShowPw]  = useState(false)
  const [showCpw, setShowCpw] = useState(false)

  const passwordMismatch = !!(data.confirmPassword && data.confirmPassword !== data.password)

  return (
    <StepLayout step={1} onNext={onNext} onBack={onBack}>
      <StepHeader
        step={1}
        title="Create your account"
        subtitle="You'll use these credentials to manage orders, update your menu, and access your payouts dashboard."
      />

      <InfoBanner>
        Your account information is encrypted and never shared. You can update your contact details anytime from your settings.
      </InfoBanner>

      <div className="space-y-5">
        {/* Name row */}
        <SectionHeading title="Personal information" description="This identifies you as the account owner." />
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="First name"
            placeholder="Maria"
            value={data.firstName}
            onChange={e => onChange({ firstName: e.target.value })}
          />
          <InputField
            label="Last name"
            placeholder="Rodriguez"
            value={data.lastName}
            onChange={e => onChange({ lastName: e.target.value })}
          />
        </div>

        <InputField
          label="Email address"
          type="email"
          placeholder="maria@restaurant.com"
          value={data.email}
          onChange={e => onChange({ email: e.target.value })}
          hint="This will be your login and primary contact email"
        />

        <InputField
          label="Phone number"
          type="tel"
          placeholder="(312) 555-0192"
          value={data.phone}
          onChange={e => onChange({ phone: e.target.value })}
          hint="For order notifications and account security (SMS)"
        />

        {/* Divider */}
        <div className="pt-2">
          <hr className="border-[#f1f2f5] mb-6" />
          <SectionHeading
            title="Password"
            description="Choose a strong password to secure your account."
          />
        </div>

        {/* Password */}
        <div className="relative">
          <InputField
            label="Password"
            type={showPw ? "text" : "password"}
            placeholder="Min. 8 characters"
            value={data.password}
            onChange={e => onChange({ password: e.target.value })}
          />
          <button
            type="button"
            onClick={() => setShowPw(v => !v)}
            aria-label={showPw ? "Hide password" : "Show password"}
            className="absolute right-4 bottom-[13px] text-[#68707c] hover:text-[#101828] transition-colors"
          >
            {showPw ? <RiEyeOffLine className="size-5" /> : <RiEyeLine className="size-5" />}
          </button>
        </div>

        {data.password && <PasswordStrength password={data.password} />}

        {/* Confirm password */}
        <div className="relative">
          <InputField
            label="Confirm password"
            type={showCpw ? "text" : "password"}
            placeholder="Re-enter your password"
            value={data.confirmPassword}
            onChange={e => onChange({ confirmPassword: e.target.value })}
            error={passwordMismatch}
            errorMessage={passwordMismatch ? "Passwords do not match" : undefined}
          />
          <button
            type="button"
            onClick={() => setShowCpw(v => !v)}
            aria-label={showCpw ? "Hide password" : "Show password"}
            className="absolute right-4 bottom-[13px] text-[#68707c] hover:text-[#101828] transition-colors"
          >
            {showCpw ? <RiEyeOffLine className="size-5" /> : <RiEyeLine className="size-5" />}
          </button>
        </div>

        {/* Terms agreement */}
        <div className="pt-2">
          <hr className="border-[#f1f2f5] mb-5" />
          <label className="flex items-start gap-3 cursor-pointer">
            <div
              role="checkbox"
              aria-checked={data.agreeToTerms}
              onClick={() => onChange({ agreeToTerms: !data.agreeToTerms })}
              className={cn(
                "mt-0.5 size-5 rounded-md flex items-center justify-center border-2 shrink-0 transition-colors",
                data.agreeToTerms
                  ? "bg-[#073d30] border-[#073d30]"
                  : "border-[#d9dde4] bg-white"
              )}
            >
              {data.agreeToTerms && (
                <svg className="size-3 text-white" fill="none" viewBox="0 0 12 12">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <p className="text-[14px] text-[#68707c] leading-relaxed">
              I agree to weCater&apos;s{" "}
              <a href="#" className="text-[#073d30] font-semibold hover:underline">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-[#073d30] font-semibold hover:underline">Privacy Policy</a>.
              I understand that my application will be reviewed by the weCater team before my listing goes live.
            </p>
          </label>
        </div>
      </div>
    </StepLayout>
  )
}

"use client"

import { ChevronDown, Upload, X } from "lucide-react"
import { RiCheckLine } from "@remixicon/react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

/* ─── SelectField ─────────────────────────────────────────────────────── */

interface SelectFieldProps {
  label?: string
  hint?: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
  disabled?: boolean
  wrapperClassName?: string
}

export function SelectField({
  label,
  hint,
  value,
  onChange,
  options,
  placeholder = "Select…",
  disabled,
  wrapperClassName,
}: SelectFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2 w-full", wrapperClassName)}>
      {label && (
        <Label className="text-[14px] font-medium text-[#68707c]">{label}</Label>
      )}
      <div
        className={cn(
          "flex items-center w-full bg-white border border-[#d9dde4] rounded-full",
          "shadow-[0_1px_2px_0_#1018280d] px-4 py-[11px]",
          "focus-within:border-[#9cd8b5] focus-within:shadow-[0_0_0_2px_#ceecda]",
          "transition-[border-color,box-shadow] duration-150",
          disabled && "bg-[#f1f2f5] border-[#f1f2f5] pointer-events-none"
        )}
      >
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
          className={cn(
            "flex-1 bg-transparent outline-none appearance-none cursor-pointer",
            "text-[16px] font-medium leading-[1.5] tracking-[-0.16px]",
            value ? "text-[#29344a]" : "text-[#68707c]",
            disabled && "text-[#b2b8c1]"
          )}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown className="shrink-0 size-5 text-[#68707c] pointer-events-none" />
      </div>
      {hint && (
        <p className="text-[14px] text-[#68707c]">{hint}</p>
      )}
    </div>
  )
}

/* ─── TextareaField ───────────────────────────────────────────────────── */

interface TextareaFieldProps {
  label?: string
  hint?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
  maxLength?: number
  disabled?: boolean
  wrapperClassName?: string
}

export function TextareaField({
  label,
  hint,
  value,
  onChange,
  placeholder,
  rows = 4,
  maxLength,
  disabled,
  wrapperClassName,
}: TextareaFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2 w-full", wrapperClassName)}>
      {label && (
        <Label className="text-[14px] font-medium text-[#68707c]">{label}</Label>
      )}
      <div
        className={cn(
          "w-full bg-white border border-[#d9dde4] rounded-2xl",
          "shadow-[0_1px_2px_0_#1018280d] px-4 py-3",
          "focus-within:border-[#9cd8b5] focus-within:shadow-[0_0_0_2px_#ceecda]",
          "transition-[border-color,box-shadow] duration-150",
          disabled && "bg-[#f1f2f5] border-[#f1f2f5]"
        )}
      >
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          disabled={disabled}
          className={cn(
            "w-full bg-transparent outline-none resize-none",
            "text-[16px] font-medium leading-relaxed tracking-[-0.16px]",
            "placeholder:text-[#68707c]",
            value ? "text-[#29344a]" : "text-[#68707c]",
            disabled && "text-[#b2b8c1] placeholder:text-[#b2b8c1]"
          )}
        />
      </div>
      <div className="flex justify-between">
        {hint && <p className="text-[13px] text-[#68707c]">{hint}</p>}
        {maxLength && (
          <p className={cn(
            "text-[12px] ml-auto",
            value.length >= maxLength ? "text-[#c22d2c]" : "text-[#b2b8c1]"
          )}>
            {value.length}/{maxLength}
          </p>
        )}
      </div>
    </div>
  )
}

/* ─── Toggle ──────────────────────────────────────────────────────────── */

interface ToggleProps {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  description?: string
  disabled?: boolean
}

export function Toggle({ checked, onChange, label, description, disabled }: ToggleProps) {
  return (
    <label className={cn("flex items-start gap-3 cursor-pointer", disabled && "opacity-50 pointer-events-none")}>
      <div
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative shrink-0 w-[44px] h-[24px] rounded-full transition-colors duration-200 mt-0.5",
          checked ? "bg-[#073d30]" : "bg-[#d9dde4]"
        )}
      >
        <div
          className={cn(
            "absolute top-[2px] size-[20px] rounded-full bg-white shadow-sm transition-transform duration-200",
            checked ? "translate-x-[20px]" : "translate-x-[2px]"
          )}
        />
      </div>
      <div>
        <p className="text-[14px] font-semibold text-[#101828]">{label}</p>
        {description && (
          <p className="text-[13px] text-[#68707c] mt-0.5">{description}</p>
        )}
      </div>
    </label>
  )
}

/* ─── Checkbox ────────────────────────────────────────────────────────── */

interface CheckboxProps {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  disabled?: boolean
}

export function Checkbox({ checked, onChange, label, disabled }: CheckboxProps) {
  return (
    <label className={cn("flex items-center gap-2.5 cursor-pointer select-none", disabled && "opacity-50 pointer-events-none")}>
      <div
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "size-[18px] rounded flex items-center justify-center border-2 shrink-0 transition-colors",
          checked ? "bg-[#073d30] border-[#073d30]" : "border-[#d9dde4] bg-white"
        )}
      >
        {checked && <RiCheckLine className="size-[11px] text-white" />}
      </div>
      <span className="text-[14px] text-[#29344a]">{label}</span>
    </label>
  )
}

/* ─── TagSelector ─────────────────────────────────────────────────────── */

interface TagSelectorProps {
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  label?: string
  hint?: string
  maxSelect?: number
}

export function TagSelector({ options, selected, onChange, label, hint, maxSelect }: TagSelectorProps) {
  const toggle = (tag: string) => {
    if (selected.includes(tag)) {
      onChange(selected.filter(t => t !== tag))
    } else if (!maxSelect || selected.length < maxSelect) {
      onChange([...selected, tag])
    }
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <Label className="text-[14px] font-medium text-[#68707c]">{label}</Label>}
      <div className="flex flex-wrap gap-2">
        {options.map(tag => {
          const isSelected = selected.includes(tag)
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggle(tag)}
              className={cn(
                "px-3 py-1.5 rounded-full text-[13px] font-semibold border transition-all duration-150",
                isSelected
                  ? "bg-[#073d30] text-white border-[#073d30]"
                  : "bg-white text-[#68707c] border-[#d9dde4] hover:border-[#073d30] hover:text-[#073d30]"
              )}
            >
              {tag}
            </button>
          )
        })}
      </div>
      {hint && <p className="text-[13px] text-[#68707c]">{hint}</p>}
    </div>
  )
}

/* ─── FileUploadZone ──────────────────────────────────────────────────── */

interface FileUploadZoneProps {
  label?: string
  hint?: string
  accept?: string
  fileName?: string | null
  onFileChange: (fileName: string | null) => void
  required?: boolean
}

export function FileUploadZone({
  label,
  hint,
  accept = ".pdf,.jpg,.jpeg,.png",
  fileName,
  onFileChange,
  required,
}: FileUploadZoneProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <div className="flex items-center gap-1.5">
          <Label className="text-[14px] font-medium text-[#68707c]">{label}</Label>
          {required && (
            <span className="text-[11px] font-semibold text-[#c22d2c] bg-[#ffdcdc] px-1.5 py-0.5 rounded-full">
              Required
            </span>
          )}
        </div>
      )}
      {fileName ? (
        <div className="flex items-center gap-3 px-4 py-3 bg-[#e6f5ed] border border-[#9cd8b5] rounded-2xl">
          <div className="size-8 rounded-lg bg-[#073d30] flex items-center justify-center shrink-0">
            <RiCheckLine className="size-4 text-white" />
          </div>
          <p className="flex-1 text-[13px] font-semibold text-[#073d30] truncate">{fileName}</p>
          <button
            type="button"
            onClick={() => onFileChange(null)}
            className="text-[#068042] hover:text-[#c22d2c] transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center gap-2 px-4 py-6 bg-white border-2 border-dashed border-[#d9dde4] rounded-2xl cursor-pointer hover:border-[#9cd8b5] hover:bg-[#fafbfc] transition-colors group">
          <div className="size-10 rounded-full bg-[#f1f2f5] flex items-center justify-center group-hover:bg-[#e6f5ed] transition-colors">
            <Upload className="size-5 text-[#68707c] group-hover:text-[#073d30] transition-colors" />
          </div>
          <div className="text-center">
            <p className="text-[13px] font-semibold text-[#29344a]">
              Click to upload <span className="text-[#073d30]">or drag & drop</span>
            </p>
            <p className="text-[12px] text-[#b2b8c1] mt-0.5">{accept.replace(/\./g, "").toUpperCase()} · Max 10MB</p>
          </div>
          <input
            type="file"
            accept={accept}
            className="sr-only"
            onChange={e => {
              const file = e.target.files?.[0]
              onFileChange(file ? file.name : null)
            }}
          />
        </label>
      )}
      {hint && <p className="text-[12px] text-[#68707c]">{hint}</p>}
    </div>
  )
}

/* ─── StepHeader ──────────────────────────────────────────────────────── */

interface StepHeaderProps {
  step: number
  title: string
  subtitle: string
}

export function StepHeader({ step, title, subtitle }: StepHeaderProps) {
  return (
    <div className="mb-8">
      <p className="text-[12px] font-semibold text-[#39b16c] tracking-[0.06em] uppercase mb-1">
        Step {step} of 7
      </p>
      <h2 className="text-[28px] font-bold text-[#101828] font-[family-name:var(--font-title)] leading-tight mb-2">
        {title}
      </h2>
      <p className="text-[15px] text-[#68707c] leading-relaxed">{subtitle}</p>
    </div>
  )
}

/* ─── InfoBanner ──────────────────────────────────────────────────────── */

export function InfoBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 px-4 py-3.5 bg-[#f0faf5] border border-[#9cd8b5] rounded-2xl mb-6">
      <div className="shrink-0 size-5 rounded-full bg-[#39b16c] flex items-center justify-center mt-0.5">
        <span className="text-white text-[11px] font-bold">i</span>
      </div>
      <p className="text-[13px] text-[#29344a] leading-relaxed">{children}</p>
    </div>
  )
}

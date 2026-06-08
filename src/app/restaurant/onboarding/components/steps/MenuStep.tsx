"use client"

import { useState, useRef } from "react"
import { RiLink, RiUploadCloud2Line, RiFileTextLine, RiCloseLine, RiCheckLine } from "@remixicon/react"
import { InputField } from "@/components/ui/input-field"
import { type MenuData } from "../../types"
import { StepLayout } from "../StepLayout"
import { StepHeader, TextareaField } from "../FormFields"
import { cn } from "@/lib/utils"

const MAX_FILES = 3
const MAX_FILE_MB = 50

interface MenuStepProps {
  data: MenuData
  onChange: (patch: Partial<MenuData>) => void
  onNext: () => void
  onBack: () => void
}

function FileUploadSlot({
  index,
  fileName,
  onAdd,
  onRemove,
}: {
  index: number
  fileName: string | undefined
  onAdd: (name: string) => void
  onRemove: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const label =
    index === 0
      ? "Upload menu file"
      : `Upload additional file ${index + 1}`
  const hint = `PDF, Word, or image · ${MAX_FILE_MB}MB max`

  if (fileName) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 bg-[#f0faf5] border border-[#9cd8b5] rounded-xl">
        <div className="size-9 rounded-xl bg-[#e6f5ed] flex items-center justify-center shrink-0">
          <RiFileTextLine className="size-4 text-[#073d30]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-[#101828] truncate">{fileName}</p>
          <p className="text-[11px] text-[#68707c] mt-0.5">Uploaded successfully</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="size-5 rounded-full bg-[#39b16c] flex items-center justify-center">
            <RiCheckLine className="size-3 text-white" />
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="size-7 rounded-lg flex items-center justify-center text-[#68707c] hover:text-[#c22d2c] hover:bg-[#ffdcdc] transition-colors"
          >
            <RiCloseLine className="size-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <label
      className={cn(
        "flex items-center gap-3 px-4 py-4 bg-[#fafbfc] border-2 border-dashed border-[#d9dde4]",
        "rounded-xl cursor-pointer hover:border-[#9cd8b5] hover:bg-[#f0faf5] transition-colors group"
      )}
    >
      <div className="size-9 rounded-xl bg-[#f1f2f5] flex items-center justify-center shrink-0 group-hover:bg-[#e6f5ed] transition-colors">
        <RiUploadCloud2Line className="size-4 text-[#68707c] group-hover:text-[#073d30] transition-colors" />
      </div>
      <div className="flex-1">
        <p className="text-[13px] font-semibold text-[#29344a]">
          {label} <span className="text-[#073d30]">Browse</span>
        </p>
        <p className="text-[11px] text-[#b2b8c1] mt-0.5">{hint}</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
        className="sr-only"
        onChange={e => {
          const file = e.target.files?.[0]
          if (file) onAdd(file.name)
        }}
      />
    </label>
  )
}

export function MenuStep({ data, onChange, onNext, onBack }: MenuStepProps) {
  const [fileNames, setFileNames] = useState<(string | undefined)[]>(
    Array.from({ length: MAX_FILES }, (_, i) => data.menuFiles[i])
  )

  const updateFile = (index: number, name: string | undefined) => {
    const next = [...fileNames]
    next[index] = name
    setFileNames(next)
    onChange({ menuFiles: next.filter((f): f is string => !!f) })
  }

  // Determine which slots to show: always show first slot,
  // show next slot if previous has a file
  const slotsToShow = fileNames.reduce(
    (count, name) => (name ? Math.min(count + 1, MAX_FILES) : count),
    1
  )

  return (
    <StepLayout
      step={5}
      onNext={onNext}
      onBack={onBack}
      nextLabel="Continue to Review"
    >
      <StepHeader
        step={5}
        title="Share your menu"
        subtitle="Paste a link to your online catering menu, or upload a copy. This helps us verify your offerings and set up your listing quickly."
      />

      {/* Menu URL */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1.5">
          <RiLink className="size-4 text-[#068042]" />
          <label className="text-[14px] font-semibold text-[#29344a]">
            Link to your online catering menu
          </label>
        </div>
        <InputField
          placeholder="https://lacocinacatering.com/catering-menu"
          type="url"
          value={data.menuUrl}
          onChange={e => onChange({ menuUrl: e.target.value })}
          hint="Paste the most up-to-date version of your catering menu"
        />
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 h-px bg-[#f1f2f5]" />
        <span className="text-[12px] text-[#b2b8c1] font-medium">
          {data.menuUrl ? "and / or upload files below" : "or upload a copy"}
        </span>
        <div className="flex-1 h-px bg-[#f1f2f5]" />
      </div>

      {/* File uploads */}
      <div className="space-y-3 mb-8">
        {Array.from({ length: slotsToShow }).map((_, i) => (
          <FileUploadSlot
            key={i}
            index={i}
            fileName={fileNames[i]}
            onAdd={name => updateFile(i, name)}
            onRemove={() => updateFile(i, undefined)}
          />
        ))}
      </div>

      {/* Instructions */}
      <div>
        <TextareaField
          label="Menu update instructions"
          placeholder="Describe any specifics — seasonal items, pricing notes, items to exclude, or anything we should know when setting up your menu on the platform."
          value={data.menuInstructions}
          onChange={instructions => onChange({ menuInstructions: instructions })}
          rows={4}
          maxLength={600}
          hint="Help us configure your listing accurately and quickly"
        />
      </div>
    </StepLayout>
  )
}

'use client'

import { useState } from 'react'

// ─── Copy Button ──────────────────────────────────────────────────────────────

export function CopyButton({ value, label = 'Copy' }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={handleCopy}
      className="
        inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono
        bg-muted text-muted-foreground border border-border
        hover:bg-accent hover:text-accent-foreground hover:border-primary
        transition-all duration-150 cursor-pointer select-none
      "
    >
      {copied ? (
        <>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <rect x="4" y="1" width="7" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
            <path d="M1 4h2M1 4v7h7v-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          {label}
        </>
      )}
    </button>
  )
}

// ─── Color Token Card ─────────────────────────────────────────────────────────

export interface ColorToken {
  name: string           // display name e.g. "Sherwood Green"
  cssVar: string         // e.g. "--primary"
  tailwind: string       // e.g. "bg-primary"
  value: string          // hex e.g. "#073d30"
  figmaGroup?: string    // e.g. "Brands / Sherwood Green"
  dark?: boolean         // if true, render white text
}

export function ColorCard({ token }: { token: ColorToken }) {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-border shadow-xs">
      <div
        className="h-20 w-full"
        style={{ backgroundColor: token.value }}
      />
      <div className="p-3 bg-card space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-foreground leading-tight">{token.name}</p>
            {token.figmaGroup && (
              <p className="text-xs text-muted-foreground">{token.figmaGroup}</p>
            )}
          </div>
          <span className="text-xs font-mono text-muted-foreground mt-0.5">{token.value}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-border">
          <CopyButton value={`var(${token.cssVar})`} label={token.cssVar} />
          <CopyButton value={token.tailwind} label={token.tailwind} />
          <CopyButton value={token.value} label="hex" />
        </div>
      </div>
    </div>
  )
}

// ─── Token Group Heading ──────────────────────────────────────────────────────

export function TokenGroupHeading({ title, description, count }: {
  title: string
  description?: string
  count?: number
}) {
  return (
    <div className="mb-6">
      <div className="flex items-baseline gap-2">
        <h2 className="text-2xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-title)' }}>
          {title}
        </h2>
        {count !== undefined && (
          <span className="text-sm text-muted-foreground">{count} tokens</span>
        )}
      </div>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground max-w-xl">{description}</p>
      )}
    </div>
  )
}

// ─── Token Grid ───────────────────────────────────────────────────────────────

export function TokenGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {children}
    </div>
  )
}

// ─── Shadow Card ──────────────────────────────────────────────────────────────

export interface ShadowToken {
  name: string
  cssVar: string
  value: string
  description: string
}

export function ShadowCard({ token }: { token: ShadowToken }) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden">
      <div className="h-24 flex items-center justify-center bg-surface-default/30 p-4">
        <div
          className="w-16 h-16 rounded-lg bg-background"
          style={{ boxShadow: token.value }}
        />
      </div>
      <div className="p-3 space-y-2">
        <p className="text-sm font-semibold text-foreground">{token.name}</p>
        <p className="text-xs text-muted-foreground">{token.description}</p>
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-border">
          <CopyButton value={`var(${token.cssVar})`} label={token.cssVar} />
          <CopyButton value={`shadow-${token.name.split('/')[1]?.toLowerCase() || token.name}`} label="tailwind" />
        </div>
      </div>
    </div>
  )
}

// ─── Radius Card ─────────────────────────────────────────────────────────────

export interface RadiusToken {
  name: string
  cssVar: string
  value: string
  tailwind: string
}

export function RadiusCard({ token }: { token: RadiusToken }) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden">
      <div className="h-24 flex items-center justify-center bg-muted/30 p-4">
        <div
          className="w-16 h-16 bg-primary/20 border-2 border-primary"
          style={{ borderRadius: token.value }}
        />
      </div>
      <div className="p-3 space-y-2">
        <p className="text-sm font-semibold text-foreground">{token.name}</p>
        <p className="text-xs font-mono text-muted-foreground">{token.value}</p>
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-border">
          <CopyButton value={`var(${token.cssVar})`} label={token.cssVar} />
          <CopyButton value={token.tailwind} label={token.tailwind} />
        </div>
      </div>
    </div>
  )
}

// ─── Typography Row ───────────────────────────────────────────────────────────

export interface TypographyToken {
  name: string
  cssVar: string
  sample: string
  family: string
  size: string
  weight: string
  lineHeight: string
  letterSpacing?: string
  tailwind: string
}

export function TypographyRow({ token }: { token: TypographyToken }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border border-border bg-card">
      <div className="flex-1 min-w-0">
        <p
          className="truncate"
          style={{
            fontFamily: token.family === 'General Sans' ? 'var(--font-title)' : 'var(--font-body)',
            fontSize: token.size,
            fontWeight: token.weight,
            lineHeight: token.lineHeight,
            letterSpacing: token.letterSpacing,
          }}
        >
          {token.sample}
        </p>
      </div>
      <div className="flex flex-col gap-1 sm:items-end shrink-0">
        <p className="text-xs font-semibold text-foreground">{token.name}</p>
        <p className="text-xs text-muted-foreground">{token.family} · {token.size} · {token.weight}</p>
        <div className="flex flex-wrap gap-1.5 mt-1">
          <CopyButton value={token.tailwind} label={token.tailwind} />
          <CopyButton value={`var(${token.cssVar})`} label={token.cssVar} />
        </div>
      </div>
    </div>
  )
}

// ─── Spacing Row ──────────────────────────────────────────────────────────────

export interface SpacingToken {
  name: string
  cssVar: string
  value: string
  tailwind: string
  px: number
}

export function SpacingRow({ token }: { token: SpacingToken }) {
  return (
    <div className="flex items-center gap-4 py-2 border-b border-border last:border-0">
      <div className="w-24 shrink-0">
        <div
          className="h-4 bg-primary rounded-sm"
          style={{ width: `${Math.min(token.px * 2, 320)}px` }}
        />
      </div>
      <div className="flex-1 grid grid-cols-3 gap-2 text-xs">
        <span className="font-mono text-foreground">{token.name}</span>
        <span className="text-muted-foreground">{token.px}px</span>
        <span className="font-mono text-muted-foreground">{token.tailwind}</span>
      </div>
      <CopyButton value={token.tailwind} label="copy" />
    </div>
  )
}

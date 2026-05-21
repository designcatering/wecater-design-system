import type { Meta, StoryObj } from '@storybook/nextjs-vite'

// ─── Quick-link card data ─────────────────────────────────────────────────────
// Each card links to a top-level section in the sidebar.
// `href` uses the Storybook story path format so CMD+click navigates directly.

const QUICK_LINKS = [
  {
    id: 'colors',
    title: 'Colors',
    description: 'Color palettes, semantic tokens, and role-based usage guidelines.',
    href: '?path=/story/tokens-colors--palette',
    accent: '#B85500',
  },
  {
    id: 'typography',
    title: 'Typography',
    description: 'Type scale, font families, weights, and Figma token mappings.',
    href: '?path=/story/tokens-typography--scale',
    accent: '#6B0A72',
  },
  {
    id: 'foundations',
    title: 'Foundations',
    description: 'Spacing, border radius, and shadow tokens — the layout building blocks.',
    href: '?path=/story/tokens-spacing--scale',
    accent: '#0A4A10',
  },
  {
    id: 'components',
    title: 'Components',
    description: 'Buttons, inputs, and all UI primitives mapped from Figma.',
    href: '?path=/story/primitives-button--playground',
    accent: '#073D30',
  },
] as const

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Cater Design System/Welcome',
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ─────────────────────────────────────────────────────────────────────────────
// Welcome
// ─────────────────────────────────────────────────────────────────────────────

export const Welcome: Story = {
  name: 'Welcome',
  render: () => (
    <div
      className="min-h-screen bg-background"
      style={{ fontFamily: 'var(--font-body, Inter, sans-serif)' }}
    >
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="bg-[#073D30] px-8 py-14 md:px-16">
        <div className="max-w-4xl">
          {/* Status pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D5C45] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#2AE87A] animate-pulse" />
            <span
              className="text-[12px] font-medium text-[#9CD8B5]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Storybook running
            </span>
          </div>

          {/* Title -->*/}
          <h1
            className="text-[42px] md:text-[56px] font-bold leading-[1.1] text-white mb-4"
            style={{ fontFamily: 'var(--font-title, Inter, sans-serif)', letterSpacing: '-0.03em' }}
          >
            Cater Design System
          </h1>

          {/* Subtitle */}
          <p
            className="text-[18px] leading-[1.6] text-[#9CD8B5] max-w-2xl"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Component library built from the Cater Figma design system — tokens, primitives, and
            patterns for building WeCaterAI products consistently.
          </p>
        </div>
      </div>

      {/* ── Quick links ───────────────────────────────────────────────────── */}
      <div className="px-8 py-12 md:px-16">
        <h2
          className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-6"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Explore
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {QUICK_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="group block rounded-[12px] overflow-hidden border border-border bg-card
                         hover:border-[#9CD8B5] hover:shadow-[0_4px_20px_0_rgba(0,0,0,0.12)]
                         active:scale-[0.985] transition-all duration-200 no-underline"
            >
              {/* Card body */}
              <div className="p-5">
                {/* Colour dot + title */}
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: link.accent }}
                  />
                  <span
                    className="text-[15px] font-semibold text-foreground"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {link.title}
                  </span>
                </div>

                {/* Description */}
                <p
                  className="text-[13px] leading-[1.55] text-muted-foreground"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {link.description}
                </p>

                {/* CTA row */}
                <div className="mt-4 flex items-center gap-1.5 text-[13px] font-medium text-[#067e39] group-hover:text-[#073D30] transition-colors duration-150">
                  <span>Explore</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-150 group-hover:translate-x-[3px]">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ── Tier overview ─────────────────────────────────────────────────── */}
      <div className="px-8 pb-16 md:px-16">
        <h2
          className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-6"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Architecture
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { tier: '01', label: 'Design Tokens', desc: 'Colors, type, spacing, shadow, radius' },
            { tier: '02', label: 'Primitives',    desc: 'Button, Input, Label, Badge, Toast' },
            { tier: '03', label: 'Icons',         desc: '123 Remix Icons — line & fill variants' },
            { tier: '04', label: 'Features',      desc: 'AI ordering, chat, assistant flows' },
          ].map(({ tier, label, desc }) => (
            <div
              key={tier}
              className="rounded-[10px] border border-border bg-card p-5 space-y-2"
            >
              <div
                className="text-[11px] font-semibold tracking-[0.1em] text-muted-foreground uppercase"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Tier {tier}
              </div>
              <div
                className="text-[14px] font-semibold text-foreground"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {label}
              </div>
              <div
                className="text-[13px] leading-[1.5] text-muted-foreground"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}

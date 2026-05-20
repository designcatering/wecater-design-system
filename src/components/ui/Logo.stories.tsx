/**
 * WeCater Logo — usage guide, size variants, and responsive contexts.
 *
 * Storybook section: Components/Logo
 */

'use client'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Logo, type LogoSize, type LogoVariant } from './logo'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/Logo',
  component: Logo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The **WeCater wordmark** — the primary brand identifier used across all product surfaces.

It is a pure SVG component that scales to any context while staying crisp at every resolution. Use the size presets to match the surface, and the variant tokens to ensure contrast against any background.

---

### Quick rules

| ✅ Do | ❌ Don't |
|---|---|
| Use \`variant="white"\` on dark / brand-green backgrounds | Stretch or skew the logo |
| Maintain clear-space of at least **½ logo height** on all sides | Place on busy or low-contrast backgrounds |
| Use the \`md\` (200px) preset as a default starting point | Reproduce the logo below **96px** wide |
| Always render from this component — never rasterise | Recolour outside of the approved variants |

---

### Size presets

| Name | Width | Height | Use case |
|---|---|---|---|
| \`xs\` | 96px | 20px | Compact nav, mobile footer, favicons |
| \`sm\` | 140px | 29px | Mobile header, collapsed sidebar |
| \`md\` | 200px | 41px | Default desktop nav *(recommended)* |
| \`lg\` | 280px | 58px | Marketing headers, large nav |
| \`xl\` | 400px | 83px | Landing heroes, splash screens |

---

### Usage

\`\`\`tsx
import { Logo } from '@/components/ui/logo'

// Default (200px, brand green)
<Logo />

// White — on dark backgrounds
<Logo variant="white" size="md" />

// Custom size
<Logo size="lg" />

// Custom colour (rare — prefer variants)
<Logo variant="custom" color="#ffffff" />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'] satisfies LogoSize[],
      description: 'Named size preset',
      table: { defaultValue: { summary: 'md' } },
    },
    variant: {
      control: 'inline-radio',
      options: ['default', 'white', 'custom'] satisfies LogoVariant[],
      description: 'Colour variant',
      table: { defaultValue: { summary: 'default' } },
    },
    color: {
      control: 'color',
      description: 'Custom fill colour — only applies when variant="custom"',
    },
  },
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

// ─────────────────────────────────────────────────────────────────────────────
// 1. Playground
// ─────────────────────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  args: {
    size: 'md',
    variant: 'default',
  },
  parameters: {
    docs: {
      description: { story: 'Use the controls panel to explore size and colour variant combinations.' },
    },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Size Variants
// ─────────────────────────────────────────────────────────────────────────────

export const SizeVariants: Story = {
  name: 'Size Variants',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'All five size presets. The logo aspect ratio is **906:187 (≈ 4.84:1)** — width drives height automatically.',
      },
    },
  },
  render: () => (
    <div className="p-8 bg-background space-y-0">
      <h2
        className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-8"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        Size Presets
      </h2>

      {(
        [
          { size: 'xl' as LogoSize, label: 'xl', desc: '400 × 83px  —  landing heroes, splash screens' },
          { size: 'lg' as LogoSize, label: 'lg', desc: '280 × 58px  —  marketing headers' },
          { size: 'md' as LogoSize, label: 'md', desc: '200 × 41px  —  default desktop nav' },
          { size: 'sm' as LogoSize, label: 'sm', desc: '140 × 29px  —  mobile header' },
          { size: 'xs' as LogoSize, label: 'xs', desc: '96 × 20px   —  compact nav, footer' },
        ] as const
      ).map(({ size, label, desc }) => (
        <div
          key={size}
          className="flex items-center gap-8 py-5 border-b border-border last:border-0"
        >
          {/* Size chip */}
          <div className="w-12 shrink-0">
            <span className="inline-flex items-center justify-center px-2 py-1 rounded-md bg-muted text-[11px] font-mono font-semibold text-muted-foreground">
              {label}
            </span>
          </div>

          {/* Logo */}
          <div className="flex items-center" style={{ minWidth: 400 }}>
            <Logo size={size} variant="default" />
          </div>

          {/* Spec */}
          <p className="text-[13px] text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
            {desc}
          </p>
        </div>
      ))}
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. On Light Background
// ─────────────────────────────────────────────────────────────────────────────

export const OnLight: Story = {
  name: 'On Light Background',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Default `variant="default"` — use on white, off-white, and light grey surfaces.',
      },
    },
  },
  render: () => (
    <div className="p-10 space-y-6 bg-background rounded-[12px] border border-border">
      <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        variant="default" — on light
      </p>
      <div className="flex flex-wrap items-end gap-10">
        {(['xl', 'lg', 'md', 'sm', 'xs'] as LogoSize[]).map(s => (
          <Logo key={s} size={s} variant="default" />
        ))}
      </div>
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. On Dark Background
// ─────────────────────────────────────────────────────────────────────────────

export const OnDark: Story = {
  name: 'On Dark Background',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Use `variant="white"` on dark or brand-green backgrounds for correct contrast.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      {/* Brand green */}
      <div className="p-10 rounded-[12px] space-y-6" style={{ background: '#073D30' }}>
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#9CD8B5]">
          variant="white" — on brand green (#073D30)
        </p>
        <div className="flex flex-wrap items-end gap-10">
          {(['xl', 'lg', 'md', 'sm', 'xs'] as LogoSize[]).map(s => (
            <Logo key={s} size={s} variant="white" />
          ))}
        </div>
      </div>

      {/* Neutral dark */}
      <div className="p-10 rounded-[12px] space-y-6 bg-neutral-900">
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
          variant="white" — on neutral dark (#171717)
        </p>
        <div className="flex flex-wrap items-end gap-10">
          {(['xl', 'lg', 'md', 'sm', 'xs'] as LogoSize[]).map(s => (
            <Logo key={s} size={s} variant="white" />
          ))}
        </div>
      </div>

      {/* Mid-green */}
      <div className="p-10 rounded-[12px] space-y-6" style={{ background: '#0D5C45' }}>
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#9CD8B5]">
          variant="white" — on Salem mid-green (#0D5C45)
        </p>
        <div className="flex flex-wrap items-end gap-10">
          {(['xl', 'lg', 'md', 'sm', 'xs'] as LogoSize[]).map(s => (
            <Logo key={s} size={s} variant="white" />
          ))}
        </div>
      </div>
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. Responsive Contexts — Desktop / Tablet / Mobile
// ─────────────────────────────────────────────────────────────────────────────

export const ResponsiveContexts: Story = {
  name: 'Responsive Contexts',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: `
Simulated viewport frames showing the correct logo size at each breakpoint.

| Breakpoint | Viewport | Logo size | Preset |
|---|---|---|---|
| Mobile | 375px | 140px wide | \`sm\` |
| Tablet | 768px | 200px wide | \`md\` |
| Desktop | 1280px+ | 280px wide | \`lg\` |
        `,
      },
    },
  },
  render: () => (
    <div className="space-y-8 p-6 bg-background">
      <h2
        className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        Responsive contexts
      </h2>

      {/* ── Desktop ── */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-semibold text-foreground" style={{ fontFamily: 'var(--font-body)' }}>
            Desktop
          </span>
          <span className="text-[11px] text-muted-foreground font-mono">1280px+ · Logo size: lg (280px)</span>
        </div>
        <div
          className="rounded-[10px] border border-border overflow-hidden"
          style={{ width: '100%', maxWidth: 900 }}
        >
          {/* Nav bar */}
          <div
            className="flex items-center justify-between px-8 py-4 border-b border-border bg-background"
            style={{ height: 64 }}
          >
            <Logo size="lg" variant="default" />
            <div className="flex items-center gap-6">
              {['Menu', 'Orders', 'Events', 'Analytics'].map(label => (
                <span key={label} className="text-[13px] font-medium text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                  {label}
                </span>
              ))}
            </div>
            <div className="w-8 h-8 rounded-full bg-[#073D30] flex items-center justify-center">
              <span className="text-[11px] font-bold text-white">W</span>
            </div>
          </div>
          {/* Content stub */}
          <div className="h-24 bg-muted/30 flex items-center justify-center">
            <span className="text-[12px] text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>page content</span>
          </div>
        </div>
      </div>

      {/* ── Tablet ── */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-semibold text-foreground" style={{ fontFamily: 'var(--font-body)' }}>
            Tablet
          </span>
          <span className="text-[11px] text-muted-foreground font-mono">768px · Logo size: md (200px)</span>
        </div>
        <div
          className="rounded-[10px] border border-border overflow-hidden"
          style={{ width: 480 }}
        >
          {/* Nav bar */}
          <div
            className="flex items-center justify-between px-6 py-3.5 border-b border-border bg-background"
            style={{ height: 56 }}
          >
            <Logo size="md" variant="default" />
            <div className="flex items-center gap-4">
              {['Orders', 'Events'].map(label => (
                <span key={label} className="text-[13px] font-medium text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                  {label}
                </span>
              ))}
            </div>
            <div className="w-7 h-7 rounded-full bg-[#073D30] flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">W</span>
            </div>
          </div>
          <div className="h-20 bg-muted/30 flex items-center justify-center">
            <span className="text-[12px] text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>page content</span>
          </div>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-semibold text-foreground" style={{ fontFamily: 'var(--font-body)' }}>
            Mobile
          </span>
          <span className="text-[11px] text-muted-foreground font-mono">375px · Logo size: sm (140px)</span>
        </div>
        <div
          className="rounded-[10px] border border-border overflow-hidden"
          style={{ width: 320 }}
        >
          {/* Nav bar — brand green on mobile */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b border-[#0D5C45]"
            style={{ height: 52, background: '#073D30' }}
          >
            <Logo size="sm" variant="white" />
            {/* Hamburger */}
            <div className="flex flex-col gap-1.5 p-1">
              {[0, 1, 2].map(i => (
                <span key={i} className="block w-5 h-0.5 rounded-full bg-white opacity-80" />
              ))}
            </div>
          </div>
          <div className="h-16 bg-muted/30 flex items-center justify-center">
            <span className="text-[12px] text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>page content</span>
          </div>
        </div>
      </div>
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. Clear Space & Minimum Size
// ─────────────────────────────────────────────────────────────────────────────

export const ClearSpace: Story = {
  name: 'Clear Space & Minimum Size',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: `
**Clear space** — always maintain a margin equal to **½ the logo height** on all four sides. This prevents the logo from feeling crowded and preserves legibility.

**Minimum size** — never render the logo narrower than **96px (xs)**. Below that, the letterforms become illegible.
      `,
      },
    },
  },
  render: () => (
    <div className="p-8 bg-background space-y-10">
      {/* Clear space demo */}
      <div className="space-y-4">
        <h3
          className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Clear space rule — ½ logo height on all sides
        </h3>

        <div className="inline-block relative">
          {/* Outer clear-space boundary */}
          <div
            className="border-2 border-dashed border-[#9CD8B5] rounded-sm"
            style={{ padding: '20px' }}  /* md height=41px → ½=20px */
          >
            {/* Inner logo area */}
            <div className="border border-dashed border-[#E07A20] rounded-sm p-0">
              <Logo size="md" variant="default" />
            </div>
          </div>
          {/* Dimension annotations */}
          <span
            className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#9CD8B5] whitespace-nowrap"
          >
            ½ height = 20px
          </span>
          <span
            className="absolute top-1/2 -right-14 -translate-y-1/2 text-[10px] font-mono text-[#9CD8B5]"
          >
            20px →
          </span>
        </div>

        <p className="text-[13px] text-muted-foreground max-w-md" style={{ fontFamily: 'var(--font-body)' }}>
          <span className="text-[#9CD8B5] font-semibold">Dashed green</span> = required clear space.{' '}
          <span className="text-[#E07A20] font-semibold">Dashed orange</span> = logo bounding box.
        </p>
      </div>

      {/* Minimum size */}
      <div className="space-y-4">
        <h3
          className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Minimum size — xs (96px) is the floor
        </h3>
        <div className="flex items-end gap-8 flex-wrap">
          <div className="space-y-2 text-center">
            <div className="border-2 border-[#9CD8B5] rounded-lg p-4 inline-block">
              <Logo size="xs" variant="default" />
            </div>
            <p className="text-[11px] font-semibold text-[#067e39]" style={{ fontFamily: 'var(--font-body)' }}>✓ 96px — minimum</p>
          </div>
          <div className="space-y-2 text-center opacity-50">
            <div className="border-2 border-red-300 rounded-lg p-4 inline-block">
              {/* Deliberately too small */}
              <Logo size="xs" variant="default" style={{ width: 64, height: 13 }} />
            </div>
            <p className="text-[11px] font-semibold text-red-500" style={{ fontFamily: 'var(--font-body)' }}>✗ 64px — too small</p>
          </div>
        </div>
      </div>
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. Do / Don't
// ─────────────────────────────────────────────────────────────────────────────

export const DoAndDont: Story = {
  name: 'Do / Don\'t',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Common misuse patterns and their correct alternatives.',
      },
    },
  },
  render: () => {
    const Rule = ({
      label,
      pass,
      children,
    }: {
      label: string
      pass: boolean
      children: React.ReactNode
    }) => (
      <div className="space-y-3">
        <div className={`flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] ${pass ? 'text-[#067e39]' : 'text-red-500'}`}
          style={{ fontFamily: 'var(--font-body)' }}
        >
          <span>{pass ? '✓ Do' : '✗ Don\'t'}</span>
          <span className="font-normal normal-case tracking-normal text-muted-foreground text-[12px]">
            {label}
          </span>
        </div>
        <div className={`p-8 rounded-[10px] border-2 flex items-center justify-center min-h-[96px] ${pass ? 'border-[#9CD8B5] bg-background' : 'border-red-200 bg-red-50/40'}`}>
          {children}
        </div>
      </div>
    )

    return (
      <div className="p-6 bg-background">
        <div className="grid grid-cols-2 gap-6">
          {/* Row 1 */}
          <Rule pass label="Use variant=&quot;default&quot; on light">
            <Logo size="md" variant="default" />
          </Rule>
          <Rule pass={false} label="Don't use on a low-contrast mid-green">
            <div className="rounded px-6 py-4" style={{ background: '#5AB880' }}>
              <Logo size="md" variant="default" />
            </div>
          </Rule>

          {/* Row 2 */}
          <Rule pass label="Use variant=&quot;white&quot; on dark backgrounds">
            <div className="rounded px-8 py-4" style={{ background: '#073D30' }}>
              <Logo size="md" variant="white" />
            </div>
          </Rule>
          <Rule pass={false} label="Don't use default colour on dark backgrounds">
            <div className="rounded px-8 py-4" style={{ background: '#073D30' }}>
              <Logo size="md" variant="default" />
            </div>
          </Rule>

          {/* Row 3 */}
          <Rule pass label="Maintain proportions — use the size prop">
            <Logo size="md" variant="default" />
          </Rule>
          <Rule pass={false} label="Don't stretch or distort">
            <Logo size="md" variant="default" style={{ width: 200, height: 70 }} />
          </Rule>

          {/* Row 4 */}
          <Rule pass label="Minimum 96px (xs) in any context">
            <Logo size="xs" variant="default" />
          </Rule>
          <Rule pass={false} label="Don't apply drop shadows or effects">
            <div style={{ filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.5))' }}>
              <Logo size="md" variant="default" />
            </div>
          </Rule>
        </div>
      </div>
    )
  },
}

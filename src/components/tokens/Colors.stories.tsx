import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ColorCard, TokenGrid, TokenGroupHeading, type ColorToken } from './token-utils'

const meta = {
  title: 'Tokens/Colors',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Color tokens mapped 1:1 from the Cater Figma design system variable panel.

**Usage:** Use the shadcn semantic tokens (\`--primary\`, \`--muted\`, etc.) for components.
Use the brand palette (\`--cater-green-*\`, \`--cater-mirage-*\`) only for one-off cases.

Each card shows the **CSS variable**, **Tailwind utility class**, and **hex value** — click any to copy.
        `,
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ─── shadcn Semantic Tokens ───────────────────────────────────────────────────

const semanticTokens: ColorToken[] = [
  { name: 'Primary',            cssVar: '--primary',            tailwind: 'bg-primary',            value: '#073d30', figmaGroup: 'Tokens / Sherwood Green',       dark: true  },
  { name: 'Primary Foreground', cssVar: '--primary-foreground', tailwind: 'bg-primary-foreground', value: '#ffffff', figmaGroup: 'Tokens / White'                            },
  { name: 'Background',         cssVar: '--background',         tailwind: 'bg-background',         value: '#ffffff', figmaGroup: 'Tokens / White'                            },
  { name: 'Foreground',         cssVar: '--foreground',         tailwind: 'text-foreground',       value: '#101828', figmaGroup: 'Tokens / Mirage 900',           dark: true  },
  { name: 'Muted',              cssVar: '--muted',              tailwind: 'bg-muted',              value: '#f1f2f5', figmaGroup: 'Tokens / Color/Surface/Default'             },
  { name: 'Muted Foreground',   cssVar: '--muted-foreground',   tailwind: 'text-muted-foreground', value: '#68707c', figmaGroup: 'Tokens / Color/Text/Subtitle'               },
  { name: 'Accent',             cssVar: '--accent',             tailwind: 'bg-accent',             value: '#d4f5ed', figmaGroup: 'Tokens / Sherwood Green/50'                 },
  { name: 'Accent Foreground',  cssVar: '--accent-foreground',  tailwind: 'text-accent-foreground',value: '#073d30', figmaGroup: 'Tokens / Sherwood Green',       dark: true  },
  { name: 'Destructive',        cssVar: '--destructive',        tailwind: 'bg-destructive',        value: '#c22d2c', figmaGroup: 'Brands / Brand Red E',           dark: true  },
  { name: 'Border',             cssVar: '--border',             tailwind: 'border-border',         value: '#d9dde4', figmaGroup: 'Tokens / Color/Border/Default'              },
  { name: 'Ring',               cssVar: '--ring',               tailwind: 'ring-ring',             value: '#39b16c', figmaGroup: 'Tokens / Salem/500',             dark: true  },
  { name: 'Card',               cssVar: '--card',               tailwind: 'bg-card',               value: '#ffffff', figmaGroup: 'Tokens / White'                            },
]

export const SemanticTokens: Story = {
  name: 'Semantic (shadcn)',
  render: () => (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <TokenGroupHeading
        title="Semantic Tokens"
        description="These map directly to shadcn's CSS variable system. Always use these in components — never hardcode hex values."
        count={semanticTokens.length}
      />
      <TokenGrid>
        {semanticTokens.map((t) => <ColorCard key={t.cssVar} token={t} />)}
      </TokenGrid>
    </div>
  ),
}

// ─── Brand: Mirage ────────────────────────────────────────────────────────────

const mirageTokens: ColorToken[] = [
  { name: 'Mirage 900', cssVar: '--cater-mirage-900', tailwind: 'bg-mirage-900', value: '#101828', figmaGroup: 'Brands / Mirage', dark: true },
  { name: 'Mirage 800', cssVar: '--cater-mirage-800', tailwind: 'bg-mirage-800', value: '#29344a', figmaGroup: 'Brands / Mirage', dark: true },
  { name: 'Mirage 700', cssVar: '--cater-mirage-700', tailwind: 'bg-mirage-700', value: '#5a626f', figmaGroup: 'Brands / Mirage', dark: true },
  { name: 'Mirage 600', cssVar: '--cater-mirage-600', tailwind: 'bg-mirage-600', value: '#68707c', figmaGroup: 'Brands / Mirage', dark: true },
  { name: 'Mirage 400', cssVar: '--cater-mirage-400', tailwind: 'bg-mirage-400', value: '#b2b8c1', figmaGroup: 'Brands / Mirage' },
  { name: 'Mirage 300', cssVar: '--cater-mirage-300', tailwind: 'bg-mirage-300', value: '#d0d5dd', figmaGroup: 'Brands / Mirage' },
  { name: 'Mirage 100', cssVar: '--cater-mirage-100', tailwind: 'bg-mirage-100', value: '#f1f2f5', figmaGroup: 'Brands / Mirage' },
]

const greenTokens: ColorToken[] = [
  { name: 'Sherwood Green 900', cssVar: '--cater-green-900', tailwind: 'bg-green-900', value: '#063126', figmaGroup: 'Brands / Sherwood Green', dark: true },
  { name: 'Sherwood Green 800', cssVar: '--cater-green-800', tailwind: 'bg-green-800', value: '#073d30', figmaGroup: 'Brands / Sherwood Green', dark: true },
  { name: 'Sherwood Green 50',  cssVar: '--cater-green-50',  tailwind: 'bg-green-50',  value: '#d4f5ed', figmaGroup: 'Brands / Sherwood Green' },
]

const salemTokens: ColorToken[] = [
  { name: 'Salem 900', cssVar: '--cater-salem-900', tailwind: 'bg-salem-900', value: '#033f1c', figmaGroup: 'Brands / Salem', dark: true },
  { name: 'Salem 700', cssVar: '--cater-salem-700', tailwind: 'bg-salem-700', value: '#067e39', figmaGroup: 'Brands / Salem', dark: true },
  { name: 'Salem 500', cssVar: '--cater-salem-500', tailwind: 'bg-salem-500', value: '#39b16c', figmaGroup: 'Brands / Salem', dark: true },
  { name: 'Salem 100', cssVar: '--cater-salem-100', tailwind: 'bg-salem-100', value: '#ceecda', figmaGroup: 'Brands / Salem' },
  { name: 'Salem 50',  cssVar: '--cater-salem-50',  tailwind: 'bg-salem-50',  value: '#e6f5ed', figmaGroup: 'Brands / Salem' },
]

export const BrandPalette: Story = {
  name: 'Brand Palette',
  render: () => (
    <div className="p-6 space-y-10 bg-background min-h-screen">
      <TokenGroupHeading
        title="Brand Palette"
        description="Raw brand color scales from Figma. Use semantic tokens in components — these are the source values."
        count={mirageTokens.length + greenTokens.length + salemTokens.length}
      />

      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Mirage (Neutrals)</h3>
        <TokenGrid>{mirageTokens.map((t) => <ColorCard key={t.cssVar} token={t} />)}</TokenGrid>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Sherwood Green (Primary)</h3>
        <TokenGrid>{greenTokens.map((t) => <ColorCard key={t.cssVar} token={t} />)}</TokenGrid>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Salem (Accent / Success)</h3>
        <TokenGrid>{salemTokens.map((t) => <ColorCard key={t.cssVar} token={t} />)}</TokenGrid>
      </div>
    </div>
  ),
}

// ─── Accent Palettes ──────────────────────────────────────────────────────────

const accentTokens: ColorToken[] = [
  { name: 'Flush Orange 900', cssVar: '--cater-orange-900', tailwind: 'bg-orange-900', value: '#653000', figmaGroup: 'Brands / Flush Orange', dark: true },
  { name: 'Flush Orange 700', cssVar: '--cater-orange-700', tailwind: 'bg-orange-700', value: '#ca6100', figmaGroup: 'Brands / Flush Orange', dark: true },
  { name: 'Flush Orange 100', cssVar: '--cater-orange-100', tailwind: 'bg-orange-100', value: '#ffe4cc', figmaGroup: 'Brands / Flush Orange' },
  { name: 'Blush Pink 900',   cssVar: '--cater-blush-900',  tailwind: 'bg-blush-900',  value: '#8e2e84', figmaGroup: 'Brands / Blush Pink', dark: true },
  { name: 'Blush Pink 100',   cssVar: '--cater-blush-100',  tailwind: 'bg-blush-100',  value: '#fee3fc', figmaGroup: 'Brands / Blush Pink' },
  { name: 'Brand Red',        cssVar: '--cater-red',        tailwind: 'bg-red',        value: '#c22d2c', figmaGroup: 'Brands / Brand Red E', dark: true },
  { name: 'Bright Red 500',   cssVar: '--cater-red-500',    tailwind: 'bg-red-500',    value: '#d15958', figmaGroup: 'Brands / Bright Red', dark: true },
  { name: 'Gossip',           cssVar: '--cater-gossip',     tailwind: 'bg-gossip',     value: '#ccf8b9', figmaGroup: 'Brands / Gossip' },
  { name: 'White Linen',      cssVar: '--cater-white-linen',tailwind: 'bg-white-linen',value: '#f9f3e7', figmaGroup: 'Brands / White Linen' },
]

export const AccentPalettes: Story = {
  name: 'Accent Palettes',
  render: () => (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <TokenGroupHeading
        title="Accent Palettes"
        description="Supporting color palettes for states, tags, and informational UI."
        count={accentTokens.length}
      />
      <TokenGrid>{accentTokens.map((t) => <ColorCard key={t.cssVar} token={t} />)}</TokenGrid>
    </div>
  ),
}

// ─── Semantic State Tokens ────────────────────────────────────────────────────

const stateTokens: ColorToken[] = [
  { name: 'Text / Title',          cssVar: '--color-text-title',         tailwind: 'text-[var(--color-text-title)]',         value: '#101828' },
  { name: 'Text / Body',           cssVar: '--color-text-body',          tailwind: 'text-[var(--color-text-body)]',          value: '#29344a' },
  { name: 'Text / Subtitle',       cssVar: '--color-text-subtitle',      tailwind: 'text-muted-foreground',                  value: '#68707c' },
  { name: 'Text / Caption',        cssVar: '--color-text-caption',       tailwind: 'text-[var(--color-text-caption)]',       value: '#b2b8c1' },
  { name: 'Text / Disabled',       cssVar: '--color-text-disabled',      tailwind: 'text-[var(--color-text-disabled)]',      value: '#b2b8c1' },
  { name: 'Surface / Default',     cssVar: '--color-surface-default',    tailwind: 'bg-muted',                               value: '#f1f2f5' },
  { name: 'Surface / Subtle',      cssVar: '--color-surface-subtle',     tailwind: 'bg-[var(--color-surface-subtle)]',       value: '#fafbfc' },
  { name: 'Border / Default',      cssVar: '--color-border-default',     tailwind: 'border-border',                          value: '#d9dde4' },
  { name: 'Border / Darker',       cssVar: '--color-border-darker',      tailwind: 'border-[var(--color-border-darker)]',    value: '#d0d5dd' },
  { name: 'Success / Bg-subtle',   cssVar: '--color-success-bg-subtle',  tailwind: 'bg-[var(--color-success-bg-subtle)]',    value: '#baf1d6' },
  { name: 'Success / Bg-darker',   cssVar: '--color-success-bg-darker',  tailwind: 'bg-[var(--color-success-bg-darker)]',    value: '#378760', dark: true },
  { name: 'Info / Text-subtle',    cssVar: '--color-info-text-subtle',   tailwind: 'text-[var(--color-info-text-subtle)]',   value: '#8e2e84', dark: true },
]

export const SemanticStates: Story = {
  name: 'Semantic States',
  render: () => (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <TokenGroupHeading
        title="Semantic State Tokens"
        description="Figma's Token group — text, surface, border, and state colors mapped to CSS variables."
        count={stateTokens.length}
      />
      <TokenGrid>{stateTokens.map((t) => <ColorCard key={t.cssVar} token={t} />)}</TokenGrid>
    </div>
  ),
}

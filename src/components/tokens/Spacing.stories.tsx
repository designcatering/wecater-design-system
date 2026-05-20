import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SpacingRow, TokenGroupHeading, CopyButton, type SpacingToken } from './token-utils'

const meta = {
  title: 'Tokens/Spacing',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Spacing tokens from the Cater Figma design system — 14 steps mapped directly from \`Spacing/*\` variables.

**Tailwind v4 note:** Tailwind generates spacing utilities from the scale automatically.
Use the standard Tailwind spacing classes — the scale matches Figma exactly.

**Usage:**
\`\`\`tsx
<div className="p-4">   // 16px padding
<div className="gap-6">  // 24px gap
<div className="mt-8">   // 32px margin-top
\`\`\`
        `,
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const spacingTokens: SpacingToken[] = [
  { name: 'Spacing / 0',   cssVar: '--spacing-0',   value: '0px',   tailwind: 'p-0',   px: 0   },
  { name: 'Spacing / 2',   cssVar: '--spacing-2',   value: '2px',   tailwind: 'p-0.5', px: 2   },
  { name: 'Spacing / 4',   cssVar: '--spacing-4',   value: '4px',   tailwind: 'p-1',   px: 4   },
  { name: 'Spacing / 6',   cssVar: '--spacing-6',   value: '6px',   tailwind: 'p-1.5', px: 6   },
  { name: 'Spacing / 8',   cssVar: '--spacing-8',   value: '8px',   tailwind: 'p-2',   px: 8   },
  { name: 'Spacing / 10',  cssVar: '--spacing-10',  value: '10px',  tailwind: 'p-2.5', px: 10  },
  { name: 'Spacing / 12',  cssVar: '--spacing-12',  value: '12px',  tailwind: 'p-3',   px: 12  },
  { name: 'Spacing / 16',  cssVar: '--spacing-16',  value: '16px',  tailwind: 'p-4',   px: 16  },
  { name: 'Spacing / 20',  cssVar: '--spacing-20',  value: '20px',  tailwind: 'p-5',   px: 20  },
  { name: 'Spacing / 24',  cssVar: '--spacing-24',  value: '24px',  tailwind: 'p-6',   px: 24  },
  { name: 'Spacing / 32',  cssVar: '--spacing-32',  value: '32px',  tailwind: 'p-8',   px: 32  },
  { name: 'Spacing / 40',  cssVar: '--spacing-40',  value: '40px',  tailwind: 'p-10',  px: 40  },
  { name: 'Spacing / 48',  cssVar: '--spacing-48',  value: '48px',  tailwind: 'p-12',  px: 48  },
  { name: 'Spacing / 999', cssVar: '--spacing-999', value: '999px', tailwind: 'p-[999px]', px: 999 },
]

const sizeTokens: SpacingToken[] = [
  { name: 'Size / xs',  cssVar: '--size-xs',  value: '10px', tailwind: 'size-2.5', px: 10 },
  { name: 'Size / sm',  cssVar: '--size-sm',  value: '13px', tailwind: 'size-3',   px: 13 },
  { name: 'Size / md',  cssVar: '--size-md',  value: '16px', tailwind: 'size-4',   px: 16 },
  { name: 'Size / lg',  cssVar: '--size-lg',  value: '20px', tailwind: 'size-5',   px: 20 },
  { name: 'Size / xl',  cssVar: '--size-xl',  value: '25px', tailwind: 'size-6',   px: 25 },
  { name: 'Size / 3xl', cssVar: '--size-3xl', value: '39px', tailwind: 'size-10',  px: 39 },
  { name: 'Size / 4xl', cssVar: '--size-4xl', value: '49px', tailwind: 'size-12',  px: 49 },
  { name: 'Size / 5xl', cssVar: '--size-5xl', value: '61px', tailwind: 'size-16',  px: 61 },
]

export const SpacingScale: Story = {
  name: 'Spacing Scale',
  render: () => (
    <div className="p-6 space-y-4 bg-background min-h-screen">
      <TokenGroupHeading
        title="Spacing"
        description="14 spacing steps from Figma's Spacing/* variable group. Maps to standard Tailwind spacing utilities."
        count={spacingTokens.length}
      />
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="grid grid-cols-3 gap-2 px-4 py-2 bg-muted text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
          <span>Token</span>
          <span>Value</span>
          <span>Tailwind</span>
        </div>
        <div className="divide-y divide-border">
          {spacingTokens.filter(t => t.px < 100).map((t) => (
            <SpacingRow key={t.cssVar} token={t} />
          ))}
        </div>
      </div>
    </div>
  ),
}

export const SizeScale: Story = {
  name: 'Size Scale',
  render: () => (
    <div className="p-6 space-y-4 bg-background min-h-screen">
      <TokenGroupHeading
        title="Sizes"
        description="Icon and element size tokens from Figma's Size/* group — used for icons, avatars, and fixed-dimension elements."
        count={sizeTokens.length}
      />
      <div className="flex flex-wrap items-end gap-6 p-6 rounded-xl border border-border bg-card">
        {sizeTokens.map((s) => (
          <div key={s.cssVar} className="flex flex-col items-center gap-2">
            <div
              className="rounded bg-primary/20 border border-primary/30 flex items-center justify-center"
              style={{ width: `${s.px}px`, height: `${s.px}px` }}
            />
            <div className="text-center">
              <p className="text-xs font-semibold text-foreground">{s.name.split('/ ')[1]}</p>
              <p className="text-xs text-muted-foreground">{s.px}px</p>
              <CopyButton value={s.tailwind} label="copy" />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const SpacingInContext: Story = {
  name: 'Spacing in Context',
  render: () => (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <TokenGroupHeading
        title="Spacing in Context"
        description="How the spacing scale looks applied to padding inside a card."
      />
      <div className="flex flex-wrap gap-4">
        {[4, 8, 12, 16, 24, 32].map((px) => {
          const token = spacingTokens.find(t => t.px === px)!
          return (
            <div key={px} className="rounded-xl border border-border bg-card flex items-start" style={{ padding: `${px}px` }}>
              <div className="rounded bg-primary/20 border border-primary/30 w-16 h-16 flex items-center justify-center">
                <span className="text-xs font-mono text-primary font-semibold">{px}px</span>
              </div>
            </div>
          )
        })}
      </div>
      <p className="text-xs text-muted-foreground">Each box has matching padding from its spacing token.</p>
    </div>
  ),
}

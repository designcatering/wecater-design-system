import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ShadowCard, TokenGroupHeading, TokenGrid, CopyButton, type ShadowToken } from './token-utils'

const meta = {
  title: 'Tokens/Shadows',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Shadow tokens from the Cater Figma design system.

6 shadow levels including a dedicated focus ring for inputs.

**Usage:**
\`\`\`tsx
// CSS variable
<div style={{ boxShadow: 'var(--cater-shadow-md)' }}>

// Tailwind (after mapping)
<div className="shadow-md">
\`\`\`
        `,
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const shadows: ShadowToken[] = [
  {
    name: 'Shadow / xs',
    cssVar: '--cater-shadow-xs',
    value: '0 1px 2px 0 #1018280d',
    description: 'Subtle lift. Use for tags, chips, small cards.',
  },
  {
    name: 'Shadow / sm',
    cssVar: '--cater-shadow-sm',
    value: '0 1px 2px 0 #1018280f, 0 1px 3px 0 #1018281a',
    description: 'Light depth. Use for buttons, inputs, badges.',
  },
  {
    name: 'Shadow / md',
    cssVar: '--cater-shadow-md',
    value: '0 2px 4px -2px #1018280f, 0 4px 8px -2px #1018281a',
    description: 'Standard card elevation. Use for restaurant cards, item tiles.',
  },
  {
    name: 'Shadow / lg',
    cssVar: '--cater-shadow-lg',
    value: '0 4px 6px -2px #10182808, 0 12px 16px -4px #10182814',
    description: 'Prominent panel. Use for sidebars, dropdowns, floating elements.',
  },
  {
    name: 'Shadow / xl',
    cssVar: '--cater-shadow-xl',
    value: '0 8px 8px -4px #10182808, 0 20px 24px -4px #10182814',
    description: 'Deep overlay. Use for modals, dialogs, full-screen drawers.',
  },
  {
    name: 'Focus Ring',
    cssVar: '--cater-shadow-focus',
    value: '0 0 0 2px #ceecda',
    description: 'Input/Highlight/Focus — Salem 100 focus ring for all interactive inputs.',
  },
]

export const AllShadows: Story = {
  render: () => (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <TokenGroupHeading
        title="Shadows"
        description="5 elevation levels + 1 focus ring token. All shadows use the Mirage base colour at low opacity."
        count={shadows.length}
      />
      <TokenGrid>
        {shadows.map((s) => <ShadowCard key={s.cssVar} token={s} />)}
      </TokenGrid>
    </div>
  ),
}

export const ElevationScale: Story = {
  name: 'Elevation Scale',
  render: () => (
    <div className="p-6 space-y-8 bg-background min-h-screen">
      <TokenGroupHeading
        title="Elevation Scale"
        description="All 5 shadow levels side-by-side to compare relative depth."
      />
      <div className="flex flex-wrap items-end gap-8 py-8">
        {shadows.slice(0, 5).map((s, i) => (
          <div key={s.cssVar} className="flex flex-col items-center gap-4">
            <div
              className="bg-white rounded-xl"
              style={{
                boxShadow: s.value,
                width: `${80 + i * 20}px`,
                height: `${80 + i * 20}px`,
              }}
            />
            <div className="text-center">
              <p className="text-xs font-semibold text-foreground">{s.name.split('/ ')[1]}</p>
              <CopyButton value={`var(${s.cssVar})`} label={s.cssVar} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card p-4 space-y-2">
        <p className="text-sm font-semibold text-foreground">Focus Ring</p>
        <div className="flex items-center gap-4">
          <input
            type="text"
            defaultValue="Focused input"
            className="rounded-lg border border-border px-3 py-2 text-sm outline-none"
            style={{ boxShadow: '0 0 0 2px #ceecda' }}
            readOnly
          />
          <CopyButton value="var(--cater-shadow-focus)" label="--cater-shadow-focus" />
        </div>
        <p className="text-xs text-muted-foreground">Salem 100 (#ceecda) — 2px spread, no blur</p>
      </div>
    </div>
  ),
}

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { RadiusCard, TokenGroupHeading, TokenGrid, type RadiusToken } from './token-utils'

const meta = {
  title: 'Tokens/Radius',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Border radius tokens from the Cater Figma design system — 7 tokens covering sharp to fully rounded.

**Figma source:** Radius variable group

**Usage:**
\`\`\`tsx
// CSS variable
<div style={{ borderRadius: 'var(--radius)' }}>

// Tailwind
<div className="rounded-md">      // 8px
<div className="rounded-lg">      // 16px
<div className="rounded-full">    // 9999px (pill)
\`\`\`
        `,
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const radiusTokens: RadiusToken[] = [
  { name: 'None',    cssVar: '--radius-none',  value: '0px',    tailwind: 'rounded-none'  },
  { name: 'XS',      cssVar: '--radius-xs',    value: '2px',    tailwind: 'rounded-xs'    },
  { name: 'SM',      cssVar: '--radius-sm',    value: '4px',    tailwind: 'rounded-sm'    },
  { name: 'MD / lg', cssVar: '--radius',        value: '8px',    tailwind: 'rounded-md'    },
  { name: '2XL',     cssVar: '--radius-lg',     value: '16px',   tailwind: 'rounded-lg'    },
  { name: '4XL',     cssVar: '--radius-2xl',    value: '24px',   tailwind: 'rounded-2xl'   },
  { name: 'Full',    cssVar: '--radius-full',   value: '9999px', tailwind: 'rounded-full'  },
]

export const AllRadius: Story = {
  name: 'All Radius',
  render: () => (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <TokenGroupHeading
        title="Border Radius"
        description="7 radius tokens from the Figma Radius variable group. The base --radius (8px) is used by all shadcn components."
        count={radiusTokens.length}
      />
      <TokenGrid>
        {radiusTokens.map((r) => <RadiusCard key={r.cssVar} token={r} />)}
      </TokenGrid>
    </div>
  ),
}

export const RadiusInContext: Story = {
  name: 'In Context',
  render: () => (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <TokenGroupHeading
        title="Radius in Context"
        description="How each radius looks on a real UI element."
      />
      <div className="flex flex-wrap gap-4 items-center">
        {radiusTokens.map((r) => (
          <div key={r.cssVar} className="flex flex-col items-center gap-2">
            <div
              className="w-20 h-10 bg-primary flex items-center justify-center"
              style={{ borderRadius: r.value }}
            >
              <span className="text-primary-foreground text-xs font-semibold">{r.name}</span>
            </div>
            <span className="text-xs font-mono text-muted-foreground">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  ),
}

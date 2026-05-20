import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Cater Design System/Welcome',
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Welcome: Story = {
  render: () => (
    <div className="max-w-2xl mx-auto py-12 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="text-sm text-muted-foreground">Storybook is running</span>
      </div>
      <h1 className="text-4xl font-bold tracking-tight">Cater Design System</h1>
      <p className="text-lg text-muted-foreground">
        Component library built from the Cater Figma design system. Components are organised into four tiers:
      </p>
      <div className="grid grid-cols-2 gap-4">
        {[
          { tier: '1', label: 'Design Tokens', desc: 'Colors, typography, spacing, shadows' },
          { tier: '2', label: 'Primitives', desc: 'Button, Input, Badge, Checkbox, Toast' },
          { tier: '3', label: 'Icons', desc: 'SVG icon set from Figma' },
          { tier: '4', label: 'Features', desc: 'AI Ordering, Chat, Assistant' },
        ].map(({ tier, label, desc }) => (
          <div key={tier} className="border rounded-lg p-4 space-y-1">
            <div className="text-xs text-muted-foreground uppercase tracking-widest">Tier {tier}</div>
            <div className="font-semibold">{label}</div>
            <div className="text-sm text-muted-foreground">{desc}</div>
          </div>
        ))}
      </div>
    </div>
  ),
}

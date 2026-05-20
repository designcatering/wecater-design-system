import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ArrowRight, ArrowLeft, Plus } from 'lucide-react'
import { Button, type IconPosition } from '@/components/ui/button'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Cater Button — built on the **shadcn / @base-ui/react** primitive, skinned with Cater design tokens.

**Figma source:** [Button component](https://www.figma.com/design/tK5SjqGRgeVr5w5tmxuLDa/Cater-Design-System?node-id=20-3394)

---

### Usage

\`\`\`tsx
import { Button } from '@/components/ui/button'

// Primary (default)
<Button>Order now</Button>

// With left icon
<Button iconPosition="left" icon={<Plus />}>Add item</Button>

// Icon only
<Button iconPosition="alone" icon={<Search />} aria-label="Search" />

// Destructive
<Button variant="destructive">Remove</Button>
\`\`\`

---

### Props

| Prop | Type | Default | Figma |
|---|---|---|---|
| \`variant\` | \`primary \\| destructive \\| outline \\| secondary-color \\| tertiary-grey \\| ghost\` | \`primary\` | Type |
| \`size\` | \`sm \\| md \\| lg\` | \`md\` | Size |
| \`iconPosition\` | \`none \\| left \\| right \\| alone\` | \`none\` | Icon |
| \`icon\` | \`ReactNode\` | — | — |
| \`disabled\` | \`boolean\` | \`false\` | State=disabled |

---

### Tokens

| Token | Value | Used for |
|---|---|---|
| \`--primary\` | \`#073d30\` | Primary bg |
| \`--cater-green-700\` | \`#1e6151\` | Primary hover bg |
| \`--destructive\` | \`#c22d2c\` | Destructive bg |
| \`--cater-salem-50\` | \`#e6f5ed\` | Secondary-color bg |
| \`--cater-mirage-100\` | \`#f1f2f5\` | Tertiary-grey bg + disabled bg |
| \`--color-text-disabled\` | \`#b2b8c1\` | Disabled text |
| \`Button/pressed/shadow\` | \`0 0 0 2px #fff, 0 0 0 4px #ceecda\` | Focus ring |
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'tertiary-grey'],
      description: 'shadcn variant → Figma Type',
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'icon-sm', 'icon', 'icon-lg'],
      description: 'shadcn size → Figma Size',
      table: { defaultValue: { summary: 'default' } },
    },
    iconPosition: {
      control: 'select',
      options: ['none', 'left', 'right', 'alone'] satisfies IconPosition[],
      description: 'Figma: Icon',
      table: { defaultValue: { summary: 'none' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Figma: State=disabled',
    },
    children: {
      control: 'text',
      description: 'Button label',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// ─────────────────────────────────────────────────────────────────────────────
// 1. Playground — fully interactive controls
// ─────────────────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    variant: 'default',
    size: 'default',
    iconPosition: 'none',
    children: 'Order now',
    disabled: false,
  },
  render: (args) => (
    <Button
      {...args}
      icon={args.iconPosition !== 'none' ? <ArrowRight /> : undefined}
    />
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. All Types (variants)
// ─────────────────────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Types',
  parameters: {
    docs: {
      description: { story: 'All 6 Figma types at medium size. shadcn variant names map to Figma types.' },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default">Primary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary Color</Button>
      <Button variant="tertiary-grey">Tertiary Grey</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. All Sizes
// ─────────────────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: { story: 'Small (35px) · Medium (42px) · Large (58px) — all using primary variant.' },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Icon Positions
// ─────────────────────────────────────────────────────────────────────────────

export const IconPositions: Story = {
  name: 'Icon Positions',
  parameters: {
    docs: {
      description: { story: 'none · left · right · alone (icon-only square button).' },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button iconPosition="none">No icon</Button>
      <Button iconPosition="left" icon={<ArrowLeft />}>Icon left</Button>
      <Button iconPosition="right" icon={<ArrowRight />}>Icon right</Button>
      <Button iconPosition="alone" icon={<Plus />} aria-label="Add item" />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. States — all 4 Figma states rendered visually
// Note: CSS :hover and :active can't be triggered in a static Storybook render,
// so we apply the exact state styles directly via className to show them always.
// ─────────────────────────────────────────────────────────────────────────────

// State label chip
function StateLabel({ label }: { label: string }) {
  return (
    <span className="w-24 shrink-0 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
      {label}
    </span>
  )
}

// Tokens used per state (for reference in the story)
const STATE_ROWS = [
  {
    label: 'Default',
    // bg: Sherwood Green #073d30 | text: Gossip #ccf8b9
    classes: { default: '', outline: '', ghost: '', secondary: '', 'tertiary-grey': '' },
  },
  {
    label: 'Hover',
    // bg: Chelsea Gem 700 #1e6151 | text: Gossip #ccf8b9
    classes: {
      default:         'bg-[#1e6151]',
      outline:         'bg-[#f1f2f5] border-[#d0d5dd]',
      ghost:           'bg-muted',
      secondary:       'bg-[#ceecda]',
      'tertiary-grey': 'bg-[#d0d5dd]',
    },
  },
  {
    label: 'Pressed',
    // bg: Sherwood Green 900 #063126 | text: Gossip #ccf8b9
    classes: {
      default:         'bg-[#063126] scale-[0.97]',
      outline:         'bg-[#e8eaed] border-[#d0d5dd] scale-[0.97]',
      ghost:           'bg-[#e8eaed] scale-[0.97]',
      secondary:       'bg-[#baf1d6] scale-[0.97]',
      'tertiary-grey': 'bg-[#b2b8c1] scale-[0.97]',
    },
  },
  {
    label: 'Focused',
    // Base style + Button/pressed/shadow: 2px white + 4px Salem/100 ring
    classes: {
      default:         'shadow-[0_0_0_2px_#ffffff,0_0_0_4px_#ceecda]',
      outline:         'shadow-[0_0_0_2px_#ffffff,0_0_0_4px_#ceecda]',
      ghost:           'shadow-[0_0_0_2px_#ffffff,0_0_0_4px_#ceecda]',
      secondary:       'shadow-[0_0_0_2px_#ffffff,0_0_0_4px_#ceecda]',
      'tertiary-grey': 'shadow-[0_0_0_2px_#ffffff,0_0_0_4px_#ceecda]',
    },
  },
]

type StateVariant = 'default' | 'outline' | 'ghost' | 'secondary' | 'tertiary-grey'
const STATE_VARIANTS: StateVariant[] = ['default', 'outline', 'ghost', 'secondary', 'tertiary-grey']
const STATE_LABELS: Record<StateVariant, string> = {
  default: 'Primary',
  outline: 'Outline',
  ghost: 'Ghost',
  secondary: 'Secondary',
  'tertiary-grey': 'Tertiary Grey',
}

export const States: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: `
All 4 Figma states rendered visually at once.

| State | Primary bg | Primary text |
|---|---|---|
| Default | \`#073d30\` Sherwood Green | \`#ccf8b9\` Gossip |
| Hover | \`#1e6151\` Chelsea Gem 700 | \`#ccf8b9\` Gossip |
| Pressed | \`#063126\` Sherwood Green 900 | \`#ccf8b9\` Gossip |
| Focused | \`#073d30\` + Salem/100 focus ring | \`#ccf8b9\` Gossip |
| Disabled | \`#f1f2f5\` Mirage/100 | \`#b2b8c1\` Mirage/400 |

> CSS \`:hover\` and \`:active\` can't be triggered in a static Storybook canvas,
> so state styles are applied directly via \`className\` to make them always visible.
        `,
      },
    },
  },
  render: () => (
    <div className="space-y-1 w-full">
      {/* Header row */}
      <div className="flex items-center gap-4 pb-2 border-b border-border mb-4">
        <span className="w-24 shrink-0" />
        {STATE_VARIANTS.map((v) => (
          <span key={v} className="flex-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center">
            {STATE_LABELS[v]}
          </span>
        ))}
      </div>

      {/* State rows */}
      {STATE_ROWS.map(({ label, classes }) => (
        <div key={label} className="flex items-center gap-4 py-3 border-b border-border/50 last:border-0">
          <StateLabel label={label} />
          {STATE_VARIANTS.map((v) => (
            <div key={v} className="flex-1 flex justify-center">
              <Button variant={v} className={classes[v]}>
                {STATE_LABELS[v]}
              </Button>
            </div>
          ))}
        </div>
      ))}

      {/* Disabled row */}
      <div className="flex items-center gap-4 py-3">
        <StateLabel label="Disabled" />
        {STATE_VARIANTS.map((v) => (
          <div key={v} className="flex-1 flex justify-center">
            <Button variant={v} disabled>
              {STATE_LABELS[v]}
            </Button>
          </div>
        ))}
      </div>
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. Full Matrix — all types × all sizes
// ─────────────────────────────────────────────────────────────────────────────

// shadcn variant names → Figma type names
const VARIANTS = [
  { variant: 'default'       as const, label: 'Primary'         },
  { variant: 'destructive'   as const, label: 'Destructive'     },
  { variant: 'outline'       as const, label: 'Outline'         },
  { variant: 'secondary'     as const, label: 'Secondary Color' },
  { variant: 'tertiary-grey' as const, label: 'Tertiary Grey'   },
  { variant: 'ghost'         as const, label: 'Ghost'           },
]
// shadcn size names → Figma size names
const SIZES = [
  { size: 'sm'      as const, label: 'Small · 35px'  },
  { size: 'default' as const, label: 'Medium · 42px' },
  { size: 'lg'      as const, label: 'Large · 58px'  },
]

export const FullMatrix: Story = {
  name: 'Full Matrix',
  parameters: {
    layout: 'padded',
    docs: {
      description: { story: 'All 6 types × 3 sizes — the complete Figma grid.' },
    },
  },
  render: () => (
    <div className="space-y-6">
      {SIZES.map(({ size, label }) => (
        <div key={size} className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
          <div className="flex flex-wrap items-center gap-3">
            {VARIANTS.map(({ variant, label }) => (
              <Button key={variant} variant={variant} size={size}>
                {label}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. Icon-only Matrix
// ─────────────────────────────────────────────────────────────────────────────

export const IconOnlyMatrix: Story = {
  name: 'Icon Only Matrix',
  parameters: {
    layout: 'padded',
    docs: {
      description: { story: 'Icon=alone — square buttons across all types and sizes.' },
    },
  },
  render: () => (
    <div className="space-y-6">
      {SIZES.map(({ size, label }) => (
        <div key={size} className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
          <div className="flex flex-wrap items-center gap-3">
            {VARIANTS.map(({ variant, label }) => (
              <Button
                key={variant}
                variant={variant}
                size={size}
                iconPosition="alone"
                icon={<Plus />}
                aria-label={label}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. Disabled Matrix
// ─────────────────────────────────────────────────────────────────────────────

export const DisabledMatrix: Story = {
  name: 'Disabled State',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Per Figma: disabled is **uniform** across all types — `bg-[#f1f2f5]` + `text-[#b2b8c1]`, no borders.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {VARIANTS.map(({ variant, label }) => (
        <Button key={variant} variant={variant} disabled>
          {label}
        </Button>
      ))}
    </div>
  ),
}

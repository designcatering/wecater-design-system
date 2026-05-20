import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { InputField } from '@/components/ui/input-field'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Cater InputField — compound component built on the **shadcn / @base-ui/react** primitives, skinned with Cater design tokens.

**Figma source:** [Input Field component](https://www.figma.com/design/tK5SjqGRgeVr5w5tmxuLDa/Cater-Design-System?node-id=99-960)

---

### Structure

\`\`\`
<InputField>
  ├── <Label>            optional — Subtitle2/Regular (Inter 14px/500)
  ├── <container div>    border · shadow · radius · padding
  │     └── varies by fieldType (see Types below)
  └── <p hint>           optional — Subtitle2/Light (Inter 14px/400)
\`\`\`

---

### Types

| \`fieldType\` | Structure | Use case |
|---|---|---|
| \`name\` (default) | Plain text input | Names, email, text |
| \`company\` | 🔍 Search icon + input + × clear | Customer/company search |
| \`amount\` | Input \| Currency selector | Monetary amounts |
| \`date\` | Input + 📅 calendar icon | Date selection |
| \`copy\` | Input \| 📋 Copy button | Read-only copyable values |

---

### Usage

\`\`\`tsx
import { InputField } from '@/components/ui/input-field'

// Default (name)
<InputField label="First name" placeholder="e.g. John" />

// Company search
<InputField fieldType="company" label="Customer" placeholder="Search..." showClear />

// Amount with currency
<InputField fieldType="amount" label="Amount *" placeholder="0.00" currency="USD" />

// Date with calendar
<InputField fieldType="date" label="Due Date *" placeholder="Dec 19, 2025" />

// Copy
<InputField fieldType="copy" label="Website *" defaultValue="www.cateringrewards.io" />

// Error state
<InputField label="Email" error errorMessage="Invalid email address" />

// Ghost (no border)
<InputField fieldType="name" ghost placeholder="Inline edit..." />
\`\`\`

---

### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| \`fieldType\` | \`name \\| company \\| amount \\| date \\| copy\` | \`name\` | Figma Type |
| \`fieldSize\` | \`sm \\| md\` | \`md\` | sm≈44px · md≈48px |
| \`label\` | \`string\` | — | Label above input |
| \`hint\` | \`string\` | — | Helper text below |
| \`error\` | \`boolean\` | \`false\` | Error state |
| \`errorMessage\` | \`string\` | — | Overrides hint in error |
| \`ghost\` | \`boolean\` | \`false\` | No border/shadow |
| \`currency\` | \`string\` | \`"USD"\` | amount type only |
| \`copyLabel\` | \`string\` | \`"Copy"\` | copy type only |
| \`showClear\` | \`boolean\` | \`false\` | company type only |

---

### Tokens

| Token | Value | Used for |
|---|---|---|
| \`--color-border-default\` | \`#d9dde4\` | Default border |
| \`--cater-salem-500\` | \`#39b16c\` | Focus border |
| \`--cater-salem-100\` | \`#ceecda\` | Focus ring |
| \`--color-error-border\` | \`#e89a9a\` | Error border |
| \`--color-error-text-subtle\` | \`#6b0100\` | Error hint text |
| \`--color-surface-disabled\` | \`#f1f2f5\` | amount right panel · disabled bg |
| \`--color-surface-subtle\` | \`#fafbfc\` | copy right panel |
| \`--color-text-subtitle\` | \`#68707c\` | Label · placeholder · hint |
| \`--color-text-body\` | \`#29344a\` | Filled text · copy button |
        `,
      },
    },
  },
  argTypes: {
    fieldType: {
      control: 'select',
      options: ['name', 'company', 'amount', 'date', 'copy'],
      description: 'Figma Type — controls the visual structure',
      table: { defaultValue: { summary: 'name' } },
    },
    fieldSize: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'sm ≈ 44px · md ≈ 48px',
      table: { defaultValue: { summary: 'md' } },
    },
    label: { control: 'text', description: 'Label text above input' },
    hint: { control: 'text', description: 'Helper text below input' },
    placeholder: { control: 'text', description: 'Input placeholder' },
    error: { control: 'boolean', description: 'Error state' },
    errorMessage: { control: 'text', description: 'Error message (overrides hint)' },
    ghost: { control: 'boolean', description: 'No border/shadow' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    currency: { control: 'text', description: 'Currency label (amount type)' },
    copyLabel: { control: 'text', description: 'Copy button label (copy type)' },
    showClear: { control: 'boolean', description: 'Show clear × button (company type)' },
  },
} satisfies Meta<typeof InputField>

export default meta
type Story = StoryObj<typeof meta>

// ─────────────────────────────────────────────────────────────────────────────
// 1. Playground
// ─────────────────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    fieldType: 'name',
    fieldSize: 'md',
    label: 'First name',
    hint: 'This is a hint text to help user.',
    placeholder: 'Enter your name',
    error: false,
    ghost: false,
    disabled: false,
  },
  render: (args) => (
    <div className="w-[360px]">
      <InputField {...args} />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. All Types
// ─────────────────────────────────────────────────────────────────────────────

export const AllTypes: Story = {
  name: 'All Types',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'All 5 Figma types — each with a distinct visual structure.',
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-2 gap-x-8 gap-y-6 w-full max-w-2xl">

      {/* name */}
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">name</p>
        <InputField
          fieldType="name"
          label="First name *"
          hint="This is a hint text to help user."
          placeholder="John Appleseed"
        />
      </div>

      {/* company */}
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">company</p>
        <InputField
          fieldType="company"
          label="Customer name *"
          hint="This is a hint text to help user."
          placeholder="Search customers..."
        />
      </div>

      {/* amount */}
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">amount</p>
        <InputField
          fieldType="amount"
          label="Amount *"
          hint="This is a hint text to help user."
          placeholder="0.00"
          currency="USD"
        />
      </div>

      {/* date */}
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">date</p>
        <InputField
          fieldType="date"
          label="Due Date *"
          hint="This is a hint text to help user."
          placeholder="Dec 19, 2025"
        />
      </div>

      {/* copy */}
      <div className="space-y-1 col-span-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">copy</p>
        <InputField
          fieldType="copy"
          label="Website *"
          hint="This is a hint text to help user."
          defaultValue="www.cateringrewards.io"
          placeholder="https://..."
        />
      </div>

    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. All Sizes
// ─────────────────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'All Sizes',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Small (≈44px) · Medium/Default (≈48px) — shown across all 5 types.',
      },
    },
  },
  render: () => (
    <div className="space-y-8 w-full max-w-2xl">
      {(['sm', 'md'] as const).map((size) => (
        <div key={size} className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">
            {size === 'sm' ? 'Small · sm' : 'Medium · md (default)'}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <InputField fieldType="name"    fieldSize={size} label="name"    placeholder="John Appleseed" />
            <InputField fieldType="company" fieldSize={size} label="company" placeholder="Search..." />
            <InputField fieldType="amount"  fieldSize={size} label="amount"  placeholder="0.00" currency="USD" />
            <InputField fieldType="date"    fieldSize={size} label="date"    placeholder="Dec 19, 2025" />
            <InputField fieldType="copy"    fieldSize={size} label="copy"    defaultValue="www.cateringrewards.io" className="col-span-2" />
          </div>
        </div>
      ))}
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. All States
// ─────────────────────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All States',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: `
5 Figma states rendered visually across all types.

| State | Border | Ring | Notes |
|---|---|---|---|
| Default | \`#d9dde4\` | — | Resting |
| Filled | \`#d9dde4\` | — | Text → Color/Text/Body |
| Focus | \`#39b16c\` Salem/500 | \`#ceecda\` | Click an input to see live |
| Error | \`#e89a9a\` | \`#ffdcdc\` on focus | Red hint text |
| Disabled | — | — | \`#f1f2f5\` bg |
| Ghost | — | — | No border/shadow |
        `,
      },
    },
  },
  render: () => {
    const STATES = [
      {
        label: 'Default',
        props: { placeholder: 'Placeholder text' },
      },
      {
        label: 'Filled',
        props: { defaultValue: 'Filled value', placeholder: 'Placeholder text' },
      },
      {
        label: 'Focus',
        note: '(click to activate)',
        props: { placeholder: 'Click to focus' },
      },
      {
        label: 'Error',
        props: { error: true as const, errorMessage: 'Invalid value', placeholder: 'Placeholder text' },
      },
      {
        label: 'Disabled',
        props: { disabled: true as const, defaultValue: 'Disabled value', placeholder: 'Placeholder text' },
      },
      {
        label: 'Ghost',
        props: { ghost: true as const, defaultValue: 'Acme Shop', placeholder: 'Ghost state' },
      },
    ]

    return (
      <div className="space-y-1 w-full max-w-3xl">
        {/* Header */}
        <div className="grid grid-cols-6 gap-3 pb-2 border-b border-border mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">State</span>
          {(['name', 'company', 'amount', 'date', 'copy'] as const).map((t) => (
            <span key={t} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center">{t}</span>
          ))}
        </div>

        {STATES.map(({ label, note, props }) => (
          <div key={label} className="grid grid-cols-6 gap-3 py-3 border-b border-border/50 last:border-0 items-start">
            <div className="pt-[14px]">
              <span className="text-xs font-semibold text-muted-foreground">{label}</span>
              {note && <span className="block text-[10px] text-muted-foreground/60">{note}</span>}
            </div>
            <InputField fieldType="name"    {...props} />
            <InputField fieldType="company" {...props} showClear={!!props.defaultValue} />
            <InputField fieldType="amount"  {...props} currency="USD" />
            <InputField fieldType="date"    {...props} />
            <InputField fieldType="copy"    {...props} />
          </div>
        ))}
      </div>
    )
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. name — Plain text
// ─────────────────────────────────────────────────────────────────────────────

export const TypeName: Story = {
  name: 'Type · name',
  parameters: {
    docs: {
      description: { story: 'Plain text input — no leading/trailing icons. Used for names, emails, free text.' },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4 w-[360px]">
      <InputField fieldType="name" label="First name *" hint="This is a hint text to help user." placeholder="John Appleseed" />
      <InputField fieldType="name" label="Email *" hint="We'll never share your email." placeholder="you@example.com" defaultValue="hello@cater.io" />
      <InputField fieldType="name" label="Error state" error errorMessage="This field is required" placeholder="Enter value" />
      <InputField fieldType="name" label="Disabled" disabled defaultValue="Read only" hint="This field cannot be edited." />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. company — Search with clear
// ─────────────────────────────────────────────────────────────────────────────

export const TypeCompany: Story = {
  name: 'Type · company',
  parameters: {
    docs: {
      description: { story: 'Search-style input — 🔍 search icon left, × clear button right (shown via `showClear` prop).' },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4 w-[360px]">
      <InputField fieldType="company" label="Customer name *" hint="This is a hint text to help user." placeholder="Search customers..." />
      <InputField fieldType="company" label="Customer name *" hint="This is a hint text to help user." defaultValue="Mubarak Alumn" showClear placeholder="Search customers..." />
      <InputField fieldType="company" label="Error state" error errorMessage="Customer not found" placeholder="Search..." showClear defaultValue="Unknown Corp" />
      <InputField fieldType="company" label="Disabled" disabled defaultValue="Locked Corp" hint="Cannot be changed." />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. amount — Currency selector
// ─────────────────────────────────────────────────────────────────────────────

export const TypeAmount: Story = {
  name: 'Type · amount',
  parameters: {
    docs: {
      description: { story: 'Split input — amount on the left, currency selector (`surface-disabled` bg) on the right.' },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4 w-[360px]">
      <InputField fieldType="amount" label="Amount *" hint="This is a hint text to help user." placeholder="0.00" currency="USD" />
      <InputField fieldType="amount" label="Amount *" hint="This is a hint text to help user." defaultValue="5.00" currency="USD" />
      <InputField fieldType="amount" label="GBP amount" placeholder="0.00" currency="GBP" />
      <InputField fieldType="amount" label="Error state" error errorMessage="Amount must be greater than 0" placeholder="0.00" currency="USD" />
      <InputField fieldType="amount" label="Disabled" disabled defaultValue="250.00" currency="USD" hint="Cannot be edited." />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. date — Calendar icon
// ─────────────────────────────────────────────────────────────────────────────

export const TypeDate: Story = {
  name: 'Type · date',
  parameters: {
    docs: {
      description: { story: 'Input with a trailing 📅 calendar icon. Click the icon to trigger `onCalendarClick`.' },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4 w-[360px]">
      <InputField fieldType="date" label="Due Date *" hint="This is a hint text to help user." placeholder="Dec 19, 2025" />
      <InputField fieldType="date" label="Due Date *" hint="This is a hint text to help user." defaultValue="Dec 19, 2025" />
      <InputField fieldType="date" label="Error state" error errorMessage="Please select a valid date" placeholder="Select date" />
      <InputField fieldType="date" label="Disabled" disabled defaultValue="Dec 19, 2025" hint="Date cannot be changed." />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. copy — Copy button
// ─────────────────────────────────────────────────────────────────────────────

export const TypeCopy: Story = {
  name: 'Type · copy',
  parameters: {
    docs: {
      description: { story: 'Split input — read-only value on the left, copy button (`surface-subtle` bg) on the right. Each panel has its own border.' },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4 w-[360px]">
      <InputField fieldType="copy" label="Website *" hint="This is a hint text to help user." defaultValue="www.cateringrewards.io" placeholder="https://..." />
      <InputField fieldType="copy" label="Invite link" defaultValue="https://app.cater.io/invite/abc123" placeholder="Link will appear here" />
      <InputField fieldType="copy" label="Error state" error errorMessage="Invalid URL" defaultValue="not-a-url" />
      <InputField fieldType="copy" label="Disabled" disabled defaultValue="www.cateringrewards.io" hint="Cannot be changed." />
      <InputField fieldType="copy" label="Ghost variant" ghost defaultValue="Ghost copy field" hint="No border, transparent bg." />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. Ghost state
// ─────────────────────────────────────────────────────────────────────────────

export const GhostState: Story = {
  name: 'Ghost State',
  parameters: {
    docs: {
      description: {
        story: `
Figma ghost state — a subdued/read-only appearance. Not "no border": it uses a subtly different colour set.

| Token | Value | Role |
|---|---|---|
| bg | \`#fafbfc\` Color/Surface/Subtle | Container background |
| border | \`#d0d5dd\` Color/Border/Darker | Container border |
| text | \`#b2b8c1\` Color/Text/Disabled | Input text + icons |
| shadow | Shadow/xs | Same as default |
        `,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4 w-[360px]">
      <InputField fieldType="name"    ghost label="name · ghost"    defaultValue="Acme Shop"            hint="Ghost state — read-only appearance" />
      <InputField fieldType="company" ghost label="company · ghost" defaultValue="Mubarak Alumn"        hint="Ghost state" showClear />
      <InputField fieldType="amount"  ghost label="amount · ghost"  defaultValue="5.00"                 hint="Ghost state" currency="USD" />
      <InputField fieldType="date"    ghost label="date · ghost"    defaultValue="Dec 19, 2025"         hint="Ghost state" />
      <InputField fieldType="copy"    ghost label="copy · ghost"    defaultValue="www.cateringrewards.io" hint="Ghost state" />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. Full Matrix — all types × sizes × states
// ─────────────────────────────────────────────────────────────────────────────

export const FullMatrix: Story = {
  name: 'Full Matrix',
  parameters: {
    layout: 'padded',
    docs: {
      description: { story: 'All 5 types × 2 sizes × default + error + disabled — the complete Figma grid.' },
    },
  },
  render: () => {
    const TYPES = ['name', 'company', 'amount', 'date', 'copy'] as const
    const STATE_SETS = [
      { label: 'Default',  props: { placeholder: 'Placeholder' } },
      { label: 'Error',    props: { error: true as const, errorMessage: 'Invalid value' } },
      { label: 'Disabled', props: { disabled: true as const, defaultValue: 'Value' } },
    ]

    return (
      <div className="space-y-12 w-full">
        {(['sm', 'md'] as const).map((size) => (
          <div key={size} className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">
              {size === 'sm' ? 'Small · sm' : 'Medium · md'}
            </p>
            {STATE_SETS.map(({ label, props }) => (
              <div key={label} className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">{label}</p>
                <div className="grid grid-cols-3 gap-4">
                  {TYPES.map((type) => (
                    <InputField
                      key={type}
                      fieldType={type}
                      fieldSize={size}
                      label={type.charAt(0).toUpperCase() + type.slice(1)}
                      hint={type !== 'copy' ? 'Hint text' : undefined}
                      currency="USD"
                      showClear={type === 'company' && !!props.defaultValue}
                      {...props}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  },
}

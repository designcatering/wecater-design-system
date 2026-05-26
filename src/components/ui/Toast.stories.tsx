/**
 * Toast stories — Cater Design System
 *
 * Figma: https://www.figma.com/design/tK5SjqGRgeVr5w5tmxuLDa/Cater-Design-System?node-id=4810-11345
 *
 * Stories:
 *   Playground     → interactive controls for every prop
 *   Variants       → default · success · info · warning · error
 *   With Action    → inline action link per variant
 *   With Description → two-line toasts
 *   Dismiss Only   → no action, dismiss button
 *   Persistent     → duration=0, stays until dismissed
 *   Live Demo      → trigger real toasts from buttons (uses useToast + Toaster)
 *   Position       → all 6 anchor positions
 *   Kitchen Sink   → all variants stacked
 */

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import { Toast } from "@/components/ui/toast"
import { Toaster } from "@/components/ui/toaster"
import { useToast, toast as fireToast } from "@/hooks/use-toast"
import type { ToasterPosition } from "@/components/ui/toaster"

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: "Primitives/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
**Cater Toast** is the in-app notification primitive. It comes in two flavours:

- **Default (dark)** — the canonical Cater toast for transient confirmations (added to cart, saved, etc.). Dark \`#101828\` background with a Gossip-green action link.
- **Alert variants** — \`success\`, \`info\`, \`warning\`, \`error\` — coloured toasts for system feedback requiring attention.

### Anatomy

\`\`\`
[icon?]  [message · description?]  [action?]  [×]
\`\`\`

### Usage

\`\`\`tsx
// 1. Mount <Toaster /> once at your app root
<Toaster position="bottom-right" />

// 2. Fire toasts from anywhere
import { toast } from "@/hooks/use-toast"

toast({ message: "Your order was placed!", variant: "success" })
toast.error("Payment failed — please retry.")
toast({ message: "Saved", action: { label: "View", onClick: () => router.push("/orders") } })
\`\`\`

### Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Keep messages under 2 lines | Write paragraphs in a toast |
| Use for transient, non-critical feedback | Use for errors that need form-level detail |
| Provide an action for navigable results | Stack more than 5 toasts at once |
| Allow manual dismiss for important toasts | Auto-dismiss toasts with critical info |
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "info", "warning", "error"],
      description: "Visual style of the toast",
      table: { defaultValue: { summary: "default" } },
    },
    message: {
      control: "text",
      description: "Primary message content",
    },
    description: {
      control: "text",
      description: "Optional secondary line of text",
    },
    showDismiss: {
      control: "boolean",
      description: "Show the × dismiss button",
      table: { defaultValue: { summary: "true" } },
    },
    hideIcon: {
      control: "boolean",
      description: "Hide status icon (alert variants only)",
      table: { defaultValue: { summary: "false" } },
    },
    onDismiss: { action: "dismissed" },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

// ─── Shared action ────────────────────────────────────────────────────────────

const noop = () => {}

// ─────────────────────────────────────────────────────────────────────────────
// Playground
// ─────────────────────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: "Playground",
  args: {
    variant: "default",
    message: "Your Basic Breakfast Bar has been added to cart",
    description: undefined,
    showDismiss: true,
    hideIcon: false,
    action: { label: "View", onClick: noop },
  },
  render: (args) => (
    <div className="w-[400px]">
      <Toast {...args} onDismiss={noop} />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// Variants
// ─────────────────────────────────────────────────────────────────────────────

export const Variants: Story = {
  name: "Variants",
  args: { message: "" },
  parameters: {
    docs: {
      description: {
        story:
          "Five visual variants: **default** (dark) is the primary Cater toast; **success / info / warning / error** are semantic alert toasts.",
      },
    },
  },
  render: () => (
    <div className="flex w-[420px] flex-col gap-[12px]">
      <Toast
        variant="default"
        message={
          <>
            Your{" "}
            <strong className="font-semibold">Basic Breakfast Bar</strong> has been{" "}
            <strong className="font-semibold">added to cart</strong>
          </>
        }
        action={{ label: "View", onClick: noop }}
        onDismiss={noop}
      />
      <Toast
        variant="success"
        message="Order placed successfully!"
        action={{ label: "Track order", onClick: noop }}
        onDismiss={noop}
      />
      <Toast
        variant="info"
        message="New menu items are available for your event."
        action={{ label: "Explore", onClick: noop }}
        onDismiss={noop}
      />
      <Toast
        variant="warning"
        message="Your cart expires in 10 minutes."
        action={{ label: "Extend", onClick: noop }}
        onDismiss={noop}
      />
      <Toast
        variant="error"
        message="Payment failed — please update your card."
        action={{ label: "Retry", onClick: noop }}
        onDismiss={noop}
      />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// With Description
// ─────────────────────────────────────────────────────────────────────────────

export const WithDescription: Story = {
  name: "With Description",
  args: { message: "" },
  parameters: {
    docs: {
      description: {
        story:
          "Use `description` for secondary context — keep it to one short sentence.",
      },
    },
  },
  render: () => (
    <div className="flex w-[420px] flex-col gap-[12px]">
      <Toast
        variant="default"
        message="Basic Breakfast Bar added to cart"
        description="Delivery estimated for Friday, 30 May."
        action={{ label: "View cart", onClick: noop }}
        onDismiss={noop}
      />
      <Toast
        variant="success"
        message="Payment confirmed"
        description="Receipt sent to abi@cateringrewards.com"
        onDismiss={noop}
      />
      <Toast
        variant="error"
        message="Upload failed"
        description="File exceeds the 10 MB limit. Please compress and retry."
        action={{ label: "Retry", onClick: noop }}
        onDismiss={noop}
      />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// With Action
// ─────────────────────────────────────────────────────────────────────────────

export const WithAction: Story = {
  name: "With Action",
  args: { message: "" },
  parameters: {
    docs: {
      description: {
        story:
          "The `action` prop adds a text button beside the message. Use a short verb phrase (View, Undo, Retry).",
      },
    },
  },
  render: () => (
    <div className="flex w-[420px] flex-col gap-[12px]">
      <Toast
        variant="default"
        message="Catering package saved as draft"
        action={{ label: "Undo", onClick: noop }}
        onDismiss={noop}
      />
      <Toast
        variant="success"
        message="Quote sent to client"
        action={{ label: "View quote", onClick: noop }}
        onDismiss={noop}
      />
      <Toast
        variant="warning"
        message="Session about to expire"
        action={{ label: "Stay signed in", onClick: noop }}
        onDismiss={noop}
      />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// Without Action or Dismiss
// ─────────────────────────────────────────────────────────────────────────────

export const MinimalToast: Story = {
  name: "Minimal (No Action, No Dismiss)",
  args: { message: "" },
  parameters: {
    docs: {
      description: {
        story:
          "Auto-dismissed toasts that require no user interaction — useful for low-priority confirmations.",
      },
    },
  },
  render: () => (
    <div className="flex w-[420px] flex-col gap-[12px]">
      <Toast
        variant="default"
        message="Changes saved"
        showDismiss={false}
      />
      <Toast
        variant="success"
        message="Profile updated"
        showDismiss={false}
      />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// Without Icon
// ─────────────────────────────────────────────────────────────────────────────

export const WithoutIcon: Story = {
  name: "Without Icon",
  args: { message: "" },
  parameters: {
    docs: {
      description: {
        story:
          "Set `hideIcon` to suppress the status icon on alert variants — useful in compact layouts.",
      },
    },
  },
  render: () => (
    <div className="flex w-[420px] flex-col gap-[12px]">
      <Toast variant="success" message="Changes published" hideIcon onDismiss={noop} />
      <Toast variant="error"   message="Connection lost — retrying…" hideIcon onDismiss={noop} />
      <Toast variant="warning" message="Low disk space on attached media" hideIcon onDismiss={noop} />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// Rich Message
// ─────────────────────────────────────────────────────────────────────────────

export const RichMessage: Story = {
  name: "Rich Message",
  args: { message: "" },
  parameters: {
    docs: {
      description: {
        story:
          "The `message` prop accepts ReactNode — use `<strong>` for product names or key terms as shown in Figma.",
      },
    },
  },
  render: () => (
    <div className="flex w-[420px] flex-col gap-[12px]">
      <Toast
        variant="default"
        message={
          <>
            Your <strong className="font-semibold">Basic Breakfast Bar</strong> has been{" "}
            <strong className="font-semibold">added to cart</strong>
          </>
        }
        action={{ label: "View", onClick: noop }}
        onDismiss={noop}
      />
      <Toast
        variant="success"
        message={
          <>
            <strong className="font-semibold">Order #2847</strong> was confirmed and is being prepared.
          </>
        }
        action={{ label: "Track", onClick: noop }}
        onDismiss={noop}
      />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// Kitchen Sink
// ─────────────────────────────────────────────────────────────────────────────

export const KitchenSink: Story = {
  name: "Kitchen Sink",
  args: { message: "" },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Every variant with every prop combination in one view.",
      },
    },
  },
  render: () => (
    <div className="flex w-[460px] flex-col gap-[10px] py-4">
      {/* Default */}
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Default</p>
      <Toast variant="default" message="Basic Breakfast Bar added to cart" action={{ label: "View", onClick: noop }} onDismiss={noop} />
      <Toast variant="default" message="Draft saved" showDismiss={false} />
      <Toast variant="default" message="Changes saved" description="Last saved at 3:42 PM" action={{ label: "Undo", onClick: noop }} onDismiss={noop} />

      {/* Success */}
      <p className="mt-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Success</p>
      <Toast variant="success" message="Order placed successfully!" action={{ label: "Track order", onClick: noop }} onDismiss={noop} />
      <Toast variant="success" message="Payment confirmed" description="Receipt sent to your email." onDismiss={noop} />

      {/* Info */}
      <p className="mt-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Info</p>
      <Toast variant="info" message="3 new menu items added to your region." action={{ label: "Explore", onClick: noop }} onDismiss={noop} />
      <Toast variant="info" message="System maintenance" description="Scheduled for Sunday 2:00 – 4:00 AM." onDismiss={noop} />

      {/* Warning */}
      <p className="mt-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Warning</p>
      <Toast variant="warning" message="Cart expires in 10 minutes." action={{ label: "Extend", onClick: noop }} onDismiss={noop} />
      <Toast variant="warning" message="Low storage" description="You're using 90% of your plan's storage." onDismiss={noop} />

      {/* Error */}
      <p className="mt-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Error</p>
      <Toast variant="error" message="Payment failed — please update your card." action={{ label: "Retry", onClick: noop }} onDismiss={noop} />
      <Toast variant="error" message="Upload failed" description="File exceeds the 10 MB limit." onDismiss={noop} />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// Live Demo — triggers real toasts with Toaster
// ─────────────────────────────────────────────────────────────────────────────

function LiveDemoInner({ position }: { position: ToasterPosition }) {
  const triggers = [
    {
      label: "Default",
      color: "bg-[#101828] text-white hover:bg-[#1d2939]",
      fn: () =>
        fireToast({
          message: (
            <>
              Your <strong className="font-semibold">Basic Breakfast Bar</strong> has been{" "}
              <strong className="font-semibold">added to cart</strong>
            </>
          ),
          action: { label: "View", onClick: noop },
        }),
    },
    {
      label: "Success",
      color: "bg-[#067e39] text-white hover:bg-[#033f1c]",
      fn: () => fireToast.success("Order placed — thank you!", { action: { label: "Track", onClick: noop } }),
    },
    {
      label: "Info",
      color: "bg-[#7c3aed] text-white hover:bg-[#4a0066]",
      fn: () => fireToast.info("New menu items are available in your area."),
    },
    {
      label: "Warning",
      color: "bg-[#d97706] text-white hover:bg-[#92400e]",
      fn: () => fireToast.warning("Your cart expires in 10 minutes.", { action: { label: "Extend", onClick: noop } }),
    },
    {
      label: "Error",
      color: "bg-[#c22d2c] text-white hover:bg-[#6b0100]",
      fn: () => fireToast.error("Payment failed — please retry.", { action: { label: "Retry", onClick: noop } }),
    },
  ]

  return (
    <div className="relative flex min-h-[260px] w-full flex-col items-center justify-center gap-[32px] rounded-[12px] bg-[#fafbfc] p-[40px]">
      {/* Position label */}
      <div className="absolute top-[12px] right-[12px] rounded-full bg-[#101828] px-[10px] py-[4px] text-[11px] font-medium text-white">
        {position}
      </div>

      <p className="text-[14px] text-muted-foreground">
        Click a button to fire a live toast ↗
      </p>

      <div className="flex flex-wrap justify-center gap-[8px]">
        {triggers.map(({ label, color, fn }) => (
          <button
            key={label}
            type="button"
            onClick={fn}
            className={`cursor-pointer rounded-full px-[16px] py-[8px] text-[13px] font-semibold transition-colors duration-150 ${color}`}
          >
            {label}
          </button>
        ))}
      </div>

      <Toaster position={position} />
    </div>
  )
}

export const LiveDemo: Story = {
  name: "Live Demo",
  args: { message: "" },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Fire real toasts using `toast()` / `toast.success()` etc. The `<Toaster />` component is mounted and renders active toasts in the corner. Auto-dismisses after 4 s.",
      },
    },
  },
  render: () => <LiveDemoInner position="bottom-right" />,
}

// ─────────────────────────────────────────────────────────────────────────────
// Position
// ─────────────────────────────────────────────────────────────────────────────

const POSITIONS: ToasterPosition[] = [
  "top-left", "top-center", "top-right",
  "bottom-left", "bottom-center", "bottom-right",
]

export const Position: Story = {
  name: "Positions",
  args: { message: "" },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "The `<Toaster position>` prop accepts 6 anchors. Click each tile to see how toasts appear in that corner/edge.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-3 gap-[12px]">
      {POSITIONS.map((pos) => (
        <LiveDemoInner key={pos} position={pos} />
      ))}
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// Persistent Toast
// ─────────────────────────────────────────────────────────────────────────────

export const Persistent: Story = {
  name: "Persistent (No Auto-Dismiss)",
  args: { message: "" },
  parameters: {
    docs: {
      description: {
        story:
          "Pass `duration: 0` to keep a toast on screen indefinitely. The user must explicitly dismiss it. Use sparingly — only for critical, actionable errors.",
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [visible, setVisible] = React.useState(true)

    if (!visible) {
      return (
        <div className="flex w-[420px] flex-col items-center gap-[16px]">
          <p className="text-[14px] text-muted-foreground">Toast dismissed.</p>
          <button
            type="button"
            onClick={() => setVisible(true)}
            className="cursor-pointer rounded-full bg-[#101828] px-[16px] py-[8px] text-[13px] font-semibold text-white"
          >
            Restore
          </button>
        </div>
      )
    }

    return (
      <div className="w-[420px]">
        <Toast
          variant="error"
          message="Action required: your subscription has expired."
          description="Renew to continue accessing WeCaterAI."
          action={{ label: "Renew now", onClick: noop }}
          showDismiss
          onDismiss={() => setVisible(false)}
        />
      </div>
    )
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Stacked Queue
// ─────────────────────────────────────────────────────────────────────────────

export const StackedQueue: Story = {
  name: "Stacked Queue",
  args: { message: "" },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Up to 5 toasts stack in the Toaster. Oldest toast is at the bottom; newest sits on top. Click 'Add toast' multiple times to see the queue fill.",
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { toasts, dismiss, dismissAll } = useToast()
    const variants = ["default", "success", "info", "warning", "error"] as const
    const messages = [
      "Basic Breakfast Bar added to cart",
      "Order placed successfully!",
      "New items available in your region.",
      "Cart expires in 10 minutes.",
      "Payment failed — please retry.",
    ]
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const counter = React.useRef(0)

    const addToast = () => {
      const i = counter.current % 5
      counter.current++
      fireToast({ message: messages[i], variant: variants[i], duration: 0, showDismiss: true })
    }

    return (
      <div className="flex w-[460px] flex-col gap-[20px]">
        <div className="flex gap-[8px]">
          <button
            type="button"
            onClick={addToast}
            className="cursor-pointer rounded-full bg-[#101828] px-[16px] py-[8px] text-[13px] font-semibold text-white hover:bg-[#1d2939]"
          >
            + Add toast
          </button>
          <button
            type="button"
            onClick={dismissAll}
            className="cursor-pointer rounded-full border border-[#d9dde4] px-[16px] py-[8px] text-[13px] font-semibold text-[#68707c] hover:bg-[#f1f2f5]"
          >
            Clear all
          </button>
        </div>

        <div className="flex flex-col gap-[8px]">
          {toasts.length === 0 && (
            <p className="text-[14px] text-muted-foreground">No active toasts — click "Add toast" above.</p>
          )}
          {toasts.map((t) => (
            <Toast
              key={t.id}
              variant={t.variant}
              message={t.message}
              showDismiss
              onDismiss={() => dismiss(t.id)}
            />
          ))}
        </div>
      </div>
    )
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// API Reference
// ─────────────────────────────────────────────────────────────────────────────

export const APIReference: Story = {
  name: "API Reference",
  args: { message: "" },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: `
### \`<Toast />\` props

| Prop | Type | Default | Description |
|---|---|---|---|
| \`variant\` | \`"default" \\| "success" \\| "info" \\| "warning" \\| "error"\` | \`"default"\` | Visual style |
| \`message\` | \`ReactNode\` | — | Primary text (required) |
| \`description\` | \`ReactNode\` | — | Secondary line of text |
| \`action\` | \`{ label: string; onClick: () => void }\` | — | Inline action button |
| \`showDismiss\` | \`boolean\` | \`true\` | Show × dismiss button |
| \`onDismiss\` | \`() => void\` | — | Called when × is clicked |
| \`hideIcon\` | \`boolean\` | \`false\` | Hide status icon (alert variants) |

---

### \`toast()\` imperative API

\`\`\`ts
import { toast } from "@/hooks/use-toast"

// Full options
toast({
  message:     "Your order is confirmed.",
  variant:     "success",
  description: "Receipt sent to your email.",
  action:      { label: "Track", onClick: () => {} },
  showDismiss: true,
  duration:    4000,   // ms — 0 = persistent
})

// Shorthand helpers
toast.success("Saved!")
toast.error("Something went wrong.")
toast.warning("Cart expires in 5 min.")
toast.info("New items added to your region.")
\`\`\`

---

### \`<Toaster />\` props

| Prop | Type | Default | Description |
|---|---|---|---|
| \`position\` | \`"top-left" \\| "top-center" \\| "top-right" \\| "bottom-left" \\| "bottom-center" \\| "bottom-right"\` | \`"bottom-right"\` | Screen anchor |
| \`toastWidth\` | \`number \\| string\` | \`400\` | Max width of each toast pill |

---

### \`useToast()\` hook

\`\`\`ts
const { toasts, toast, dismiss, dismissAll } = useToast()
\`\`\`

| Return | Type | Description |
|---|---|---|
| \`toasts\` | \`ToastItem[]\` | Active toast list |
| \`toast\` | \`(opts) => { id, dismiss }\` | Fire a new toast |
| \`dismiss(id)\` | \`(string) => void\` | Remove a toast by id |
| \`dismissAll()\` | \`() => void\` | Remove all active toasts |
        `,
      },
    },
  },
  render: () => (
    <div className="flex w-[420px] flex-col gap-[12px]">
      <Toast
        variant="default"
        message={
          <>Your <strong className="font-semibold">Basic Breakfast Bar</strong> has been <strong className="font-semibold">added to cart</strong></>
        }
        action={{ label: "View", onClick: noop }}
        onDismiss={noop}
      />
      <Toast variant="success" message="Reference card — see docs tab for full API." onDismiss={noop} />
    </div>
  ),
}

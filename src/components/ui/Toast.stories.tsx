/**
 * Toast stories — Cater Design System
 *
 * Figma: https://www.figma.com/design/tK5SjqGRgeVr5w5tmxuLDa/Cater-Design-System?node-id=4810-11345
 */

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import { Toast } from "@/components/ui/toast"
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"
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
**Cater Toast** is the in-app notification primitive. Two flavours:

- **Default (dark)** — the canonical Cater toast. Dark \`#101828\` background, white text, Gossip-green action link. Used for transient confirmations (added to cart, saved, queued).
- **Alert variants** — \`success\`, \`info\`, \`warning\`, \`error\` — coloured toasts for system feedback requiring attention.

### Anatomy

\`\`\`
[icon?]  [message · description?]  [action?]  [×]
\`\`\`

### Usage

\`\`\`tsx
// 1. Mount <Toaster /> once at your layout root
import { Toaster } from "@/components/ui/toaster"
<Toaster position="bottom-right" />

// 2. Trigger toasts from anywhere
import { toast } from "@/hooks/use-toast"

toast({ message: "Order added to cart", action: { label: "View", onClick: () => {} } })
toast.success("Payment confirmed!")
toast.error("Upload failed — please retry.")
toast.warning("Session expires in 5 min.")
toast.info("3 new menu items available.")
\`\`\`

### Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Keep messages under 2 lines | Write paragraphs in a toast |
| Use default (dark) for cart/save confirmations | Use for errors that need form-level detail |
| Provide an action when result is navigable | Stack more than 5 toasts at once |
| Allow manual dismiss for critical alerts | Auto-dismiss toasts with error info |
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "info", "warning", "error"],
      description: "Visual style",
      table: { defaultValue: { summary: "default" } },
    },
    message: {
      control: "text",
      description: "Primary message (required)",
    },
    description: {
      control: "text",
      description: "Optional secondary line",
    },
    showDismiss: {
      control: "boolean",
      description: "Show × dismiss button",
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

const noop = () => {}

// ─────────────────────────────────────────────────────────────────────────────
// Playground
// ─────────────────────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: "Playground",
  args: {
    variant: "default",
    message: "Your Basic Breakfast Bar has been added to cart",
    showDismiss: true,
    hideIcon: false,
    action: { label: "View", onClick: noop },
  },
  render: (args) => (
    <div className="w-[420px]">
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
          "Five variants: **default** (dark) is the primary Cater toast. Alert variants communicate semantic status.",
      },
    },
  },
  render: () => (
    <div className="flex w-[440px] flex-col gap-[10px]">
      {/* Default */}
      <Toast
        variant="default"
        message={
          <span>
            Your <strong className="font-semibold">Basic Breakfast Bar</strong> has been{" "}
            <strong className="font-semibold">added to cart</strong>
          </span>
        }
        action={{ label: "View", onClick: noop }}
        onDismiss={noop}
      />
      {/* Success */}
      <Toast
        variant="success"
        message="Order placed successfully!"
        action={{ label: "Track order", onClick: noop }}
        onDismiss={noop}
      />
      {/* Info */}
      <Toast
        variant="info"
        message="New menu items are available for your event."
        action={{ label: "Explore", onClick: noop }}
        onDismiss={noop}
      />
      {/* Warning */}
      <Toast
        variant="warning"
        message="Your cart expires in 10 minutes."
        action={{ label: "Extend", onClick: noop }}
        onDismiss={noop}
      />
      {/* Error */}
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
          "Add a secondary `description` line for extra context. Keep it to one short sentence.",
      },
    },
  },
  render: () => (
    <div className="flex w-[440px] flex-col gap-[10px]">
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
          "The `action` prop adds an inline text button. Use a short verb phrase — View, Undo, Retry, Track.",
      },
    },
  },
  render: () => (
    <div className="flex w-[440px] flex-col gap-[10px]">
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
// Minimal (no action, no dismiss)
// ─────────────────────────────────────────────────────────────────────────────

export const Minimal: Story = {
  name: "Minimal",
  args: { message: "" },
  parameters: {
    docs: {
      description: {
        story:
          "Auto-dismissed toasts that need no user interaction — for low-priority confirmations.",
      },
    },
  },
  render: () => (
    <div className="flex w-[440px] flex-col gap-[10px]">
      <Toast variant="default" message="Changes saved" showDismiss={false} />
      <Toast variant="success" message="Profile updated successfully" showDismiss={false} />
      <Toast variant="info"    message="Syncing your data…" showDismiss={false} />
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
          "Set `hideIcon` to remove the status icon from alert variants — useful in very compact layouts.",
      },
    },
  },
  render: () => (
    <div className="flex w-[440px] flex-col gap-[10px]">
      <Toast variant="success" message="Changes published" hideIcon onDismiss={noop} />
      <Toast variant="error"   message="Connection lost — retrying…" hideIcon onDismiss={noop} />
      <Toast variant="warning" message="Low disk space on attached media" hideIcon onDismiss={noop} />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// Rich Message (bold inline spans — per Figma)
// ─────────────────────────────────────────────────────────────────────────────

export const RichMessage: Story = {
  name: "Rich Message",
  args: { message: "" },
  parameters: {
    docs: {
      description: {
        story:
          "The `message` prop accepts ReactNode. Use `<strong>` to highlight product names or key terms — as shown in the Figma reference design.",
      },
    },
  },
  render: () => (
    <div className="flex w-[440px] flex-col gap-[10px]">
      <Toast
        variant="default"
        message={
          <span>
            Your <strong className="font-semibold">Basic Breakfast Bar</strong> has been{" "}
            <strong className="font-semibold">added to cart</strong>
          </span>
        }
        action={{ label: "View", onClick: noop }}
        onDismiss={noop}
      />
      <Toast
        variant="success"
        message={
          <span>
            <strong className="font-semibold">Order #2847</strong> was confirmed and is being prepared.
          </span>
        }
        action={{ label: "Track", onClick: noop }}
        onDismiss={noop}
      />
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// Live Demo — fire real toasts
// ─────────────────────────────────────────────────────────────────────────────

function LiveDemoPanel({ position }: { position: ToasterPosition }) {
  const TRIGGERS = [
    {
      label: "Default",
      variant: "outline" as const,
      fire: () =>
        fireToast({
          message: (
            <span>
              Your <strong className="font-semibold">Basic Breakfast Bar</strong> has been{" "}
              <strong className="font-semibold">added to cart</strong>
            </span>
          ),
          action: { label: "View", onClick: noop },
        }),
    },
    {
      label: "Success",
      variant: "default" as const,
      fire: () =>
        fireToast.success("Order placed — thank you!", {
          action: { label: "Track", onClick: noop },
        }),
    },
    {
      label: "Info",
      variant: "secondary" as const,
      fire: () =>
        fireToast.info("New menu items are available in your area."),
    },
    {
      label: "Warning",
      variant: "outline" as const,
      fire: () =>
        fireToast.warning("Your cart expires in 10 minutes.", {
          action: { label: "Extend", onClick: noop },
        }),
    },
    {
      label: "Error",
      variant: "destructive" as const,
      fire: () =>
        fireToast.error("Payment failed — please retry.", {
          action: { label: "Retry", onClick: noop },
        }),
    },
  ] as const

  return (
    <div className="relative flex min-h-[240px] w-full flex-col items-center justify-center gap-[28px] rounded-[12px] bg-[#fafbfc] border border-[#e4e7ec] p-[32px]">
      {/* Position badge */}
      <span className="absolute top-[10px] right-[10px] rounded-full bg-[#101828] px-[10px] py-[3px] text-[11px] font-medium tracking-wide text-white">
        {position}
      </span>

      <p className="text-[13px] text-muted-foreground text-center">
        Click a button to fire a live toast →
      </p>

      <div className="flex flex-wrap justify-center gap-[8px]">
        {TRIGGERS.map(({ label, variant, fire }) => (
          <Button key={label} variant={variant} size="sm" onClick={fire}>
            {label}
          </Button>
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
          "Fire real toasts using the imperative `toast()` API. The `<Toaster />` is mounted inside this demo and renders live notifications. Toasts auto-dismiss after 4 s.",
      },
    },
  },
  render: () => <LiveDemoPanel position="bottom-right" />,
}

// ─────────────────────────────────────────────────────────────────────────────
// Positions
// ─────────────────────────────────────────────────────────────────────────────

const POSITIONS: ToasterPosition[] = [
  "top-left", "top-center", "top-right",
  "bottom-left", "bottom-center", "bottom-right",
]

export const Positions: Story = {
  name: "Positions",
  args: { message: "" },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "The `<Toaster position>` prop accepts 6 anchors. Click each tile to see toasts appear in that corner or edge.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-3 gap-[12px] w-full">
      {POSITIONS.map((pos) => (
        <LiveDemoPanel key={pos} position={pos} />
      ))}
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// Persistent
// ─────────────────────────────────────────────────────────────────────────────

export const Persistent: Story = {
  name: "Persistent",
  args: { message: "" },
  parameters: {
    docs: {
      description: {
        story:
          "Pass `duration: 0` to keep a toast on screen until the user explicitly dismisses it. Use sparingly — only for critical, actionable errors.",
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [visible, setVisible] = React.useState(true)
    return (
      <div className="flex w-[440px] flex-col items-start gap-[16px]">
        {visible ? (
          <Toast
            variant="error"
            message="Action required: your subscription has expired."
            description="Renew to continue accessing WeCaterAI."
            action={{ label: "Renew now", onClick: noop }}
            showDismiss
            onDismiss={() => setVisible(false)}
          />
        ) : (
          <p className="text-[14px] text-muted-foreground">Toast dismissed.</p>
        )}
        <Button
          variant={visible ? "outline" : "default"}
          size="sm"
          onClick={() => setVisible(true)}
        >
          {visible ? "Dismiss the toast above" : "Restore toast"}
        </Button>
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
          "Up to 5 toasts stack in the Toaster. Newest sits on top; oldest auto-dismisses first. Click **Add toast** repeatedly to see the queue fill.",
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { toasts, dismiss, dismissAll } = useToast()
    const counter = React.useRef(0)
    const CYCLE = [
      { message: "Basic Breakfast Bar added to cart", variant: "default" },
      { message: "Order placed successfully!", variant: "success" },
      { message: "New items available in your region.", variant: "info" },
      { message: "Cart expires in 10 minutes.", variant: "warning" },
      { message: "Payment failed — please retry.", variant: "error" },
    ] as const

    const addToast = () => {
      const item = CYCLE[counter.current % 5]
      counter.current++
      fireToast({ message: item.message, variant: item.variant, duration: 0 })
    }

    return (
      <div className="flex w-[460px] flex-col gap-[20px]">
        <div className="flex gap-[8px]">
          <Button variant="default" size="sm" onClick={addToast}>+ Add toast</Button>
          <Button variant="outline" size="sm" onClick={dismissAll}>Clear all</Button>
        </div>
        <div className="flex flex-col gap-[8px]">
          {toasts.length === 0 && (
            <p className="text-[14px] text-muted-foreground">
              No active toasts — click "Add toast" above.
            </p>
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
// Kitchen Sink
// ─────────────────────────────────────────────────────────────────────────────

export const KitchenSink: Story = {
  name: "Kitchen Sink",
  args: { message: "" },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Every variant × prop combination in one view.",
      },
    },
  },
  render: () => (
    <div className="flex w-[460px] flex-col gap-[8px] py-2">
      {(
        [
          ["Default",  "default"],
          ["Success",  "success"],
          ["Info",     "info"],
          ["Warning",  "warning"],
          ["Error",    "error"],
        ] as const
      ).map(([label, variant]) => (
        <React.Fragment key={variant}>
          <p className="mt-4 first:mt-0 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            {label}
          </p>
          {/* With action */}
          <Toast
            variant={variant}
            message={`${label} toast with action`}
            action={{ label: "Action", onClick: noop }}
            onDismiss={noop}
          />
          {/* With description */}
          <Toast
            variant={variant}
            message={`${label} toast with description`}
            description="Additional context goes here."
            onDismiss={noop}
          />
          {/* Minimal */}
          <Toast
            variant={variant}
            message={`${label} toast — minimal`}
            showDismiss={false}
          />
        </React.Fragment>
      ))}
    </div>
  ),
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
| \`message\` | \`ReactNode\` | — | Primary text **(required)** |
| \`description\` | \`ReactNode\` | — | Secondary line |
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
  duration:    4000,   // ms — pass 0 for persistent
})

// Shorthand helpers
toast.success("Saved!")
toast.error("Something went wrong.")
toast.warning("Cart expires soon.")
toast.info("New items added.")
\`\`\`

---

### \`<Toaster />\` props

| Prop | Type | Default | Description |
|---|---|---|---|
| \`position\` | \`"top-left" \\| "top-center" \\| "top-right" \\| "bottom-left" \\| "bottom-center" \\| "bottom-right"\` | \`"bottom-right"\` | Screen anchor |
| \`toastWidth\` | \`number \\| string\` | \`400\` | Max width of each toast |

---

### \`useToast()\` hook

\`\`\`ts
const { toasts, toast, dismiss, dismissAll } = useToast()
\`\`\`
        `,
      },
    },
  },
  render: () => (
    <div className="flex w-[440px] flex-col gap-[10px]">
      <Toast
        variant="default"
        message={
          <span>
            Your <strong className="font-semibold">Basic Breakfast Bar</strong> has been{" "}
            <strong className="font-semibold">added to cart</strong>
          </span>
        }
        action={{ label: "View", onClick: noop }}
        onDismiss={noop}
      />
      <Toast
        variant="success"
        message="See the Docs tab above for the full API reference."
        onDismiss={noop}
      />
    </div>
  ),
}

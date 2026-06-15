/**
 * @cateringrewards/ui-design-components
 *
 * Public package surface — everything exported here is available to consumers.
 * Anything NOT listed here does not ship.
 *
 * Versioning reminder (semver):
 *   patch  — styling fix, props unchanged      (0.1.0 → 0.1.1)
 *   minor  — new component / optional prop     (0.1.0 → 0.2.0)
 *   major  — removed / renamed prop/component  (0.1.0 → 1.0.0)
 */

// ─── Primitives (shadcn base) ─────────────────────────────────────────────────
export * from "./components/ui/button"
export * from "./components/ui/input"
export * from "./components/ui/label"
export * from "./components/ui/avatar"
export * from "./components/ui/table"
export * from "./components/ui/toast"
export * from "./components/ui/toaster"

// ─── Form controls ────────────────────────────────────────────────────────────
export * from "./components/ui/input-field"
export * from "./components/ui/cater-switch"

// ─── Data display ─────────────────────────────────────────────────────────────
export * from "./components/ui/status-badge"
export * from "./components/ui/orders-table"
export * from "./components/ui/pagination"

// ─── Identity & layout ────────────────────────────────────────────────────────
export * from "./components/ui/logo"
export * from "./components/ui/cater-avatar"
export * from "./components/ui/marketplace-header"
export * from "./components/ui/marketplace-sidebar"

// ─── Hooks ────────────────────────────────────────────────────────────────────
export * from "./hooks/use-toast"

// ─── Utilities ────────────────────────────────────────────────────────────────
export * from "./lib/utils"

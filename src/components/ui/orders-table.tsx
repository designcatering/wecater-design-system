/**
 * Cater OrdersTable — data table for displaying catering orders.
 *
 * Figma: https://www.figma.com/design/tK5SjqGRgeVr5w5tmxuLDa/Cater-Design-System?node-id=5441-17080
 *
 * ─── Built on shadcn Table primitives ────────────────────────────────────────
 * Table → TableHeader → TableRow → TableHead
 *                     → TableBody  → TableRow → TableCell
 *
 * ─── Columns (Figma widths) ───────────────────────────────────────────────────
 * Order #       132px   16px semibold → body text in cells
 * Customer      226px
 * Date & Time   226px
 * Status        121px   → <StatusBadge />
 * Address       226px   truncated
 * Order amount  154px
 * Action         87px   → ··· button
 *
 * ─── Row states ───────────────────────────────────────────────────────────────
 * header   bg white  · py-[10px] px-[16px] · 14px/600 · #68707c
 * default  bg white  · p-[16px]            · 16px/400 · #29344a  h-[60px]
 * hover    bg #fafbfc · p-[16px]           · 16px/400 · #29344a  h-[60px]
 *
 * ─── Design tokens ────────────────────────────────────────────────────────────
 * --color-text-body     #29344a   cell text
 * --color-text-subtitle #68707c   header text
 * --color-surface-subtle #fafbfc  hover row bg
 * --color-dialogue-outline rgba(217,221,228,0.5)  row border
 * --color-border-default #d9dde4  action button border
 */

"use client"

import * as React from "react"
import { RiMoreFill } from "@remixicon/react"
import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import type { BadgeStatus } from "@/components/ui/status-badge"
import { Pagination } from "@/components/ui/pagination"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface OrderRow {
  id: string
  customer: string
  dateTime: string
  status: BadgeStatus
  address: string
  amount: string
}

export interface OrdersTableProps extends React.HTMLAttributes<HTMLDivElement> {
  data?:           OrderRow[]
  onActionClick?:  (row: OrderRow) => void
  /** Pagination — when provided, renders controls at the bottom-right */
  pagination?: {
    page:         number
    pageSize?:    number
    total:        number
    onPageChange: (page: number) => void
    position?:    "bottom-right" | "top-right"
  }
}

// ─── Column config ────────────────────────────────────────────────────────────

const COLUMNS: { key: string; label: string; width: number }[] = [
  { key: "id",       label: "Order #",      width: 132 },
  { key: "customer", label: "Customer",     width: 226 },
  { key: "dateTime", label: "Date & Time",  width: 226 },
  { key: "status",   label: "Status",       width: 121 },
  { key: "address",  label: "Address",      width: 226 },
  { key: "amount",   label: "Order amount", width: 154 },
  { key: "action",   label: "Action",       width: 87  },
]

// ─── Shared cell padding ──────────────────────────────────────────────────────

const HEADER_STYLE: React.CSSProperties = {
  padding:    "10px 16px",
  color:      "#68707c",
  fontSize:   "14px",
  fontWeight: 600,
  lineHeight: 1.5,
  background: "#ffffff",
}

const CELL_STYLE: React.CSSProperties = {
  padding:    "16px",
  color:      "#29344a",
  fontSize:   "16px",
  fontWeight: 400,
  lineHeight: 1.5,
  letterSpacing: "0.16px",
  height:     "60px",
}

const BORDER_STYLE = "1px solid rgba(217,221,228,0.5)"

// ─── HoverableRow ─────────────────────────────────────────────────────────────
// Tracks its own hover state so cell backgrounds update via inline style —
// avoiding Tailwind scan unreliability with group-hover arbitrary values.

function HoverableRow({
  row,
  onActionClick,
}: {
  row: OrderRow
  onActionClick?: (row: OrderRow) => void
}) {
  const [hovered, setHovered] = React.useState(false)
  const bg = hovered ? "#fafbfc" : "#ffffff"
  const cellStyle = { ...CELL_STYLE, background: bg }

  return (
    <TableRow
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ borderBottom: BORDER_STYLE, transition: "background 150ms ease" }}
    >
      <TableCell style={{ ...cellStyle, width: 132 }}>{row.id}</TableCell>
      <TableCell style={{ ...cellStyle, width: 226 }}>{row.customer}</TableCell>
      <TableCell style={{ ...cellStyle, width: 226 }}>{row.dateTime}</TableCell>
      <TableCell style={{ ...cellStyle, width: 121 }}>
        <StatusBadge status={row.status} />
      </TableCell>
      <TableCell style={{ ...cellStyle, width: 226, maxWidth: 226, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {row.address}
      </TableCell>
      <TableCell style={{ ...cellStyle, width: 154 }}>{row.amount}</TableCell>
      <TableCell style={{ ...cellStyle, width: 87 }}>
        <button
          type="button"
          onClick={() => onActionClick?.(row)}
          aria-label={`Actions for order ${row.id}`}
          className="flex items-center justify-center"
          style={{
            width:        "48px",
            height:       "29px",
            border:       "1px solid #d9dde4",
            borderRadius: "4px",
            background:   "#ffffff",
            cursor:       "pointer",
            transition:   "background 150ms ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#f4f6f8" }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#ffffff" }}
        >
          <RiMoreFill aria-hidden="true" className="size-[20px]" style={{ color: "#68707c" }} />
        </button>
      </TableCell>
    </TableRow>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

const OrdersTable = React.forwardRef<HTMLDivElement, OrdersTableProps>(
  ({ data = [], onActionClick, pagination, className, ...props }, ref) => {
    const scrollRef = React.useRef<HTMLDivElement>(null)
    const [canScrollRight, setCanScrollRight] = React.useState(false)

    React.useEffect(() => {
      const el = scrollRef.current
      if (!el) return
      const check = () => setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
      check()
      el.addEventListener("scroll", check, { passive: true })
      const ro = new ResizeObserver(check)
      ro.observe(el)
      return () => { el.removeEventListener("scroll", check); ro.disconnect() }
    }, [])

    const paginationBar = pagination ? (
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "12px 16px" }}>
        <Pagination
          page={pagination.page}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onPageChange={pagination.onPageChange}
        />
      </div>
    ) : null

    return (
      <div ref={ref} className={cn("w-full flex flex-col", className)} {...props}>
        {pagination?.position === "top-right" && paginationBar}

        {/* scroll wrapper — relative so the fade overlay can be positioned inside */}
        <div style={{ position: "relative" }}>
            <Table
              containerRef={scrollRef}
              containerStyle={{ position: "static" }}
              style={{ minWidth: "1172px", width: "100%", borderCollapse: "collapse" }}
            >

              {/* ── Header ────────────────────────────────────────────────── */}
              <TableHeader>
                <TableRow style={{ borderBottom: BORDER_STYLE }}>
                  {COLUMNS.map((col) => (
                    <TableHead
                      key={col.key}
                      style={{ ...HEADER_STYLE, minWidth: col.width }}
                    >
                      {col.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              {/* ── Body ──────────────────────────────────────────────────── */}
              <TableBody>
                {data.map((row, i) => (
                  <HoverableRow
                    key={row.id + i}
                    row={row}
                    onActionClick={onActionClick}
                  />
                ))}

                {/* Empty state */}
                {data.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={COLUMNS.length}
                      style={{ ...CELL_STYLE, textAlign: "center", color: "#68707c" }}
                    >
                      No orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          {/* Right-edge fade — visible when more columns are off-screen */}
          {canScrollRight && (
            <div
              aria-hidden="true"
              style={{
                position:   "absolute",
                right:      0,
                top:        0,
                bottom:     0,
                width:      "48px",
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.92))",
                pointerEvents: "none",
              }}
            />
          )}
        </div>

        {(!pagination?.position || pagination?.position === "bottom-right") && paginationBar}
      </div>
    )
  }
)

OrdersTable.displayName = "OrdersTable"

export { OrdersTable }

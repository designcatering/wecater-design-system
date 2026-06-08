"use client"

import { useState } from "react"
import {
  RiAddLine, RiEditLine, RiDeleteBinLine,
  RiEyeLine, RiEyeOffLine, RiCheckLine,
  RiDraggable, RiSearch2Line, RiPriceTag3Line,
} from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { InputField } from "@/components/ui/input-field"
import { MOCK_MENU, DIETARY_TAG_MAP } from "../_data/mock"
import type { MenuCategoryData, MenuItemData } from "../_data/mock"
import { cn } from "@/lib/utils"

/* ─── Helpers ────────────────────────────────────────────────────────── */

function genId() { return Math.random().toString(36).slice(2, 9) }

function DietaryBadge({ tag }: { tag: string }) {
  const cfg = DIETARY_TAG_MAP[tag]
  if (!cfg) return null
  return (
    <span
      className="px-2 py-0.5 rounded-full text-[10px] font-bold border"
      style={{ color: cfg.color, borderColor: cfg.color, backgroundColor: cfg.color + "18" }}
    >
      {cfg.label}
    </span>
  )
}

function StarRating({ value }: { value: number }) {
  return (
    <span className="text-[#f59e0b] text-[13px]">
      {"★".repeat(value)}{"☆".repeat(5 - value)}
    </span>
  )
}

/* ─── Item edit modal ────────────────────────────────────────────────── */

interface EditModalProps {
  item: MenuItemData
  onSave: (updated: MenuItemData) => void
  onClose: () => void
}

function EditModal({ item, onSave, onClose }: EditModalProps) {
  const [draft, setDraft] = useState({ ...item })

  const toggleTag = (key: string) => {
    setDraft(d => ({
      ...d,
      dietaryTags: d.dietaryTags.includes(key)
        ? d.dietaryTags.filter(t => t !== key)
        : [...d.dietaryTags, key],
    }))
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[520px] bg-white rounded-2xl shadow-xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f1f2f5]">
          <p className="text-[16px] font-bold text-[#101828]">Edit menu item</p>
          <button type="button" onClick={onClose} className="text-[#68707c] hover:text-[#101828] transition-colors text-[20px] leading-none">×</button>
        </div>

        <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Emoji + name */}
          <div className="flex items-start gap-3">
            <div className="size-14 rounded-2xl bg-[#f1f2f5] flex items-center justify-center text-[28px] shrink-0">
              {draft.emoji}
            </div>
            <div className="flex-1">
              <InputField
                label="Item name"
                value={draft.name}
                onChange={e => setDraft(d => ({ ...d, name: e.target.value }))}
                placeholder="e.g. Carne Asada Taco Bar"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-medium text-[#68707c]">Description</label>
            <div className="w-full bg-white border border-[#d9dde4] rounded-2xl shadow-[0_1px_2px_0_#1018280d] px-4 py-3 focus-within:border-[#9cd8b5] focus-within:shadow-[0_0_0_2px_#ceecda] transition-all">
              <textarea
                value={draft.description}
                onChange={e => setDraft(d => ({ ...d, description: e.target.value }))}
                rows={3}
                className="w-full bg-transparent outline-none resize-none text-[15px] font-medium text-[#29344a] placeholder:text-[#68707c]"
              />
            </div>
          </div>

          {/* Price + min order */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Price per person ($)"
              type="number"
              value={String(draft.pricePerPerson)}
              onChange={e => setDraft(d => ({ ...d, pricePerPerson: Number(e.target.value) }))}
            />
            <InputField
              label="Min order (people)"
              type="number"
              value={String(draft.minOrderQty)}
              onChange={e => setDraft(d => ({ ...d, minOrderQty: Number(e.target.value) }))}
            />
          </div>

          {/* Dietary tags */}
          <div>
            <p className="text-[14px] font-medium text-[#68707c] mb-2">Dietary tags</p>
            <div className="flex flex-wrap gap-2">
              {Object.values(DIETARY_TAG_MAP).map(tag => {
                const selected = draft.dietaryTags.includes(tag.key)
                return (
                  <button
                    key={tag.key}
                    type="button"
                    onClick={() => toggleTag(tag.key)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-[12px] font-semibold border transition-all",
                      selected ? "text-white border-transparent" : "bg-white text-[#68707c] border-[#d9dde4] hover:border-current"
                    )}
                    style={selected ? { backgroundColor: tag.color, borderColor: tag.color } : { color: tag.color }}
                  >
                    {selected && "✓ "}{tag.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Available toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              role="switch"
              aria-checked={draft.available}
              onClick={() => setDraft(d => ({ ...d, available: !d.available }))}
              className={cn(
                "relative w-[44px] h-[24px] rounded-full transition-colors duration-200",
                draft.available ? "bg-[#073d30]" : "bg-[#d9dde4]"
              )}
            >
              <div className={cn(
                "absolute top-[2px] size-[20px] rounded-full bg-white shadow-sm transition-transform duration-200",
                draft.available ? "translate-x-[20px]" : "translate-x-[2px]"
              )} />
            </div>
            <p className="text-[14px] font-semibold text-[#101828]">
              {draft.available ? "Available on menu" : "Hidden from menu"}
            </p>
          </label>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-[#f1f2f5]">
          <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
          <Button onClick={() => onSave(draft)} className="flex-1">Save changes</Button>
        </div>
      </div>
    </div>
  )
}

/* ─── Item card ──────────────────────────────────────────────────────── */

function ItemCard({
  item,
  onEdit,
  onDelete,
  onToggle,
}: {
  item: MenuItemData
  onEdit: () => void
  onDelete: () => void
  onToggle: () => void
}) {
  return (
    <div className={cn(
      "group relative bg-white border rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-[0_4px_12px_rgba(16,24,40,0.08)]",
      item.available ? "border-[#d9dde4]" : "border-[#f1f2f5] opacity-60"
    )}>
      {/* Emoji / photo area */}
      <div className="h-[100px] bg-[#f8f9fb] flex items-center justify-center text-[44px] relative">
        {item.emoji}
        {!item.available && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-[11px] font-bold text-[#68707c] bg-white px-2 py-1 rounded-full border border-[#d9dde4]">
              Hidden
            </span>
          </div>
        )}
        {/* Hover actions */}
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={onEdit}
            className="size-7 rounded-lg bg-white shadow-sm border border-[#d9dde4] flex items-center justify-center text-[#68707c] hover:text-[#073d30] transition-colors"
          >
            <RiEditLine className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="size-7 rounded-lg bg-white shadow-sm border border-[#d9dde4] flex items-center justify-center text-[#68707c] hover:text-[#c22d2c] transition-colors"
          >
            <RiDeleteBinLine className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[14px] font-bold text-[#101828] leading-tight">{item.name}</p>
          <p className="text-[14px] font-bold text-[#073d30] shrink-0">${item.pricePerPerson}<span className="text-[11px] font-medium text-[#b2b8c1]">/pp</span></p>
        </div>

        <p className="text-[12px] text-[#68707c] leading-relaxed line-clamp-2">{item.description}</p>

        {item.dietaryTags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.dietaryTags.map(t => <DietaryBadge key={t} tag={t} />)}
          </div>
        )}

        <div className="flex items-center justify-between pt-1 border-t border-[#f8f9fb]">
          <span className="text-[11px] text-[#b2b8c1]">Min {item.minOrderQty} people</span>
          <button
            type="button"
            onClick={onToggle}
            className={cn(
              "flex items-center gap-1 text-[11px] font-semibold rounded-full px-2 py-0.5 transition-colors",
              item.available
                ? "text-[#39b16c] hover:bg-[#e6f5ed]"
                : "text-[#68707c] hover:bg-[#f1f2f5]"
            )}
          >
            {item.available
              ? <><RiEyeLine className="size-3" /> Visible</>
              : <><RiEyeOffLine className="size-3" /> Hidden</>
            }
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────── */

export default function MenuPage() {
  const [categories, setCategories] = useState<MenuCategoryData[]>(MOCK_MENU)
  const [activeCategory, setActiveCategory] = useState(MOCK_MENU[0].id)
  const [editingItem, setEditingItem] = useState<{ catId: string; item: MenuItemData } | null>(null)
  const [search, setSearch] = useState("")
  const [addingCategory, setAddingCategory] = useState(false)
  const [newCatName, setNewCatName] = useState("")

  const totalItems     = categories.reduce((s, c) => s + c.items.length, 0)
  const availableItems = categories.reduce((s, c) => s + c.items.filter(i => i.available).length, 0)
  const avgPrice       = (categories.flatMap(c => c.items).reduce((s, i) => s + i.pricePerPerson, 0) / totalItems).toFixed(2)

  const currentCat = categories.find(c => c.id === activeCategory)

  const filteredItems = search
    ? categories.flatMap(c => c.items.filter(i =>
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        i.description.toLowerCase().includes(search.toLowerCase())
      ))
    : currentCat?.items ?? []

  const updateItem = (catId: string, updated: MenuItemData) => {
    setCategories(prev => prev.map(c =>
      c.id === catId ? { ...c, items: c.items.map(i => i.id === updated.id ? updated : i) } : c
    ))
    setEditingItem(null)
  }

  const toggleItem = (catId: string, itemId: string) => {
    setCategories(prev => prev.map(c =>
      c.id === catId
        ? { ...c, items: c.items.map(i => i.id === itemId ? { ...i, available: !i.available } : i) }
        : c
    ))
  }

  const deleteItem = (catId: string, itemId: string) => {
    setCategories(prev => prev.map(c =>
      c.id === catId ? { ...c, items: c.items.filter(i => i.id !== itemId) } : c
    ))
  }

  const addCategory = () => {
    if (!newCatName.trim()) return
    const newCat: MenuCategoryData = { id: genId(), name: newCatName.trim(), items: [] }
    setCategories(prev => [...prev, newCat])
    setActiveCategory(newCat.id)
    setNewCatName("")
    setAddingCategory(false)
  }

  const addItem = (catId: string) => {
    const newItem: MenuItemData = {
      id: genId(), emoji: "🍽️",
      name: "", description: "", pricePerPerson: 0,
      minOrderQty: 10, dietaryTags: [], available: true,
    }
    setCategories(prev => prev.map(c =>
      c.id === catId ? { ...c, items: [...c.items, newItem] } : c
    ))
    setEditingItem({ catId, item: newItem })
  }

  return (
    <div className="flex-1 overflow-y-auto">

      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#d9dde4] px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-bold text-[#101828] font-[family-name:var(--font-title)]">Menu</h1>
          <p className="text-[13px] text-[#68707c]">{availableItems} of {totalItems} items visible to clients</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            iconPosition="left"
            icon={<RiAddLine />}
            onClick={() => addItem(activeCategory)}
          >
            Add item
          </Button>
        </div>
      </div>

      <div className="px-8 py-6 space-y-6">

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total items",     value: String(totalItems),                  sub: `${categories.length} categories`  },
            { label: "Live on menu",    value: String(availableItems),              sub: `${totalItems - availableItems} hidden`   },
            { label: "Hidden / paused", value: String(totalItems - availableItems), sub: "Not visible to clients"           },
            { label: "Avg price / pp",  value: `$${avgPrice}`,                      sub: "Across all items"                 },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-white border border-[#d9dde4] rounded-2xl p-4">
              <p className="text-[11px] font-bold text-[#b2b8c1] uppercase tracking-wide mb-1">{label}</p>
              <p className="text-[24px] font-bold text-[#101828] font-[family-name:var(--font-title)] leading-tight">{value}</p>
              <p className="text-[12px] text-[#b2b8c1] mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* Category tabs + search */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 flex-1 overflow-x-auto pb-0.5">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => { setActiveCategory(cat.id); setSearch("") }}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors shrink-0",
                  activeCategory === cat.id && !search
                    ? "bg-[#073d30] text-white"
                    : "text-[#68707c] hover:bg-[#f1f2f5] border border-[#d9dde4]"
                )}
              >
                {cat.name}
                <span className={cn(
                  "text-[11px] font-bold",
                  activeCategory === cat.id && !search ? "text-[#9cd8b5]" : "text-[#b2b8c1]"
                )}>
                  {cat.items.length}
                </span>
              </button>
            ))}

            {/* Add category */}
            {addingCategory ? (
              <div className="flex items-center gap-2 shrink-0">
                <input
                  autoFocus
                  value={newCatName}
                  onChange={e => setNewCatName(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") addCategory(); if (e.key === "Escape") setAddingCategory(false) }}
                  placeholder="Category name…"
                  className="px-3 py-2 rounded-full text-[13px] border border-[#9cd8b5] outline-none bg-white w-[160px]"
                />
                <Button size="sm" onClick={addCategory}>Add</Button>
                <Button size="sm" variant="ghost" onClick={() => setAddingCategory(false)}>×</Button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setAddingCategory(true)}
                className="flex items-center gap-1 px-3 py-2 rounded-full text-[12px] font-semibold text-[#68707c] hover:bg-[#f1f2f5] border border-dashed border-[#d9dde4] transition-colors shrink-0"
              >
                <RiAddLine className="size-3.5" /> Category
              </button>
            )}
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2 bg-[#f5f6f8] rounded-full border border-transparent focus-within:border-[#9cd8b5] focus-within:bg-white transition-colors shrink-0 w-[220px]">
            <RiSearch2Line className="size-4 text-[#68707c] shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search items…"
              className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-[#b2b8c1] text-[#29344a]"
            />
          </div>
        </div>

        {/* Items grid */}
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="size-16 rounded-full bg-[#f1f2f5] flex items-center justify-center text-[28px] mb-4">🍽️</div>
            <p className="text-[15px] font-bold text-[#101828] mb-1">No items yet</p>
            <p className="text-[13px] text-[#68707c] mb-5">Add your first item to this category</p>
            <Button
              iconPosition="left"
              icon={<RiAddLine />}
              onClick={() => addItem(activeCategory)}
            >
              Add item
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filteredItems.map(item => {
              const catId = search
                ? categories.find(c => c.items.some(i => i.id === item.id))?.id ?? activeCategory
                : activeCategory
              return (
                <ItemCard
                  key={item.id}
                  item={item}
                  onEdit={() => setEditingItem({ catId, item })}
                  onDelete={() => deleteItem(catId, item.id)}
                  onToggle={() => toggleItem(catId, item.id)}
                />
              )
            })}

            {/* Add item card */}
            {!search && (
              <button
                type="button"
                onClick={() => addItem(activeCategory)}
                className="flex flex-col items-center justify-center gap-2 h-full min-h-[220px] border-2 border-dashed border-[#d9dde4] rounded-2xl text-[#68707c] hover:border-[#9cd8b5] hover:text-[#073d30] hover:bg-[#f0faf5] transition-colors"
              >
                <div className="size-10 rounded-full bg-[#f1f2f5] flex items-center justify-center group-hover:bg-[#e6f5ed]">
                  <RiAddLine className="size-5" />
                </div>
                <p className="text-[13px] font-semibold">Add item</p>
              </button>
            )}
          </div>
        )}

        {/* Category actions */}
        {!search && currentCat && currentCat.items.length > 0 && (
          <div className="flex items-center justify-between px-5 py-3.5 bg-[#fafbfc] border border-[#d9dde4] rounded-2xl">
            <div className="flex items-center gap-2">
              <RiPriceTag3Line className="size-4 text-[#68707c]" />
              <p className="text-[13px] font-semibold text-[#29344a]">
                {currentCat.name} · {currentCat.items.filter(i => i.available).length} of {currentCat.items.length} items visible
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCategories(prev => prev.map(c =>
                  c.id === activeCategory ? { ...c, items: c.items.map(i => ({ ...i, available: true })) } : c
                ))}
                className="text-[12px] font-semibold text-[#39b16c] hover:underline"
              >
                Show all
              </button>
              <span className="text-[#d9dde4]">·</span>
              <button
                type="button"
                onClick={() => setCategories(prev => prev.map(c =>
                  c.id === activeCategory ? { ...c, items: c.items.map(i => ({ ...i, available: false })) } : c
                ))}
                className="text-[12px] font-semibold text-[#68707c] hover:underline"
              >
                Hide all
              </button>
              <span className="text-[#d9dde4]">·</span>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Delete "${currentCat.name}" and all its items?`)) {
                    const remaining = categories.filter(c => c.id !== activeCategory)
                    setCategories(remaining)
                    setActiveCategory(remaining[0]?.id ?? "")
                  }
                }}
                className="text-[12px] font-semibold text-[#c22d2c] hover:underline"
              >
                Delete category
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit modal */}
      {editingItem && (
        <EditModal
          item={editingItem.item}
          onSave={updated => updateItem(editingItem.catId, updated)}
          onClose={() => setEditingItem(null)}
        />
      )}
    </div>
  )
}

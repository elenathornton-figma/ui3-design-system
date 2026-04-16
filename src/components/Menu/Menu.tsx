import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

export interface MenuItemDef {
  id: string;
  label: string;
  shortcut?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  destructive?: boolean;
  type?: "item" | "separator" | "submenu";
  children?: MenuItemDef[];
}

export interface MenuProps {
  items: MenuItemDef[];
  onSelect?: (id: string) => void;
  children: React.ReactElement;
}

// ── Context ──────────────────────────────────────────────────────────────────

const MenuCtx = createContext<{ onSelect: (id: string) => void }>({
  onSelect: () => {},
});

// ── Menu (root) ───────────────────────────────────────────────────────────────

export function Menu({ items, onSelect, children }: MenuProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLElement>(null);

  const handleTrigger = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setPosition({ x: rect.left, y: rect.bottom + 4 });
    setOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent && e.key !== "Escape") return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", handler);
    };
  }, [open]);

  const handleSelect = useCallback((id: string) => {
    onSelect?.(id);
    setOpen(false);
  }, [onSelect]);

  const trigger = React.cloneElement(children, {
    ref: triggerRef,
    onClick: handleTrigger,
    "aria-haspopup": "menu",
    "aria-expanded": open,
  });

  return (
    <MenuCtx.Provider value={{ onSelect: handleSelect }}>
      {trigger}
      {open && (
        <MenuPanel items={items} style={{ top: position.y, left: position.x }} />
      )}
    </MenuCtx.Provider>
  );
}

// ── MenuPanel ────────────────────────────────────────────────────────────────

function MenuPanel({
  items,
  style,
}: {
  items: MenuItemDef[];
  style?: React.CSSProperties;
}) {
  return (
    <div
      role="menu"
      style={{
        position: "fixed",
        zIndex: 2000,
        minWidth: 200,
        maxWidth: 280,
        padding: "4px 0",
        borderRadius: "var(--radius-medium)",
        background: "var(--color-bg-menu)",
        border: "1px solid var(--color-border-menu)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.32)",
        ...style,
      }}
    >
      {items.map((item) =>
        item.type === "separator" ? (
          <MenuSeparator key={item.id} />
        ) : (
          <MenuItem key={item.id} item={item} />
        )
      )}
    </div>
  );
}

// ── MenuItem ─────────────────────────────────────────────────────────────────

function MenuItem({ item }: { item: MenuItemDef }) {
  const { onSelect } = useContext(MenuCtx);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      role="menuitem"
      tabIndex={item.disabled ? -1 : 0}
      aria-disabled={item.disabled}
      onClick={() => !item.disabled && onSelect(item.id)}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !item.disabled) {
          onSelect(item.id);
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        height: 24,
        paddingInline: 8,
        cursor: item.disabled ? "not-allowed" : "default",
        background: hovered && !item.disabled
          ? "var(--color-bg-menu-hover)"
          : "transparent",
        opacity: item.disabled ? 0.4 : 1,
        color: item.destructive
          ? "var(--color-text-danger)"
          : "var(--color-text-onbrand)",
        fontFamily: "var(--font-family-default)",
        fontSize: 11,
        fontWeight: "var(--font-weight-default)" as unknown as number,
        letterSpacing: "0.5px",
        userSelect: "none",
      }}
    >
      {item.icon && (
        <span
          style={{
            width: 12,
            height: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: item.destructive ? "var(--color-icon-danger)" : "var(--color-icon-tertiary)",
          }}
        >
          {item.icon}
        </span>
      )}

      <span style={{ flex: 1 }}>{item.label}</span>

      {item.shortcut && (
        <span
          style={{
            color: "var(--color-text-tertiary)",
            fontFamily: "var(--font-family-default)",
            fontSize: 11,
          }}
        >
          {item.shortcut}
        </span>
      )}
    </div>
  );
}

// ── MenuSeparator ─────────────────────────────────────────────────────────────

function MenuSeparator() {
  return (
    <div
      role="separator"
      style={{
        height: 1,
        margin: "4px 0",
        background: "var(--color-border-menu)",
      }}
    />
  );
}

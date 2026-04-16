import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

export type ToastVariant = "default" | "success" | "warning" | "danger";

export interface ToastItem {
  id: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  action?: { label: string; onClick: () => void };
}

interface ToastContextValue {
  toast: (item: Omit<ToastItem, "id">) => void;
  dismiss: (id: string) => void;
}

// ── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue>({
  toast: () => {},
  dismiss: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

// ── Provider ─────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((item: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setItems((prev) => [...prev, { ...item, id }]);
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <ToastContainer items={items} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

// ── Container ─────────────────────────────────────────────────────────────────

function ToastContainer({
  items,
  onDismiss,
}: {
  items: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  if (items.length === 0) return null;
  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        pointerEvents: "none",
      }}
    >
      {items.map((item) => (
        <ToastBanner key={item.id} item={item} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

// ── Toast banner ──────────────────────────────────────────────────────────────

const variantIcons: Record<ToastVariant, string | null> = {
  default:  null,
  success:  "✓",
  warning:  "⚠",
  danger:   "✕",
};

const variantColors: Record<ToastVariant, string> = {
  default: "var(--color-bg-inverse)",
  success: "var(--color-bg-success)",
  warning: "var(--color-bg-warning)",
  danger:  "var(--color-bg-danger)",
};

function ToastBanner({
  item,
  onDismiss,
}: {
  item: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const duration = item.duration ?? 4000;

  useEffect(() => {
    if (duration <= 0) return;
    const t = setTimeout(() => onDismiss(item.id), duration);
    return () => clearTimeout(t);
  }, [item.id, duration, onDismiss]);

  return (
    <div
      role="alert"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        height: 32,
        paddingInline: 12,
        borderRadius: "var(--radius-full)",
        background: variantColors[item.variant ?? "default"],
        color: "var(--color-text-onbrand)",
        fontFamily: "var(--font-family-default)",
        fontSize: 11,
        fontWeight: "var(--font-weight-default)" as unknown as number,
        letterSpacing: "0.5px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.24)",
        pointerEvents: "all",
        whiteSpace: "nowrap",
        userSelect: "none",
      }}
    >
      {variantIcons[item.variant ?? "default"] && (
        <span style={{ fontSize: 11 }}>
          {variantIcons[item.variant ?? "default"]}
        </span>
      )}
      <span>{item.message}</span>
      {item.action && (
        <button
          onClick={item.action.onClick}
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "none",
            borderRadius: "var(--radius-small)",
            cursor: "pointer",
            padding: "2px 6px",
            color: "inherit",
            fontFamily: "inherit",
            fontSize: 11,
            fontWeight: "var(--font-weight-strong)" as unknown as number,
          }}
        >
          {item.action.label}
        </button>
      )}
      <button
        onClick={() => onDismiss(item.id)}
        aria-label="Dismiss"
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "inherit",
          padding: 0,
          display: "flex",
          alignItems: "center",
          opacity: 0.7,
        }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 2L8 8M8 2L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

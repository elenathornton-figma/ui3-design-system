import React, { createContext, useContext, useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

export interface TabDef {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: number;
}

// ── Context ──────────────────────────────────────────────────────────────────

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue>({
  activeTab: "",
  setActiveTab: () => {},
});

// ── Tabs root ─────────────────────────────────────────────────────────────────

export interface TabsProps {
  defaultTab?: string;
  activeTab?: string;
  onTabChange?: (id: string) => void;
  tabs: TabDef[];
  children: React.ReactNode;
}

export function Tabs({ defaultTab, activeTab: controlledTab, onTabChange, tabs, children }: TabsProps) {
  const [internalTab, setInternalTab] = useState(defaultTab ?? tabs[0]?.id ?? "");
  const isControlled = controlledTab !== undefined;
  const active = isControlled ? controlledTab : internalTab;

  const handleChange = (id: string) => {
    if (!isControlled) setInternalTab(id);
    onTabChange?.(id);
  };

  return (
    <TabsContext.Provider value={{ activeTab: active, setActiveTab: handleChange }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* Tab bar */}
        <div
          role="tablist"
          style={{
            display: "flex",
            borderBottom: "1px solid var(--color-border-default)",
            gap: 0,
          }}
        >
          {tabs.map((tab) => (
            <TabTrigger key={tab.id} tab={tab} />
          ))}
        </div>

        {/* Panels */}
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// ── TabTrigger ────────────────────────────────────────────────────────────────

function TabTrigger({ tab }: { tab: TabDef }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === tab.id;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${tab.id}`}
      id={`tab-${tab.id}`}
      disabled={tab.disabled}
      onClick={() => !tab.disabled && setActiveTab(tab.id)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        height: 32,
        paddingInline: 12,
        background: "transparent",
        border: "none",
        borderBottom: isActive
          ? "2px solid var(--color-border-selected)"
          : "2px solid transparent",
        marginBottom: -1,
        cursor: tab.disabled ? "not-allowed" : "pointer",
        opacity: tab.disabled ? 0.4 : 1,
        fontFamily: "var(--font-family-default)",
        fontSize: 11,
        fontWeight: isActive
          ? ("var(--font-weight-strong)" as unknown as number)
          : ("var(--font-weight-default)" as unknown as number),
        letterSpacing: "0.5px",
        color: isActive
          ? "var(--color-text-default)"
          : "var(--color-text-secondary)",
        transition: "color 80ms ease, border-color 80ms ease",
        outline: "none",
        whiteSpace: "nowrap",
      }}
    >
      {tab.icon}
      {tab.label}
      {tab.badge !== undefined && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 14,
            height: 14,
            paddingInline: 3,
            borderRadius: "var(--radius-full)",
            background: isActive
              ? "var(--color-bg-brand)"
              : "var(--color-bg-inverse)",
            color: "white",
            fontSize: 9,
            fontWeight: "var(--font-weight-strong)" as unknown as number,
          }}
        >
          {tab.badge}
        </span>
      )}
    </button>
  );
}

// ── TabPanel ──────────────────────────────────────────────────────────────────

export interface TabPanelProps {
  tabId: string;
  children: React.ReactNode;
}

export function TabPanel({ tabId, children }: TabPanelProps) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== tabId) return null;

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${tabId}`}
      aria-labelledby={`tab-${tabId}`}
    >
      {children}
    </div>
  );
}

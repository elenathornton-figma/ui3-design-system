import React, { useState } from "react";
import { ThemeProvider } from "../../src/theme/ThemeProvider";
import type { Theme } from "../../src/theme/ThemeProvider";
import { spacing } from "../../src/tokens/spacing";
import { radius } from "../../src/tokens/radius";
import { typeScale, fontFamily } from "../../src/tokens/typography";
import { colors } from "../../src/tokens/colors";
import { Button, IconButton } from "../../src/components/Button/Button";
import { Input } from "../../src/components/Input/Input";
import { Checkbox } from "../../src/components/Checkbox/Checkbox";
import { Radio, RadioGroup } from "../../src/components/Radio/Radio";
import { Switch } from "../../src/components/Switch/Switch";
import { Badge } from "../../src/components/Badge/Badge";
import { Avatar } from "../../src/components/Avatar/Avatar";
import { Chip } from "../../src/components/Chip/Chip";
import { Loading } from "../../src/components/Loading/Loading";
import { Tooltip } from "../../src/components/Tooltip/Tooltip";
import { Select } from "../../src/components/Select/Select";
import { Tabs, TabPanel } from "../../src/components/Tabs/Tabs";
import { Collapse } from "../../src/components/Collapse/Collapse";
import { Modal } from "../../src/components/Modal/Modal";
import { Menu } from "../../src/components/Menu/Menu";
import { Toast, ToastProvider, useToast } from "../../src/components/Toast/Toast";
import { Textarea } from "../../src/components/Textarea/Textarea";
import { Slider } from "../../src/components/Slider/Slider";
import { Icon } from "../../src/icons/Icon";

// ── Layout helpers ────────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={{
        margin: "0 0 20px",
        fontFamily: "var(--font-family-default)",
        fontSize: 13,
        fontWeight: 550,
        letterSpacing: "-0.25px",
        color: "var(--color-text-secondary)",
        textTransform: "uppercase",
        borderBottom: "1px solid var(--color-border-default)",
        paddingBottom: 8,
      }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Row({ children, gap = 8, wrap = true }: { children: React.ReactNode; gap?: number; wrap?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap, flexWrap: wrap ? "wrap" : "nowrap" }}>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      margin: "12px 0 6px",
      fontFamily: "var(--font-family-default)",
      fontSize: 9,
      fontWeight: 550,
      letterSpacing: "0.5px",
      textTransform: "uppercase",
      color: "var(--color-text-tertiary)",
    }}>
      {children}
    </p>
  );
}

// ── Toast button (needs to be inside ToastProvider) ───────────────────────────

function ToastDemo() {
  const { toast } = useToast();
  return (
    <Row>
      {(["default", "success", "warning", "danger"] as const).map((v) => (
        <Button
          key={v}
          variant="secondary"
          size="small"
          onClick={() => toast({ message: `${v.charAt(0).toUpperCase() + v.slice(1)} toast`, variant: v })}
        >
          {v}
        </Button>
      ))}
    </Row>
  );
}

// ── Main app ──────────────────────────────────────────────────────────────────

export default function App() {
  const [theme, setTheme] = useState<Theme>("light");
  const [modalOpen, setModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState<boolean | "indeterminate">("indeterminate");
  const [switchOn, setSwitchOn] = useState(true);
  const [radio, setRadio] = useState("a");
  const [sliderVal, setSliderVal] = useState(40);

  const themeTokens = colors[theme === "dark" || theme === "dark-ec" ? "dark" : "light"];

  return (
    <ToastProvider>
      <ThemeProvider theme={theme}>
        <div style={{
          minHeight: "100vh",
          background: "var(--color-bg-default)",
          color: "var(--color-text-default)",
          fontFamily: "var(--font-family-default)",
        }}>
          {/* ── Header ── */}
          <header style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px",
            height: 48,
            background: "var(--color-bg-toolbar)",
            borderBottom: "1px solid var(--color-border-menu)",
          }}>
            <span style={{ color: "var(--color-text-onbrand)", fontWeight: 550, fontSize: 13, letterSpacing: "-0.25px" }}>
              UI3 Design System — Sticker Sheet
            </span>
            <div style={{ display: "flex", gap: 4 }}>
              {(["light", "dark"] as Theme[]).map((t) => (
                <Button
                  key={t}
                  variant={theme === t ? "primary" : "ghost"}
                  size="small"
                  onClick={() => setTheme(t)}
                  style={{ color: theme === t ? undefined : "var(--color-text-onbrand)" }}
                >
                  {t}
                </Button>
              ))}
            </div>
          </header>

          {/* ── Content ── */}
          <main style={{ maxWidth: 960, margin: "0 auto", padding: "40px 32px 80px" }}>

            {/* ── Colors ── */}
            <Section title="Color tokens">
              {(["text", "icon", "bg", "border"] as const).map((cat) => {
                const entries = Object.entries(themeTokens).filter(([k]) => k.startsWith(`${cat}/`));
                return (
                  <div key={cat} style={{ marginBottom: 16 }}>
                    <Label>{cat}</Label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {entries.map(([name, value]) => (
                        <Tooltip key={name} content={`${name}: ${value}`} placement="top">
                          <div style={{
                            width: 24,
                            height: 24,
                            borderRadius: "var(--radius-small)",
                            background: value,
                            border: "1px solid var(--color-border-default)",
                            cursor: "default",
                            flexShrink: 0,
                          }} />
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                );
              })}
            </Section>

            {/* ── Typography ── */}
            <Section title="Typography">
              {Object.entries(typeScale).map(([name, style]) => (
                <div key={name} style={{ marginBottom: 4 }}>
                  <span style={{
                    display: "inline-block",
                    width: 200,
                    fontSize: 9,
                    letterSpacing: "0.5px",
                    color: "var(--color-text-tertiary)",
                    fontFamily: "var(--font-family-default)",
                    verticalAlign: "middle",
                  }}>
                    {name}
                  </span>
                  <span style={{
                    fontFamily: style.fontFamily,
                    fontSize: style.fontSize,
                    fontWeight: style.fontWeight,
                    letterSpacing: style.letterSpacing,
                    lineHeight: `${style.lineHeight}px`,
                    color: "var(--color-text-default)",
                  }}>
                    The quick brown fox
                  </span>
                </div>
              ))}
            </Section>

            {/* ── Spacing ── */}
            <Section title="Spacing">
              <Row gap={4} wrap>
                {Object.entries(spacing).map(([name, val]) => (
                  <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{
                      width: val || 2,
                      height: 16,
                      background: val ? "var(--color-bg-brand)" : "var(--color-border-strong)",
                      borderRadius: 1,
                      minWidth: 2,
                    }} />
                    <span style={{ fontSize: 9, color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-default)" }}>
                      {val}px
                    </span>
                    <span style={{ fontSize: 9, color: "var(--color-text-secondary)", fontFamily: "var(--font-family-default)" }}>
                      {name}
                    </span>
                  </div>
                ))}
              </Row>
            </Section>

            {/* ── Radius ── */}
            <Section title="Border radius">
              <Row gap={16}>
                {Object.entries(radius).map(([name, val]) => (
                  <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: Math.min(val, 20),
                      background: "var(--color-bg-brand-tertiary)",
                      border: "1.5px solid var(--color-border-selected)",
                    }} />
                    <span style={{ fontSize: 9, color: "var(--color-text-secondary)", fontFamily: "var(--font-family-default)" }}>
                      {name}<br />{val === 9999 ? "∞" : `${val}px`}
                    </span>
                  </div>
                ))}
              </Row>
            </Section>

            {/* ── Icons ── */}
            <Section title="Icons">
              <Row gap={8}>
                {(["close","plus","minus","more","check","chevron.down","chevron.up","chevron.left","chevron.right","warning","info","link","folder","page","image","library","list-view","dev","adjust","ai"] as const).map((name) => (
                  <Tooltip key={name} content={`icon.24.${name}`}>
                    <div style={{
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "var(--radius-small)",
                      background: "var(--color-bg-default-secondary)",
                      color: "var(--color-icon-default)",
                    }}>
                      <Icon name={name} size={16} />
                    </div>
                  </Tooltip>
                ))}
              </Row>
            </Section>

            {/* ── Buttons ── */}
            <Section title="Button">
              <Label>Variants</Label>
              <Row>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="tertiary">Tertiary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="ghost">Ghost</Button>
              </Row>

              <Label>Sizes</Label>
              <Row>
                <Button size="large">Large</Button>
                <Button size="medium">Medium</Button>
                <Button size="small">Small</Button>
              </Row>

              <Label>With icons</Label>
              <Row>
                <Button leadingIcon={<Icon name="plus" size={12} color="currentColor" />}>
                  New file
                </Button>
                <Button variant="secondary" trailingIcon={<Icon name="chevron.down" size={12} color="currentColor" />}>
                  Options
                </Button>
                <Button variant="destructive" leadingIcon={<Icon name="warning" size={12} color="currentColor" />}>
                  Delete
                </Button>
              </Row>

              <Label>States</Label>
              <Row>
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
                <IconButton label="Close" icon={<Icon name="close" size={14} color="currentColor" />} variant="secondary" />
                <IconButton label="Add" icon={<Icon name="plus" size={14} color="currentColor" />} />
              </Row>
            </Section>

            {/* ── Form controls ── */}
            <Section title="Form controls">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <div>
                  <Label>Input</Label>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <Input placeholder="Default input" label="Label" />
                    <Input placeholder="With helper" helperText="This is helper text" />
                    <Input placeholder="Error state" errorText="Something went wrong" state="error" />
                    <Input placeholder="Disabled" disabled />
                    <Input
                      placeholder="With icons"
                      leadingIcon={<Icon name="link" size={12} color="currentColor" />}
                      trailingIcon={<Icon name="close" size={12} color="currentColor" />}
                    />
                  </div>
                </div>

                <div>
                  <Label>Textarea</Label>
                  <Textarea label="Description" placeholder="Enter text…" rows={3} />

                  <Label>Select</Label>
                  <Select
                    label="Framework"
                    options={[
                      { value: "react", label: "React" },
                      { value: "vue", label: "Vue" },
                      { value: "svelte", label: "Svelte" },
                      { value: "angular", label: "Angular", disabled: true },
                    ]}
                    placeholder="Choose one…"
                  />

                  <Label>Slider</Label>
                  <Slider label="Opacity" showValue value={sliderVal} onChange={setSliderVal} />
                </div>
              </div>
            </Section>

            {/* ── Checkbox / Radio / Switch ── */}
            <Section title="Selection controls">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
                <div>
                  <Label>Checkbox</Label>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <Checkbox label="Unchecked" checked={false} />
                    <Checkbox label="Checked" checked onChange={setChecked} />
                    <Checkbox label="Indeterminate" checked="indeterminate" />
                    <Checkbox label="Disabled" disabled />
                    <Checkbox label="Disabled checked" checked disabled />
                  </div>
                </div>

                <div>
                  <Label>Radio</Label>
                  <RadioGroup
                    name="demo"
                    value={radio}
                    onChange={setRadio}
                    options={[
                      { value: "a", label: "Option A" },
                      { value: "b", label: "Option B" },
                      { value: "c", label: "Option C" },
                      { value: "d", label: "Disabled", disabled: true },
                    ]}
                  />
                </div>

                <div>
                  <Label>Switch</Label>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <Switch label="Off" checked={false} />
                    <Switch label="On" checked={switchOn} onChange={setSwitchOn} />
                    <Switch label="Disabled off" disabled />
                    <Switch label="Disabled on" checked disabled />
                  </div>
                </div>
              </div>
            </Section>

            {/* ── Badge ── */}
            <Section title="Badge">
              <Label>Variants</Label>
              <Row>
                {(["default","brand","danger","success","warning","figjam","handoff"] as const).map((v) => (
                  <Badge key={v} count={v === "default" ? 1 : v === "brand" ? 12 : v === "danger" ? 99 : v === "warning" ? 100 : 3} variant={v} />
                ))}
              </Row>

              <Label>Dot</Label>
              <Row>
                {(["default","brand","danger","success","warning"] as const).map((v) => (
                  <Badge key={v} dot variant={v} />
                ))}
              </Row>

              <Label>Anchored on button</Label>
              <Row>
                <Badge count={4} variant="danger">
                  <Button variant="secondary" size="medium">Inbox</Button>
                </Badge>
                <Badge count={12} variant="brand">
                  <Button variant="secondary" size="medium">Notifications</Button>
                </Badge>
              </Row>
            </Section>

            {/* ── Avatar ── */}
            <Section title="Avatar">
              <Label>Sizes</Label>
              <Row>
                {(["large","medium","small","xsmall"] as const).map((s) => (
                  <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <Avatar size={s} name="Elena Thornton" />
                    <span style={{ fontSize: 9, color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-default)" }}>{s}</span>
                  </div>
                ))}
              </Row>

              <Label>Names → hue</Label>
              <Row>
                {["Elena Thornton","Sam Park","Jordan Lee","Alex Rivera","Morgan Chen"].map((n) => (
                  <Avatar key={n} name={n} />
                ))}
              </Row>
            </Section>

            {/* ── Chip ── */}
            <Section title="Chip">
              <Label>Variants</Label>
              <Row>
                {(["default","selected","brand","danger","success","warning"] as const).map((v) => (
                  <Chip key={v} label={v.charAt(0).toUpperCase() + v.slice(1)} variant={v} />
                ))}
              </Row>
              <Label>With remove</Label>
              <Row>
                <Chip label="React" variant="brand" onRemove={() => {}} />
                <Chip label="TypeScript" variant="selected" onRemove={() => {}} />
                <Chip label="Figma" variant="default" onRemove={() => {}} />
              </Row>
              <Label>With icon</Label>
              <Row>
                <Chip label="AI" leadingIcon={<Icon name="ai" size={10} color="currentColor" />} variant="brand" />
                <Chip label="Warning" leadingIcon={<Icon name="warning" size={10} color="currentColor" />} variant="warning" />
                <Chip label="Success" leadingIcon={<Icon name="check" size={10} color="currentColor" />} variant="success" />
              </Row>
            </Section>

            {/* ── Loading ── */}
            <Section title="Loading">
              <Row gap={24}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <Label>Spinner — sizes</Label>
                  <Row gap={12}>
                    <Loading size="small" />
                    <Loading size="medium" />
                    <Loading size="large" />
                  </Row>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <Label>Dots</Label>
                  <Row gap={12}>
                    <Loading variant="dots" size="small" />
                    <Loading variant="dots" size="medium" />
                    <Loading variant="dots" size="large" />
                  </Row>
                </div>
              </Row>
            </Section>

            {/* ── Tooltip ── */}
            <Section title="Tooltip">
              <Row gap={16}>
                {(["top","bottom","left","right"] as const).map((p) => (
                  <Tooltip key={p} content={`Tooltip ${p}`} placement={p}>
                    <Button variant="secondary" size="small">{p}</Button>
                  </Tooltip>
                ))}
              </Row>
            </Section>

            {/* ── Tabs ── */}
            <Section title="Tabs">
              <Tabs
                tabs={[
                  { id: "design", label: "Design" },
                  { id: "prototype", label: "Prototype" },
                  { id: "inspect", label: "Dev", badge: 2 },
                  { id: "disabled", label: "Disabled", disabled: true },
                ]}
                defaultTab="design"
              >
                <TabPanel tabId="design">
                  <div style={{ padding: "12px 0", fontSize: 11, color: "var(--color-text-secondary)", fontFamily: "var(--font-family-default)" }}>
                    Design panel content
                  </div>
                </TabPanel>
                <TabPanel tabId="prototype">
                  <div style={{ padding: "12px 0", fontSize: 11, color: "var(--color-text-secondary)", fontFamily: "var(--font-family-default)" }}>
                    Prototype panel content
                  </div>
                </TabPanel>
                <TabPanel tabId="inspect">
                  <div style={{ padding: "12px 0", fontSize: 11, color: "var(--color-text-secondary)", fontFamily: "var(--font-family-default)" }}>
                    Dev/inspect panel content
                  </div>
                </TabPanel>
              </Tabs>
            </Section>

            {/* ── Collapse ── */}
            <Section title="Collapse">
              <div style={{ border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-medium)", overflow: "hidden" }}>
                <Collapse title="Fill" defaultOpen icon={<Icon name="image" size={12} color="currentColor" />}>
                  <div style={{ padding: "8px 8px 8px 24px", fontSize: 11, color: "var(--color-text-secondary)", fontFamily: "var(--font-family-default)", borderTop: "1px solid var(--color-border-default)" }}>
                    Solid color, gradient, or image fill options
                  </div>
                </Collapse>
                <Collapse title="Stroke" icon={<Icon name="minus" size={12} color="currentColor" />}>
                  <div style={{ padding: "8px 8px 8px 24px", fontSize: 11, color: "var(--color-text-secondary)", fontFamily: "var(--font-family-default)", borderTop: "1px solid var(--color-border-default)" }}>
                    Stroke weight, style, and alignment
                  </div>
                </Collapse>
                <Collapse title="Effects">
                  <div style={{ padding: "8px 8px 8px 24px", fontSize: 11, color: "var(--color-text-secondary)", fontFamily: "var(--font-family-default)", borderTop: "1px solid var(--color-border-default)" }}>
                    Drop shadow, inner shadow, blur
                  </div>
                </Collapse>
              </div>
            </Section>

            {/* ── Menu ── */}
            <Section title="Menu">
              <Menu
                items={[
                  { id: "copy", label: "Copy", icon: <Icon name="page" size={12} color="currentColor" />, shortcut: "⌘C" },
                  { id: "paste", label: "Paste", icon: <Icon name="page" size={12} color="currentColor" />, shortcut: "⌘V" },
                  { id: "sep1", label: "-", type: "separator" },
                  { id: "rename", label: "Rename", shortcut: "↩" },
                  { id: "group", label: "Group selection", shortcut: "⌘G" },
                  { id: "sep2", label: "-", type: "separator" },
                  { id: "delete", label: "Delete", destructive: true, shortcut: "⌫" },
                ]}
                onSelect={(id) => console.log("selected:", id)}
              >
                <Button variant="secondary">Right-click menu ↓</Button>
              </Menu>
            </Section>

            {/* ── Modal ── */}
            <Section title="Modal">
              <Button variant="secondary" onClick={() => setModalOpen(true)}>
                Open modal
              </Button>
              <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Publish changes"
                footer={
                  <>
                    <Button variant="tertiary" onClick={() => setModalOpen(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => setModalOpen(false)}>Publish</Button>
                  </>
                }
              >
                <p style={{ margin: 0, fontSize: 13, lineHeight: "22px", letterSpacing: "-0.25px" }}>
                  Publishing will make these changes visible to everyone with access to this file.
                  Are you sure you want to continue?
                </p>
              </Modal>
            </Section>

            {/* ── Toast ── */}
            <Section title="Toast">
              <ToastDemo />
            </Section>

          </main>
        </div>
      </ThemeProvider>
    </ToastProvider>
  );
}

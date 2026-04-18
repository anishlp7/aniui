"use client";

import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

type Variant = "filled" | "line";
type Size = "sm" | "md" | "lg";
type Orientation = "horizontal" | "vertical";

const Ctx = createContext<{ value: string; set: (v: string) => void; variant: Variant; size: Size; orientation: Orientation }>({
  value: "", set: () => {}, variant: "filled", size: "md", orientation: "horizontal",
});

function Tabs({ defaultValue, variant = "filled", size = "md", orientation = "horizontal", className, children }: {
  defaultValue: string; variant?: Variant; size?: Size; orientation?: Orientation; className?: string; children: React.ReactNode;
}) {
  const [value, setValue] = useState(defaultValue);
  return (
    <Ctx.Provider value={{ value, set: setValue, variant, size, orientation }}>
      <div className={cn(orientation === "vertical" && "flex flex-row", className)}>{children}</div>
    </Ctx.Provider>
  );
}

function List({ className, children }: { className?: string; children: React.ReactNode }) {
  const { variant, orientation } = useContext(Ctx);
  return (
    <div className={cn(
      orientation === "horizontal" ? "inline-flex flex-row" : "flex flex-col",
      variant === "filled" ? "rounded-lg bg-muted p-1" : (orientation === "horizontal" ? "border-b border-border" : "border-r border-border"),
      className
    )}>{children}</div>
  );
}

function Trigger({ value, disabled, icon, className, children }: {
  value: string; disabled?: boolean; icon?: React.ReactNode; className?: string; children: React.ReactNode;
}) {
  const { value: sel, set, variant, size, orientation } = useContext(Ctx);
  const active = sel === value;
  const sizeClass = size === "sm" ? "px-2.5 py-1 text-xs" : size === "lg" ? "px-4 py-2.5 text-base" : "px-3 py-2 text-sm";
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      disabled={disabled}
      className={cn(
        "font-medium cursor-pointer transition-colors inline-flex items-center gap-1.5",
        sizeClass,
        orientation === "horizontal" ? "flex-1" : "justify-start",
        variant === "filled" && "rounded-md",
        variant === "filled" && active && "bg-background text-foreground shadow-sm",
        variant === "filled" && !active && "text-muted-foreground hover:text-foreground",
        variant === "line" && active && (orientation === "horizontal" ? "border-b-2 border-primary text-foreground" : "border-r-2 border-primary text-foreground"),
        variant === "line" && !active && "text-muted-foreground hover:text-foreground",
        disabled && "opacity-40 cursor-not-allowed",
        className
      )}
      onClick={() => !disabled && set(value)}
    >{icon}{children}</button>
  );
}

function Content({ value, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  const { value: sel, orientation } = useContext(Ctx);
  if (sel !== value) return null;
  return <div className={cn(orientation === "horizontal" ? "mt-3" : "ml-4 flex-1", className)}>{children}</div>;
}

const Panel = ({ text }: { text: string }) => (
  <div className="rounded-lg border border-border bg-card p-4">
    <p className="text-sm text-muted-foreground">{text}</p>
  </div>
);

/* ── Backward-compat exports for theme-preview.tsx ──── */
export { Tabs as PreviewTabs, List as PreviewTabsList, Trigger as PreviewTabsTrigger, Content as PreviewTabsContent };

/* ── Exported demos ──────────────────────────────────── */

export function PreviewTabsDemo() {
  return (
    <Tabs defaultValue="account">
      <List><Trigger value="account">Account</Trigger><Trigger value="password">Password</Trigger></List>
      <Content value="account"><Panel text="Manage your account settings and preferences." /></Content>
      <Content value="password"><Panel text="Change your password and security settings." /></Content>
    </Tabs>
  );
}

export function PreviewTabsLine() {
  return (
    <Tabs defaultValue="overview" variant="line">
      <List><Trigger value="overview">Overview</Trigger><Trigger value="analytics">Analytics</Trigger><Trigger value="reports">Reports</Trigger></List>
      <Content value="overview"><Panel text="Project overview and summary." /></Content>
      <Content value="analytics"><Panel text="View detailed analytics data." /></Content>
      <Content value="reports"><Panel text="Generate and download reports." /></Content>
    </Tabs>
  );
}

export function PreviewTabsVertical() {
  return (
    <Tabs defaultValue="general" orientation="vertical" variant="line">
      <List><Trigger value="general">General</Trigger><Trigger value="security">Security</Trigger><Trigger value="notifications">Notifications</Trigger></List>
      <Content value="general"><Panel text="General account settings." /></Content>
      <Content value="security"><Panel text="Security and two-factor authentication." /></Content>
      <Content value="notifications"><Panel text="Notification preferences." /></Content>
    </Tabs>
  );
}

export function PreviewTabsDisabled() {
  return (
    <Tabs defaultValue="active">
      <List><Trigger value="active">Active</Trigger><Trigger value="disabled" disabled>Disabled</Trigger><Trigger value="other">Other</Trigger></List>
      <Content value="active"><Panel text="This tab is active." /></Content>
      <Content value="other"><Panel text="This tab works too." /></Content>
    </Tabs>
  );
}

export function PreviewTabsIcons() {
  const UserIcon = () => <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx={12} cy={7} r={4} /></svg>;
  const SettingsIcon = () => <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx={12} cy={12} r={3} /></svg>;
  return (
    <Tabs defaultValue="profile">
      <List><Trigger value="profile" icon={<UserIcon />}>Profile</Trigger><Trigger value="settings" icon={<SettingsIcon />}>Settings</Trigger></List>
      <Content value="profile"><Panel text="Edit your profile information." /></Content>
      <Content value="settings"><Panel text="Adjust application settings." /></Content>
    </Tabs>
  );
}

export function PreviewTabsSizes() {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="a" size="sm"><List><Trigger value="a">Small</Trigger><Trigger value="b">Tabs</Trigger></List></Tabs>
      <Tabs defaultValue="a" size="md"><List><Trigger value="a">Medium</Trigger><Trigger value="b">Tabs</Trigger></List></Tabs>
      <Tabs defaultValue="a" size="lg"><List><Trigger value="a">Large</Trigger><Trigger value="b">Tabs</Trigger></List></Tabs>
    </div>
  );
}

export function PreviewTabsRTL() {
  return (
    <div dir="rtl">
      <Tabs defaultValue="home" variant="line">
        <List><Trigger value="home">الرئيسية</Trigger><Trigger value="settings">الإعدادات</Trigger><Trigger value="profile">الملف الشخصي</Trigger></List>
        <Content value="home"><Panel text="محتوى الصفحة الرئيسية" /></Content>
        <Content value="settings"><Panel text="إعدادات التطبيق" /></Content>
        <Content value="profile"><Panel text="معلومات الملف الشخصي" /></Content>
      </Tabs>
    </div>
  );
}

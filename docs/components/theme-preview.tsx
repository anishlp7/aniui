"use client";

import React from "react";
import { hsl } from "@/lib/theme-data";

/* ── Shared Live Preview Panel ─────────────────────────────── */

export function ThemePreview({ vars, radius }: { vars: Record<string, string>; radius: string }) {
  const s = (v: string) => hsl(vars[v]);
  const rad = radius;
  const btnRad = `calc(${rad} - 2px)`;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Card: Payment Method */}
      <div className="col-span-full lg:col-span-2 rounded-xl border p-6" style={{ backgroundColor: s("--card"), borderColor: s("--border"), borderRadius: rad }}>
        <h3 className="text-lg font-semibold" style={{ color: s("--card-foreground") }}>Payment Method</h3>
        <p className="text-sm mt-1 mb-4" style={{ color: s("--muted-foreground") }}>All transactions are secure and encrypted.</p>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: s("--foreground") }}>Name on Card</label>
            <div className="h-10 rounded-md border px-3 flex items-center text-sm" style={{ borderColor: s("--input"), backgroundColor: s("--background"), color: s("--muted-foreground"), borderRadius: btnRad }}>John Doe</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: s("--foreground") }}>Card Number</label>
              <div className="h-10 rounded-md border px-3 flex items-center text-sm" style={{ borderColor: s("--input"), backgroundColor: s("--background"), color: s("--muted-foreground"), borderRadius: btnRad }}>1234 5678 9012 3456</div>
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: s("--foreground") }}>CVV</label>
              <div className="h-10 rounded-md border px-3 flex items-center text-sm" style={{ borderColor: s("--input"), backgroundColor: s("--background"), color: s("--muted-foreground"), borderRadius: btnRad }}>123</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: s("--foreground") }}>Month</label>
              <div className="h-10 rounded-md border px-3 flex items-center justify-between text-sm" style={{ borderColor: s("--input"), backgroundColor: s("--background"), color: s("--muted-foreground"), borderRadius: btnRad }}>
                <span>MM</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: s("--foreground") }}>Year</label>
              <div className="h-10 rounded-md border px-3 flex items-center justify-between text-sm" style={{ borderColor: s("--input"), backgroundColor: s("--background"), color: s("--muted-foreground"), borderRadius: btnRad }}>
                <span>YYYY</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
              </div>
            </div>
          </div>
          <p className="text-xs" style={{ color: s("--muted-foreground") }}>Enter your 16-digit number.</p>
          <div className="border-t pt-3 mt-1" style={{ borderColor: s("--border") }}>
            <p className="text-sm font-medium mb-2" style={{ color: s("--foreground") }}>Billing Address</p>
            <p className="text-xs" style={{ color: s("--muted-foreground") }}>The billing address associated with your payment method</p>
          </div>
        </div>
      </div>

      {/* Card: Team Members */}
      <div className="rounded-xl border p-6 space-y-4" style={{ backgroundColor: s("--card"), borderColor: s("--border"), borderRadius: rad }}>
        <h3 className="text-sm font-semibold" style={{ color: s("--card-foreground") }}>No Team Members</h3>
        <p className="text-xs" style={{ color: s("--muted-foreground") }}>Invite your team to collaborate on this project.</p>
        <div className="flex justify-center py-2">
          <div className="flex -space-x-2">
            {["A", "B"].map((initial) => (
              <div key={initial} className="h-10 w-10 rounded-full border-2 flex items-center justify-center text-xs font-medium" style={{ backgroundColor: s("--muted"), color: s("--muted-foreground"), borderColor: s("--card") }}>{initial}</div>
            ))}
          </div>
        </div>
        <button className="w-full h-9 rounded-md border text-xs font-medium flex items-center justify-center gap-1.5" style={{ borderColor: s("--border"), color: s("--foreground"), backgroundColor: s("--background"), borderRadius: btnRad }}>
          + Invite Members
        </button>
      </div>

      {/* Two-factor Auth */}
      <div className="rounded-xl border p-6 space-y-4" style={{ backgroundColor: s("--card"), borderColor: s("--border"), borderRadius: rad }}>
        <div className="flex items-center gap-3 p-3 rounded-lg border" style={{ borderColor: s("--border"), backgroundColor: s("--background"), borderRadius: btnRad }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={hsl(vars["--muted-foreground"])} strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /></svg>
          <span className="text-xs flex-1" style={{ color: s("--muted-foreground") }}>https://</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={hsl(vars["--muted-foreground"])} strokeWidth="2"><path d="m12 4 1.4 4.3H18l-3.7 2.7 1.4 4.3L12 12.6 8.3 15.3l1.4-4.3L6 8.3h4.6z" /></svg>
        </div>
        <div>
          <h4 className="text-sm font-semibold" style={{ color: s("--foreground") }}>Two-factor authentication</h4>
          <p className="text-xs mt-1" style={{ color: s("--muted-foreground") }}>Verify via email or phone number.</p>
        </div>
        <button className="h-8 px-3 rounded-md text-xs font-medium" style={{ backgroundColor: s("--primary"), color: s("--primary-foreground"), borderRadius: btnRad }}>Enable</button>
        <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: s("--accent"), borderRadius: btnRad }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={hsl(vars["--primary"])} strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
          <span className="text-xs font-medium" style={{ color: s("--foreground") }}>Your profile has been verified.</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={hsl(vars["--muted-foreground"])} strokeWidth="1.5" className="ml-auto"><path d="m9 18 6-6-6-6" /></svg>
        </div>
      </div>

      {/* Chat + Status indicators */}
      <div className="rounded-xl border p-6 space-y-3" style={{ backgroundColor: s("--card"), borderColor: s("--border"), borderRadius: rad }}>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Syncing", color: s("--primary") },
            { label: "Updating", color: s("--muted-foreground") },
            { label: "Loading", color: s("--muted-foreground") },
          ].map((st) => (
            <span key={st.label} className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-medium border" style={{ borderColor: s("--border"), color: s("--foreground") }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: st.color }} />
              {st.label}
            </span>
          ))}
        </div>
        <div className="h-10 rounded-md border px-3 flex items-center justify-between text-sm" style={{ borderColor: s("--input"), backgroundColor: s("--background"), borderRadius: btnRad }}>
          <span className="text-xs" style={{ color: s("--muted-foreground") }}>Send a message...</span>
          <div className="flex gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={hsl(vars["--muted-foreground"])} strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /></svg>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium mb-1" style={{ color: s("--foreground") }}>Price Range</p>
          <p className="text-xs mb-2" style={{ color: s("--muted-foreground") }}>Set your budget range ($200 - 800).</p>
          <div className="h-2 rounded-full relative" style={{ backgroundColor: s("--secondary") }}>
            <div className="absolute h-2 rounded-full left-[25%] right-[20%]" style={{ backgroundColor: s("--primary") }} />
          </div>
        </div>
        <div className="h-10 rounded-md border px-3 flex items-center gap-2 text-sm" style={{ borderColor: s("--input"), backgroundColor: s("--background"), borderRadius: btnRad }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={hsl(vars["--muted-foreground"])} strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          <span className="text-xs flex-1" style={{ color: s("--muted-foreground") }}>Search...</span>
          <span className="text-[10px]" style={{ color: s("--muted-foreground") }}>12 results</span>
        </div>
      </div>

      {/* Settings / Compute */}
      <div className="rounded-xl border p-6 space-y-4" style={{ backgroundColor: s("--card"), borderColor: s("--border"), borderRadius: rad }}>
        <div className="flex items-center gap-2">
          <button className="h-7 px-2.5 rounded text-[10px] font-medium border" style={{ borderColor: s("--border"), color: s("--foreground"), backgroundColor: s("--background") }}>Archive</button>
          <button className="h-7 px-2.5 rounded text-[10px] font-medium border" style={{ borderColor: s("--border"), color: s("--foreground"), backgroundColor: s("--background") }}>Report</button>
          <button className="h-7 px-2.5 rounded text-[10px] font-medium border" style={{ borderColor: s("--border"), color: s("--foreground"), backgroundColor: s("--background") }}>Snooze</button>
        </div>
        <p className="text-xs font-semibold" style={{ color: s("--foreground") }}>Appearance Settings</p>
        <div>
          <p className="text-sm font-medium" style={{ color: s("--foreground") }}>Compute Environment</p>
          <p className="text-xs" style={{ color: s("--muted-foreground") }}>Select the compute environment for your cluster.</p>
        </div>
        <div className="p-3 rounded-lg border" style={{ borderColor: s("--primary"), backgroundColor: s("--accent"), borderRadius: btnRad }}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium" style={{ color: s("--foreground") }}>Kubernetes</span>
            <div className="h-4 w-4 rounded-full" style={{ backgroundColor: s("--primary") }} />
          </div>
          <p className="text-[10px] mt-0.5" style={{ color: s("--muted-foreground") }}>Run GPU workloads on a K8s configured cluster.</p>
        </div>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((n) => (
            <button key={n} className="h-7 w-7 rounded text-[10px] font-medium border flex items-center justify-center" style={{ borderColor: s("--border"), color: s("--foreground"), backgroundColor: n === 1 ? s("--accent") : s("--background") }}>{n}</button>
          ))}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={hsl(vars["--muted-foreground"])} strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={hsl(vars["--muted-foreground"])} strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
        </div>
      </div>

      {/* Survey / Checkbox */}
      <div className="rounded-xl border p-6 space-y-4" style={{ backgroundColor: s("--card"), borderColor: s("--border"), borderRadius: rad }}>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border flex items-center justify-center" style={{ backgroundColor: s("--primary"), borderColor: s("--primary") }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={hsl(vars["--primary-foreground"])} strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <span className="text-xs" style={{ color: s("--foreground") }}>I agree to the terms and conditions</span>
        </div>
        <div>
          <p className="text-sm font-medium" style={{ color: s("--foreground") }}>How did you hear about us?</p>
          <p className="text-xs mt-0.5" style={{ color: s("--muted-foreground") }}>Select the option that best describes how you...</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["Social Media", "Search Engine"].map((opt, i) => (
            <span key={opt} className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded text-[10px] font-medium" style={{
              backgroundColor: i === 0 ? s("--primary") : s("--secondary"),
              color: i === 0 ? s("--primary-foreground") : s("--secondary-foreground"),
              borderRadius: btnRad,
            }}>
              {i === 0 && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
              {opt}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

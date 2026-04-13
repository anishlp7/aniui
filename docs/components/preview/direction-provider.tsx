"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", name: "English", dir: "ltr" as const, greeting: "Hello World", placeholder: "Search...", button: "Submit", description: "This is a left-to-right layout example." },
  { code: "ar", name: "العربية", dir: "rtl" as const, greeting: "مرحبا بالعالم", placeholder: "بحث...", button: "إرسال", description: "هذا مثال على تخطيط من اليمين إلى اليسار." },
  { code: "he", name: "עברית", dir: "rtl" as const, greeting: "שלום עולם", placeholder: "חיפוש...", button: "שלח", description: "זוהי דוגמה לפריסה מימין לשמאל." },
  { code: "fa", name: "فارسی", dir: "rtl" as const, greeting: "سلام دنیا", placeholder: "جستجو...", button: "ارسال", description: "این یک نمونه طرح‌بندی از راست به چپ است." },
  { code: "ur", name: "اردو", dir: "rtl" as const, greeting: "ہیلو ورلڈ", placeholder: "تلاش...", button: "جمع کرائیں", description: "یہ دائیں سے بائیں ترتیب کی مثال ہے۔" },
  { code: "fr", name: "Fran\u00e7ais", dir: "ltr" as const, greeting: "Bonjour le monde", placeholder: "Rechercher...", button: "Envoyer", description: "Ceci est un exemple de mise en page de gauche \u00e0 droite." },
  { code: "ja", name: "日本語", dir: "ltr" as const, greeting: "こんにちは世界", placeholder: "検索...", button: "送信", description: "これは左から右のレイアウト例です。" },
];

export function PreviewDirectionProviderDemo() {
  const [selected, setSelected] = useState(languages[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="w-full max-w-md space-y-4">
      {/* Language selector */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center justify-between w-full min-h-12 px-4 rounded-md border border-input bg-background cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">{selected.name}</span>
            <span className={cn(
              "px-1.5 py-0.5 rounded text-[10px] font-mono font-bold",
              selected.dir === "rtl" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
            )}>
              {selected.dir.toUpperCase()}
            </span>
          </div>
          <span className="text-muted-foreground text-xs">&#9660;</span>
        </button>
        {dropdownOpen && (
          <div className="absolute w-full mt-1 rounded-md border border-input bg-card shadow-lg z-50 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setSelected(lang); setDropdownOpen(false); }}
                className={cn(
                  "flex items-center justify-between w-full px-4 py-2.5 text-sm text-foreground text-left cursor-pointer",
                  lang.code === selected.code ? "bg-accent" : "hover:bg-muted"
                )}
              >
                <span>{lang.name}</span>
                <span className={cn(
                  "px-1.5 py-0.5 rounded text-[10px] font-mono font-bold",
                  lang.dir === "rtl" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {lang.dir.toUpperCase()}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Direction preview */}
      <div
        dir={selected.dir}
        className="rounded-lg border border-border bg-card p-5 space-y-3 transition-all"
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">{selected.greeting}</p>
          <span className={cn(
            "px-2 py-0.5 rounded-full text-[10px] font-bold",
            selected.dir === "rtl" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
          )}>
            {selected.dir.toUpperCase()}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{selected.description}</p>
        <div className="flex gap-2">
          <div className="flex-1 h-10 rounded-md border border-input bg-background px-3 flex items-center">
            <span className="text-xs text-muted-foreground">{selected.placeholder}</span>
          </div>
          <div className="h-10 px-4 rounded-md bg-primary flex items-center">
            <span className="text-xs font-medium text-primary-foreground">{selected.button}</span>
          </div>
        </div>
        {/* Sample form field */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-foreground">
            {selected.dir === "rtl" ? "البريد الإلكتروني" : "Email"}
          </label>
          <div className="flex items-center rounded-md border border-input bg-background h-10">
            <div className={cn("px-3 self-stretch flex items-center border-input", selected.dir === "rtl" ? "border-l" : "border-r")}>
              <span className="text-xs text-muted-foreground">@</span>
            </div>
            <div className="flex-1 px-3">
              <span className="text-xs text-muted-foreground">
                {selected.dir === "rtl" ? "أدخل بريدك" : "you@example.com"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

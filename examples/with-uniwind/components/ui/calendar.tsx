import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { cn } from "@/lib/utils";

export interface CalendarProps {
  className?: string; selected?: Date; onSelect?: (date: Date) => void;
  rangeStart?: Date; rangeEnd?: Date; onRangeChange?: (start: Date, end: Date | undefined) => void;
  min?: Date; max?: Date;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const same = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
type Mode = "days" | "months" | "years";

export function Calendar({ className, selected, onSelect, rangeStart, rangeEnd, onRangeChange, min, max }: CalendarProps) {
  const [viewing, setViewing] = useState(() => selected ?? rangeStart ?? new Date());
  const [mode, setMode] = useState<Mode>("days");
  const year = viewing.getFullYear(), month = viewing.getMonth();

  const handlePress = (day: number) => {
    const date = new Date(year, month, day);
    if ((min && date < min) || (max && date > max)) return;
    if (onRangeChange) {
      if (!rangeStart || rangeEnd || date < rangeStart) onRangeChange(date, undefined);
      else onRangeChange(rangeStart, date);
    }
    onSelect?.(date);
  };
  const handleHeaderPress = () => setMode(mode === "days" ? "years" : "days");
  const pickYear = (y: number) => { setViewing(new Date(y, month, 1)); setMode("months"); };
  const pickMonth = (m: number) => { setViewing(new Date(year, m, 1)); setMode("days"); };
  const decadeStart = Math.floor(year / 12) * 12;
  const label = new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" });

  return (
    <View className={cn("rounded-lg bg-white dark:bg-zinc-950 p-3", className)}>
      <View className="flex-row items-center justify-between mb-3">
        <Pressable onPress={() => mode === "days" ? setViewing(new Date(year, month - 1, 1)) : mode === "months" ? setViewing(new Date(year - 1, month, 1)) : setViewing(new Date(decadeStart - 12, month, 1))} className="h-9 w-9 items-center justify-center rounded-md" accessibilityRole="button" accessibilityLabel="Previous">
          <Text className="text-base text-zinc-500 dark:text-zinc-400">{"\u2039"}</Text>
        </Pressable>
        <Pressable onPress={handleHeaderPress} accessibilityRole="button">
          <Text className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">{mode === "days" ? label : mode === "months" ? `${year}` : `${decadeStart} – ${decadeStart + 11}`}</Text>
        </Pressable>
        <Pressable onPress={() => mode === "days" ? setViewing(new Date(year, month + 1, 1)) : mode === "months" ? setViewing(new Date(year + 1, month, 1)) : setViewing(new Date(decadeStart + 12, month, 1))} className="h-9 w-9 items-center justify-center rounded-md" accessibilityRole="button" accessibilityLabel="Next">
          <Text className="text-base text-zinc-500 dark:text-zinc-400">{"\u203A"}</Text>
        </Pressable>
      </View>
      {mode === "years" && (
        <View className="flex-row flex-wrap">
          {Array.from({ length: 12 }, (_, i) => decadeStart + i).map((y) => (
            <View key={y} className="w-1/3 items-center p-1">
              <Pressable onPress={() => pickYear(y)} className={cn("h-9 w-full items-center justify-center rounded-md", y === year && "bg-zinc-900 dark:bg-zinc-50")} accessibilityRole="button">
                <Text className={cn("text-sm", y === year ? "text-zinc-50 dark:text-zinc-900 font-semibold" : "text-zinc-950 dark:text-zinc-50")}>{y}</Text>
              </Pressable>
            </View>
          ))}
        </View>
      )}

      {/* Month grid */}
      {mode === "months" && (
        <View className="flex-row flex-wrap">
          {MONTHS.map((m, i) => (
            <View key={m} className="w-1/3 items-center p-1">
              <Pressable onPress={() => pickMonth(i)} className={cn("h-9 w-full items-center justify-center rounded-md", i === month && year === viewing.getFullYear() && "bg-zinc-900 dark:bg-zinc-50")} accessibilityRole="button">
                <Text className={cn("text-sm", i === month && year === viewing.getFullYear() ? "text-zinc-50 dark:text-zinc-900 font-semibold" : "text-zinc-950 dark:text-zinc-50")}>{m}</Text>
              </Pressable>
            </View>
          ))}
        </View>
      )}

      {/* Days grid */}
      {mode === "days" && (
        <>
          <View className="flex-row mb-1">
            {DAYS.map((d) => <View key={d} className="flex-1 items-center py-1"><Text className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{d}</Text></View>)}
          </View>
          <View className="flex-row flex-wrap">
            {(() => {
              const firstDay = new Date(year, month, 1).getDay();
              const daysInMonth = new Date(year, month + 1, 0).getDate();
              const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
              return cells.map((day, i) => {
                if (day === null) return <View key={`e-${i}`} className="w-[14.28%] h-9" />;
                const date = new Date(year, month, day);
                const sel = selected && same(date, selected);
                const rs = rangeStart && same(date, rangeStart);
                const re = rangeEnd && same(date, rangeEnd);
                const inR = rangeStart && rangeEnd && date.getTime() >= rangeStart.getTime() && date.getTime() <= rangeEnd.getTime();
                const today = same(date, new Date());
                const off = (min && date < min) || (max && date > max);
                return (
                  <View key={day} className="w-[14.28%] items-center">
                    <Pressable onPress={() => handlePress(day)} disabled={!!off} className={cn("h-9 w-9 items-center justify-center rounded-full", sel || rs || re ? "bg-zinc-900 dark:bg-zinc-50" : inR ? "bg-zinc-100 dark:bg-zinc-800" : "", today && !sel && "border border-zinc-900 dark:border-zinc-50", off && "opacity-30")} accessibilityRole="button" accessibilityLabel={`${label} ${day}`}>
                      <Text className={cn("text-sm", sel || rs || re ? "text-zinc-50 dark:text-zinc-900 font-semibold" : "text-zinc-950 dark:text-zinc-50")}>{day}</Text>
                    </Pressable>
                  </View>
                );
              });
            })()}
          </View>
        </>
      )}
    </View>
  );
}

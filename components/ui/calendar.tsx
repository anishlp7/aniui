import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { cn } from "@/lib/utils";

export interface CalendarProps {
  className?: string;
  selected?: Date;
  onSelect?: (date: Date) => void;
  rangeStart?: Date;
  rangeEnd?: Date;
  onRangeChange?: (start: Date, end: Date | undefined) => void;
  min?: Date;
  max?: Date;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function inRange(d: Date, start?: Date, end?: Date) {
  if (!start || !end) return false;
  const t = d.getTime();
  return t >= start.getTime() && t <= end.getTime();
}

export function Calendar({ className, selected, onSelect, rangeStart, rangeEnd, onRangeChange, min, max }: CalendarProps) {
  const [viewing, setViewing] = useState(() => selected ?? rangeStart ?? new Date());
  const year = viewing.getFullYear();
  const month = viewing.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const prev = () => setViewing(new Date(year, month - 1, 1));
  const next = () => setViewing(new Date(year, month + 1, 1));

  const handlePress = (day: number) => {
    const date = new Date(year, month, day);
    if (min && date < min) return;
    if (max && date > max) return;
    if (onRangeChange) {
      if (!rangeStart || rangeEnd || date < rangeStart) onRangeChange(date, undefined);
      else onRangeChange(rangeStart, date);
    }
    onSelect?.(date);
  };

  const monthLabel = new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" });

  return (
    <View className={cn("rounded-lg bg-background p-3", className)}>
      <View className="flex-row items-center justify-between mb-3">
        <Pressable onPress={prev} className="h-9 w-9 items-center justify-center rounded-md" accessibilityRole="button" accessibilityLabel="Previous month">
          <Text className="text-base text-muted-foreground">{"\u2039"}</Text>
        </Pressable>
        <Text className="text-sm font-semibold text-foreground">{monthLabel}</Text>
        <Pressable onPress={next} className="h-9 w-9 items-center justify-center rounded-md" accessibilityRole="button" accessibilityLabel="Next month">
          <Text className="text-base text-muted-foreground">{"\u203A"}</Text>
        </Pressable>
      </View>
      <View className="flex-row mb-1">
        {DAYS.map((d) => (
          <View key={d} className="flex-1 items-center py-1">
            <Text className="text-xs font-medium text-muted-foreground">{d}</Text>
          </View>
        ))}
      </View>
      <View className="flex-row flex-wrap">
        {cells.map((day, i) => {
          if (day === null) return <View key={`e-${i}`} className="w-[14.28%] h-9" />;
          const date = new Date(year, month, day);
          const isSelected = selected && isSameDay(date, selected);
          const isRangeStart = rangeStart && isSameDay(date, rangeStart);
          const isRangeEnd = rangeEnd && isSameDay(date, rangeEnd);
          const isInRange = inRange(date, rangeStart, rangeEnd);
          const isToday = isSameDay(date, new Date());
          const disabled = (min && date < min) || (max && date > max);
          return (
            <View key={day} className="w-[14.28%] items-center">
              <Pressable
                onPress={() => handlePress(day)}
                disabled={!!disabled}
                className={cn(
                  "h-9 w-9 items-center justify-center rounded-full",
                  isSelected || isRangeStart || isRangeEnd ? "bg-primary" : isInRange ? "bg-accent" : "",
                  isToday && !isSelected && "border border-primary",
                  disabled && "opacity-30"
                )}
                accessibilityRole="button"
                accessibilityLabel={`${monthLabel} ${day}`}
              >
                <Text className={cn("text-sm", isSelected || isRangeStart || isRangeEnd ? "text-primary-foreground font-semibold" : "text-foreground")}>
                  {day}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}

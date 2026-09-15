import React, { useState } from "react";
import { View, Text, Pressable, Modal, ScrollView } from "react-native";
import { Clock, CalendarClock, type LucideIcon } from "lucide-react-native";
import { cn } from "@/lib/utils";
import { useThemeColors } from "@/components/ui/theme-provider";
import { Calendar } from "@/components/ui/calendar";

type MinuteInterval = 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30;
type Meridiem = "AM" | "PM";

interface BasePickerProps {
  className?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  is24Hour?: boolean;
  minuteInterval?: MinuteInterval;
}

export interface TimePickerProps extends BasePickerProps { formatTime?: (date: Date) => string; }
export interface DateTimePickerProps extends BasePickerProps { min?: Date; max?: Date; formatDateTime?: (date: Date) => string; }
export interface DateAndTimePickerProps extends BasePickerProps { min?: Date; max?: Date; formatDateTime?: (date: Date) => string; }

function defaultTime(date: Date, is24Hour?: boolean) {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: !is24Hour });
}

function defaultDateTime(date: Date, is24Hour?: boolean) {
  return `${date.toLocaleDateString()} ${defaultTime(date, is24Hour)}`;
}

function mergeDatePart(base: Date, next: Date) {
  const merged = new Date(base);
  merged.setFullYear(next.getFullYear(), next.getMonth(), next.getDate());
  return merged;
}

function setTimeParts(base: Date, hour: number, minute: number, meridiem?: Meridiem) {
  const merged = new Date(base);
  let h = hour;
  if (meridiem) h = hour % 12 + (meridiem === "PM" ? 12 : 0);
  merged.setHours(h, minute, 0, 0);
  return merged;
}

function readTimeParts(date: Date, is24Hour?: boolean) {
  const minute = date.getMinutes();
  if (is24Hour) return { hour: date.getHours(), minute, meridiem: undefined as Meridiem | undefined };
  const h = date.getHours();
  return { hour: h % 12 || 12, minute, meridiem: (h >= 12 ? "PM" : "AM") as Meridiem };
}

function buildMinutes(interval: MinuteInterval) {
  return Array.from({ length: Math.floor(60 / interval) }, (_, i) => i * interval);
}

function Wheel<T extends string | number>({ items, selected, onSelect, format }: {
  items: T[]; selected: T; onSelect: (item: T) => void; format: (item: T) => string;
}) {
  return (
    <ScrollView className="max-h-40 flex-1" showsVerticalScrollIndicator={false}>
      {items.map((item) => (
        <Pressable key={String(item)} onPress={() => onSelect(item)} accessibilityRole="button"
          className={cn("min-h-10 items-center justify-center rounded-md px-2", selected === item ? "bg-accent" : "")}>
          <Text className={cn("text-base", selected === item ? "font-semibold text-accent-foreground" : "text-foreground")}>{format(item)}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

function snapMinute(minute: number, interval: MinuteInterval) {
  return Math.min(59, Math.round(minute / interval) * interval);
}

function TimeSelector({ value, onChange, is24Hour, minuteInterval = 1 }: {
  value: Date; onChange: (date: Date) => void; is24Hour?: boolean; minuteInterval?: MinuteInterval;
}) {
  const parts = readTimeParts(value, is24Hour);
  const minute = snapMinute(parts.minute, minuteInterval);
  const hours = is24Hour ? Array.from({ length: 24 }, (_, i) => i) : Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = buildMinutes(minuteInterval);
  const update = (hour: number, nextMinute: number, meridiem?: Meridiem) => onChange(setTimeParts(value, hour, nextMinute, meridiem));

  return (
    <View className="flex-row gap-1 border-t border-border px-2 py-2">
      <Wheel items={hours} selected={parts.hour} onSelect={(h) => update(h, minute, parts.meridiem)} format={(h) => String(h).padStart(2, "0")} />
      <Wheel items={minutes} selected={minute} onSelect={(m) => update(parts.hour, m, parts.meridiem)} format={(m) => String(m).padStart(2, "0")} />
      {!is24Hour && (
        <Wheel items={["AM", "PM"] as Meridiem[]} selected={parts.meridiem ?? "AM"}
          onSelect={(m) => update(parts.hour, minute, m)} format={(m) => m} />
      )}
    </View>
  );
}

function PickerTrigger({ label, hasValue, className, onPress, Icon }: {
  label: string; hasValue: boolean; className?: string; onPress: () => void; Icon: LucideIcon;
}) {
  const colors = useThemeColors();
  return (
    <Pressable className={cn("flex-row items-center rounded-md border border-input bg-background px-4 min-h-12", className)}
      onPress={onPress} accessible={true} accessibilityRole="button">
      <Text className={cn("flex-1 text-base", hasValue ? "text-foreground" : "text-muted-foreground")}>{label}</Text>
      <Icon size={16} color={colors.mutedForeground} />
    </Pressable>
  );
}

function PickerModal({ open, onClose, onDone, children }: {
  open: boolean; onClose: () => void; onDone: () => void; children: React.ReactNode;
}) {
  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable className="flex-1 items-center justify-center bg-black/50" onPress={onClose}>
        <Pressable onPress={() => {}} className="mx-6 w-full max-w-sm rounded-xl bg-card p-2 shadow-xl">
          {children}
          <Pressable onPress={onDone} className="mt-1 mb-2 items-center py-2" accessibilityRole="button">
            <Text className="text-sm font-medium text-primary">Done</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function TimePicker({ className, value, onChange, placeholder = "Select time...", is24Hour, minuteInterval, formatTime }: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value ?? new Date());
  const display = value ? (formatTime ?? ((d) => defaultTime(d, is24Hour)))(value) : placeholder;

  return (
    <>
      <PickerTrigger label={display} hasValue={!!value} className={className} Icon={Clock}
        onPress={() => { setDraft(value ?? new Date()); setOpen(true); }} />
      <PickerModal open={open} onClose={() => setOpen(false)} onDone={() => { onChange?.(draft); setOpen(false); }}>
        <TimeSelector value={draft} onChange={setDraft} is24Hour={is24Hour} minuteInterval={minuteInterval} />
      </PickerModal>
    </>
  );
}

export function DateAndTimePicker({
  className, value, onChange, placeholder = "Select date & time...", is24Hour, minuteInterval, min, max, formatDateTime,
}: DateAndTimePickerProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value ?? new Date());
  const display = value ? (formatDateTime ?? ((d) => defaultDateTime(d, is24Hour)))(value) : placeholder;

  return (
    <>
      <PickerTrigger label={display} hasValue={!!value} className={className} Icon={CalendarClock}
        onPress={() => { setDraft(value ?? new Date()); setOpen(true); }} />
      <PickerModal open={open} onClose={() => setOpen(false)} onDone={() => { onChange?.(draft); setOpen(false); }}>
        <View style={{ minHeight: 310 }}>
          <Calendar selected={draft} onSelect={(d) => setDraft((prev) => mergeDatePart(prev, d))} min={min} max={max} />
        </View>
        <TimeSelector value={draft} onChange={setDraft} is24Hour={is24Hour} minuteInterval={minuteInterval} />
      </PickerModal>
    </>
  );
}

export function DateTimePicker(props: DateTimePickerProps) {
  return <DateAndTimePicker {...props} />;
}

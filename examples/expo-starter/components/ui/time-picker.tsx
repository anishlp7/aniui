import React, { useState } from "react";
import { Text, Pressable, Modal, Platform } from "react-native";
import RNDateTimePicker, { type DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Clock, CalendarClock, type LucideIcon } from "lucide-react-native";
import { cn } from "@/lib/utils";
import { useTheme, useThemeColors } from "@/components/ui/theme-provider";

type MinuteInterval = 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30;
type PickerMode = "time" | "datetime";

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

function defaultTime(date: Date, is24Hour?: boolean) {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: !is24Hour });
}

function NativePicker(props: {
  mode: PickerMode; className?: string; value?: Date; onChange?: (date: Date) => void; placeholder: string;
  is24Hour?: boolean; minuteInterval?: MinuteInterval; min?: Date; max?: Date;
  formatValue: (date: Date) => string; Icon: LucideIcon;
}) {
  const { mode, className, value, onChange, placeholder, is24Hour, minuteInterval, min, max, formatValue, Icon } = props;
  const colors = useThemeColors();
  const { resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value ?? new Date());
  const onAndroidChange = (event: DateTimePickerEvent, selected?: Date) => {
    setOpen(false);
    if (event.type !== "dismissed" && selected) onChange?.(selected);
  };
  const picker = (
    <RNDateTimePicker value={Platform.OS === "ios" ? draft : (value ?? new Date())} mode={mode}
      display={Platform.OS === "ios" ? "spinner" : "default"}
      onChange={Platform.OS === "ios" ? (_e, d) => d && setDraft(d) : onAndroidChange}
      is24Hour={is24Hour} minuteInterval={minuteInterval} minimumDate={min} maximumDate={max} themeVariant={resolvedTheme} />
  );
  return (
    <>
      <Pressable className={cn("flex-row items-center rounded-md border border-input bg-background px-4 min-h-12", className)}
        onPress={() => { setDraft(value ?? new Date()); setOpen(true); }} accessible={true} accessibilityRole="button">
        <Text className={cn("flex-1 text-base", value ? "text-foreground" : "text-muted-foreground")}>
          {value ? formatValue(value) : placeholder}
        </Text>
        <Icon size={16} color={colors.mutedForeground} />
      </Pressable>
      {Platform.OS === "ios" ? (
        <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
          <Pressable className="flex-1 items-center justify-center bg-black/50" onPress={() => setOpen(false)}>
            <Pressable onPress={() => {}} className="mx-6 w-full max-w-sm rounded-xl bg-card p-4 shadow-xl">
              {open ? picker : null}
              <Pressable onPress={() => { onChange?.(draft); setOpen(false); }} className="mt-2 items-center py-2" accessibilityRole="button">
                <Text className="text-sm font-medium text-primary">Done</Text>
              </Pressable>
            </Pressable>
          </Pressable>
        </Modal>
      ) : open ? picker : null}
    </>
  );
}

export function TimePicker({ placeholder = "Select time...", formatTime, is24Hour, ...rest }: TimePickerProps) {
  return <NativePicker {...rest} mode="time" placeholder={placeholder} is24Hour={is24Hour}
    formatValue={formatTime ?? ((d) => defaultTime(d, is24Hour))} Icon={Clock} />;
}

export function DateTimePicker({ placeholder = "Select date & time...", formatDateTime, is24Hour, min, max, ...rest }: DateTimePickerProps) {
  return <NativePicker {...rest} mode="datetime" placeholder={placeholder} is24Hour={is24Hour} min={min} max={max}
    formatValue={formatDateTime ?? ((d) => `${d.toLocaleDateString()} ${defaultTime(d, is24Hour)}`)} Icon={CalendarClock} />;
}

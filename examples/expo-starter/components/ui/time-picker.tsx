import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { Clock, CalendarClock, type LucideIcon } from "lucide-react-native";
import { cn } from "@/lib/utils";
import { useThemeColors } from "@/components/ui/theme-provider";
import { springs, duration, usePressAnimation } from "@/components/ui/animate";
import { Calendar } from "@/components/ui/calendar";

const ROW_HEIGHT = 40;
const VISIBLE_ROWS = 5;
const WHEEL_HEIGHT = ROW_HEIGHT * VISIBLE_ROWS;
const PAD = ROW_HEIGHT * Math.floor(VISIBLE_ROWS / 2);

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

function snapMinute(minute: number, interval: MinuteInterval) {
  return Math.min(59, Math.round(minute / interval) * interval);
}

/** A single wheel row — scales/fades based on distance from the centered slot. */
function WheelRow<T extends string | number>({ item, index, scrollY, isSelected, onPress, format }: {
  item: T; index: number; scrollY: SharedValue<number>; isSelected: boolean; onPress: () => void; format: (item: T) => string;
}) {
  const center = index * ROW_HEIGHT;
  const inputRange = [center - ROW_HEIGHT * 2, center - ROW_HEIGHT, center, center + ROW_HEIGHT, center + ROW_HEIGHT * 2];

  const style = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, inputRange, [0.75, 0.88, 1, 0.88, 0.75], Extrapolation.CLAMP);
    const opacity = interpolate(scrollY.value, inputRange, [0.3, 0.55, 1, 0.55, 0.3], Extrapolation.CLAMP);
    return { opacity, transform: [{ scale }] };
  });

  return (
    <Animated.View style={[{ height: ROW_HEIGHT }, style]} className="items-center justify-center">
      <Pressable onPress={onPress} accessible={true} accessibilityRole="button" className="min-h-10 min-w-12 items-center justify-center px-2">
        <Text className={cn("text-lg", isSelected ? "font-semibold text-foreground" : "text-muted-foreground")}>{format(item)}</Text>
      </Pressable>
    </Animated.View>
  );
}

/** A vertically-scrolling, snap-to-center wheel with a highlight band and a haptic tick per selection change. */
function Wheel<T extends string | number>({ items, selected, onSelect, format }: {
  items: T[]; selected: T; onSelect: (item: T) => void; format: (item: T) => string;
}) {
  const colors = useThemeColors();
  const scrollY = useSharedValue(0);
  const listRef = useRef<Animated.ScrollView>(null);
  const lastIndex = useRef(items.indexOf(selected));

  useEffect(() => {
    const idx = items.indexOf(selected);
    if (idx !== -1 && idx !== lastIndex.current) {
      listRef.current?.scrollTo({ y: idx * ROW_HEIGHT, animated: false });
      lastIndex.current = idx;
    }
  }, [selected, items]);

  const onScroll = useAnimatedScrollHandler({ onScroll: (e) => { scrollY.value = e.contentOffset.y; } });

  const commit = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(items.length - 1, index));
    if (clamped !== lastIndex.current) {
      lastIndex.current = clamped;
      Haptics.selectionAsync();
      onSelect(items[clamped]);
    }
  }, [items, onSelect]);

  return (
    <View style={{ height: WHEEL_HEIGHT }} className="flex-1">
      <View pointerEvents="none" style={{ top: PAD, height: ROW_HEIGHT }} className="absolute left-0 right-0 z-10 border-y border-border" />
      <Animated.ScrollView
        ref={listRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ROW_HEIGHT}
        decelerationRate="fast"
        onScroll={onScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(e) => commit(Math.round(e.nativeEvent.contentOffset.y / ROW_HEIGHT))}
        contentContainerStyle={{ paddingVertical: PAD }}
        contentOffset={{ x: 0, y: Math.max(0, items.indexOf(selected)) * ROW_HEIGHT }}
      >
        {items.map((item, index) => (
          <WheelRow
            key={String(item)}
            item={item}
            index={index}
            scrollY={scrollY}
            isSelected={item === selected}
            format={format}
            onPress={() => { listRef.current?.scrollTo({ y: index * ROW_HEIGHT, animated: true }); commit(index); }}
          />
        ))}
      </Animated.ScrollView>
      {/* Fades the two rows nearest each edge toward the surrounding card color, reinforcing the "wheel" depth cue */}
      <View pointerEvents="none" style={{ height: ROW_HEIGHT, backgroundColor: colors.card }} className="absolute left-0 right-0 top-0 opacity-60" />
      <View pointerEvents="none" style={{ height: ROW_HEIGHT, backgroundColor: colors.card }} className="absolute bottom-0 left-0 right-0 opacity-60" />
    </View>
  );
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
  const { animatedStyle, onPressIn, onPressOut } = usePressAnimation(0.97);
  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        className={cn("flex-row items-center rounded-md border border-input bg-background px-4 min-h-12", className)}
        onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut} accessible={true} accessibilityRole="button"
      >
        <Text className={cn("flex-1 text-base", hasValue ? "text-foreground" : "text-muted-foreground")}>{label}</Text>
        <Icon size={16} color={colors.mutedForeground} />
      </Pressable>
    </Animated.View>
  );
}

function PickerModal({ open, onClose, onDone, children }: {
  open: boolean; onClose: () => void; onDone: () => void; children: React.ReactNode;
}) {
  // Keep the Modal mounted while the close animation plays — dropping
  // `visible` immediately would cut it short (same pattern as drawer.tsx).
  const [visible, setVisible] = useState(open);
  const backdrop = useSharedValue(0);
  const panel = useSharedValue(0.9);

  useEffect(() => {
    if (open) {
      setVisible(true);
      backdrop.value = withTiming(1, { duration: duration.fast });
      panel.value = withSpring(1, springs.snappy);
      return;
    }
    backdrop.value = withTiming(0, { duration: duration.fast });
    panel.value = withTiming(0.9, { duration: duration.fast });
    const t = setTimeout(() => setVisible(false), duration.fast);
    return () => clearTimeout(t);
  }, [open, backdrop, panel]);

  const backdropStyle = useAnimatedStyle(() => ({ opacity: backdrop.value }));
  const panelStyle = useAnimatedStyle(() => ({ opacity: backdrop.value, transform: [{ scale: panel.value }] }));

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center">
        <Pressable className="absolute inset-0" onPress={onClose} accessible={false}>
          <Animated.View style={[{ flex: 1, backgroundColor: "#000000" }, backdropStyle]} />
        </Pressable>
        <Animated.View style={[{ width: "100%", maxWidth: 384 }, panelStyle]} className="mx-6">
          <View className="rounded-xl bg-card p-2 shadow-xl">
            {children}
            <Pressable onPress={onDone} className="mt-1 mb-2 min-h-12 items-center justify-center" accessible={true} accessibilityRole="button">
              <Text className="text-sm font-medium text-primary">Done</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
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

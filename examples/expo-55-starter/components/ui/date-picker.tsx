import React, { useState } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import { cn } from "../../lib/utils";
import { Calendar } from "./calendar";

export interface DatePickerProps {
  className?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  min?: Date;
  max?: Date;
  formatDate?: (date: Date) => string;
}

function PickerShell({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable className="flex-1 items-center justify-center bg-black/50" onPress={onClose}>
        <Pressable onPress={() => {}} className="mx-6 rounded-xl bg-card p-2 shadow-xl">
          {children}
          <Pressable onPress={onClose} className="mt-1 mb-2 items-center py-2" accessibilityRole="button">
            <Text className="text-sm font-medium text-muted-foreground">Cancel</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function TriggerButton({ label, hasValue, className, onPress }: { label: string; hasValue: boolean; className?: string; onPress: () => void }) {
  return (
    <Pressable className={cn("flex-row items-center rounded-md border border-input bg-background px-4 min-h-12", className)} onPress={onPress} accessible={true} accessibilityRole="button">
      <Text className={cn("flex-1 text-base", hasValue ? "text-foreground" : "text-muted-foreground")}>{label}</Text>
      <Text className="text-muted-foreground text-xs">{"▾"}</Text>
    </Pressable>
  );
}

export function DatePicker({ className, value, onChange, placeholder = "Select date...", min, max, formatDate }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const display = value ? (formatDate ?? ((d: Date) => d.toLocaleDateString()))(value) : placeholder;

  return (
    <>
      <TriggerButton label={display} hasValue={!!value} className={className} onPress={() => setOpen(true)} />
      <PickerShell open={open} onClose={() => setOpen(false)}>
        <Calendar selected={value} onSelect={(d) => { onChange?.(d); setOpen(false); }} min={min} max={max} />
      </PickerShell>
    </>
  );
}

export interface DateRangePickerProps {
  className?: string;
  startDate?: Date;
  endDate?: Date;
  onRangeChange?: (start: Date, end: Date | undefined) => void;
  placeholder?: string;
  min?: Date;
  max?: Date;
}

export function DateRangePicker({ className, startDate, endDate, onRangeChange, placeholder = "Select range...", min, max }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const display = startDate ? `${startDate.toLocaleDateString()}${endDate ? ` - ${endDate.toLocaleDateString()}` : ""}` : placeholder;

  return (
    <>
      <TriggerButton label={display} hasValue={!!startDate} className={className} onPress={() => setOpen(true)} />
      <PickerShell open={open} onClose={() => setOpen(false)}>
        <Calendar rangeStart={startDate} rangeEnd={endDate} onRangeChange={onRangeChange} min={min} max={max} />
      </PickerShell>
    </>
  );
}

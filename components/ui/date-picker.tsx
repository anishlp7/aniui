import React, { useState } from "react";
import { Pressable, Text, Platform } from "react-native";
import DateTimePicker, { type DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { cn } from "@/lib/utils";

export interface DatePickerProps {
  className?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  mode?: "date" | "time" | "datetime";
  placeholder?: string;
}

export function DatePicker({
  className,
  value,
  onChange,
  mode = "date",
  placeholder = "Select date...",
}: DatePickerProps) {
  const [show, setShow] = useState(false);
  const [internalDate, setInternalDate] = useState(value ?? new Date());
  const currentDate = value ?? internalDate;

  const handleChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") setShow(false);
    if (selectedDate) {
      setInternalDate(selectedDate);
      onChange?.(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    if (mode === "time") return date.toLocaleTimeString();
    if (mode === "datetime") return date.toLocaleString();
    return date.toLocaleDateString();
  };

  return (
    <>
      <Pressable
        className={cn(
          "flex-row items-center rounded-md border border-input bg-background px-4 min-h-12",
          className
        )}
        onPress={() => setShow(true)}
        accessible={true}
        accessibilityRole="button"
      >
        <Text className={cn("text-base", value ? "text-foreground" : "text-muted-foreground")}>
          {value ? formatDate(currentDate) : placeholder}
        </Text>
      </Pressable>
      {show && (
        <DateTimePicker
          value={currentDate}
          mode={mode === "datetime" ? "date" : mode}
          onChange={handleChange}
        />
      )}
    </>
  );
}

import React, { useState } from "react";
import { View, Pressable, Modal } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { cn } from "@/lib/utils";

export interface PopoverProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function Popover({ open: controlledOpen, onOpenChange, children }: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = controlledOpen ?? uncontrolledOpen;
  const setOpen = (v: boolean) => {
    setUncontrolledOpen(v);
    onOpenChange?.(v);
  };

  return (
    <>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        const childType = (child as React.ReactElement<{ componentType?: string }>).props.componentType;
        if (childType === "trigger") {
          return React.cloneElement(child as React.ReactElement<PopoverTriggerProps>, {
            onPress: () => setOpen(!isOpen),
          });
        }
        if (childType === "content" && isOpen) {
          return (
            <Modal transparent animationType="none" onRequestClose={() => setOpen(false)}>
              <Pressable className="flex-1" onPress={() => setOpen(false)}>
                <Animated.View
                  entering={FadeIn.duration(150)}
                  exiting={FadeOut.duration(100)}
                  className="flex-1 items-center justify-center"
                >
                  <Pressable onPress={(e) => e.stopPropagation()}>
                    {child}
                  </Pressable>
                </Animated.View>
              </Pressable>
            </Modal>
          );
        }
        return child;
      })}
    </>
  );
}

export interface PopoverTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  children?: React.ReactNode;
  componentType?: string;
}

export function PopoverTrigger({ className, children, ...props }: PopoverTriggerProps) {
  return (
    <Pressable
      className={cn("min-h-12 min-w-12", className)}
      accessible={true}
      accessibilityRole="button"
      {...props}
    >
      {children}
    </Pressable>
  );
}

PopoverTrigger.defaultProps = { componentType: "trigger" };

export interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
  componentType?: string;
}

export function PopoverContent({ className, children, componentType: _ct, ...props }: PopoverContentProps) {
  return (
    <View
      className={cn("w-72 rounded-lg border border-border bg-card p-4 shadow-lg", className)}
      {...props}
    >
      {children}
    </View>
  );
}

PopoverContent.defaultProps = { componentType: "content" };

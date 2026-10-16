import React, { createContext, useContext, useState, useCallback } from "react";
import { View, Text } from "react-native";
import { cn } from "@/lib/utils";

type FieldError = string | undefined;
type Validator = (value: string) => FieldError;
type FormErrors = Record<string, FieldError>;

const FormContext = createContext<{
  errors: FormErrors;
  setFieldError: (field: string, error: FieldError) => void;
  validateField: (field: string, value: string, rules?: FieldRules) => boolean;
}>({ errors: {}, setFieldError: () => {}, validateField: () => true });

const FormFieldContext = createContext<{ name: string; error: FieldError }>({
  name: "",
  error: undefined,
});

export type FieldRules = {
  required?: string | boolean;
  pattern?: { value: RegExp; message: string };
  validate?: Validator;
};

export interface FormProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function Form({ className, children, ...props }: FormProps) {
  const [errors, setErrors] = useState<FormErrors>({});

  const setFieldError = useCallback((field: string, error: FieldError) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, []);

  const validateField = useCallback(
    (field: string, value: string, rules?: FieldRules): boolean => {
      if (!rules) return true;
      if (rules.required && !value.trim()) {
        const msg = typeof rules.required === "string" ? rules.required : "This field is required";
        setErrors((prev) => ({ ...prev, [field]: msg }));
        return false;
      }
      if (rules.pattern && !rules.pattern.value.test(value)) {
        setErrors((prev) => ({ ...prev, [field]: rules.pattern!.message }));
        return false;
      }
      if (rules.validate) {
        const error = rules.validate(value);
        setErrors((prev) => ({ ...prev, [field]: error }));
        return !error;
      }
      setErrors((prev) => ({ ...prev, [field]: undefined }));
      return true;
    },
    []
  );

  return (
    <FormContext.Provider value={{ errors, setFieldError, validateField }}>
      <View className={cn("gap-4", className)} {...props}>
        {children}
      </View>
    </FormContext.Provider>
  );
}

export function useFormField() {
  const form = useContext(FormContext);
  const field = useContext(FormFieldContext);
  return { ...field, ...form };
}

export interface FormFieldProps {
  name: string;
  children: React.ReactNode;
}

export function FormField({ name, children }: FormFieldProps) {
  const { errors } = useContext(FormContext);
  return (
    <FormFieldContext.Provider value={{ name, error: errors[name] }}>
      {children}
    </FormFieldContext.Provider>
  );
}

export interface FormItemProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function FormItem({ className, children, ...props }: FormItemProps) {
  return <View className={cn("gap-1", className)} {...props}>{children}</View>;
}

export function FormMessage({ className, ...props }: { className?: string }) {
  const { error } = useContext(FormFieldContext);
  if (!error) return null;
  return (
    <Text className={cn("text-sm text-destructive", className)} accessibilityRole="alert" {...props}>
      {error}
    </Text>
  );
}

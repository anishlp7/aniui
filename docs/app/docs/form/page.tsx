import { PreviewFormDemo } from "@/components/preview/form";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { PreviewToggle } from "@/components/preview-toggle";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add form`;
const usageCode = `import { Form, FormField, FormItem, FormMessage, useFormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function ValidatedInput({ rules }: { rules?: FieldRules }) {
  const { name, error, validateField } = useFormField();
  return (
    <Input
      variant={error ? "destructive" : "default"}
      onBlur={(e) => validateField(name, e.nativeEvent.text, rules)}
    />
  );
}

export function MyScreen() {
  return (
    <Form>
      <FormField name="email">
        <FormItem>
          <Label>Email</Label>
          <ValidatedInput rules={{ required: "Email is required", pattern: { value: /@/, message: "Invalid email" } }} />
          <FormMessage />
        </FormItem>
      </FormField>
      <Button onPress={() => console.log("submit")}>Submit</Button>
    </Form>
  );
}`;
const hookCode = `import { useFormField } from "@/components/ui/form";

// Inside a FormField context:
const { name, error, errors, setFieldError, validateField } = useFormField();

// Validate a field with rules
validateField("email", value, {
  required: "Email is required",
  pattern: { value: /^[^@]+@[^@]+$/, message: "Invalid email" },
  validate: (val) => val.includes("test") ? "No test emails" : undefined,
});`;
const sourceCode = `import React, { createContext, useContext, useState, useCallback } from "react";
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
}`;
export default function FormPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Form</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Form context with validation, error messages, and compound components.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="form" />
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewFormDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* useFormField Hook */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">useFormField Hook</h2>
        <p className="text-sm text-muted-foreground">
          Access form context and field state from within a <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">FormField</code>. Returns the field name, error, all errors, and validation helpers.
        </p>
        <CodeBlock code={hookCode} title="Using useFormField" />
      </div>
      {/* FieldRules Type */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">FieldRules Type</h2>
        <PropsTable props={[
          { name: "required", type: "string | boolean", default: "-" },
          { name: "pattern", type: "{ value: RegExp; message: string }", default: "-" },
          { name: "validate", type: "(value: string) => string | undefined", default: "-" },
        ]} />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <h3 className="text-lg font-medium text-foreground">Form</h3>
        <PropsTable props={[
          { name: "className", type: "string", default: "-" },
          { name: "children", type: "React.ReactNode", default: "-" },
        ]} />
        <h3 className="text-lg font-medium text-foreground mt-6">FormField</h3>
        <PropsTable props={[
          { name: "name", type: "string", default: "-" },
          { name: "children", type: "React.ReactNode", default: "-" },
        ]} />
        <h3 className="text-lg font-medium text-foreground mt-6">FormItem</h3>
        <PropsTable props={[
          { name: "className", type: "string", default: "-" },
          { name: "children", type: "React.ReactNode", default: "-" },
        ]} />
        <h3 className="text-lg font-medium text-foreground mt-6">FormMessage</h3>
        <PropsTable props={[
          { name: "className", type: "string", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Form</code> and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">FormItem</code> also accept all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Form validation with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">FormField</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">FormItem</code>, and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">FormMessage</code> for error announcements.</li>
          <li>Error messages are associated with their fields for screen readers.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/form.tsx" />
      </div>
    </div>
  );
}

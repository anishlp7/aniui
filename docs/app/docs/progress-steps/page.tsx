import { Heading } from "@/components/heading";
import { PreviewProgressStepsDemo } from "@/components/preview/progress-steps";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { PreviewToggle } from "@/components/preview-toggle";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add progress-steps`;
const usageCode = `import { ProgressSteps, ProgressStep } from "@/components/ui/progress-steps";

export function MyScreen() {
  const [step, setStep] = useState(1);

  return (
    <ProgressSteps current={step}>
      <ProgressStep label="Account" />
      <ProgressStep label="Profile" />
      <ProgressStep label="Review" />
      <ProgressStep label="Done" />
    </ProgressSteps>
  );
}`;
const sourceCode = `import React, { createContext, useContext } from "react";
import { View, Text } from "react-native";
import { cn } from "@/lib/utils";

const StepsContext = createContext<{ current: number }>({ current: 0 });

export interface ProgressStepsProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  current: number;
  children?: React.ReactNode;
}

export function ProgressSteps({ current, className, children, ...props }: ProgressStepsProps) {
  return (
    <StepsContext.Provider value={{ current }}>
      <View className={cn("flex-row items-center", className)} accessibilityRole="list" {...props}>
        {React.Children.map(children, (child, index) => (
          <>
            {index > 0 && (
              <View className={cn("flex-1 h-0.5 mx-2", index <= current ? "bg-primary" : "bg-muted")} />
            )}
            {React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<{ _index?: number }>, { _index: index })
              : child}
          </>
        ))}
      </View>
    </StepsContext.Provider>
  );
}

export interface ProgressStepProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  label?: string;
  icon?: React.ReactNode;
  _index?: number;
}

export function ProgressStep({ label, icon, className, _index = 0, ...props }: ProgressStepProps) {
  const { current } = useContext(StepsContext);
  const isCompleted = _index < current;
  const isActive = _index === current;

  return (
    <View className={cn("items-center gap-1", className)} accessibilityRole="listitem" {...props}>
      <View
        className={cn(
          "h-8 w-8 rounded-full items-center justify-center",
          isCompleted ? "bg-primary" : isActive ? "border-2 border-primary bg-background" : "bg-muted"
        )}
      >
        {icon ?? (
          <Text
            className={cn(
              "text-sm font-semibold",
              isCompleted ? "text-primary-foreground" : isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            {isCompleted ? "\u2713" : _index + 1}
          </Text>
        )}
      </View>
      {label && (
        <Text
          className={cn(
            "text-xs",
            isActive ? "text-primary font-medium" : "text-muted-foreground"
          )}
          numberOfLines={1}
        >
          {label}
        </Text>
      )}
    </View>
  );
}`;
export default function ProgressStepsPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Progress Steps</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Multi-step progress indicator for wizards and onboarding flows.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="progress-steps" />
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewProgressStepsDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <Heading as="h3" className="text-lg font-medium text-foreground">ProgressSteps</Heading>
        <PropsTable props={[
          { name: "current", type: "number", default: "-" },
          { name: "className", type: "string", default: "-" },
          { name: "children", type: "React.ReactNode", default: "-" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">ProgressStep</Heading>
        <PropsTable props={[
          { name: "label", type: "string", default: "-" },
          { name: "icon", type: "React.ReactNode", default: "-" },
          { name: "className", type: "string", default: "-" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Multi-step wizard with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="list"</code> on the container.</li>
          <li>Current step and completion state are announced to screen readers.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/progress-steps.tsx" />
      </div>
    </div>
  );
}

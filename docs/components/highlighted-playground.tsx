import { highlight } from "@/lib/highlight";
import { ComponentPlaygroundClient } from "@/components/component-playground";

interface ComponentPlaygroundProps {
  code: string;
  children: React.ReactNode;
  /** Use "inline" for overlay components (dialog, drawer, toast) that escape containment */
  variant?: "phone" | "inline";
  /** Optional Expo Snack URL for real device preview */
  snackUrl?: string;
}

export async function ComponentPlayground({ code, children, ...props }: ComponentPlaygroundProps) {
  const highlightedCode = await highlight(code, "tsx");
  return (
    <ComponentPlaygroundClient code={code} highlightedCode={highlightedCode} {...props}>
      {children}
    </ComponentPlaygroundClient>
  );
}

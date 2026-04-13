"use client";
import { PreviewToastProvider, usePreviewToast } from "@/components/preview/toast";

function ToastButtons() {
  const { toast } = usePreviewToast();
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => toast({ title: "Success!", description: "Your action was completed." })}
        className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer"
      >
        Default
      </button>
      <button
        onClick={() => toast({ title: "Error", description: "Something went wrong.", variant: "destructive" })}
        className="inline-flex items-center justify-center rounded-md bg-destructive text-destructive-foreground px-4 py-2 text-sm font-medium hover:bg-destructive/90 transition-colors cursor-pointer"
      >
        Destructive
      </button>
      <button
        onClick={() => toast({ title: "Saved!", description: "Changes saved successfully.", variant: "success" })}
        className="inline-flex items-center justify-center rounded-md border border-input bg-background text-foreground px-4 py-2 text-sm font-medium hover:bg-accent transition-colors cursor-pointer"
      >
        Success
      </button>
    </div>
  );
}

export function ToastDemo() {
  return (
    <PreviewToastProvider>
      <ToastButtons />
    </PreviewToastProvider>
  );
}

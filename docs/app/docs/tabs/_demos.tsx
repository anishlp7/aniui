"use client";
import { PreviewTabs, PreviewTabsList, PreviewTabsTrigger, PreviewTabsContent } from "@/components/preview/tabs";

export function TabsDemo() {
  return (
    <div className="w-full max-w-sm">
      <PreviewTabs defaultValue="account">
        <PreviewTabsList>
          <PreviewTabsTrigger value="account">Account</PreviewTabsTrigger>
          <PreviewTabsTrigger value="password">Password</PreviewTabsTrigger>
        </PreviewTabsList>
        <PreviewTabsContent value="account">
          <p className="text-sm text-muted-foreground p-4">Account settings content here.</p>
        </PreviewTabsContent>
        <PreviewTabsContent value="password">
          <p className="text-sm text-muted-foreground p-4">Password settings content here.</p>
        </PreviewTabsContent>
      </PreviewTabs>
    </div>
  );
}

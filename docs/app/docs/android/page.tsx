import { CodeBlock } from "@/components/code-block";

export default function AndroidPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Android</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Platform-specific quirks and best practices for Android.
        </p>
      </div>
      <div className="space-y-6 text-foreground leading-7">
        <p className="text-muted-foreground">
          AniUI components work on both iOS and Android out of the box. However, there are platform
          differences to be aware of. This page documents known Android-specific behaviors.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight pt-4">Bottom Sheet / Action Sheet / Select</h2>
        <p className="text-muted-foreground">
          Components that use <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@gorhom/bottom-sheet</code>{" "}
          (Bottom Sheet, Action Sheet, Select) require your app to be wrapped in{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">GestureHandlerRootView</code>{" "}
          on Android. Without this, gestures will silently fail.
        </p>
        <CodeBlock
          title="app/_layout.tsx"
          code={`import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Your app content */}
    </GestureHandlerRootView>
  );
}`}
        />

        <h2 className="text-2xl font-semibold tracking-tight pt-4">Keyboard Handling</h2>
        <p className="text-muted-foreground">
          Android keyboard behavior differs from iOS. Set{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">android.softInputMode</code>{" "}
          in your <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">app.json</code> to control
          how inputs behave when the keyboard appears:
        </p>
        <CodeBlock
          title="app.json"
          code={`{
  "expo": {
    "android": {
      "softInputMode": "adjustResize"
    }
  }
}`}
        />
        <p className="text-muted-foreground">
          When using <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">KeyboardAvoidingView</code>,
          set <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">behavior=&quot;height&quot;</code> on
          Android (vs <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">&quot;padding&quot;</code> on iOS).
        </p>

        <h2 className="text-2xl font-semibold tracking-tight pt-4">Dialog / Alert Dialog</h2>
        <p className="text-muted-foreground">
          Android&apos;s hardware back button should dismiss modals. If you customize the Dialog or Alert Dialog
          component, you may need to integrate{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">BackHandler</code> from React Native
          to handle back button presses:
        </p>
        <CodeBlock
          code={`import { BackHandler } from "react-native";
import { useEffect } from "react";

useEffect(() => {
  if (!open) return;
  const handler = BackHandler.addEventListener(
    "hardwareBackPress",
    () => { onOpenChange(false); return true; }
  );
  return () => handler.remove();
}, [open]);`}
        />

        <h2 className="text-2xl font-semibold tracking-tight pt-4">Switch</h2>
        <p className="text-muted-foreground">
          The native <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Switch</code> component
          renders differently on Android vs iOS. AniUI&apos;s Switch wraps the native component, so appearance varies
          by platform. Use <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">thumbColor</code> and{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">trackColor</code> props to normalize
          the look if needed.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight pt-4">Shadows &amp; Elevation</h2>
        <p className="text-muted-foreground">
          NativeWind <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">shadow-*</code> classes
          map to <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">elevation</code> on Android.
          Shadows look different from iOS — Android uses a single elevation value while iOS supports
          multiple shadow properties (offset, radius, color). Components like Card that use shadows
          may appear slightly different across platforms.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight pt-4">Safe Area</h2>
        <p className="text-muted-foreground">
          Android status bar and navigation bar insets behave differently from iOS. Always use{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-safe-area-context</code>{" "}
          to handle safe areas consistently across both platforms.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight pt-4">Testing Checklist</h2>
        <p className="text-muted-foreground">
          When testing your app on Android, verify:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
          <li>Keyboard interactions — inputs scroll into view, no overlap</li>
          <li>Gesture components — bottom sheet, drawer, carousel respond to swipes</li>
          <li>Shadows and elevation — cards, dialogs look acceptable</li>
          <li>Dark mode — works on Android 10+ with system theme</li>
          <li>Back button — dismisses modals, navigates back correctly</li>
          <li>Touch targets — all interactive elements are 48dp minimum</li>
        </ul>
      </div>
    </div>
  );
}

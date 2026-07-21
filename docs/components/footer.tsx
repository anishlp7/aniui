import Script from "next/script";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-md px-4 sm:px-6 py-12 text-center">
        <h2 className="text-base font-semibold text-foreground">Stay in the loop</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          New components, guides, and release notes — no spam, unsubscribe anytime.
        </p>
        <div className="mt-5 w-full">
          {/* Beehiiv subscribe form (inline mode) — the loader mounts the form in
              place. Loaded via next/script (afterInteractive) so it runs once React
              has finished hydrating; a raw <script> tag here gets its injected DOM
              wiped out by hydration reconciliation before it ever becomes visible. */}
          <Script
            src="https://subscribe-forms.beehiiv.com/v3/loader.js"
            data-beehiiv-form="942f25c3-4d3c-4cff-9f2c-399020d11e16"
            strategy="afterInteractive"
          />
        </div>
      </div>
      <div className="border-t border-border px-4 sm:px-6 py-8 text-center text-sm text-muted-foreground">
        <p className="flex flex-wrap items-center justify-center gap-1.5">
          Made with <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" /> by{" "}
          <a
            href="https://anishl.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline underline-offset-4 hover:text-foreground/80"
          >
            Anish
          </a>
          . The source code is available on{" "}
          <a
            href="https://github.com/anishlp7/aniui"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline underline-offset-4 hover:text-foreground/80"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="px-6 py-8 text-center text-sm text-muted-foreground">
        <p className="flex items-center justify-center gap-1.5">
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

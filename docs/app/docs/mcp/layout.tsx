import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP Server",
  description: "AniUI Model Context Protocol server for AI-assisted React Native component generation.",
  alternates: { canonical: "/docs/mcp" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { MDXComponents } from "mdx/types";
import React from "react";
import { CodeBlock } from "@/components/code-block-server";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PropsTable, ComponentTable } from "@/components/props-table";
import { PreviewToggle } from "@/components/preview-toggle";
import type { BundledLanguage } from "shiki";

/** Extract plain text from React children (handles strings and nested elements) */
function extractText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (React.isValidElement(children) && children.props?.children) {
    return extractText(children.props.children as React.ReactNode);
  }
  return "";
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Intercept fenced code blocks: MDX compiles them to <pre><code className="language-xxx">
    pre: (props: React.ComponentPropsWithoutRef<"pre">) => {
      const codeChild = React.Children.only(props.children) as React.ReactElement<{
        className?: string;
        children?: React.ReactNode;
      }>;
      const className = codeChild?.props?.className ?? "";
      const lang = (className.replace("language-", "") || "tsx") as BundledLanguage;
      const code = extractText(codeChild?.props?.children).replace(/\n$/, "");

      // @ts-expect-error -- async server component
      return <CodeBlock code={code} language={lang} />;
    },
    // Custom components available in MDX without importing
    ComponentPlayground,
    AddComponentTabs,
    PropsTable,
    ComponentTable,
    PreviewToggle,
  };
}

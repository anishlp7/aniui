"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function PreviewTable({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("overflow-x-auto rounded-md border border-border", className)} {...props}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border">
            <td className="px-4 py-3 text-foreground">Alice</td>
            <td className="px-4 py-3 text-foreground">Active</td>
            <td className="px-4 py-3 text-foreground">Admin</td>
          </tr>
          <tr className="border-b border-border">
            <td className="px-4 py-3 text-foreground">Bob</td>
            <td className="px-4 py-3 text-foreground">Inactive</td>
            <td className="px-4 py-3 text-foreground">User</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-foreground">Charlie</td>
            <td className="px-4 py-3 text-foreground">Active</td>
            <td className="px-4 py-3 text-foreground">Editor</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

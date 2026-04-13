"use client";

import { PreviewEmptyState } from "@/components/preview/empty-state";

function SearchIcon() {
  return (
    <svg className="h-12 w-12 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg className="h-12 w-12 text-destructive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
    </svg>
  );
}

export function EmptyStateMainDemo() {
  return (
    <PreviewEmptyState
      icon={<SearchIcon />}
      title="No results found"
      description="Try adjusting your search or filters to find what you're looking for."
      actionLabel="Clear Filters"
      onAction={() => {}}
    />
  );
}

export function EmptyStateNoResultsDemo() {
  return (
    <PreviewEmptyState
      icon={<SearchIcon />}
      title="No results found"
      description="Try adjusting your search or filters."
      actionLabel="Clear Filters"
      onAction={() => {}}
    />
  );
}

export function EmptyStateErrorDemo() {
  return (
    <PreviewEmptyState
      icon={<AlertIcon />}
      title="Something went wrong"
      description="We couldn't load your data. Please try again."
      actionLabel="Retry"
      onAction={() => {}}
    />
  );
}

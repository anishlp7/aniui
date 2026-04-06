"use client";

import React, { useState } from "react";

const mockFiles = [
  { name: "photo_2024.jpg", size: "2.4 MB", type: "image" },
  { name: "contract.pdf", size: "847 KB", type: "doc" },
];

export function PreviewFilePickerDemo() {
  const [files, setFiles] = useState<typeof mockFiles>([]);

  const handleUpload = () => setFiles(mockFiles);
  const removeFile = (idx: number) => setFiles((f) => f.filter((_, i) => i !== idx));

  return (
    <div className="w-full max-w-xs space-y-3">
      {/* Upload area */}
      <button
        onClick={handleUpload}
        className="w-full flex flex-col items-center justify-center min-h-24 rounded-lg border-2 border-dashed border-input bg-background px-4 py-6 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
      >
        <svg className="h-8 w-8 text-muted-foreground mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
        </svg>
        <span className="text-sm text-muted-foreground">{files.length ? "Tap to add more" : "Tap to upload a document"}</span>
      </button>

      {/* File list */}
      {files.map((file, i) => (
        <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
          <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            {file.type === "image" ? (
              <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>
            ) : (
              <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground">{file.size}</p>
          </div>
          <button onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive transition-colors cursor-pointer p-1">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
      ))}
    </div>
  );
}

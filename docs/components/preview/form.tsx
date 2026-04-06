"use client";

import React, { useState } from "react";

export function PreviewFormDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!password) { setError("Password is required"); return; }
    setError("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <div className="w-full max-w-xs space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">Email</label>
        <input className="w-full min-h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">Password</label>
        <input className="w-full min-h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm" type="password" placeholder="********" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
      <button onClick={handleSubmit} className={`w-full min-h-10 rounded-md text-sm font-medium cursor-pointer transition-colors ${submitted ? "bg-green-600 text-white" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>
        {submitted ? "Submitted!" : "Submit"}
      </button>
    </div>
  );
}

"use client";

import React, { useState } from "react";

export function PreviewFormDemo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const handleSubmit = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email address";
    if (!message.trim()) e.message = "Tell us what's going on";
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-xs space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">Name</label>
        <input className="w-full min-h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm" placeholder="Jane Cooper" value={name} onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((prev) => ({ ...prev, name: undefined })); }} />
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">Email</label>
        <input className="w-full min-h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm" placeholder="jane@example.com" value={email} onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((prev) => ({ ...prev, email: undefined })); }} />
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">Message</label>
        <textarea className="w-full min-h-20 px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm resize-none" placeholder="How can we help?" value={message} onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors((prev) => ({ ...prev, message: undefined })); }} />
        {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
      </div>
      <button onClick={handleSubmit} className={`w-full min-h-10 rounded-md text-sm font-medium cursor-pointer transition-colors ${submitted ? "bg-green-600 text-white" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>
        {submitted ? "Sent!" : "Send message"}
      </button>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const springPresets = [
  { name: "bouncy", damping: 12, stiffness: 150, mass: 0.5, desc: "Playful bounces" },
  { name: "snappy", damping: 18, stiffness: 250, mass: 0.8, desc: "Quick and crisp" },
  { name: "gentle", damping: 20, stiffness: 120, mass: 1, desc: "Smooth and relaxed" },
  { name: "stiff", damping: 26, stiffness: 350, mass: 1, desc: "Fast settle" },
  { name: "default", damping: 15, stiffness: 180, mass: 0.8, desc: "Balanced" },
] as const;

const enteringPresets = [
  "fadeIn",
  "fadeInUp",
  "fadeInDown",
  "slideInUp",
  "slideInDown",
  "slideInLeft",
  "slideInRight",
  "zoomIn",
  "bounceIn",
  "flipInX",
] as const;

// CSS keyframes mapped to each entering preset for web simulation
const enteringKeyframes: Record<string, string> = {
  fadeIn: "animate-fadeIn",
  fadeInUp: "animate-fadeInUp",
  fadeInDown: "animate-fadeInDown",
  slideInUp: "animate-slideInUp",
  slideInDown: "animate-slideInDown",
  slideInLeft: "animate-slideInLeft",
  slideInRight: "animate-slideInRight",
  zoomIn: "animate-zoomIn",
  bounceIn: "animate-bounceIn",
  flipInX: "animate-flipInX",
};

export function PreviewAnimateDemo() {
  const [activeSpring, setActiveSpring] = useState<string>("bouncy");
  const [springKey, setSpringKey] = useState(0);
  const [enteringKey, setEnteringKey] = useState(0);
  const [activeEntering, setActiveEntering] = useState<string>("fadeInUp");

  const handleSpringClick = (name: string) => {
    setActiveSpring(name);
    setSpringKey((k) => k + 1);
  };

  const handleEnteringClick = (name: string) => {
    setActiveEntering(name);
    setEnteringKey((k) => k + 1);
  };

  // Map spring presets to CSS transition properties
  const getSpringStyle = (name: string): React.CSSProperties => {
    const preset = springPresets.find((p) => p.name === name);
    if (!preset) return {};
    // Simulate spring feel with CSS: higher stiffness = shorter duration, higher damping = less bounce
    const duration = Math.max(0.2, (1 / preset.stiffness) * 200);
    const bounce = Math.max(0, (1 - preset.damping / 30) * 0.4);
    return {
      transition: `transform ${duration}s cubic-bezier(0.34, ${1 + bounce}, 0.64, 1)`,
    };
  };

  return (
    <div className="rounded-lg border border-border p-6 space-y-8">
      {/* Spring Presets */}
      <div className="space-y-4">
        <p className="text-sm font-medium text-foreground">Spring Presets</p>
        <div className="flex flex-wrap gap-2">
          {springPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handleSpringClick(preset.name)}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer",
                activeSpring === preset.name
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {preset.name}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-center h-24 rounded-md bg-muted/30">
          <div
            key={springKey}
            className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center spring-box"
            style={getSpringStyle(activeSpring)}
          >
            <span className="text-xs font-mono text-primary-foreground">{activeSpring}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          {springPresets.find((p) => p.name === activeSpring)?.desc} &mdash;{" "}
          damping: {springPresets.find((p) => p.name === activeSpring)?.damping},{" "}
          stiffness: {springPresets.find((p) => p.name === activeSpring)?.stiffness}
        </p>
      </div>

      {/* Entering Animations */}
      <div className="space-y-4">
        <p className="text-sm font-medium text-foreground">Entering Animations</p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {enteringPresets.map((name) => (
            <button
              key={name}
              onClick={() => handleEnteringClick(name)}
              className={cn(
                "px-2 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer text-center",
                activeEntering === name
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-center h-24 rounded-md bg-muted/30 overflow-hidden">
          <div
            key={`${activeEntering}-${enteringKey}`}
            className={cn("w-20 h-14 rounded-lg bg-primary/90 flex items-center justify-center", enteringKeyframes[activeEntering])}
          >
            <span className="text-[10px] font-mono text-primary-foreground">{activeEntering}</span>
          </div>
        </div>
      </div>

      <style>{`
        .spring-box {
          animation: springPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes springPop {
          0% { transform: scale(0.6); }
          60% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-fadeInDown { animation: fadeInDown 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-slideInUp { animation: slideInUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-slideInDown { animation: slideInDown 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-slideInRight { animation: slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-zoomIn { animation: zoomIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-bounceIn { animation: bounceIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-flipInX { animation: flipInX 0.5s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes slideInDown { from { transform: translateY(-100%); } to { transform: translateY(0); } }
        @keyframes slideInLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }
        @keyframes bounceIn { 0% { opacity: 0; transform: scale(0.3); } 50% { transform: scale(1.1); } 70% { transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes flipInX { from { opacity: 0; transform: perspective(400px) rotateX(90deg); } to { opacity: 1; transform: perspective(400px) rotateX(0); } }
      `}</style>
    </div>
  );
}

"use client";

import React from "react";

const products = [
  { name: "Canvas Tote", price: 28, seed: "tote" },
  { name: "Ceramic Mug", price: 16, seed: "mug" },
  { name: "Wool Scarf", price: 42, seed: "scarf" },
  { name: "Leather Wallet", price: 54, seed: "wallet" },
  { name: "Desk Lamp", price: 65, seed: "lamp" },
  { name: "Notebook Set", price: 19, seed: "notebook" },
];

export function PreviewGridDemo() {
  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
      {products.map((item) => (
        <div key={item.seed} className="bg-card rounded-lg overflow-hidden border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://picsum.photos/seed/${item.seed}/300/300`} alt={item.name} className="w-full h-[100px] object-cover" />
          <div className="p-3">
            <p className="text-sm text-foreground font-medium">{item.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">${item.price}.00</p>
          </div>
        </div>
      ))}
    </div>
  );
}

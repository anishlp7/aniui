"use client";

import React from "react";

const seeds = ["aniui-gallery-1", "aniui-gallery-2", "aniui-gallery-3"];

export function PreviewImageGalleryDemo() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex gap-2">
        {seeds.map((seed, i) => (
          <img
            key={i}
            src={`https://picsum.photos/seed/${seed}/400/300`}
            alt=""
            className="flex-1 aspect-[4/3] rounded-lg object-cover"
          />
        ))}
      </div>
      <div className="flex justify-center gap-1.5 mt-3">
        <div className="w-4 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-muted" />
        <div className="w-2 h-2 rounded-full bg-muted" />
      </div>
    </div>
  );
}

import { Heading } from "@/components/heading";

const phases = [
  { title: "Wave 1 — Shipped", items: ["Carousel 3D", "Carousel Parallax", "Shimmer", "Loader", "Flip Card", "Marquee", "Disclosure Group", "Event Ticket", "Receipt Card", "Coupon", "Polaroid", "Profile Card"] },
  { title: "Wave 2 — Shipped", items: ["Carousel Circular", "Carousel Scale", "Carousel Tilt", "Curved Bottom Tabs", "Morphing Tab Bar", "Mobile Dock", "Fan Menu"] },
  { title: "Wave 3 — Shipped", items: ["Photo Stack", "Book Page", "Barcode Badge", "Social Button", "Verified Badge", "QR Code", "Rolling Counter"] },
  { title: "Wave 4 — Shipped (Skia Tier 4)", items: ["Border Beam", "Gooey Switch", "Morph Loader", "Verified Shine", "Radiant Button"] },
];

export default function RoadmapPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Roadmap</h1>
        <p className="text-muted-foreground text-lg">AniUI grows in waves — motion carousels, UI pieces, and optional Skia-powered effects. Every component is an AniUI original, inspired by community patterns but built to our conventions.</p>
      </div>
      {phases.map((phase) => (
        <div key={phase.title} className="space-y-3">
          <Heading as="h2" className="text-xl font-semibold">{phase.title}</Heading>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            {phase.items.map((item) => (<li key={item}>{item}</li>))}
          </ul>
        </div>
      ))}
    </div>
  );
}

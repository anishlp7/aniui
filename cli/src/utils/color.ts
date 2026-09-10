/**
 * HSL-triple ("H S% L%", as used throughout templates/global.css and
 * theme-presets.ts) to hex conversion — needed because React Native native
 * props (Switch colors, TextInput caret, Skia canvas fills, etc.) can't read
 * CSS custom properties, so theme-provider.tsx's THEME_COLORS block needs
 * literal hex baked in instead.
 */
export function hslToHex(hsl: string): string {
  const match = hsl.trim().match(/^(-?[\d.]+)\s+([\d.]+)%\s+([\d.]+)%$/);
  if (!match) {
    throw new Error(`hslToHex: could not parse HSL triple "${hsl}" (expected "H S% L%")`);
  }

  let h = parseFloat(match[1]) % 360;
  if (h < 0) h += 360;
  const s = parseFloat(match[2]) / 100;
  const l = parseFloat(match[3]) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  const toHex = (channel: number) => {
    const value = Math.round((channel + m) * 255);
    return Math.max(0, Math.min(255, value)).toString(16).padStart(2, "0");
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

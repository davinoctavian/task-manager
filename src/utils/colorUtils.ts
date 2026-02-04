export function adjustColor(hex: string, amount: number): string {
  let useHex = hex.replace("#", "");
  if (useHex.length === 3) {
    useHex = useHex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(useHex, 16);
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00ff) + amount;
  let b = (num & 0x0000ff) + amount;

  r = Math.max(Math.min(255, r), 0);
  g = Math.max(Math.min(255, g), 0);
  b = Math.max(Math.min(255, b), 0);

  return `rgb(${r},${g},${b})`;
}

export function invertColor(hex: string): string {
  let useHex = hex.replace("#", "");
  if (useHex.length === 3) {
    useHex = useHex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(useHex, 16);
  const r = 255 - (num >> 16);
  const g = 255 - ((num >> 8) & 0x00ff);
  const b = 255 - (num & 0x0000ff);

  return `rgb(${r},${g},${b})`;
}

export function getContrastColor(hex: string): string {
  let useHex = hex.replace("#", "");
  if (useHex.length === 3) {
    useHex = useHex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(useHex, 16);
  const r = num >> 16;
  const g = (num >> 8) & 0x00ff;
  const b = num & 0x0000ff;

  // Perceived brightness formula
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? "#000000" : "#ffffff";
}

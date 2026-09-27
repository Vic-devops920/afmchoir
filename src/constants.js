export const COLORS = {
  bg: "#f6f5f2",
  surface: "#ffffff",
  border: "#e2e0d9",
  borderStrong: "#c9c6bc",
  text: "#232220",
  textSecondary: "#6b6862",
  textMuted: "#9c988f",
  accent: "#5b4636",
  accentFg: "#ffffff",
  accentSoft: "#efe6dc",
  danger: "#a3352f",
};

export const PARTS = ["Soprano", "Alto", "Tenor", "Bass"];

export function instrumentLabel(instr) {
  if (!instr) return "";
  const lower = instr.trim().toLowerCase();
  const vowels = ["a", "e", "i", "o", "u"];
  const article = vowels.includes(lower[0]) ? "an" : "a";
  return `${article} ${lower} player`;
}
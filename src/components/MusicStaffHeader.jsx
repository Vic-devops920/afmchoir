import React from "react";
import { MUSIC } from "./musicTheme";

// A simple five-line staff with a treble clef and a couple of notes,
// drawn as SVG so it stays crisp at any size. This is the one
// "signature" decorative element for the auth screens.
export default function MusicStaffHeader() {
  const lines = [0, 1, 2, 3, 4];
  const lineSpacing = 11;
  const top = 14;
  return (
    <svg
      viewBox="0 0 320 64"
      width="100%"
      height="64"
      style={{ display: "block", marginBottom: 4 }}
      aria-hidden="true"
    >
      {lines.map((i) => (
        <line
          key={i}
          x1="8"
          y1={top + i * lineSpacing}
          x2="312"
          y2={top + i * lineSpacing}
          stroke={MUSIC.staffLine}
          strokeWidth="1.4"
        />
      ))}
      {/* treble clef */}
      <text
        x="10"
        y="58"
        fontSize="58"
        fill={MUSIC.brass}
        style={{ fontFamily: MUSIC.displayFont }}
      >
        &#119070;
      </text>
      {/* a few scattered notes trailing off */}
      <text x="150" y="42" fontSize="20" fill={MUSIC.inkSoft} style={{ fontFamily: MUSIC.displayFont }}>
        &#9834;
      </text>
      <text x="200" y="30" fontSize="16" fill={MUSIC.staffLine} style={{ fontFamily: MUSIC.displayFont }}>
        &#9835;
      </text>
      <text x="250" y="48" fontSize="18" fill={MUSIC.inkSoft} style={{ fontFamily: MUSIC.displayFont }}>
        &#9834;
      </text>
    </svg>
  );
}
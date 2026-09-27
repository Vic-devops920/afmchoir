import React from "react";
import { MUSIC } from "./musicTheme";

// The curly brace that joins a set of staves into a "grand staff",
// stretched to match the height of however many fields sit beside it.
export default function GrandStaffBrace() {
  return (
    <div style={{ width: 26, alignSelf: "stretch", flexShrink: 0 }} aria-hidden="true">
      <svg viewBox="0 0 30 100" preserveAspectRatio="none" width="100%" height="100%">
        <path
          d="M 25 2 C 6 2 10 25 10 32 C 10 42 2 46 0 50 C 2 54 10 58 10 68 C 10 75 6 98 25 98"
          fill="none"
          stroke={MUSIC.brass}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
import React from "react";
import { MUSIC } from "./musicTheme";

const TREBLE = "\u{1D11E}"; // 𝄞
const BASS = "\u{1D122}"; // 𝄢

export default function StaffField({
  label,
  clef = "treble",
  value,
  onChange,
  placeholder,
  type = "text",
  isSelect = false,
  options = [],
}) {
  const clefChar = clef === "bass" ? BASS : TREBLE;

  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: MUSIC.inkSoft,
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div style={{ position: "relative", height: 56 }}>
        <svg
          viewBox="0 0 400 56"
          preserveAspectRatio="none"
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
          aria-hidden="true"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="38"
              y1={10 + i * 9}
              x2="398"
              y2={10 + i * 9}
              stroke={MUSIC.staffLine}
              strokeWidth="1.2"
            />
          ))}
        </svg>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: 34,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: MUSIC.displayFont,
            fontSize: 32,
            color: MUSIC.brass,
            pointerEvents: "none",
          }}
        >
          {clefChar}
        </div>
        {isSelect ? (
          <select
            value={value}
            onChange={onChange}
            style={{
              position: "absolute",
              left: 42,
              right: 6,
              top: 15,
              background: "transparent",
              border: "none",
              outline: "none",
              fontFamily: MUSIC.displayFont,
              fontSize: 18,
              color: MUSIC.ink,
            }}
          >
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        ) : (
          <input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            style={{
              position: "absolute",
              left: 42,
              right: 6,
              top: 15,
              background: "transparent",
              border: "none",
              outline: "none",
              fontFamily: MUSIC.displayFont,
              fontSize: 18,
              color: MUSIC.ink,
            }}
          />
        )}
      </div>
    </div>
  );
}
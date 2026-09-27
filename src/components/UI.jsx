import React from "react";
import { COLORS } from "../constants";

export function Button({ children, primary, danger, style, ...rest }) {
  return (
    <button
      {...rest}
      style={{
        fontFamily: "inherit",
        fontSize: 14,
        fontWeight: 600,
        borderRadius: 10,
        border: `1px solid ${danger ? COLORS.danger : primary ? COLORS.accent : COLORS.borderStrong}`,
        background: primary ? COLORS.accent : COLORS.surface,
        color: danger ? COLORS.danger : primary ? COLORS.accentFg : COLORS.text,
        padding: "10px 16px",
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export function Input(props) {
  return (
    <input
      {...props}
      style={{
        fontFamily: "inherit",
        fontSize: 14,
        padding: "9px 12px",
        borderRadius: 8,
        border: `1px solid ${COLORS.borderStrong}`,
        background: COLORS.surface,
        width: "100%",
        color: COLORS.text,
        ...props.style,
      }}
    />
  );
}

export function Label({ children }) {
  return (
    <label
      style={{
        display: "block",
        fontSize: 13,
        fontWeight: 600,
        color: COLORS.textSecondary,
        margin: "12px 0 4px",
      }}
    >
      {children}
    </label>
  );
}

export function Card({ children, style }) {
  return (
    <div
      style={{
        background: COLORS.surface,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 14,
        padding: 20,
        marginBottom: 16,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Badge({ children }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: 12,
        fontWeight: 600,
        padding: "3px 10px",
        borderRadius: 999,
        background: COLORS.accentSoft,
        color: COLORS.accent,
      }}
    >
      {children}
    </span>
  );
}
import React from "react";
import { COLORS } from "../constants";
import { IconOverview, IconMic, IconUsers, IconSettings, IconSearch, IconLogout } from "./icons";

const NAV_ITEMS = [
  { id: "overview", label: "Overview", Icon: IconOverview },
  { id: "recordings", label: "Recordings", Icon: IconMic },
  { id: "choristers", label: "Choristers", Icon: IconUsers },
  { id: "settings", label: "Settings", Icon: IconSettings },
];

export default function AdminSidebar({ activeView, setActiveView, search, setSearch, onLogout }) {
  return (
    <div
      style={{
        width: 220,
        flexShrink: 0,
        borderRight: `1px solid ${COLORS.border}`,
        paddingRight: 16,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div style={{ position: "relative" }}>
        <IconSearch style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: COLORS.textMuted }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          style={{
            width: "100%",
            padding: "8px 10px 8px 32px",
            borderRadius: 8,
            border: `1px solid ${COLORS.borderStrong}`,
            fontSize: 13,
            fontFamily: "inherit",
            background: COLORS.surface,
            color: COLORS.text,
          }}
        />
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const active = activeView === id;
          return (
            <button
              key={id}
              onClick={() => setActiveView(id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 10px",
                borderRadius: 8,
                border: "none",
                background: active ? COLORS.accentSoft : "transparent",
                color: active ? COLORS.accent : COLORS.textSecondary,
                fontWeight: active ? 700 : 500,
                fontSize: 14,
                fontFamily: "inherit",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <Icon />
              {label}
            </button>
          );
        })}
      </nav>

      <div style={{ marginTop: "auto" }}>
        <button
          onClick={onLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 10px",
            borderRadius: 8,
            border: `1px solid ${COLORS.borderStrong}`,
            background: COLORS.surface,
            color: COLORS.textSecondary,
            fontSize: 13,
            fontFamily: "inherit",
            cursor: "pointer",
            width: "100%",
          }}
        >
          <IconLogout />
          Log out
        </button>
      </div>
    </div>
  );
}
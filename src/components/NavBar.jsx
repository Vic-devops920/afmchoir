import React from "react";
import { COLORS } from "../constants";
import { Button } from "./UI";

export default function NavBar({ user, view, setView, onLogout }) {
  const isAdmin = user?.isAdmin;
  const linkStyle = (active) => ({
    border: "none",
    background: "none",
    fontWeight: active ? 700 : 500,
    color: active ? COLORS.accent : COLORS.textSecondary,
    padding: "6px 10px",
    cursor: "pointer",
    fontSize: 14,
  });
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 0",
        borderBottom: `1px solid ${COLORS.border}`,
        marginBottom: 24,
      }}
    >
      <strong>ChoirPractice</strong>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {!isAdmin ? (
          <>
            <button style={linkStyle(view === "home")} onClick={() => setView("home")}>Home</button>
            <button style={linkStyle(view === "record")} onClick={() => setView("record")}>Record</button>
            <button style={linkStyle(view === "history")} onClick={() => setView("history")}>My recordings</button>
            <button style={linkStyle(view === "settings")} onClick={() => setView("settings")}>Settings</button>
          </>
        ) : (
          <button style={linkStyle(view === "admin")} onClick={() => setView("admin")}>Admin review</button>
        )}
        <Button onClick={onLogout}>Log out</Button>
      </div>
    </div>
  );
}
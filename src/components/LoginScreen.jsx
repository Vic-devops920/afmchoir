import React, { useState } from "react";
import { MUSIC } from "./musicTheme";
import MusicStaffHeader from "./MusicStaffHeader";
import GrandStaffBrace from "./GrandStaffBrace";
import StaffField from "./StaffField";

function ManuscriptShell({ children }) {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: MUSIC.paper,
        borderRadius: 18,
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: 440, width: "100%" }}>{children}</div>
    </div>
  );
}

export default function LoginScreen({ onLogin, goSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await onLogin({ email: email.trim(), password });
    } catch (e) {
      setError(e.message || "Could not log in.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleSignupClick(e) {
    e.preventDefault();
    goSignup();
  }

  return (
    <ManuscriptShell>
      <MusicStaffHeader />
      <h1
        style={{
          fontFamily: MUSIC.displayFont,
          fontSize: 30,
          fontWeight: 600,
          color: MUSIC.ink,
          margin: "0 0 4px",
        }}
      >
        Welcome back
      </h1>
      <p style={{ fontFamily: MUSIC.displayFont, fontStyle: "italic", color: MUSIC.inkSoft, margin: "0 0 20px" }}>
        Take your place — enter your email and password.
      </p>

      {error && (
        <div
          style={{
            color: MUSIC.burgundy,
            fontSize: 13,
            marginBottom: 14,
            fontFamily: MUSIC.displayFont,
            fontStyle: "italic",
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "stretch", gap: 10 }}>
        <GrandStaffBrace />
        <div style={{ flex: 1 }}>
          <StaffField
            label="Email"
            clef="treble"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@example.com"
            type="email"
          />
          <StaffField
            label="Password"
            clef="bass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            type="password"
          />
        </div>
      </div>

      <button
        onClick={submit}
        disabled={submitting}
        style={{
          width: "100%",
          padding: "13px 16px",
          marginTop: 10,
          background: MUSIC.brass,
          color: "#fff8ea",
          border: "none",
          borderRadius: 999,
          fontFamily: MUSIC.displayFont,
          fontSize: 16,
          fontWeight: 600,
          letterSpacing: "0.02em",
          cursor: submitting ? "default" : "pointer",
          opacity: submitting ? 0.7 : 1,
        }}
      >
        {submitting ? "Entering..." : "Enter"}
      </button>

      <p style={{ marginTop: 20, fontSize: 14, fontFamily: MUSIC.displayFont, color: MUSIC.inkSoft }}>
        New to the choir?{" "}
        <a href="#" onClick={handleSignupClick} style={{ color: MUSIC.brass, fontWeight: 600 }}>
          Join here
        </a>
      </p>
    </ManuscriptShell>
  );
}
import React, { useState } from "react";
import { MUSIC } from "./musicTheme";
import MusicStaffHeader from "./MusicStaffHeader";
import GrandStaffBrace from "./GrandStaffBrace";
import StaffField from "./StaffField";
import { PARTS } from "../constants";

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

export default function SignupScreen({ onSignup, goLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [instrument, setInstrument] = useState("");
  const [part, setPart] = useState(PARTS[0]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    if (!name.trim() || !email.trim() || !password) {
      setError("Name, email, and password are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await onSignup({
        name: name.trim(),
        email: email.trim(),
        password,
        instrument: instrument.trim() || "Voice",
        part,
      });
    } catch (e) {
      setError(e.message || "Could not sign up.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleLoginClick(e) {
    e.preventDefault();
    goLogin();
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
        Join the choir
      </h1>
      <p style={{ fontFamily: MUSIC.displayFont, fontStyle: "italic", color: MUSIC.inkSoft, margin: "0 0 20px" }}>
        A few details, and you'll have your place on the score.
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
            label="Full name"
            clef="treble"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
          />
          <StaffField
            label="Email"
            clef="bass"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@example.com"
            type="email"
          />
          <StaffField
            label="Password"
            clef="treble"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            type="password"
          />
          <StaffField
            label='Instrument (or "Voice" if you sing only)'
            clef="bass"
            value={instrument}
            onChange={(e) => setInstrument(e.target.value)}
            placeholder="e.g. Violin, Piano, Voice"
          />
          <StaffField
            label="Choir part"
            clef="treble"
            isSelect
            value={part}
            onChange={(e) => setPart(e.target.value)}
            options={PARTS}
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
        {submitting ? "Joining..." : "Take your seat"}
      </button>

      <p style={{ marginTop: 20, fontSize: 14, fontFamily: MUSIC.displayFont, color: MUSIC.inkSoft }}>
        Already singing with us?{" "}
        <a href="#" onClick={handleLoginClick} style={{ color: MUSIC.brass, fontWeight: 600 }}>
          Log in
        </a>
      </p>
    </ManuscriptShell>
  );
}
import React, { useState } from "react";
import { COLORS, PARTS } from "../constants";
import { Button, Input, Label, Card } from "./UI";
import { supabase } from "../supabaseClient";

export default function SettingsScreen({ user, onSaved }) {
  const [instrument, setInstrument] = useState(user.instrument || "");
  const [part, setPart] = useState(user.part || PARTS[0]);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  async function save() {
    setSaving(true);
    setStatus("");
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ instrument: instrument.trim() || "Voice", part })
        .eq("id", user.id);
      if (error) throw error;
      setStatus("Saved.");
      onSaved();
    } catch (e) {
      setStatus("Could not save: " + e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 style={{ margin: "0 0 6px" }}>Settings</h1>
      <p>Update your instrument and choir part.</p>
      <Card>
        <Label>Instrument (or "Voice" if you sing only)</Label>
        <Input value={instrument} onChange={(e) => setInstrument(e.target.value)} placeholder="e.g. Violin, Piano, Voice" />

        <Label>Choir part</Label>
        <select
          value={part}
          onChange={(e) => setPart(e.target.value)}
          style={{
            fontFamily: "inherit",
            fontSize: 14,
            padding: "9px 12px",
            borderRadius: 8,
            border: `1px solid ${COLORS.borderStrong}`,
            width: "100%",
          }}
        >
          {PARTS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <div style={{ marginTop: 16 }}>
          <Button primary onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </div>
        {status && <div style={{ marginTop: 10, color: COLORS.textSecondary, fontSize: 13 }}>{status}</div>}
      </Card>
    </div>
  );
}
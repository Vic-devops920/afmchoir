import React from "react";
import { COLORS, instrumentLabel } from "../constants";
import { Button, Card } from "./UI";

export default function HomeScreen({ user, recordings, setView }) {
  const commented = recordings.filter((r) => r.comments?.length).length;
  return (
    <div>
      <h1 style={{ margin: "0 0 6px" }}>Welcome, {user.name}</h1>
      <p style={{ fontSize: 16, color: COLORS.textSecondary }}>
        {user.part} &middot; {instrumentLabel(user.instrument)}
      </p>
      <div style={{ display: "flex", gap: 10, margin: "20px 0" }}>
        <Card style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{recordings.length}</div>
          <div style={{ color: COLORS.textMuted }}>Recordings saved</div>
        </Card>
        <Card style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{commented}</div>
          <div style={{ color: COLORS.textMuted }}>With admin feedback</div>
        </Card>
      </div>
      <Card>
        <h3 style={{ marginTop: 0 }}>Ready to practice?</h3>
        <p>Record yourself singing or playing, and your admin will review it and leave feedback to help you improve.</p>
        <Button primary onClick={() => setView("record")}>Start a new recording</Button>
      </Card>
    </div>
  );
}
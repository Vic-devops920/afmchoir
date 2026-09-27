import React from "react";
import { COLORS } from "../constants";
import { Card } from "./UI";

export default function AdminOverview({ users, recordings }) {
  const totalChoristers = users.length;
  const totalRecordings = recordings.length;
  const awaitingFeedback = recordings.filter((r) => !r.comments || r.comments.length === 0).length;
  const byPart = users.reduce((acc, u) => {
    acc[u.part] = (acc[u.part] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h1 style={{ margin: "0 0 6px" }}>Overview</h1>
      <p>A quick look at how practice is going across the choir.</p>

      <div style={{ display: "flex", gap: 10, margin: "16px 0" }}>
        <Card style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{totalChoristers}</div>
          <div style={{ color: COLORS.textMuted }}>Choristers</div>
        </Card>
        <Card style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{totalRecordings}</div>
          <div style={{ color: COLORS.textMuted }}>Recordings</div>
        </Card>
        <Card style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{awaitingFeedback}</div>
          <div style={{ color: COLORS.textMuted }}>Awaiting feedback</div>
        </Card>
      </div>

      <Card>
        <h3 style={{ marginTop: 0 }}>Choir parts</h3>
        {Object.keys(byPart).length === 0 ? (
          <p style={{ color: COLORS.textMuted, margin: 0 }}>No choristers have signed up yet.</p>
        ) : (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {Object.entries(byPart).map(([part, count]) => (
              <span
                key={part}
                style={{
                  padding: "4px 12px",
                  borderRadius: 999,
                  background: COLORS.accentSoft,
                  color: COLORS.accent,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {part}: {count}
              </span>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
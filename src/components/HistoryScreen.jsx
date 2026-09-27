import React from "react";
import { COLORS } from "../constants";
import { Card, Badge } from "./UI";
import { useSignedUrls } from "../hooks/useSignedUrls";

export default function HistoryScreen({ recordings }) {
  const sorted = [...recordings].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const urls = useSignedUrls(sorted);

  if (!sorted.length) {
    return (
      <div>
        <h1>My recordings</h1>
        <div style={{ textAlign: "center", padding: 40, color: COLORS.textMuted }}>
          No recordings yet. Head to Record to make your first one.
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1>My recordings</h1>
      {sorted.map((r) => (
        <Card key={r.id}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{r.title}</strong>
            <Badge>{r.type}</Badge>
          </div>
          <div style={{ color: COLORS.textMuted, fontSize: 13 }}>{new Date(r.created_at).toLocaleString()}</div>
          {urls[r.id] &&
            (r.type === "video" ? (
              <video src={urls[r.id]} controls style={{ width: "100%", borderRadius: 8, marginTop: 8 }} />
            ) : (
              <audio src={urls[r.id]} controls style={{ width: "100%", marginTop: 8 }} />
            ))}
          {r.comments?.length ? (
            r.comments.map((c, i) => (
              <div key={i} style={{ background: COLORS.accentSoft, borderRadius: 8, padding: "8px 12px", marginTop: 6, fontSize: 13 }}>
                <strong>Admin:</strong> {c.text}
              </div>
            ))
          ) : (
            <div style={{ color: COLORS.textMuted, marginTop: 6, fontSize: 13 }}>No feedback yet.</div>
          )}
        </Card>
      ))}
    </div>
  );
}
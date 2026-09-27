import React, { useState } from "react";
import { COLORS, instrumentLabel } from "../constants";
import { Button, Input, Card, Badge } from "./UI";
import { useSignedUrls } from "../hooks/useSignedUrls";

export default function AdminScreen({ users, recordings, addComment }) {
  const [drafts, setDrafts] = useState({});
  const recs = [...recordings].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const urls = useSignedUrls(recs);

  if (!recs.length) {
    return (
      <div>
        <h1>Admin review</h1>
        <div style={{ textAlign: "center", padding: 40, color: COLORS.textMuted }}>No chorister recordings yet.</div>
      </div>
    );
  }
  const choristerCount = new Set(recs.map((r) => r.user_id)).size;
  return (
    <div>
      <h1>Admin review</h1>
      <p>
        {recs.length} recording{recs.length === 1 ? "" : "s"} from {choristerCount} chorister{choristerCount === 1 ? "" : "s"}.
      </p>
      {recs.map((r) => {
        const owner = users.find((u) => u.id === r.user_id);
        return (
          <Card key={r.id}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <strong>{owner?.name || "Unknown"}</strong>
                <span style={{ color: COLORS.textMuted }}>
                  {" "}
                  &middot; {owner?.part} &middot; {owner ? instrumentLabel(owner.instrument) : ""}
                </span>
              </div>
              <Badge>{r.type}</Badge>
            </div>
            <div style={{ color: COLORS.textMuted, fontSize: 13 }}>
              {r.title} &middot; {new Date(r.created_at).toLocaleString()}
            </div>
            {urls[r.id] ? (
              r.type === "video" ? (
                <video src={urls[r.id]} controls style={{ width: "100%", borderRadius: 8, marginTop: 8 }} />
              ) : (
                <audio src={urls[r.id]} controls style={{ width: "100%", marginTop: 8 }} />
              )
            ) : (
              <p style={{ color: COLORS.textMuted }}>Loading playback...</p>
            )}
            {r.comments?.map((c, i) => (
              <div key={i} style={{ background: COLORS.accentSoft, borderRadius: 8, padding: "8px 12px", marginTop: 6, fontSize: 13 }}>
                <strong>You:</strong> {c.text}
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <Input
                placeholder="Leave feedback..."
                value={drafts[r.id] || ""}
                onChange={(e) => setDrafts({ ...drafts, [r.id]: e.target.value })}
              />
              <Button
                onClick={() => {
                  const text = (drafts[r.id] || "").trim();
                  if (!text) return;
                  addComment(r.id, text);
                  setDrafts({ ...drafts, [r.id]: "" });
                }}
              >
                Comment
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
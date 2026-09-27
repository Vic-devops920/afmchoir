import React from "react";
import { COLORS, instrumentLabel } from "../constants";
import { Card, Badge } from "./UI";

export default function AdminChoristers({ users, recordings }) {
  if (!users.length) {
    return (
      <div>
        <h1>Choristers</h1>
        <div style={{ textAlign: "center", padding: 40, color: COLORS.textMuted }}>No choristers have signed up yet.</div>
      </div>
    );
  }
  return (
    <div>
      <h1>Choristers</h1>
      <p>{users.length} chorister{users.length === 1 ? "" : "s"} signed up.</p>
      {users.map((u) => {
        const count = recordings.filter((r) => r.user_id === u.id).length;
        return (
          <Card key={u.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong>{u.name}</strong>
                <div style={{ color: COLORS.textMuted, fontSize: 13 }}>{u.email}</div>
              </div>
              <Badge>{u.part}</Badge>
            </div>
            <div style={{ marginTop: 8, fontSize: 13, color: COLORS.textSecondary }}>
              {instrumentLabel(u.instrument)} &middot; {count} recording{count === 1 ? "" : "s"}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
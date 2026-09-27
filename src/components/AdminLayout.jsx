import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminOverview from "./AdminOverview";
import AdminScreen from "./AdminScreen";
import AdminChoristers from "./AdminChoristers";

function AdminSettingsPlaceholder() {
  return (
    <div>
      <h1>Settings</h1>
      <p>Admin account settings will live here in a future version.</p>
    </div>
  );
}

export default function AdminLayout({ users, recordings, addComment, onLogout }) {
  const [activeView, setActiveView] = useState("overview");
  const [search, setSearch] = useState("");

  const term = search.trim().toLowerCase();

  const filteredRecordings = term
    ? recordings.filter((r) => {
        const owner = users.find((u) => u.id === r.userId);
        return (
          r.title.toLowerCase().includes(term) ||
          (owner && owner.name.toLowerCase().includes(term))
        );
      })
    : recordings;

  const filteredUsers = term ? users.filter((u) => u.name.toLowerCase().includes(term)) : users;

  return (
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
      <AdminSidebar
        activeView={activeView}
        setActiveView={setActiveView}
        search={search}
        setSearch={setSearch}
        onLogout={onLogout}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        {activeView === "overview" && <AdminOverview users={users} recordings={recordings} />}
        {activeView === "recordings" && (
          <AdminScreen users={users} recordings={filteredRecordings} addComment={addComment} />
        )}
        {activeView === "choristers" && <AdminChoristers users={filteredUsers} recordings={recordings} />}
        {activeView === "settings" && <AdminSettingsPlaceholder />}
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { COLORS } from "./constants";
import { supabase } from "./supabaseClient";
import NavBar from "./components/NavBar";
import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import HomeScreen from "./components/HomeScreen";
import RecordScreen from "./components/RecordScreen";
import HistoryScreen from "./components/HistoryScreen";
import SettingsScreen from "./components/SettingsScreen";
import AdminLayout from "./components/AdminLayout";

export default function App() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [users, setUsers] = useState([]);
  const [recordings, setRecordings] = useState([]);
  const [authView, setAuthView] = useState("login"); // login | signup
  const [view, setView] = useState("home");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session?.user) {
      loadProfile(session.user.id);
    } else {
      setProfile(null);
      setUsers([]);
      setRecordings([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  async function loadProfile(userId) {
    const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
    setProfile(data);
  }

  async function refreshUsers() {
    const { data } = await supabase.from("profiles").select("*").order("name");
    setUsers(data || []);
  }

  async function refreshRecordings() {
    const { data } = await supabase.from("recordings").select("*").order("created_at", { ascending: false });
    setRecordings(data || []);
  }

  useEffect(() => {
    if (profile) {
      refreshRecordings();
      if (profile.is_admin) refreshUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  async function handleLogin({ email, password }) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async function handleSignup({ name, email, password, instrument, part }) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        name,
        email,
        instrument,
        part,
      });
      if (profileError) throw profileError;
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setAuthView("login");
    setView("home");
  }

  async function addComment(recId, text) {
    const rec = recordings.find((r) => r.id === recId);
    const newComments = [...(rec.comments || []), { text, at: Date.now() }];
    await supabase.from("recordings").update({ comments: newComments }).eq("id", recId);
    refreshRecordings();
  }

  function refreshProfile() {
    if (session?.user) loadProfile(session.user.id);
  }

  if (loading) return null;

  const currentUser = profile
    ? {
        id: profile.id,
        name: profile.name,
        instrument: profile.instrument,
        part: profile.part,
        isAdmin: profile.is_admin,
      }
    : null;

  const myRecordings = currentUser ? recordings.filter((r) => r.user_id === currentUser.id) : [];

  return (
    <div
      style={{
        background: COLORS.bg,
        color: COLORS.text,
        minHeight: "100vh",
        fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px 80px" }}>
        {!currentUser ? (
          authView === "login" ? (
            <LoginScreen onLogin={handleLogin} goSignup={() => setAuthView("signup")} />
          ) : (
            <SignupScreen onSignup={handleSignup} goLogin={() => setAuthView("login")} />
          )
        ) : currentUser.isAdmin ? (
          <AdminLayout users={users} recordings={recordings} addComment={addComment} onLogout={handleLogout} />
        ) : (
          <>
            <NavBar user={currentUser} view={view} setView={setView} onLogout={handleLogout} />
            {view === "home" ? (
              <HomeScreen user={currentUser} recordings={myRecordings} setView={setView} />
            ) : view === "record" ? (
              <RecordScreen
                user={currentUser}
                onSaved={() => {
                  refreshRecordings();
                  setView("history");
                }}
              />
            ) : view === "settings" ? (
              <SettingsScreen user={currentUser} onSaved={refreshProfile} />
            ) : (
              <HistoryScreen recordings={myRecordings} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
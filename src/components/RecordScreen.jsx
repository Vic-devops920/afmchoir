import React, { useState, useRef, useEffect } from "react";
import { COLORS } from "../constants";
import { Button, Input, Label, Card } from "./UI";
import { supabase } from "../supabaseClient";

export default function RecordScreen({ user, onSaved }) {
  const [recType, setRecType] = useState("audio");
  const [title, setTitle] = useState("");
  const [recording, setRecording] = useState(false);
  const [status, setStatus] = useState("");
  const [pendingUrl, setPendingUrl] = useState(null);
  const [saving, setSaving] = useState(false);

  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const videoRef = useRef(null);
  const blobRef = useRef(null);

  useEffect(() => {
    setPendingUrl(null);
    blobRef.current = null;
    stopStream();
    if (recType === "video") startPreview();
    return () => stopStream();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recType]);

  function stopStream() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }

  async function startPreview() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (e) {
      setStatus("Camera/mic access denied or unavailable.");
    }
  }

  async function startRecording() {
    try {
      let stream = streamRef.current;
      if (!stream) {
        stream = await navigator.mediaDevices.getUserMedia(
          recType === "video" ? { video: true, audio: true } : { audio: true }
        );
        streamRef.current = stream;
      }
      chunksRef.current = [];
      const mr = new MediaRecorder(stream);
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recType === "video" ? "video/webm" : "audio/webm" });
        blobRef.current = blob;
        setPendingUrl(URL.createObjectURL(blob));
        stopStream();
      };
      mr.start();
      recorderRef.current = mr;
      setRecording(true);
      setStatus("");
    } catch (e) {
      setStatus("Could not access microphone/camera.");
    }
  }

  function stopRecording() {
    if (recorderRef.current) recorderRef.current.stop();
    setRecording(false);
  }

  async function save() {
    if (!blobRef.current) return;
    setSaving(true);
    setStatus("");
    try {
      const path = `${user.id}/${Date.now()}.webm`;
      const { error: uploadError } = await supabase.storage
        .from("recordings")
        .upload(path, blobRef.current, {
          contentType: recType === "video" ? "video/webm" : "audio/webm",
        });
      if (uploadError) throw uploadError;

      const { error: insertError } = await supabase.from("recordings").insert({
        user_id: user.id,
        title: title.trim() || "Untitled recording",
        type: recType,
        file_path: path,
      });
      if (insertError) throw insertError;

      onSaved();
    } catch (e) {
      setStatus("Could not save recording: " + e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 style={{ margin: "0 0 6px" }}>New recording</h1>
      <p>Choose voice/instrument audio, or video.</p>
      <Card>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <Button primary={recType === "audio"} style={{ flex: 1 }} onClick={() => setRecType("audio")}>
            Audio only
          </Button>
          <Button primary={recType === "video"} style={{ flex: 1 }} onClick={() => setRecType("video")}>
            Video
          </Button>
        </div>
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Soprano part - bars 1-16" />
        <div style={{ marginTop: 14 }}>
          {recType === "video" ? (
            <video ref={videoRef} autoPlay muted playsInline style={{ width: "100%", borderRadius: 8, background: "#000" }} />
          ) : (
            <p style={{ color: COLORS.textMuted }}>Audio recording — no camera preview.</p>
          )}
        </div>
        <div style={{ marginTop: 10 }}>
          {!recording ? (
            <Button primary onClick={startRecording}>Start recording</Button>
          ) : (
            <Button danger onClick={stopRecording}>● Stop recording</Button>
          )}
        </div>
        {status && <div style={{ color: COLORS.textMuted, marginTop: 8 }}>{status}</div>}
        {pendingUrl && (
          <div style={{ marginTop: 10 }}>
            {recType === "video" ? (
              <video src={pendingUrl} controls style={{ width: "100%", borderRadius: 8 }} />
            ) : (
              <audio src={pendingUrl} controls style={{ width: "100%" }} />
            )}
            <Button primary style={{ marginTop: 10 }} onClick={save} disabled={saving}>
              {saving ? "Saving..." : "Save recording"}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
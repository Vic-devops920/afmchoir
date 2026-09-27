import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

// Given a list of recordings (each with a file_path in storage), fetch a
// temporary signed URL for each so it can actually be played back. The
// storage bucket is private, so a fresh signed URL is needed per session.
export function useSignedUrls(recordings) {
  const [urls, setUrls] = useState({});

  // Build a stable key from the actual data instead of relying on the
  // array's object identity, which changes on every render if the caller
  // creates a new array (e.g. via [...recordings].sort(...)).
  const key = recordings.map((r) => `${r.id}:${r.file_path}`).join("|");

  useEffect(() => {
    let cancelled = false;

    async function loadUrls() {
      const entries = await Promise.all(
        recordings.map(async (r) => {
          const { data, error } = await supabase.storage
            .from("recordings")
            .createSignedUrl(r.file_path, 3600);
          return [r.id, error ? null : data.signedUrl];
        })
      );
      if (!cancelled) setUrls(Object.fromEntries(entries));
    }

    if (recordings.length) loadUrls();
    else setUrls({});

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return urls;
}
// src/pages/GoogleCallback.jsx
import { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://wastara-backend-production.up.railway.app";
const FRONTEND_CALLBACK = "https://wastara-frontend.vercel.app/auth/google/callback";

export default function GoogleCallback() {
  const [msg, setMsg] = useState("Processing Google login...");

  useEffect(() => {
    (async () => {
      try {
        const p = new URLSearchParams(window.location.search);
        const code = p.get("code");
        const state = p.get("state");
        if (!code) { setMsg("Missing code"); return; }

        const res = await fetch(`${BACKEND_URL}/api/auth/google/exchange`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code,
            state,
            redirectUri: FRONTEND_CALLBACK,
          }),
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) { setMsg(data.message || "Google exchange failed"); return; }
        window.location.replace(data.redirect || "/");
      } catch (e) {
        console.error(e);
        setMsg("Google exchange failed");
      }
    })();
  }, []);

  return <div style={{ padding: 16 }}>{msg}</div>;
}
// routes/googleAuth.js
import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/exchange", async (req, res) => {
  try {
    const { code, state, redirectUri } = req.body;
    if (!code || !redirectUri) {
      return res.status(400).json({ message: "Missing code/redirectUri" });
    }

    // (Optional but recommended) whitelist redirect URIs
    const allowedRedirects = new Set([
      "https://wastara-frontend.vercel.app/auth/google/callback",
      "http://localhost:5173/auth/google/callback",
    ]);
    if (!allowedRedirects.has(redirectUri)) {
      return res.status(400).json({ message: "Invalid redirectUri" });
    }

    // 1) Exchange code -> tokens
    const tokenResp = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri, // must match FE callback exactly
      }),
    });

    if (!tokenResp.ok) {
      const err = await tokenResp.json().catch(() => ({}));
      return res
        .status(500)
        .json({ message: "Token exchange failed", details: err });
    }

    const { access_token: accessToken } = await tokenResp.json();

    // 2) Get profile
    const meResp = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!meResp.ok) {
      const err = await meResp.json().catch(() => ({}));
      return res
        .status(500)
        .json({ message: "Userinfo fetch failed", details: err });
    }

    const me = await meResp.json(); // { id, email, name, picture, ... }

    // 3) Find/create (or attach googleId to existing) and SET ROLE if state === "user"
    let user = await User.findOne({ email: me.email });

    if (user) {
      // attach googleId if missing
      if (!user.googleId) {
        user.googleId = me.id;
        user.authType = user.authType || "google";
      }

      // auto-set role if they came from "user" intent and role is still empty
      if (!user.role && state === "user") {
        user.role = "user";
        user.reportCount ??= 0;
      }

      await user.save();
    } else {
      user = await User.create({
        name: me.name,
        email: me.email,
        googleId: me.id,
        authType: "google",
        role: state === "user" ? "user" : null, // organizer finishes later
        reportCount: 0,
      });
    }

    // 4) Attach session
    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: "Login failed" });

      // 5) Where FE should go next (reuse your intent/state)
      if (!user.role) {
        if (state === "organizer") {
          return res.json({
            redirect: `${process.env.FRONTEND_URL}/signup/organizer/finish`,
          });
        }
        if (state === "user") {
          return res.json({
            redirect: `${process.env.FRONTEND_URL}/dashboard/user/`,
          });
        }
        return res.json({ redirect: `${process.env.FRONTEND_URL}/` });
      }

      return res.json({
        redirect:
          user.role === "organizer"
            ? `${process.env.FRONTEND_URL}/dashboard/organizer/`
            : `${process.env.FRONTEND_URL}/dashboard/user/`,
      });
    });
  } catch (e) {
    const details =
      e?.response?.data || e?.message || e?.toString?.() || "Unknown error";
    console.error("Google exchange error:", details);
    res.status(500).json({ message: "Google exchange failed", details });
  }
});

export default router;
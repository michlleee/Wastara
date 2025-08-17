import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import userRouter from "./routes/users.js";
import userDashboardRouter from "./routes/userDashboard.js";
import MongoStore from "connect-mongo";
import "./config/passport.js";
import User from "./models/User.js";
import clusterRoutes from "./routes/clusterRoutes.js";
import organizerRouter from "./routes/organizerDashboard.js";
import googleAuthRoutes from "./routes/googleAuth.js";

dotenv.config();

const FRONTEND_URL = process.env.FRONTEND_URL;
const port = process.env.PORT || 3000;
const app = express();
const allowedOrigins = [
  "https://wastara-frontend.vercel.app",
  "http://localhost:5173",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
if (process.env.NODE_ENV === "production") app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
    // Add session name for debugging
    name: "wastara.sid",
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log("🔍 Middleware - Session ID:", req.sessionID);
  console.log(
    "🔍 Middleware - Has passport in session:",
    !!req.session?.passport
  );
  next();
});

// Route handlers
app.use("/api/signup", userRouter);
app.use("/api/user-dashboard", userDashboardRouter);
app.use("/api/cluster", clusterRoutes);
app.use("/api/organizer-dashboard", organizerRouter);
app.use("/api/auth/google", googleAuthRoutes);

app.get("/auth/google", (req, res, next) => {
  const intent = req.query.intent;

  console.log("Intent:", intent);

  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: intent,
  })(req, res, next);
});

// Google OAuth callback
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${FRONTEND_URL}/login`,
    session: true,
  }),
  async (req, res) => {
    try {
      const intent = req.query.state;
      const user = req.user;

      console.log("Intent from state:", intent);
      console.log("User:", user);

      //If it's a temp user (not yet in DB)
      if (!user.role) {
        if (intent === "organizer") {
          return res.redirect(`${FRONTEND_URL}/signup/organizer/finish`);
        } else if (intent === "user") {
          const savedUser = await new User({
            ...user,
            role: "user",
            reportCount: 0,
          }).save();

          return req.login(savedUser, (err) => {
            if (err) {
              console.error("Login error after setting user role:", err);
              return res.redirect(`${FRONTEND_URL}/login`);
            }
            return res.redirect(`${FRONTEND_URL}/dashboard/user/`);
          });
        } else {
          console.warn("No intent provided on first-time login.");
          return res.redirect(`${FRONTEND_URL}/`);
        }
      }

      // If user already has a role (logins)
      if (user.role === "organizer") {
        return res.redirect(`${FRONTEND_URL}/dashboard/organizer/`);
      } else {
        return res.redirect(`${FRONTEND_URL}/dashboard/user/`);
      }
    } catch (error) {
      console.error("Google login error:", error);
      return res.redirect(`${FRONTEND_URL}/login`);
    }
  }
);

app.get("/api/me", (req, res) => {
  console.log("/api/me called");
  console.log("Session ID:", req.sessionID);
  console.log("Session:", req.session);
  console.log("User:", req.user);
  console.log("Is Authenticated:", req.isAuthenticated());

  if (req.isAuthenticated() && req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({
      message: "Not authenticated",
      debug: {
        hasSession: !!req.session,
        sessionID: req.sessionID,
        isAuthenticated: req.isAuthenticated(),
      },
    });
  }
});
//=================

// Start the server AFTER middlewares & routes are set
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    app.listen(port, "0.0.0.0", () => {
      console.log(`🚀 Server running on production port ${port}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

startServer();

// =====================

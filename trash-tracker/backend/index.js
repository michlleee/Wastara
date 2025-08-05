import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import userRouter from "./routes/users.js";
import MongoStore from "connect-mongo";
import "./config/passport.js";

dotenv.config();

const FRONTEND_URL = process.env.FRONTEND_URL;
const port = 3000;
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

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
      sameSite: "lax",
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Route handlers
app.use("/api/signup", userRouter);

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
    failureRedirect: "/login",
    session: true,
  }),
  (req, res) => {
    const intent = req.query.state;
    console.log("Intent from state:", intent);

    const mongoId = req.user._id.toString();
    const role = req.user.role;

    // First-time signup, no role yet
    if (!role) {
      if (intent === "organizer") {
        return res.redirect(
          `${FRONTEND_URL}/signup/organizer/finish/${mongoId}`
        );
      } else {
        return res.redirect(`${FRONTEND_URL}/dashboard/${mongoId}`);
      }
    }

    // Already has a role — redirect based on role
    if (role === "organizer") {
      return res.redirect(`${FRONTEND_URL}/dashboard/organizer/${mongoId}`);
    } else {
      return res.redirect(`${FRONTEND_URL}/dashboard/${mongoId}`);
    }
  }
);

app.get("/api/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

app.get("/login", (req, res) => {
  res.send(
    'Login failed or not logged in. <a href="/auth/google">Try Google Login</a>'
  );
});

//=================

// Start the server AFTER middlewares & routes are set
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");

    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

startServer();

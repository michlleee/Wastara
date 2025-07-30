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

const port = 3000;
const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

app.use(session({
  secret: process.env.COOKIE_KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: "sessions"
  }),
  cookie: {
    sameSite: 'lax',
    secure: false,
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// Route handlers
app.use('/api/signup', userRouter);


app.get("/auth/google", (req, res, next) => {
  const intent = req.query.intent;
  req.session.intent = intent;
  var nowIntent = intent;
  console.log(req.session.intent);
  
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })(req, res, next);
});

app.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
}), (req, res) => {
  if (!req.user.role) {
    // Check intent from session
    const intent = req.session?.intent;
    console.log("Intent in callback:", intent);

    if (nowIntent === "organizer") {
      return res.redirect("/finish-organizer-signup");
    } else {
      return res.redirect("/dashboard");
    }
  }

  res.redirect("/dashboard");
});

app.get("/api/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

//testing purposes
app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Hello, ${req.user.name}! You are logged in.`);
  } else {
    res.redirect('/login');
  }
});

app.get('/login', (req, res) => {
  res.send('Login failed or not logged in. <a href="/auth/google">Try Google Login</a>');
});

app.get('/finish-organizer-signup', (req, res)=>{
  res.send("Hi welcome to the second step of ur registration!")
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
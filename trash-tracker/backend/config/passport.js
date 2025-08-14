import passport from "passport";
import User from "../models/User.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          return cb(null, existingUser);
        }
        //user doesnt exist
        const tempUserData = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          authType: "google",
        };

        cb(null, tempUserData);
      } catch (error) {
        console.log(error);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  if (user._id) {
    cb(null, { id: user._id, isTemp: false });
  } else {
    cb(null, { tempUser: user, isTemp: true });
  }
});

passport.deserializeUser(async (data, cb) => {
  try {
    if (data.isTemp) {
      // Return temp user object directly (not in DB yet)
      return cb(null, data.tempUser);
    }
    // Lookup from DB
    const dbUser = await User.findById(data.id);
    cb(null, dbUser);
  } catch (err) {
    cb(err, null);
  }
});

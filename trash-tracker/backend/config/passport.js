import passport from "passport";
import User from "../models/User.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();

passport.use("google", new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
},
async (accessToken, refreshToken, profile, cb) => {
    try {
        const existingUser = await User.findOne({googleId: profile.id});

        if(existingUser){
            return cb(null, existingUser);
        }
        //user doesnt exist
        const newUser = await new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            authType: "google",
        }).save();

        cb(null, newUser);

    } catch (error) {
        console.log(error);
    }
}
));

passport.serializeUser((user, cb)=>{
    cb(null, user.id);
})

passport.deserializeUser( async (id, cb) =>{
    const user = await User.findById(id);
    cb(null, user)
})

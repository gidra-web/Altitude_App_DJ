import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import Profile from '../models/profile.model.js';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Provera da li korisnik postoji
      let profile = await Profile.findOne({ googleId: profile.id });
      if (!profile) {
        // Kreiranje novog korisnika ako ne postoji
        profile = await Profile.create({
          googleId: profile.id,
          profilename: profile.displayName,
          email: profile.emails[0].value
        });
      }
      done(null, profile);
    } catch (error) {
      done(error);
    }
  }
));

passport.serializeUser ((profile, done) => {
  done(null, profile.id);
});

passport.deserializeUser(async (id, done) => {
  const profile = await Profile.findById(id);
  done(null, profile);
});

export default passport;

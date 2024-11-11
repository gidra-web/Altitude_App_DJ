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
    // Check if the user exists
    let userProfile = await Profile.findOne({ googleId: profile.id });

    const [firstName, ...lastNameParts] = profile.displayName.split(' ');
    const lastName = lastNameParts.join(' ');

    if (!userProfile) {
      // Create a new user if not found
      userProfile = await Profile.create({
        googleId: profile.id,
        name: firstName,
        lastname: lastName,
        email: profile.emails[0].value
      });
    }
    done(null, userProfile);
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

import passport from "passport";
import session from "express-session";
import LocalStrategy from "passport-local/strategy";

authUser = (email, password, done) => {
  let authProfile = { email, password };
  return done(null, authProfile);
};

export default function auth(app) {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );

  app.use(new LocalStrategy(authUser));

  passport.serializeUser((profileObj, done) => {
    done(null, profileObj);
  });

  passport.deserializeUser((profileObj, done) => {
    done(null, profileObj);
  });

  app.use(passport.initialize());
  app.use(passport.session());
}

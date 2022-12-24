import passport from 'passport';
import LocalStrategy from 'passport-local';

import {controllerLogin} from '../controllers/controllerLogin.js';

passport.use('login', new LocalStrategy(controllerLogin.passportLogin));

passport.use(
  'signup',
  new LocalStrategy({passReqToCallback: true}, controllerLogin.passportSignup)
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(controllerLogin.deserialize);

export default passport;

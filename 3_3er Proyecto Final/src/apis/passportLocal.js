import passport from "passport"
import LocalStrategy from "passport-local"

import { loginMongodb } from "../controllers/login.js"

passport.use("login", new LocalStrategy(loginMongodb.passportLogin))

passport.use(
  "signup",
  new LocalStrategy({ passReqToCallback: true }, loginMongodb.passportSignup)
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(loginMongodb.deserialize)

export default passport

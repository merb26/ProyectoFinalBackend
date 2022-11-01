import passport from "passport"
import Strategy from "passport-local"

import { loginMongodb } from "../controllers/login.js"

passport.use("login", new Strategy(loginMongodb.passportLogin))

passport.use(
  "signup",
  new Strategy({ passReqToCallback: true }, loginMongodb.passportSignup)
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(loginMongodb.deserialize)

export default passport

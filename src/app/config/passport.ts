import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../modules/user/user.model";
import bcrypt from "bcrypt";

passport.use(
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done) => {
      try {
        if (!email) {
          return done(null, false, { message: "Email is not found" });
        }
        const existUser = await User.findOne({ email });
        if (!existUser) {
          return done(null, false, { message: "User is not exists" });
        }
        const passwordMatch = bcrypt.compare(password, existUser.password);
        if (!passwordMatch) {
          return done(null, false, { message: "Password is not matched" });
        }
        return done(null, existUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);

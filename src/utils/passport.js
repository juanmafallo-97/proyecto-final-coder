const bcrypt = require("bcrypt");
const passport = require("passport");
const { Strategy } = require("passport-local");
const User = require("../models/User");

const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

const createHash = (password) => bcrypt.hashSync(password, 10, null);

passport.use(
  "login",
  new Strategy({ usernameField: "email" }, (username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      if (err) return done(err);
      if (!user) {
        console.log("Usuario no encontrado");
        return done(null, false);
      }
      if (!isValidPassword(user, password)) {
        console.log("Contraseña incorrecta");
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((id, done) => {
  done(null, id);
});

module.exports = passport;

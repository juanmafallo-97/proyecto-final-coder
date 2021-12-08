const passport = require("../utils/passport");
const authService = require("../services/authService");

const login = (req, res, next) => {
  passport.authenticate("login", function (err, user) {
    if (err) {
      res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(401).json({ error: "Datos de sesión inválidos" });
    }
    req.logIn(user, function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      }
      return res
        .status(200)
        .json({ error: null, user: { name: user.name, email: user.email } });
    });
  })(req, res, next);
};

const signup = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(200).json({ error: null, user: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = (req, res) => {
  try {
    req.logout();
    res.status(200).json({ error: null, message: "Sesión cerrada con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { login, signup, logout };

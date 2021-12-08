const authRouter = require("express").Router();
const authController = require("../controllers/authController");

authRouter.post("/login", authController.login);
authRouter.post("/signup", authController.signup);
authRouter.get("/logout", authController.logout);

module.exports = authRouter;

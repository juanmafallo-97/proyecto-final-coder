const userRouter = require("express").Router();
const userController = require("../controllers/userController");
const upload = require("../utils/multer");

const getFilename = (req, res, next) => {
  if (req.avatar) {
    req.filename = req.body.email + Date.now();
  }
  console.log(req.avatar, req.body);
  next();
};

userRouter.post("/login", userController.login);
userRouter.post(
  "/signup",
  getFilename,
  upload.single("avatar"),
  userController.signup
);
userRouter.get("/logout", userController.logout);

module.exports = userRouter;

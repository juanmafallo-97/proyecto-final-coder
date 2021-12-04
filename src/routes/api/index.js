const apiRouter = require("express").Router();
const productsRouter = require("./productsRouter");
const cartRouter = require("./cartsRouter");

apiRouter.use("/", (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

apiRouter.use("/productos", productsRouter);
apiRouter.use("/carrito", cartRouter);

module.exports = apiRouter;

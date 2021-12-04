const router = require("express").Router();
const apiRouter = require("./api");
const authRouter = require("./authRouter");

router.use("/api", apiRouter);
router.use("/auth", authRouter);

/* Ruta no implementada */
router.get("*", (req, res) => {
  const url = req.originalUrl;
  const method = req.method;
  res.json({
    error: 404,
    descripcion: `Ruta ${url}, método ${method} no implementada`,
  });
});

module.exports = router;

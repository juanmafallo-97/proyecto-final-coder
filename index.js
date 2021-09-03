const express = require("express");
const app = express();
const productsRouter = require("./src/routes/productsRouter");
const cartRouter = require("./src/routes/cartsRouter");

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Variable provisioria para constrolar el acceso a ciertas rutas */
const administrador = true;
app.use("/", (req, res, next) => {
  req.auth = administrador;
  next();
});

app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartRouter);

/* Ruta no implementada */
app.use("*", (req, res) => {
  const url = req.originalUrl;
  const method = req.method;
  res.json({
    error: 404,
    descripcion: `Ruta ${url}, método ${method} no implementada`
  });
});

app.listen(PORT, () => console.log("Server activo en puerto " + PORT));

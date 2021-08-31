const express = require("express");
const app = express();
const productsRouter = require("./src/routes/productsRouter");
const cartRouter = require("./src/routes/cartsRouter");

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartRouter);

app.listen(PORT, () => console.log("Server activo en puerto " + PORT));

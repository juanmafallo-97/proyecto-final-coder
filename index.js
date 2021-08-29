const express = require("express");
const app = express();
const productsRouter = require("./src/routes/products");

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/productos", productsRouter);

app.listen(PORT, () => console.log("Server activo en puerto " + PORT));

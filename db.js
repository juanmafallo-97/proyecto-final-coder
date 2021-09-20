const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Base de datos conectada exitosamente"))
  .catch((err) => console.log("Error al conectar a la base de datos: " + err));

module.exports = mongoose;

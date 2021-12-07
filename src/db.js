const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { logInfo, logError } = require("./utils/logger");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => logInfo("Base de datos conectada exitosamente"))
  .catch((err) => logError(`Error al conectar a la base de datos: ${err}`));

module.exports = mongoose;

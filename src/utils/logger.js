const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({ filename: "warn.log", level: "warn" }),
    new winston.transports.File({ filename: "error.log", level: "error" })
  ]
});

const logInfo = (info) => {
  logger.log("info", info);
};

const logWarning = (warning) => {
  logger.log("warn", warning);
};

const logError = (err) => {
  logger.log("error", err);
};

module.exports = { logInfo, logWarning, logError };

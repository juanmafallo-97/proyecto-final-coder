const minimist = require("minimist");

const minimistOptions = {
  alias: {
    p: "port",
    m: "modo"
  },
  default: {
    port: 8080,
    mode: "fork"
  }
};

const { port, mode } = minimist(process.argv.slice(2), minimistOptions);

module.exports = {
  port,
  mode
};

const cluster = require("cluster");
const { cpus } = require("os");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("./utils/passport");
const router = require("./routes/index");
const { logInfo } = require("./utils/logger");
require("./db");

const app = express();

const { port, mode } = require("./utils/minimist");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  session({
    cookie: {
      maxAge: 600000
    },
    secret: "secreto",
    rolling: true,
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", router);

/*   Cluster   */
if (mode === "cluster" && cluster.isMaster) {
  console.log("Modo:", mode);
  for (let i = 0; i < cpus().length; i++) {
    cluster.fork();
    console.log(`CPU: ${i}`);
  }
  cluster.on("exit", (worker) => {
    console.log(`El proceso ${worker.process.pid} terminó`);
    cluster.fork();
  });
} else {
  process.on("exit", (code) => {
    console.log(`El proceso ${process.pid} terminó con código ${code}`);
  });

  app.listen(port, () => logInfo(`Server activo en puerto ${port}`));
}

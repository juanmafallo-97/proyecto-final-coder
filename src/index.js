const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("./utils/passport");
const router = require("./routes/index");
require("./db");

const app = express();

const PORT = 8080;

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

app.listen(PORT, () => console.log("Server activo en puerto " + PORT));

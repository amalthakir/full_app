const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const connectDB = require("./config.env/connect");
const morgen = require("morgan");
const dotenv = require("dotenv");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const passport = require("passport");
const session = require("express-session");
const MongosStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");

//
dotenv.config({ path: "./config.env/.env" });
require("./config.env/passport")(passport);

connectDB();

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

//logging
if (process.env.NODE_ENV === "development") {
  app.use(morgen("dev"));
}

//handlebars
const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
  stripNbsp,
} = require("./helper/hbs");
app.engine(
  ".hbs",
  exphbs({
    helpers: {
      formatDate,
      stripTags,
      truncate,
      editIcon,
      select,
      stripNbsp,
    },
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongosStore({ mongooseConnection: mongoose.connection }),
  })
);

//passport
app.use(passport.initialize());
app.use(passport.session());

// Set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

//static
app.use(express.static(path.join(__dirname, "public")));

//router
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/stories", require("./routes/stories"));

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`server running in  ${process.env.NODE_ENV} mode on port ${PORT}`)
);

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const AppError = require("./utils/AppError");
const projectRoute = require("./routes/project");
const reviewRoute = require("./routes/review");
const userRoute = require("./routes/user");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");

// Mongoose Connection

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/projectReview";
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("database connected");
});

// Enables CORS

app.use(cors());

// Parses incoming requests to JSON

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helmet middleware for security

app.use(helmet());

// Searches for any keys in objects that begin with a '$' sign or contain a '.'
// from req.body, req.query or req.params
// and replaces it with '_'.

app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

// Passport config and middleware

app.use(passport.initialize());
require("./config/passport")(passport);

// Routes

app.use("/", userRoute);
app.use("/projects", projectRoute);
app.use("/projects/:id/reviews", reviewRoute);

// New Error to all unrecognized routes

app.all("*", (req, res, next) => {
  next(new AppError("Not Found", 400));
});

// Error Handler

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).json({ status: status.toString(), message });
});

// listens for connections on the given path

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Listening to port " + port);
});

const createError = require("http-errors");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");

dotenv.config();

const app = express();

const uri = process.env.DATABASE_URL;

mongoose
	.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Connected to DB");
	});

// ROUTERS
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users"); //delete later
const adminRouter = require("./routes/admin");
const orderRouter = require("./routes/orders");
const bookRouter = require("./routes/books");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors({ origin: process.env.SERVER_DOMAIN }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// PASSPORT
app.use(passport.initialize());

// MIDDLEWARES
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/order", orderRouter);
app.use("/books", bookRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;

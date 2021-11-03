const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const compression = require("compression");
const cookieParser = require("cookie-parser");

const app = express();

//load controller
const errorController = require("./controllers/errorController");

//load routes
const userRoutes = require("./routes/userRoutes");

//enable proxy
app.enable("trust-proxy");

//cors
const corsOptions = {
    origin: [
        "localhost:3000",
        "http://localhost:3000",
        "http://127.0.0.1",
        "http://abusayeed.me",
        /\.abusayeed\.me$/,
    ], // the origin of the requests - frontend address
    credentials: true,
    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
};

app.use("/api/", cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(helmet());

//rate limit
app.use(
    "*",
    rateLimit({
        max: 10000,
        windowMs: 60 * 60 * 1000,
        message: "Too many http request, please try again in a hour",
    })
);

//body parser
app.use(express.json({ limit: "50mb" }));
app.use(
    express.urlencoded({ extended: true, limit: "50mb", parameterLimit: 50000 })
);
app.use(cookieParser());

//Database request sanitize against nosql injection
app.use(mongoSanitize());

// Data clean against xss attack
app.use(xss());

//prevent parameter pollution
app.use(hpp());

app.use(compression());

//log with morgan
app.use(morgan("dev"));

//isLogged in

//routes

app.use("/api/v1/users", userRoutes);

// set static folder
app.use(express.static("client/out"));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "out", "index.html"));
});

//error controller
app.use(errorController);

//export app
module.exports = app;

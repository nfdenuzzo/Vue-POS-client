//import dependencies
const express = require('express')
const serverless = require('serverless-http')
const Sentry = require("@sentry/node");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./routes.js");

// define the Express app
const app = express();

Sentry.init({
  dsn:
    "https://1177fb0af4fb4ca299b3a1fe19030813@o220784.ingest.sentry.io/5374441",
});
// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json({ limit: "2mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan("combined"));

app.use("/api", routes);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());


// module.exports = app;
module.exports.handler = serverless(app, { callbackWaitsForEmptyEventLoop: false });

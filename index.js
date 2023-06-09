const express = require("express");
const Sentry = require("@sentry/node");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World! Deployment: " + process.env.VERSION);
});

app.get("/error", (req, res) => {
  const randomValue = Math.floor(Math.random() * 1000000000);
  const fingerprint = [`${process.env.VERSION}:${randomValue}`];
  const error = new Error(
    "Unexpected Error " + process.env.VERSION + ": " + randomValue
  );
  Sentry.captureException(error, {
    fingerprint: fingerprint,
  });
  throw error;
});

// Set up Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  release: process.env.VERSION,
  integrations: [
    // ...
  ],
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

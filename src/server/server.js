import cookieParser from 'cookie-parser';
import errorhandler from 'errorhandler';
import express from 'express';
import _get from 'lodash/get';
import morgan from 'morgan';
import { v4 as uuid } from 'uuid';

const app = express();

if (process.env.NODE_ENV === 'development') {
  // Error handler - https://github.co｀  m/expressjs/errorhandler
  // Development error handler, providing stack traces and error message responses for requests accepting text, html, or json.
  app.use(errorhandler());

  app.enable('verbose errors'); // Enables verbose errors in development
} else {
  app.disable('verbose errors'); // Disables verbose errors in production
}

app.enable('trust proxy'); // Enables reverse proxy support, disabled by default
app.enable('case sensitive routing'); // Enable case sensitivity, disabled by default, treating "/Foo" and "/foo" as the same
app.disable('strict routing'); // Enable strict routing, by default "/foo" and "/foo/" are treated the same by the router
app.disable('x-powered-by'); // Enables the X-Powered-By: Express HTTP header, enabled by default

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  // Generate a random trace ID
  req._traceId = uuid();
  // Set `x-trace-id` to the response header
  res.setHeader('x-trace-id', req._traceId);
  next();
});

// Define a token function with the given name and callback
morgan.token('trace-id', (req) => _get(req, '_traceId', ''));

// Add `trace-id` to request logs
app.use(morgan(':remote-addr - [:trace-id] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'));

app.use((req, res, next) => {
  require('./routes').default(req, res, next);
});

export default app;

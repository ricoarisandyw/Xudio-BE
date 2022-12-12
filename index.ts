import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import expressWinston from 'express-winston';
import winston from 'winston';
import { ErrorMiddleware } from './middleware/error.middleware';
import router from './routes';
import { AppDataSource } from './src/data-source';

// SETUP ENV
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

// LOGGING
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  // ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));

// LIBRARY
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// app.get('/', (req,res) => res.send('Express + TypeScript Server'));

AppDataSource.initialize().then(() => {
  console.error("Connected to DB")
  app.use('/api' , ErrorMiddleware, router);
}).catch((error) => {
  console.error(error)
  console.error("Failed to interact with DB")
})

app.listen(+PORT, '0.0.0.0', 0, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

export default app;
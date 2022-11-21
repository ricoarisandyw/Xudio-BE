import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import { ErrorMiddleware } from './middleware/error.middleware';
import router from './routes';
import { AppDataSource } from './src/data-source';

// SETUP ENV
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

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
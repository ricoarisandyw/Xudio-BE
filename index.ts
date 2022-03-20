import express from 'express';
import router from './routes';
import cookieParser from 'cookie-parser'

const app = express();
const PORT = process.env.PORT || 80;

// LIBRARY
app.use(express.json());
app.use(cookieParser());

// app.get('/', (req,res) => res.send('Express + TypeScript Server'));

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

export default app;
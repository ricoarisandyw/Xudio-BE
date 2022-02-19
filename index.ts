import express from 'express';
import router from './routes';

const app = express();
const PORT = 8000;

// app.get('/', (req,res) => res.send('Express + TypeScript Server'));

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

export default app;
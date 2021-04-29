import express from 'express';
import loggerMiddleware from './logger';
import analiseRoute from './routes/analise.routes';

const app = express();

app.use(loggerMiddleware);
app.use(express.json({ type: 'application/json' }));
app.use(analiseRoute);

export default app;

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import app from './src/app';
import { logSistema } from './src/logger';

dotenv.config();

const PORT = 5000;
const port = process.env.PORT || PORT;

app.use(express.json({ type: 'application/json' }));
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(port, () => {
  logSistema.debug(`Aplicação executando na porta ${port}`);
});

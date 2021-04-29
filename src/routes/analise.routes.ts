// import router from 'express-promise-router';
import express from 'express';
import analiseSentimento from '../controllers/analise.controller';
import { logAnalise } from '../logger';

// const roteador = router();

const router = express.Router();

try {
  router.get('/analise-sentimento', (req, res) => analiseSentimento(req, res));
} catch (e) {
  logAnalise.fatal(`Erro na request sentimento: ${e}`);
}

export default router;

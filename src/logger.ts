import express from 'express';
import log4js, { LoggingEvent } from 'log4js';

const pegaData = (data: LoggingEvent) => {
  const resp = `[${new Date(data.startTime).toLocaleString('pt-BR')}]`;
  return resp;
};

log4js.configure({
  appenders: {
    sistema: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '%[%x{ln}[%p][%c] %m %]',
        tokens: {
          ln (data) {
            return pegaData(data);
          },
        },
      },
    },
    request: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '%[%x{ln}[%p][%c] %m %]',
        tokens: {
          ln (data) {
            return pegaData(data);
          },
        },
      },
    },
    analise: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '%[%x{ln}[%p][%c] %m %]',
        tokens: {
          ln (data) {
            return pegaData(data);
          },
        },
      },
    },
  },
  categories: {
    default: {
      appenders: ['request'],
      level: 'trace',
    },
  },
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function loggerMiddleware(request: express.Request, _response: express.Response, next: express.NextFunction) {
  log4js.getLogger('request').trace(`${request.method} ${request.path}`);
  next();
}

export const logSistema = log4js.getLogger('sistema');
export const logAnalise = log4js.getLogger('analise');

/*
Debug - ciano
info - verde
error - vermelho
fatal - roxo
trace - azul
*/

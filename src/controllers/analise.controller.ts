import NaturalLanguageUnderstandingV1, {
  DocumentSentimentResults,
  EntitiesResult,
  KeywordsResult,
} from 'ibm-watson/natural-language-understanding/v1';
import { IamAuthenticator } from 'ibm-watson/auth';
import express from 'express';
import dotenv from 'dotenv';
import codes from '../config/statusCodes';
import { logAnalise } from '../logger';

dotenv.config();

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2021-03-25',
  authenticator: new IamAuthenticator({
    apikey: process.env.API_KEY || '',
  }),
  serviceUrl: process.env.SERVER_URL,
});

export default async function analiseSentimento(req: express.Request, res: express.Response): Promise<express.Response<unknown, Record<string, unknown>>> {
  try {
    const { text } = req.body;
    const erroApi = {
      status: false,
      erro: false,
    };

    let response: {
      'textoAnalizado': string,
      'sentimento': DocumentSentimentResults,
      'entidades': EntitiesResult[],
      'palavrasChave': KeywordsResult[],
    };

    const analyzeParams = {
      'language': 'pt',
      'text': text,
      'returnAnalyzedText': true,
      'features': {
        'sentiment': {
          'document': true,
        },
        'entities': {
          'sentiment': true,
          'mentions': true,
        },
        'keywords': {
          'sentiment': true,
        },
      },
    };

    await naturalLanguageUnderstanding.analyze(analyzeParams)
      .then((analysisResults) => {
        // result = JSON.stringify(analysisResults, null, espaco);

        response = {
          'textoAnalizado': analysisResults.result.analyzed_text,
          'sentimento': analysisResults.result.sentiment.document,
          'entidades': analysisResults.result.entities,
          'palavrasChave': analysisResults.result.keywords,
        };
      })
      .catch((error) => {
        erroApi.status = true;
        erroApi.erro = error;
        logAnalise.error(error);
      });

    if (erroApi.status){
      return res.status(codes.BAD_REQUEST).send(erroApi.erro);
    }

    return res.status(codes.OK).send(response);
  } catch (error) {
    return res.status(codes.SERVER_ERROR).send(error);
  }
};

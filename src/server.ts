import cors from 'cors';
import * as fs from 'fs';
import morgan from 'morgan';
import * as http from 'http';
import * as https from 'https';
import config from '@config/index';
import { injectable } from 'inversify';
import logger from '@util/logger/index';
import appRouter from '@services/routes';
import express, { Router } from 'express';
import { errorRequestHandler } from '@libraries/middlewares/error-response.middlewares';

@injectable()
export class MyServer {
  private app: express.Application;

  private port: number;

  private isWin: boolean;

  private routes: Router;

  constructor() {
    this.app = express();
    this.port = Number(config.server.port);
    this.isWin = config.server.os === 'true';
    this.routes = appRouter;
    this.setupMiddlewares();
  }

  private setupMiddlewares() {
    this.app.use(cors());
    this.app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));
    this.app.use(express.json());
    this.app.use('/api', this.routes);
    this.app.use(errorRequestHandler);
  }

  public async run() {
    try {
      const server = await this.createServer();
      server.listen(this.port);
      logger.info(`The server is listening on port ${this.port}`);
    } catch (err) {
      logger.error(`Failed to run server on port ${this.port}`);
      logger.error(`Error: ${JSON.stringify(err)}`);
    }
  }

  private async createServer(): Promise<http.Server | https.Server> {
    if (this.isWin) {
      const httpsOptions = {
        key  : fs.readFileSync(config.server.key_https),
        cert : fs.readFileSync(config.server.cert_https),
      };
      logger.info('Running on https server');
      return https.createServer(httpsOptions, this.app);
    }
    logger.info('Running on http server');
    return http.createServer(this.app);
  }
}

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Context, Handler } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import express from 'express';
import { Server } from 'http';
import { AppModule } from './app.module';

export async function bootstrap() {
  const expressApp = express();

  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);

  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true }));
  app.enableCors();

  await app.init();

  return createServer(expressApp);
}

let cachedServer: Server;

export const handler: Handler = async (event: any, context: Context) => {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }

  return proxy(cachedServer, event, context, 'PROMISE').promise;
};

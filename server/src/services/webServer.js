import express from 'express';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui';
import router from '../routes/index';
import specs from './swagger';

const initWebServer = async () => {
  const app = express();

  dotenv.config();

  app.use(
    express.json(),
    router,
  );

  app.use(
    '/',
    swaggerUI.serve(),
    swaggerUI.setup(specs(), { explorer: true }),
  );

  return app;
};

export default initWebServer;

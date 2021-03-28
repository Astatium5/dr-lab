import express from 'express';
// import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import router from '../routes/index';
import specs from './swagger';

const initWebServer = async () => {
  const app = express();

  app.use(
    express.json(),
    cors(),
    router,
  );

  app.use(
    '/',
    swaggerUI.serve,
  );

  app.get(
    '/',
    swaggerUI.setup(specs(), { explorer: true }),
  );

  return app;
};

export default initWebServer;

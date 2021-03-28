import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import router from '../routes/index';
import specs from './swagger';

const initWebServer = async () => {
  const app = express();

  dotenv.config();

  app.use(
    express.json(),
    cors(),
    router,
  );

  console.log(path.join(path.resolve('../'), 'client', 'build', 'index.html'));

  app.use(express.static(path.join(path.resolve('../'), 'client', 'build')));
  // app.get('/', (req, res) => {
  //   res.sendFile(path.join(path.resolve('../'), 'client', 'build', 'index.html'));
  // });

  app.use(
    '/apidocs',
    swaggerUI.serve,
  );

  app.get(
    '/apidocs',
    swaggerUI.setup(specs(), { explorer: true }),
  );

  return app;
};

export default initWebServer;

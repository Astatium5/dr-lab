import express from 'express';
import dotenv from 'dotenv';
import router from '../routes/index';

const initWebServer = async () => {
  const app = express();

  dotenv.config();

  app.use(
    express.json(),
    router,
  );

  return app;
};

export default initWebServer;

import express from 'express';
import dotenv from 'dotenv';
import router from '../routes/index';
import connectToDB from './firebase';

const intiWebServer = async () => {
  const app = express();

  dotenv.config();

  await connectToDB();

  app.use(
    express.json(),
    router,
  );
};

export default intiWebServer;

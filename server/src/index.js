import initWebServer from './services/webServer';
import logger from './util';

(async function main() {
  const app = await initWebServer();
  const port = 5000;
  app.listen(process.env.PORT || port);

  logger.info('Server running!');
}());

import initWebServer from './services/webServer';
import logger from './util';

(async function main() {
  const app = await initWebServer();
  const port = 3000;
  app.listen(port);

  app.listen(5000);
  logger.info('Server running!');
}());

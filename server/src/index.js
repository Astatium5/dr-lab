import initWebServer from './services/webServer';
import logger from './util';

(async function main() {
  const app = await initWebServer();
  const port = 3000;
  app.listen(port);

  logger.info(`Server running on ${port}!`);
}());

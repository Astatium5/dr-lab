import initWebServer from './services/webServer';
import logger from './util';

(async function main() {
  const app = await initWebServer();

  app.listen(5000);
  logger.info('Server running!');
}());

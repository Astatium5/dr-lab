import initWebServer from './services/webServer';

(async function main() {
  const app = await initWebServer();

  app.listen(5000);
}());

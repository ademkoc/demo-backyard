import { createApp } from './app.ts';
import { config } from './infrastructure/config.ts';

async function startServer () {
  const abortController = new AbortController();
  const app = await createApp();

  try {
    await app.listen({
      host: '0.0.0.0',
      port: config.port,
      signal: abortController.signal,
      listenTextResolver: (address) => {
        return `${config.serviceName} listening at ${address}`;
      }
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }

  process.once('SIGTERM', (signal) => closeServer(signal));
  process.once('SIGINT', (signal) => closeServer(signal));

  const closeServer = (signal:NodeJS.Signals) => {
    app.log.info(`Received signal to close: ${signal}`);
    abortController.abort();
  };
}

startServer();

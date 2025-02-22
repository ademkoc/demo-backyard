import packageJson from '../package.json' with { type: 'json' };
import { createApp } from './app.ts';

async function startServer () {
  const abortController = new AbortController();

  const app = await createApp();

  try {
    await app.listen({
      host: '0.0.0.0',
      port: 3000,
      signal: abortController.signal,
      listenTextResolver: (address) => {
        return `${packageJson.name} listening at ${address}`;
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

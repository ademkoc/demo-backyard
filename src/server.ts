import closeWithGrace from 'close-with-grace';
import packageJson from '../package.json' with { type: 'json' };
import { createApp } from './app.ts';

async function startServer () {
  const app = await createApp();

  closeWithGrace(async function ({ signal, err, manual }) {
    if (err) {
      app.log.error({ err }, 'server closing with error');
    } else {
      app.log.info(`${signal} received, server closing`);
    }
    await app.close();
  });

  try {
    await app.listen({
      host: '0.0.0.0',
      port: 3000,
      listenTextResolver: (address) => {
        return `${packageJson.name} listening at ${address}`;
      }
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

startServer();

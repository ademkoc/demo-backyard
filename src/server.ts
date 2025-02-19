import packageJson from '../package.json' with { type: 'json' };
import { createApp } from './app.ts';

async function startServer () {
  const app = await createApp();

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

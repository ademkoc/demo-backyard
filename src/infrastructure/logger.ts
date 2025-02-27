import pretty from 'pino-pretty';
import pino, { Level } from 'pino';
import { getConfig } from './config.ts';

const redactPaths = [
  'req.headers.authorization',
  'req.headers["upgrade-insecure-requests"]',
  'req.headers.cookie',
  'req.headers.connection',
  'req.headers["accept"]',
  'req.headers["accept-encoding"]',
  'req.headers["accept-language"]',
  'req.headers["sec-fetch-site"]',
  'req.headers["sec-fetch-mode"]',
  'req.headers["sec-fetch-dest"]',
  'req.headers["sec-ch-ua-mobile"]',
  'req.headers["sec-ch-ua"]',
  'req.headers["sec-fetch-user"]',
  'res.headers["x-powered-by"]',
  'res.headers["access-control-allow-credentials"]',
  'res.headers["access-control-allow-origin"]',
  'res.headers["set-cookie"]',
  'res.headers["cookie"]',
  'req.headers["if-none-match"]',
  'req.headers["cache-control"]',
  'res.headers.etag'
];

export function getLogger () {
  const config = getConfig();

  if (config.environment !== 'production') {
    return pino.default(
      pretty({
        sync: true,
        minimumLevel: config.logLevel,
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'hostname,pid'
      })
    );
  }

  return pino.default({
    level: config.logLevel as Level,
    redact: {
      paths: redactPaths,
      remove: true
    }
  });
}

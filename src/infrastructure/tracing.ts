import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION
} from '@opentelemetry/semantic-conventions';
import FastifyOtelInstrumentation from '@fastify/otel';
import { Resource } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { BatchSpanProcessor, AlwaysOnSampler } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
// import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';

const FastifyInstrumentation = FastifyOtelInstrumentation.default;

// diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const resource = Resource.default().merge(
  new Resource({
    [ATTR_SERVICE_NAME]: 'real-demo-app',
    [ATTR_SERVICE_VERSION]: '0.1.0'
  })
);

const traceExporter = new OTLPTraceExporter();

export const otelSdk = new NodeSDK({
  resource,
  traceExporter,
  sampler: new AlwaysOnSampler(),
  spanProcessors: [new BatchSpanProcessor(traceExporter)],
  instrumentations: [
    new FastifyInstrumentation({ servername: 'real-demo-app', registerOnInitialization: true }),
    new HttpInstrumentation({
      ignoreIncomingRequestHook: (req) => {
        return req.url === '/metrics';
      }
    })
  ]
});

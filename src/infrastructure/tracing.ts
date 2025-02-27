import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION
} from '@opentelemetry/semantic-conventions';
import FastifyOtelInstrumentation from '@fastify/otel';
import { Resource } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { BatchSpanProcessor, AlwaysOnSampler } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const FastifyInstrumentation = FastifyOtelInstrumentation.default;

const resource = Resource.default().merge(
  new Resource({
    [ATTR_SERVICE_NAME]: 'real-demo-app',
    [ATTR_SERVICE_VERSION]: '0.1.0'
  })
);

const exporter = new OTLPTraceExporter({
  url: 'localhost:4318',
  headers: { 'content-type': 'application/json' }
});

new NodeTracerProvider({
  resource,
  sampler: new AlwaysOnSampler(),
  spanProcessors: [new BatchSpanProcessor(exporter)]
}).register();

export const otelSdk = new NodeSDK({
  resource,
  instrumentations: [
    new HttpInstrumentation(),
    new FastifyInstrumentation({ servername: 'real-demo-app', registerOnInitialization: true })
  ]
});

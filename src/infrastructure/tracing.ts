import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION
} from '@opentelemetry/semantic-conventions';
import { FastifyOtelInstrumentation } from '@fastify/otel';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { BatchSpanProcessor, AlwaysOnSampler } from '@opentelemetry/sdk-trace-base';
import { MySQL2Instrumentation } from '@opentelemetry/instrumentation-mysql2';
import { UndiciInstrumentation } from '@opentelemetry/instrumentation-undici';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-grpc';
import { config } from './config.ts';
// import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';

// diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const traceExporter = new OTLPTraceExporter();
const metricExporter = new OTLPMetricExporter();

export const otelSdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: config.serviceName,
    [ATTR_SERVICE_VERSION]: config.serviceVersion
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: metricExporter
  }),
  traceExporter,
  sampler: new AlwaysOnSampler(),
  spanProcessors: [new BatchSpanProcessor(traceExporter)],
  instrumentations: [
    new FastifyOtelInstrumentation({ servername: config.serviceName, registerOnInitialization: true }),
    new HttpInstrumentation(),
    new MySQL2Instrumentation({ enabled: true }),
    new UndiciInstrumentation()
  ]
});

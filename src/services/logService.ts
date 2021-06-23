import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
  Sentry.init({
    dsn: "https://9041690b71e54928b9e64fae8a9fd340@o878282.ingest.sentry.io/5829936",
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

function log(error: any) {
  Sentry.captureException(error);
}

const logService = {
  init,
  log,
};

export default logService;

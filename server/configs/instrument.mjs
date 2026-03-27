import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://64d66ea0ae367ac833b5588a7280cec4@o4511059255492608.ingest.us.sentry.io/4511059261784064",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});
const SENTRY_KEY = '123211231321';
const SENTRY_APP = '12345';
export const SENTRY_URL = `https://${SENTRY_KEY}@sentry.io/${SENTRY_APP}`;

export function logException(ex, context) {
  Raven.captureException(ex, {
    extra: context
  });
  /*eslint no-console:0*/
  window && window.console && console.error && console.error(ex);
}

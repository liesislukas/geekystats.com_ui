const SENTRY_KEY = '123211231321';
const SENTRY_APP = '12345';
export const SENTRY_URL = `https://${SENTRY_KEY}@sentry.io/${SENTRY_APP}`;

export const countries = [];
// http://www.countrycallingcodes.com/iso-country-codes/europe-codes.php
countries.push({tld: '.al', iso: 'AL', name: 'Albania'});
countries.push({tld: '.ad', iso: 'AD', name: 'Andorra'});
countries.push({tld: '.at', iso: 'AT', name: 'Austria'});
countries.push({tld: '.by', iso: 'BY', name: 'Belarus'});
countries.push({tld: '.be', iso: 'BE', name: 'Belgium'});
countries.push({tld: '.ba', iso: 'BA', name: 'Bosnia and Herzegovina'});
countries.push({tld: '.bg', iso: 'BG', name: 'Bulgaria'});
countries.push({tld: '.ca', iso: 'CA', name: 'Canada'});
countries.push({tld: '.hr', iso: 'HR', name: 'Croatia'});
countries.push({tld: '.cy', iso: 'CY', name: 'Cyprus'});
countries.push({tld: '.cz', iso: 'CZ', name: 'Czech Republic'});
countries.push({tld: '.dk', iso: 'DK', name: 'Denmark'});
countries.push({tld: '.ee', iso: 'EE', name: 'Estonia'});
// countries.push({tld: '.fo', iso: 'FO', name: 'Faroe Islands'});
countries.push({tld: '.fi', iso: 'FI', name: 'Finland'});
countries.push({tld: '.fr', iso: 'FR', name: 'France'});
countries.push({tld: '.de', iso: 'DE', name: 'Germany'});
// countries.push({tld: '.gi', iso: 'GI', name: 'Gibraltar'});
countries.push({tld: '.gr', iso: 'GR', name: 'Greece'});
countries.push({tld: '.hu', iso: 'HU', name: 'Hungary'});
countries.push({tld: '.is', iso: 'IS', name: 'Iceland'});
countries.push({tld: '.ie', iso: 'IE', name: 'Ireland'});
// countries.push({tld: '.im', iso: 'IM', name: 'Isle of Man'});
countries.push({tld: '.it', iso: 'IT', name: 'Italy'});
countries.push({tld: '.lv', iso: 'LV', name: 'Latvia'});
// countries.push({tld: '.li', iso: 'LI', name: 'Liechtenstein'});
countries.push({tld: '.lt', iso: 'LT', name: 'Lithuania'});
countries.push({tld: '.lu', iso: 'LU', name: 'Luxembourg'});
countries.push({tld: '.mk', iso: 'MK', name: 'Macedonia'});
countries.push({tld: '.mt', iso: 'MT', name: 'Malta'});
countries.push({tld: '.md', iso: 'MD', name: 'Moldova'});
countries.push({tld: '.mc', iso: 'MC', name: 'Monaco'});
// countries.push({tld: '.me', iso: 'ME', name: 'Montenegro'});
countries.push({tld: '.nl', iso: 'NL', name: 'Netherlands'});
countries.push({tld: '.no', iso: 'NO', name: 'Norway'});
countries.push({tld: '.pl', iso: 'PL', name: 'Poland'});
countries.push({tld: '.pt', iso: 'PT', name: 'Portugal'});
countries.push({tld: '.ro', iso: 'RO', name: 'Romania'});
countries.push({tld: '.ru', iso: 'RU', name: 'Russia'});
countries.push({tld: '.sm', iso: 'SM', name: 'San Marino'});
countries.push({tld: '.rs', iso: 'RS', name: 'Serbia'});
countries.push({tld: '.sk', iso: 'SK', name: 'Slovakia'});
countries.push({tld: '.si', iso: 'SI', name: 'Slovenia'});
countries.push({tld: '.es', iso: 'ES', name: 'Spain'});
countries.push({tld: '.se', iso: 'SE', name: 'Sweden'});
countries.push({tld: '.ch', iso: 'CH', name: 'Switzerland'});
countries.push({tld: '.ua', iso: 'UA', name: 'Ukraine'});
countries.push({tld: '.uk', iso: 'GB', name: 'United Kingdom'});
// countries.push({tld: '.va', iso: 'VA', name: 'Vatican city'});
countries.push({tld: '.rs', iso: 'RS', name: 'Yugoslavia'});

export function logException(ex, context) {
  Raven.captureException(ex, {
    extra: context
  });
  /*eslint no-console:0*/
  window && window.console && console.error && console.error(ex);
}

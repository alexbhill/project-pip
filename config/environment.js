/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'property-praxis',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    STREETVIEW_KEY: 'AIzaSyCfdrkECzxMJ_DMIl5mpkmn00TaPYWtKnk',
    DATA_KEY: '1HxwQvvkr8h1RpCdm1S7XQJUXiSGcRbP7_Hr7ixbFct8',
    // DATA_KEY: '1lLxFKw-O4GMkQQ5PGI128BAcU7cvyY33FOWQhyOoDfE',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' https://cdn.mxpnl.com",
      'font-src': "'self' http://fonts.gstatic.com",
      'connect-src': "'self' https://spreadsheets.google.com http://a.tiles.mapbox.com",
      'img-src': "'self' http://a.tiles.mapbox.com http://b.tiles.mapbox.com https://maps.googleapis.com data:",
      'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com",
      'media-src': "'self'"
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    ENV.baseURL = '/';
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.baseURL = '/project-pip/';
  }

  return ENV;
};

/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'property-praxis',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    STREETVIEW_KEY: 'AIzaSyCfdrkECzxMJ_DMIl5mpkmn00TaPYWtKnk',
    MAPBOX_TOKEN: 'pk.eyJ1IjoidWdoaXRzYWFyb24iLCJhIjoiY2lmN3NjeDUyMHp4Z3M0bHpiaWtpOWt5OCJ9.5_jbBjvsJoFcwFoSlhxVkQ',
    MAPBOX_ID: 'ughitsaaron.cif7scvjb0zqas7krsbxgkcv1',
    cartoWorker: 'assets/fetch-carto.js',
    filterWorker: 'assets/filter-array.js',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-eval' https://cdn.mxpnl.com https://*.cartodb.com http://*.cartodb.com http://*.cartocdn.com",
      'font-src': "'self' http://themes.googleusercontent.com http://fonts.gstatic.com",
      'connect-src': "'self' http://*.cartodb.com https://*.cartodb.com",
      'img-src': "'self' http://tile.stamen.com http://*.cartocdn.com https://*.fastly.net https://*.mapbox.com http://cartodb.s3.amazonaws.com http://*.nokia.com https://maps.googleapis.com data:",
      'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com",
      'media-src': "'self'"
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV.baseURL = '/';
  // ENV.APP.LOG_RESOLVER = true;
  // ENV.APP.LOG_ACTIVE_GENERATION = true;
  // ENV.APP.LOG_TRANSITIONS = true;
  // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
  // ENV.APP.LOG_VIEW_LOOKUPS = true;

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  return ENV;
};

/* jshint node: true */

/**
 * NOTE: ** ONLY TOUCH THE PROPERTIES MARKED WITH NOTES **
 *
 * This file can be used to customize forked Property Praxis projects.
 *
 * Strings like 'cartodb_id', 'propaddr', other column names, etc. should
 * only appear here.
 *
 * This file is also used for customizing and managing Ember's build
 * processes. Altering other properties without knowing what you're doing
 * can break the build.
 */

module.exports = function(environment) {
  var ENV = {
    /*––––––––––––––––––––––––––––––––---|
    | NOTE: Replace these six properties |
    | with your own information          |
    –––––––––––––––––––––––––––––––––---*/
    USERNAME: 'ughitsaaron', // your cartodb username
    STREETVIEW_KEY: 'AIzaSyCfdrkECzxMJ_DMIl5mpkmn00TaPYWtKnk', // your google api key for streetview
    TABLE_NAME: 'parcels',
    FIRST_VISIT_PARCEL_ID: 50517, // if you want your project to init
                                  // with a loaded parcel on a user's
                                  // first visit
    INIT_CENTER: [42.3653, -83.0693], // Detroit
    INIT_ZOOM: 14,

    /*––––––––––––––––––––––––––––––––|
    | NOTE: It's best if you rename   |
    | the columns in your Carto table |
    | to conform to these mappings,   |
    | but you can map your columns    |
    | to our keys here                |
    –––––––––––––––––––––––––––––––––*/
    DATA_MAPPINGS: {
      id: 'cartodb_id', // generally don't need to change this
      owner: 'own_id', // name of owner
      alias: 'ownername1', // aliased name of owner, i.e., an llc or company
      address: 'propaddr', // address of property
      zip: 'propzip', // zip of property
      ownerStreet: 'ownerstr', // street address of owner
      ownerCity: 'ownercity', // city of owner
      ownerState: 'ownerstate', // state of owner
      total: 'total_rows', // generally won't need to change this
      layer: 'layer', // key for count layer
      latitude: 'xcoord', // latitude of parcel centeroid
      longitude: 'ycoord' // longitude of parcel centeroid
    },

    // NOTE: DON'T TOUCH THESE
    modulePrefix: 'property-praxis',
    environment: environment,
    baseURL: '/',
    locationType: 'hash',
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

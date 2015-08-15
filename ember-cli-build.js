/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
      includePaths: [
        'bower_components/bourbon/app/assets/stylesheets',
        'bower_components/neat/app/assets/stylesheets'
      ],
      sourceMap: false
    },
    autoprefixer: {
      browsers: ['last 2 ios version'],
      cascade: false
    },
    dotEnv: {
      clientAllowedKeys: ['GOOGLE_STREETVIEW']
    },
    outputPaths: {
      app: {
        js: '/assets/main.js',
        css: {
          'app': '/assets/main.css'
        }
      }
    }
  });

  app.import('bower_components/normalize.css/normalize.css');
  app.import('bower_components/sheetsee/js/sheetsee.js');
  // app.import('bower_components/mapbox.js/mapbox.js');
  app.import('bower_components/sheetsee/css/sss.css');
  app.import('bower_components/tabletop/src/tabletop.js');
  app.import('bower_components/mapbox.js/mapbox.css');
  app.import('bower_components/Leaflet.markercluster/dist/leaflet.markercluster.js');
  app.import('bower_components/Leaflet.markercluster/dist/MarkerCluster.css');
  app.import('bower_components/Leaflet.markercluster/dist/MarkerCluster.Default.css');


  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};

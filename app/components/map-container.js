/**
 * map-container
 * component for handling the Leaflet & cartoDB map
 * base tiles are a leaflet map using tiles from mapbox
 * markers are a separate layer from cartodb
 */
import Ember from 'ember';
import _ from 'npm:lodash';
import ENV from 'property-praxis/config/environment';

export default Ember.Component.extend({
  /**
   * defaultQuery stores the default carto sql query
   * adds column (own_count) for counting the number
   * of properties owned by each owner
   */
  defaultQuery: `select
                  P.*,
                  C.own_count
                from property_praxis P
                  inner join (
                    select own_id,
                    count(own_id) as own_count
                      from property_praxis
                      group by own_id
                  ) C on P.own_id = C.own_id`,

  /**
   * mapProperties & vis stores the map layer and
   * visualization after didInsertElement()
   */
  mapProperties: {},
  vis: {},

  /**
   * activeProperty stores the current property
   * selected by the user
   */
  activeProperty: {},

  /**
   * propertyObserver observes the property
   * value and sets the view on change
   */
  propertyObserver: Ember.observer('activeProperty', function () {
    let map = this.get('mapProperties'),
      activeProperty = this.get('activeProperty'),
      coordinates = activeProperty.geometry && activeProperty.geometry.coordinates.reverse(); // coordinates in geojson are reversed

    if (coordinates) {
      map.setView(coordinates, 16);
    }
  }),

  /**
   * an object containing ranges and hex colors
   * used to construct styles for marker fills
   * based on number of properties owned by each
   * individual speculator
   */
  ranges: {
    small: {
      range: [null, 10],
      color: '#c00'
    },
    medium: {
      range: [10, 50],
      color: '#00c'
    },
    large: {
      range: [50, 100],
      color: '#0c0'
    },
    extraLarge: {
      range: [100, null],
      color: '#0cc'
    }
  },

  /**
   * sql stores the cartoSQL instance
   * TODO: this should probably be stored
   * in an Ember Adapter instead?
   */
  sql: new cartodb.SQL({ user: 'eightbitriot' }),

  /**
   * creates styles for marker fill colors based on an object
   * of ranges and hexcolors
   * @param {Object} ranges
   * @returns {String}
   */
  buildMarkerCategoryFills(ranges) {
    return _.reduce(ranges, (result, key) => {
      let min = key.range[0] || '',
          max = key.range[1] || '',
          minSelector = min && `[own_count > ${min}]`,
          maxSelector = max && `[own_count < ${max}]`;

      return `${result} ${minSelector}${maxSelector} { marker-fill: ${key.color} }\n`
    }, '');
  },

  /**
   * instantiate the leaflet & cartoDB map after
   * the dom element is loaded
   */
  didInsertElement() {

    // map stores the leaflet map object
    let map = new L.Map('map', { zoomControl: false }).setView([42.3653, -83.0693], 12),

      sublayers = [], // will store the carto marker sublayer

      // grab marker fills
      styles = this.get('buildMarkerCategoryFills')(this.get('ranges')),

      layerSource = { // carto layer defs
        user_name: 'eightbitriot',
        type: 'cartodb',
        sublayers: [{
          // initial carto sql query for marker layer
          sql: `${this.get('defaultQuery')}`,

          // set which data to make available through
          // marker interaction
          interactivity: 'cartodb_id, own_id, propaddr',

          // set initial cartocss
          // TODO: different colors for each owner
          cartocss: `#property_praxis {
                      marker-fill-opacity: 0.75;
                      marker-line-color: #efefef;
                      marker-line-width: 1.5;
                      marker-placement: point;
                      marker-width: 13;
                      marker-allow-overlap: true;

                      ${styles}
                    }`
        }]
      };

    // a very weird way of repositioning &
    // instantiating a new Leaflet zoom control
    new L.Control.Zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer(`https://api.tiles.mapbox.com/v4/${ENV.MAPBOX_ID}/{z}/{x}/{y}.png?access_token=${ENV.MAPBOX_TOKEN}`)
      .addTo(map);

    // create the carto marker layer
    cartodb.createLayer(map, layerSource)
      .addTo(map)
      .on('done', (layer) => {
        let sublayer = layer.getSubLayer(0), // get marker layer
          sql = this.get('sql');

        sublayer.setInteraction(true);

        // define cursor behavior on hover over/out
        sublayer.on('featureOver', () => {
          document.querySelector('#map').setAttribute('style', 'cursor: pointer');
        });

        sublayer.on('featureOut', () => {
          document.querySelector('#map').setAttribute('style', 'cursor: default');
        });

        // set the current property when a
        // user clicks on a marker
        sublayer.on('featureClick', (e, latlong, info, data) => {
          sql.execute(`SELECT * FROM property_praxis WHERE cartodb_id = ${data.cartodb_id}`, {}, { format: 'geojson' })
            .done(results => this.set('activeProperty', results.features[0]));
        });

        // store carto marker layer in array
        sublayers.push(sublayer);
      });

    // store map and carto layers
    this.set('mapProperties', map);
    this.set('vis', sublayers);
  },

  /**
   * filterMarkers is an Ember observer that
   * observes user input in the search box. On
   * input, the observer queries carto and
   * sets the carto layer, map bounds, and
   * view.
   */
  filterMarkers: Ember.observer('search', function() {
    let map = this.get('mapProperties'),
      vis = this.get('vis')[0],
      search = this.get('search').toUpperCase(),
      sql = this.get('sql'),

      // set query based on user input
      // if no user input then revert to
      // default query
      q = !!search ?
        `SELECT * FROM property_praxis WHERE
          own_id LIKE '%${search}%' OR
          propaddr LIKE '%${search}%'` :
        `${this.get('defaultQuery')}`;

    vis.setSQL(q);

    // reset map bounds
    sql.getBounds(q)
      .done(bounds => {
        // if query returns only one result than there are
        // no bounds to set. set the view & zoom on result instead
        let isBounds = !!_.difference(bounds[0], bounds[1]).length;

        if (isBounds) {
          map.fitBounds(bounds);
        } else {
          map.setView(bounds[0], 16);
        }
      });
  })
});

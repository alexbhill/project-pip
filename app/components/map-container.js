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
   * standard stores the default carto sql query
   * adds column (own_count) for counting the number
   * of properties owned by each owner
   */
  sqlService: Ember.inject.service('sql'),
  standard: Ember.computed.reads('sqlService.standard'),

  /**
   * mapProperties & sublayers stores the map layer and
   * sublayers after didInsertElement()
   */
  mapProperties: {},

  /**
   * activeProperty stores the current property
   * selected by the user
   */
  activeProperty: {},

  center: [42.3653, -83.0693], // Detroit

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

  css: 'marker-fill-opacity: 0.9;\n'
    + 'marker-line-color: #1f1f1f;\n'
    // + 'marker-line-opacity: 0.85;\n'
    + 'marker-line-width: 1;\n'
    + 'marker-placement: point;\n'
    + 'marker-width: 14;\n'
    + 'marker-allow-overlap: true;',


  /**
   * instantiate the leaflet & cartoDB map after
   * the dom element is loaded
   */
  didInsertElement() {
    // map stores the leaflet map object
    let map = new L.Map('map', { zoomControl: false }).setView(this.get('center'), 12),

      standard = this.get('standard'),
      ranges = this.get('ranges'),
      columns = this.get('sqlService').columns,
      aliases = this.get('sqlService').aliases,
      table = this.get('sqlService').table,
      css = this.get('css'),

      layers = _.map(ranges, range => {
        let value = `${aliases.count}.${columns.count}`,
          re = new RegExp('{{count}}', 'g'),
          query = range.query.replace(re, value);

        return {
          sql: `${standard} GROUP BY ${aliases.property}.${columns.id}, ${aliases.count}.${columns.count} HAVING ${query}`,
          interactivity: `${columns.id}, ${columns.owner}, ${columns.address}`,
          cartocss: `#property_praxis { ${css} marker-fill: ${range.color}; }`
        };
      }),

      layerSource = { // carto layer defs
        user_name: 'eightbitriot',
        type: 'cartodb',
        cartodb_logo: false,
        sublayers: layers
      };

    // a very weird way of repositioning &
    // instantiating a new Leaflet zoom control
    new L.Control.Zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer(`https://api.tiles.mapbox.com/v4/${ENV.MAPBOX_ID}/{z}/{x}/{y}.png?access_token=${ENV.MAPBOX_TOKEN}`)
      .addTo(map);

    // create the carto marker layer
    cartodb.createLayer(map, layerSource)
      .addTo(map)
      .on('done', allLayers => {
        allLayers.layers.forEach((layer, index) => {
          let sublayer = allLayers.getSubLayer(index), // get marker layer
            sql = this.get('sql');

          sublayer.setInteraction(true);

          // define cursor behavior on hover over/out
          sublayer.on('featureOver', () => {
            document.querySelector('#map').setAttribute('style', 'cursor: pointer');
          });

          sublayer.on('featureOut', () => {
            document.querySelector('#map').setAttribute('style', 'cursor: auto');
          });

          // set the current property when a
          // user clicks on a marker
          sublayer.on('featureClick', (e, latlong, info, data) => {
            sql.execute(`SELECT * FROM ${table} WHERE ${columns.id} = ${data.cartodb_id}`, {}, { format: 'geojson' })
              .done(results => this.set('activeProperty', results.features[0]));
          });

          // store carto marker layer in array
          this.send('pushLayer', sublayer);
        });
      });

      // store map and carto layers
      this.set('mapProperties', map);
  },

  actions: {
    // this is pretty hacky
    pushLayer(layer) {
      let sublayers = _.clone(this.get('sublayers'));
      sublayers.push(layer);
      this.set('sublayers', sublayers);
    }
  }
});

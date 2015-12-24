/**
 * map-container
 * component for handling the Leaflet & cartoDB map
 * base tiles are a leaflet map using tiles from mapbox
 * markers are a separate layer from cartodb
 */
import Ember from 'ember';
import _ from 'npm:lodash';
import ENV from 'property-praxis/config/environment';

const log = console.log.bind(console);

export default Ember.Component.extend({
  /**
   * defaultQuery stores the default carto sql query
   * adds column (own_count) for counting the number
   * of properties owned by each owner
   */
  defaultQuery: `select p.*, c.own_count
                 from property_praxis p
                 inner join (
                   select own_id, count(own_id) as own_count
                   from property_praxis
                   group by own_id
                 ) c on p.own_id = c.own_id`,

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

  defaultBounds: [42.3653, -83.0693], // Detroit

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
   * instantiate the leaflet & cartoDB map after
   * the dom element is loaded
   */
  didInsertElement() {
    // map stores the leaflet map object
    let map = new L.Map('map', { zoomControl: false }).setView(this.get('defaultBounds'), 12),

      sublayers = [], // will store the carto marker sublayer

      defaultQuery = this.get('defaultQuery'),
      ranges = this.get('ranges'),

      css = `marker-fill-opacity: 0.75;
             marker-line-color: #a3a3a3;
             marker-line-width: 1.5;
             marker-placement: point;
             marker-width: 13;
             marker-allow-overlap: true;`,

      layers = _.map(ranges, range => {
        let value = 'c.own_count',
          re = new RegExp('{{count}}', 'g'),
          query = range.query.replace(re, value);
          
        return {
          sql: `${defaultQuery} group by p.cartodb_id, c.own_count having ${query}`,
          interactivity: 'cartodb_id, own_id, propaddr',
          cartocss: `#property_praxis { ${css} marker-fill: ${range.color}; }`
        };
      }),

      layerSource = { // carto layer defs
        user_name: 'eightbitriot',
        type: 'cartodb',
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
            document.querySelector('#map').setAttribute('style', 'cursor: default');
          });

          // set the current property when a
          // user clicks on a marker
          sublayer.on('featureClick', (e, latlong, info, data) => {
            sql.execute(`SELECT * FROM property_praxis WHERE cartodb_id = ${data.cartodb_id}`, {}, { format: 'geojson' })
              .done(results => this.set('activeProperty', results.features[0]));
          });

          // store carto marker layer in array
          this.send('pushLayer', sublayer);
        });
      });

      // store map and carto layers
      this.set('mapProperties', map);
  },

  /**
   * filterMarkers is an Ember observer that
   * observes user input in the search box. On
   * input, the observer queries carto and
   * sets the carto layer, map bounds, and
   * view.
   */
  filterMarkers: Ember.observer('search', function() {
    let map = this.get('mapProperties'), // the map class
      sublayers = this.get('sublayers'), // carto marker layers
      search = this.get('search').toUpperCase(), // value of search
      sql = this.get('sql'), // class for sql queries
      defaultQuery = this.get('defaultQuery'), // default sql query 
      ranges = _.filter(this.get('ranges'), { isChecked: true }), // active ranges
      rangeQuery = '', // string of sql queries,
      count = 'c.own_count',
      re = new RegExp('{{count}}', 'g'),
      query = ''; // sql query

      // keep range query as empty string
      // if all layers are still active
      if (ranges.length < 4) {
        rangeQuery = _.reduce(ranges, (result, value, key) => {
          return `${result}${!key ? '' : 'or'} ${value.query}\n`;
        }, 'having').replace(re, count);
      }

      // set query based on user input
      // if no user input then revert to
      // default query
      if(!search) {
        query = defaultQuery;
      } else {
        query = `${defaultQuery}
                where p.own_id like '%${search}%'
                or p.propaddr like '%${search}%'
                group by p.cartodb_id, c.own_count
                ${rangeQuery}`
      }

    // reset map bounds
    sql.getBounds(query)
      .done(bounds => {
        // if query returns only one result than there are
        // no bounds to set. set the view & zoom on result instead
        let isBounds = !!_.difference(bounds[0], bounds[1]).length;

        if (search && isBounds) {
          map.fitBounds(bounds);
        } else if (!search) {
          map.setView(this.get('defaultBounds'), 12);
        } else {
          map.setView(bounds[0], 16);
        }
      });
  }),

  actions: {
    // this is pretty hacky
    pushLayer(layer) {
      let sublayers = _.clone(this.get('sublayers'));
      sublayers.push(layer);
      this.set('sublayers', sublayers);
    }
  }
});

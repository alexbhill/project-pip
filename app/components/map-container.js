import Ember from 'ember';
import _ from 'npm:lodash';
import ENV from 'property-praxis/config/environment';

let prefix = '';

if (ENV.environment === 'production') {
  prefix = '//ughitsaaron.github.io/project-pip/';
}

export default Ember.Component.extend({
  mapProperties: {}, // init map obj

  // init map when component loads
  didInsertElement() {
    let data = this.get('data'),
      optionsJSON = ['address', 'owner'],
      geoJSON = Sheetsee.createGeoJSON(data, optionsJSON),
      map = L.mapbox.map('map', 'examples.map-i86l3621'),
      markerLayer = L.mapbox.markerLayer(geoJSON).addTo(map),
      markerCluster = new L.MarkerClusterGroup();

    map.scrollWheelZoom.disable();

    map.fitBounds(markerLayer.getBounds());

    markerLayer.eachLayer(layer => {
      this.setMarkerStyles(layer);
      markerCluster.addLayer(layer);
    });

    map.addLayer(markerCluster);

    //  This is not a performant solution and should not
    // go out into production like this. This is a
    // temporary fix while the pull request against
    // sheetsee-maps gets looked at, see more here:

    // https://github.com/jlord/sheetsee-maps/pull/9
    map.removeLayer(markerLayer);

    markerCluster.addEventListener('click', e => {
      this.set('setProperty', _.find(this.get('data'), property => property.address === e.layer.feature.opts.address));
    });

    this.mapProperties.map = map;
    this.mapProperties.clusters = markerCluster;
    this.mapProperties.markers = markerLayer;

    return map;
  },

  // set marker layer style
  setMarkerStyles: layer => {
    let owner = _.get(layer, 'feature.opts.owner').toLowerCase();

    layer.setIcon(L.icon({
      iconSize: [34, 36],
      iconUrl: () => {
        switch (owner) {
          case 'moroun':
            return `${prefix}/assets/images/grey-marker.svg`;
          case 'illitch':
            return `${prefix}/assets/images/red-marker.svg`;
          default:
            return `${prefix}/assets/images/grey-marker.svg`;
        }
      }()
    }));
  },

  // set map view when user clicks on search result
  activeProperty: Ember.observer('setProperty', function() {
    let setProperty = this.get('setProperty');

    if (setProperty.lat && setProperty.long) {
      this.mapProperties.map.setView([setProperty.lat, setProperty.long], 18);
    }
  }),

  // filter markers based on user search
  propertyQuery: Ember.observer('query', function() {
    let query = this.get('query').toLowerCase(),
      map = this.mapProperties.map,
      markerCluster = this.mapProperties.clusters,
      markerLayer = this.mapProperties.markers;

    if (query !== '') {
      map.removeLayer(markerCluster);
      markerLayer.setFilter(layer => {
        return layer.opts.address.toLowerCase().indexOf(query) !== -1 ||
          layer.opts.owner.toLowerCase().indexOf(query) !== -1;
      });

      // load new marker layer
      // if query returns results
      if (markerLayer.getLayers().length) {
        markerLayer.eachLayer(layer => this.setMarkerStyles(layer));

        map.addLayer(markerLayer);
        map.fitBounds(markerLayer.getBounds());
      } else {
        // otherwise reset map to original bounds
        map.fitBounds(markerCluster.getBounds());
      }
    }

    if (query === '') {
      markerLayer.clearLayers();
      map.addLayer(markerCluster);
      map.fitBounds(markerCluster.getBounds());
    }

    return query;
  })
});

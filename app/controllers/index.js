import Ember from 'ember';
import ENV from 'property-praxis/config/environment';
import map from 'npm:lodash/map';

const username = ENV.USERNAME,
  table = ENV.TABLE_NAME,
  mappings = ENV.DATA_MAPPINGS;

export default Ember.Controller.extend({
  legendIsToggled: false,

  // array of layer data
  layerService: Ember.inject.service('layers'),
  layers: Ember.computed.reads('layerService.layers'),

  fetchSearchResults: function () {
    const controller = this,
      url = `http://${username}.cartodb.com/api/v2/sql`,
      search = controller.get('search');

    var query = {};

    if (search && search.length > 2) {
      query['q'] = `select * from ${table}\n` +
          `where ${mappings.owner} like '%${search.toUpperCase()}%'\n` +
          `or ${mappings.address} like '%${search.toUpperCase()}%'`;

      this.transitionToRoute('index');

      $.getJSON(url, query).then(function (results) {
        controller.set('results', map(results.rows, mapper));
      });
    }
  },

  /**
   * set results based on search
   * matches either property.address or property.owner
   * @observes search
   */
  searchObserver: function () {
    Ember.run.debounce(this, this.fetchSearchResults, 750);
  }.observes('search'),

  actions: {
    clear() {
      this.set('search', null);
      this.set('results', null);
      this.set('geography', null);
      this.set('names', null);
      this.set('searchIsToggled', false);
      this.transitionToRoute('index');
    },

    toggleLegend() {
      this.toggleProperty('legendIsToggled');
    }
  }
});

function mapper(item) {
  return {
    type: 'parcel', // a string describing the object
    id: item.cartodb_id, // unique id for cartodb
    names: item.own_id.split(','), // name of the owner of this property or the managing LLC
    alias: item.ownername1, // owner or managing llc
    address: item.propaddr, // address of property
    zip: item.propzip, // property zip
    latitude: item.xcoord, // latitude
    longitude: item.ycoord, // longitude
  };
}

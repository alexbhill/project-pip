import Ember from 'ember';
import ENV from 'property-praxis/config/environment';
import map from 'npm:lodash/map';
import words from 'npm:lodash/words';
import difference from 'npm:lodash/difference';
import intersection from 'npm:lodash/intersection';

const username = ENV.USERNAME,
  table = ENV.TABLE_NAME,
  mappings = ENV.DATA_MAPPINGS;

export default Ember.Controller.extend({
  legendIsToggled: false,

  // array of layer data
  layerService: Ember.inject.service('layers'),
  layers: Ember.computed.reads('layerService.layers'),
  mapData: Ember.inject.service(),

  fetchSearchResults: function () {
    const controller = this,
      { mapper } = controller.get('mapData'),
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

  searchObserver: function () {
    // debounce ajax calls on search
    Ember.run.debounce(this, this.fetchSearchResults, 750);
  }.observes('search'),

  // compare difference & intersection between
  // a parcel's `owner` and `alias` to determine
  // if the alias is worth showing, e.g.,
  // owner is 'Manuel Matty Moroun' and alias is
  // 'Crown Enterprise', vs, 'Mouroun, Matty'
  hasAlias: Ember.computed('model.{names,alias}', function () {
    const names = words(this.get('model.names').join(', ')),
      alias = words(this.get('model.alias'));

    return difference(names, alias).length && !intersection(alias, names).length;
  }),

  actions: {
    clear() {
      // clears most user interaction properties
      // and transitions back to index
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

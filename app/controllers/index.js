import Ember from 'ember';
import _ from 'npm:lodash';

export default Ember.Controller.extend({
  legendIsToggled: false,
  searchIsToggled: false,

  layerService: Ember.inject.service('layers'),
  layers: Ember.computed.reads('layerService.layers'),
  sqlService: Ember.inject.service('sql'),
  sql: Ember.computed.reads('sqlService.sql'),

  layerObserver: Ember.observer('layers.@each.visible', function () {
    let sql = this.get('sql'),
      layers = this.get('layers').filterBy('visible'),
      filters = _.size(layers) ? layers.mapBy('sql').reduce(queryReduce()) : '',
      query = this.get('sqlService').default + '\n' + filters;

    sql.execute(query).done(data => this.set('model', data.rows));
  }).on('init'),

  searchObserver: Ember.observer('search', function () {
    let search = this.get('search'),
      model = this.get('model'),
      results = [];

    this.set('results', null);
    this.set('active', null);

    if (_.size(search)) {
      search = search.toUpperCase();
      results = _.take(model.filter(searchMatches(search)), 10);
      this.set('results', results);
    }
  }),

  actions: {
    clearSearch() {
      this.set('search', null);
      this.set('results', null);
      this.set('active', null);
      this.set('geometry', null);
    },

    toggleSearch() {
      this.toggleProperty('searchIsToggled');
    },

    toggleLegend() {
      this.toggleProperty('legendIsToggled');
    }
  }
});

function queryReduce () {
  return function (results, value, index) {
    let query = !index ? value : value.split('where ').pop();

    return results + ' or\n' + query;
  };
}

function searchMatches(search) {
  return function (property) {
    return _.startsWith(property.ownername1.toUpperCase(), search) ||
           _.startsWith(property.propaddr.toUpperCase(), search);
  };
}

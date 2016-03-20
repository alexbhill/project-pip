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
    let controller = this,
      sql = this.get('sql'),
      layers = this.get('layers').filterBy('visible'),
      filters = _.size(layers) ? layers.mapBy('sql').reduce(queryReduce()) : '',
      query = this.get('sqlService').default + '\n' + filters;

    controller.set('isLoading', true);

    sql.execute(query).done(function (data) {
      controller.set('model', data.rows);
      controller.set('isLoading', false);
    });
  }).on('init'),

  searchObserver: Ember.observer('search', function () {
    let search = this.get('search'),
      model = this.get('model'),
      results = [];

    this.set('results', null);
    this.set('activeProperty', null);
    this.set('activeOwner', null);

    if (_.size(search)) {
      search = search.toUpperCase();
      results = _.take(model.filter(searchMatches(search)), 10);
      this.set('results', results);
    }
  }),

  ownerObserver: Ember.observer('activeOwner', function () {
    let controller = this,
      sql = controller.get('sql'),
      owner = controller.get('activeOwner'),
      query = controller.get('sqlService').sqlQueryByOwner;

    if (owner && !_.isEmpty(owner)) {
      controller.set('activeProperty', null);
      controller.set('isLoading', true);

      sql.execute(query(owner))
        .done(function (data) {
          controller.set('results', data.rows);
          controller.set('isLoading', false);
        });
    }
  }),

  actions: {
    clearSearch() {
      this.set('search', null);
      this.set('results', null);
      this.set('activeProperty', null);
      this.set('geometry', null);
      this.set('activeOwner', null);
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
    return _.includes(property.ownername1.toUpperCase(), search) ||
           _.includes(property.propaddr.toUpperCase(), search);
  };
}

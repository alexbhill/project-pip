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
    let layers = this.get('layers').filterBy('visible').mapBy('id'),
      model = this.store.peekAll('property').filter(item => _.includes(layers, item.get('layer')));

    this.set('model', model);
  }).on('init'),

  searchObserver: Ember.observer('search', function () {
    let search = this.get('search'),
      model = this.get('model'),
      results = [];

    this.set('results', null);
    this.set('activeProperty', null);

    if (_.size(search)) {
      search = search.toUpperCase();
      results = _.take(model.filter(searchMatches(search)), 10);
      this.set('results', results);
    }
  }),

  ownerObserver: Ember.observer('activeOwner', observerHandler),
  zipObserver: Ember.observer('activeZip', observerHandler),

  actions: {
    clear() {
      this.set('search', null);
      this.set('results', null);
      this.set('activeProperty', null);
      this.set('activeOwner', null);
      this.set('activeZip', null);
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

function searchMatches(search) {
  return function (property) {
    return _.includes(property.get('owner').toUpperCase(), search);
  };
}

function observerHandler(controller, key) {
  const active = controller.get(key),

    keys = {
      activeZip: 'zip',
      activeOwner: 'owner',
    },

    toggle = {
      activeZip: 'activeOwner',
      activeOwner: 'activeZip'
    },

    results = active && controller.get('model').filterBy(keys[key], active.get(keys[key]));

  if (active && !_.isEmpty(active)) {
    controller.set('activeProperty', null);
    controller.set(toggle[key], null);
    controller.set('results', results);
  }
}

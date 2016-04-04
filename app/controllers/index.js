/**
 * index.js
 * controller for the index route
 * manages chagnes to our model based on
 * user interaction
 */

import Ember from 'ember';
import _ from 'npm:lodash';

export default Ember.Controller.extend({
  legendIsToggled: false,
  searchIsToggled: false,

  // array of layer data
  layerService: Ember.inject.service('layers'),
  layers: Ember.computed.reads('layerService.layers'),

  /**
   * change the data available in our model
   * based on visibility of layers
   * @observes layers.@each.visible
   */
  layerObserver: Ember.observer('layers.@each.visible', function () {
    let layers = this.get('layers').filterBy('visible').mapBy('id'), // e.g. [0, 2, 4]
      model = this.get('model').filter(item => _.includes(layers, _.get(item, 'layer')));

    // set our new model
    this.set('parcels', model);
  }),

  /**
   * set results based on search
   * matches either property.address or property.owner
   * @observes search
   */
  searchObserver: Ember.observer('search', function () {
    const search = this.get('search'),
      model = this.get('parcels'),
      max = 10; // number of results to return

    let results = [];

    if (_.size(search)) {
      // filter the model by calling #searchMatches
      results = _.take(model.filter(searchMatches(search)), max);
    }

    this.set('results', results);
  }),

  propertyObserver: Ember.observer('activeProperty', propertyHandler),

  /**
   * observe changes to activeOwner by calling observerHandler
   * @observes activeOwner
   */
  ownerObserver: Ember.observer('activeOwner', ownerObserverHandler),

  /**
   * observe changes to activeZip by calling observerHandler
   * @observes activeZip
   */
  zipObserver: Ember.observer('activeZip', zipObserverHandler),

  actions: {
    clear() {
      this.set('search', null);
      this.set('activeProperty', null);
      this.set('activeZip', null);
      this.set('activeOwner', null);
      this.set('searchIsToggled', false);
    },

    toggleSearch() {
      this.toggleProperty('searchIsToggled');
    },

    toggleLegend() {
      this.toggleProperty('legendIsToggled');
    }
  }
});

/**
 * match current search value to property's
 * address or owner properties
 * @param {String} search - current search value
 * @return {callback} returns a boolean based on match
 */
function searchMatches(search) {
  search = search.toUpperCase();

  return function (property) {
    return _.includes(_.get(property, 'owner').toUpperCase(), search) || _.includes(_.get(property, 'address').toUpperCase(), search);
  };
}

function propertyHandler(controller, key) {
  if (controller.get(key)) {
    // turn off owner & zip when single property is active
    controller.set('activeOwner', null);
    controller.set('activeZip', null);
  }
}

function ownerObserverHandler(controller, key) {
  const active = controller.get(key);

  let results = [];

  if (active) {
    results = controller.get('model').filterBy('owner', _.get(active, 'owner'));
    controller.set('activeProperty', null); // turn off active property
  }

  controller.set('results', results);
}

/**
 * returns results based on changes to activeZip
 * or activeOwner
 * @param {controller} Ember Controller
 * @param {key} the key being observed
 */
function zipObserverHandler(controller, key) {
  const active = controller.get(key);

  let results = [];

  if (active) {
    results = controller.get('model').filterBy('zip', _.get(active, 'zip'));
    controller.set('activeProperty', null); // turn off active property
  }

  controller.set('results', results);
}

/**
 * index.js
 * controller for the index route
 * manages chagnes to our model based on
 * user interaction
 */

import Ember from 'ember';
import ENV from 'property-praxis/config/environment';
import _ from 'npm:lodash';

export default Ember.Controller.extend({
  legendIsToggled: false,
  searchIsToggled: false,

  // array of layer data
  layerService: Ember.inject.service('layers'),
  layers: Ember.computed.reads('layerService.layers'),

  /**
   * set results based on search
   * matches either property.address or property.owner
   * @observes search
   */
  searchObserver: Ember.observer('search', function () {
    const search = this.get('search'),
      layers = this.get('layers').filterBy('visible').mapBy('id'),
      model = _.filter(this.get('model'), isVisible(layers)),
      max = 10; // number of results to return

    let results = [];

    this.set('activeProperty', null);
    this.set('activeZip', null);
    this.set('activeOwner', null);

    if (_.size(search) && isZip(search)) {
      results = _.take(model.filter(searchByZip(search)));
    } else if (_.size(search) && !isZip(search)) {
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
  ownerObserver: Ember.observer('activeOwner', observerHandler.bind(null,  'owner')),

  /**
   * observe changes to activeZip by calling observerHandler
   * @observes activeZip
   */
  zipObserver: Ember.observer('activeZip', observerHandler.bind(null, 'zip')),

  actions: {
    clear() {
      this.set('search', null);
      this.set('activeProperty', null);
      this.set('activeZip', null);
      this.set('activeOwner', null);
      this.set('searchIsToggled', false);
    },

    setActiveZip(property) {
      this.set('activeZip', property);
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
function searchMatches(search, layers) {
  const match = search.toUpperCase();

  return function (value) {
    const owner = _.get(value, 'owner').join(' ').toUpperCase(),
      property = _.get(value, 'address').toUpperCase();

    return _.includes(owner, match) || _.includes(property, match);
  };
}

function searchByZip(search) {
  return function (value) {
    const zip = _.get(value, 'zip');

    return _.startsWith(String(zip), search);
  };
}

function propertyHandler(controller, key) {
  if (controller.get(key)) {
    // turn off owner & zip when single property is active
    controller.set('activeOwner', null);
    controller.set('activeZip', null);
  }
}

/**
 * handles all observers in controller
 * @param  {string} property   - key being watched
 * @param  {class} controller - this ember controller
 * @param  {string} key
 */
function observerHandler(property, controller, key) {
  const active = controller.get(key),
    worker = new Worker(ENV.filterWorker);

  if (active) {
    worker.postMessage({
      model: controller.get('model'),
      filterBy: property,
      match: _.get(active, property)
    });

    worker.onmessage = function (e) {
      controller.set('results', e.data);
    };

    controller.set('activeProperty', null); // turn off active property
  } else {
    controller.set('results', null);
  }
}

/**
 * search is a zipCode
 * @param  {string|number}  search
 * @return {Boolean}
 */
function isZip(search) {
  const isNumber = _.isNumber(Number(search)), // is not `NaN`
    prefix = String(48), // all detroit zip codes begin with 48
    length = _.size(String(search));

  return isNumber && _.startsWith(String(search), prefix) && length > prefix.length;
}

/**
 * item is in layer marked visible
 * @param  {[]}  layers
 * @return {Boolean}
 */
function isVisible(layers) {
  return function (item) {
    return _.includes(layers, _.get(item, 'layer'));
  };
}

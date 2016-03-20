/**
 * property-details
 * component for handling listing properties
 * during user search
 */
import Ember from 'ember';
import _ from 'npm:lodash';

export default Ember.Component.extend({
  classNames: ['properties-list', 'panel-item'],
  tagName: 'ul',

  formatService: Ember.inject.service('format-detail'),
  propertyService: Ember.inject.service('property'),

  names: Ember.computed('results.[]', function () {
    let results = this.get('results'),
      format = this.get('formatService').format,
      getName = this.get('propertyService').getName;

    return _.map(results, property => format(getName(property)));
  }),

  addresses: Ember.computed('results.[]', function () {
    let results = this.get('results'),
      format = this.get('formatService').format,
      getAddress = this.get('propertyService').getAddress;

    return _.map(results, property => format(getAddress(property)));
  }),

  actions: {
    setActiveProperty(property) {
      this.set('activeProperty', property);
    }
  }
});

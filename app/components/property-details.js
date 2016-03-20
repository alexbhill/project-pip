/**
 * property-details
 * component for handling displaying the details
 * of a property selected by the user
 */
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['property', 'panel-item'],

  propertyService: Ember.inject.service('property'),

  address: Ember.computed('activeProperty', function () {
    let getAddress = this.get('propertyService').getAddress,
      property = this.get('activeProperty');

    return getAddress(property);
  }),

  name: Ember.computed('property', function () {
    let getName = this.get('propertyService').getName,
      property = this.get('activeProperty');

    return getName(property);
  }),

  actions: {
    setActiveOwner(property) {
      this.set('activeOwner', property);
    }
  }
});

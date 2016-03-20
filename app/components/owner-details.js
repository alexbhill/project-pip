import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['owner', 'panel-item'],

  propertyService: Ember.inject.service('property'),

  name: Ember.computed('activeOwner', function () {
    let active = this.get('activeOwner'),
      getName = this.get('propertyService').getName;

    return getName(active);
  }),

  street: Ember.computed('activeOwner', function () {
    let active = this.get('activeOwner'),
      getOwnerStreet = this.get('propertyService').getOwnerStreet;

    return getOwnerStreet(active);
  }),

  city: Ember.computed('activeOwner', function () {
    let active = this.get('activeOwner'),
      getOwnerCity = this.get('propertyService').getOwnerCity;

    return getOwnerCity(active);
  }),

  state: Ember.computed('activeOwner', function () {
    let active = this.get('activeOwner'),
      getOwnerState = this.get('propertyService').getOwnerState;

    return getOwnerState(active);
  }),

  zip: Ember.computed('activeOwner', function () {
    let active = this.get('activeOwner'),
      getZip = this.get('propertyService').getOwnerState;

    return getZip(active);
  })
});

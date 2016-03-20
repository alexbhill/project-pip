import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['owner', 'panel-item'],

  propertyService: Ember.inject.service('property'),

  zip: Ember.computed('activeZip', function () {
    let active = this.get('activeZip'),
      getZip = this.get('propertyService').getZip;

    return getZip(active);
  })
});

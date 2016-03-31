/**
 * property-details
 * component for handling displaying the details
 * of a property selected by the user
 */
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['property', 'panel-item'],

  actions: {
    setActiveOwner(property) {
      this.set('activeOwner', property);
    },

    setActiveZip(property) {
      this.set('activeZip', property);
    }
  }
});

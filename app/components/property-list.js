/**
 * property-details
 * component for handling listing properties
 * during user search
 */
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['properties-list', 'panel-item'],
  tagName: 'ul',

  actions: {
    setActiveProperty(property) {
      this.set('activeProperty', property);
    },

    setActiveZip(property) {
      this.sendAction('clear');
      this.set('activeZip', property);
    }
  }
});

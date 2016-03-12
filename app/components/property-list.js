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
    setActive(property) {
      this.set('active', property);
    }
  }
});

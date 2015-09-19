import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['property', 'panel-item'],
  actions: {
    sendPropertyCoords(property) {
      this.set('activeProperty', property);
      this.set('propertyIsToggled', true);
    }
  }
});

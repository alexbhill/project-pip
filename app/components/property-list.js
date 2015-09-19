import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['properties-list', 'panel-item'],
  tagName: 'ul',
  actions: {
    sendPropertyCoords(property) {
      this.set('activeProperty', property);
      this.set('propertyIsToggled', true);
    }
  }
});

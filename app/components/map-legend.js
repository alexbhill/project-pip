import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['legend'],
  classNameBindings: ['legendIsToggled'],

  actions: {
    toggleLegend() {
      this.toggleProperty('legendIsToggled');
    }
  }
});

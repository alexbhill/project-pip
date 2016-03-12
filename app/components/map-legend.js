import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['legend'],
  classNameBindings: ['legendIsToggled'],

  layerService: Ember.inject.service('layers'),
  layers: Ember.computed.reads('layerService.layers'),

  actions: {
    /**
     * toggleLegend controls legend toggling
     */
    toggleLegend() {
      this.toggleProperty('legendIsToggled');
    }
  }
});

import Ember from 'ember';
import _ from 'npm:lodash';

export default Ember.Component.extend({
  classNames: ['legend'],
  classNameBindings: ['legendIsToggled'],

  change(e) {
    let ranges = this.get('ranges'),
      index = _.findIndex(ranges, { name: e.target.name });

    this.get('sublayers')[index].toggle();
  },

  actions: {
    /**
     * toggleLegend controls legend toggling
     */
    toggleLegend() {
      this.toggleProperty('legendIsToggled');
    }
  }
});

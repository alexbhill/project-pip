import Ember from 'ember';
import _ from 'npm:lodash';

export default Ember.Component.extend({
  classNames: ['legend'],

  change(e) {
    let ranges = this.get('ranges'),
      index = _.findIndex(ranges, { name: e.target.name });

    this.get('sublayers')[index].toggle();
  }
});

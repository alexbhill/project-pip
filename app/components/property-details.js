/**
 * property-details
 * component for handling displaying the details
 * of a property selected by the user
 */
import Ember from 'ember';
import _ from 'npm:lodash';

export default Ember.Component.extend({
  classNames: ['property', 'panel-item', 'property-details'],

  isLLC: Ember.computed('activeProperty', function () {
    const active = this.get('activeProperty'),
      id = _.words(_.get(active, 'owner')),
      alias = _.words(_.get(active, 'alias'));

    return _.difference(id, alias).length && !_.intersection(alias, id).length;
  }),

  actions: {
    setActiveOwner(property) {
      this.set('activeOwner', property);
      ga('send', 'event', 'owner-info', 'click', property.id);
    },

    setActiveZip(property) {
      this.set('activeZip', property);
      ga('send', 'event', 'zip-info', 'click', property.id);
    },

    clear() {
      this.sendAction('clear');
    }
  }
});

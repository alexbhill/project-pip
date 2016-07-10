import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',
  classNames: ['properties-list', 'panel-item'],
  classNameBindings: [
    'hasResults:has-results:no-results',
    'hasSearch:has-search:no-search'
  ],

  hasResults: Ember.computed.notEmpty('results'),

  actions: {
    transition: function(id) {
      this.get('router').transitionTo('index.parcel', id);
    }
  }
});

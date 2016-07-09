import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',
  classNames: ['properties-list', 'panel-item'],
  classNameBindings: [
    'hasResults:has-results:no-results',
    'hasSearch:has-search:no-search'
  ],

  hasResults: Ember.computed.notEmpty('results'),
  hasSearch: Ember.computed.notEmpty('search'),

  showMessage: Ember.computed('hasResults', 'hasSearch', function () {
    return this.get('hasSearch') && !this.get('hasResults');
  })
});

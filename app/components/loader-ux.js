import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['loading-overlay'],
  classNameBindings: ['isLoading'],
  tagName: 'ul'
});

import Ember from 'ember';

export default Ember.Route.extend({
  properties: Ember.inject.service('properties'),
  model() {
    return this.get('properties').fetch()
      .then(results => results);
  }
});

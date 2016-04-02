import Ember from 'ember';
import _ from 'npm:lodash';

export default Ember.Route.extend({
  sqlService: Ember.inject.service('sql'),

  model() {
    const sql = this.get('sqlService'),
      query = sql.prefix + encodeURIComponent(sql.default),
      worker = new Worker('/assets/fetch-carto.js');

    console.log(localStorage.length);

    return new Ember.RSVP.Promise(function (resolve) {
      worker.postMessage(query);

      worker.onmessage = function (e) {
        resolve(e.data);
      };
    });
  },

  afterModel() {
    this.controllerFor('index').set('parcels', this.modelFor('index'));
  }
});

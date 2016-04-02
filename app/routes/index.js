import Ember from 'ember';
import _ from 'npm:lodash';
import ENV from 'property-praxis/config/environment';

export default Ember.Route.extend({
  sqlService: Ember.inject.service('sql'),

  model() {
    const sql = this.get('sqlService'),
      query = sql.prefix + encodeURIComponent(sql.model(sql.fields)),
      worker = new Worker(ENV.cartoWorker);

    return new Ember.RSVP.Promise(function (resolve) {
      // fetch ajax & process data
      // in a web worker
      worker.postMessage(query);

      worker.onmessage = function (e) {
        // resolve the promise when the worker
        // is done
        resolve(e.data);
      };
    });
  },

  afterModel() {
    // always keep `model` clean
    // modify `parcels` in the controller
    // based on active & hidden layers
    this.controllerFor('index').set('parcels', this.modelFor('index'));
  }
});

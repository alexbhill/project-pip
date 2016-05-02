import Ember from 'ember';
import _ from 'npm:lodash';
import ENV from 'property-praxis/config/environment';

export default Ember.Route.extend({
  sqlService: Ember.inject.service('sql'),

  model() {
    const sql = this.get('sqlService'),
      query = sql.prefix + encodeURIComponent(sql.model),
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
  }
});

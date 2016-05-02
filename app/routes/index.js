import Ember from 'ember';
import _ from 'npm:lodash';
import ENV from 'property-praxis/config/environment';

export default Ember.Route.extend({
  sqlService: Ember.inject.service('sql'),

  // don't wait to insert components
  // etc for large model. just load the
  // model in the background
  afterModel() {
    const sql = this.get('sqlService'),
      query = sql.prefix + encodeURIComponent(sql.model),
      worker = new Worker(ENV.cartoWorker),
      controller = this.controllerFor('index');

    // fetch ajax & process data
    // in a web worker
    worker.postMessage(query);

    worker.onmessage = function (e) {
      // resolve the promise when the worker
      // is done
      controller.set('model', e.data);
    };
  }
});

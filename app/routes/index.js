import Ember from 'ember';
import _ from 'npm:lodash';
import ENV from 'property-praxis/config/environment';

const fields = [
  'cartodb_id',
  'count',
  'layer',
  'own_id',
  'ownercity',
  'ownerstate',
  'ownerstr',
  'propaddr',
  'x',
  'y',
  'zipcount'
];

export default Ember.Route.extend({
  sqlService: Ember.inject.service('sql'),

  model() {
    const sql = this.get('sqlService'),
      query = sql.prefix + encodeURIComponent(sql.model(fields)),
      worker = new Worker(ENV.cartoWorker);

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

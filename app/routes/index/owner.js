import Ember from 'ember';
import ENV from 'property-praxis/config/environment';
import map from 'npm:lodash/map';

const username = ENV.USERNAME,
  table = ENV.TABLE_NAME,
  mappings = ENV.DATA_MAPPINGS;

export default Ember.Route.extend({
  controllerName: 'index',
  mapData: Ember.inject.service(),

  model(params) {
    const { mapper } = this.get('mapData'),
      url = `http://${username}.cartodb.com/api/v2/sql`,
      q = `select * from ${table}\n` +
          `where ${mappings.owner} = '${params.name.trim()}'`;

    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.getJSON(url, { q: q }).then(function (results) {
        const data = results.rows[0];

        resolve({
          names: data[mappings.owner].split(', '),
          street: data[mappings.ownerStreet],
          city: data[mappings.ownerCity],
          state: data[mappings.ownerState],
          total: results[mappings.total],
          parcels: map(results.rows, mapper)
        });
      }, function(err) {
        reject(err);
      });
    });
  },

  setupController: function (controller, model) {
    this.controllerFor('index').set('model', model);
    this.controllerFor('index').set('names', model.names);
  }
});

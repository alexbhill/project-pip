import Ember from 'ember';
import ENV from 'property-praxis/config/environment';
import map from 'npm:lodash/map';

const username = ENV.USERNAME,
  table = ENV.TABLE_NAME,
  mappings = ENV.DATA_MAPPINGS;

export default Ember.Route.extend({
  model(params) {
    const url = `http://${username}.cartodb.com/api/v2/sql`,
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

  afterModel(model) {
    const controller = this.controllerFor('index');

    ga('send', 'event', 'owner', undefined, model.names.join(', '));

    controller.set('names', model.names);
    controller.set('results', model.parcels);
    controller.set('geography', null);
  }
});

function mapper(item) {
  return {
    type: 'parcel',
    id: item[mappings.id],
    names: item[mappings.owner].split(','),
    alias: item[mappings.alias],
    address: item[mappings.address],
    zip: item[mappings.zip],
    latitude: item[mappings.latitude],
    longitude: item[mappings.longitude]
  };
}

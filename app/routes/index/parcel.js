import Ember from 'ember';
import map from 'npm:lodash/map';
import ENV from 'property-praxis/config/environment';

const username = ENV.USERNAME,
  table = ENV.TABLE_NAME,
  mappings = ENV.DATA_MAPPINGS;

export default Ember.Route.extend({
  controllerName: 'index',
  
  model(params) {
    const url = `http://${username}.cartodb.com/api/v2/sql`,
      q = `select * from ${table}\n` +
          `where ${mappings.id} = ${params.id}`;

    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.getJSON(url, { q: q }).then(function (results) {
        resolve(map(results.rows, mapper)[0]);
      }, function(err) {
        reject(err);
      });
    });
  },

  setupController: function (controller, model) {
    this.controllerFor('index').set('model', model);
    this.controllerFor('index').set('geometry', [model.longitude, model.latitude]);
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

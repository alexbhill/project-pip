import Ember from 'ember';

export default Ember.Service.extend({
  sql: new cartodb.SQL({
    user: 'eightbitriot' // carto username
  }),

  default: 'select * from speculator_data',

  activeOwner: function (property) {
    return `select * from speculator_data where ownername1 = '${property.get('owner')}'`;
  },

  activeZip: function (property) {
    return `select * from speculator_data where propzip = '${property.get('zip')}'`;
  }
});

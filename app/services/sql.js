import Ember from 'ember';
import _ from 'npm:lodash';

export default Ember.Service.extend({
  sql: new cartodb.SQL({
    user: 'eightbitriot' // carto username
  }),

  default: 'select * from speculator_data',

  sqlQueryByOwner: function (property) {
    const name = _.get(property, 'ownername1');

    return 'select * from speculator_data where ownername1 = \'' + name + '\'';
  },

  sqlQueryByZip: function (property) {
    return 'select * from speculator_data where propzip = \'' + _.get(property, 'propzip') + '\'';
  }
});

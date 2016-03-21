import Ember from 'ember';
import _ from 'npm:lodash';

export default Ember.Service.extend({
  sql: new cartodb.SQL({
    user: 'eightbitriot' // carto username
  }),

  default: 'select * from properties',

  sqlQueryByOwner: function (property) {
    const name = _.get(property, 'ownername1');

    return 'select * from properties where ownername1 = \'' + name + '\'';
  },

  sqlQueryByZip: function (property) {
    return 'select * from properties where propzip = \'' + _.get(property, 'propzip') + '\'';
  }
});

import Ember from 'ember';
import _ from 'npm:lodash';

export default Ember.Service.extend({
  sql: new cartodb.SQL({
    user: 'eightbitriot' // carto username
  }),

  default: 'select properties.*, counter.count\n' +
    'from properties\n' +
    'inner join (select ownername1, count(ownername1) as count from properties group by ownername1) counter on (properties.ownername1 = counter.ownername1)',

  sqlQueryByOwner: function (property) {
    const name = _.get(property, 'ownername1') || _.get(property, 'ownername2');

    return 'select * from properties\n' +
      'where ownername1 = \'' + name + '\'\n' +
      'or ownername2 = \'' + name + '\'';
  },

  sqlQueryByZip: function (property) {
    return 'select * from properties\n' +
      'where propzip = \'' + _.get(property, 'propzip') + '\'';
  }
});

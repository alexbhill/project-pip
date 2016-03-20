import Ember from 'ember';
import _ from 'npm:lodash';

// TODO: explain table here

export default Ember.Service.extend({
  sql: new cartodb.SQL({
    user: 'eightbitriot' // carto username
  }),

  default: 'select properties.*, counter.count\n' +
    'from properties\n' +
    'inner join (select ownername1, count(ownername1) as count from properties group by ownername1) counter on (properties.ownername1 = counter.ownername1)',

  sqlQueryByOwner: function (owner) {
    const name = _.get(owner, 'ownername1') || _.get(owner, 'ownername2');

    return 'select * from properties where ownername1 = \'' + name + '\'';
  }
});

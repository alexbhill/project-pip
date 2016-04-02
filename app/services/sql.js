import Ember from 'ember';
import _ from 'npm:lodash';

export default Ember.Service.extend({
  prefix: 'http://eightbitriot.cartodb.com/api/v2/sql?q=',

  default: 'select * from speculator_data',

  activeOwner: function (property) {
    return `select * from speculator_data where own_id = '${_.get(property, 'owner')}'`;
  },

  activeZip: function (property) {
    return `select * from speculator_data where propzip = '${_.get(property, 'zip')}'`;
  }
});

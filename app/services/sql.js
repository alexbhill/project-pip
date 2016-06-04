import Ember from 'ember';
import _ from 'npm:lodash';
import ENV from 'property-praxis/config/environment';

const fields = ['cartodb_id', 'count', 'layer', 'own_id', 'ownername1', 'ownercity', 'ownerstate', 'ownerstr', 'ownerzip', 'propaddr', 'propzip', 'xcoord', 'ycoord', 'zipcount'],
   table = ENV.TABLE_NAME;

export default Ember.Service.extend({
  prefix: `http://${ENV.USERNAME}.cartodb.com/api/v2/sql?q=`,
  default: `select * from ${table}`,
  model: `select ${fields.join(', ')} from ${table}`,

  activeOwner: function (property) {
    return `select * from ${table} where own_id = '${_.get(property, 'owner')}'`;
  },

  activeZip: function (property) {
    return `select * from ${table} where propzip = '${_.get(property, 'zip')}'`;
  }
});

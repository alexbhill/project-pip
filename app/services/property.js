import Ember from 'ember';
import _ from 'npm:lodash';

export default Ember.Service.extend({
  getId: function (data) {
    return _.get(data, 'cartodb_id');
  },

  getName: function (data) {
    return _.get(data, 'ownername1');
  },

  getAddress: function (data) {
    return _.get(data, 'propaddr');
  },

  getZip: function (data) {
    return _.get(data, 'propzip');
  },

  getLat: function (data) {
    return _.get(data, 'x');
  },

  getLong: function (data) {
    return _.get(data, 'y');
  },

  getOwnerStreet: function (data) {
    return _.get(data, 'ownerstr');
  },

  getOwnerCity: function (data) {
    return _.get(data, 'ownercity');
  },

  getOwnerState: function (data) {
    return _.get(data, 'ownerstate');
  },

  getOwnerZip: function (data) {
    return _.get(data, 'ownerzip');
  },

  getCount: function (data) {
    return _.isArray(data) ? _.size(data) : _.get(data, 'count');
  }
});

import Ember from 'ember';
import _ from 'npm:lodash';

export default Ember.Service.extend({
  getId: function (data) {
    return _.get(data, 'cartodb_id');
  },

  getName: function (data) {
    return _.get(data, 'ownername1') || _.get(data, 'ownername2');
  },

  getAddress: function (data) {
    return _.get(data, 'propaddr');
  },

  getLat: function (data) {
    return _.get(data, 'lat');
  },

  getLong: function (data) {
    return _.get(data, 'long');
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

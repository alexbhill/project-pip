import Ember from 'ember';
import _ from 'npm:lodash';

export function formatDetail(params) {
  let words = _.lowerCase(params.shift()).split(/\s/g);
  return _.map(words, _.capitalize).join(' ');
}

export default Ember.Helper.helper(formatDetail);

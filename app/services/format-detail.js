import Ember from 'ember';
import _ from 'npm:lodash';

export default Ember.Service.extend({
  format: function (str) {
    let words = str.toLowerCase().split(/\s/g);
    return _.map(words, _.capitalize).join(' ');
  }
});

import Ember from 'ember';

export function array(params) {
  var arr = params[0],
    index = params[1];

  return arr[index];
}

export default Ember.Helper.helper(array);

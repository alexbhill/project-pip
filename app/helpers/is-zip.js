import Ember from 'ember';
import _ from 'npm:lodash';

export function isZip(params) {
  const search = _.first(params),
    isNumber = _.isNumber(Number(search)), // is not `NaN`
    prefix = String(48), // all detroit zip codes begin with 48
    length = _.size(String(search));

  return isNumber && _.startsWith(String(search), prefix) && length > prefix.length;
}

export default Ember.Helper.helper(isZip);

import Ember from 'ember';
import _ from 'npm:lodash';

export function formatDetails(params) {
  const words = _.lowerCase(params.shift()).split(/\s/g),
    fmt = _.map(words, _.capitalize).join(' '),
    isLlc = _.endsWith(_.lowerCase(fmt), 'llc');

  if (isLlc) {
    return `${fmt.substring(0, fmt.length - 4)} ${fmt.substring(fmt.length - 4).toUpperCase()}`;
  } else {
    return fmt;
  }
}

export default Ember.Helper.helper(formatDetails);

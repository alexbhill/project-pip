import Ember from 'ember';
import lowerCase from 'npm:lodash/lowerCase';
import capitalize from 'npm:lodash/capitalize';
import map from 'npm:lodash/map';
import endsWith from 'npm:lodash/endsWith';

export function formatDetails(params) {
  const words = lowerCase(params.shift()).split(/\s/g),
    fmt = map(words, capitalize).join(' '),
    isLlc = endsWith(lowerCase(fmt), 'llc');

  if (isLlc) {
    return `${fmt.substring(0, fmt.length - 4)} ${fmt.substring(fmt.length - 4).toUpperCase()}`;
  } else {
    return fmt;
  }
}

export default Ember.Helper.helper(formatDetails);

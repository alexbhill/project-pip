import Ember from 'ember';
import ENV from 'property-praxis/config/environment';

const table = ENV.TABLE_NAME,
  mappings = ENV.DATA_MAPPINGS;

export default Ember.Service.extend({
  default: `#${table} {\n` +
    `\tpolygon-opacity: 0.8;\n` +
    `\tline-width: 2;\n` +
    `\tline-opacity: 1;\n` +
  `}\n` +
  `#${table} [ ${mappings.layer} = 0 ] {\n` +
    `\tpolygon-fill: #008aad;\n` +
    `\tline-color: #004759;\n` +
  `}\n` +
  `#${table} [ ${mappings.layer} = 1 ] {\n` +
    `\tpolygon-fill: #696684;\n` +
    `\tline-color: #464459;\n` +
  `}\n` +
  `#${table} [ ${mappings.layer} = 2 ] {\n` +
    `\tpolygon-fill: #ff935e;\n` +
    `\tline-color: #995838;\n` +
  `}\n` +
  `#${table} [ ${mappings.layer} = 3 ] {\n` +
    `\tpolygon-fill: #ef554a;\n` +
    `\tline-color: #99362F;\n` +
  `}`
});

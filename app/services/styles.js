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
    `\tpolygon-fill: #feedde;\n` +
    `\tline-color: #000;\n` +
  `}\n` +
  `#${table} [ ${mappings.layer} = 1 ] {\n` +
    `\tpolygon-fill: #fdbe85;\n` +
    `\tline-color: #000;\n` +
  `}\n` +
  `#${table} [ ${mappings.layer} = 2 ] {\n` +
    `\tpolygon-fill: #fd8d3c;\n` +
    `\tline-color: #000;\n` +
  `}\n` +
  `#${table} [ ${mappings.layer} = 3 ] {\n` +
    `\tpolygon-fill: #d94701;\n` +
    `\tline-color: #000;\n` +
  `}`
});

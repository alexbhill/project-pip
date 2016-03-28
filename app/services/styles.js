import Ember from 'ember';

export default Ember.Service.extend({
  default: '#speculator_data {\n' +
    '\tpolygon-opacity: 0.8;\n' +
    '\tline-width: 0.5;\n' +
    '\tline-opacity: 0.25;\n' +
  '}\n' +
  '#speculator_data [ count > 100 ][ count <= 381 ] {\n' +
    '\tpolygon-fill: #ff5714;\n' +
  '}\n' +
  '#speculator_data [ count > 57 ][ count <= 100 ] {\n' +
    '\tpolygon-fill: #e8aa14;\n' +
  '}\n' +
  '#speculator_data [ count > 38 ][ count <= 57 ] {\n' +
    '\tpolygon-fill: #e4ff1a;\n' +
  '}\n' +
  '#speculator_data [ count > 19 ][ count <= 38 ] {\n' +
    '\tpolygon-fill: #6eeb83;\n' +
  '}\n' +
  '#speculator_data [ count < 19 ] {\n' +
    '\tpolygon-fill: #1be7ff;\n' +
  '}'
});

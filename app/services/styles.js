import Ember from 'ember';

export default Ember.Service.extend({
  default: '#speculator_data {\n' +
    '\tpolygon-opacity: 0.8;\n' +
    '\tline-width: 0.5;\n' +
    '\tline-opacity: 0.25;\n' +
  '}\n' +
  '#speculator_data [ count >= 500 ] {\n' +
    '\tpolygon-fill: #ff1053;\n' +
  '}\n' +
  '#speculator_data [ count >= 250 ][ count < 500 ] {\n' +
    '\tpolygon-fill: #ff5714;\n' +
  '}\n' +
  '#speculator_data [ count >= 100 ][ count < 250 ] {\n' +
    '\tpolygon-fill: #6c6ea0;\n' +
  '}\n' +
  '#speculator_data [ count >= 50 ][ count < 100 ] {\n' +
    '\tpolygon-fill: #e4ff1a;\n' +
  '}\n' +
  '#speculator_data [ count >= 15 ][ count < 50 ] {\n' +
    '\tpolygon-fill: #6eeb83;\n' +
  '}\n' +
  '#speculator_data [ count < 15 ] {\n' +
    '\tpolygon-fill: #1be7ff;\n' +
  '}'
});

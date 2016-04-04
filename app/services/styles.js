import Ember from 'ember';

export default Ember.Service.extend({
  default: '#speculator_data {\n' +
    '\tpolygon-opacity: 0.8;\n' +
    '\tline-width: 0.5;\n' +
    '\tline-opacity: 0.25;\n' +
  '}\n' +
  '#speculator_data [ layer = 6 ] {\n' +
    '\tpolygon-fill: #111;\n' +
  '}\n' +
  '#speculator_data [ layer = 5 ] {\n' +
    '\tpolygon-fill: #ff1053;\n' +
  '}\n' +
  '#speculator_data [ layer = 4 ] {\n' +
    '\tpolygon-fill: #ff5714;\n' +
  '}\n' +
  '#speculator_data [ layer = 3 ] {\n' +
    '\tpolygon-fill: #6c6ea0;\n' +
  '}\n' +
  '#speculator_data [ layer = 2 ] {\n' +
    '\tpolygon-fill: #e4ff1a;\n' +
  '}\n' +
  '#speculator_data [ layer = 1 ] {\n' +
    '\tpolygon-fill: #6eeb83;\n' +
  '}\n' +
  '#speculator_data [ layer = 0 ] {\n' +
    '\tpolygon-fill: #1be7ff;\n' +
  '}'
});

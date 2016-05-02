import Ember from 'ember';

export default Ember.Service.extend({
  default: '#parcels {\n' +
    '\tpolygon-opacity: 0.8;\n' +
    '\tline-width: 0.5;\n' +
    '\tline-opacity: 0.25;\n' +
  '}\n' +
  '#parcels [ layer = 0 ] {\n' +
    '\tpolygon-fill: #008aad;\n' +
  '}\n' +
  '#parcels [ layer = 1 ] {\n' +
    '\tpolygon-fill: #696684;\n' +
  '}\n' +
  '#parcels [ layer = 2 ] {\n' +
    '\tpolygon-fill: #ff935e;\n' +
  '}\n' +
  '#parcels [ layer = 3 ] {\n' +
    '\tpolygon-fill: #ef554a;\n' +
  '}'
});

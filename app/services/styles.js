import Ember from 'ember';

export default Ember.Service.extend({
  default: '#parcels {\n' +
    '\tpolygon-opacity: 0.8;\n' +
    '\tline-width: 0.5;\n' +
    '\tline-opacity: 0.65;\n' +
  '}\n' +
  '#parcels [ layer = 0 ] {\n' +
    '\tpolygon-fill: #008aad;\n' +
    '\tline-color: #004759;\n' +
  '}\n' +
  '#parcels [ layer = 1 ] {\n' +
    '\tpolygon-fill: #696684;\n' +
    '\tline-color: #464459;\n' +
  '}\n' +
  '#parcels [ layer = 2 ] {\n' +
    '\tpolygon-fill: #ff935e;\n' +
    '\tline-color: #995838;\n' +
  '}\n' +
  '#parcels [ layer = 3 ] {\n' +
    '\tpolygon-fill: #ef554a;\n' +
    '\tline-color: #99362F;\n' +
  '}\n' +
  '#parcels [ zoom < 15 ] {\n' +
    '\tline-width: 8;\n' +
  '}'
});

import Ember from 'ember';

export default Ember.Service.extend({
  layers: [{
      sql: 'where count <= 10',
      color: '#1be7ff',
      description: '< 10',
      visible: true
    }, {
      sql: 'where count > 10 and count <= 50',
      color: '#6eeb83',
      description: '10 – 50',
      visible: true
    }, {
      sql: 'where count > 50 and count <=150',
      color: '#e4ff1a',
      description: '50 – 150',
      visible: true
    }, {
      sql: 'where count > 150 and count <= 300',
      color: '#e8aa14',
      description: '150 – 300',
      visible: true
    }, {
      sql: 'where count > 300',
      color: '#ff5714',
      description: '300 >',
      visible: true
    }]
});

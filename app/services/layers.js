import Ember from 'ember';

export default Ember.Service.extend({
  layers: [{
      sql: 'where count <= 19',
      color: '#1be7ff',
      description: '< 19',
      visible: true
    }, {
      sql: 'where count > 19 and count <= 38',
      color: '#6eeb83',
      description: '19 – 38',
      visible: true
    }, {
      sql: 'where count > 38 and count <= 57',
      color: '#e4ff1a',
      description: '38 – 57',
      visible: true
    }, {
      sql: 'where count > 57 and count <= 100',
      color: '#e8aa14',
      description: '57 – 100',
      visible: true
    }, {
      sql: 'where count > 100',
      color: '#ff5714',
      description: '100 >',
      visible: true
    }]
});

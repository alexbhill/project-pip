import Ember from 'ember';

export default Ember.Service.extend({
  layers: [{
      id: 0,
      color: '#1be7ff',
      description: '< 19',
      visible: true
    }, {
      id: 1,
      color: '#6eeb83',
      description: '19 – 38',
      visible: true
    }, {
      id: 2,
      color: '#e4ff1a',
      description: '38 – 57',
      visible: true
    }, {
      id: 3,
      color: '#e8aa14',
      description: '57 – 100',
      visible: true
    }, {
      id: 4,
      color: '#ff5714',
      description: '100 >',
      visible: true
    }]
});

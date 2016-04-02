import Ember from 'ember';

export default Ember.Service.extend({
  layers: [{
      id: 0,
      color: '#1be7ff',
      description: '< 15',
      visible: true
    }, {
      id: 1,
      color: '#6eeb83',
      description: '15 – 30',
      visible: true
    }, {
      id: 2,
      color: '#e4ff1a',
      description: '30 – 65',
      visible: true
    }, {
      id: 3,
      color: '#6c6ea0',
      description: '65 – 175',
      visible: true
    }, {
      id: 4,
      color: '#ff5714',
      description: '175 > 350',
      visible: true
    }, {
      id: 5,
      color: '#ff1053',
      description: '350 > ',
      visible: true
    }]
});

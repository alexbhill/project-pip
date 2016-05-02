import Ember from 'ember';

export default Ember.Service.extend({
  layers: [{
      id: 0,
      color: '#008aad',
      description: '< 50',
      visible: true
    }, {
      id: 1,
      color: '#696684',
      description: '50 – 250',
      visible: true
    }, {
      id: 2,
      color: '#ff935e',
      description: '250 – 500',
      visible: true
    }, {
      id: 3,
      color: '#ef554a',
      description: '>= 500',
      visible: true
    }]
});

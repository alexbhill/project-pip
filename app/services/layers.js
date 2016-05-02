import Ember from 'ember';

export default Ember.Service.extend({
  layers: [{
      id: 0,
      color: '#008aad',
      description: '< 15',
      visible: true
    }, {
      id: 1,
      color: '#696684',
      description: '15–50',
      visible: true
    }, {
      id: 2,
      color: '#ff935e',
      description: '50–100',
      visible: true
    }, {
      id: 3,
      color: '#ff695e',
      description: '100–250',
      visible: true
    }]
});

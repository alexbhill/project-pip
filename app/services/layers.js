import Ember from 'ember';

export default Ember.Service.extend({
  layers: [{
      id: 0,
      color: '#feedde',
      description: '< 50',
      visible: true
    }, {
      id: 1,
      color: '#fdbe85',
      description: '50 – 250',
      visible: true
    }, {
      id: 2,
      color: '#fd8d3c',
      description: '250 – 500',
      visible: true
    }, {
      id: 3,
      color: '#d94701',
      description: '>= 500',
      visible: true
    }]
});

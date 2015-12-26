import Ember from 'ember';

export default Ember.Service.extend({
  min: 0,
  max: Infinity,
  
  /**
   * an object containing ranges and hex colors
   * used to construct styles for marker fills
   * based on number of properties owned by each
   * individual speculator
   */
  ranges: {
    small: {
      max: 10,
      color: '#c00',
      isChecked: true
    },
    medium: {
      min: 11,
      max: 50,
      color: '#00c',
      isChecked: true
    },
    large: {
      min: 51,
      max: 100,
      color: '#0c0',
      isChecked: true
    },
    'extra-large': {
      min: 101,
      color: '#0cc',
      isChecked: true
    }
  }
});

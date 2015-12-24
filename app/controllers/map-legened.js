import Ember from 'ember';

export default Ember.Controller.extend({
  /**
   * an object containing ranges and hex colors
   * used to construct styles for marker fills
   * based on number of properties owned by each
   * individual speculator
   */
  ranges: [
    {
      name: 'small',
      max: 10,
      color: '#c00',
      isChecked: false
    },
    {
      name: 'medium',
      min: 11,
      max: 50,
      color: '#00c',
      isChecked: false
    },
    {
      name: 'large',
      min: 51,
      max: 100,
      color: '#0c0',
      isChecked: false
    },
    {
      name: 'extra-large',
      min: 101,
      color: '#0cc',
      isChecked: false
    }
  ]
});

import Ember from 'ember';

export default Ember.Service.extend({
  ranges: [
    {
      name: 'small',
      query: '{{count}} <= 10',
      color: '#e58f65',
      label: "< 10",
      isChecked: true
    },

    {
      name: 'medium',
      query: '{{count}} > 10 and {{count}} <= 50',
      color: '#ff9f1c',
      label: "11 – 50",
      isChecked: true
    },

    {
      name: 'large',
      query: '{{count}} > 50 and {{count}} <= 100',
      color: '#d05353',
      label: "51 – 100",
      isChecked: true
    },

    {
      name: 'extra-large',
      query: '{{count}} > 100',
      color: '#fb4b4e',
      label: "100 >",
      isChecked: true
    }
  ]
});

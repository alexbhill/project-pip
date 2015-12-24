import Ember from 'ember';

export default Ember.Service.extend({
  ranges: [
    {
      name: 'small',
      query: '{{count}} <= 10',
      color: '#30d18e',
      label: "< 10",
      isChecked: true
    }, {
      name: 'medium',
      query: '{{count}} > 10 and {{count}} <= 50',
      color: '#a6d130',
      label: "11 – 50",
      isChecked: true
    }, {
      name: 'large',
      query: '{{count}} > 50 and {{count}} <= 100',
      color: '#f7e43d',
      label: "51 – 100",
      isChecked: true
    }, {
      name: 'extra-large',
      query: '{{count}} > 100',
      color: '#c9b220',
      label: "100 >",
      isChecked: true
    }
  ]
});

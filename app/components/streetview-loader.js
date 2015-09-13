import Ember from 'ember';

export default Ember.Component.extend({
  src: '',
  alt: '',
  activeProperty: {},
  classNames: ['streetview'],
  classNameBindings: ['isLoaded'],
  isLoaded: false,

  handleLoad: Ember.observer('activeProperty', function() {
    this.set('isLoaded', false);
    this.$().children('img').one('load', () => {
      this.set('isLoaded', true);
    });
  })
});

import Ember from 'ember';
import ENV from 'property-praxis/config/environment';

export default Ember.Component.extend({
  src: '',
  alt: '',

  classNames: ['streetview'],
  classNameBindings: ['isLoaded'],
  isLoaded: false,

  /**
   * coordinates stores the coordinates of the
   * current active property
   */
  coordinates: [],

  /**
   * setSrc observes coordinates and sets src on change
   */
  setSrc: Ember.observer('coordinates', function () {
    let coordinates = this.get('coordinates');

    if (coordinates) {
      coordinates = coordinates.join(','); // convert coordinates array to string
      this.set('src', `https://maps.googleapis.com/maps/api/streetview?size=640x640&pitch=0&location=${coordinates}&pitch=10&key=${ENV.STREETVIEW_KEY}`);
    } else {
      // if coordinates is empty reset src to empty string
      this.set('src', '');
    }
  }),

  /**
   * handleLoad also observes coordinates. on change
   * listen once for a load event on the image and
   * toggle isLoaded
   */
  handleLoad: Ember.observer('coordinates', function() {
    this.set('isLoaded', false); // re-init isLoaded to false on change
    this.$().children('img').one('load', () => {
      this.set('isLoaded', true);
    });
  })
});

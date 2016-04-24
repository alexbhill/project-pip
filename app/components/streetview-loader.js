import Ember from 'ember';
import ENV from 'property-praxis/config/environment';
import _ from 'npm:lodash';

export default Ember.Component.extend({
  src: null,
  alt: null,
  href: null,

  classNames: ['streetview', 'panel-item'],
  classNameBindings: ['isLoaded'],
  isLoaded: false,

  activeObserver: Ember.observer('activeProperty', function () {
    let active = this.get('activeProperty'),
      coordinates = active && [_.get(active, 'longitude'), _.get(active, 'latitude')];

    if (_.size(coordinates) && _.every(coordinates, _.isNumber)) {
      this.set('src', setSrc(coordinates));
      this.set('href', setHref(coordinates));
    } else {
      this.set('src', null);
      this.set('href', null);
    }
  }),

  /**
   * handleLoad also observes coordinates. on change
   * listen once for a load event on the image and
   * toggle isLoaded
   */
  handleLoad: Ember.observer('activeProperty', function(controller) {
    this.set('isLoaded', false); // re-init isLoaded to false on change

    this.$().find('img').one('load', function() {
      controller.set('isLoaded', true);
    });
  })
});

function setSrc(coordinates) {
  return `https://maps.googleapis.com/maps/api/streetview?size=640x640&location=${coordinates.join(',')}&pitch=10&key=${ENV.STREETVIEW_KEY}`;
}

function setHref(coordinates) {
  return `http://maps.google.com/?cbll=${coordinates.join(',')}&layer=c`;
}

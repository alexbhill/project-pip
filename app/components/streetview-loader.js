import Ember from 'ember';
import ENV from 'property-praxis/config/environment';

export default Ember.Component.extend({
  src: null,
  alt: null,
  href: null,

  classNames: ['streetview', 'panel-item'],
  classNameBindings: ['isLoaded'],
  isLoaded: false,

  loadStreetView: function () {
    const controller = this,
      geometry = controller.get('geometry'),
      img = controller.$().find('img');

    controller.set('isLoaded', false); // isLoaded to false on change
    controller.set('href', setHref(geometry));

    if (window.getComputedStyle(img[0]).display !== 'none') {
      controller.set('src', setSrc(geometry));

      img.one('load', function () {
        controller.set('isLoaded', true);
      });
    }
  },

  didRender() {
    Ember.run.scheduleOnce('afterRender', this, 'loadStreetView');
  }
});

function setSrc(geometry) {
  if (geometry) {
    return `https://maps.googleapis.com/maps/api/streetview?size=640x640&location=${geometry.join(',')}&pitch=10&key=${ENV.STREETVIEW_KEY}`;
  }
}

function setHref(geometry) {
  if (geometry) {
    return `http://maps.google.com/?cbll=${geometry.join(',')}&layer=c`;
  }
}

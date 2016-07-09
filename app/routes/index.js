import Ember from 'ember';
import ENV from 'property-praxis/config/environment';

export default Ember.Route.extend({
  afterModel() {
    const visited = localStorage.getItem('visited') || false,
      controller = this.controllerFor('index');

    if (!visited) {
      // on a user's first visit
      controller.set('legendIsToggled', true);
      controller.transitionToRoute('index.parcel', ENV.FIRST_VISIT_PARCEL_ID);
    }

    localStorage.setItem('visited', true);
  }
});

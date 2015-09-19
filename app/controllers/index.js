import Ember from 'ember';
import _ from 'npm:lodash';

export default Ember.Controller.extend({
  menuIsToggled: false,
  searchIsToggled: false,
  activeProperty: {},
  isSmallViewport: () => window.matchMedia(`(max-width: ${599.9/16}rem)`).matches,
  filteredResults: function() {
    let query = this.get('propertiesQuery').toLowerCase(),
      properties = _.sortByAll(_.filter(this.get('model'), property => {
        return property.address.toLowerCase().indexOf(query) !== -1 ||
          property.owner.toLowerCase().indexOf(query) !== -1;
      }), ['lat', 'long']);

    return !!query ? properties : [];
  }.property('propertiesQuery', 'activeProperty'),
  panelIsToggled: function() {
    let activeProperty = this.get('activeProperty'),
      filteredResults = this.get('filteredResults');

    if (activeProperty.address || filteredResults.length) {
      return true;
    } else {
      return false;
    }
  }.property('activeProperty', 'filteredResults'),
  propertiesQuery: '',
  autoFocuser: Ember.observer('searchIsToggled', function() {
    let searchIsToggled = this.get('searchIsToggled');

    if (searchIsToggled) {
      Ember.$('.search input').focus();
    }
  }),
  actions: {
    clearSearch() {
      this.set('activeProperty', {});
      this.set('propertiesQuery', '');
    },

    toggleHandler(target) {
      // sends clear search action to controller
      if (target === 'searchIsToggled') {
        this.send('clearSearch');
      }

      this.toggleProperty(target);
    }
  }
});

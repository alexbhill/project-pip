import Ember from 'ember';
import _ from 'npm:lodash';

export default Ember.Controller.extend({
  activeProperty: {},

  filteredResults: function() {
    let query = this.get('propertiesQuery').toLowerCase(),
      activeProperty = this.get('activeProperty'),
      properties = _.filter(this.get('model'), property => {
        return property.address.toLowerCase().indexOf(query) !== -1 ||
          property.owner.toLowerCase().indexOf(query) !== -1;
      });

    return !!query && !activeProperty.address ? properties : [];
  }.property('propertiesQuery', 'activeProperty'),

  menuIsToggled: false,

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

  searchIsToggled: false,

  actions: {
    clearSearch(isCloseButton) {
      if (isCloseButton) {
        this.set('activeProperty', {});
        this.set('propertiesQuery', '');
      }
    },

    sendPropertyCoords(property) {
      this.set('activeProperty', property);
      this.set('propertyIsToggled', true);
    },

    toggleHandler(target) {
      // sends clear search action to controller
      if (target === 'searchIsToggled') {
        this.send('clearSearch', true);
      }

      this.toggleProperty(target);
    }
  }
});

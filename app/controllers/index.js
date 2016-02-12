/**
 * index controller
 * controller for index, handles ui toggles
 * for menu and search as well as the
 * interactions between the map, search,
 * details, and list components
 */

import Ember from 'ember';
// import _ from 'npm:lodash';

export default Ember.Controller.extend({

  legendIsToggled: false,
  searchIsToggled: false,

  // give search, properties, and current property
  // initial empty values
  search: '', // contains user search value
  properties: [], // contains array of properties returned by search
  activeProperty: {}, // contains data of current user selected property,

  sublayers: [], // for exchanging layer information between components

  rangeService: Ember.inject.service('ranges'),
  ranges: Ember.computed.reads('rangeService.ranges'),

  /**
   * sql stores the cartoSQL instance
   * TODO: this should probably be stored
   * in an Ember Adapter instead?
   */
  sqlService: Ember.inject.service('sql'),
  sql: Ember.computed.reads('sqlService.sql'),

  /**
   * propertiesObserver observes the search field
   * and queries carto sql according to search. It
   * requests back geojson matching the search and
   * then sets the properties array with the
   * features returned. if the search box is empty
   * then properties is cleared of any previous
   * values.
   */
  propertiesObserver: Ember.observer('search', function () {
    let search = this.get('search').toUpperCase(),
      sql = this.get('sql'),
      // ranges = _.filter(this.get('ranges'), { isChecked: true }), // active ranges,
      // rangeQuery = '', // string of sql queries,
      // count = 'c.own_count',
      // re = new RegExp('{{count}}', 'g'),

      query = `select * from property_praxis
              where own_id like '%${search}%'
              or propaddr like '%${search}%'`;

    if (search) {
      if (this.get('activeProperty.properties')) {
        this.set('activeProperty', {});
      }

      sql.execute(query, {}, { format: 'geojson' })
        .done(properties => {
          this.set('properties', properties.features);
        });
    } else if (!search && this.get('properties.length')) {
      // clear properties array of previous value
      this.set('properties', []);
    }
  }),

  actions: {
    /**
     * clearSearch clears the search, properties,
     * and active property values
     */
    clearSearch() {
      this.set('search', '');
      this.set('properties', []);
      this.set('activeProperty', {});
    },

    /**
     * toggleSearch controls search toggle for
     * users on small screens. if search has value
     * on toggle, clear the search, properties, and
     * activeproperty values
     */
    toggleSearch() {
      this.toggleProperty('searchIsToggled');

      if (this.get('search')) {
        this.send('clearSearch');
      }
    },

    /**
     * toggleLegend controls legend toggling
     */
    toggleLegend() {
      this.toggleProperty('legendIsToggled');
    }
  }
});

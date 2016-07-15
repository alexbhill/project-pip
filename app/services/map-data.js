import Ember from 'ember';
import ENV from 'property-praxis/config/environment';

const mappings = ENV.DATA_MAPPINGS;

export default Ember.Service.extend({
  mapper: function mapper(item) {
    return {
      type: 'parcel',
      id: item[mappings.id],
      names: item[mappings.owner].split(','),
      alias: item[mappings.alias],
      address: item[mappings.address],
      zip: item[mappings.zip],
      latitude: item[mappings.latitude],
      longitude: item[mappings.longitude]
    };
  }
});

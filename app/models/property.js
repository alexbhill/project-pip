import DS from 'ember-data';

export default DS.Model.extend({
  owner: DS.attr('string'),
  address: DS.attr('string'),
  zip: DS.attr('number'),
  latitude: DS.attr('number'),
  longitude: DS.attr('number'),
  ownerStreet: DS.attr('string'),
  ownerCity: DS.attr('string'),
  ownerState: DS.attr('string'),
  ownerZip: DS.attr('number'),
  count: DS.attr('number'),
  zipCount: DS.attr('number'),
  layer: DS.attr('number'),
  active: DS.attr('boolean', { defaultValue: false })
});

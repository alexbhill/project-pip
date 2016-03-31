import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  primaryKey: 'cartodb_id',
  normalizeFindAllResponse(store, primaryModelClass, payload) {
    return { data: payload.map(mapPayload) };
  }
});

function mapPayload(item) {
  return {
    id: parseInt(item.cartodb_id),
    type: 'property',
    attributes: {
      owner: item.ownername1 || item.ownername2,
      address: item.propaddr,
      zip: item.propzip,
      latitude: item.x,
      longitude: item.y,
      ownerStreet: item.ownerstr,
      ownerCity: item.ownercity,
      ownerState: item.ownerstate,
      ownerZip: item.ownerzip,
      count: item.count,
      zipCount: item.zipcount,
      layer: item.layer
    }
  };
}

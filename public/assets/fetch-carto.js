onmessage = function(e) {
  fetch(e.data)
  .then(function (response) {
    return response.json();
  }).then(function (data) {
    postMessage(data.rows.map(mapPayload));
  })
}

function mapPayload(item) {
  return {
    id: parseInt(item.cartodb_id),
    type: 'property',
    owner: item.own_id,
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
  };
}

/* jshint worker: true */
var scope = this;

onmessage = function(e) {
  getJSON(e.data, function (data) {
    var response = JSON.parse(data);
    postMessage(response.rows.map(mapPayload));
  });
};

// see notes in sql service
// regarding our carto table
// columns for descriptions
function mapPayload(item) {
  return {
    id: parseInt(item.cartodb_id),
    type: 'property',
    owner: getOwnerName(item),
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
    layer: item.layer,
    isActive: false
  };
}

function getJSON(url, cb) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.send(null);

  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      if (request.status === 200) {
        cb(request.responseText);
      }
    }
  };
}

function getOwnerName(item) {
  return item.own_id === 'UNIDENTIFIED'
    ? item.ownername1
    : item.own_id
}

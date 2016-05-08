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
    owner: item.own_id.split(','),
    address: item.propaddr,
    zip: item.propzip,
    latitude: item.xcoord,
    longitude: item.ycoord,
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

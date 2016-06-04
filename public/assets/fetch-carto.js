/* jshint worker: true */
var scope = this;

onmessage = function(e) {
  getJSON(e.data, function (data) {
    var response = JSON.parse(data);
    postMessage(response.rows.map(mapPayload));
  });
};

function mapPayload(item) {
  /*
  * Additional data used by CartoDB in table
  * the_geom - geometric data for cartodb
  * shape_star - parcel shape data
  * shape_stle - parcel shape data
  * the_geom_webmercator - parcel shape data for carto
  */

  return {
    /*––––––––––––––––––––––––––––––––––––|
    | NOTE:                               |
    | You can customize the values here   |
    | to match your data if necessary.    |
    –––––––––––––––––––––––––––––––––––––*/
    id: parseInt(item.cartodb_id), // unique id for cartodb
    type: 'property', // a string describing the object
    owner: item.own_id.split(','), // name of the owner of this property or the managing LLC
    alias: item.ownername1, // owner or managing llc
    address: item.propaddr, // address of property
    zip: item.propzip, // property zip
    latitude: item.xcoord, // latitude
    longitude: item.ycoord, // longitude
    ownerStreet: item.ownerstr, // owner's business address street
    ownerCity: item.ownercity, // owner's business address city
    ownerState: item.ownerstate, // owner's business address state
    ownerZip: item.ownerzip, // owner's business address zip
    count: item.count, // number of rows with this `own_id`
    zipCount: item.zipcount, // number of rows with this `propzip`
    layer: item.layer, // layers 0 - 5 depending on value of `count`
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
